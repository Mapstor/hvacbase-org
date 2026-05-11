'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Wrench,
  DollarSign,
  Settings,
} from 'lucide-react';
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
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  accentMap,
} from './_shared';

const ACCENT = 'blue' as const;
const a = accentMap[ACCENT];

const systemTypes = [
  { value: 'central-ac', name: 'Central AC', summary: 'Split central air system', avgLifespan: 15, minLifespan: 10, maxLifespan: 20, replacementMin: 3500, replacementMax: 8000 },
  { value: 'heat-pump', name: 'Heat Pump', summary: 'Heat + cool, year-round runtime', avgLifespan: 15, minLifespan: 10, maxLifespan: 20, replacementMin: 4000, replacementMax: 10000 },
  { value: 'gas-furnace', name: 'Gas Furnace', summary: 'Standard or condensing gas heat', avgLifespan: 18, minLifespan: 15, maxLifespan: 25, replacementMin: 3000, replacementMax: 7500 },
  { value: 'electric-furnace', name: 'Electric Furnace', summary: 'Resistive heating element', avgLifespan: 20, minLifespan: 15, maxLifespan: 30, replacementMin: 2000, replacementMax: 5500 },
  { value: 'boiler', name: 'Boiler', summary: 'Hot water / steam radiant', avgLifespan: 20, minLifespan: 15, maxLifespan: 30, replacementMin: 4000, replacementMax: 10000 },
  { value: 'ductless-mini', name: 'Ductless Mini-Split', summary: 'Single or multi-zone inverter', avgLifespan: 20, minLifespan: 15, maxLifespan: 25, replacementMin: 3000, replacementMax: 8000 },
];

const maintenanceOptions = [
  { value: 'regular', name: 'Regular', sub: 'Annual pro service', lifespanDelta: 3 },
  { value: 'occasional', name: 'Occasional', sub: 'Every 2–3 yrs', lifespanDelta: 0 },
  { value: 'minimal', name: 'Minimal', sub: 'Filters only', lifespanDelta: -3 },
  { value: 'none', name: 'None', sub: 'Never serviced', lifespanDelta: -5 },
];

const efficiencyOptions = [
  { value: 'high', name: 'Working well', sub: 'No noticeable issues', costPenalty: 0 },
  { value: 'normal', name: 'Normal', sub: 'Bills as expected', costPenalty: 0 },
  { value: 'low', name: 'Higher bills', sub: 'Noticeably less efficient', costPenalty: 300 },
  { value: 'very-low', name: 'Much higher bills', sub: 'Clearly degraded', costPenalty: 600 },
];

const repairPresets = [500, 1000, 1500, 2500, 4000];

