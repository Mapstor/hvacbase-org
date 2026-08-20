'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Leaf,
  Zap,
} from 'lucide-react';
import EmbedCode from '../EmbedCode';
import SocialShare from '../SocialShare';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  Segmented,
  NumberInput,
  InfoTip,
  ResultHero,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'emerald' as const;

const acSizes = [
  { value: '1.5', name: '1.5 ton', sub: '18k BTU' },
  { value: '2', name: '2 ton', sub: '24k BTU' },
  { value: '2.5', name: '2.5 ton', sub: '30k BTU' },
  { value: '3', name: '3 ton', sub: '36k BTU' },
  { value: '3.5', name: '3.5 ton', sub: '42k BTU' },
  { value: '4', name: '4 ton', sub: '48k BTU' },
  { value: '5', name: '5 ton', sub: '60k BTU' },
];

const coolingHourPresets = [
  { value: '600', name: '600 hr', sub: 'Very cool (N. Maine, Seattle)' },
  { value: '1200', name: '1200 hr', sub: 'Moderate (Chicago, DC)' },
  { value: '1500', name: '1500 hr', sub: 'Warm (Atlanta, Dallas)' },
  { value: '2100', name: '2100 hr', sub: 'Hot (Phoenix, Houston)' },
  { value: '2800', name: '2800 hr', sub: 'Very hot (Miami, Tucson)' },
];

const DEFAULTS = {
  currentSeer: '10',
  newSeer: '16',
  acSize: '3',
  electricRate: '0.16',
  coolingHours: '1500',
  systemAge: '15',
};

