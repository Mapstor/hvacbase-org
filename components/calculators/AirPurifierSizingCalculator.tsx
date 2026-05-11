'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Home,
  Bed,
  Sofa,
  ChefHat,
  Briefcase,
  Bath,
  Cat,
  Cigarette,
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
  accentMap,
} from './_shared';

const ACCENT = 'blue' as const;
const a = accentMap[ACCENT];

const roomTypes = [
  { value: 'bedroom', name: 'Bedroom', summary: 'Sleep — 2 ACH baseline', acph: 2, Icon: Bed },
  { value: 'living', name: 'Living room', summary: '2 ACH + extra for guests', acph: 2, Icon: Sofa },
  { value: 'kitchen', name: 'Kitchen', summary: 'Cooking fumes — 3 ACH', acph: 3, Icon: ChefHat },
  { value: 'office', name: 'Home office', summary: '2 ACH for focus comfort', acph: 2, Icon: Briefcase },
  { value: 'basement', name: 'Basement', summary: 'Lower contam — 1 ACH', acph: 1, Icon: Home },
  { value: 'bathroom', name: 'Bathroom', summary: 'Moisture + odor — 4 ACH', acph: 4, Icon: Bath },
];

const pollutionLevels = [
  { value: 'low', name: 'Low', summary: 'Rural, clean air, no smoking', multiplier: 1.0 },
  { value: 'moderate', name: 'Moderate', summary: 'Suburban, light traffic', multiplier: 1.3 },
  { value: 'high', name: 'High', summary: 'Urban, heavy traffic, pets', multiplier: 1.6 },
  { value: 'severe', name: 'Severe', summary: 'Smoking, construction, wildfire', multiplier: 2.0 },
];

const extras = [
  { id: 'allergies', label: 'Household allergies', factor: 1.3, Icon: Cigarette },
  { id: 'pets', label: 'Pets in home', factor: 1.2, Icon: Cat },
];

