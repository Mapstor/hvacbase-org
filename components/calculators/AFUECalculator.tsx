'use client';

import { useState, useMemo } from 'react';
import {
  Flame,
  TrendingUp,
  DollarSign,
  Leaf,
  Calendar,
  Wallet,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
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

const ACCENT = 'orange' as const;

const furnaceTiers = [
  { value: 'old-60', name: '60% AFUE', tier: 'Old low', afue: 60, summary: 'Pre-1980, no condensing tech' },
  { value: 'old-70', name: '70% AFUE', tier: 'Old std', afue: 70, summary: '1980s–early 1990s standard' },
  { value: 'standard-80', name: '80% AFUE', tier: 'Standard', afue: 80, summary: 'Non-condensing, metal vent' },
  { value: 'mid-85', name: '85% AFUE', tier: 'Mid', afue: 85, summary: 'Transitional efficiency' },
  { value: 'high-90', name: '90% AFUE', tier: 'High', afue: 90, summary: 'Entry condensing furnace' },
  { value: 'high-92', name: '92% AFUE', tier: 'High', afue: 92, summary: 'Common high-efficiency' },
  { value: 'high-95', name: '95% AFUE', tier: 'High', afue: 95, summary: '2026 northern US minimum' },
  { value: 'ultra-97', name: '97% AFUE', tier: 'Ultra', afue: 97, summary: 'Modulating premium' },
  { value: 'ultra-98', name: '98% AFUE', tier: 'Ultra', afue: 98, summary: 'Top of market' },
];

const gasPriceOptions = [
  { value: 'low', name: 'Low', sub: '$0.60/therm' },
  { value: 'average', name: 'Average', sub: '$1.00/therm' },
  { value: 'high', name: 'High', sub: '$1.40/therm' },
  { value: 'very-high', name: 'Very high', sub: '$1.80/therm' },
];

const gasPrices: Record<string, number> = { low: 0.6, average: 1.0, high: 1.4, 'very-high': 1.8 };

const climateOptions = [
  { value: '120', name: 'Mild', sub: '120 heating days', btuPerSqFt: 30 },
  { value: '150', name: 'Moderate', sub: '150 days', btuPerSqFt: 35 },
  { value: '180', name: 'Average', sub: '180 days', btuPerSqFt: 40 },
  { value: '210', name: 'Cold', sub: '210 days', btuPerSqFt: 50 },
  { value: '240', name: 'Very cold', sub: '240 days', btuPerSqFt: 55 },
];

const homeSizePresets = [1000, 1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  currentAfue: 'old-70',
  newAfue: 'high-95',
  homeSize: '2000',
  gasPrice: 'average',
  heatingDays: '180',
  currentAge: '15',
};

export default function AFUECalculator() {
  const [currentAfue, setCurrentAfue] = useState(DEFAULTS.currentAfue);
  const [newAfue, setNewAfue] = useState(DEFAULTS.newAfue);
  const [homeSize, setHomeSize] = useState(DEFAULTS.homeSize);
  const [gasPrice, setGasPrice] = useState(DEFAULTS.gasPrice);
  const [heatingDays, setHeatingDays] = useState(DEFAULTS.heatingDays);
  const [currentAge, setCurrentAge] = useState(DEFAULTS.currentAge);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    currentAfue, newAfue, homeSize, gasPrice, heatingDays, currentAge,
  });

  const cur = furnaceTiers.find((t) => t.value === src.currentAfue)!;
  const nxt = furnaceTiers.find((t) => t.value === src.newAfue)!;
  const climate = climateOptions.find((c) => c.value === src.heatingDays)!;
  const price = gasPrices[src.gasPrice];

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
  const age = Math.max(parseFloat(src.currentAge) || 0, 0);

  const handleReset = () => {
    setCurrentAfue(DEFAULTS.currentAfue);
    setNewAfue(DEFAULTS.newAfue);
    setHomeSize(DEFAULTS.homeSize);
    setGasPrice(DEFAULTS.gasPrice);
    setHeatingDays(DEFAULTS.heatingDays);
    setCurrentAge(DEFAULTS.currentAge);
    clear();
  };

  const calc = useMemo(() => {
    const btusPerSqFt = climate.btuPerSqFt;
    const totalBtus = sqft * btusPerSqFt;
    const therms = totalBtus / 100000;
    const currentThermsUsed = therms / (cur.afue / 100);
    const newThermsUsed = therms / (nxt.afue / 100);
    const currentAnnualCost = currentThermsUsed * price * 100;
    const newAnnualCost = newThermsUsed * price * 100;

    // Degradation factor for old units
    let degradation = 1;
    if (age > 20) degradation = 0.85;
    else if (age > 15) degradation = 0.9;
    else if (age > 10) degradation = 0.95;

    const adjustedCurrentCost = currentAnnualCost / degradation;
    const adjustedCurrentTherms = currentThermsUsed / degradation;
    const annualSavings = adjustedCurrentCost - newAnnualCost;
    const percentSavings = adjustedCurrentCost > 0 ? (annualSavings / adjustedCurrentCost) * 100 : 0;
    const thermsSaved = adjustedCurrentTherms - newThermsUsed;
    const co2ReductionKg = Math.max(thermsSaved * 5.3, 0);

    const installCost = nxt.afue >= 95 ? 6000 : nxt.afue >= 90 ? 5000 : 4000;
    const paybackYears = annualSavings > 0 ? installCost / annualSavings : 0;
    const fiveYearSavings = annualSavings * 5;
    const tenYearSavings = annualSavings * 10;
    const twentyYearSavings = annualSavings * 20;

    return {
      currentThermsUsed: adjustedCurrentTherms,
      newThermsUsed,
      currentAnnualCost: adjustedCurrentCost,
      newAnnualCost,
      annualSavings,
      percentSavings,
      thermsSaved,
      co2ReductionKg,
      installCost,
      paybackYears,
      fiveYearSavings,
      tenYearSavings,
      twentyYearSavings,
      degradation,
    };
  }, [sqft, age, cur, nxt, climate, price]);

  const isUpgrade = nxt.afue > cur.afue;
  const fit =
    !isUpgrade ? { tone: 'warn' as const, text: 'New AFUE must exceed current to show savings' } :
    calc.percentSavings >= 25 ? { tone: 'good' as const, text: 'Massive savings — strong upgrade' } :
    calc.percentSavings >= 15 ? { tone: 'good' as const, text: 'Strong upgrade' } :
    calc.percentSavings >= 5  ? { tone: 'ok' as const, text: 'Meaningful savings' } :
                                { tone: 'warn' as const, text: 'Modest improvement — comfort + reliability matter too' };

  return (
    <CalcShell
      Icon={Flame}
      title="AFUE Efficiency Savings Calculator"
      subtitle="What you save by upgrading from one AFUE tier to another."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Current vs new */}
      <section>
        <SectionHeader step={1} title="Current vs new furnace" subtitle="Pick efficiency tiers" Icon={Flame} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current furnace
              <InfoTip label="current AFUE">
                Look at the yellow EnergyGuide sticker on your existing furnace. Pre-1990 units are often 60–70% AFUE; 2000s code-min is 80%; modern condensing is 90%+.
              </InfoTip>
            </label>
            <CardChoice value={currentAfue} onChange={setCurrentAfue} options={furnaceTiers} ariaLabel="Current AFUE" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">New furnace</label>
            <CardChoice value={newAfue} onChange={setNewAfue} options={furnaceTiers} ariaLabel="New AFUE" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      {/* Section 2 — Home + climate */}
      <section>
        <SectionHeader step={2} title="Your home & climate" subtitle="Drives heating load" Icon={TrendingUp} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current furnace age
                <InfoTip label="age">Old furnaces lose 5–15% of their nameplate efficiency over their lifetime. We adjust your current annual cost up accordingly.</InfoTip>
              </label>
              <NumberInput value={currentAge} onChange={setCurrentAge} min={0} max={30} suffix="years" ariaLabel="Furnace age" accent={ACCENT} />
              {calc.degradation < 1 && (
                <p className="text-xs text-amber-700 mt-1.5">
                  ⚠ {age}-year-old furnace loses ~{((1 - calc.degradation) * 100).toFixed(0)}% of nameplate efficiency.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate (heating days per year)</label>
            <CardChoice value={heatingDays} onChange={setHeatingDays} options={climateOptions} ariaLabel="Climate" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Natural gas price</label>
            <Segmented value={gasPrice} onChange={setGasPrice} options={gasPriceOptions} ariaLabel="Gas price" accent={ACCENT} />
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
          eyebrow="Annual savings from upgrading"
          value={`$${fmtMoney(Math.max(calc.annualSavings, 0))}`}
          unit={`/yr (${calc.percentSavings > 0 ? calc.percentSavings.toFixed(1) : 0}% lower heating cost)`}
          secondaryText={
            <>
              Upgrading from {cur.afue}% → {nxt.afue}% AFUE saves {fmt(Math.max(Math.round(calc.thermsSaved), 0))} therms/year.
              Estimated installed cost: <strong>${fmtMoney(calc.installCost)}</strong> · payback in{' '}
              <strong>{calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} years` : '—'}</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Therms saved', value: `${fmt(Math.max(Math.round(calc.thermsSaved), 0))}/yr` },
            { label: 'CO₂ reduced', value: `${fmt(Math.round(calc.co2ReductionKg))} kg/yr`, valueClass: 'text-emerald-700' },
            { label: '20-yr savings', value: `$${fmtMoney(Math.max(calc.twentyYearSavings, 0))}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4 text-orange-600" />
              Annual operating cost
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Heat load', detail: `${fmt(sqft)} sq ft × ${climate.btuPerSqFt} BTU/sf`, factor: `${fmt(Math.round(sqft * climate.btuPerSqFt))} BTU/sf` },
                { label: 'Current efficiency', detail: `${cur.afue}% AFUE × ${(calc.degradation * 100).toFixed(0)}% age`, factor: `${fmt(Math.round(calc.currentThermsUsed))} therms` },
                { label: 'New efficiency', detail: `${nxt.afue}% AFUE`, factor: `${fmt(Math.round(calc.newThermsUsed))} therms` },
                { label: 'Gas price', detail: `${gasPriceOptions.find(g => g.value === gasPrice)?.sub}`, factor: `× $${price.toFixed(2)}/therm` },
              ]}
              totals={[
                { label: 'Current annual cost', value: `$${fmtMoney(calc.currentAnnualCost)}`, valueClass: 'text-red-700' },
                { label: 'New annual cost', value: `$${fmtMoney(calc.newAnnualCost)}`, valueClass: 'text-emerald-700' },
                { label: 'Annual savings', value: `$${fmtMoney(Math.max(calc.annualSavings, 0))}`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Long-term savings
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: '5-yr', value: calc.fiveYearSavings },
                { label: '10-yr', value: calc.tenYearSavings },
                { label: '20-yr', value: calc.twentyYearSavings },
              ].map(({ label, value }) => (
                <div key={label} className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">{label} savings</div>
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">${fmtMoney(Math.max(value, 0))}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Assumes stable gas prices. Gas has averaged 3%/yr inflation over the last 20 years, so real savings are likely higher.
            </p>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="font-semibold text-amber-900 text-sm mb-1">
                {nxt.afue >= 95 ? 'Condensing furnace (95%+ AFUE)' : nxt.afue >= 90 ? 'High-efficiency (90–94% AFUE)' : 'Standard efficiency (80–89% AFUE)'}
              </div>
              <p className="text-xs text-amber-800">
                {nxt.afue >= 95
                  ? `Requires PVC venting + condensate drain. Best for cold climates with ${climate.value}+ heating days.`
                  : nxt.afue >= 90
                  ? `Uses traditional metal venting. Lower install cost than condensing units.`
                  : `Meets bare minimum standards. Only allowed in southern US for 2026 installs.`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Environmental impact
          </h4>
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-700">
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Annual CO₂ avoided</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2ReductionKg))} kg</div>
              <div className="text-[11px] text-gray-500">({fmt(Math.round(calc.co2ReductionKg * 2.2))} lbs)</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Equivalent trees</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2ReductionKg / 21))}</div>
              <div className="text-[11px] text-gray-500">planted per year</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Cars off road</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{(calc.co2ReductionKg / 4040).toFixed(1)}</div>
              <div className="text-[11px] text-gray-500">for one year</div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Real-world AFUE notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Lab AFUE is a steady-state rating. Real-world efficiency depends on cycling, duct leakage, and house tightness.</li>
            <li>Condensing furnaces (90%+) only deliver their full rating when return-air temp is below 130°F. Hot returns kill condensing efficiency.</li>
            <li>Above 95% AFUE, every 1% gain costs disproportionately more — diminishing returns set in.</li>
            <li>A modulating two-stage furnace at 95% AFUE often outperforms a single-stage 97% in real-world comfort and total bills.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
