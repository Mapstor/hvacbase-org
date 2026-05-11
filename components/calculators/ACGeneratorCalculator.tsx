'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Home,
  Zap,
  DollarSign,
  AlertTriangle,
  Snowflake,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  Segmented,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  accentMap,
} from './_shared';

const ACCENT = 'orange' as const;
const a = accentMap[ACCENT];

const acUnits = [
  { value: '1.5', name: '1.5 ton AC', summary: '2.0kW run / 5.3kW surge', running: 2000, surge: 5250, rla: 8.3, lra: 22 },
  { value: '2.0', name: '2.0 ton AC', summary: '2.7kW run / 7.0kW surge', running: 2700, surge: 7000, rla: 11.3, lra: 29 },
  { value: '2.5', name: '2.5 ton AC', summary: '3.3kW run / 8.3kW surge', running: 3300, surge: 8250, rla: 13.8, lra: 34 },
  { value: '3.0', name: '3.0 ton AC', summary: '3.9kW run / 9.5kW surge', running: 3850, surge: 9500, rla: 16, lra: 40 },
  { value: '3.5', name: '3.5 ton AC', summary: '4.4kW run / 10.8kW surge', running: 4400, surge: 10750, rla: 18.3, lra: 45 },
  { value: '4.0', name: '4.0 ton AC', summary: '5.0kW run / 12kW surge', running: 4950, surge: 12000, rla: 20.6, lra: 50 },
  { value: '5.0', name: '5.0 ton AC', summary: '5.5kW run / 13.2kW surge', running: 5500, surge: 13200, rla: 23, lra: 55 },
];

const householdLoads = [
  { id: 'fridge', name: 'Refrigerator', running: 200, surge: 1000, essential: true },
  { id: 'freezer', name: 'Freezer', running: 150, surge: 700, essential: true },
  { id: 'lights', name: 'LED lights (whole house)', running: 300, surge: 300, essential: true },
  { id: 'internet', name: 'Modem + router', running: 75, surge: 75, essential: true },
  { id: 'tv', name: 'TV (50″)', running: 150, surge: 150, essential: false },
  { id: 'fans', name: 'Ceiling fans (3)', running: 225, surge: 300, essential: false },
  { id: 'wellpump', name: 'Well pump (1/2 HP)', running: 750, surge: 2000, essential: false },
  { id: 'sumppump', name: 'Sump pump (1/3 HP)', running: 500, surge: 1200, essential: false },
  { id: 'microwave', name: 'Microwave', running: 1200, surge: 1200, essential: false },
  { id: 'garagedoor', name: 'Garage door opener', running: 600, surge: 1400, essential: false },
];

const generatorSizes = [
  { kw: 7, watts: 7000, label: '7 kW', price: 1800 },
  { kw: 10, watts: 10000, label: '10 kW', price: 2500 },
  { kw: 12, watts: 12000, label: '12 kW', price: 3000 },
  { kw: 14, watts: 14000, label: '14 kW', price: 3500 },
  { kw: 16, watts: 16000, label: '16 kW', price: 4000 },
  { kw: 20, watts: 20000, label: '20 kW', price: 4800 },
  { kw: 22, watts: 22000, label: '22 kW whole house', price: 5500 },
  { kw: 24, watts: 24000, label: '24 kW whole house', price: 6000 },
  { kw: 30, watts: 30000, label: '30 kW', price: 7500 },
];

const hardStartOptions = [
  { value: 'no', name: 'No', sub: 'Standard surge' },
  { value: 'yes', name: 'Yes', sub: '−35% surge' },
];

