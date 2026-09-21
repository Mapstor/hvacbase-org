'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  Home,
  TrendingUp,
  Ruler,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
  CardChoice,
  PresetChips,
  NumberInput,
  Segmented,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'emerald' as const;

// Space-type is now informational + drives ONLY the basement/crawlspace
// surcharge (previously the calc double-counted by multiplying a base by
// a "space moistureFactor" AND a separate condition factor, which for
// bathroom + wet compounded to ~2.1× — AHAM's condition scale already
// captures those observable moisture symptoms).
const spaceTypes = [
  { value: 'basement',   name: 'Basement',        summary: 'Below-grade concrete foundation', Icon: Home },
  { value: 'crawlspace', name: 'Crawlspace',      summary: 'Below floor, ground moisture',    Icon: Home },
  { value: 'living',     name: 'Living area',     summary: 'Standard above-grade room',       Icon: Home },
  { value: 'bedroom',    name: 'Bedroom',         summary: 'Quiet above-grade room',          Icon: Home },
  { value: 'garage',     name: 'Garage',          summary: 'Semi-conditioned',                Icon: Home },
];

// Basement/crawlspace add a fixed envelope surcharge for below-grade
// moisture load per AHAM/Consumer Reports guidance (~10-15% adder).
const BASEMENT_SURCHARGE = 5;

// Base + rate per sqft, calibrated against ENERGY STAR published sizing
// anchors (post-DOE-2020 65°F/60% RH test scale, ANSI/AHAM DH-1-2020).
// Anchor targets verified this pass:
//   500 sqft moderately damp → 20 pt (ES 20-25 range)
//   1000 sqft very damp       → 30 pt (ES 30-40 range)
//   1000 sqft wet             → 45 pt (ES 40-50 range)
//   1500 sqft very damp       → 37 pt raw → recommends 50-pt unit (ES ~50 target)
//   2000 sqft wet             → 70 pt (ES 50+ minimum)
// Base grows with dampness class; slope grows with per-sqft moisture
// generation rate. Chosen to be monotonic in dampness at every sqft.
const moistureConditions = [
  {
    value: 'moderate',  name: 'Slightly / moderately damp',
    summary: '50-60% RH, musty smell in humid weather',
    basePints: 15,  sqftRate: 0.010,
  },
  {
    value: 'very',      name: 'Very damp',
    summary: '60-70% RH, damp spots, feels wet',
    basePints: 16,  sqftRate: 0.014,
  },
  {
    value: 'wet',       name: 'Wet',
    summary: '70-80% RH, walls sweat, seepage',
    basePints: 20,  sqftRate: 0.025,
  },
  {
    value: 'extremely', name: 'Extremely wet',
    summary: '80%+ RH, standing water, visible mold',
    basePints: 25,  sqftRate: 0.032,
  },
];

// Ceiling height as a proportional multiplier: >8 ft adds moisture load
// proportional to the extra conditioned volume (ES / AHAM convention).
// ×1.05 per foot above 8 ft matches ES's cited "10-ft ceilings = +10%".
const ceilingHeights = [
  { value: '8',  name: '8 ft',   sub: 'Standard',   factor: 1.00 },
  { value: '9',  name: '9 ft',   sub: 'Tall',       factor: 1.05 },
  { value: '10', name: '10 ft',  sub: 'Extra tall', factor: 1.10 },
  { value: '12', name: '12 ft+', sub: 'Vaulted',    factor: 1.20 },
];

// Additive moisture-source surcharges, per ENERGY STAR / AHAM guidance.
const LAUNDRY_SURCHARGE     = 10;  // washer/dryer in or adjacent to space
const BATHROOM_SURCHARGE    =  5;  // frequent-shower source adjacent
const OCCUPANT_SURCHARGE    =  5;  // more than 2 regular occupants

// Current DOE post-2020 residential portable dehumidifier standard sizes.
// The 20/22/25-pint tier didn't exist in the old array — these are the
// dominant post-2019 market SKUs for small/moderately-damp rooms. Above
// 70 pt, portable class ends and whole-house / commercial LGR territory
// begins (ENERGY STAR product-class ceiling 155 PPD, but any single-
// portable-unit sizing beyond 70 needs a whole-house route).
const STANDARD_SIZES = [20, 22, 25, 30, 35, 50, 70];
const PORTABLE_MAX = 70;

