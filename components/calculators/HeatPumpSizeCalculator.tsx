'use client';

import { useState, useMemo } from 'react';
import {
  Home,
  Snowflake,
  Sun,
  Zap,
  TrendingUp,
  Layers,
  Users,
  Thermometer,
  AlertTriangle,
  Wind,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  Segmented,
  CardChoice,
  PresetChips,
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

// Climate regions with cooling + heating BTU/sqft and per-region EFLH.
// Heating BTU/sqft aligned to the just-verified FurnaceSizingCalculator
// (physically the same building envelope — the two calcs MUST agree).
// Cooling BTU/sqft: hot-humid/dry bumped to include latent load. EFLH
// values from ASHRAE / Minnesota TRM / ACEEE 2016 by climate region.
const climateRegions = [
  { value: 'hot-humid',   name: 'Hot-Humid',   summary: 'Southeast coastal (FL, GA, AL)', coolingBTU: 26, heatingBTU: 30, coldestTemp: 30, coolingEFLH: 2200, heatingEFLH: 500 },
  { value: 'hot-dry',     name: 'Hot-Dry',     summary: 'Southwest desert (AZ, NV, NM)',  coolingBTU: 23, heatingBTU: 35, coldestTemp: 30, coolingEFLH: 2500, heatingEFLH: 400 },
  { value: 'mixed-humid', name: 'Mixed-Humid', summary: 'Mid-Atlantic (VA, NC, KY)',      coolingBTU: 21, heatingBTU: 45, coldestTemp: 15, coolingEFLH: 1000, heatingEFLH: 2000 },
  { value: 'mixed-dry',   name: 'Mixed-Dry',   summary: 'Central plains (OK, KS, NE)',    coolingBTU: 20, heatingBTU: 45, coldestTemp: 15, coolingEFLH: 1200, heatingEFLH: 1800 },
  { value: 'cold',        name: 'Cold',        summary: 'Northern states (NY, MI, OH)',   coolingBTU: 18, heatingBTU: 50, coldestTemp:  0, coolingEFLH:  700, heatingEFLH: 3000 },
  { value: 'very-cold',   name: 'Very Cold',   summary: 'Upper Midwest (MN, ND, WI)',     coolingBTU: 16, heatingBTU: 55, coldestTemp:-10, coolingEFLH:  400, heatingEFLH: 4000 },
  { value: 'marine',      name: 'Marine',      summary: 'Pacific Northwest (WA, OR)',     coolingBTU: 15, heatingBTU: 45, coldestTemp: 25, coolingEFLH:  500, heatingEFLH: 2200 },
];

const homeAgeOptions = [
  { value: 'new',      name: 'New (2020+)',        factor: 0.85, summary: 'Modern insulation, tight envelope' },
  { value: 'modern',   name: 'Modern (2000–2019)', factor: 0.95, summary: 'Good insulation standards' },
  { value: 'standard', name: 'Standard (1980–1999)', factor: 1.0,  summary: 'Basic insulation' },
  { value: 'older',    name: 'Older (1960–1979)',  factor: 1.15, summary: 'Limited insulation' },
  { value: 'vintage',  name: 'Vintage (pre-1960)', factor: 1.3,  summary: 'Poor / no insulation' },
];

// Heat pump tiers — SEER2 / HSPF2 (current AHRI / ENERGY STAR / DOE metrics
// since 1 Jan 2023). Previous version used pre-2023 SEER/HSPF, and its
// 'standard 8.2 HSPF' tier was below the 7.5 HSPF2 federal minimum. Cooling
// oversize cap per compressor type from ACCA Manual S 3rd Ed. 2023:
// single-stage 1.15, two-stage 1.20, variable 1.30 (heating-dominant
// climates allow up to 1.25 for the cold-climate variable path).
const heatPumpTypes = [
  { value: 'code-min',    name: '14.3 SEER2 / 7.5 HSPF2',  tier: 'Code minimum',     efficiency: 14.3, hspf: 7.5,  price: 3800, compressor: 'single-stage', coolingCap: 1.15,
    note: '2023 federal minimum split-system. Fine for hot/mixed climates. Limited cold-weather output.' },
  { value: 'energy-star', name: '15.2 SEER2 / 8.1 HSPF2',  tier: 'ENERGY STAR',      efficiency: 15.2, hspf: 8.1,  price: 4800, compressor: 'two-stage',    coolingCap: 1.20,
    note: 'ENERGY STAR v6.2 baseline. Two-stage compressor, better dehumidification.' },
  { value: 'premium',     name: '18 SEER2 / 9.5 HSPF2',    tier: 'Premium inverter', efficiency: 18,   hspf: 9.5,  price: 6500, compressor: 'variable',     coolingCap: 1.30,
    note: 'Variable-speed inverter. Quiet, best humidity control, wide modulation.' },
  { value: 'cold-climate',name: '16 SEER2 / 10.0 HSPF2',   tier: 'Cold-climate',     efficiency: 16,   hspf: 10.0, price: 8500, compressor: 'variable',     coolingCap: 1.25,
    note: 'NEEP-listed ccASHP with COP@5°F ≥ 1.75. Holds 90% capacity at 17°F, 85% at 5°F.' },
];

const storiesOptions = [
  { value: '1', name: '1 story',    factor: 0.95 },
  { value: '2', name: '2 stories',  factor: 1.0 },
  { value: '3', name: '3+ stories', factor: 1.1 },
];

const windowAreaOptions = [
  { value: 'minimal',   name: 'Minimal',   sub: 'Few or small windows',   factor: 0.9 },
  { value: 'average',   name: 'Average',   sub: 'Typical home',           factor: 1.0 },
  { value: 'extensive', name: 'Extensive', sub: 'Many or large windows',  factor: 1.15 },
];

const backupHeatOptions = [
  { value: 'none',         name: 'None',          sub: 'Mild climate only',            factor: 0 },
  { value: 'strips-5kw',   name: '5 kW strips',   sub: 'Small homes / mild winters',   factor: 5000 },
  { value: 'strips-10kw',  name: '10 kW strips',  sub: 'Standard backup',              factor: 10000 },
  { value: 'strips-15kw',  name: '15 kW strips',  sub: 'Large/cold-climate homes',     factor: 15000 },
  { value: 'gas-furnace',  name: 'Gas furnace',   sub: 'Dual-fuel hybrid setup',       factor: 0 },
];

const squareFootPresets = [1000, 1500, 2000, 2500, 3000, 4000];
const STANDARD_TON_SIZES = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const DEFAULTS = {
  squareFeet: '2000',
  climate: 'mixed-humid',
  homeAge: 'standard',
  heatPumpType: 'energy-star',
  stories: '2',
  occupants: '4',
  windowArea: 'average',
  backupHeat: 'strips-10kw',
  electricityRate: '0.18',
};

// Piecewise-linear heat pump capacity as a function of outdoor temp.
// Segments: [47, +∞) = cap47; [17, 47] = linear cap47→cap17; [5, 17] =
// linear cap17→cap5; below 5°F = extrapolate the [5,17] slope, clamped
// at zero (a compressor stops producing heat before it produces negative).
function capacityAtTemp(T: number, cap47: number, cap17: number, cap5: number): number {
  if (T >= 47) return cap47;
  if (T >= 17) return cap47 + ((T - 47) / 30) * (cap47 - cap17);
  return Math.max(0, cap17 + ((T - 17) / 12) * (cap17 - cap5));
}

// House heating load as a function of outdoor temp: zero at the 65°F
// balance-envelope assumption, ramps linearly to `designLoad` at the local
// 99% design temperature. Physically requires designTemp < 65°F; if the
// invariant is violated (bad climate preset), return 0 rather than
// division-by-zero Infinity.
function loadAtTemp(T: number, designLoad: number, designTemp: number): number {
  if (T >= 65 || 65 - designTemp <= 0) return 0;
  return designLoad * (65 - T) / (65 - designTemp);
}

// Balance point: the outdoor temp where HP capacity = house heating load.
// Scan 65°F → (designTemp − 10°F) in 0.5°F steps; return the first T where
// capacity crosses below load. Returns null when the HP capacity exceeds
// load across the whole scanned range (a well-sized HP in a mild climate
// with no balance point above the design temp).
function computeBalancePoint(
  designLoad: number,
  designTemp: number,
  cap47: number,
  cap17: number,
  cap5: number,
): number | null {
  if (designLoad <= 0 || cap47 <= 0) return null;
  const stop = designTemp - 10;
  for (let T = 65; T >= stop; T -= 0.5) {
    if (capacityAtTemp(T, cap47, cap17, cap5) <= loadAtTemp(T, designLoad, designTemp)) {
      return Math.round(T * 2) / 2;
    }
  }
  return null;
}

export default function HeatPumpSizeCalculator() {
  const [squareFeet, setSquareFeet]         = useState(DEFAULTS.squareFeet);
  const [climate, setClimate]               = useState(DEFAULTS.climate);
  const [homeAge, setHomeAge]               = useState(DEFAULTS.homeAge);
  const [heatPumpType, setHeatPumpType]     = useState(DEFAULTS.heatPumpType);
  const [stories, setStories]               = useState(DEFAULTS.stories);
  const [occupants, setOccupants]           = useState(DEFAULTS.occupants);
  const [windowArea, setWindowArea]         = useState(DEFAULTS.windowArea);
  const [backupHeat, setBackupHeat]         = useState(DEFAULTS.backupHeat);
  const [electricityRate, setElectricityRate] = useState(DEFAULTS.electricityRate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    squareFeet, climate, homeAge, heatPumpType, stories, occupants,
    windowArea, backupHeat, electricityRate,
  });

  const selectedClimate = climateRegions.find((c) => c.value === src.climate)!;
  const selectedAge     = homeAgeOptions.find((a) => a.value === src.homeAge)!;
  const selectedType    = heatPumpTypes.find((t) => t.value === src.heatPumpType)!;
  const selectedStories = storiesOptions.find((s) => s.value === src.stories)!;
  const selectedWindow  = windowAreaOptions.find((w) => w.value === src.windowArea)!;
  const selectedBackup  = backupHeatOptions.find((b) => b.value === src.backupHeat)!;

  const sqFt   = Math.max(parseFloat(src.squareFeet) || 0, 0);
  const occN   = Math.max(parseFloat(src.occupants)  || 0, 0);
  const kwhRate = Math.max(parseFloat(src.electricityRate) || 0.18, 0);

  const handleReset = () => {
    setSquareFeet(DEFAULTS.squareFeet);
    setClimate(DEFAULTS.climate);
    setHomeAge(DEFAULTS.homeAge);
    setHeatPumpType(DEFAULTS.heatPumpType);
    setStories(DEFAULTS.stories);
    setOccupants(DEFAULTS.occupants);
    setWindowArea(DEFAULTS.windowArea);
    setBackupHeat(DEFAULTS.backupHeat);
    setElectricityRate(DEFAULTS.electricityRate);
    clear();
  };

  const calc = useMemo(() => {
    // === LOAD CALCULATION ===
    const baseCool = sqFt * selectedClimate.coolingBTU;
    const baseHeat = sqFt * selectedClimate.heatingBTU;
    const envelopeFactor = selectedAge.factor * selectedStories.factor * selectedWindow.factor;
    const occupantAdj = Math.max(0, occN - 2) * 400;
    const coolingLoad = baseCool * envelopeFactor + occupantAdj;
    const heatingLoad = baseHeat * envelopeFactor;
    const coolingTons = coolingLoad / 12000;
    const heatingTons = heatingLoad / 12000;

    // === MANUAL S TWO-PATH SIZING (ACCA Manual S 3rd Ed. 2023) ===
    // Standard/mid/premium heat pumps: size to COOLING within the
    // compressor-type oversize window [0.95, coolingCap], where
    // coolingCap = 1.15 single-stage / 1.20 two-stage / 1.30 variable.
    // Cold-climate ccASHP: heating-focused sizing permitted, but bound
    // at MIN(heatingTons, coolingTons × 1.25) to keep summer humidity
    // control and short-cycling risk in check.
    const isCcASHP = selectedType.value === 'cold-climate';
    const coolingCap = selectedType.coolingCap;
    const sizingTarget = isCcASHP
      ? Math.min(heatingTons, coolingTons * 1.25)
      : coolingTons;
    const exceedsSingleUnit = sizingTarget > 5;

    let recommendedSize: number;
    let violatesCoolingCap = false;
    let undersizesCooling = false;
    if (isCcASHP) {
      recommendedSize = STANDARD_TON_SIZES.find((s) => s >= sizingTarget) ?? 5;
    } else {
      // Standard path: prefer smallest size within [0.95, coolingCap] window
      const valid = STANDARD_TON_SIZES.filter(
        (s) => s >= coolingTons * 0.95 && s <= coolingTons * coolingCap,
      );
      if (valid.length > 0) {
        recommendedSize = valid[0];
      } else {
        // No standard size fits window — round up and flag
        recommendedSize = STANDARD_TON_SIZES.find((s) => s >= coolingTons * 0.95) ?? 5;
      }
    }
    const coolingOversize = coolingTons > 0 ? (recommendedSize * 12000) / coolingLoad : 1;

    // Post-check cap/floor violations. Semantics differ per path:
    // - STANDARD path: below the 1.5-ton floor, "150% oversize" is not a
    //   Manual S violation — it's the smallest residential HP being larger
    //   than a tiny cooling load. Only flag violation when above the floor.
    // - CCASHP path: heating drives size UP, so the 1.30 ceiling can be
    //   exceeded even when cooling load is below the floor. Always check.
    const abovefloor = coolingTons >= STANDARD_TON_SIZES[0];
    if (isCcASHP) {
      violatesCoolingCap = coolingOversize > 1.30 * 1.02;
      undersizesCooling = coolingOversize < 0.95 && abovefloor;
    } else if (abovefloor) {
      violatesCoolingCap = coolingOversize > coolingCap * 1.02;
      undersizesCooling = coolingOversize < 0.95;
    }
    const atSizeFloor = !isCcASHP && !abovefloor && recommendedSize === STANDARD_TON_SIZES[0];

    // === CAPACITY vs OUTDOOR TEMPERATURE (per NEEP ccASHP data + AHRI) ===
    const cap47 = recommendedSize * 12000;
    const cap17 = isCcASHP ? cap47 * 0.90 : cap47 * 0.60;
    const cap5  = isCcASHP ? cap47 * 0.85 : cap47 * 0.40;

    // === COMPUTED BALANCE POINT ===
    // Solve for the outdoor temp where HP capacity crosses house heating
    // load. Labeled "estimated ±10°F" in the UI because real balance point
    // varies with the actual envelope + specific equipment curve. When no
    // crossover exists above the design temp (well-sized HP in mild
    // climate), balancePoint stays null and the UI shows "—" rather than
    // fabricating a number.
    const balancePoint: number | null = computeBalancePoint(
      heatingLoad, selectedClimate.coldestTemp, cap47, cap17, cap5,
    );

    // === SUPPLEMENTAL HEAT AT DESIGN TEMP ===
    const hpCapAtDesign = capacityAtTemp(
      selectedClimate.coldestTemp, cap47, cap17, cap5,
    );
    const supplementalBTU = Math.max(0, heatingLoad - hpCapAtDesign);
    const supplementalKW = supplementalBTU / 3412;

    // === ANNUAL ENERGY (use LOAD × EFLH, not nameplate × EFLH) ===
    // SEER2/HSPF2 seasonal metrics already blend part-load performance;
    // for Zone 5+ they run optimistic (HSPF2 is measured in DOE Region
    // IV). Cost estimate is directional — regional utility rate matters
    // more than the last digit here.
    const coolingKWh = (coolingLoad * selectedClimate.coolingEFLH) / (selectedType.efficiency * 1000);
    const heatingKWh = (heatingLoad * selectedClimate.heatingEFLH) / (selectedType.hspf * 1000);
    const totalKWh = coolingKWh + heatingKWh;
    const annualCost = totalKWh * kwhRate;

    const backupNeeded = supplementalBTU > 0;
    // Compare the user's selected electric-strip backup to the required
    // supplemental kW at design temp. Only flags electric-strip options
    // (backup.factor is watts); gas furnace is treated as capable enough.
    const backupCapacityKW = selectedBackup.factor > 0 ? selectedBackup.factor / 1000 : null;
    const insufficientBackup =
      backupCapacityKW !== null && supplementalKW > 0
        ? backupCapacityKW < supplementalKW * 0.9
        : false;

    return {
      baseCool: Math.round(baseCool),
      baseHeat: Math.round(baseHeat),
      coolingLoad: Math.round(coolingLoad),
      heatingLoad: Math.round(heatingLoad),
      coolingTons,
      heatingTons,
      sizingTarget,
      recommendedSize,
      isCcASHP,
      coolingCap,
      coolingOversize,
      violatesCoolingCap,
      undersizesCooling,
      atSizeFloor,
      exceedsSingleUnit,
      cap47: Math.round(cap47),
      cap17: Math.round(cap17),
      cap5: Math.round(cap5),
      balancePoint,
      hpCapAtDesign: Math.round(hpCapAtDesign),
      supplementalBTU: Math.round(supplementalBTU),
      supplementalKW,
      backupCapacityKW,
      insufficientBackup,
      coolingKWh: Math.round(coolingKWh),
      heatingKWh: Math.round(heatingKWh),
      totalKWh: Math.round(totalKWh),
      annualCost,
      backupNeeded,
    };
  }, [sqFt, occN, kwhRate, selectedClimate, selectedAge, selectedType, selectedStories, selectedWindow, selectedBackup]);

  const fit =
    sqFt <= 0
      ? { tone: 'warn' as const, text: 'Enter square footage' }
      : calc.exceedsSingleUnit
      ? { tone: 'warn' as const, text: 'Exceeds single-unit capacity' }
      : calc.undersizesCooling
      ? { tone: 'warn' as const, text: `Cooling served at only ${(calc.coolingOversize * 100).toFixed(0)}% — latent-load risk in humid climates` }
      : calc.violatesCoolingCap
      ? { tone: 'warn' as const, text: `Cooling oversize ${(calc.coolingOversize * 100).toFixed(0)}% exceeds Manual S ${((calc.isCcASHP ? 1.30 : calc.coolingCap) * 100).toFixed(0)}% cap` }
      : calc.atSizeFloor
      ? { tone: 'ok' as const, text: 'At smallest residential HP size — may short-cycle on mild days (consider a ductless mini-split)' }
      : calc.isCcASHP
      ? { tone: 'good' as const, text: `Cold-climate path (heating-focused, ${(calc.coolingOversize * 100).toFixed(0)}% cooling)` }
      : { tone: 'good' as const, text: `Manual S cooling path (${(calc.coolingOversize * 100).toFixed(0)}% of cooling load)` };

  const isHeatingDominated = calc.heatingTons > calc.coolingTons;
  const isCoolingDominated = calc.coolingTons > calc.heatingTons * 1.3;

  return (
    <CalcShell
      Icon={Snowflake}
      title="Heat Pump Size Calculator"
      subtitle="Right capacity for heating AND cooling."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Your home */}
      <section>
        <SectionHeader step={1} title="Your home" subtitle="Size, age, layout" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Heated &amp; cooled floor area (sq ft)
              <InfoTip label="floor area">Total space the heat pump conditions — exclude unconditioned spaces.</InfoTip>
            </label>
            <div className="mb-2">
              <PresetChips value={squareFeet} onChange={setSquareFeet} presets={squareFootPresets} accent={ACCENT} />
            </div>
            <NumberInput value={squareFeet} onChange={setSquareFeet} min={500} max={10000} suffix="sq ft" ariaLabel="Square footage" accent={ACCENT} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Layers className="w-4 h-4 mr-1.5 text-gray-500" />
                Stories
              </label>
              <Segmented value={stories} onChange={setStories} options={storiesOptions.map((s) => ({ value: s.value, name: s.name }))} ariaLabel="Stories" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 mr-1.5 text-gray-500" />
                Regular occupants
              </label>
              <NumberInput value={occupants} onChange={setOccupants} min={1} max={10} suffix="people" ariaLabel="Occupants" accent={ACCENT} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Home age &amp; insulation</label>
            <CardChoice value={homeAge} onChange={setHomeAge} options={homeAgeOptions} ariaLabel="Home age" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Window area</label>
            <CardChoice value={windowArea} onChange={setWindowArea} options={windowAreaOptions} ariaLabel="Window area" columns={3} accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Section 2 — Climate */}
      <section>
        <SectionHeader step={2} title="Your climate" subtitle="DOE climate region" Icon={Sun} accent={ACCENT} />

        <CardChoice
          value={climate}
          onChange={setClimate}
          options={climateRegions.map((c) => ({ value: c.value, name: c.name, summary: c.summary }))}
          ariaLabel="Climate region"
          accent={ACCENT}
        />
      </section>

      {/* Section 3 — Equipment */}
      <section>
        <SectionHeader step={3} title="Heat pump preference" subtitle="Efficiency tier, backup heat, electricity rate" Icon={Zap} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Heat pump tier (SEER2 / HSPF2)
              <InfoTip label="heat pump type">
                SEER2 is cooling efficiency, HSPF2 is heating efficiency (both are the current 2023+ AHRI/DOE metrics — legacy SEER/HSPF are ~5% and ~15% higher for the same equipment). Cold-climate NEEP-listed units maintain ~90% capacity at 17°F and 85% at 5°F — required in cold/very-cold zones.
              </InfoTip>
            </label>
            <CardChoice value={heatPumpType} onChange={setHeatPumpType} options={heatPumpTypes} ariaLabel="Heat pump type" accent={ACCENT} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Wind className="w-4 h-4 mr-1.5 text-gray-500" />
                Backup heat source
                <InfoTip label="backup heat">
                  When outdoor temp drops below the balance point, the heat pump can't meet the whole load alone. Electric strips or a gas furnace fill the gap on the coldest hours.
                </InfoTip>
              </label>
              <CardChoice value={backupHeat} onChange={setBackupHeat} options={backupHeatOptions} ariaLabel="Backup heat" accent={ACCENT} columns={5} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Electricity rate
                <InfoTip label="electricity rate">
                  Your local $/kWh. EIA 2026 national average is ~$0.18. Regional spread is wide: Mountain ~$0.14, Midwest ~$0.16, Northeast ~$0.28, Hawaii ~$0.43.
                </InfoTip>
              </label>
              <NumberInput
                value={electricityRate}
                onChange={setElectricityRate}
                min={0.05}
                max={0.60}
                suffix="$/kWh"
                ariaLabel="Electricity rate"
                accent={ACCENT}
              />
            </div>
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
      {hasResult && sqFt > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended heat pump size"
          value={`${calc.recommendedSize}`}
          unit="tons"
          secondaryText={
            <>
              That&rsquo;s <strong>{fmt(calc.recommendedSize * 12000)} BTU/hr</strong> nominal (47°F rating).
              Sized per Manual S {calc.isCcASHP ? 'heating-focused (cold-climate ccASHP)' : `cooling (${selectedType.compressor}, cap ${(calc.coolingCap * 100).toFixed(0)}%)`} path.
              Cooling load {calc.coolingTons.toFixed(2)} t · heating load {calc.heatingTons.toFixed(2)} t.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          warning={(calc.exceedsSingleUnit || (calc.backupNeeded && src.backupHeat === 'none') || calc.insufficientBackup) ? (
            <>
              {calc.exceedsSingleUnit && (
                <span className="block">
                  Sizing target ({calc.sizingTarget.toFixed(2)} tons) exceeds a single residential heat pump ceiling.
                  You&rsquo;ll need a professional <strong>ACCA Manual J + Manual S</strong> pair, and likely a{' '}
                  <strong>zoned multi-head setup or a dual-fuel hybrid</strong> rather than one oversized unit.
                </span>
              )}
              {calc.backupNeeded && src.backupHeat === 'none' && (
                <span className="block mt-2">
                  Design temp {selectedClimate.coldestTemp}°F is below the estimated balance point{' '}
                  {calc.balancePoint !== null ? `${calc.balancePoint}°F` : '(below design)'}.
                  <strong> You need supplemental heat</strong> (~{calc.supplementalKW.toFixed(1)} kW electric strips
                  or a dual-fuel furnace) for the coldest hours.
                </span>
              )}
              {calc.insufficientBackup && src.backupHeat !== 'none' && calc.backupCapacityKW !== null && (
                <span className="block mt-2">
                  Your <strong>{calc.backupCapacityKW.toFixed(0)} kW strips</strong> cover only{' '}
                  {((calc.backupCapacityKW / calc.supplementalKW) * 100).toFixed(0)}% of the ~{calc.supplementalKW.toFixed(1)} kW
                  supplemental needed at design temp — consider larger strips or a dual-fuel gas furnace.
                </span>
              )}
            </>
          ) : undefined}
          sidePanel={[
            { label: 'Balance point (±10°F est.)', value: calc.balancePoint !== null ? `${calc.balancePoint}°F` : 'Below design' },
            { label: 'Supplemental at design',    value: `${calc.supplementalKW.toFixed(1)} kW` },
            { label: 'Annual cost (est.)',        value: `$${fmtMoney(calc.annualCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Thermometer className="w-4 h-4 text-purple-600" />
              Capacity by outdoor temperature
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { label: 'At 47°F', value: calc.cap47, sub: 'Nameplate rating' },
                { label: 'At 17°F', value: calc.cap17, sub: calc.isCcASHP ? 'ccASHP holds ~90%' : 'Standard drops to ~60%' },
                { label: 'At 5°F',  value: calc.cap5,  sub: calc.isCcASHP ? 'ccASHP holds ~85%' : 'Standard drops to ~40%' },
                { label: `At ${selectedClimate.coldestTemp}°F design`, value: calc.hpCapAtDesign, sub: 'Interpolated from curve' },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[auto_1fr_auto] gap-2 py-1.5 border-b border-gray-100 last:border-0 items-baseline">
                  <span className="font-medium text-gray-700">{row.label}</span>
                  <span className="text-gray-500 truncate">{row.sub}</span>
                  <span className="font-mono text-gray-900 tabular-nums">{fmt(row.value)} BTU</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-300 flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Estimated balance point (±10°F)</span>
                <span className="font-bold text-purple-700">
                  {calc.balancePoint !== null ? `${calc.balancePoint}°F` : '—'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug pt-1">
                {calc.balancePoint === null
                  ? 'Heat pump capacity meets 100% of load down to design temperature — no balance point above design, no supplemental heat needed on typical winter days.'
                  : `Below this temperature, the heat pump alone can't meet the whole load. Real balance point varies ±10°F with actual envelope quality and the specific NEEP-listed model — confirm with Manual S.`}
              </p>
              {calc.supplementalBTU > 0 && (
                <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1 rounded mt-2">
                  Supplemental heat at design temp: <strong>{fmt(calc.supplementalBTU)} BTU/hr</strong> (~{calc.supplementalKW.toFixed(1)} kW electric strips).
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Heating + cooling load breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base cooling', detail: `${fmt(sqFt)} × ${selectedClimate.coolingBTU} BTU/sf`, factor: `${fmt(calc.baseCool)} BTU` },
                { label: 'Base heating', detail: `${fmt(sqFt)} × ${selectedClimate.heatingBTU} BTU/sf`, factor: `${fmt(calc.baseHeat)} BTU` },
                { label: 'Age factor',   detail: selectedAge.name,     factor: `× ${selectedAge.factor.toFixed(2)}` },
                { label: 'Stories',      detail: selectedStories.name, factor: `× ${selectedStories.factor.toFixed(2)}` },
                { label: 'Windows',      detail: selectedWindow.name,  factor: `× ${selectedWindow.factor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Cooling load', value: `${fmt(calc.coolingLoad)} BTU (${calc.coolingTons.toFixed(2)} tons)`, valueClass: 'text-blue-700' },
                { label: 'Heating load', value: `${fmt(calc.heatingLoad)} BTU (${calc.heatingTons.toFixed(2)} tons)`, valueClass: 'text-orange-700' },
              ]}
            />
            {isCoolingDominated && (
              <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1.5 rounded mt-3">
                ☀ Cooling-dominated climate. Prioritize SEER2 and humidity control (variable-speed compressor).
              </p>
            )}
            {isHeatingDominated && (
              <p className="text-[11px] text-blue-700 bg-blue-50 px-2 py-1.5 rounded mt-3">
                ❄ Heating-dominated climate. Prioritize HSPF2 and consider a NEEP-listed cold-climate model.
              </p>
            )}
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-emerald-700" />
              Operating cost (using LOAD × EFLH ÷ efficiency)
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Cooling:</strong> {fmt(calc.coolingKWh)} kWh/yr ({fmt(selectedClimate.coolingEFLH)} EFLH ÷ {selectedType.efficiency} SEER2) ≈ ${fmtMoney(calc.coolingKWh * kwhRate)}</li>
              <li><strong>Heating:</strong> {fmt(calc.heatingKWh)} kWh/yr ({fmt(selectedClimate.heatingEFLH)} EFLH ÷ {selectedType.hspf} HSPF2) ≈ ${fmtMoney(calc.heatingKWh * kwhRate)}</li>
              <li><strong>Total:</strong> {fmt(calc.totalKWh)} kWh/yr × ${kwhRate.toFixed(2)}/kWh = <strong>${fmtMoney(calc.annualCost)}</strong>/yr</li>
              <li className="text-[11px] text-gray-500 pt-1">Cost excludes supplemental-strip runtime — for cold climates with high balance points, add ~10-30% for strips.</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Equipment &amp; Manual S notes
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Tier:</strong> {selectedType.tier} — {selectedType.name}, {selectedType.compressor} compressor.</li>
              <li><strong>Sizing basis:</strong> {calc.isCcASHP ? 'cold-climate heating-focused (Manual S 3rd Ed. 2023)' : `cooling load × [0.95, ${calc.coolingCap.toFixed(2)}]`}. Cooling load served at ~{(calc.coolingOversize * 100).toFixed(0)}%.</li>
              <li>
                <strong>Backup:</strong> {selectedBackup.name}
                {selectedBackup.factor > 0 && ` (${selectedBackup.factor.toLocaleString('en-US')} W = ${(selectedBackup.factor / 1000).toFixed(0)} kW)`}.{' '}
                {src.backupHeat === 'gas-furnace'
                  ? <>Gap at design temp: ~{fmt(calc.supplementalBTU)} BTU/hr gas input (~{fmt(Math.round(calc.supplementalBTU / 0.85))} BTU/hr input at 85% AFUE).</>
                  : <>Needed at design temp: ~{calc.supplementalKW.toFixed(1)} kW.</>}
              </li>
              <li><strong>Equipment cost:</strong> ~${fmtMoney(selectedType.price)} + install (typically 50–80% of equipment).</li>
              <li><strong>Why this tier:</strong> {selectedType.note}</li>
            </ul>
          </div>
        </div>

        <DisclaimerBox title="Manual-S-style estimate — get a real Manual J + S before purchasing.">
          <p>
            This calc applies ACCA <strong>Manual S 3rd Edition (2023)</strong> two-path sizing —
            cooling-load focus for single/two-stage/premium heat pumps, heating-focused (capped at
            cooling × 1.25) for cold-climate NEEP-listed units. Loads are rule-of-thumb from typical
            per-sqft baselines and will run ±30% off the true Manual J number depending on your
            envelope, window orientation, and infiltration.
          </p>
          <p>
            The balance point shown is <strong>estimated</strong> from the load-vs-capacity intersection using
            the tier's typical derating curve — the real balance point varies ±10°F with your specific
            envelope and the exact NEEP-listed model you install. Heat pumps in cold climates especially
            deserve a proper Manual J + Manual S pair from a licensed contractor before purchase —
            equipment selection depends on the specific unit's low-temperature capacity table (NEEP publishes
            these at neep.org/ccashp-specification-product-list).
          </p>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
