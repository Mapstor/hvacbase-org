'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  Users,
  Clock,
  TrendingUp,
  Flame,
  Zap,
  ShowerHead,
  Bath,
  ChefHat,
  Shirt,
} from 'lucide-react';
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

const ACCENT = 'red' as const;

// UEF (Uniform Energy Factor) — the current DOE metric since 2015, replacing
// legacy EF. UEF <1 for combustion / resistance tanks; UEF >1 for HPWHs
// where COP >1 lets a machine deliver more heat energy than it consumes
// (heat pump moves ambient heat, doesn't create it). Values verified
// against ENERGY STAR product listings + DOE 10 CFR 430.32 minimums.
const heaterTypes = [
  { value: 'tank-electric', name: 'Tank, Electric', tier: 'Common',
    uef: 0.92, recoveryRate: 20, price: 1500, isTank: true, isCOP: false,
    note: 'Cheapest install; slow recovery (~20 gal/hr), needs a bigger tank than gas for the same household.' },
  { value: 'tank-gas', name: 'Tank, Gas', tier: 'Common',
    uef: 0.64, recoveryRate: 40, price: 1800, isTank: true, isCOP: false,
    note: 'Fast recovery (~40 gal/hr). Standard in most homes; UEF 0.64 (typical) to 0.68+ (ENERGY STAR).' },
  { value: 'tankless-electric', name: 'Tankless, Electric', tier: 'High',
    uef: 0.98, recoveryRate: 0, price: 2500, isTank: false, isCOP: false,
    note: 'Unlimited hot water. Often needs a 200A panel + multiple 240V circuits for whole-house flow.' },
  { value: 'tankless-gas', name: 'Tankless, Gas', tier: 'High',
    uef: 0.88, recoveryRate: 0, price: 3200, isTank: false, isCOP: false,
    note: 'Unlimited + handles cold inlet better than electric. UEF 0.87-0.90 typical, condensing hits 0.93+.' },
  { value: 'heat-pump', name: 'Heat Pump (HPWH)', tier: 'Ultra',
    uef: 3.5, recoveryRate: 15, price: 3500, isTank: true, isCOP: true,
    note: 'Effective COP 3.0-3.5; ~3× cheaper to run than electric resistance. Needs 700-1000 cu ft of air or louvered closet.' },
  { value: 'solar', name: 'Solar + Backup', tier: 'Ultra',
    uef: 0.90, recoveryRate: 30, price: 6000, isTank: true, isCOP: false,
    note: 'Lowest ongoing cost; highest upfront. UEF here reflects the backup element (solar itself is ~free).' },
];

const usagePatterns = [
  { value: 'low',       name: 'Low',       summary: 'Minimal hot water, conservative habits',        factor: 0.75 },
  { value: 'average',   name: 'Average',   summary: 'Typical household routines',                    factor: 1.0  },
  { value: 'high',      name: 'High',      summary: 'Frequent showers + dishwasher daily',           factor: 1.25 },
  { value: 'very-high', name: 'Very high', summary: 'Large family, multiple baths/showers',          factor: 1.5  },
];

const simultaneousOptions = [
  { value: '1', name: '1 fixture',  sub: 'Single shower at peak' },
  { value: '2', name: '2 fixtures', sub: 'Shower + sink' },
  { value: '3', name: '3 fixtures', sub: '2 showers + sink' },
  { value: '4', name: '4+ fixtures', sub: 'Multiple bathrooms at once' },
];

// Per-fixture gallon consumption verified against EPA WaterSense + AWWA
// residential end-use study values. Shower/laundry reflect current
// low-flow / HE norms (was 25/25 in legacy code — over-estimated by
// ~50-70% on modern fixtures).
const GAL_PER_SHOWER    = 17;   // 2.0 gpm WaterSense × ~8 min
const GAL_PER_BATH      = 40;   // full tub fill
const GAL_PER_DISHWASHER = 6;   // ENERGY STAR / standard modern DW
const GAL_PER_LAUNDRY   = 15;   // HE front-loader; top-loader is higher
const GAL_PER_PERSON_SINK = 4;  // handwashing + food prep

// Standard residential tank sizes. 100/120-gal are commercial/whole-house
// territory — a family that computes above 80 should be routed to
// tandem tanks or a tankless solution, not silently clamped.
const STANDARD_TANK_SIZES = [30, 40, 50, 65, 80];
const TANK_MAX = 80;

