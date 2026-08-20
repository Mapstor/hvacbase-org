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

const climateRegions = [
  { value: 'hot-humid', name: 'Hot-Humid', summary: 'Southeast coastal (FL, GA, AL)', coolingBTU: 22, heatingBTU: 15, coldestTemp: 30 },
  { value: 'hot-dry', name: 'Hot-Dry', summary: 'Southwest desert (AZ, NV, NM)', coolingBTU: 20, heatingBTU: 18, coldestTemp: 30 },
  { value: 'mixed-humid', name: 'Mixed-Humid', summary: 'Mid-Atlantic (VA, NC, KY)', coolingBTU: 21, heatingBTU: 30, coldestTemp: 15 },
  { value: 'mixed-dry', name: 'Mixed-Dry', summary: 'Central plains (OK, KS, NE)', coolingBTU: 20, heatingBTU: 28, coldestTemp: 15 },
  { value: 'cold', name: 'Cold', summary: 'Northern states (NY, MI, OH)', coolingBTU: 18, heatingBTU: 40, coldestTemp: 0 },
  { value: 'very-cold', name: 'Very Cold', summary: 'Upper Midwest (MN, ND, WI)', coolingBTU: 16, heatingBTU: 50, coldestTemp: -10 },
  { value: 'marine', name: 'Marine', summary: 'Pacific Northwest (WA, OR coastal)', coolingBTU: 15, heatingBTU: 25, coldestTemp: 25 },
];

const homeAgeOptions = [
  { value: 'new', name: 'New (2020+)', factor: 0.85, summary: 'Modern insulation, tight envelope' },
  { value: 'modern', name: 'Modern (2000–2019)', factor: 0.95, summary: 'Good insulation standards' },
  { value: 'standard', name: 'Standard (1980–1999)', factor: 1.0, summary: 'Basic insulation' },
  { value: 'older', name: 'Older (1960–1979)', factor: 1.15, summary: 'Limited insulation' },
  { value: 'vintage', name: 'Vintage (pre-1960)', factor: 1.3, summary: 'Poor / no insulation' },
];

const heatPumpTypes = [
  { value: 'standard', name: '14–16 SEER', tier: 'Standard', efficiency: 14, hspf: 8.2, price: 3500,
    note: 'Entry-level. Fine for hot/mixed climates. Limited cold-weather output.' },
  { value: 'high', name: '17–20 SEER', tier: 'High', efficiency: 18, hspf: 9.5, price: 5000,
    note: 'Best mainstream value. Two-stage compressor, good cold performance to 17°F.' },
  { value: 'premium', name: '21+ SEER', tier: 'Premium', efficiency: 22, hspf: 10.5, price: 7000,
    note: 'Variable-speed inverter. Quiet, efficient, top humidity control.' },
  { value: 'cold-climate', name: 'Cold climate', tier: 'Inverter', efficiency: 20, hspf: 12, price: 8000,
    note: 'Designed for sub-freezing. 75% capacity at 5°F. Best for cold/very-cold zones.' },
];

const storiesOptions = [
  { value: '1', name: '1 story', factor: 0.95 },
  { value: '2', name: '2 stories', factor: 1.0 },
  { value: '3', name: '3+ stories', factor: 1.1 },
];

const windowAreaOptions = [
  { value: 'minimal', name: 'Minimal', sub: 'Few or small windows', factor: 0.9 },
  { value: 'average', name: 'Average', sub: 'Typical home', factor: 1.0 },
  { value: 'extensive', name: 'Extensive', sub: 'Many or large windows', factor: 1.15 },
];

const backupHeatOptions = [
  { value: 'none', name: 'None', sub: 'Mild climate only', factor: 0 },
  { value: 'strips-5kw', name: '5 kW strips', sub: 'Small homes / mild winters', factor: 5000 },
  { value: 'strips-10kw', name: '10 kW strips', sub: 'Standard backup', factor: 10000 },
  { value: 'strips-15kw', name: '15 kW strips', sub: 'Large/cold-climate homes', factor: 15000 },
  { value: 'gas-furnace', name: 'Gas furnace', sub: 'Dual-fuel hybrid setup', factor: 0 },
];