export default function ACGeneratorCalculator() {
  const [acSize, setAcSize] = useState('3.0');
  const [hasHardStart, setHasHardStart] = useState('no');
  const [selectedLoads, setSelectedLoads] = useState<Set<string>>(new Set(['fridge', 'freezer', 'lights', 'internet']));

  const selectedAC = acUnits.find((unit) => unit.value === acSize)!;
  const useHardStart = hasHardStart === 'yes';

  const toggleLoad = (id: string) => {
    setSelectedLoads((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const calc = useMemo(() => {
    const acSurge = useHardStart ? selectedAC.surge * 0.65 : selectedAC.surge;
    const acRunning = selectedAC.running;
    const selectedItems = householdLoads.filter((l) => selectedLoads.has(l.id));
    const householdRunning = selectedItems.reduce((s, l) => s + l.running, 0);
    const totalRunning = acRunning + householdRunning;
    const totalSurge = totalRunning + (acSurge - acRunning);
    const recommendedSize = Math.ceil(totalSurge * 1.2 / 1000) * 1000;
    const minimumGenerator = generatorSizes.find((g) => g.watts >= totalSurge) || generatorSizes[generatorSizes.length - 1];
    const recommendedGenerator = generatorSizes.find((g) => g.watts >= recommendedSize) || generatorSizes[generatorSizes.length - 1];
    const ngConsumption = recommendedGenerator.kw * 2.5;
    const propaneConsumption = recommendedGenerator.kw * 0.11;
    return { acSurge, acRunning, selectedItems, householdRunning, totalRunning, totalSurge, recommendedSize, minimumGenerator, recommendedGenerator, ngConsumption, propaneConsumption };
  }, [selectedAC, useHardStart, selectedLoads]);

  const fit =
    calc.totalSurge === 0 ? { tone: 'warn' as const, text: 'Select your AC + loads' } :
    calc.recommendedGenerator.watts >= 22000 ? { tone: 'ok' as const, text: 'Whole-house standby generator territory' } :
    calc.recommendedGenerator.watts >= 14000 ? { tone: 'good' as const, text: 'Standard standby generator size' } :
    { tone: 'good' as const, text: 'Portable generator covers this' };

  return (
    <CalcShell
      Icon={Wind}
      title="AC Generator Sizing Calculator"
      subtitle="Generator size for central AC + critical loads. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Your AC unit" subtitle="Size + optional hard-start kit" Icon={Snowflake} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Central AC size</label>
            <CardChoice value={acSize} onChange={setAcSize} options={acUnits} ariaLabel="AC size" accent={ACCENT} columns={4} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Hard-start kit installed?
              <InfoTip label="hard-start kit">A $200–400 capacitor that cuts AC startup surge by 30–40%. Often lets you downsize the generator by one tier, saving more than the kit costs.</InfoTip>
            </label>
            <Segmented value={hasHardStart} onChange={setHasHardStart} options={hardStartOptions} ariaLabel="Hard start" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Additional household loads" subtitle={`${calc.selectedItems.length} selected · ${fmt(calc.householdRunning)}W running`} Icon={Home} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-2">
          {householdLoads.map((item) => {
            const active = selectedLoads.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggleLoad(item.id)}
                className={`text-left p-2.5 rounded-lg border-2 transition-all flex items-start gap-2 ${
                  active ? `${a.selectedBorder} ${a.selectedBg} ring-1 ${a.selectedRing}` : `border-gray-200 bg-white ${a.hoverBorder} ${a.hoverBg}/50`
                }`}
              >
                <div className={`w-4 h-4 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center ${active ? `${a.iconBg} border-transparent` : 'border-gray-300'}`}>
                  {active && <span className="text-white text-[10px] leading-none">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${active ? a.selectedText : 'text-gray-900'}`}>
                    {item.name}
                    {item.essential && <span className="ml-1.5 text-[10px] uppercase tracking-wider font-bold text-emerald-700">Essential</span>}
                  </div>
                  <div className={`text-[11px] ${active ? a.selectedSummary : 'text-gray-500'}`}>
                    {item.running}W run · {item.surge}W start
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended generator"
          value={calc.recommendedGenerator.label}
          unit={`(~$${fmtMoney(calc.recommendedGenerator.price)} equipment)`}
          secondaryText={
            <>
              Your {selectedAC.name} pulls {calc.acRunning}W running, {fmt(Math.round(calc.acSurge))}W at startup.
              {' '}With {calc.selectedItems.length} other loads ({fmt(calc.householdRunning)}W), peak demand is <strong>{fmt(Math.round(calc.totalSurge))}W</strong>.
              {' '}+20% margin → <strong>{fmt(calc.recommendedSize)}W</strong> minimum capacity.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Total running', value: `${fmt(calc.totalRunning)}W` },
            { label: 'Peak surge', value: `${fmt(Math.round(calc.totalSurge))}W` },
            { label: 'With margin', value: `${fmt(calc.recommendedSize)}W` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Snowflake className="w-4 h-4 text-orange-600" />
              AC unit details
            </h4>
            <BreakdownTable
              rows={[
                { label: 'AC size', detail: selectedAC.name, factor: '' },
                { label: 'Running current', detail: `${selectedAC.rla}A @ 240V`, factor: `${selectedAC.running}W` },
                { label: 'Starting (LRA)', detail: `${selectedAC.lra}A @ 240V`, factor: `${selectedAC.surge}W` },
                ...(useHardStart ? [{ label: 'With hard-start', detail: '−35% surge', factor: `${Math.round(calc.acSurge)}W` }] : []),
                { label: 'Annual cooling cost', detail: '8hr/day × 120 days × $0.16', factor: `~$${fmtMoney(selectedAC.running * 0.16 * 8 * 120 / 1000)}` },
              ]}
              totals={[]}
            />
            {!useHardStart && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900">
                💡 <strong>Hard-start kit ($200–400)</strong> would drop AC surge from {selectedAC.surge}W → {Math.round(selectedAC.surge * 0.65)}W. Often lets you downsize by one generator tier.
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-orange-600" />
              Generator options
            </h4>
            <div className="space-y-1.5">
              {[calc.minimumGenerator, calc.recommendedGenerator].filter((v, i, arr) => arr.findIndex((x) => x.watts === v.watts) === i).map((g) => {
                const isRec = g.watts === calc.recommendedGenerator.watts;
                return (
                  <div key={g.watts} className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${isRec ? `${a.selectedBg} ring-1 ${a.selectedRing}` : 'bg-gray-50'}`}>
                    <div>
                      <div className={`font-semibold ${isRec ? a.selectedText : 'text-gray-900'}`}>
                        {isRec ? 'Recommended' : 'Minimum'}: {g.label}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{isRec ? '+20% safety margin' : 'No headroom'}</div>
                    </div>
                    <div className={`tabular-nums ${isRec ? a.bigNumber + ' font-bold' : 'text-gray-700'}`}>${fmtMoney(g.price)}</div>
                  </div>
                );
              })}
              <div className="p-2.5 rounded-lg text-xs bg-blue-50 ring-1 ring-blue-200">
                <div className="font-semibold text-blue-900">Whole house: 22–24 kW</div>
                <div className="text-[11px] text-blue-700 mt-0.5">Run everything without load management — $5,500–$6,000</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded text-xs">
              <div className="font-semibold text-gray-800 mb-1">Fuel consumption at 50% load</div>
              <div className="flex justify-between text-gray-700"><span>Natural gas</span><strong>{calc.ngConsumption.toFixed(1)} ft³/hr</strong></div>
              <div className="flex justify-between text-gray-700"><span>Propane</span><strong>{calc.propaneConsumption.toFixed(2)} gal/hr</strong></div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Generator installation requirements">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Central AC needs <strong>240V power</strong> — generator must output 240V (some smaller portables don't)</li>
            <li><strong>Automatic transfer switch (ATS)</strong> recommended for standby generators — $500–1,500 installed</li>
            <li>Standby generators run weekly self-exercise to keep cells lubricated and detect issues</li>
            <li>Natural gas/propane standby needs fuel line — propane tanks should be sized for 24–48 hr autonomy</li>
            <li><strong>Never backfeed</strong> a generator through a wall outlet — illegal in all jurisdictions, can kill line workers</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
