'use client';

import { useState, useMemo } from 'react';
import {
  Home,
  Flame,
  MapPin,
  TrendingUp,
  Settings,
  Leaf,
  Layers,
  Sun,
  CloudSun,
  Cloud,
  Building2,
  Wind,
  Ruler,
  Snowflake,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  Segmented,
  CardChoice,
  PresetChips,
  RangeSlider,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'orange' as const;

type StoriesValue = '1' | '2' | '3';

const climateZones = [
  { value: 'zone1', short: 'Z1', name: 'Zone 1', label: 'Hot',
    btuPerSqFt: 30, hdd: 1000, designTemp: '40°F', months: '2–3',
    description: 'Southern Florida, Hawaii' },
  { value: 'zone2', short: 'Z2', name: 'Zone 2', label: 'Warm',
    btuPerSqFt: 35, hdd: 2000, designTemp: '30°F', months: '3–4',
    description: 'Southern Texas, Southern California' },
  { value: 'zone3', short: 'Z3', name: 'Zone 3', label: 'Moderate',
    btuPerSqFt: 40, hdd: 3500, designTemp: '20°F', months: '4–5',
    description: 'Virginia, Tennessee, Arkansas' },
  { value: 'zone4', short: 'Z4', name: 'Zone 4', label: 'Cool',
    btuPerSqFt: 45, hdd: 5000, designTemp: '10°F', months: '5–6',
    description: 'New York, Illinois, Missouri' },
  { value: 'zone5', short: 'Z5', name: 'Zone 5', label: 'Cold',
    btuPerSqFt: 50, hdd: 6500, designTemp: '0°F', months: '6–7',
    description: 'Iowa, Michigan, Maine' },
  { value: 'zone6', short: 'Z6', name: 'Zone 6', label: 'Very Cold',
    btuPerSqFt: 55, hdd: 8000, designTemp: '−10°F', months: '7–8',
    description: 'Minnesota, Wisconsin, Montana' },
  { value: 'zone7', short: 'Z7', name: 'Zone 7', label: 'Extreme Cold',
    btuPerSqFt: 60, hdd: 10000, designTemp: '−30°F', months: '8–9',
    description: 'Northern Minnesota, Alaska' },
];

const insulationOptions = [
  { value: 'poor', name: 'Poor', factor: 1.25,
    summary: 'Pre-1970 build, single-pane windows, little/no wall insulation' },
  { value: 'average', name: 'Average', factor: 1.0,
    summary: 'Code-minimum walls and attic, double-pane windows' },
  { value: 'good', name: 'Good', factor: 0.9,
    summary: 'Above-code (R-21+ walls), Low-E double-pane, sealed envelope' },
  { value: 'excellent', name: 'Excellent', factor: 0.8,
    summary: 'Spray foam, triple-pane glass, near-passive house tightness' },
];

const ceilingHeights = [
  { value: '8', name: '8 ft', sub: 'Standard', factor: 1.0 },
  { value: '9', name: '9 ft', sub: 'Tall', factor: 1.125 },
  { value: '10', name: '10 ft', sub: 'Extra tall', factor: 1.25 },
  { value: '12', name: '12 ft+', sub: 'Vaulted', factor: 1.5 },
];

const furnaceEfficiency = [
  { value: '80', name: '80% AFUE', tier: 'Standard',
    efficiency: 0.80, price: 2500, venting: 'Metal B-vent / chimney',
    note: 'Cheapest upfront. Only allowed in southern US in 2026.' },
  { value: '90', name: '90% AFUE', tier: 'Mid',
    efficiency: 0.90, price: 3500, venting: 'PVC condensing vent',
    note: 'Good balance of upfront cost and yearly savings.' },
  { value: '95', name: '95% AFUE', tier: 'High',
    efficiency: 0.95, price: 4500, venting: 'PVC condensing vent',
    note: '2026 minimum in northern US. Best mainstream value.' },
  { value: '98', name: '98% AFUE', tier: 'Ultra',
    efficiency: 0.98, price: 5500, venting: 'PVC condensing vent',
    note: 'Modulating/variable-speed. Top comfort, lowest bills.' },
];

const sunExposureOptions = [
  { value: 'low', name: 'Mostly shaded', sub: 'Heavy tree cover, north-facing',
    factor: 0.9, Icon: Cloud },
  { value: 'average', name: 'Average', sub: 'Mixed sun and shade',
    factor: 1.0, Icon: CloudSun },
  { value: 'high', name: 'Full sun', sub: 'Open exposure, south-facing',
    factor: 1.1, Icon: Sun },
];

const storiesOptions = [
  { value: '1' as const, name: '1 story', factor: 1.0 },
  { value: '2' as const, name: '2 stories', factor: 0.92 },
  { value: '3' as const, name: '3 stories', factor: 0.88 },
];

const basementOptions = [
  { value: 'heated', name: 'Heated', sub: 'Finished, conditioned', factor: 1.10 },
  { value: 'unheated', name: 'Unheated', sub: 'Unfinished basement / crawlspace', factor: 1.0 },
  { value: 'slab', name: 'Slab / none', sub: 'Slab on grade or no basement', factor: 1.05 },
];

const ductOptions = [
  { value: 'conditioned', name: 'Conditioned space', sub: 'Inside heated envelope', factor: 0.95 },
  { value: 'insulated_attic', name: 'Insulated attic', sub: 'Sealed, insulated ducts', factor: 1.0 },
  { value: 'uninsulated_attic', name: 'Uninsulated attic', sub: 'Lossy ducts in attic', factor: 1.15 },
  { value: 'crawlspace', name: 'Crawlspace', sub: 'Below floor, vented', factor: 1.10 },
];

const squareFootPresets = [1000, 1500, 2000, 2500, 3000, 4000];

export default function FurnaceSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState('2000');
  const [stories, setStories] = useState<StoriesValue>('1');
  const [climateZone, setClimateZone] = useState('zone4');
  const [insulation, setInsulation] = useState('average');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [efficiency, setEfficiency] = useState('95');
  const [windowPercentage, setWindowPercentage] = useState('15');
  const [sunExposure, setSunExposure] = useState('average');
  const [basement, setBasement] = useState('unheated');
  const [ducts, setDucts] = useState('insulated_attic');

  const selectedZone = climateZones.find((z) => z.value === climateZone)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === insulation)!;
  const selectedCeiling = ceilingHeights.find((c) => c.value === ceilingHeight)!;
  const selectedEfficiency = furnaceEfficiency.find((e) => e.value === efficiency)!;
  const selectedSun = sunExposureOptions.find((s) => s.value === sunExposure)!;
  const selectedStories = storiesOptions.find((s) => s.value === stories)!;
  const selectedBasement = basementOptions.find((b) => b.value === basement)!;
  const selectedDucts = ductOptions.find((d) => d.value === ducts)!;

  const sqFt = Math.max(parseFloat(squareFeet) || 0, 0);
  const winPct = Math.min(Math.max(parseFloat(windowPercentage) || 15, 5), 50);

  const calc = useMemo(() => {
    const baseBTU = sqFt * selectedZone.btuPerSqFt;
    let adjustedBTU = baseBTU;
    adjustedBTU *= selectedInsulation.factor;
    adjustedBTU *= selectedCeiling.factor;
    adjustedBTU *= selectedStories.factor;
    adjustedBTU *= selectedBasement.factor;
    adjustedBTU *= selectedDucts.factor;
    const windowFactor = 1 + (winPct - 15) * 0.01;
    adjustedBTU *= windowFactor;
    adjustedBTU *= selectedSun.factor;

    const outputBTUNeeded = Math.max(Math.round(adjustedBTU), 0);
    const inputBTUNeeded = Math.round(outputBTUNeeded / selectedEfficiency.efficiency);

    const standardSizes = [40000, 60000, 80000, 100000, 120000, 140000];
    const recommendedSize = standardSizes.find((size) => size >= inputBTUNeeded) || 140000;
    const requiresMultipleUnits = inputBTUNeeded > 140000;
    const actualOutput = Math.round(recommendedSize * selectedEfficiency.efficiency);
    const oversizing = outputBTUNeeded > 0
      ? ((actualOutput - outputBTUNeeded) / outputBTUNeeded) * 100
      : 0;

    const annualGasUsage =
      (outputBTUNeeded * selectedZone.hdd * 24) /
      (selectedEfficiency.efficiency * 100000 * 65);
    const annualCost = annualGasUsage * 1.2;

    return {
      baseBTU: Math.round(baseBTU),
      outputBTUNeeded,
      inputBTUNeeded,
      recommendedSize,
      requiresMultipleUnits,
      actualOutput,
      oversizing,
      windowFactor,
      annualGasUsage,
      annualCost,
    };
  }, [
    sqFt, winPct, selectedZone, selectedInsulation, selectedCeiling,
    selectedStories, selectedBasement, selectedDucts, selectedSun, selectedEfficiency,
  ]);

  const fit =
    calc.oversizing < 5 ? { tone: 'good' as const, text: 'Excellent fit' } :
    calc.oversizing < 15 ? { tone: 'ok' as const, text: 'Good fit' } :
    calc.oversizing < 25 ? { tone: 'warn' as const, text: 'Acceptable, watch short-cycling' } :
                           { tone: 'bad' as const, text: 'Risk of oversizing' };

  const tons = calc.outputBTUNeeded / 12000;
  const btuPerSqFtResult = sqFt > 0 ? calc.outputBTUNeeded / sqFt : 0;

  return (
    <CalcShell
      Icon={Flame}
      title="Furnace Sizing Calculator"
      subtitle="Manual J–style heat-load estimate. Updates as you change inputs."
      accent={ACCENT}
    >
      {/* Section 1 — Your Home */}
      <section>
        <SectionHeader step={1} title="Your home" subtitle="Size, layout, and how it's built" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Heated floor area (sq ft)
              <InfoTip label="square footage">
                Total area you actively heat. Don't count unheated garage, unheated basement, or unfinished attic.
              </InfoTip>
            </label>
            <div className="mb-2">
              <PresetChips
                value={squareFeet}
                onChange={setSquareFeet}
                presets={squareFootPresets}
                accent={ACCENT}
              />
            </div>
            <NumberInput
              value={squareFeet}
              onChange={setSquareFeet}
              min={500}
              max={10000}
              suffix="sq ft"
              placeholder="2000"
              ariaLabel="Custom square footage"
              accent={ACCENT}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Layers className="w-4 h-4 mr-1.5 text-gray-500" />
                Number of stories
              </label>
              <Segmented<StoriesValue>
                value={stories}
                onChange={setStories}
                options={storiesOptions.map((s) => ({ value: s.value, name: s.name }))}
                ariaLabel="Number of stories"
                accent={ACCENT}
              />
              <p className="text-xs text-gray-500 mt-1.5">
                More stories = smaller envelope per floor = slightly less heat loss.
              </p>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Ruler className="w-4 h-4 mr-1.5 text-gray-500" />
                Ceiling height
              </label>
              <Segmented
                value={ceilingHeight}
                onChange={setCeilingHeight}
                options={ceilingHeights.map((c) => ({ value: c.value, name: c.name, sub: c.sub }))}
                ariaLabel="Ceiling height"
                accent={ACCENT}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Insulation & air tightness
              <InfoTip label="insulation quality">
                Best proxy: when was the home built and have you upgraded? Pre-1970 with original windows is Poor; 2000s code-built is Average; modern energy-rebuilt is Good or Excellent.
              </InfoTip>
            </label>
            <CardChoice
              value={insulation}
              onChange={setInsulation}
              options={insulationOptions}
              ariaLabel="Insulation quality"
              accent={ACCENT}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4 mr-1.5 text-gray-500" />
                Basement / foundation
              </label>
              <CardChoice
                value={basement}
                onChange={setBasement}
                options={basementOptions}
                ariaLabel="Basement type"
                columns={3}
                accent={ACCENT}
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Window area
                <InfoTip label="window area">
                  Fraction of exterior wall area that is glass. Typical homes are 12–18%. Lots of glass walls or large picture windows push this to 25–35%.
                </InfoTip>
                <span className="ml-auto text-sm font-semibold text-orange-700">{winPct}%</span>
              </label>
              <RangeSlider
                value={windowPercentage}
                onChange={setWindowPercentage}
                min={5}
                max={50}
                ariaLabel="Window area percent"
                ticks={[
                  { value: 5, label: '5% (very few)' },
                  { value: 15, label: '15% (typical)' },
                  { value: 50, label: '50% (glass walls)' },
                ]}
                accent={ACCENT}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Climate */}
      <section>
        <SectionHeader step={2} title="Your climate" subtitle="Local winter severity and sun" Icon={Snowflake} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Climate zone
              <InfoTip label="climate zone">
                US DOE climate zones run from 1 (Miami) to 7 (Alaska). Pick the row whose example states are closest to yours. Zone 4 is the country's middle band.
              </InfoTip>
            </label>
            <div role="radiogroup" aria-label="Climate zone" className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
              {climateZones.map((zone) => {
                const active = zone.value === climateZone;
                return (
                  <button
                    key={zone.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setClimateZone(zone.value)}
                    title={zone.description}
                    className={`px-2 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-orange-600 border-orange-600 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:bg-orange-50'
                    }`}
                  >
                    <div className="font-bold text-sm">{zone.short}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-orange-100' : 'text-gray-500'}`}>
                      {zone.label}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-medium text-gray-800">{selectedZone.name} ({selectedZone.label}):</span>
              <span>{selectedZone.description}</span>
            </div>
            <div className="mt-1 grid grid-cols-3 gap-2 text-[11px]">
              <div className="px-2 py-1 bg-gray-50 rounded">
                <span className="text-gray-500">Heating Degree Days:</span>{' '}
                <span className="font-semibold text-gray-800">{fmt(selectedZone.hdd)}</span>
              </div>
              <div className="px-2 py-1 bg-gray-50 rounded">
                <span className="text-gray-500">Design temp:</span>{' '}
                <span className="font-semibold text-gray-800">{selectedZone.designTemp}</span>
              </div>
              <div className="px-2 py-1 bg-gray-50 rounded">
                <span className="text-gray-500">Heating season:</span>{' '}
                <span className="font-semibold text-gray-800">{selectedZone.months} months</span>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Sun className="w-4 h-4 mr-1.5 text-gray-500" />
              Sun exposure
            </label>
            <CardChoice
              value={sunExposure}
              onChange={setSunExposure}
              options={sunExposureOptions}
              ariaLabel="Sun exposure"
              columns={3}
              accent={ACCENT}
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Furnace */}
      <section>
        <SectionHeader step={3} title="Your furnace preference" subtitle="Efficiency tier and where the ducts run" Icon={Flame} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Furnace efficiency (AFUE)
              <InfoTip label="AFUE">
                Annual Fuel Utilization Efficiency. 80% means 80¢ of every $1 of gas becomes heat; 20¢ goes up the flue. Northern US requires 95%+ for new installs in 2026.
              </InfoTip>
            </label>
            <CardChoice
              value={efficiency}
              onChange={setEfficiency}
              options={furnaceEfficiency}
              ariaLabel="Furnace efficiency"
              accent={ACCENT}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Wind className="w-4 h-4 mr-1.5 text-gray-500" />
              Where do your ducts run?
              <InfoTip label="ductwork location">
                Ducts in unconditioned spaces (uninsulated attic, vented crawlspace) lose 10–25% of their heat before it reaches the rooms. This is one of the biggest sizing variables most homeowners miss.
              </InfoTip>
            </label>
            <CardChoice
              value={ducts}
              onChange={setDucts}
              options={ductOptions}
              ariaLabel="Ductwork location"
              accent={ACCENT}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended furnace size"
          value={calc.recommendedSize}
          unit="BTU/hr input"
          secondaryText={
            <>
              Delivers <strong>{fmt(calc.actualOutput)} BTU/hr</strong> of heat at{' '}
              {selectedEfficiency.name} • Your home needs{' '}
              <strong>{fmt(calc.outputBTUNeeded)} BTU/hr</strong>
            </>
          }
          fitTone={fit.tone}
          fitText={`${fit.text} (${calc.oversizing >= 0 ? '+' : ''}${calc.oversizing.toFixed(0)}% headroom)`}
          warning={calc.requiresMultipleUnits ? (
            <>
              Your calculated need ({fmt(calc.inputBTUNeeded)} BTU) exceeds the largest
              standard residential furnace. Consider two zoned furnaces or envelope upgrades
              to lower the load before purchasing.
            </>
          ) : undefined}
          sidePanel={[
            { label: 'Per sq ft', value: `${btuPerSqFtResult.toFixed(0)} BTU` },
            { label: 'Tonnage equiv.', value: `${tons.toFixed(1)} tons` },
            { label: 'Est. annual cost', value: `$${fmtMoney(calc.annualCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Heat load breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-blue-600" />
              Heat load breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Base load', detail: `${fmt(sqFt)} sq ft × ${selectedZone.btuPerSqFt} BTU/sq ft`, factor: `${fmt(calc.baseBTU)} BTU` },
                { label: 'Insulation', detail: selectedInsulation.name, factor: `× ${selectedInsulation.factor.toFixed(2)}` },
                { label: 'Ceiling', detail: selectedCeiling.name, factor: `× ${selectedCeiling.factor.toFixed(3)}` },
                { label: 'Stories', detail: selectedStories.name, factor: `× ${selectedStories.factor.toFixed(2)}` },
                { label: 'Basement', detail: selectedBasement.name, factor: `× ${selectedBasement.factor.toFixed(2)}` },
                { label: 'Ductwork', detail: selectedDucts.name, factor: `× ${selectedDucts.factor.toFixed(2)}` },
                { label: 'Windows', detail: `${winPct}% of wall`, factor: `× ${calc.windowFactor.toFixed(2)}` },
                { label: 'Sun', detail: selectedSun.name, factor: `× ${selectedSun.factor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Output heat needed', value: `${fmt(calc.outputBTUNeeded)} BTU/hr`, valueClass: 'text-blue-700' },
                { label: 'Input required (÷ AFUE)', value: `${fmt(calc.inputBTUNeeded)} BTU/hr`, valueClass: 'text-orange-700' },
              ]}
            />
          </div>

          {/* Efficiency comparison */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              What other efficiency tiers would cost
            </h4>
            <div className="space-y-1.5">
              {furnaceEfficiency.map((eff) => {
                const altCost = (calc.annualGasUsage * selectedEfficiency.efficiency / eff.efficiency) * 1.2;
                const delta = altCost - calc.annualCost;
                const isCurrent = eff.value === efficiency;
                return (
                  <div
                    key={eff.value}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${
                      isCurrent ? 'bg-orange-50 ring-1 ring-orange-200' : 'bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className={`font-semibold ${isCurrent ? 'text-orange-900' : 'text-gray-900'}`}>
                        {eff.name} <span className="font-normal text-gray-500">· {eff.tier}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        ~${fmtMoney(eff.price)} equipment · {eff.venting.split(' ')[0].toLowerCase()} vent
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold tabular-nums ${isCurrent ? 'text-orange-700' : 'text-gray-800'}`}>
                        ${fmtMoney(altCost)}/yr
                      </div>
                      {!isCurrent && (
                        <div className={`text-[11px] ${delta < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {delta < 0 ? `−$${fmtMoney(Math.abs(delta))}` : `+$${fmtMoney(delta)}`}/yr
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-gray-500 mt-2 leading-snug">
              Costs based on {fmt(selectedZone.hdd)} HDD and $1.20/therm. 10-yr fuel difference
              between 80% and 98% AFUE on this load: roughly{' '}
              <strong>
                ${fmtMoney(
                  Math.abs(
                    ((calc.annualGasUsage * selectedEfficiency.efficiency / 0.8) -
                     (calc.annualGasUsage * selectedEfficiency.efficiency / 0.98)) * 1.2 * 10
                  )
                )}
              </strong>.
            </p>
          </div>

          {/* Installation considerations */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 text-amber-700" />
              Installation notes
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Venting:</strong> {selectedEfficiency.venting}.</li>
              <li><strong>Gas line:</strong> {calc.recommendedSize >= 100000 ? '3/4″ or 1″ recommended' : '1/2″ typically sufficient'} for {fmt(calc.recommendedSize)} BTU input.</li>
              <li><strong>Electrical:</strong> Standard 115V circuit for blower and controls.</li>
              <li><strong>Equipment cost:</strong> ~${fmtMoney(selectedEfficiency.price)} unit + labor (typically 40–80% on top).</li>
              <li><strong>Warranty:</strong> Usually 10-year heat exchanger, 5-year parts.</li>
            </ul>
          </div>

          {/* Environmental */}
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Environmental & comfort impact
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>CO₂ emissions:</strong> ~{fmt(Math.round(calc.annualGasUsage * 11.7))} lbs/year at this efficiency.</li>
              <li><strong>Waste heat:</strong> {(100 - parseInt(efficiency))}% of fuel goes up the flue (vs. {100 - 95}% at 95% AFUE).</li>
              <li><strong>Cold-climate alternative:</strong> A modern heat pump can cover most of this load with {selectedZone.btuPerSqFt >= 50 ? 'electric backup' : 'no backup heat'} and cut emissions 30–60% on a typical grid mix.</li>
              <li><strong>Comfort:</strong> {selectedEfficiency.note}</li>
            </ul>
          </div>
        </div>

        <DisclaimerBox title="This is an estimate, not a Manual J.">
          <p>
            Real residential load calculations measure each room, every window's orientation,
            the home's air leakage rate (ACH50), and local 99% design temperatures. Have a
            licensed HVAC contractor run a proper Manual J before purchasing equipment —
            especially if your result is near a size boundary or above 120,000 BTU.
          </p>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
