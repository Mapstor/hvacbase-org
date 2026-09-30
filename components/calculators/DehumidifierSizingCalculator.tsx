'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  Home,
  Snowflake,
} from 'lucide-react';
import {
  CalcShell,
  SectionHeader,
  CardChoice,
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

// ─────────────────────────────────────────────────────────────────────────
// ENERGY STAR's current portable-dehumidifier sizing chart
// (energystar.gov/products/dehumidifiers, "Recommended Capacity Range,
//  pints per day"). Figures are the MINIMUM capacity for a portable unit;
// ENERGY STAR advises it is better to oversize than undersize. Two size
// bands: under 2,000 sq ft, and 2,000 sq ft and over. This is a lookup, not
// a formula — no base-plus-rate model, no AHAM calibration, no surcharges.
// ─────────────────────────────────────────────────────────────────────────
const conditions = [
  {
    value: 'moderate',
    name: 'Slightly to moderately damp',
    short: 'Moderately damp',
    summary: 'Musty odor that may be intermittent; 50-75% RH',
  },
  {
    value: 'very',
    name: 'Very damp',
    short: 'Very damp',
    summary: 'Consistently damp; damp spots on walls and floors; 75-90% RH',
  },
  {
    value: 'wet',
    name: 'Wet',
    short: 'Wet',
    summary: 'Walls or floor sweat, seepage, or high loads such as laundry drying; 90-100% RH',
  },
];

// Minimum capacity range (pints/day). small = under 2,000 sq ft;
// large = 2,000 sq ft and over. Values verified live from ENERGY STAR.
const RANGES: Record<string, { small: string; large: string }> = {
  moderate: { small: '20-30', large: '30+' },
  very:     { small: '25-40', large: '40+' },
  wet:      { small: '30-50', large: '50+' },
};

const SIZE_THRESHOLD = 2000;

const yesNoOptions = [
  { value: 'no',  name: 'No'  },
  { value: 'yes', name: 'Yes' },
];

const DEFAULTS = {
  area: '1000',
  condition: 'very',
  belowFreezing: 'no',
};

export default function DehumidifierSizingCalculator() {
  const [area, setArea] = useState(DEFAULTS.area);
  const [condition, setCondition] = useState(DEFAULTS.condition);
  const [belowFreezing, setBelowFreezing] = useState(DEFAULTS.belowFreezing);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    area, condition, belowFreezing,
  });

  const cond = conditions.find((c) => c.value === src.condition)!;
  const sqft = Math.max(parseFloat(src.area) || 0, 0);

  const handleReset = () => {
    setArea(DEFAULTS.area);
    setCondition(DEFAULTS.condition);
    setBelowFreezing(DEFAULTS.belowFreezing);
    clear();
  };

  const calc = useMemo(() => {
    const large = sqft >= SIZE_THRESHOLD;
    const bandLabel = large ? '2,000 sq ft and over' : 'under 2,000 sq ft';
    const range = RANGES[src.condition][large ? 'large' : 'small'];
    const lowTemp = src.belowFreezing === 'yes';
    const largeWet = src.condition === 'wet' && large;
    return { large, bandLabel, range, lowTemp, largeWet };
  }, [sqft, src.condition, src.belowFreezing]);

  return (
    <CalcShell
      Icon={Droplets}
      title="Dehumidifier Sizing Calculator"
      subtitle="Minimum capacity from ENERGY STAR's current sizing chart."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Space */}
      <section>
        <SectionHeader step={1} title="Space" subtitle="Area and temperature" Icon={Home} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Area to dehumidify
              <InfoTip label="area">
                The floor area the unit serves. ENERGY STAR uses two bands: under 2,000 sq ft, and 2,000 sq ft and over.
              </InfoTip>
            </label>
            <NumberInput value={area} onChange={setArea} min={100} max={6000} suffix="sq ft" ariaLabel="Area in square feet" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Space often below 65°F?
              <InfoTip label="temperature">
                Basements and garages can run cold. Below 65°F, frost can form on a standard unit&rsquo;s coils.
              </InfoTip>
            </label>
            <Segmented value={belowFreezing} onChange={setBelowFreezing} options={yesNoOptions} ariaLabel="Space often below 65 degrees" accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Section 2 — Condition */}
      <section>
        <SectionHeader step={2} title="Moisture condition" subtitle="ENERGY STAR's dampness descriptions" Icon={Droplets} accent={ACCENT} />
        <p className="text-xs text-gray-600 mb-3">
          Pick the row that matches what you see and smell, using ENERGY STAR&rsquo;s own descriptions.
        </p>
        <CardChoice value={condition} onChange={setCondition} options={conditions} ariaLabel="Moisture condition" accent={ACCENT} columns={3} />
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

        <ResultHero
          accent={ACCENT}
          eyebrow="ENERGY STAR minimum capacity"
          value={calc.range}
          unit="pints per day (minimum)"
          secondaryText={
            <>
              For a <strong>{cond.name.toLowerCase()}</strong> space of <strong>{calc.bandLabel}</strong>, ENERGY STAR&rsquo;s chart lists a minimum of <strong>{calc.range} pints per day</strong>.
              ENERGY STAR advises it&rsquo;s better to oversize than undersize.
            </>
          }
          fitTone="good"
          fitText="ENERGY STAR minimum for this condition and size"
          warning={calc.largeWet ? 'Large wet spaces: consider more than one unit or a whole-home dehumidifier.' : undefined}
          sidePanel={[
            { label: 'Condition', value: cond.short },
            { label: 'Size band', value: calc.bandLabel },
            { label: 'Better to', value: 'oversize' },
          ]}
        />

        {calc.lowTemp && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-2">
            <Snowflake className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-900 leading-snug">
              Consider a model specified for low temperatures; frost can form on the coils below 65°F (ENERGY STAR).
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Droplets className="w-4 h-4 text-emerald-600" />
            ENERGY STAR sizing chart (minimum pints/day)
          </h4>
          <BreakdownTable
            rows={conditions.map((c) => ({
              label: c.name,
              detail: 'under 2,000 sq ft',
              factor: `${RANGES[c.value].small} pt`,
            }))}
            totals={[]}
          />
          <div className="mt-2">
            <BreakdownTable
              rows={conditions.map((c) => ({
                label: c.name,
                detail: '2,000 sq ft and over',
                factor: `${RANGES[c.value].large} pt`,
              }))}
              totals={[]}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-3 leading-snug">
            For the cost of running a unit this size, see our{' '}
            <a href="/dehumidifier-running-cost" className="text-emerald-700 underline">dehumidifier running cost calculator</a>.
          </p>
        </div>

        <DisclaimerBox title="How this is figured">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>The capacity comes straight from <strong>ENERGY STAR&rsquo;s current sizing chart</strong> for portable dehumidifiers, which lists a minimum pints-per-day range for each dampness level and two size bands. ENERGY STAR advises it&rsquo;s better to oversize than undersize.</li>
            <li>Ratings changed in 2019, when the DOE test moved to cooler conditions, so capacities read lower than on older units. See <a href="https://www.energystar.gov/products/dehumidifier_testing_and_capacity" className="text-emerald-700 underline">ENERGY STAR on dehumidifier testing and capacity</a>.</li>
            <li>Below 65°F, frost can form on a standard unit&rsquo;s coils; choose a model specified for low temperatures.</li>
            <li>For a wet space over 2,000 sq ft, one portable often isn&rsquo;t enough; consider more than one unit or a whole-home dehumidifier.</li>
            <li>Persistent dampness usually signals a moisture-intrusion problem (grading, gutters, foundation, a missing vapor barrier). A dehumidifier treats the symptom; fix the source too.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