export default function SEER2Calculator() {
  const [currentSeer, setCurrentSeer] = useState(DEFAULTS.currentSeer);
  const [newSeer, setNewSeer] = useState(DEFAULTS.newSeer);
  const [acSize, setAcSize] = useState(DEFAULTS.acSize);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [coolingHours, setCoolingHours] = useState(DEFAULTS.coolingHours);
  const [systemAge, setSystemAge] = useState(DEFAULTS.systemAge);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    currentSeer, newSeer, acSize, electricRate, coolingHours, systemAge,
  });

  const tons = parseFloat(src.acSize) || 0;
  const cur = parseFloat(src.currentSeer) || 0;
  const next = parseFloat(src.newSeer) || 0;
  const rate = parseFloat(src.electricRate) || 0;
  const hours = parseFloat(src.coolingHours) || 0;
  const age = parseFloat(src.systemAge) || 0;

  const handleReset = () => {
    setCurrentSeer(DEFAULTS.currentSeer);
    setNewSeer(DEFAULTS.newSeer);
    setAcSize(DEFAULTS.acSize);
    setElectricRate(DEFAULTS.electricRate);
    setCoolingHours(DEFAULTS.coolingHours);
    setSystemAge(DEFAULTS.systemAge);
    clear();
  };

  const calc = useMemo(() => {
    const btuPerHour = tons * 12000;
    const seer2Adj = 0.955;
    const currentKwh = cur > 0 ? (btuPerHour / cur) * hours / 1000 : 0;
    const newKwh = next > 0 ? (btuPerHour / (next * seer2Adj)) * hours / 1000 : 0;
    const kwhSaved = currentKwh - newKwh;
    const currentCost = currentKwh * rate;
    const newCost = newKwh * rate;
    const annualSavings = currentCost - newCost;
    const monthlySavings = annualSavings / 5;
    const tenYearSavings = annualSavings * 10;
    const lifetimeSavings = annualSavings * 15;
    const systemCost = tons * 1800;
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 0;
    const co2Reduction = kwhSaved * 0.92;
    const percentSavings = currentKwh > 0 ? (kwhSaved / currentKwh) * 100 : 0;
    const treesEquivalent = Math.round(co2Reduction / 48);
    const carsOffRoad = co2Reduction / 9600;
    return {
      btuPerHour,
      currentKwh,
      newKwh,
      kwhSaved,
      currentCost,
      newCost,
      annualSavings,
      monthlySavings,
      tenYearSavings,
      lifetimeSavings,
      systemCost,
      paybackYears,
      co2Reduction,
      percentSavings,
      treesEquivalent,
      carsOffRoad,
    };
  }, [tons, cur, next, rate, hours]);

  const fit =
    calc.annualSavings <= 0 ? { tone: 'warn' as const, text: 'New SEER must be higher than current' } :
    calc.percentSavings >= 40 ? { tone: 'good' as const, text: 'Huge savings — strong payback' } :
    calc.percentSavings >= 25 ? { tone: 'good' as const, text: 'Strong upgrade' } :
    calc.percentSavings >= 10 ? { tone: 'ok' as const, text: 'Meaningful savings' } :
                                { tone: 'warn' as const, text: 'Modest improvement' };

  return (
    <CalcShell
      Icon={Calculator}
      title="SEER2 Energy Savings Calculator"
      subtitle="Annual $ and kWh saved from upgrading your AC — plus payback and CO₂ math."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Current vs new */}
      <section>
        <SectionHeader step={1} title="Current vs new system" subtitle="What you have, what you're upgrading to" Icon={TrendingUp} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current SEER rating
              <InfoTip label="current SEER">
                Look at your existing condenser's nameplate. Systems 10+ years old are typically 8–13 SEER.
              </InfoTip>
            </label>
            <NumberInput value={currentSeer} onChange={setCurrentSeer} min={6} max={25} suffix="SEER" ariaLabel="Current SEER" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">Typical 10+ year old: 8–13 SEER</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              New SEER2 rating
              <InfoTip label="SEER2">
                SEER2 is the post-2023 testing standard — about 4.5% stricter than old SEER. Current federal minimums: 14.3 (South), 13.8 (North).
              </InfoTip>
            </label>
            <NumberInput value={newSeer} onChange={setNewSeer} min={13} max={30} suffix="SEER2" ariaLabel="New SEER2" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">High-efficiency target: 17–20 SEER2</p>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700 mb-2 block">System size</label>
          <Segmented value={acSize} onChange={setAcSize} options={acSizes} ariaLabel="AC system size" accent={ACCENT} />
        </div>
      </section>

      {/* Section 2 — Local context */}
      <section>
        <SectionHeader step={2} title="Your usage & rates" subtitle="Local electricity cost and how much you run AC" Icon={Zap} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Electric rate
                <InfoTip label="electric rate">Check the kWh rate on a recent power bill. US average is $0.16/kWh in 2026 — California averages $0.30+, the South averages $0.10–$0.13.</InfoTip>
              </label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">US 2026 average: $0.16/kWh</p>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                System age
                <InfoTip label="system age">Average AC lifespan is 15–20 years. Systems past 12 years typically need replacement soon — and lose efficiency every year.</InfoTip>
              </label>
              <NumberInput value={systemAge} onChange={setSystemAge} min={1} max={30} suffix="years" ariaLabel="System age" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">Average lifespan: 15–20 years</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Annual cooling hours</label>
            <CardChoice value={coolingHours} onChange={setCoolingHours} options={coolingHourPresets} ariaLabel="Annual cooling hours" accent={ACCENT} columns={5} />
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
          unit={`/yr (${calc.percentSavings > 0 ? calc.percentSavings.toFixed(0) : 0}% cooling cost reduction)`}
          secondaryText={
            <>
              Replacing your {cur} SEER with {next} SEER2 saves <strong>{fmt(Math.max(Math.round(calc.kwhSaved), 0))} kWh/yr</strong>.
              Over 15 years that's <strong>${fmtMoney(Math.max(calc.lifetimeSavings, 0))}</strong> in lifetime savings.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Monthly savings', value: `$${fmtMoney(Math.max(calc.monthlySavings, 0))}`, valueClass: 'text-emerald-700' },
            { label: '10-year savings', value: `$${fmtMoney(Math.max(calc.tenYearSavings, 0))}` },
            { label: 'Payback period', value: calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} yr` : '—' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Operating cost comparison
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Current — {cur} SEER</div>
                  <div className="text-[11px] text-gray-500">{fmt(Math.round(calc.currentKwh))} kWh/yr • {age} years old</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 tabular-nums">${fmtMoney(calc.currentCost)}/yr</div>
                  <div className="text-[11px] text-gray-500">${fmtMoney(calc.currentCost / 12)}/mo</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                <div>
                  <div className="font-semibold text-emerald-900 text-sm">New — {next} SEER2</div>
                  <div className="text-[11px] text-emerald-700">{fmt(Math.round(calc.newKwh))} kWh/yr • high efficiency</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tabular-nums">${fmtMoney(calc.newCost)}/yr</div>
                  <div className="text-[11px] text-emerald-600">−${fmtMoney(calc.annualSavings)}/yr</div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Based on {tons}-ton system × {hours} hours/yr at ${rate}/kWh. SEER2 ratings use 2023+ M1 testing, ~4.5% stricter than old SEER.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-600" />
              Environmental impact
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex justify-between"><span>Annual CO₂ reduction</span><strong>{fmt(Math.round(Math.max(calc.co2Reduction, 0)))} lbs</strong></li>
              <li className="flex justify-between"><span>Equivalent to planting</span><strong>{Math.max(calc.treesEquivalent, 0)} trees/yr</strong></li>
              <li className="flex justify-between"><span>Like taking off road</span><strong>{Math.max(calc.carsOffRoad, 0).toFixed(1)} cars</strong></li>
              <li className="flex justify-between pt-2 border-t border-gray-200"><span>15-year CO₂ prevented</span><strong>{fmt(Math.round(Math.max(calc.co2Reduction * 15 / 2000, 0)))} tons</strong></li>
            </ul>
            <div className="mt-3 bg-emerald-50 rounded-lg p-2.5 text-[11px] text-emerald-800">
              Estimated system cost: <strong>${fmtMoney(calc.systemCost)}</strong>. Payback: <strong>{calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} years` : '—'}</strong>.
            </div>
          </div>
        </div>

        {age >= 12 && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Your {age}-year-old system is near end of life</p>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                  Average AC lifespan is 15–20 years. Past 12 years, repair frequency rises sharply and the unit
                  has lost 10–25% of its original efficiency. Upgrading now locks in ${fmtMoney(calc.annualSavings)}/yr in lower bills
                  and avoids the cost of a sudden mid-summer failure.
                </p>
              </div>
            </div>
          </div>
        )}

        {next >= 18 && (
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {next} SEER2 qualifies for ENERGY STAR Most Efficient — the tier that best qualifies for state and utility rebate stacking where available.
          </div>
        )}

        <DisclaimerBox title="Calculation notes & caveats">
          <p>
            Based on {tons}-ton system × {hours} cooling hours × ${rate}/kWh. SEER2 ratings reflect 2023+ M1 testing
            (~4.5% stricter than old SEER). Actual savings depend on home insulation, ductwork tightness, thermostat
            habits, and maintenance. Federal §25C and §25D tax credits terminated for property placed in service
            after Dec 31, 2025 (OBBBA, PL 119-21) — check state and utility rebates or IRA-funded HOMES/HEAR programs
            for current incentives, verifying each program's specific equipment list.
          </p>
        </DisclaimerBox>
      </section>
      )}
      </form>

      <SocialShare
        title="SEER2 Energy Savings Calculator"
        description="Calculate exact energy savings when upgrading your AC system with payback and CO₂ math."
      />

      <EmbedCode calculatorType="seer2-savings-calculator" title="SEER2 Energy Savings Calculator" />
    </CalcShell>
  );
}