// Physical constants for the annual-energy calc. Water heating from
// 55°F inlet to 120°F outlet = 65°F rise (Marko's verify anchor). Real
// groundwater varies (Minnesota ~42°F, Miami ~75°F) — noted in disclaimer.
// 8.33 lb/gal × 1 BTU/lb·°F × ΔT gives BTU per gallon delivered.
const INLET_TEMP_F     = 55;
const DELIVERY_TEMP_F  = 120;
const DELTA_T          = DELIVERY_TEMP_F - INLET_TEMP_F;   // 65°F
const BTU_PER_GAL      = 8.33 * DELTA_T;                    // 541.45 BTU/gal
const BTU_PER_KWH      = 3412;
const BTU_PER_THERM    = 100000;

// FHR planning margin per DOE guidance (peak-hour demand should be met
// with 20% headroom to absorb variability in usage patterns).
const FHR_MARGIN       = 1.20;
// Tank usable-fraction — a nominally 50-gal tank delivers ~70% of its
// volume as hot water before the outlet-temperature drops below the
// setpoint. ANSI/AHRI-published typical value.
const TANK_USABLE_FRACTION = 0.70;

// Household-size sizing table — DOE / ENERGY STAR reference; distinct
// tables for fast-recovery (gas) vs slow-recovery (electric, HPWH)
// because slow-recovery equipment needs ~20-30% more storage to cover
// the same household. The calc takes the LARGER of this table lookup
// and the peak-hour FHR calculation — never the sum (previous code
// summed peak + recovery, producing a ~2× oversize).
const HOUSEHOLD_TABLE_FAST_RECOVERY: Record<number, number> = { 1: 30, 2: 30, 3: 40, 4: 50, 5: 65, 6: 80 };
const HOUSEHOLD_TABLE_SLOW_RECOVERY: Record<number, number> = { 1: 40, 2: 40, 3: 50, 4: 65, 5: 80, 6: 80 };

const DEFAULTS = {
  residents:        '4',
  heaterType:       'tank-gas',
  usagePattern:     'average',
  showersPerDay:    '4',
  bathsPerWeek:     '2',
  dishwasherLoads:  '7',
  laundryLoads:     '5',
  simultaneousUse:  '2',
  electricityRate:  '0.18',   // EIA 2026 US national avg
  gasPrice:         '1.35',   // EIA 2026 heating-season national midpoint
};