// Energy: 10 W per rated pint of capacity while running is the ENERGY
// STAR V6.0 midpoint (was 8, which under-stated by ~20-30%). Runtime
// uses the AHAM 24-hour capacity rating basis — previous code used ×12,
// which reported half the physical runtime and cascaded to under-
// estimated kWh.
const WATTS_PER_PINT = 10;
const AHAM_HOURS_BASIS = 24;

const sqftPresets = [500, 1000, 1500, 2000, 3000];

const DEFAULTS = {
  squareFeet:    '1000',
  spaceType:     'basement',
  moistureLevel: 'very',
  ceilingHeight: '8',
  hasLaundry:    'no',
  hasBathroom:   'no',
  multiOccupant: 'no',
  electricityRate: '0.18',
};

const yesNoOptions = [
  { value: 'no',  name: 'No'  },
  { value: 'yes', name: 'Yes' },
];

export default function DehumidifierSizingCalculator() {
  const [squareFeet, setSquareFeet]           = useState(DEFAULTS.squareFeet);
  const [spaceType, setSpaceType]             = useState(DEFAULTS.spaceType);
  const [moistureLevel, setMoistureLevel]     = useState(DEFAULTS.moistureLevel);
  const [ceilingHeight, setCeilingHeight]     = useState(DEFAULTS.ceilingHeight);
  const [hasLaundry, setHasLaundry]           = useState(DEFAULTS.hasLaundry);
  const [hasBathroom, setHasBathroom]         = useState(DEFAULTS.hasBathroom);
  const [multiOccupant, setMultiOccupant]     = useState(DEFAULTS.multiOccupant);
  const [electricityRate, setElectricityRate] = useState(DEFAULTS.electricityRate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    squareFeet, spaceType, moistureLevel, ceilingHeight,
    hasLaundry, hasBathroom, multiOccupant, electricityRate,
  });

  const space    = spaceTypes.find((s) => s.value === src.spaceType)!;
  const moisture = moistureConditions.find((m) => m.value === src.moistureLevel)!;
  const ceiling  = ceilingHeights.find((c) => c.value === src.ceilingHeight)!;

  const sqft = Math.max(parseFloat(src.squareFeet) || 0, 0);
  const kwhRate = Math.max(parseFloat(src.electricityRate) || 0.18, 0);

  const handleReset = () => {
    setSquareFeet(DEFAULTS.squareFeet);
    setSpaceType(DEFAULTS.spaceType);
    setMoistureLevel(DEFAULTS.moistureLevel);
    setCeilingHeight(DEFAULTS.ceilingHeight);
    setHasLaundry(DEFAULTS.hasLaundry);
    setHasBathroom(DEFAULTS.hasBathroom);
    setMultiOccupant(DEFAULTS.multiOccupant);
    setElectricityRate(DEFAULTS.electricityRate);
    clear();
  };

  const calc = useMemo(() => {
    // === BASE LOAD from ENERGY STAR matrix ===
    const baseFromMatrix = moisture.basePints + moisture.sqftRate * sqft;

    // Ceiling as proportional multiplier — applied to the load, not
    // to the surcharges (occupants/laundry/etc are volume-independent).
    const ceilingAdjusted = baseFromMatrix * ceiling.factor;

    // === ADDITIVE SURCHARGES ===
    const surcharges: { label: string; pints: number }[] = [];
    const isBelowGrade = space.value === 'basement' || space.value === 'crawlspace';
    if (isBelowGrade) {
      surcharges.push({
        label: space.value === 'basement' ? 'Basement (below-grade)' : 'Crawlspace (ground moisture)',
        pints: BASEMENT_SURCHARGE,
      });
    }
    if (src.hasLaundry === 'yes')     surcharges.push({ label: 'Laundry in/adjacent',       pints: LAUNDRY_SURCHARGE });
    if (src.hasBathroom === 'yes')    surcharges.push({ label: 'Bathroom adjacent',         pints: BATHROOM_SURCHARGE });
    if (src.multiOccupant === 'yes')  surcharges.push({ label: 'More than 2 occupants',     pints: OCCUPANT_SURCHARGE });

    const surchargeTotal = surcharges.reduce((sum, s) => sum + s.pints, 0);
    const totalPints = ceilingAdjusted + surchargeTotal;

    // === STANDARD SIZE + PORTABLE CAP ===
    // When totalPints > PORTABLE_MAX, ideal stays null — the UI must
    // render a "whole-house required" label rather than silently clamping
    // to 70 pt (which would BOTH recommend a unit AND say the unit is
    // insufficient, contradicting itself).
    const exceedsPortable = totalPints > PORTABLE_MAX;
    const rawIdeal = STANDARD_SIZES.find((s) => s >= totalPints);
    const ideal = rawIdeal ?? PORTABLE_MAX;   // still needed for runtime/energy math
    const idx = STANDARD_SIZES.indexOf(ideal);
    // Only surface a neighbor size when it actually differs from ideal —
    // at the boundaries (ideal=20 or ideal=70) one neighbor collapses
    // onto ideal and would show a nonsense "Smaller: 20 (same)" panel.
    const minimumRaw = idx > 0 ? STANDARD_SIZES[idx - 1] : null;
    const maximumRaw = idx < STANDARD_SIZES.length - 1 ? STANDARD_SIZES[idx + 1] : null;

    // === RUNTIME + ENERGY ===
    // AHAM ratings are pints per 24 hr of continuous compressor operation.
    // Fractional runtime = load / capacity, converted to hours per day by
    // × 24 (previous code used × 12, halving reported runtime).
    const dailyRuntime = ideal > 0
      ? Math.min(AHAM_HOURS_BASIS, (totalPints / ideal) * AHAM_HOURS_BASIS)
      : 0;
    const dailyEnergyUse = (ideal * WATTS_PER_PINT * dailyRuntime) / 1000;
    const monthlyEnergyUse = dailyEnergyUse * 30;
    const monthlyCost = monthlyEnergyUse * kwhRate;

    return {
      baseFromMatrix,
      ceilingAdjusted,
      surcharges,
      surchargeTotal,
      totalPints,
      ideal,
      minimumRaw,
      maximumRaw,
      exceedsPortable,
      dutyCycleFraction: ideal > 0 ? totalPints / ideal : 0,
      dailyRuntime,
      dailyEnergyUse,
      monthlyEnergyUse,
      monthlyCost,
    };
  }, [sqft, space, moisture, ceiling, src.hasLaundry, src.hasBathroom, src.multiOccupant, kwhRate]);

  // Fit tone splits into three bands to match the disclaimer's own
  // "target 40-70% duty cycle" guidance — a 100%-duty exact-match pick
  // shouldn't display in a green "good" chip while the disclaimer warns
  // against 100% duty.
  const dutyPct = calc.dutyCycleFraction * 100;
  const fit =
    sqft <= 0
      ? { tone: 'warn' as const, text: 'Enter space size' }
      : calc.exceedsPortable
      ? { tone: 'warn' as const, text: `${calc.totalPints.toFixed(0)} pt load exceeds single portable, needs whole-house / commercial LGR` }
      : dutyPct > 85
      ? { tone: 'warn' as const, text: `${calc.ideal}-pint unit runs at ~${dutyPct.toFixed(0)}% duty, consider one size up for headroom` }
      : dutyPct < 25
      ? { tone: 'ok' as const, text: `${calc.ideal}-pint unit ~${dutyPct.toFixed(0)}% duty, sized generously` }
      : { tone: 'good' as const, text: `${calc.ideal}-pint unit ~${dutyPct.toFixed(0)}% duty (40-70% target)` };

  return (
    <CalcShell
      Icon={Droplets}
      title="Dehumidifier Sizing Calculator"
      subtitle="ENERGY STAR–matrix pint capacity for your space and moisture level."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Space" subtitle="Size and location" Icon={Home} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Floor area</label>
            <div className="mb-2">
              <PresetChips value={squareFeet} onChange={setSquareFeet} presets={sqftPresets} accent={ACCENT} />
            </div>
            <NumberInput value={squareFeet} onChange={setSquareFeet} min={100} max={5000} suffix="sq ft" ariaLabel="Square feet" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Space type</label>
            <CardChoice value={spaceType} onChange={setSpaceType} options={spaceTypes} ariaLabel="Space type" accent={ACCENT} columns={5} />
            <p className="text-xs text-gray-500 mt-1.5">
              Basement and crawlspace add a fixed +{BASEMENT_SURCHARGE} pt below-grade envelope surcharge.
            </p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Ruler className="w-4 h-4 mr-1.5 text-gray-500" />
              Ceiling height
              <InfoTip label="ceiling">
                Taller ceilings mean more conditioned air volume to dry. ×1.10 for 10-ft, ×1.20 for 12-ft+ per ENERGY STAR volume convention.
              </InfoTip>
            </label>
            <Segmented value={ceilingHeight} onChange={setCeilingHeight} options={ceilingHeights.map(c => ({value: c.value, name: c.name, sub: c.sub}))} ariaLabel="Ceiling height" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Moisture condition" subtitle="How damp does the space feel" Icon={Droplets} accent={ACCENT} />
        <p className="text-xs text-gray-600 mb-3">
          The ANSI/AHAM DH-1-2020 scale is based on observable moisture, pick the row that matches what you see and smell, not a humidity number.
        </p>
        <CardChoice value={moistureLevel} onChange={setMoistureLevel} options={moistureConditions} ariaLabel="Moisture level" accent={ACCENT} />
      </section>

      <section>
        <SectionHeader step={3} title="Adjacent moisture sources" subtitle="Add-ons that raise the load" Icon={TrendingUp} accent={ACCENT} />
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Laundry in/adjacent
              <span className="ml-auto text-xs text-gray-500">+{LAUNDRY_SURCHARGE} pt</span>
            </label>
            <Segmented value={hasLaundry} onChange={setHasLaundry} options={yesNoOptions} ariaLabel="Laundry present" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Bathroom adjacent
              <span className="ml-auto text-xs text-gray-500">+{BATHROOM_SURCHARGE} pt</span>
            </label>
            <Segmented value={hasBathroom} onChange={setHasBathroom} options={yesNoOptions} ariaLabel="Bathroom adjacent" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              More than 2 occupants
              <span className="ml-auto text-xs text-gray-500">+{OCCUPANT_SURCHARGE} pt</span>
            </label>
            <Segmented value={multiOccupant} onChange={setMultiOccupant} options={yesNoOptions} ariaLabel="Multi occupant" accent={ACCENT} />
          </div>
        </div>
        <div className="mt-5 max-w-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Electricity rate
            <InfoTip label="electricity rate">
              For the operating-cost estimate. EIA 2026 US national average ≈ $0.18/kWh; regional spread $0.14 (Mountain) → $0.28 (Northeast).
            </InfoTip>
          </label>
          <NumberInput value={electricityRate} onChange={setElectricityRate} min={0.05} max={0.60} suffix="$/kWh" ariaLabel="Electricity rate" accent={ACCENT} className="max-w-xs" />
        </div>
      </section>

      <CalculateResetBar
        onCalculate={calculate}
        onReset={handleReset}
        dirty={dirty}
        hasResult={hasResult}
        accent={ACCENT}
      />

      {hasResult && sqft > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow={calc.exceedsPortable ? 'Load exceeds portable class' : 'Recommended dehumidifier capacity'}
          value={calc.exceedsPortable ? 'Whole-house' : `${calc.ideal}`}
          unit={calc.exceedsPortable ? 'system needed' : 'pints/day'}
          secondaryText={calc.exceedsPortable ? (
            <>
              Your {fmt(sqft)} sq ft {space.name.toLowerCase()} at {moisture.name.toLowerCase()} conditions needs{' '}
              <strong>{calc.totalPints.toFixed(0)} pints/day</strong>, above the ~70 pt/day portable ceiling.
              No single residential portable can cover this load.
            </>
          ) : (
            <>
              Your {fmt(sqft)} sq ft {space.name.toLowerCase()} at {moisture.name.toLowerCase()} conditions needs roughly{' '}
              <strong>{calc.totalPints.toFixed(1)} pints/day</strong> of moisture removal.
              The closest standard current-DOE post-2020 size is <strong>{calc.ideal} pints</strong>.
            </>
          )}
          fitTone={fit.tone}
          fitText={fit.text}
          warning={calc.exceedsPortable ? (
            <>
              You&rsquo;ll need either a <strong>whole-house dehumidifier</strong> (HVAC-installed inline unit,
              typically $1,200-2,500 equipment + install) or <strong>multiple portable units</strong> zoned across
              the space. A single 70-pint portable will run continuously and never reach target humidity.
            </>
          ) : undefined}
          sidePanel={calc.exceedsPortable ? [
            { label: 'Load',              value: `${calc.totalPints.toFixed(0)} pt/day` },
            { label: 'Portable ceiling',  value: `${PORTABLE_MAX} pt` },
            { label: 'Next step',         value: 'Whole-house / LGR' },
          ] : [
            { label: 'Smaller option', value: calc.minimumRaw !== null ? `${calc.minimumRaw} pt` : ', ' },
            { label: 'Larger option',  value: calc.maximumRaw !== null ? `${calc.maximumRaw} pt` : ', ' },
            { label: 'Est. runtime',   value: `${calc.dailyRuntime.toFixed(1)} hr/day` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-emerald-600" />
              Sizing breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base load',       detail: `${moisture.basePints} + ${moisture.sqftRate} × ${fmt(sqft)} sq ft`, factor: `${calc.baseFromMatrix.toFixed(1)} pt` },
                { label: 'Ceiling',         detail: `${ceiling.name} (× ${ceiling.factor.toFixed(2)})`,                    factor: `${calc.ceilingAdjusted.toFixed(1)} pt` },
                ...calc.surcharges.map((s) => ({ label: s.label, detail: 'Additive surcharge', factor: `+ ${s.pints} pt` })),
              ]}
              totals={[
                { label: 'Required capacity', value: `${calc.totalPints.toFixed(1)} pt/day`, valueClass: 'text-emerald-700' },
                { label: 'Standard size',     value: calc.exceedsPortable ? 'Exceeds portable, whole-house required' : `${calc.ideal} pt`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Operating estimate
              {calc.exceedsPortable && (
                <span className="ml-auto text-[10px] font-normal text-amber-700">for a single 70-pt portable (undersized)</span>
              )}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Daily runtime',  detail: `AHAM 24-hr basis`,                factor: `${calc.dailyRuntime.toFixed(1)} hr` },
                { label: 'Daily energy',   detail: `${calc.ideal} pt × ${WATTS_PER_PINT} W/pt`, factor: `${calc.dailyEnergyUse.toFixed(1)} kWh` },
                { label: 'Monthly energy', detail: '30 days × daily',                 factor: `${calc.monthlyEnergyUse.toFixed(0)} kWh` },
                { label: 'Monthly cost',   detail: `@ $${kwhRate.toFixed(2)}/kWh`,   factor: `$${calc.monthlyCost.toFixed(2)}` },
              ]}
              totals={[]}
            />
            {calc.exceedsPortable && (
              <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1.5 rounded mt-3 leading-snug">
                Numbers above are for a single 70-pt portable, the load exceeds portable class, so this cost estimate is for reference only. A properly-sized whole-house unit typically uses 10-20% less energy per pint at higher IEF.
              </p>
            )}
            <div className="mt-3 bg-emerald-50 rounded-lg p-3 text-xs text-emerald-900">
              <div className="font-semibold mb-1">Current DOE post-2020 pint scale</div>
              <p className="text-[11px] leading-snug">
                Since Oct 2019, DOE tests portable dehumidifiers at <strong>65°F / 60% RH</strong> (formerly 80°F). Same
                physical machine now rates about 30-40% <strong>lower</strong> on the nameplate. A unit sold as{' '}
                <strong>50 pt today</strong> removes what an old <strong>70 pt</strong> did, don&rsquo;t match your old
                unit&rsquo;s number, use the recommendation above.
              </p>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Sizing is a starting point">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>The recommendation is calibrated to <strong>ENERGY STAR&rsquo;s published sizing anchors</strong> using ANSI/AHAM DH-1-2020 (65°F test). If your basement runs colder than 65°F, real capacity drops 30-50% below the nameplate, pick a <strong>low-temp / auto-defrost model</strong> or bump one size up.</li>
            <li>Persistent dampness usually signals a <strong>moisture-intrusion problem</strong> (grade slope, gutter run-off, foundation cracks, missing vapor barrier). A dehumidifier treats the symptom, <strong>address the source first</strong> or the unit will run forever.</li>
            <li>Set + leave at <strong>45-50% RH</strong>. Chasing 30% wastes energy without health benefit and pushes wood to over-dry.</li>
            <li>Undersized: runs continuously, never reaches target, wears out fast. Oversized: short-cycles and misses latent removal. Pick the size that runs 40-70% of the day, not 10% or 100%.</li>
            <li>Above ~70 pt/day load, a <strong>whole-house dehumidifier</strong> (HVAC-installed, ~$1,200-2,500) usually beats multiple portables on total cost of ownership, drain plumbing, and noise.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
