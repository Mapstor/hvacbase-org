'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Gauge,
  TrendingUp,
  Home,
  ChefHat,
  Bath,
  Bed,
  Briefcase,
} from 'lucide-react';
import {
  fmt,
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

const ACCENT = 'emerald' as const;

const spaceTypes = [
  { value: 'living', name: 'Living areas', summary: 'Code minimum 0.35, target 2 ACH', minACH: 0.35, recommendedACH: 2.0, Icon: Home },
  { value: 'bedroom', name: 'Bedrooms', summary: 'Quieter, low contaminant', minACH: 0.35, recommendedACH: 1.5, Icon: Bed },
  { value: 'kitchen', name: 'Kitchens', summary: 'Range hood required', minACH: 5.0, recommendedACH: 15.0, Icon: ChefHat },
  { value: 'bathroom', name: 'Bathrooms', summary: 'Moisture + odor exhaust', minACH: 5.0, recommendedACH: 10.0, Icon: Bath },
  { value: 'basement', name: 'Basements', summary: 'Stagnant air, radon risk', minACH: 0.35, recommendedACH: 1.0, Icon: Home },
  { value: 'laundry', name: 'Laundry', summary: 'Lint + moisture', minACH: 3.0, recommendedACH: 8.0, Icon: Wind },
  { value: 'garage', name: 'Garages', summary: 'Vehicle exhaust + fumes', minACH: 4.0, recommendedACH: 6.0, Icon: Home },
  { value: 'office', name: 'Commercial office', summary: 'ASHRAE 62.1 target', minACH: 4.0, recommendedACH: 8.0, Icon: Briefcase },
];

const dimensionPresets = [
  { value: '8', name: '8 ft', sub: 'Standard' },
  { value: '9', name: '9 ft', sub: 'Tall' },
  { value: '10', name: '10 ft', sub: 'Extra' },
  { value: '12', name: '12 ft+', sub: 'Vaulted' },
];

const DEFAULTS = {
  roomLength: '12',
  roomWidth: '10',
  ceilingHeight: '8',
  airflow: '240',
  spaceType: 'living',
};

export default function ACHCalculator() {
  const [roomLength, setRoomLength] = useState(DEFAULTS.roomLength);
  const [roomWidth, setRoomWidth] = useState(DEFAULTS.roomWidth);
  const [ceilingHeight, setCeilingHeight] = useState(DEFAULTS.ceilingHeight);
  const [airflow, setAirflow] = useState(DEFAULTS.airflow);
  const [spaceType, setSpaceType] = useState(DEFAULTS.spaceType);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    roomLength, roomWidth, ceilingHeight, airflow, spaceType,
  });

  const handleReset = () => {
    setRoomLength(DEFAULTS.roomLength);
    setRoomWidth(DEFAULTS.roomWidth);
    setCeilingHeight(DEFAULTS.ceilingHeight);
    setAirflow(DEFAULTS.airflow);
    setSpaceType(DEFAULTS.spaceType);
    clear();
  };

  const space = spaceTypes.find((s) => s.value === src.spaceType)!;
  const L = Math.max(parseFloat(src.roomLength) || 0, 0);
  const W = Math.max(parseFloat(src.roomWidth) || 0, 0);
  const H = Math.max(parseFloat(src.ceilingHeight) || 0, 0);
  const cfm = Math.max(parseFloat(src.airflow) || 0, 0);

  const calc = useMemo(() => {
    const area = L * W;
    const volume = area * H;
    const ach = volume > 0 ? (cfm * 60) / volume : 0;
    const minutesPerChange = ach > 0 ? 60 / ach : 0;
    const reqMinCfm = (space.minACH * volume) / 60;
    const reqRecCfm = (space.recommendedACH * volume) / 60;
    const meetsMin = ach >= space.minACH;
    const meetsRec = ach >= space.recommendedACH;
    const fanWatts = cfm * 0.1;
    const dailyKwh = (fanWatts * 24) / 1000;
    const dailyAirVolume = cfm * 60 * 24;
    return { area, volume, ach, minutesPerChange, reqMinCfm, reqRecCfm, meetsMin, meetsRec, fanWatts, dailyKwh, dailyAirVolume };
  }, [L, W, H, cfm, space]);

  const fit =
    calc.ach === 0 ? { tone: 'warn' as const, text: 'Enter room dimensions + airflow' } :
    calc.meetsRec ? { tone: 'good' as const, text: 'Exceeds recommended standard' } :
    calc.meetsMin ? { tone: 'ok' as const, text: 'Meets minimum — room to improve' } :
                    { tone: 'bad' as const, text: 'Below minimum ventilation' };

  return (
    <CalcShell
      Icon={Wind}
      title="Air Changes Per Hour (ACH) Calculator"
      subtitle="Ventilation rate + ASHRAE compliance check."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Room dimensions" subtitle="Length × width × ceiling = volume" Icon={Home} accent={ACCENT} />

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Length</label>
            <NumberInput value={roomLength} onChange={setRoomLength} min={5} max={100} suffix="ft" ariaLabel="Length" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Width</label>
            <NumberInput value={roomWidth} onChange={setRoomWidth} min={5} max={100} suffix="ft" ariaLabel="Width" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Ceiling height</label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {dimensionPresets.map((p) => {
                const active = ceilingHeight === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setCeilingHeight(p.value)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border ${active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'}`}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
            <NumberInput value={ceilingHeight} onChange={setCeilingHeight} min={7} max={20} suffix="ft" ariaLabel="Ceiling height" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="px-2 py-1 bg-gray-50 rounded">
            <span className="text-gray-500">Floor area:</span>{' '}
            <span className="font-semibold text-gray-800">{fmt(Math.round(calc.area))} sq ft</span>
          </div>
          <div className="px-2 py-1 bg-gray-50 rounded">
            <span className="text-gray-500">Volume:</span>{' '}
            <span className="font-semibold text-gray-800">{fmt(Math.round(calc.volume))} cu ft</span>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Space type" subtitle="Determines the target ACH" Icon={Gauge} accent={ACCENT} />

        <CardChoice value={spaceType} onChange={setSpaceType} options={spaceTypes} ariaLabel="Space type" accent={ACCENT} columns={4} />
      </section>

      <section>
        <SectionHeader step={3} title="Current airflow" subtitle="Measured or designed CFM into the room" Icon={Wind} accent={ACCENT} />

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Airflow rate
            <InfoTip label="airflow">
              Measure with an anemometer at the supply register, or use the rated CFM on the fan/HVAC equipment.
              Typical residential supply registers deliver 50–200 CFM each.
            </InfoTip>
          </label>
          <NumberInput value={airflow} onChange={setAirflow} min={0} max={5000} suffix="CFM" ariaLabel="Airflow CFM" accent={ACCENT} />
          <p className="text-xs text-gray-500 mt-1.5">
            For comparison: bathroom exhaust fans are typically 50–110 CFM; range hoods 200–600 CFM; whole-house ERVs 100–400 CFM.
          </p>
        </div>
      </section>

      <CalculateResetBar
        onCalculate={calculate}
        onReset={handleReset}
        dirty={dirty}
        hasResult={hasResult}
        accent={ACCENT}
      />

      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Current air changes per hour"
          value={calc.ach.toFixed(1)}
          unit={`ACH · ${calc.minutesPerChange.toFixed(1)} min per full change`}
          secondaryText={
            <>
              Your {fmt(Math.round(calc.volume))} cu ft {space.name.toLowerCase()} gets <strong>{calc.ach.toFixed(1)} air changes/hr</strong> at {fmt(cfm)} CFM.
              {' '}{space.name} need minimum <strong>{space.minACH} ACH</strong>, target <strong>{space.recommendedACH} ACH</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Required (min)', value: `${fmt(Math.round(calc.reqMinCfm))} CFM` },
            { label: 'Required (target)', value: `${fmt(Math.round(calc.reqRecCfm))} CFM` },
            { label: 'CFM per sq ft', value: `${calc.area > 0 ? (cfm / calc.area).toFixed(2) : '0'} CFM/sf` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Gauge className="w-4 h-4 text-emerald-600" />
              Compliance check
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Space type', detail: space.name, factor: '—' },
                { label: 'Min ACH (ASHRAE)', detail: 'Health-based minimum', factor: `${space.minACH}` },
                { label: 'Recommended ACH', detail: 'Best practice', factor: `${space.recommendedACH}` },
                { label: 'Your current ACH', detail: '', factor: `${calc.ach.toFixed(1)}` },
                { label: 'Required min airflow', detail: 'To meet minimum', factor: `${fmt(Math.round(calc.reqMinCfm))} CFM` },
                { label: 'Required target airflow', detail: 'To hit recommended', factor: `${fmt(Math.round(calc.reqRecCfm))} CFM` },
              ]}
              totals={[
                { label: 'Status', value: calc.meetsRec ? 'Excellent' : calc.meetsMin ? 'Adequate' : 'Below minimum',
                  valueClass: calc.meetsRec ? 'text-emerald-700' : calc.meetsMin ? 'text-amber-700' : 'text-red-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Energy impact + reference
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Estimated fan power</span>
                <strong>{Math.round(calc.fanWatts)}W</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Daily fan energy</span>
                <strong>{calc.dailyKwh.toFixed(1)} kWh</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Air moved per day</span>
                <strong>{fmt(Math.round(calc.dailyAirVolume / 1000))}k cu ft</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Time per full change</span>
                <strong>{calc.minutesPerChange.toFixed(1)} min</strong>
              </div>
            </div>
            <div className="mt-3 bg-gray-50 rounded p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">Common ACH targets:</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-gray-600">
                <div className="flex justify-between"><span>Living areas</span><span>0.35–2</span></div>
                <div className="flex justify-between"><span>Bedrooms</span><span>0.35–1.5</span></div>
                <div className="flex justify-between"><span>Bathrooms</span><span>5–10</span></div>
                <div className="flex justify-between"><span>Kitchens</span><span>5–15</span></div>
                <div className="flex justify-between"><span>Hospitals</span><span>6–12</span></div>
                <div className="flex justify-between"><span>Clean rooms</span><span>20–600</span></div>
              </div>
            </div>
          </div>
        </div>

        {!calc.meetsMin && calc.ach > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-semibold text-red-900 mb-1 text-sm">⚠ Insufficient ventilation</h4>
            <p className="text-xs text-red-800 leading-relaxed">
              Current <strong>{calc.ach.toFixed(1)} ACH</strong> is below the <strong>{space.minACH} ACH</strong> minimum for {space.name.toLowerCase()}.
              Increase airflow to at least <strong>{fmt(Math.round(calc.reqMinCfm))} CFM</strong> to meet code.
              Poor ventilation = CO₂ buildup, lingering odors, moisture/mold risk in bathrooms.
            </p>
          </div>
        )}
        {calc.meetsMin && !calc.meetsRec && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-semibold text-amber-900 mb-1 text-sm">Room to improve</h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              Meeting minimum, but bumping airflow from <strong>{fmt(cfm)} CFM</strong> to <strong>{fmt(Math.round(calc.reqRecCfm))} CFM</strong> reaches the recommended ACH for noticeably better air quality.
            </p>
          </div>
        )}

        <DisclaimerBox title="What ACH does and doesn't tell you">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>ACH measures bulk air movement — doesn't measure filtration efficiency or pollutant removal</li>
            <li>For viruses + fine particulates, MERV-13+ filtration matters more than ACH alone</li>
            <li>ACH50 (blower-door test) measures envelope leakage, not mechanical ventilation — different number</li>
            <li>In heated/cooled spaces, very high ACH wastes conditioning energy — use ERVs to capture 70%+ of that energy</li>
            <li>For kitchens + bathrooms, ACH applies only during peak use — these are intermittent-exhaust spaces</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
