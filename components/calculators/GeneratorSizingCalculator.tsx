'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  Home,
  AlertTriangle,
  DollarSign,
  Battery,
  Refrigerator,
  Lightbulb,
  Wrench,
  Microwave,
  Snowflake,
  Plug,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  InfoTip,
  ResultHero,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
  accentMap,
} from './_shared';

const ACCENT = 'orange' as const;
const a = accentMap[ACCENT];

type Appliance = { id: string; name: string; running: number; starting: number };

const applianceCategories: { name: string; Icon: any; items: Appliance[] }[] = [
  {
    name: 'Refrigerators & freezers',
    Icon: Refrigerator,
    items: [
      { id: 'fridge-standard', name: 'Standard fridge (18–21 cu ft)', running: 150, starting: 1200 },
      { id: 'fridge-sidebyside', name: 'Side-by-side fridge (22–26 cu ft)', running: 225, starting: 1500 },
      { id: 'fridge-french', name: 'French door fridge (22–28 cu ft)', running: 225, starting: 1500 },
      { id: 'fridge-mini', name: 'Mini fridge (1.7–4.5 cu ft)', running: 75, starting: 450 },
      { id: 'freezer-chest-small', name: 'Chest freezer (5–9 cu ft)', running: 75, starting: 650 },
      { id: 'freezer-chest-medium', name: 'Chest freezer (10–18 cu ft)', running: 150, starting: 900 },
      { id: 'freezer-chest-large', name: 'Chest freezer (18–25 cu ft)', running: 200, starting: 1100 },
      { id: 'freezer-upright-medium', name: 'Upright freezer (10–18 cu ft)', running: 200, starting: 1000 },
      { id: 'freezer-upright-large', name: 'Upright freezer (18–25 cu ft)', running: 300, starting: 1250 },
    ],
  },
  {
    name: 'Essential home',
    Icon: Lightbulb,
    items: [
      { id: 'lights-led-5', name: '5 LED lights (10W each)', running: 50, starting: 50 },
      { id: 'lights-led-10', name: '10 LED lights (10W each)', running: 100, starting: 100 },
      { id: 'fan-ceiling', name: 'Ceiling fan', running: 75, starting: 100 },
      { id: 'fan-box', name: 'Box fan', running: 100, starting: 120 },
      { id: 'phone-charger', name: 'Phone / laptop chargers', running: 25, starting: 25 },
      { id: 'tv-led', name: 'LED TV (50″)', running: 100, starting: 100 },
      { id: 'internet-modem', name: 'Modem + router', running: 50, starting: 50 },
    ],
  },
  {
    name: 'Pumps & motors',
    Icon: Wrench,
    items: [
      { id: 'sump-pump-1/3', name: 'Sump pump (1/3 HP)', running: 800, starting: 1800 },
      { id: 'sump-pump-1/2', name: 'Sump pump (1/2 HP)', running: 1050, starting: 2150 },
      { id: 'well-pump-1/2', name: 'Well pump (1/2 HP)', running: 1000, starting: 2100 },
      { id: 'well-pump-3/4', name: 'Well pump (3/4 HP)', running: 1500, starting: 3000 },
      { id: 'furnace-blower', name: 'Furnace blower (1/2 HP)', running: 800, starting: 2350 },
    ],
  },
  {
    name: 'Kitchen',
    Icon: Microwave,
    items: [
      { id: 'microwave-small', name: 'Microwave (700W)', running: 700, starting: 700 },
      { id: 'microwave-large', name: 'Microwave (1000W)', running: 1000, starting: 1000 },
      { id: 'coffee-maker', name: 'Coffee maker', running: 1000, starting: 1000 },
      { id: 'toaster', name: 'Toaster', running: 850, starting: 850 },
      { id: 'electric-skillet', name: 'Electric skillet', running: 1500, starting: 1500 },
    ],
  },
  {
    name: 'Cooling & heating',
    Icon: Snowflake,
    items: [
      { id: 'window-ac-5000', name: 'Window AC (5,000 BTU)', running: 500, starting: 1200 },
      { id: 'window-ac-8000', name: 'Window AC (8,000 BTU)', running: 700, starting: 1800 },
      { id: 'window-ac-10000', name: 'Window AC (10,000 BTU)', running: 900, starting: 2200 },
      { id: 'space-heater', name: 'Space heater (1500W)', running: 1500, starting: 1500 },
      { id: 'electric-blanket', name: 'Electric blanket', running: 200, starting: 200 },
    ],
  },
];