export default function HVACLifespanCalculator() {
  const [systemType, setSystemType] = useState('central-ac');
  const [systemAge, setSystemAge] = useState('12');
  const [repairCost, setRepairCost] = useState('1500');
  const [maintenanceFreq, setMaintenanceFreq] = useState('regular');
  const [efficiency, setEfficiency] = useState('normal');

  const system = systemTypes.find((s) => s.value === systemType)!;
  const maint = maintenanceOptions.find((m) => m.value === maintenanceFreq)!;
  const eff = efficiencyOptions.find((e) => e.value === efficiency)!;

  const age = Math.max(parseFloat(systemAge) || 0, 0);
  const repair = Math.max(parseFloat(repairCost) || 0, 0);

  const calc = useMemo(() => {
    const adjustedLifespan = Math.max(system.avgLifespan + maint.lifespanDelta, 1);
    const remainingYears = Math.max(adjustedLifespan - age, 0);
    const percentLifeUsed = (age / adjustedLifespan) * 100;
    const avgReplacementCost = (system.replacementMin + system.replacementMax) / 2;
    const repairThreshold = avgReplacementCost * 0.5;
    const annualCostOfWaiting = eff.costPenalty + (age > 10 ? 200 : 0);
    const repairPctOfReplace = avgReplacementCost > 0 ? (repair / avgReplacementCost) * 100 : 0;
    const replaceRecommended = repair > repairThreshold || age > system.avgLifespan * 0.75;
    const repairProbability = age > adjustedLifespan * 0.8 ? 'high' :
                              age > adjustedLifespan * 0.6 ? 'moderate' : 'low';
    return { adjustedLifespan, remainingYears, percentLifeUsed, avgReplacementCost, repairThreshold, annualCostOfWaiting, repairPctOfReplace, replaceRecommended, repairProbability };
  }, [system, maint, eff, age, repair]);

  const fit =
    age === 0 ? { tone: 'warn' as const, text: 'Enter system age' } :
    calc.replaceRecommended ? { tone: 'bad' as const, text: 'Replace recommended — repair past economic threshold' } :
                              { tone: 'good' as const, text: 'Repair recommended — repair within economic threshold' };

  const riskColor =
    calc.repairProbability === 'high' ? 'bg-red-500' :
    calc.repairProbability === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500';
  const riskTextColor =
    calc.repairProbability === 'high' ? 'text-red-700' :
    calc.repairProbability === 'moderate' ? 'text-amber-700' : 'text-emerald-700';

  return (
    <CalcShell
      Icon={Clock}
      title="HVAC Lifespan & Repair-vs-Replace Calculator"
      subtitle="Use the 50% rule + age + efficiency penalty to decide. Updates live."
      accent={ACCENT}
    >
      {/* Section 1 — System */}
      <section>
        <SectionHeader step={1} title="Your system" subtitle="What you have and how old it is" Icon={Settings} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">System type</label>
            <CardChoice value={systemType} onChange={setSystemType} options={systemTypes} ariaLabel="System type" accent={ACCENT} columns={3} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">System age</label>
              <NumberInput value={systemAge} onChange={setSystemAge} min={0} max={40} suffix="years" ariaLabel="System age" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">Expected lifespan for {system.name}: {system.minLifespan}–{system.maxLifespan} years</p>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Quoted repair cost
                <InfoTip label="repair cost">If multiple things are failing at once, sum them. The 50% rule applies to the total quote — not individual line items.</InfoTip>
              </label>
              <div className="mb-2">
                <Segmented value={repairCost} onChange={setRepairCost} options={repairPresets.map(p => ({ value: String(p), name: `$${fmt(p)}` }))} ariaLabel="Repair cost preset" accent={ACCENT} />
              </div>
              <NumberInput value={repairCost} onChange={setRepairCost} min={0} max={15000} suffix="$" ariaLabel="Custom repair cost" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Maintenance & efficiency */}
      <section>
        <SectionHeader step={2} title="Maintenance & current performance" subtitle="Determines remaining lifespan + waiting cost" Icon={Wrench} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Maintenance history
              <InfoTip label="maintenance">Regular pro service adds 3 years to typical lifespan; never-serviced systems lose 5.</InfoTip>
            </label>
            <CardChoice value={maintenanceFreq} onChange={setMaintenanceFreq} options={maintenanceOptions} ariaLabel="Maintenance frequency" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current performance
              <InfoTip label="performance">Compare this winter/summer's bills to 2–3 years ago. Big jump without rate increases = degraded efficiency.</InfoTip>
            </label>
            <CardChoice value={efficiency} onChange={setEfficiency} options={efficiencyOptions} ariaLabel="Current efficiency" accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommendation"
          value={calc.replaceRecommended ? 'Replace' : 'Repair'}
          unit=""
          secondaryText={
            calc.replaceRecommended ? (
              <>
                Your {system.name.toLowerCase()} is {fmt(age)} years old ({calc.percentLifeUsed.toFixed(0)}% of expected lifespan).
                Repair cost (${fmtMoney(repair)}) is {calc.repairPctOfReplace.toFixed(0)}% of average replacement.
                <strong> Replace</strong> — repair is past the economic threshold.
              </>
            ) : (
              <>
                Your repair cost (${fmtMoney(repair)}) is {calc.repairPctOfReplace.toFixed(0)}% of average replacement.
                System still has <strong>{calc.remainingYears.toFixed(0)} years</strong> of expected life remaining.
                Repair is the economical choice.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Adjusted lifespan', value: `${calc.adjustedLifespan} yrs` },
            { label: 'Years remaining', value: `${calc.remainingYears.toFixed(1)}` },
            { label: '50% rule threshold', value: `$${fmtMoney(calc.repairThreshold)}` },
          ]}
        />

        {/* Future failure risk gauge */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
              Future failure risk
            </h4>
            <span className={`font-bold text-sm capitalize ${riskTextColor}`}>{calc.repairProbability} risk</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div className={`h-full transition-all ${riskColor}`} style={{ width: `${Math.min(calc.percentLifeUsed, 100)}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>New</span>
            <span>{calc.percentLifeUsed.toFixed(0)}% of expected life used</span>
            <span>End of life</span>
          </div>
          <p className="text-xs text-gray-700 mt-3 leading-relaxed">
            {calc.repairProbability === 'high' && 'System is at end of life. Expect frequent repairs, lost capacity on extreme days, and declining efficiency.'}
            {calc.repairProbability === 'moderate' && 'Middle-aged system. Budget for replacement within 3–5 years; major repairs not worth more than 30% of replacement cost.'}
            {calc.repairProbability === 'low' && 'Relatively young system. Regular maintenance pays off — repairs are usually worth doing.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              Lifespan analysis
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Typical range', detail: `${system.name} avg`, factor: `${system.minLifespan}–${system.maxLifespan} yrs` },
                { label: 'Industry average', detail: '', factor: `${system.avgLifespan} yrs` },
                { label: 'Maintenance', detail: maint.name, factor: `${maint.lifespanDelta >= 0 ? '+' : ''}${maint.lifespanDelta} yrs` },
                { label: 'Your adjusted lifespan', detail: '', factor: `${calc.adjustedLifespan} yrs` },
                { label: 'Current age', detail: '', factor: `${fmt(age)} yrs` },
                { label: 'Life used', detail: '', factor: `${calc.percentLifeUsed.toFixed(0)}%` },
              ]}
              totals={[
                { label: 'Years remaining', value: `${calc.remainingYears.toFixed(1)} yrs`, valueClass: calc.remainingYears < 3 ? 'text-red-700' : calc.remainingYears < 5 ? 'text-amber-700' : 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-blue-600" />
              Cost analysis (50% rule)
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Quoted repair', detail: 'Your number', factor: `$${fmtMoney(repair)}` },
                { label: 'Replacement range', detail: `${system.name}`, factor: `$${fmtMoney(system.replacementMin)}–$${fmtMoney(system.replacementMax)}` },
                { label: 'Avg replacement', detail: 'Midpoint', factor: `$${fmtMoney(calc.avgReplacementCost)}` },
                { label: '50% rule threshold', detail: '50% of avg replacement', factor: `$${fmtMoney(calc.repairThreshold)}` },
                { label: 'Repair / replacement', detail: '', factor: `${calc.repairPctOfReplace.toFixed(0)}%` },
                { label: 'Annual cost of waiting', detail: 'Efficiency penalty + risk', factor: `$${fmtMoney(calc.annualCostOfWaiting)}/yr` },
              ]}
              totals={[]}
            />
            <div className={`mt-3 p-3 rounded-lg text-xs ${calc.replaceRecommended ? 'bg-red-50 border border-red-200 text-red-900' : 'bg-emerald-50 border border-emerald-200 text-emerald-900'}`}>
              {calc.replaceRecommended ? (
                <>
                  <strong>50% rule says replace.</strong> Repair would cost {calc.repairPctOfReplace.toFixed(0)}% of replacement.
                  {age > system.avgLifespan * 0.75 && ` Plus you're past 75% of expected lifespan.`}
                  {age > 15 && ' Systems over 15 years old often use phased-out refrigerants (R-22) that are expensive to top off.'}
                </>
              ) : (
                <>
                  <strong>50% rule says repair.</strong> Repair is well under the threshold; system has good life remaining.
                  {calc.annualCostOfWaiting > 200 && ` Your efficiency-loss penalty (${fmtMoney(calc.annualCostOfWaiting)}/yr) is real but not enough to justify a full replacement yet.`}
                </>
              )}
            </div>
          </div>
        </div>

        <DisclaimerBox title="Edge cases the 50% rule misses">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Refrigerant-related repairs on R-22 systems (made before 2010) — refrigerant alone can run $80+/lb, often making "small" leak fixes uneconomic</li>
            <li>Aging heat exchangers (cracked = carbon monoxide risk) — replace immediately regardless of cost ratio</li>
            <li>Compressor or coil replacement above 50% but the rest of the system is healthy — sometimes worth doing if you'll stay 2–3+ more years</li>
            <li>Tax credits and rebates available NOW that won't be there next year if you delay replacement</li>
            <li>Comfort issues that won't be fixed by a repair (oversized system, bad ductwork) — replacement is a chance to fix the underlying design</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