export default function WaterHeaterSizingCalculator() {
  const [residents, setResidents]             = useState(DEFAULTS.residents);
  const [heaterType, setHeaterType]           = useState(DEFAULTS.heaterType);
  const [usagePattern, setUsagePattern]       = useState(DEFAULTS.usagePattern);
  const [showersPerDay, setShowersPerDay]     = useState(DEFAULTS.showersPerDay);
  const [bathsPerWeek, setBathsPerWeek]       = useState(DEFAULTS.bathsPerWeek);
  const [dishwasherLoads, setDishwasherLoads] = useState(DEFAULTS.dishwasherLoads);
  const [laundryLoads, setLaundryLoads]       = useState(DEFAULTS.laundryLoads);
  const [simultaneousUse, setSimultaneousUse] = useState(DEFAULTS.simultaneousUse);
  const [electricityRate, setElectricityRate] = useState(DEFAULTS.electricityRate);
  const [gasPrice, setGasPrice]               = useState(DEFAULTS.gasPrice);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    residents, heaterType, usagePattern,
    showersPerDay, bathsPerWeek, dishwasherLoads, laundryLoads,
    simultaneousUse, electricityRate, gasPrice,
  });

  const handleReset = () => {
    setResidents(DEFAULTS.residents);
    setHeaterType(DEFAULTS.heaterType);
    setUsagePattern(DEFAULTS.usagePattern);
    setShowersPerDay(DEFAULTS.showersPerDay);
    setBathsPerWeek(DEFAULTS.bathsPerWeek);
    setDishwasherLoads(DEFAULTS.dishwasherLoads);
    setLaundryLoads(DEFAULTS.laundryLoads);
    setSimultaneousUse(DEFAULTS.simultaneousUse);
    setElectricityRate(DEFAULTS.electricityRate);
    setGasPrice(DEFAULTS.gasPrice);
    clear();
  };

  const selectedType     = heaterTypes.find((t) => t.value === src.heaterType)!;
  const selectedTypeLive = heaterTypes.find((t) => t.value === heaterType)!;
  const selectedUsage    = usagePatterns.find((u) => u.value === src.usagePattern)!;

  const rN = Math.max(parseFloat(src.residents)        || 0, 0);
  const sN = Math.max(parseFloat(src.showersPerDay)    || 0, 0);
  const bN = Math.max(parseFloat(src.bathsPerWeek)     || 0, 0);
  const dN = Math.max(parseFloat(src.dishwasherLoads)  || 0, 0);
  const lN = Math.max(parseFloat(src.laundryLoads)     || 0, 0);
  const eRate = Math.max(parseFloat(src.electricityRate) || 0.18, 0.05);
  const gPrice = Math.max(parseFloat(src.gasPrice)       || 1.35, 0.30);

  const calc = useMemo(() => {
    // === DAILY GALLONS ===
    const showerGallons     = sN * GAL_PER_SHOWER;
    const bathGallons       = (bN / 7) * GAL_PER_BATH;
    const dishwasherGallons = (dN / 7) * GAL_PER_DISHWASHER;
    const laundryGallons    = (lN / 7) * GAL_PER_LAUNDRY;
    const sinkGallons       = rN * GAL_PER_PERSON_SINK;
    const dailyGallons      = (showerGallons + bathGallons + dishwasherGallons + laundryGallons + sinkGallons) * selectedUsage.factor;
    const peakHourDemand    = dailyGallons * 0.30;

    // === TANK SIZING (LARGER of peak-hour FHR model and household table) ===
    // Peak-hour path: required tank volume so that (vol × usable_fraction
    // + recovery during the hour) ≥ peak_demand × 1.2 margin.
    // Household-table path: DOE reference by person count.
    // Take max of the two to protect against both morning-surge peaks
    // AND generic under-sizing for large households with mild-looking
    // habit inputs.
    const requiredFHR = peakHourDemand * FHR_MARGIN;
    const requiredTankVol = Math.max(
      STANDARD_TANK_SIZES[0],
      (requiredFHR - selectedType.recoveryRate) / TANK_USABLE_FRACTION,
    );
    const fhrBasedSize = STANDARD_TANK_SIZES.find((s) => s >= requiredTankVol) ?? TANK_MAX;

    // Solar treated as slow-recovery for household-table lookup: on a
    // cloudy morning the backup element is the whole recovery budget
    // (~15-20 gal/hr, not the 30 gal/hr sunny-day nominal), so solar
    // tanks need the bigger-table sizing to buffer through cloud events.
    const isSlowRecovery =
      selectedType.value === 'tank-electric' ||
      selectedType.value === 'heat-pump' ||
      selectedType.value === 'solar';
    const householdTable = isSlowRecovery ? HOUSEHOLD_TABLE_SLOW_RECOVERY : HOUSEHOLD_TABLE_FAST_RECOVERY;
    const rNClamped = Math.min(Math.max(Math.round(rN), 1), 6);
    const tableBasedSize = householdTable[rNClamped];

    const recommendedTankSize = Math.max(fhrBasedSize, tableBasedSize);
    // Only tank systems have a single-tank ceiling. Tankless has
    // recoveryRate=0, which would trip this check trivially for any
    // household — a nonsensical "consider tankless" recommendation to a
    // user already on tankless.
    const exceedsSingleTank = selectedType.isTank && requiredTankVol > TANK_MAX;

    // === TANKLESS SIZING (unchanged conceptually) ===
    const simultaneousGPM = parseFloat(src.simultaneousUse) * 2.5;
    const adjustedGPM = src.heaterType === 'tankless-electric' ? simultaneousGPM * 1.2 : simultaneousGPM;
    const recommendedTanklessGPM = Math.ceil(adjustedGPM);
    const maxTemperatureRise = src.heaterType === 'tankless-gas' ? 70 : 50;

    // === ANNUAL ENERGY + COST (efficiency divides EXACTLY ONCE) ===
    // Physical chain: annual output BTU → annual fuel input BTU (÷ UEF) →
    // convert to kWh or therms → multiply by price. Previous code
    // divided by efficiency twice (once via energyPerGallon, once via
    // the unit conversion), which under-stated HPWH cost by ~67% and
    // over-stated gas by ~67% — fabricating a fake 10× HPWH advantage.
    const annualOutputBTU = dailyGallons * 365 * BTU_PER_GAL;
    const annualInputBTU = annualOutputBTU / selectedType.uef;

    let yearlyCost = 0;
    if (src.heaterType === 'tank-electric' || src.heaterType === 'tankless-electric' || src.heaterType === 'heat-pump') {
      const kWhPerYear = annualInputBTU / BTU_PER_KWH;
      yearlyCost = kWhPerYear * eRate;
    } else if (src.heaterType === 'tank-gas' || src.heaterType === 'tankless-gas') {
      const thermsPerYear = annualInputBTU / BTU_PER_THERM;
      yearlyCost = thermsPerYear * gPrice;
    } else if (src.heaterType === 'solar') {
      // Solar delivers most heat from sun; backup element runs on
      // electric for the ~30% of demand solar can't cover in an
      // average US installation.
      const solarFraction = 0.70;
      const backupInputBTU = annualOutputBTU * (1 - solarFraction) / selectedType.uef;
      yearlyCost = (backupInputBTU / BTU_PER_KWH) * eRate;
    }

    // === BASELINE COMPARE (for HPWH payback framing) ===
    // Compare vs the equivalent standard electric tank at the same usage.
    const baselineElectricUEF = 0.92;
    const baselineElectricInputBTU = annualOutputBTU / baselineElectricUEF;
    const baselineElectricCost = (baselineElectricInputBTU / BTU_PER_KWH) * eRate;
    const baselineElectricPrice = 1500;   // typical installed cost of a standard electric tank
    const annualSavings = baselineElectricCost - yearlyCost;
    const paybackYears = annualSavings > 0.01
      ? (selectedType.price - baselineElectricPrice) / annualSavings
      : 0;

    const recoveryTime = selectedType.isTank && selectedType.recoveryRate > 0
      ? recommendedTankSize / selectedType.recoveryRate
      : 0;
    const needsVenting = src.heaterType.includes('gas');
    // Electric tankless amp draws are enormous even at 3 GPM (typically
    // 3×25A@240V = ~75A dedicated); a 4 GPM unit runs ~120A dedicated.
    // Warning at >5 GPM was too high — a 100A-service home usually
    // can't accept even a 3 GPM electric tankless without upgrading.
    const needsElectricalUpgrade = src.heaterType === 'tankless-electric' && recommendedTanklessGPM >= 3;

    return {
      showerGallons, bathGallons, dishwasherGallons, laundryGallons, sinkGallons,
      dailyGallons, peakHourDemand,
      requiredFHR, fhrBasedSize, tableBasedSize, recommendedTankSize, exceedsSingleTank,
      recommendedTanklessGPM, maxTemperatureRise,
      annualOutputBTU, annualInputBTU, yearlyCost,
      baselineElectricCost, annualSavings, paybackYears,
      recoveryTime, needsVenting, needsElectricalUpgrade,
    };
  }, [rN, sN, bN, dN, lN, eRate, gPrice, selectedUsage, selectedType, src.heaterType, src.simultaneousUse]);

  // `fit` renders only when hasResult && dailyGallons > 0 (outer gate),
  // so no dead-code "Add residents" branch here.
  const fit =
    calc.exceedsSingleTank
      ? { tone: 'warn' as const, text: `Peak-hour load exceeds ${TANK_MAX}-gal max, needs tandem tanks or tankless` }
      : selectedType.isTank
      ? (calc.peakHourDemand < calc.recommendedTankSize * 0.6
          ? { tone: 'good' as const, text: 'Comfortable headroom' }
          : { tone: 'ok' as const, text: 'Sized to demand' })
      : { tone: 'good' as const, text: 'Tankless, unlimited supply' };

  return (
    <CalcShell
      Icon={Droplets}
      title="Water Heater Sizing Calculator"
      subtitle="DOE FHR sizing + UEF-based annual cost for your household."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Household */}
      <section>
        <SectionHeader step={1} title="Your household" subtitle="Full-time residents drive base demand" Icon={Users} accent={ACCENT} />
        <div className="max-w-xs">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Residents
            <InfoTip label="residents">Count people living in the home full-time. Part-time guests don't materially change peak demand.</InfoTip>
          </label>
          <NumberInput value={residents} onChange={setResidents} min={1} max={10} suffix="people" ariaLabel="Residents" accent={ACCENT} />
        </div>
      </section>

      {/* Section 2, Hot water habits */}
      <section>
        <SectionHeader step={2} title="Hot-water habits" subtitle="What gets used and how often" Icon={ShowerHead} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Usage pattern</label>
            <CardChoice value={usagePattern} onChange={setUsagePattern} options={usagePatterns} ariaLabel="Usage pattern" accent={ACCENT} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <ShowerHead className="w-4 h-4 mr-1.5 text-gray-500" />
                Showers / day
              </label>
              <NumberInput value={showersPerDay} onChange={setShowersPerDay} min={0} max={20} ariaLabel="Showers per day" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Bath className="w-4 h-4 mr-1.5 text-gray-500" />
                Baths / week
              </label>
              <NumberInput value={bathsPerWeek} onChange={setBathsPerWeek} min={0} max={20} ariaLabel="Baths per week" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <ChefHat className="w-4 h-4 mr-1.5 text-gray-500" />
                Dishwasher / wk
              </label>
              <NumberInput value={dishwasherLoads} onChange={setDishwasherLoads} min={0} max={30} ariaLabel="Dishwasher loads per week" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Shirt className="w-4 h-4 mr-1.5 text-gray-500" />
                Laundry / wk
              </label>
              <NumberInput value={laundryLoads} onChange={setLaundryLoads} min={0} max={30} ariaLabel="Laundry loads per week" accent={ACCENT} className="max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3, Heater type + rates */}
      <section>
        <SectionHeader step={3} title="Heater type &amp; rates" subtitle="Equipment + your local energy prices" Icon={Flame} accent={ACCENT} />
        <CardChoice value={heaterType} onChange={setHeaterType} options={heaterTypes} ariaLabel="Heater type" accent={ACCENT} />

        {!selectedTypeLive.isTank && (
          <div className="mt-4">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Peak simultaneous fixtures
              <InfoTip label="simultaneous fixtures">How many hot-water fixtures run at the same time during your peak hour.</InfoTip>
            </label>
            <CardChoice value={simultaneousUse} onChange={setSimultaneousUse} options={simultaneousOptions} ariaLabel="Simultaneous fixtures" accent={ACCENT} columns={4} />
          </div>
        )}

        <div className="mt-5 grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Electricity rate
              <InfoTip label="electricity rate">EIA 2026 US national average ≈ $0.18/kWh; regional spread $0.14 (Mountain) → $0.28 (Northeast).</InfoTip>
            </label>
            <NumberInput value={electricityRate} onChange={setElectricityRate} min={0.05} max={0.60} suffix="$/kWh" ariaLabel="Electricity rate" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Natural gas price
              <InfoTip label="gas price">EIA 2026 US heating-season national midpoint ≈ $1.35/therm; regional spread $1.05 (South) → $1.60 (Northeast).</InfoTip>
            </label>
            <NumberInput value={gasPrice} onChange={setGasPrice} min={0.30} max={4.00} suffix="$/therm" ariaLabel="Gas price" accent={ACCENT} />
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
      {hasResult && calc.dailyGallons > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow={selectedType.isTank ? 'Recommended tank size' : 'Recommended tankless capacity'}
          value={selectedType.isTank ? calc.recommendedTankSize : calc.recommendedTanklessGPM}
          unit={selectedType.isTank ? 'gallon tank' : 'GPM flow rate'}
          secondaryText={
            selectedType.isTank ? (
              <>
                Sized for your {fmt(Math.round(calc.dailyGallons))} gallons/day demand
                ({fmt(Math.round(calc.peakHourDemand))} gal in your peak hour). Recovery time full-tank:{' '}
                <strong>{calc.recoveryTime.toFixed(1)} hrs</strong>.
                Sizing pick = larger of peak-hour FHR ({calc.fhrBasedSize} gal) and household-size table ({calc.tableBasedSize} gal).
              </>
            ) : (
              <>
                Sized for {simultaneousOptions.find((o) => o.value === src.simultaneousUse)?.name ?? `${src.simultaneousUse} fixtures`}.
                Max temperature rise: <strong>{calc.maxTemperatureRise}°F</strong>, cold-inlet regions (winter groundwater 40°F, delivery 120°F = 80°F rise) can cut delivered GPM by 30-50%.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          warning={(calc.exceedsSingleTank || calc.needsElectricalUpgrade) ? (
            <>
              {calc.exceedsSingleTank && (
                <span className="block">
                  Peak-hour demand ({fmt(Math.round(calc.peakHourDemand))} gal, requires FHR {fmt(Math.round(calc.requiredFHR))}) exceeds a single {TANK_MAX}-gal tank&rsquo;s capacity.
                  You&rsquo;ll need <strong>tandem tanks (two in series), a tankless system,</strong> or a mixed-fuel setup.
                </span>
              )}
              {calc.needsElectricalUpgrade && (
                <span className="block mt-2">
                  An electric tankless above 5 GPM needs <strong>200A service + multiple 240V circuits</strong>. Panel upgrade typically $2,000-4,000.
                </span>
              )}
            </>
          ) : undefined}
          sidePanel={[
            { label: 'Daily use',   value: `${fmt(Math.round(calc.dailyGallons))} gal` },
            { label: 'Peak hour',   value: `${fmt(Math.round(calc.peakHourDemand))} gal` },
            { label: 'Annual cost', value: `$${fmtMoney(calc.yearlyCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-red-600" />
              Daily usage breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Showers',     detail: `${sN} × ${GAL_PER_SHOWER} gal`,       factor: `${fmt(Math.round(calc.showerGallons))} gal` },
                { label: 'Baths',       detail: `${bN}/wk × ${GAL_PER_BATH} gal ÷ 7`,  factor: `${fmt(Math.round(calc.bathGallons))} gal` },
                { label: 'Dishwasher',  detail: `${dN}/wk × ${GAL_PER_DISHWASHER} gal ÷ 7`, factor: `${fmt(Math.round(calc.dishwasherGallons))} gal` },
                { label: 'Laundry',     detail: `${lN}/wk × ${GAL_PER_LAUNDRY} gal ÷ 7`,   factor: `${fmt(Math.round(calc.laundryGallons))} gal` },
                { label: 'Sinks',       detail: `${rN} × ${GAL_PER_PERSON_SINK} gal`,      factor: `${fmt(Math.round(calc.sinkGallons))} gal` },
                { label: 'Usage pattern', detail: selectedUsage.name,                     factor: `× ${selectedUsage.factor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Daily hot water', value: `${fmt(Math.round(calc.dailyGallons))} gal/day`, valueClass: 'text-red-700' },
                { label: 'Annual',          value: `${fmt(Math.round(calc.dailyGallons * 365))} gal/yr` },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-red-600" />
              Performance &amp; operating cost
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li><strong>Type:</strong> {selectedType.name} ({selectedType.tier})</li>
              <li><strong>Efficiency:</strong> {selectedType.isCOP ? `UEF ${selectedType.uef.toFixed(1)} (COP-basis)` : `UEF ${selectedType.uef.toFixed(2)}`}</li>
              {selectedType.isTank ? (
                <>
                  <li><strong>Recovery:</strong> {selectedType.recoveryRate} gal/hr · full tank refill in {calc.recoveryTime.toFixed(1)} hrs</li>
                  <li><strong>Standby loss:</strong> 5-10%/day (tank radiates heat continuously)</li>
                </>
              ) : (
                <>
                  <li><strong>Flow rate:</strong> {calc.recommendedTanklessGPM} GPM at {calc.maxTemperatureRise}°F rise</li>
                  <li><strong>No standby loss:</strong> only fires when water flows</li>
                </>
              )}
              <li><strong>Equipment cost:</strong> ~${fmtMoney(selectedType.price)} (equipment only; install adds 50-100%)</li>
              <li><strong>Venting required:</strong> {calc.needsVenting ? 'Yes (gas, B-vent or PVC condensing)' : 'No (electric)'}</li>
              <li className="pt-1.5 border-t border-gray-100">
                <strong>Annual operating cost:</strong>{' '}
                <span className="text-emerald-700 font-bold">${fmtMoney(calc.yearlyCost)}</span>
              </li>
              {!['tank-electric', 'tankless-electric'].includes(selectedType.value) && calc.annualSavings > 0 && calc.paybackYears > 0 && calc.paybackYears < 30 && (
                <li>
                  <strong>vs standard electric tank:</strong>{' '}
                  saves ${fmtMoney(calc.annualSavings)}/yr &middot; payback ~{calc.paybackYears.toFixed(1)} years
                </li>
              )}
            </ul>
          </div>

          {src.heaterType === 'heat-pump' && (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" /> Why a heat pump water heater (HPWH)
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                HPWHs pull heat from surrounding air (basement, garage, utility room) instead of generating it electrically.
                Effective COP 3.0-3.5 → saves roughly <strong>${fmtMoney(calc.annualSavings)}/yr</strong> vs a standard electric tank.
                They also cool and dehumidify the space they&rsquo;re in. <strong>Install caveats</strong>: needs 700-1000 cu ft of ambient air (or a louvered closet) to avoid stalling; slow recovery means the tank should be sized 20-30% larger than a comparable gas unit.
                <br /><br />
                <strong>2026 tax-credit status</strong>: The federal 25C Energy Efficient Home Improvement Credit
                (which previously covered up to $2,000 for ENERGY STAR HPWHs) <strong>expired 31 Dec 2025</strong> under
                the OBBBA. For 2026 installs, check current DOE/EPA rebate programs and state/utility incentives, 
                the federal tax credit is no longer available.
              </p>
            </div>
          )}

          {calc.recommendedTankSize >= 65 && selectedType.isTank && src.heaterType !== 'heat-pump' && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-700" /> Also consider
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                At {calc.recommendedTankSize} gal / {fmt(Math.round(calc.dailyGallons))} gal-per-day you&rsquo;re a
                strong candidate for a <strong>heat-pump water heater</strong> (~3× cheaper to run than electric
                resistance, ~2× vs gas). Tankless is another option, unlimited hot water and no standby losses,
                but rarely pays back on energy alone (~$50-100/yr savings on this load) and often needs a bigger
                electrical service or gas line.
              </p>
            </div>
          )}
        </div>

        <DisclaimerBox title="Sizing right matters | both ways.">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>This is a <strong>screening estimate</strong>, not UEF-bin-exact. Get manufacturer FHR + UEF specs and your local AHJ (plumbing inspector) sign-off before purchasing.</li>
            <li><strong>Groundwater inlet varies by region</strong> (~42°F Minnesota winter to ~75°F Miami; calc assumes {INLET_TEMP_F}°F → {DELIVERY_TEMP_F}°F, {DELTA_T}°F rise). Cold-inlet regions can add <strong>~25-30%</strong> to annual cost; warm-inlet regions cut it by roughly the same amount. Because BTU/gal scales linearly with ΔT, the real regional swing is ~45/65 → 85/65 = 0.7×–1.3×.</li>
            <li><strong>HPWH install</strong>: needs 700-1,000 cu ft of ambient air (unfinished basement, garage, or louvered closet). A tight utility closet stalls the compressor. Also cools + dehumidifies the room ~10°F.</li>
            <li><strong>Electric tanks recover ~2× slower than gas</strong>, the calc sizes electric 20-30% larger than the equivalent gas unit for the same household to compensate.</li>
            <li><strong>Tankless payback</strong>: tankless rarely pays back on energy alone vs a well-sized tank (~$50-100/yr savings), buy it for unlimited hot water and space savings, not fuel economics. Permitting-grade sizing needs a 2018 UPC/IPC fixture-unit demand calc with diversity factor, not the 2.5 GPM/fixture rule of thumb used here.</li>
            <li><strong>Solar</strong> cost estimate assumes a 70% solar fraction, realistic for Sunbelt annual, aggressive for Northern US where winter solar fraction can drop to 40-50%, roughly doubling backup-element cost. Get a site-specific SRCC OG-300 rating for your climate before purchasing.</li>
            <li><strong>Federal manufacture rule</strong>: The DOE&rsquo;s amended 10 CFR 430.32 requires new residential electric water heaters &gt;55 gal <em>manufactured after</em> the phased compliance date (currently targeted 2029, subject to ongoing rulemaking) to meet HPWH-tier efficiency. This affects future product availability, not current installs, standard large electric tanks remain legally installable today.</li>
            <li><strong>Peak-hour tip</strong>: for tankless, the biggest sizing mistake is under-estimating the required temperature rise. A unit that delivers 7 GPM in Texas (60°F inlet) will only deliver 4 GPM in Minnesota in February (42°F inlet).</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
