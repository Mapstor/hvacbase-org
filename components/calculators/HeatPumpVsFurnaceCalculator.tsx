'use client';

import { useState, useMemo } from 'react';
import {
  Thermometer,
  DollarSign,
  Zap,
  CheckCircle,
  Home,
  Flame,
  Snowflake,
} from 'lucide-react';
import EmbedCode from '../EmbedCode';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'purple' as const;

// === Efficiency constants (verified against DOE 10 CFR 430 Appendix M) ===
// HSPF2 (Heating Seasonal Performance Factor, post-2023 test procedure) has
// units of BTU per watt-hour, so the correct BTU → kWh divisor is
// HSPF2 × 1000 (giving BTU per kWh). Previously the calc used
// HSPF × 3412, which treated HSPF as if it were dimensionless COP AND
// applied the 3412 BTU/kWh converter — double-conversion, divisor
// 3.412× too large, heat-pump heating kWh understated by exactly 3.412×
// and annual cost fabricated ~$1,700/yr low on the default case, which
// flipped the recommendation from "keep furnace" to "buy heat pump" for
// mid-country cheap-gas users.
//
// SEER2 (Seasonal Energy Efficiency Ratio, post-2023) has the same
// BTU/Wh units, so BTU → kWh divisor is SEER2 × 1000.
//
// Current 2026 typical values (post-2023 M1 test procedure):
//   Federal min HSPF2 = 7.5; ENERGY STAR = 7.8; mid-range 8.0-8.5;
//   cold-climate 9.0-10.5.
//   Federal min SEER2 = 13.4 (north) / 14.3 (south); ENERGY STAR = 15.2;
//   premium inverter 17-20; cold-climate 16.
const BTU_PER_KWH = 3412;              // physical constant (unrelated to efficiency metrics)
const HP_HSPF2       = 8.2;            // ENERGY STAR mid-range default (was legacy HSPF 9.5)
// Per-zone effective HSPF2 for a STANDARD (non-cold-climate) heat pump.
// A standard HP rated 8.2 HSPF2 in DOE Region IV loses effective seasonal
// performance in colder zones as more heating hours cross below the
// balance point and supplemental resistance strips run at COP 1. Derating
// values approximate the strip-kWh weighted seasonal average per DOE
// Building America + NEEP field data. To model a NEEP-listed cold-climate
// unit (HSPF2 9.5-10.5, capacity retention 85%+ at 5°F), a user would
// enter the model's rated HSPF2 directly — see sister HeatPumpSizeCalculator.
const HP_HSPF2_BY_ZONE: Record<string, number> = {
  'very-hot':  8.2,   // no derating (barely uses heating)
  'hot':       8.2,
  'mixed':     8.2,
  'cold':      6.5,   // ~20% degradation from balance-point strip runs
  'very-cold': 5.0,   // ~40% degradation — standard HP shouldn't be here
};
const HP_SEER2       = 17.1;           // premium inverter (was legacy SEER 18)
const NEW_FURNACE_AC_SEER2 = 15.2;     // ENERGY STAR baseline (was legacy SEER 16)
const CURRENT_AC_SEER2     = 13.3;     // typical existing AC (was legacy SEER 14)
const NEW_FURNACE_AFUE     = 0.95;     // hardcoded high-efficiency default

const climateZones = [
  { value: 'very-cold', name: 'Very cold', summary: 'MN, AK, N. Maine', designTemp: -10, heatingHours: 3500, coolingHours: 800, heatPumpViable: 'cold-climate-only' },
  { value: 'cold', name: 'Cold', summary: 'Chicago, Boston, Denver', designTemp: 5, heatingHours: 2800, coolingHours: 1200, heatPumpViable: 'yes-with-backup' },
  { value: 'mixed', name: 'Mixed', summary: 'DC, St. Louis, Portland', designTemp: 15, heatingHours: 1800, coolingHours: 1800, heatPumpViable: 'ideal' },
  { value: 'hot', name: 'Hot', summary: 'Atlanta, Dallas, Phoenix', designTemp: 25, heatingHours: 1000, coolingHours: 2500, heatPumpViable: 'excellent' },
  { value: 'very-hot', name: 'Very hot', summary: 'Miami, S. Texas, HI', designTemp: 35, heatingHours: 200, coolingHours: 3200, heatPumpViable: 'excellent' },
];