export default function AirPurifierSizingCalculator() {
  const [roomLength, setRoomLength] = useState('12');
  const [roomWidth, setRoomWidth] = useState('10');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [roomType, setRoomType] = useState('bedroom');
  const [pollutionLevel, setPollutionLevel] = useState('moderate');
  const [extraFactors, setExtraFactors] = useState<Set<string>>(new Set());

  const room = roomTypes.find((r) => r.value === roomType)!;
  const pollution = pollutionLevels.find((p) => p.value === pollutionLevel)!;
  const L = Math.max(parseFloat(roomLength) || 0, 0);
  const W = Math.max(parseFloat(roomWidth) || 0, 0);
  const H = Math.max(parseFloat(ceilingHeight) || 0, 0);

  const toggle = (id: string) => {
    setExtraFactors((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const calc = useMemo(() => {
    const area = L * W;
    const volume = area * H;
    let requiredCadr = (volume * room.acph) / 60;
    requiredCadr *= pollution.multiplier;
    for (const id of extraFactors) {
      const e = extras.find((x) => x.id === id);
      if (e) requiredCadr *= e.factor;
    }
    const standardSizes = [
      { area: 150, cadr: 100, name: 'Small room' },
      { area: 300, cadr: 200, name: 'Medium room' },
      { area: 500, cadr: 300, name: 'Large room' },
      { area: 800, cadr: 450, name: 'Extra large' },
      { area: 1200, cadr: 600, name: 'Whole home' },
    ];
    const recommended = standardSizes.find((s) => s.area >= area && s.cadr >= requiredCadr) || standardSizes[standardSizes.length - 1];
    const actualAch = volume > 0 ? (recommended.cadr * 60) / volume : 0;
    const powerConsumption = Math.round(recommended.cadr * 0.8);
    const dailyEnergyUse = (powerConsumption * 16) / 1000;
    const monthlyEnergyUse = dailyEnergyUse * 30;
    return { area, volume, requiredCadr, recommended, actualAch, powerConsumption, dailyEnergyUse, monthlyEnergyUse };
  }, [L, W, H, room, pollution, extraFactors]);

  const fit =
    calc.requiredCadr === 0 ? { tone: 'warn' as const, text: 'Enter room dimensions' } :
    calc.actualAch >= room.acph * 1.5 ? { tone: 'good' as const, text: `Comfortably hits ${room.acph} ACH target` } :
    calc.actualAch >= room.acph ? { tone: 'good' as const, text: `Meets ${room.acph} ACH target` } :
    { tone: 'warn' as const, text: 'Slightly under-spec — consider bigger unit' };

  return (
    <CalcShell
      Icon={Wind}
      title="Air Purifier Sizing Calculator"
      subtitle="Right CADR + coverage area for your space. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Room dimensions" subtitle="Length × width × ceiling" Icon={Home} accent={ACCENT} />
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Length</label>
            <NumberInput value={roomLength} onChange={setRoomLength} min={5} max={50} suffix="ft" ariaLabel="Length" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Width</label>
            <NumberInput value={roomWidth} onChange={setRoomWidth} min={5} max={50} suffix="ft" ariaLabel="Width" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Ceiling height</label>
            <NumberInput value={ceilingHeight} onChange={setCeilingHeight} min={7} max={20} suffix="ft" ariaLabel="Ceiling height" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="px-2 py-1 bg-gray-50 rounded"><span className="text-gray-500">Floor area:</span> <strong className="text-gray-800">{fmt(Math.round(calc.area))} sq ft</strong></div>
          <div className="px-2 py-1 bg-gray-50 rounded"><span className="text-gray-500">Volume:</span> <strong className="text-gray-800">{fmt(Math.round(calc.volume))} cu ft</strong></div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Room type & pollution" subtitle="Drives the ACH target" Icon={Wind} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Room type</label>
            <CardChoice value={roomType} onChange={setRoomType} options={roomTypes} ariaLabel="Room type" accent={ACCENT} columns={3} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Pollution level
              <InfoTip label="pollution level">
                Includes outdoor air pollution, traffic proximity, smoking, cooking style, construction nearby, wildfire smoke seasons.
              </InfoTip>
            </label>
            <CardChoice value={pollutionLevel} onChange={setPollutionLevel} options={pollutionLevels} ariaLabel="Pollution level" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Extra factors</label>
            <div className="grid sm:grid-cols-2 gap-2">
              {extras.map((e) => {
                const active = extraFactors.has(e.id);
                const Icon = e.Icon;
                return (
                  <button
                    key={e.id}
                    type="button"
                    role="checkbox"
                    aria-checked={active}
                    onClick={() => toggle(e.id)}
                    className={`text-left p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      active ? `${a.selectedBorder} ${a.selectedBg} ring-1 ${a.selectedRing}` : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${active ? `${a.iconBg} border-transparent` : 'border-gray-300'}`}>
                      {active && <span className="text-white text-[10px] leading-none">✓</span>}
                    </div>
                    <Icon className={`w-4 h-4 ${active ? a.sectionIconText : 'text-gray-500'}`} />
                    <span className="text-sm font-medium text-gray-900">{e.label}</span>
                    <span className="ml-auto text-[11px] text-gray-500">+{((e.factor - 1) * 100).toFixed(0)}%</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Required CADR rating"
          value={`${Math.round(calc.requiredCadr)}`}
          unit={`CFM · ${calc.recommended.name}`}
          secondaryText={
            <>
              For your {fmt(Math.round(calc.area))} sq ft {room.name.toLowerCase()} with {pollution.name.toLowerCase()} pollution{extraFactors.size > 0 && ' + extras'},
              you need at least <strong>{Math.round(calc.requiredCadr)} CFM</strong> CADR.
              The closest standard tier is <strong>{calc.recommended.name}</strong> at {calc.recommended.cadr} CFM (covers up to {calc.recommended.area} sq ft).
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Recommended CADR', value: `${calc.recommended.cadr} CFM` },
            { label: 'Coverage rating', value: `${calc.recommended.area} sq ft` },
            { label: 'Achieved ACH', value: `${calc.actualAch.toFixed(1)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-blue-600" />
              CADR calculation
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Room volume', detail: `${L} × ${W} × ${H}`, factor: `${fmt(Math.round(calc.volume))} cu ft` },
                { label: 'Target ACH', detail: room.name, factor: `${room.acph} ACH` },
                { label: 'Base CADR', detail: `Volume × ACH ÷ 60`, factor: `${fmt(Math.round((calc.volume * room.acph) / 60))} CFM` },
                { label: 'Pollution factor', detail: pollution.name, factor: `× ${pollution.multiplier.toFixed(1)}` },
                ...Array.from(extraFactors).map((id) => {
                  const e = extras.find((x) => x.id === id)!;
                  return { label: e.label, detail: '', factor: `× ${e.factor.toFixed(1)}` };
                }),
              ]}
              totals={[
                { label: 'Required CADR', value: `${Math.round(calc.requiredCadr)} CFM`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-blue-600" />
              Operating + reference
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Power consumption</span><strong>{calc.powerConsumption}W</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Daily energy (16hr)</span><strong>{calc.dailyEnergyUse.toFixed(1)} kWh</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Monthly energy</span><strong>{fmt(Math.round(calc.monthlyEnergyUse))} kWh</strong></div>
              <div className="flex justify-between py-1.5"><span>Monthly cost @ $0.16</span><strong>${(calc.monthlyEnergyUse * 0.16).toFixed(2)}</strong></div>
            </div>
            <div className="mt-3 bg-blue-50 rounded-lg p-3 text-xs">
              <div className="font-semibold text-blue-900 mb-1">CADR reference (AHAM tested)</div>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-blue-800">
                <div className="flex justify-between"><span>Small room</span><span>100 CFM</span></div>
                <div className="flex justify-between"><span>Medium room</span><span>200 CFM</span></div>
                <div className="flex justify-between"><span>Large room</span><span>300 CFM</span></div>
                <div className="flex justify-between"><span>XL room</span><span>450 CFM</span></div>
                <div className="flex justify-between"><span>Whole home</span><span>600+ CFM</span></div>
              </div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="What CADR doesn't capture">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>CADR is AHAM-certified for smoke, dust, and pollen — VOCs and viruses need different filtration (carbon, UV-C, HEPA-13)</li>
            <li>The "coverage area" sticker assumes 4.8 ACH at lab conditions; for allergy sufferers, target 5 ACH+</li>
            <li>HEPA filters need replacing every 6–12 months; pre-filters every 3 months — factor into total cost</li>
            <li>Whole-house purifiers in the HVAC return are more efficient than individual room units for multiple rooms</li>
            <li>For wildfire smoke season: bump up one tier and run continuously on high</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
