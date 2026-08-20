'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  DollarSign,
  Clock,
  Leaf,
  TrendingUp,
  Plug,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
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

const ACCENT = 'emerald' as const;

const appliancePresets = [
  { value: '9', name: 'LED bulb', sub: '9W' },
  { value: '700', name: 'Dehumidifier', sub: '700W' },
  { value: '1000', name: 'Microwave', sub: '1000W' },
  { value: '1200', name: 'Window AC', sub: '1200W' },
  { value: '1500', name: 'Space heater', sub: '1500W' },
  { value: '1800', name: 'Hair dryer', sub: '1800W' },
];

const wattPresets = [100, 500, 1000, 1500, 3000, 5000];

const DEFAULTS = {
  powerWatts: '1500',
  hoursPerDay: '8',
  daysPerMonth: '30',
  electricRate: '0.16',
};

export default function KWhCostCalculator() {
  const [powerWatts, setPowerWatts] = useState(DEFAULTS.powerWatts);
  const [hoursPerDay, setHoursPerDay] = useState(DEFAULTS.hoursPerDay);
  const [daysPerMonth, setDaysPerMonth] = useState(DEFAULTS.daysPerMonth);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    powerWatts, hoursPerDay, daysPerMonth, electricRate,
  });

  const w = Math.max(parseFloat(src.powerWatts) || 0, 0);
  const h = Math.max(parseFloat(src.hoursPerDay) || 0, 0);
  const d = Math.max(parseFloat(src.daysPerMonth) || 0, 0);
  const r = Math.max(parseFloat(src.electricRate) || 0, 0);

  const handleReset = () => {
    setPowerWatts(DEFAULTS.powerWatts);
    setHoursPerDay(DEFAULTS.hoursPerDay);
    setDaysPerMonth(DEFAULTS.daysPerMonth);
    setElectricRate(DEFAULTS.electricRate);
    clear();
  };

  const calc = useMemo(() => {
    const hourlyKwh = w / 1000;
    const dailyKwh = hourlyKwh * h;
    const monthlyKwh = dailyKwh * d;
    const yearlyKwh = monthlyKwh * 12;
    const hourlyCost = hourlyKwh * r;
    const dailyCost = dailyKwh * r;
    const monthlyCost = monthlyKwh * r;
    const yearlyCost = yearlyKwh * r;
    const co2LbsPerYear = yearlyKwh * 0.92;
    const treesNeeded = Math.round(co2LbsPerYear / 48);
    return { hourlyKwh, dailyKwh, monthlyKwh, yearlyKwh, hourlyCost, dailyCost, monthlyCost, yearlyCost, co2LbsPerYear, treesNeeded };
  }, [w, h, d, r]);

  const fit =
    w === 0 || h === 0 ? { tone: 'warn' as const, text: 'Enter wattage + hours' } :
    calc.yearlyCost < 50 ? { tone: 'good' as const, text: 'Trivial annual cost' } :
    calc.yearlyCost < 200 ? { tone: 'good' as const, text: 'Modest annual cost' } :
    calc.yearlyCost < 1000 ? { tone: 'ok' as const, text: 'Significant — worth optimizing' } :
                             { tone: 'warn' as const, text: 'Major energy load — high-priority for upgrade' };

  return (
    <CalcShell
      Icon={Zap}
      title="kWh Cost Calculator"
      subtitle="Exact electricity cost for any appliance."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Appliance */}
      <section>
        <SectionHeader step={1} title="Appliance power" subtitle="Pick a preset or enter exact wattage" Icon={Plug} accent={ACCENT} />

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Common appliances
            <InfoTip label="appliance wattage">Look at the appliance's nameplate or manual. Heaters and AC are the biggest electricity consumers; LEDs and chargers are trivial.</InfoTip>
          </label>
          <div className="mb-3">
            <CardChoice
              value={powerWatts}
              onChange={setPowerWatts}
              options={appliancePresets}
              ariaLabel="Appliance preset"
              columns={3}
              accent={ACCENT}
            />
          </div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Or enter exact wattage</label>
          <div className="mb-2">
            <PresetChips value={powerWatts} onChange={setPowerWatts} presets={wattPresets} accent={ACCENT} />
          </div>
          <NumberInput value={powerWatts} onChange={setPowerWatts} min={1} max={10000} suffix="W" ariaLabel="Custom wattage" accent={ACCENT} />
        </div>
      </section>

      {/* Section 2 — Usage */}
      <section>
        <SectionHeader step={2} title="Usage pattern" subtitle="How often it runs" Icon={Clock} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Hours per day
              <span className="ml-auto text-sm font-semibold text-emerald-700">{h.toFixed(1)} hr</span>
            </label>
            <input
              type="range"
              min={0.1}
              max={24}
              step={0.1}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full accent-emerald-600"
              aria-label="Hours per day"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1">
              <span>0</span><span>8</span><span>16</span><span>24 (always on)</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Days per month</label>
            <NumberInput value={daysPerMonth} onChange={setDaysPerMonth} min={1} max={31} suffix="days" ariaLabel="Days per month" accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Section 3 — Electric rate */}
      <section>
        <SectionHeader step={3} title="Your electric rate" subtitle="Check a recent bill" Icon={DollarSign} accent={ACCENT} />

        <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
        <p className="text-xs text-gray-500 mt-1.5">US 2026 average: $0.16/kWh · CA averages $0.30+ · South averages $0.10–$0.13</p>
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
          eyebrow="Annual operating cost"
          value={`$${fmtMoney(calc.yearlyCost)}`}
          unit={`/yr (${fmt(Math.round(calc.yearlyKwh))} kWh)`}
          secondaryText={
            <>
              At {fmt(w)}W running {h.toFixed(1)} hr/day × {d.toFixed(0)} days/month
              at ${r.toFixed(2)}/kWh, this appliance costs <strong>${calc.monthlyCost.toFixed(2)}/month</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Per hour', value: `$${calc.hourlyCost.toFixed(3)}` },
            { label: 'Per day', value: `$${calc.dailyCost.toFixed(2)}` },
            { label: 'Per month', value: `$${calc.monthlyCost.toFixed(2)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              Usage scenarios at this wattage
            </h4>
            <div className="space-y-1.5">
              {[
                { label: 'Light use', hrs: 4, color: 'bg-emerald-50 ring-emerald-200 text-emerald-900' },
                { label: 'Medium use', hrs: 8, color: 'bg-amber-50 ring-amber-200 text-amber-900' },
                { label: 'Heavy use', hrs: 16, color: 'bg-orange-50 ring-orange-200 text-orange-900' },
                { label: 'Always on', hrs: 24, color: 'bg-red-50 ring-red-200 text-red-900' },
              ].map((scenario) => {
                const yearly = ((w / 1000) * scenario.hrs * 365 * r);
                return (
                  <div key={scenario.label} className={`flex items-center justify-between p-2.5 rounded-lg ring-1 text-xs ${scenario.color}`}>
                    <div>
                      <div className="font-semibold">{scenario.label}</div>
                      <div className="text-[11px] opacity-80">{scenario.hrs} hrs/day</div>
                    </div>
                    <div className="font-bold tabular-nums text-base">${fmtMoney(yearly)}/yr</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Energy & cost breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Per hour', detail: `${fmt(w)}W = ${calc.hourlyKwh.toFixed(3)} kWh`, factor: `$${calc.hourlyCost.toFixed(3)}` },
                { label: 'Per day', detail: `${h.toFixed(1)} hrs × ${calc.hourlyKwh.toFixed(3)} kWh`, factor: `${calc.dailyKwh.toFixed(2)} kWh` },
                { label: 'Per month', detail: `${d.toFixed(0)} days × ${calc.dailyKwh.toFixed(2)} kWh`, factor: `${calc.monthlyKwh.toFixed(1)} kWh` },
                { label: 'Per year', detail: `12 × monthly`, factor: `${fmt(Math.round(calc.yearlyKwh))} kWh` },
                { label: 'Rate', detail: 'Your utility', factor: `× $${r.toFixed(2)}/kWh` },
              ]}
              totals={[
                { label: 'Annual cost', value: `$${fmtMoney(calc.yearlyCost)}`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Environmental impact (US grid average)
            </h4>
            <div className="grid sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Annual CO₂</div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2LbsPerYear))} lbs</div>
                <div className="text-[11px] text-gray-500">{(calc.co2LbsPerYear / 2000).toFixed(2)} tons</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Trees to offset</div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums">{fmt(calc.treesNeeded)}</div>
                <div className="text-[11px] text-gray-500">seedlings/yr</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-100">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">ENERGY STAR could save</div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums">${fmtMoney(calc.yearlyCost * 0.175)}</div>
                <div className="text-[11px] text-gray-500">~17.5% lower draw</div>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 leading-snug">
              Based on US average grid emission factor (0.92 lbs CO₂/kWh). Renewable-heavy grids (CA, WA, OR) are lower; coal-heavy grids (WV, KY, MO) are higher.
            </p>
          </div>
        </div>

        <DisclaimerBox title="What this calculator misses">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Time-of-use rates (some utilities charge 2–4× more during 2–7 PM)</li>
            <li>Tiered rates — your kWh price may jump after a monthly threshold</li>
            <li>Demand charges (rare in residential, common in commercial)</li>
            <li>Delivery / connection / regulatory fees layered on top of the energy charge</li>
            <li>Nameplate watts vary with cycling — a 1500W heater rarely runs at 1500W continuously</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