const fuelTypes = [
  { value: 'natural-gas', name: 'Natural Gas', sub: 'per therm', btuContent: 100000 },
  { value: 'propane', name: 'Propane', sub: 'per gallon', btuContent: 91000 },
  { value: 'heating-oil', name: 'Heating Oil', sub: 'per gallon', btuContent: 138000 },
  { value: 'electric-resistance', name: 'Electric resistance', sub: 'per kWh', btuContent: 3412 },
];

const homeSizePresets = [1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  homeSize: '2000',
  climate: 'mixed',
  currentFuel: 'natural-gas',
  currentEfficiency: '80',
  electricRate: '0.18',   // EIA 2026 US national average
  gasRate: '1.35',        // EIA 2026 heating-season national midpoint
  systemAge: '12',
  heatPumpCost: '12000',
  furnaceCost: '6500',
  // 25C federal tax credit expired 31 Dec 2025 under OBBBA (placed-in-
  // service rule, no grandfather clause for 2025-signed contracts).
  // Both defaults are $0 for 2026 installs. The rebate field below stays
  // user-editable for state / utility / DOE HEAR programs (variable).
  heatPumpCredit: '0',
  furnaceCredit: '0',
  utilityRebate: '0',
};

export default function HeatPumpVsFurnaceCalculator() {
  const [homeSize, setHomeSize] = useState(DEFAULTS.homeSize);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [currentFuel, setCurrentFuel] = useState(DEFAULTS.currentFuel);
  const [currentEfficiency, setCurrentEfficiency] = useState(DEFAULTS.currentEfficiency);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [gasRate, setGasRate] = useState(DEFAULTS.gasRate);
  const [systemAge, setSystemAge] = useState(DEFAULTS.systemAge);
  const [heatPumpCost, setHeatPumpCost] = useState(DEFAULTS.heatPumpCost);
  const [furnaceCost, setFurnaceCost] = useState(DEFAULTS.furnaceCost);
  const [heatPumpCredit, setHeatPumpCredit] = useState(DEFAULTS.heatPumpCredit);
  const [furnaceCredit, setFurnaceCredit] = useState(DEFAULTS.furnaceCredit);
  const [utilityRebate, setUtilityRebate] = useState(DEFAULTS.utilityRebate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    homeSize, climate, currentFuel, currentEfficiency, electricRate, gasRate,
    systemAge, heatPumpCost, furnaceCost, heatPumpCredit, furnaceCredit, utilityRebate,
  });

  // Raw-state derived lookups used only for input JSX labels (must update as user edits).
  const selectedFuel = fuelTypes.find((f) => f.value === currentFuel)!;
  // Committed-state derived lookups used in calc + results (must reflect the snapshot).
  const selectedClimate = climateZones.find((z) => z.value === src.climate)!;
  const selectedFuelSrc = fuelTypes.find((f) => f.value === src.currentFuel)!;

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
  const cEff = Math.max(parseFloat(src.currentEfficiency) || 1, 1);
  const eR = Math.max(parseFloat(src.electricRate) || 0, 0);
  const gR = Math.max(parseFloat(src.gasRate) || 0, 0);
  const age = parseFloat(src.systemAge) || 0;
  const hpCost = Math.max(parseFloat(src.heatPumpCost) || 0, 0);
  const furCost = Math.max(parseFloat(src.furnaceCost) || 0, 0);
  const hpCredit = Math.max(parseFloat(src.heatPumpCredit) || 0, 0);
  const furCredit = Math.max(parseFloat(src.furnaceCredit) || 0, 0);
  const rebate = Math.max(parseFloat(src.utilityRebate) || 0, 0);

  const handleReset = () => {
    setHomeSize(DEFAULTS.homeSize);
    setClimate(DEFAULTS.climate);
    setCurrentFuel(DEFAULTS.currentFuel);
    setCurrentEfficiency(DEFAULTS.currentEfficiency);
    setElectricRate(DEFAULTS.electricRate);
    setGasRate(DEFAULTS.gasRate);
    setSystemAge(DEFAULTS.systemAge);
    setHeatPumpCost(DEFAULTS.heatPumpCost);
    setFurnaceCost(DEFAULTS.furnaceCost);
    setHeatPumpCredit(DEFAULTS.heatPumpCredit);
    setFurnaceCredit(DEFAULTS.furnaceCredit);
    setUtilityRebate(DEFAULTS.utilityRebate);
    clear();
  };

  const calc = useMemo(() => {
    const heatingLoad = sqft * 40;
    const coolingLoad = sqft * 25;

    // Annual BTU totals (same for all three system paths — building
    // load doesn't change with the equipment inside it).
    const heatBtu = heatingLoad * selectedClimate.heatingHours;
    const coolBtu = coolingLoad * selectedClimate.coolingHours;

    // === CURRENT SYSTEM COST ===
    // Heating: fuel-specific (electric-resistance has BTU_PER_KWH divisor
    // = COP 1; gas/oil/propane use fuel BTU content ÷ AFUE).
    // Cooling: ALL current systems (including electric-resistance
    // homes!) use a normal AC rated by SEER2, NOT the heating efficiency.
    // Previously the electric-resistance branch dumped heat+cool BTU
    // together and divided both by 3412, implying SEER 1 cooling — 4×
    // overstatement of cooling cost.
    const currentCoolKwh = coolBtu / (CURRENT_AC_SEER2 * 1000);
    const currentCoolCost = currentCoolKwh * eR;
    const currentHeatCost = (() => {
      if (src.currentFuel === 'electric-resistance') {
        // Resistance heating: 1 kWh = 3412 BTU (COP 1).
        return (heatBtu / BTU_PER_KWH) * eR;
      }
      return (heatBtu / selectedFuelSrc.btuContent / (cEff / 100)) * gR;
    })();
    const currentCost = currentHeatCost + currentCoolCost;

    // === HEAT PUMP COST ===
    // BOTH sides divide by (rating × 1000) because SEER2 and HSPF2 are
    // both BTU/Wh. Previously the heating side divided by (HSPF × 3412)
    // — a 3.412× understatement that fabricated ~$1,700/yr in phantom
    // savings on the default case and flipped the recommendation.
    // Heating uses a per-zone effective HSPF2 (cold/very-cold zones
    // derate to account for supplemental strip kWh below balance point).
    const effectiveHSPF2 = HP_HSPF2_BY_ZONE[selectedClimate.value] ?? HP_HSPF2;
    const heatPumpCoolKwh = coolBtu / (HP_SEER2 * 1000);
    const heatPumpHeatKwh = heatBtu / (effectiveHSPF2 * 1000);
    const heatPumpEnergy = (heatPumpCoolKwh + heatPumpHeatKwh) * eR;

    // === NEW FURNACE + AC COST ===
    // Heating: same fuel-specific logic as current, but at 95% AFUE.
    // Cooling: new SEER2 15.2 AC (ENERGY STAR baseline).
    // Note: electric-resistance-current users choosing "new furnace + AC"
    // are effectively upgrading to a new resistance strip + new AC — same
    // heating physics, better cooling.
    const furnaceCoolKwh = coolBtu / (NEW_FURNACE_AC_SEER2 * 1000);
    const furnaceCoolCost = furnaceCoolKwh * eR;
    const furnaceHeatCost = (() => {
      if (src.currentFuel === 'electric-resistance') {
        return (heatBtu / BTU_PER_KWH) * eR;
      }
      return (heatBtu / selectedFuelSrc.btuContent / NEW_FURNACE_AFUE) * gR;
    })();
    const furnaceEnergy = furnaceHeatCost + furnaceCoolCost;

    const currentMaint = age > 10 ? 500 : 300;
    const heatPumpMaint = 250;
    const furnaceMaint = 200;
    const currentTotal = currentCost + currentMaint;
    const heatPumpTotal = heatPumpEnergy + heatPumpMaint;
    const furnaceTotal = furnaceEnergy + furnaceMaint;
    const heatPumpSavings = currentTotal - heatPumpTotal;
    const furnaceSavings = currentTotal - furnaceTotal;
    const heatPumpNetCost = Math.max(hpCost - hpCredit - rebate, 0);
    const furnaceNetCost = Math.max(furCost - furCredit, 0);
    const heatPumpPayback = heatPumpSavings > 0 ? heatPumpNetCost / heatPumpSavings : 999;
    const furnacePayback = furnaceSavings > 0 ? furnaceNetCost / furnaceSavings : 999;
    const heatPump15 = heatPumpSavings * 15 - heatPumpNetCost;
    const furnace15 = furnaceSavings * 15 - furnaceNetCost;

    return {
      heatingLoad, coolingLoad, currentCost, heatPumpEnergy, furnaceEnergy,
      currentHeatCost, currentCoolCost,           // exposed for breakdown display
      effectiveHSPF2,                             // for the per-zone derating callout
      currentMaint, heatPumpMaint, furnaceMaint,
      currentTotal, heatPumpTotal, furnaceTotal,
      heatPumpSavings, furnaceSavings,
      heatPumpNetCost, furnaceNetCost,
      heatPumpPayback, furnacePayback,
      heatPump15, furnace15,
    };
  }, [sqft, cEff, eR, gR, age, hpCost, furCost, hpCredit, furCredit, rebate, src.currentFuel, selectedClimate, selectedFuelSrc]);

  const recommendation = useMemo(() => {
    const climateScore = selectedClimate.heatPumpViable;
    const savingsDiff = calc.heatPumpSavings - calc.furnaceSavings;
    const neitherPencils = calc.heatPumpSavings <= 0 && calc.furnaceSavings <= 0;
    if (neitherPencils) {
      // Both options lose money vs the current system — recommend keeping
      // it and revisiting when it fails. Previously, the "environmental
      // benefits" tie-breaker would still push HP here.
      return { choice: 'furnace' as const, confidence: 'medium', reason: 'Both new systems cost more than your current setup at these energy prices — keep the current system and reconsider when it needs replacement anyway.' };
    }
    if (climateScore === 'excellent' && calc.heatPumpPayback < 12 && calc.heatPump15 >= calc.furnace15) return { choice: 'heat-pump' as const, confidence: 'high', reason: 'Excellent climate match with strong financial returns.' };
    if (climateScore === 'ideal' && calc.heatPump15 > calc.furnace15) return { choice: 'heat-pump' as const, confidence: 'high', reason: 'Ideal climate zone with better long-term economics.' };
    if (climateScore === 'cold-climate-only') return { choice: 'furnace' as const, confidence: 'medium', reason: 'Very cold climate — a standard HP loses too much capacity below the balance point. Use a NEEP-listed cold-climate model (HSPF2 10+, enter its HSPF2 for a real comparison) or keep gas backup.' };
    if (calc.heatPumpPayback - calc.furnacePayback > 5 && calc.furnacePayback < 10) return { choice: 'furnace' as const, confidence: 'medium', reason: 'Significantly faster payback with furnace system at these fuel prices.' };
    if (Math.abs(savingsDiff) < 100 && (calc.heatPumpSavings > 0 || calc.furnaceSavings > 0)) return { choice: 'heat-pump' as const, confidence: 'medium', reason: 'Similar economics — heat pump wins on environmental benefits and future-proofing.' };
    if (calc.heatPump15 > calc.furnace15) return { choice: 'heat-pump' as const, confidence: 'medium', reason: 'Better long-term financial performance.' };
    return { choice: 'furnace' as const, confidence: 'medium', reason: 'Better short-term financial performance at these fuel prices.' };
  }, [selectedClimate, calc]);

  const recColor = recommendation.choice === 'heat-pump' ? 'purple' : 'orange';

  // Label the second option based on the fuel path — a resistance-current
  // user's "furnace + AC" is really "new resistance strip + AC" (no gas
  // hookup implied). Everything else uses "Furnace + AC".
  const furnaceLabel = src.currentFuel === 'electric-resistance'
    ? 'New Electric + AC'
    : 'Furnace + AC';
  const FurnaceIcon = src.currentFuel === 'electric-resistance' ? Zap : Flame;

  return (
    <CalcShell
      Icon={Thermometer}
      title="Heat Pump vs Furnace Decision Tool"
      subtitle="Compare costs, climate fit, and 15-year ROI side by side."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Home & climate */}
      <section>
        <SectionHeader step={1} title="Home & climate" subtitle="Size and DOE climate zone" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current system age</label>
              <NumberInput value={systemAge} onChange={setSystemAge} min={0} max={30} suffix="years" ariaLabel="System age" accent={ACCENT} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climate} onChange={setClimate} options={climateZones} ariaLabel="Climate zone" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      {/* Section 2 — Current system */}
      <section>
        <SectionHeader step={2} title="Current heating fuel" subtitle="What you heat with today" Icon={Flame} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Fuel type</label>
            <CardChoice value={currentFuel} onChange={setCurrentFuel} options={fuelTypes} ariaLabel="Current fuel" accent={ACCENT} columns={4} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current efficiency
                <InfoTip label="efficiency">Gas/oil/propane: AFUE % on nameplate. Electric resistance: ~100%.</InfoTip>
              </label>
              <NumberInput value={currentEfficiency} onChange={setCurrentEfficiency} min={60} max={100} suffix="%" ariaLabel="Current efficiency" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            </div>
            {selectedFuel.value === 'electric-resistance' ? (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Fuel rate</label>
                <div className="px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-xs text-gray-500">
                  n/a — electric resistance is priced from the electric rate above.
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">{selectedFuel.name} rate ({selectedFuel.sub})</label>
                <NumberInput value={gasRate} onChange={setGasRate} min={0.5} max={5} suffix={`$/${selectedFuel.sub.replace('per ', '')}`} ariaLabel="Fuel rate" accent={ACCENT} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 3 — System costs & incentives */}
      <section>
        <SectionHeader step={3} title="New system costs & rebates" subtitle="Federal 25C tax credit expired 31 Dec 2025 — enter state/utility/HEAR amounts below" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Heat pump cost</label>
            <NumberInput value={heatPumpCost} onChange={setHeatPumpCost} min={5000} max={25000} suffix="$" ariaLabel="Heat pump cost" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Furnace+AC cost</label>
            <NumberInput value={furnaceCost} onChange={setFurnaceCost} min={3000} max={20000} suffix="$" ariaLabel="Furnace cost" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">HP rebate (federal HEAR / state)</label>
            <NumberInput value={heatPumpCredit} onChange={setHeatPumpCredit} min={0} max={8000} suffix="$" ariaLabel="Heat pump rebate" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Furnace rebate</label>
            <NumberInput value={furnaceCredit} onChange={setFurnaceCredit} min={0} max={2000} suffix="$" ariaLabel="Furnace rebate" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">HP utility rebate</label>
            <NumberInput value={utilityRebate} onChange={setUtilityRebate} min={0} max={3000} suffix="$" ariaLabel="Utility rebate" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
      </section>

      <CalculateResetBar
        onCalculate={calculate}
        onReset={handleReset}
        dirty={dirty}
        hasResult={hasResult}
        accent={ACCENT}
      />

      {/* Results */}
      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        {/* Recommendation hero */}
        <div className={`rounded-2xl p-5 sm:p-6 ring-2 ${recColor === 'purple' ? 'ring-purple-300 bg-gradient-to-br from-purple-50 to-fuchsia-50' : 'ring-orange-300 bg-gradient-to-br from-orange-50 to-amber-50'}`}>
          <div className="flex items-start gap-3 flex-wrap">
            <div className={`p-2 rounded-lg ${recColor === 'purple' ? 'bg-purple-600' : 'bg-orange-600'}`}>
              {recColor === 'purple' ? <Zap className="w-5 h-5 text-white" /> : <Flame className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs uppercase tracking-wider font-bold ${recColor === 'purple' ? 'text-purple-700' : 'text-orange-700'}`}>
                  Recommendation · {recommendation.confidence} confidence
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {recommendation.choice === 'heat-pump' ? 'Heat Pump' : furnaceLabel}
              </h3>
              <p className="text-sm text-gray-700">{recommendation.reason}</p>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid lg:grid-cols-2 gap-4">
          {[
            { label: 'Heat pump', tone: 'purple', Icon: Zap, total: calc.heatPumpTotal, energy: calc.heatPumpEnergy, maint: calc.heatPumpMaint, cost: hpCost, credit: hpCredit + rebate, net: calc.heatPumpNetCost, payback: calc.heatPumpPayback, savings: calc.heatPumpSavings, year15: calc.heatPump15, isChoice: recommendation.choice === 'heat-pump' },
            { label: furnaceLabel, tone: 'orange', Icon: FurnaceIcon, total: calc.furnaceTotal, energy: calc.furnaceEnergy, maint: calc.furnaceMaint, cost: furCost, credit: furCredit, net: calc.furnaceNetCost, payback: calc.furnacePayback, savings: calc.furnaceSavings, year15: calc.furnace15, isChoice: recommendation.choice === 'furnace' },
          ].map((sys) => {
            const Icon = sys.Icon;
            const isPurple = sys.tone === 'purple';
            return (
              <div key={sys.label} className={`bg-white rounded-xl border-2 p-4 ${sys.isChoice ? (isPurple ? 'border-purple-400 ring-2 ring-purple-100' : 'border-orange-400 ring-2 ring-orange-100') : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${isPurple ? 'text-purple-600' : 'text-orange-600'}`} />
                  <h4 className="font-bold text-gray-900">{sys.label}</h4>
                  {sys.isChoice && (
                    <span className={`ml-auto text-[10px] uppercase tracking-wider font-bold ${isPurple ? 'text-purple-700' : 'text-orange-700'}`}>
                      Recommended
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-xs">
                  <div className={`p-3 rounded-lg ${isPurple ? 'bg-purple-50' : 'bg-orange-50'}`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">Annual operating cost</span>
                      <span className={`font-bold ${isPurple ? 'text-purple-700' : 'text-orange-700'}`}>${fmtMoney(sys.total)}</span>
                    </div>
                    <div className="text-[11px] text-gray-500">${fmtMoney(sys.energy)} energy + ${fmtMoney(sys.maint)} maintenance</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Net cost</div>
                      <div className="font-bold text-gray-900 tabular-nums">${fmtMoney(sys.net)}</div>
                      <div className="text-[10px] text-gray-500">${fmtMoney(sys.cost)} − ${fmtMoney(sys.credit)} credits</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Payback</div>
                      <div className="font-bold text-gray-900 tabular-nums">{sys.payback < 50 ? `${sys.payback.toFixed(1)} yr` : sys.savings < 0 ? 'Loses $$' : '50+ yr'}</div>
                      <div className={`text-[10px] ${sys.savings >= 0 ? 'text-gray-500' : 'text-red-600 font-semibold'}`}>
                        {sys.savings >= 0
                          ? `$${fmtMoney(sys.savings)}/yr saved`
                          : `$${fmtMoney(Math.abs(sys.savings))}/yr more than current`}
                      </div>
                    </div>
                  </div>
                  <div className={`p-2 rounded text-center ${sys.year15 > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">15-year net profit</div>
                    <div className={`text-lg font-bold tabular-nums ${sys.year15 > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                      {sys.year15 > 0 ? '+' : ''}${fmtMoney(sys.year15)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Climate context + current system */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Snowflake className="w-4 h-4 text-purple-600" />
              Climate context · {selectedClimate.name}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Design temp', detail: 'Coldest 1% winter hours', factor: `${selectedClimate.designTemp}°F` },
                { label: 'Heating hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedClimate.heatingHours)}` },
                { label: 'Cooling hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedClimate.coolingHours)}` },
                { label: 'Heat pump fit', detail: selectedClimate.heatPumpViable.replace(/-/g, ' '), factor: '—' },
              ]}
              totals={[]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              {selectedClimate.heatPumpViable === 'excellent' && '✓ Heat pumps thrive here. Minimal backup heating needed.'}
              {selectedClimate.heatPumpViable === 'ideal' && '✓ Perfect heat pump climate — balanced loads, mild winters.'}
              {selectedClimate.heatPumpViable === 'yes-with-backup' && '⚠ Heat pumps work but expect to run electric strips on the coldest 5–10 days.'}
              {selectedClimate.heatPumpViable === 'cold-climate-only' && '⚠ Standard heat pumps lose capacity below 17°F. Use cold-climate model (75% capacity at 5°F) or stick with gas furnace.'}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-red-700" />
              Current system baseline
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Fuel', detail: selectedFuelSrc.name, factor: `${cEff}% eff.` },
                { label: 'Heating cost', detail: `${fmt(selectedClimate.heatingHours)} hrs × ${fmt(calc.heatingLoad)} BTU`, factor: `$${fmtMoney(calc.currentHeatCost)}/yr` },
                { label: 'Cooling cost', detail: `${fmt(selectedClimate.coolingHours)} hrs × ${fmt(calc.coolingLoad)} BTU`, factor: `$${fmtMoney(calc.currentCoolCost)}/yr` },
                { label: 'Maintenance', detail: age > 10 ? 'Aging system (>10 yr)' : 'Normal upkeep', factor: `$${fmtMoney(calc.currentMaint)}/yr` },
              ]}
              totals={[
                { label: 'Current annual total', value: `$${fmtMoney(calc.currentTotal)}`, valueClass: 'text-red-700' },
              ]}
            />
          </div>
        </div>

        <DisclaimerBox title="The answer depends on your local price ratio, not the technology.">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li><strong>Electric-to-gas price ratio drives the answer.</strong> At the calc&rsquo;s default HSPF2 8.2 / 95% AFUE, heat-pump heating is cheaper than a new gas furnace only when (elec $/kWh) ÷ (gas $/therm) drops below <strong>~0.09</strong> (heating alone) or <strong>~0.10</strong> when the HP&rsquo;s cooling advantage is included. At the defaults (0.18/1.35 = <strong>0.133</strong>) the furnace wins; a cold-climate model rated HSPF2 10+ shifts the crossover to ~0.11, and cooling-dominated hot climates push it to ~0.15-0.20. Enter your local rates to see where you land.</li>
            <li><strong>Heat pumps lose capacity in extreme cold</strong> — a standard HSPF2 8 unit at 5°F outdoor delivers ~40% of nameplate; needs backup heat (electric strips or dual-fuel furnace) below the balance point. This calc <strong>derates HSPF2 for cold zones</strong> (6.5 for cold, 5.0 for very-cold) to approximate the supplemental-strip kWh burden. See our <a href="/heat-pump-size-calculator" className="text-purple-600 underline">Heat Pump Size Calculator</a> for the balance-point math.</li>
            <li><strong>Cold-climate NEEP-listed models</strong> (HSPF2 9.5-10.5) hold 85%+ capacity at 5°F and change the arithmetic dramatically — this calc doesn&rsquo;t currently take a per-model HSPF2 input, so if you&rsquo;re comparing a specific ccASHP, run its published HSPF2 through the sister calc.</li>
            <li><strong>Federal 25C tax credit expired 31 Dec 2025</strong> under OBBBA (placed-in-service rule, no grandfather clause). Enter state/utility/HEAR rebate amounts in the fields above — DOE HEAR is up to <strong>$8,000</strong> for a heat pump but requires household income ≤80% AMI ($4,000 up to 150% AMI, $0 above); check <a href="https://www.dsireusa.org" className="text-purple-600 underline">DSIRE</a> for state programs.</li>
            <li><strong>Ductwork sizing</strong>: gas furnaces deliver 130°F air; heat pumps deliver 95-105°F. Existing furnace ducts may need upsizing for a heat pump.</li>
            <li><strong>Load assumption</strong>: this calc uses 40 BTU/sqft heating and 25 BTU/sqft cooling with per-zone equivalent-full-load hours — a screening estimate that varies ±30% with construction. The recommendation is a RATIO — absolute annual costs are directional, not to-the-dollar.</li>
            <li><strong>Fuel-price trajectory</strong>: gas has averaged ~3%/yr inflation for 20 years; electricity ~2-3%/yr. If your area is electrifying, expect the electric-to-gas ratio to shift over your 15-year comparison window.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>

      <EmbedCode calculatorType="heat-pump-vs-furnace-calculator" title="Heat Pump vs Furnace Calculator" />
    </CalcShell>
  );
}
