'use client';

import { useState, useMemo } from 'react';
import {
  Thermometer,
  DollarSign,
  Zap,
  Home,
  Flame,
  Snowflake,
  Leaf,
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
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';
import { UA_PER_SQFT, annualHeatOutputBtu } from './_heatloss';

const ACCENT = 'purple' as const;

// === Efficiency constants (verified against DOE 10 CFR 430 Appendix M) ===
// HSPF2 and SEER2 (post-2023 M1 test procedure) both have units of BTU per
// watt-hour, so the BTU → kWh divisor is (rating × 1000).
//
// Current 2026 typical values: Federal min HSPF2 7.5; ENERGY STAR 7.8;
// mid-range 8.0-8.5; cold-climate 9.0-10.5. Federal min SEER2 13.4 (north) /
// 14.3 (south); ENERGY STAR 15.2; premium inverter 17-20.
const BTU_PER_KWH = 3412;              // physical constant (unrelated to efficiency metrics)
const HP_HSPF2       = 8.2;            // ENERGY STAR mid-range default
// Per-zone effective HSPF2 for a STANDARD (non-cold-climate) heat pump. HSPF2 is
// rated for a moderate climate (DOE Region IV); in colder zones more heating
// hours cross below the balance point and supplemental resistance strips run at
// COP 1, so the seasonal average drops. A NEEP-listed cold-climate unit would
// instead have its own high HSPF2 entered in the sister HeatPumpSizeCalculator.
export const HP_HSPF2_BY_ZONE: Record<string, number> = {
  'very-hot':  8.2,   // no derating (barely uses heating)
  'hot':       8.2,
  'mixed':     8.2,
  'cold':      6.5,   // colder zone: lower assumed seasonal efficiency
  'very-cold': 5.0,   // coldest zone: lower still (standard HP shouldn't be here)
};
export const HP_SEER2       = 17.1;           // premium inverter
const NEW_FURNACE_AC_SEER2 = 15.2;     // ENERGY STAR baseline
const CURRENT_AC_SEER2     = 13.3;     // typical existing AC
const NEW_FURNACE_AFUE     = 0.95;     // high-efficiency condensing furnace

// === Carbon factors ===
// Grid electricity: EPA eGRID2022 U.S. average output emission rate.
const GRID_CO2_LB_PER_KWH = 0.823;
// Fuel combustion CO2, lb per million BTU (higher heating value) — U.S. EIA
// Carbon Dioxide Emissions Coefficients. Natural gas 117; propane 139;
// distillate heating oil 163. Electric resistance uses the grid factor above.
const FUEL_CO2_LB_PER_MMBTU: Record<string, number> = {
  'natural-gas': 117,
  'propane': 139,
  'heating-oil': 163,
  'electric-resistance': 0,
};

export const climateZones = [
  { value: 'very-cold', name: 'Very cold', summary: 'MN, AK, N. Maine', designTemp: -10, hdd: 8000, heatingHours: 3500, coolingHours: 800, heatPumpViable: 'cold-climate-only' },
  { value: 'cold', name: 'Cold', summary: 'Chicago, Boston, Denver', designTemp: 5, hdd: 6500, heatingHours: 2800, coolingHours: 1200, heatPumpViable: 'yes-with-backup' },
  { value: 'mixed', name: 'Mixed', summary: 'DC, St. Louis, Portland', designTemp: 15, hdd: 4500, heatingHours: 1800, coolingHours: 1800, heatPumpViable: 'ideal' },
  { value: 'hot', name: 'Hot', summary: 'Atlanta, Dallas, Phoenix', designTemp: 25, hdd: 2500, heatingHours: 1000, coolingHours: 2500, heatPumpViable: 'excellent' },
  { value: 'very-hot', name: 'Very hot', summary: 'Miami, S. Texas, HI', designTemp: 35, hdd: 400, heatingHours: 200, coolingHours: 3200, heatPumpViable: 'excellent' },
];

const fuelTypes = [
  { value: 'natural-gas', name: 'Natural Gas', sub: 'per therm', btuContent: 100000 },
  { value: 'propane', name: 'Propane', sub: 'per gallon', btuContent: 91000 },
  { value: 'heating-oil', name: 'Heating Oil', sub: 'per gallon', btuContent: 138000 },
  { value: 'electric-resistance', name: 'Electric resistance', sub: 'per kWh', btuContent: 3412 },
];

// Envelope heat-loss coefficient — UA per sq ft (BTU/hr·°F), from the shared
// heat-loss model in _heatloss.ts, the same values the furnace, heat-pump size
// and AFUE calculators use. Annual heat the equipment must deliver =
// UA × sqft × HDD × 24.
const insulationOptions = [
  { value: 'poor',      name: 'Poor',      sub: 'Pre-1970, little insulation', ua: UA_PER_SQFT.poor },      // 0.604
  { value: 'average',   name: 'Average',   sub: '1980s–90s construction',      ua: UA_PER_SQFT.average },   // 0.270
  { value: 'good',      name: 'Good',      sub: '2000s construction',          ua: UA_PER_SQFT.good },      // 0.189
  { value: 'excellent', name: 'Excellent', sub: 'Current code, tight envelope', ua: UA_PER_SQFT.excellent }, // 0.177
];

const DEFAULTS = {
  homeSize: '2000',
  climate: 'mixed',
  insulation: 'average',
  currentFuel: 'natural-gas',
  currentEfficiency: '80',
  electricRate: '0.18',   // EIA 2026 US national average
  gasRate: '1.35',        // EIA 2026 heating-season national midpoint
  // Installed prices are optional and empty by default — no invented figures.
  // Lifetime cost and payback appear only when both are filled in.
  heatPumpCost: '',
  furnaceCost: '',
  // 25C federal tax credit expired 31 Dec 2025 under OBBBA. The rebate field is
  // user-entered for state / utility / DOE HEAR programs (variable), default 0.
  rebate: '0',
};

export default function HeatPumpVsFurnaceCalculator() {
  const [homeSize, setHomeSize] = useState(DEFAULTS.homeSize);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [insulation, setInsulation] = useState(DEFAULTS.insulation);
  const [currentFuel, setCurrentFuel] = useState(DEFAULTS.currentFuel);
  const [currentEfficiency, setCurrentEfficiency] = useState(DEFAULTS.currentEfficiency);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [gasRate, setGasRate] = useState(DEFAULTS.gasRate);
  const [heatPumpCost, setHeatPumpCost] = useState(DEFAULTS.heatPumpCost);
  const [furnaceCost, setFurnaceCost] = useState(DEFAULTS.furnaceCost);
  const [rebate, setRebate] = useState(DEFAULTS.rebate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    homeSize, climate, insulation, currentFuel, currentEfficiency, electricRate,
    gasRate, heatPumpCost, furnaceCost, rebate,
  });

  // Raw-state derived lookups used only for input JSX labels (must update as user edits).
  const selectedFuel = fuelTypes.find((f) => f.value === currentFuel)!;
  // Committed-state derived lookups used in calc + results (must reflect the snapshot).
  const selectedClimate = climateZones.find((z) => z.value === src.climate)!;
  const selectedFuelSrc = fuelTypes.find((f) => f.value === src.currentFuel)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === src.insulation)!;

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
  const cEff = Math.max(parseFloat(src.currentEfficiency) || 1, 1);
  const eR = Math.max(parseFloat(src.electricRate) || 0, 0);
  const gR = Math.max(parseFloat(src.gasRate) || 0, 0);
  const hpCost = Math.max(parseFloat(src.heatPumpCost) || 0, 0);
  const furCost = Math.max(parseFloat(src.furnaceCost) || 0, 0);
  const reb = Math.max(parseFloat(src.rebate) || 0, 0);

  const handleReset = () => {
    setHomeSize(DEFAULTS.homeSize);
    setClimate(DEFAULTS.climate);
    setInsulation(DEFAULTS.insulation);
    setCurrentFuel(DEFAULTS.currentFuel);
    setCurrentEfficiency(DEFAULTS.currentEfficiency);
    setElectricRate(DEFAULTS.electricRate);
    setGasRate(DEFAULTS.gasRate);
    setHeatPumpCost(DEFAULTS.heatPumpCost);
    setFurnaceCost(DEFAULTS.furnaceCost);
    setRebate(DEFAULTS.rebate);
    clear();
  };

  const calc = useMemo(() => {
    // Design-peak heating load (BTU/hr) — display only.
    const heatingLoad = sqft * 40;
    const coolingLoad = sqft * 25;

    // === ANNUAL BUILDING LOAD (same for all three system paths) ===
    // Heating uses the shared degree-day heat-loss model (_heatloss.ts):
    // annual delivered BTU = UA_PER_SQFT × sqft × HDD × 24, with the UA set by
    // the insulation level. Cooling uses a screening 25 BTU/sqft × equivalent
    // full-load cooling hours.
    const heatBtu = annualHeatOutputBtu(selectedInsulation.ua, sqft, 1, selectedClimate.hdd);
    const coolBtu = coolingLoad * selectedClimate.coolingHours;

    const fuelCO2 = FUEL_CO2_LB_PER_MMBTU[src.currentFuel] ?? 0;
    const isResistance = src.currentFuel === 'electric-resistance';

    // === CURRENT SYSTEM (energy cost + CO2) ===
    const currentCoolKwh = coolBtu / (CURRENT_AC_SEER2 * 1000);
    const currentCoolCost = currentCoolKwh * eR;
    const currentHeatKwh = isResistance ? heatBtu / BTU_PER_KWH : 0;
    const currentGasInputMMBtu = isResistance ? 0 : (heatBtu / (cEff / 100)) / 1_000_000;
    const currentHeatCost = isResistance
      ? currentHeatKwh * eR
      : currentGasInputMMBtu * 1_000_000 / selectedFuelSrc.btuContent * gR;
    const currentCost = currentHeatCost + currentCoolCost;
    const currentCO2 =
      (isResistance ? currentHeatKwh * GRID_CO2_LB_PER_KWH : currentGasInputMMBtu * fuelCO2) +
      currentCoolKwh * GRID_CO2_LB_PER_KWH;

    // === HEAT PUMP (all-electric) ===
    // Both sides divide by (rating × 1000). Heating uses a per-zone effective
    // HSPF2 (colder zones assume a lower seasonal efficiency; see label).
    const effectiveHSPF2 = HP_HSPF2_BY_ZONE[selectedClimate.value] ?? HP_HSPF2;
    const heatPumpCoolKwh = coolBtu / (HP_SEER2 * 1000);
    const heatPumpHeatKwh = heatBtu / (effectiveHSPF2 * 1000);
    const heatPumpKwh = heatPumpCoolKwh + heatPumpHeatKwh;
    const heatPumpEnergy = heatPumpKwh * eR;
    const heatPumpCO2 = heatPumpKwh * GRID_CO2_LB_PER_KWH;

    // === NEW FURNACE + AC ===
    // Heating: same fuel as current, at 95% AFUE (resistance stays electric).
    // Cooling: new SEER2 15.2 AC.
    const furnaceCoolKwh = coolBtu / (NEW_FURNACE_AC_SEER2 * 1000);
    const furnaceCoolCost = furnaceCoolKwh * eR;
    const furnaceHeatKwh = isResistance ? heatBtu / BTU_PER_KWH : 0;
    const furnaceGasInputMMBtu = isResistance ? 0 : (heatBtu / NEW_FURNACE_AFUE) / 1_000_000;
    const furnaceHeatCost = isResistance
      ? furnaceHeatKwh * eR
      : furnaceGasInputMMBtu * 1_000_000 / selectedFuelSrc.btuContent * gR;
    const furnaceEnergy = furnaceHeatCost + furnaceCoolCost;
    const furnaceCO2 =
      (isResistance ? furnaceHeatKwh * GRID_CO2_LB_PER_KWH : furnaceGasInputMMBtu * fuelCO2) +
      furnaceCoolKwh * GRID_CO2_LB_PER_KWH;

    // Heating fuel used, for display: therms for gas, kWh for heat pump / resistance.
    const currentHeatTherms = isResistance ? 0 : currentGasInputMMBtu * 10; // 1 MMBtu = 10 therms
    const furnaceHeatTherms = isResistance ? 0 : furnaceGasInputMMBtu * 10;

    // === Optional install economics (only when BOTH prices are entered) ===
    const bothPrices = hpCost > 0 && furCost > 0;
    const heatPumpSavings = currentCost - heatPumpEnergy;   // vs current, per year
    const furnaceSavings = currentCost - furnaceEnergy;
    const heatPumpNetCost = Math.max(hpCost - reb, 0);      // rebate applies to the heat pump
    const furnaceNetCost = furCost;
    const heatPumpPayback = bothPrices && heatPumpSavings > 0 ? heatPumpNetCost / heatPumpSavings : Infinity;
    const furnacePayback = bothPrices && furnaceSavings > 0 ? furnaceNetCost / furnaceSavings : Infinity;
    const heatPump15 = heatPumpSavings * 15 - heatPumpNetCost;
    const furnace15 = furnaceSavings * 15 - furnaceNetCost;

    return {
      heatingLoad, coolingLoad, heatBtu, coolBtu,
      currentHeatCost, currentCoolCost, currentCost, currentCO2, currentHeatTherms,
      effectiveHSPF2,
      heatPumpHeatKwh, heatPumpCoolKwh, heatPumpKwh, heatPumpEnergy, heatPumpCO2,
      furnaceHeatCost, furnaceCoolCost, furnaceEnergy, furnaceCO2, furnaceHeatTherms,
      bothPrices,
      heatPumpSavings, furnaceSavings,
      heatPumpNetCost, furnaceNetCost,
      heatPumpPayback, furnacePayback,
      heatPump15, furnace15,
    };
  }, [sqft, cEff, eR, gR, hpCost, furCost, reb, src.currentFuel, selectedClimate, selectedFuelSrc, selectedInsulation]);

  const recommendation = useMemo(() => {
    const viable = selectedClimate.heatPumpViable;
    const hpRunsCheaper = calc.heatPumpEnergy <= calc.furnaceEnergy;
    if (viable === 'cold-climate-only') {
      return { choice: 'furnace' as const, confidence: 'medium', reason: 'In a very cold zone a standard heat pump loses too much capacity below its balance point. Use a NEEP-listed cold-climate model (enter its HSPF2 in the sister calculator) or keep a gas furnace with backup.' };
    }
    if (calc.bothPrices) {
      if (calc.heatPump15 >= calc.furnace15) {
        return { choice: 'heat-pump' as const, confidence: hpRunsCheaper ? 'high' : 'medium', reason: 'Better 15-year net cost at your prices and fuel rates.' };
      }
      return { choice: 'furnace' as const, confidence: 'medium', reason: 'Better 15-year net cost at these fuel prices.' };
    }
    if (hpRunsCheaper) {
      return { choice: 'heat-pump' as const, confidence: (viable === 'excellent' || viable === 'ideal') ? 'high' : 'medium', reason: 'Lower yearly running cost at your rates, with a good climate fit. Enter both install prices to see payback and 15-year net.' };
    }
    return { choice: 'furnace' as const, confidence: 'medium', reason: 'Lower yearly running cost at these fuel prices. Enter both install prices to see payback and 15-year net.' };
  }, [selectedClimate, calc]);

  const recColor = recommendation.choice === 'heat-pump' ? 'purple' : 'orange';

  // Label the second option based on the fuel path — a resistance-current user's
  // "furnace + AC" is really "new resistance strip + AC".
  const furnaceLabel = src.currentFuel === 'electric-resistance'
    ? 'New Electric + AC'
    : 'Furnace + AC';
  const FurnaceIcon = src.currentFuel === 'electric-resistance' ? Zap : Flame;

  return (
    <CalcShell
      Icon={Thermometer}
      title="Heat Pump vs Furnace Decision Tool"
      subtitle="Compare yearly running cost, carbon and climate fit, with optional payback."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Home & climate */}
      <section>
        <SectionHeader step={1} title="Home & climate" subtitle="Size, insulation and DOE climate zone" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Insulation level
                <InfoTip label="insulation">
                  Sets the home&rsquo;s heat-loss rate (UA per sq ft): Poor 0.604, Average 0.270, Good 0.189, Excellent 0.177 BTU/hr·°F. Average is 1980s to 90s construction; a blower-door test or Manual J gives your real number.
                </InfoTip>
              </label>
              <CardChoice value={insulation} onChange={setInsulation} options={insulationOptions} ariaLabel="Insulation level" accent={ACCENT} columns={4} />
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
                  n/a, electric resistance is priced from the electric rate above.
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

      {/* Section 3 — Optional install prices */}
      <section>
        <SectionHeader step={3} title="Install prices & rebate (optional)" subtitle="Leave blank for the running-cost comparison only; fill both for payback" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Heat pump installed price</label>
            <NumberInput value={heatPumpCost} onChange={setHeatPumpCost} min={0} max={40000} placeholder="e.g. 14,000" suffix="$" ariaLabel="Heat pump installed price" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Furnace + AC installed price</label>
            <NumberInput value={furnaceCost} onChange={setFurnaceCost} min={0} max={40000} placeholder="e.g. 9,000" suffix="$" ariaLabel="Furnace and AC installed price" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Rebates you qualify for
              <InfoTip label="rebates">
                State, utility, or DOE HEAR rebate on the heat pump. The federal 25C tax credit expired 31 Dec 2025. Check DSIRE for your state; default is 0.
              </InfoTip>
            </label>
            <NumberInput value={rebate} onChange={setRebate} min={0} max={20000} suffix="$" ariaLabel="Rebates you qualify for" accent={ACCENT} />
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
      {hasResult && sqft > 0 && (
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
            { label: 'Heat pump', tone: 'purple', Icon: Zap, energy: calc.heatPumpEnergy, cost: hpCost, net: calc.heatPumpNetCost, rebate: reb, payback: calc.heatPumpPayback, savings: calc.heatPumpSavings, year15: calc.heatPump15, isChoice: recommendation.choice === 'heat-pump' },
            { label: furnaceLabel, tone: 'orange', Icon: FurnaceIcon, energy: calc.furnaceEnergy, cost: furCost, net: calc.furnaceNetCost, rebate: 0, payback: calc.furnacePayback, savings: calc.furnaceSavings, year15: calc.furnace15, isChoice: recommendation.choice === 'furnace' },
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
                      <span className={`font-bold ${isPurple ? 'text-purple-700' : 'text-orange-700'}`}>${fmtMoney(sys.energy)}</span>
                    </div>
                    <div className={`text-[11px] ${sys.savings >= 0 ? 'text-gray-500' : 'text-red-600 font-semibold'}`}>
                      {sys.savings >= 0
                        ? `$${fmtMoney(sys.savings)}/yr less than your current system`
                        : `$${fmtMoney(Math.abs(sys.savings))}/yr more than your current system`}
                    </div>
                  </div>
                  {calc.bothPrices ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Net install cost</div>
                        <div className="font-bold text-gray-900 tabular-nums">${fmtMoney(sys.net)}</div>
                        <div className="text-[10px] text-gray-500">
                          ${fmtMoney(sys.cost)}{sys.rebate > 0 ? ` − $${fmtMoney(sys.rebate)} rebate` : ''}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">Payback</div>
                        <div className="font-bold text-gray-900 tabular-nums">
                          {sys.savings <= 0 ? 'No savings' : sys.payback < 50 ? `${sys.payback.toFixed(1)} yr` : '50+ yr'}
                        </div>
                        <div className="text-[10px] text-gray-500">vs your current system</div>
                      </div>
                      <div className={`col-span-2 p-2 rounded text-center ${sys.year15 > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                        <div className="text-[10px] uppercase tracking-wider text-gray-500">15-year net (savings − net install cost)</div>
                        <div className={`text-lg font-bold tabular-nums ${sys.year15 > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                          {sys.year15 > 0 ? '+' : ''}${fmtMoney(sys.year15)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-2 rounded text-[11px] text-gray-500 text-center">
                      Enter both install prices above for payback and 15-year net.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carbon comparison */}
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Yearly carbon, each way
          </h4>
          <div className="grid sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-purple-700 mb-0.5">Heat pump</div>
              <div className="text-lg font-bold text-gray-900 tabular-nums">{fmt(Math.round(calc.heatPumpCO2))} lb</div>
              <div className="text-[11px] text-gray-500">{fmt(Math.round(calc.heatPumpKwh))} kWh × 0.823 lb/kWh (grid)</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-orange-700 mb-0.5">{furnaceLabel}</div>
              <div className="text-lg font-bold text-gray-900 tabular-nums">{fmt(Math.round(calc.furnaceCO2))} lb</div>
              <div className="text-[11px] text-gray-500">{selectedFuelSrc.name} heat + grid cooling</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-0.5">Current system</div>
              <div className="text-lg font-bold text-gray-900 tabular-nums">{fmt(Math.round(calc.currentCO2))} lb</div>
              <div className="text-[11px] text-gray-500">baseline, for reference</div>
            </div>
          </div>
          <p className="text-[11px] text-gray-600 mt-3 leading-snug">
            Grid electricity uses the EPA eGRID2022 U.S. average of 0.823 lb CO₂ per kWh. Fuel combustion uses U.S. EIA coefficients: natural gas 117, propane 139, heating oil 163 lb CO₂ per million BTU. A cleaner local grid lowers the heat pump&rsquo;s number.
          </p>
        </div>

        {/* Climate context + current system baseline */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Snowflake className="w-4 h-4 text-purple-600" />
              Climate context · {selectedClimate.name}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Design temp', detail: 'Coldest 1% winter hours', factor: `${selectedClimate.designTemp}°F` },
                { label: 'Heating degree-days', detail: 'HDD65, drives annual heat', factor: `${fmt(selectedClimate.hdd)}` },
                { label: 'Cooling hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedClimate.coolingHours)}` },
                { label: 'Heat pump HSPF2', detail: 'Assumed seasonal efficiency', factor: `${calc.effectiveHSPF2.toFixed(1)}` },
              ]}
              totals={[]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              HSPF2 is rated for a moderate climate; in colder zones the calculator assumes a lower seasonal efficiency ({HP_HSPF2_BY_ZONE.cold} for cold, {HP_HSPF2_BY_ZONE['very-cold']} for very cold) to account for supplemental resistance heat below the balance point.
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
                { label: 'Annual heat load', detail: `${selectedInsulation.name} envelope × ${fmt(selectedClimate.hdd)} HDD`, factor: `${(calc.heatBtu / 1_000_000).toFixed(1)} MMBtu` },
                { label: 'Heating cost', detail: selectedFuelSrc.value === 'electric-resistance' ? 'Resistance, at the electric rate' : `${fmt(Math.round(calc.currentHeatTherms))} therms × $${gR.toFixed(2)}`, factor: `$${fmtMoney(calc.currentHeatCost)}/yr` },
                { label: 'Cooling cost', detail: `${fmt(selectedClimate.coolingHours)} hrs × ${fmt(calc.coolingLoad)} BTU`, factor: `$${fmtMoney(calc.currentCoolCost)}/yr` },
              ]}
              totals={[
                { label: 'Current annual total', value: `$${fmtMoney(calc.currentCost)}`, valueClass: 'text-red-700' },
              ]}
            />
          </div>
        </div>

        <DisclaimerBox title="The answer depends on your local price ratio, not the technology.">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li><strong>Electric-to-gas price ratio drives the answer.</strong> At the default HSPF2 8.2 / 95% AFUE, heat-pump heating beats a new gas furnace only when the ratio of electricity price ($/kWh) to gas price ($/therm) is low enough. At the defaults (0.18 / 1.35 = 0.133) the furnace usually wins on heating; a cold-climate model or a cleaner, cheaper grid shifts the crossover. Enter your local rates to see where you land.</li>
            <li><strong>Heat pumps lose capacity in extreme cold.</strong> A standard unit needs backup heat (electric strips or a dual-fuel furnace) below its balance point. This calc assumes a lower seasonal HSPF2 in cold ({HP_HSPF2_BY_ZONE.cold}) and very cold ({HP_HSPF2_BY_ZONE['very-cold']}) zones. See our <a href="/heat-pump-size-calculator" className="text-purple-600 underline">Heat Pump Size Calculator</a> for the balance-point math.</li>
            <li><strong>Cold-climate NEEP-listed models</strong> (HSPF2 9.5-10.5) hold 85%+ capacity at 5°F and change the arithmetic. This tool assumes a standard unit; enter a specific model&rsquo;s HSPF2 in the sister calculator.</li>
            <li><strong>Install prices are yours to enter.</strong> The tool ships with no assumed equipment prices. Payback and 15-year net appear only once you enter both installed prices; the federal 25C credit expired 31 Dec 2025, so enter any state/utility/HEAR rebate in the field above (check <a href="https://www.dsireusa.org" className="text-purple-600 underline">DSIRE</a>).</li>
            <li><strong>Load assumption.</strong> Heating uses the shared degree-day heat-loss model (UA × sqft × HDD × 24) set by your insulation level; cooling uses a 25 BTU/sqft screening load. Absolute costs are directional and vary with construction; the recommendation is really a ratio.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>

      <EmbedCode calculatorType="heat-pump-vs-furnace-calculator" title="Heat Pump vs Furnace Calculator" />
    </CalcShell>
  );
}