const squareFootPresets = [1000, 1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  squareFeet: '2000',
  climate: 'mixed-humid',
  homeAge: 'standard',
  heatPumpType: 'high',
  stories: '2',
  occupants: '4',
  windowArea: 'average',
  backupHeat: 'strips-10kw',
};

export default function HeatPumpSizeCalculator() {
  const [squareFeet, setSquareFeet] = useState(DEFAULTS.squareFeet);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [homeAge, setHomeAge] = useState(DEFAULTS.homeAge);
  const [heatPumpType, setHeatPumpType] = useState(DEFAULTS.heatPumpType);
  const [stories, setStories] = useState(DEFAULTS.stories);
  const [occupants, setOccupants] = useState(DEFAULTS.occupants);
  const [windowArea, setWindowArea] = useState(DEFAULTS.windowArea);
  const [backupHeat, setBackupHeat] = useState(DEFAULTS.backupHeat);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    squareFeet, climate, homeAge, heatPumpType, stories, occupants, windowArea, backupHeat,
  });

  const selectedClimate = climateRegions.find((c) => c.value === src.climate)!;
  const selectedAge = homeAgeOptions.find((a) => a.value === src.homeAge)!;
  const selectedType = heatPumpTypes.find((t) => t.value === src.heatPumpType)!;
  const selectedStories = storiesOptions.find((s) => s.value === src.stories)!;
  const selectedWindow = windowAreaOptions.find((w) => w.value === src.windowArea)!;
  const selectedBackup = backupHeatOptions.find((b) => b.value === src.backupHeat)!;

  const sqFt = Math.max(parseFloat(src.squareFeet) || 0, 0);
  const occN = Math.max(parseFloat(src.occupants) || 0, 0);

  const handleReset = () => {
    setSquareFeet(DEFAULTS.squareFeet);
    setClimate(DEFAULTS.climate);
    setHomeAge(DEFAULTS.homeAge);
    setHeatPumpType(DEFAULTS.heatPumpType);
    setStories(DEFAULTS.stories);
    setOccupants(DEFAULTS.occupants);
    setWindowArea(DEFAULTS.windowArea);
    setBackupHeat(DEFAULTS.backupHeat);
    clear();
  };

  const calc = useMemo(() => {
    const baseCool = sqFt * selectedClimate.coolingBTU;
    const baseHeat = sqFt * selectedClimate.heatingBTU;
    const occupantAdj = Math.max(0, occN - 2) * 400;
    const coolingLoad = (baseCool * selectedAge.factor * selectedStories.factor * selectedWindow.factor) + occupantAdj;
    const heatingLoad = baseHeat * selectedAge.factor * selectedStories.factor * selectedWindow.factor;
    const coolingTons = coolingLoad / 12000;
    const heatingTons = heatingLoad / 12000;
    const requiredTons = Math.max(coolingTons, heatingTons);
    const standardSizes = [1.5, 2, 2.5, 3, 3.5, 4, 5];
    const recommendedSize = standardSizes.find((s) => s >= requiredTons) || 5;

    const capacity47 = recommendedSize * 12000;
    const capacity17 = capacity47 * 0.6;
    const capacity5 = src.heatPumpType === 'cold-climate' ? capacity47 * 0.75 : capacity47 * 0.4;
    const balancePoint = src.heatPumpType === 'cold-climate' ? 5 : 25;

    const coolingHours = selectedClimate.value.includes('hot') ? 2000 : 1000;
    const heatingHours = selectedClimate.value.includes('cold') ? 3000 : 1500;
    const coolingKWh = (recommendedSize * 12000 / selectedType.efficiency) * coolingHours / 1000;
    const heatingKWh = (recommendedSize * 12000 / selectedType.hspf) * heatingHours / 1000;
    const totalKWh = coolingKWh + heatingKWh;
    const annualCost = totalKWh * 0.16;

    const backupNeeded = selectedClimate.coldestTemp < balancePoint;

    return {
      baseCool: Math.round(baseCool),
      baseHeat: Math.round(baseHeat),
      coolingLoad: Math.round(coolingLoad),
      heatingLoad: Math.round(heatingLoad),
      coolingTons,
      heatingTons,
      requiredTons,
      recommendedSize,
      capacity47: Math.round(capacity47),
      capacity17: Math.round(capacity17),
      capacity5: Math.round(capacity5),
      balancePoint,
      coolingKWh: Math.round(coolingKWh),
      heatingKWh: Math.round(heatingKWh),
      totalKWh: Math.round(totalKWh),
      annualCost,
      backupNeeded,
    };
  }, [sqFt, occN, src.heatPumpType, selectedClimate, selectedAge, selectedType, selectedStories, selectedWindow]);

  const fit =
    calc.requiredTons === 0 ? { tone: 'warn' as const, text: 'Enter square footage' } :
    calc.recommendedSize - calc.requiredTons < 0.25 ? { tone: 'good' as const, text: 'Excellent fit' } :
    calc.recommendedSize - calc.requiredTons < 0.5  ? { tone: 'ok' as const, text: 'Good fit' } :
                                                       { tone: 'warn' as const, text: 'Rounded up to nearest standard' };

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
              Heated & cooled floor area (sq ft)
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
            <label className="text-sm font-medium text-gray-700 mb-2 block">Home age & insulation</label>
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
        <SectionHeader step={3} title="Heat pump preference" subtitle="Efficiency tier and backup heat" Icon={Zap} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Heat pump type
              <InfoTip label="heat pump type">
                SEER is cooling efficiency; HSPF is heating efficiency. Cold-climate inverters maintain 75% capacity at 5°F vs only 40% for standard models — critical in zones 5–7.
              </InfoTip>
            </label>
            <CardChoice value={heatPumpType} onChange={setHeatPumpType} options={heatPumpTypes} ariaLabel="Heat pump type" accent={ACCENT} />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Wind className="w-4 h-4 mr-1.5 text-gray-500" />
              Backup heat source
              <InfoTip label="backup heat">
                When outdoor temp drops below the balance point, the heat pump can't keep up alone. Backup heat (electric strips or a gas furnace) fills the gap on the coldest hours.
              </InfoTip>
            </label>
            <CardChoice value={backupHeat} onChange={setBackupHeat} options={backupHeatOptions} ariaLabel="Backup heat" accent={ACCENT} columns={5} />
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

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended heat pump size"
          value={`${calc.recommendedSize}`}
          unit="tons"
          secondaryText={
            <>
              That's <strong>{fmt(calc.recommendedSize * 12000)} BTU/hr</strong> nominal capacity.
              Sized to the larger of cooling ({calc.coolingTons.toFixed(1)} tons) and
              heating ({calc.heatingTons.toFixed(1)} tons) load.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          warning={calc.backupNeeded && src.backupHeat === 'none' ? (
            <>
              Your climate hits {selectedClimate.coldestTemp}°F — below this heat pump's {calc.balancePoint}°F balance point.
              <strong> You need backup heat</strong> (electric strips or a gas furnace) for the coldest hours, or your home won't stay warm.
            </>
          ) : undefined}
          sidePanel={[
            { label: 'Annual energy', value: `${fmt(calc.totalKWh)} kWh` },
            { label: 'Annual cost', value: `$${fmtMoney(calc.annualCost)}`, valueClass: 'text-emerald-700' },
            { label: 'Balance point', value: `${calc.balancePoint}°F` },
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
                { label: 'At 47°F', value: calc.capacity47, sub: 'Mild day' },
                { label: 'At 17°F', value: calc.capacity17, sub: 'Cold day' },
                { label: 'At 5°F', value: calc.capacity5, sub: src.heatPumpType === 'cold-climate' ? 'Cold-climate model holds 75%' : 'Standard models drop to ~40%' },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[auto_1fr_auto] gap-2 py-1.5 border-b border-gray-100 last:border-0 items-baseline">
                  <span className="font-medium text-gray-700">{row.label}</span>
                  <span className="text-gray-500 truncate">{row.sub}</span>
                  <span className="font-mono text-gray-900 tabular-nums">{fmt(row.value)} BTU</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-300 flex justify-between items-baseline">
                <span className="font-semibold text-gray-900">Balance point</span>
                <span className="font-bold text-purple-700">{calc.balancePoint}°F</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug pt-1">
                Below the balance point, the heat pump can't meet 100% of demand on its own. Your climate's coldest typical temp is {selectedClimate.coldestTemp}°F.
              </p>
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
                { label: 'Age factor', detail: selectedAge.name, factor: `× ${selectedAge.factor.toFixed(2)}` },
                { label: 'Stories', detail: selectedStories.name, factor: `× ${selectedStories.factor.toFixed(2)}` },
                { label: 'Windows', detail: selectedWindow.name, factor: `× ${selectedWindow.factor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Cooling load', value: `${fmt(calc.coolingLoad)} BTU (${calc.coolingTons.toFixed(1)} tons)`, valueClass: 'text-blue-700' },
                { label: 'Heating load', value: `${fmt(calc.heatingLoad)} BTU (${calc.heatingTons.toFixed(1)} tons)`, valueClass: 'text-orange-700' },
              ]}
            />
            {isCoolingDominated && (
              <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-1.5 rounded mt-3">
                ☀ Cooling-dominated climate. Prioritize SEER and humidity control (variable-speed compressor).
              </p>
            )}
            {isHeatingDominated && (
              <p className="text-[11px] text-blue-700 bg-blue-50 px-2 py-1.5 rounded mt-3">
                ❄ Heating-dominated climate. Prioritize HSPF and consider a cold-climate model.
              </p>
            )}
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-emerald-700" />
              Operating cost
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Cooling:</strong> {fmt(calc.coolingKWh)} kWh/yr (~$ {fmtMoney(calc.coolingKWh * 0.16)})</li>
              <li><strong>Heating:</strong> {fmt(calc.heatingKWh)} kWh/yr (~$ {fmtMoney(calc.heatingKWh * 0.16)})</li>
              <li><strong>Total:</strong> {fmt(calc.totalKWh)} kWh/yr at $0.16/kWh = <strong>${fmtMoney(calc.annualCost)}</strong>/yr</li>
              <li className="text-[11px] text-gray-500 pt-1">Adjust by your local rate: every $0.01/kWh shift moves total by ${fmtMoney(calc.totalKWh * 0.01)}.</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              Equipment notes
            </h4>
            <ul className="space-y-1 text-xs text-gray-700">
              <li><strong>Tier:</strong> {selectedType.tier} ({selectedType.name})</li>
              <li><strong>Equipment cost:</strong> ~${fmtMoney(selectedType.price)} + install (typically 50–80% of equipment).</li>
              <li><strong>Backup:</strong> {selectedBackup.name} {selectedBackup.factor > 0 && `(${selectedBackup.factor.toLocaleString('en-US')} W)`}</li>
              <li><strong>Why this tier:</strong> {selectedType.note}</li>
            </ul>
          </div>
        </div>

        <DisclaimerBox title="Heat pumps deserve a Manual J more than any other system.">
          <p>
            Sizing matters even more for heat pumps because they run nearly continuously. An oversized heat pump short-cycles and
            loses dehumidification; an undersized one runs backup heat too often, killing efficiency.
            Have a contractor run a proper Manual J — especially in cold climates where the balance-point math drives system cost.
          </p>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