const generatorSizes = [
  { watts: 1000, label: '1,000W', price: 300 },
  { watts: 2000, label: '2,000W inverter', price: 500 },
  { watts: 2200, label: '2,200W inverter', price: 600 },
  { watts: 3000, label: '3,000W', price: 700 },
  { watts: 3500, label: '3,500W', price: 800 },
  { watts: 5000, label: '5,000W', price: 1200 },
  { watts: 5500, label: '5,500W', price: 1400 },
  { watts: 7500, label: '7,500W', price: 2000 },
  { watts: 10000, label: '10,000W', price: 3000 },
];

const DEFAULTS = {
  selected: (): Set<string> => new Set<string>(),
};

export default function GeneratorSizingCalculator() {
  const [selected, setSelected] = useState<Set<string>>(DEFAULTS.selected());

  const selectedKey = [...selected].sort().join('|');

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    selectedKey,
  });

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReset = () => {
    setSelected(DEFAULTS.selected());
    clear();
  };

  const calc = useMemo(() => {
    const activeIds = new Set(src.selectedKey ? src.selectedKey.split('|') : []);
    const items: Appliance[] = [];
    applianceCategories.forEach((cat) => cat.items.forEach((it) => { if (activeIds.has(it.id)) items.push(it); }));
    const totalRunning = items.reduce((s, x) => s + x.running, 0);
    const largestStartingDelta = items.length === 0 ? 0 : Math.max(...items.map((x) => x.starting - x.running));
    const peakWatts = totalRunning + largestStartingDelta;
    const recommendedWatts = Math.ceil(peakWatts * 1.2);
    const recommendedGenerator = generatorSizes.find((g) => g.watts >= recommendedWatts) || generatorSizes[generatorSizes.length - 1];
    const minimumGenerator = generatorSizes.find((g) => g.watts >= peakWatts) || generatorSizes[generatorSizes.length - 1];
    const fuelGalPerHr = recommendedWatts / 5000;
    const runtime5Gal = fuelGalPerHr > 0 ? 5 / fuelGalPerHr : 0;
    const dailyCost = fuelGalPerHr * 8 * 4.5;
    return { items, totalRunning, largestStartingDelta, peakWatts, recommendedWatts, recommendedGenerator, minimumGenerator, fuelGalPerHr, runtime5Gal, dailyCost };
  }, [src.selectedKey]);

  const fit =
    calc.items.length === 0 ? { tone: 'warn' as const, text: 'Pick at least one appliance' } :
    calc.peakWatts <= 2200 ? { tone: 'good' as const, text: 'Inverter generator territory — quiet + portable' } :
    calc.peakWatts <= 5000 ? { tone: 'good' as const, text: 'Mid-size portable generator' } :
    calc.peakWatts <= 10000 ? { tone: 'ok' as const, text: 'Large portable / dual-fuel' } :
                              { tone: 'warn' as const, text: 'Consider standby generator with transfer switch' };

  return (
    <CalcShell
      Icon={Zap}
      title="Generator Sizing Calculator"
      subtitle="Pick the appliances you need during an outage — we compute starting + running watts and the right generator."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Appliance picker */}
      <section>
        <SectionHeader step={1} title="Pick what you need to power" subtitle={`${calc.items.length} selected · ${fmt(calc.totalRunning)}W running`} Icon={Plug} accent={ACCENT} />

        <div className="space-y-5">
          {applianceCategories.map((cat) => {
            const CatIcon = cat.Icon;
            return (
              <div key={cat.name}>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm">
                  <CatIcon className={`w-4 h-4 ${a.sectionIconText}`} />
                  {cat.name}
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {cat.items.map((item) => {
                    const active = selected.has(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="checkbox"
                        aria-checked={active}
                        onClick={() => toggle(item.id)}
                        className={`text-left p-2.5 rounded-lg border-2 transition-all ${
                          active
                            ? `${a.selectedBorder} ${a.selectedBg} ring-1 ${a.selectedRing}`
                            : `border-gray-200 bg-white ${a.hoverBorder} ${a.hoverBg}/50`
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-4 h-4 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                            active ? `${a.iconBg} border-transparent` : 'border-gray-300'
                          }`}>
                            {active && <span className="text-white text-[10px] leading-none">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium truncate ${active ? a.selectedText : 'text-gray-900'}`}>{item.name}</div>
                            <div className={`text-[11px] ${active ? a.selectedSummary : 'text-gray-500'}`}>
                              {item.running}W run · {item.starting}W start
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
          eyebrow="Recommended generator"
          value={calc.recommendedGenerator.label}
          unit={`(~$${fmtMoney(calc.recommendedGenerator.price)} typical)`}
          secondaryText={
            <>
              Your selected loads draw <strong>{fmt(calc.totalRunning)}W continuously</strong> and peak at{' '}
              <strong>{fmt(calc.peakWatts)}W</strong> when the largest motor starts.
              We add a 20% safety margin → <strong>{fmt(calc.recommendedWatts)}W</strong> minimum capacity.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Running watts', value: `${fmt(calc.totalRunning)}W` },
            { label: 'Peak surge', value: `${fmt(calc.peakWatts)}W` },
            { label: 'Daily fuel cost', value: `$${fmtMoney(calc.dailyCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-orange-600" />
              Selected appliances ({calc.items.length})
              <InfoTip label="starting watts">
                Motors briefly draw 2–6× their running wattage at startup. We assume only one motor starts at a time — that's why "peak surge" = running watts + the LARGEST starting delta, not the sum of all starting deltas.
              </InfoTip>
            </h4>
            {calc.items.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No appliances selected yet — pick from the categories above.</p>
            ) : (
              <div className="space-y-1 max-h-72 overflow-y-auto text-xs">
                {calc.items.map((item) => (
                  <div key={item.id} className="flex justify-between py-1.5 border-b border-gray-100">
                    <span className="text-gray-700 truncate pr-2">{item.name}</span>
                    <span className="font-mono tabular-nums text-gray-900 flex-shrink-0">
                      {item.running}W <span className="text-gray-400">/ {item.starting}W</span>
                    </span>
                  </div>
                ))}
                <div className="pt-2 mt-1 border-t border-gray-300 flex justify-between font-semibold text-sm">
                  <span className="text-gray-900">Total continuous</span>
                  <span className="text-orange-700 tabular-nums">{fmt(calc.totalRunning)}W</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Battery className="w-4 h-4 text-orange-600" />
              Generator options & runtime
            </h4>
            <div className="space-y-1.5">
              {[calc.minimumGenerator, calc.recommendedGenerator].filter((v, i, arr) => arr.findIndex(x => x.watts === v.watts) === i).map((g) => {
                const isRec = g.watts === calc.recommendedGenerator.watts;
                return (
                  <div key={g.watts} className={`flex items-center justify-between p-2.5 rounded-lg text-xs ${isRec ? `${a.selectedBg} ring-1 ${a.selectedRing}` : 'bg-gray-50'}`}>
                    <div>
                      <div className={`font-semibold ${isRec ? a.selectedText : 'text-gray-900'}`}>
                        {isRec ? 'Recommended: ' : 'Minimum: '}{g.label}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {isRec ? '20% safety margin baked in' : 'Handles peak with no headroom'}
                      </div>
                    </div>
                    <div className={`tabular-nums ${isRec ? a.bigNumber + ' font-bold' : 'text-gray-700'}`}>
                      ${fmtMoney(g.price)}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Fuel use at recommended load</span><strong>{calc.fuelGalPerHr.toFixed(2)} gal/hr</strong></div>
              <div className="flex justify-between"><span>Runtime on 5 gal tank</span><strong>{calc.runtime5Gal.toFixed(1)} hours</strong></div>
              <div className="flex justify-between"><span>Daily fuel cost (8hr × $4.50/gal)</span><strong>${fmtMoney(calc.dailyCost)}</strong></div>
            </div>
            {calc.recommendedGenerator.watts < 7500 && calc.items.length > 0 && (
              <div className="mt-3 p-2.5 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900">
                <strong>Comfort tier:</strong> Stepping up to a 7,500W generator (~$2,000) leaves room for additional loads during extended outages, plus longer runtime per gallon at lower load.
              </div>
            )}
          </div>
        </div>

        <DisclaimerBox title="A few sizing rules of thumb">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Inverter generators (under 3,500W) are 50% quieter and 30% more fuel-efficient at light loads</li>
            <li>Motors don't all start at once — that's why we only add the LARGEST starting delta</li>
            <li>For permanent backup, use a standby generator + automatic transfer switch (8–22 kW, $5,000–$15,000 installed)</li>
            <li>Never run a generator indoors or in attached garage — CO is deadly within minutes</li>
            <li>Have an electrician install a transfer switch — backfeeding the grid kills line workers</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
