'use client';

import { useState, useMemo } from 'react';
import {
  Clock,
  DollarSign,
  Settings,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
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

const ACCENT = 'blue' as const;

// Equipment types kept from the original. Lifespans are no longer invented:
// the only published figure shown is the DOE Energy Saver range for central AC
// (15 to 20 years). The replacement "signal" age is ENERGY STAR's
// "When is it time to replace?" guidance: consider replacing a heat pump or AC
// after more than 10 years, a furnace or boiler after more than 15.
const systemTypes = [
  { value: 'central-ac',      name: 'Central AC',          summary: 'Split central air',        esSignalYears: 10, esGroup: 'a heat pump or air conditioner', doeRange: '15 to 20' },
  { value: 'heat-pump',       name: 'Heat Pump',           summary: 'Heat + cool, year-round',  esSignalYears: 10, esGroup: 'a heat pump or air conditioner', doeRange: null as string | null },
  { value: 'ductless-mini',   name: 'Ductless Mini-Split', summary: 'Single or multi-zone',     esSignalYears: 10, esGroup: 'a heat pump or air conditioner', doeRange: null as string | null },
  { value: 'gas-furnace',     name: 'Gas Furnace',         summary: 'Standard or condensing',   esSignalYears: 15, esGroup: 'a furnace or boiler',            doeRange: null as string | null },
  { value: 'electric-furnace', name: 'Electric Furnace',   summary: 'Resistive heat',           esSignalYears: 15, esGroup: 'a furnace or boiler',            doeRange: null as string | null },
  { value: 'boiler',          name: 'Boiler',              summary: 'Hot water / steam',        esSignalYears: 15, esGroup: 'a furnace or boiler',            doeRange: null as string | null },
];

const DEFAULTS = {
  systemType: 'central-ac',
  systemAge: '12',
  repairQuote: '',
  replacementQuote: '',
};

export default function HVACLifespanCalculator() {
  const [systemType, setSystemType] = useState(DEFAULTS.systemType);
  const [systemAge, setSystemAge] = useState(DEFAULTS.systemAge);
  const [repairQuote, setRepairQuote] = useState(DEFAULTS.repairQuote);
  const [replacementQuote, setReplacementQuote] = useState(DEFAULTS.replacementQuote);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    systemType, systemAge, repairQuote, replacementQuote,
  });

  const system = systemTypes.find((s) => s.value === src.systemType)!;
  const age = Math.max(parseFloat(src.systemAge) || 0, 0);
  const repair = Math.max(parseFloat(src.repairQuote) || 0, 0);
  const replacement = Math.max(parseFloat(src.replacementQuote) || 0, 0);

  const handleReset = () => {
    setSystemType(DEFAULTS.systemType);
    setSystemAge(DEFAULTS.systemAge);
    setRepairQuote(DEFAULTS.repairQuote);
    setReplacementQuote(DEFAULTS.replacementQuote);
    clear();
  };

  const calc = useMemo(() => {
    const es = system.esSignalYears;
    const pastSignal = age > es;                       // ENERGY STAR: "more than X years"
    const haveQuotes = repair > 0 && replacement > 0;
    const repairPct = haveQuotes ? (repair / replacement) * 100 : null;
    // DOE central-AC range (string "15 to 20"): where the age sits relative to it.
    let doeNote: string | null = null;
    if (system.doeRange) {
      const [lo, hi] = system.doeRange.split(' to ').map(Number);
      doeNote = age < lo ? `below the DOE's typical ${system.doeRange}-year range`
        : age > hi ? `past the DOE's typical ${system.doeRange}-year range`
        : `within the DOE's typical ${system.doeRange}-year range`;
    }
    return { es, pastSignal, haveQuotes, repairPct, doeNote };
  }, [system, age, repair, replacement]);

  const fit = age === 0
    ? { tone: 'warn' as const, text: 'Enter the system age' }
    : calc.pastSignal
      ? { tone: 'ok' as const, text: `Past the ${calc.es}-year point where ENERGY STAR says to start considering replacement` }
      : { tone: 'good' as const, text: `Under the ${calc.es}-year ENERGY STAR replacement-consideration age` };

  return (
    <CalcShell
      Icon={Clock}
      title="HVAC Lifespan & Repair-vs-Replace Calculator"
      subtitle="Your system's age against ENERGY STAR and DOE guidance."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — System */}
      <section>
        <SectionHeader step={1} title="Your system" subtitle="Type and age" Icon={Settings} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">System type</label>
            <CardChoice value={systemType} onChange={setSystemType} options={systemTypes} ariaLabel="System type" accent={ACCENT} columns={3} />
          </div>
          <div className="max-w-xs">
            <label className="text-sm font-medium text-gray-700 mb-2 block">System age</label>
            <NumberInput value={systemAge} onChange={setSystemAge} min={0} max={40} suffix="years" ariaLabel="System age" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">
              ENERGY STAR suggests considering replacement for {system.esGroup} more than {system.esSignalYears} years old.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Optional quotes */}
      <section>
        <SectionHeader step={2} title="Repair vs. replacement (optional)" subtitle="Enter both quotes to compare" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Repair quote
              <InfoTip label="repair quote">The total quoted repair, summed if several things are failing at once. Leave blank to see the age signal only.</InfoTip>
            </label>
            <NumberInput value={repairQuote} onChange={setRepairQuote} min={0} max={20000} suffix="$" ariaLabel="Repair quote" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Replacement quote</label>
            <NumberInput value={replacementQuote} onChange={setReplacementQuote} min={0} max={50000} suffix="$" ariaLabel="Replacement quote" accent={ACCENT} />
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
      {hasResult && age > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Age signal"
          value={calc.pastSignal ? 'Consider replacing' : 'Likely has life left'}
          unit=""
          secondaryText={
            <>
              Your {system.name.toLowerCase()} is {fmt(age)} years old. ENERGY STAR suggests considering replacement for {system.esGroup} more than {system.esSignalYears} years old{calc.pastSignal ? ', so yours is past that point' : ', and yours is under that'}.
              {calc.doeNote && <> The DOE puts a central air conditioner&rsquo;s typical life at {system.doeRange} years; yours is {calc.doeNote}.</>}
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'System age', value: `${fmt(age)} yrs` },
            { label: 'ENERGY STAR signal', value: `${calc.es} yrs` },
            ...(system.doeRange ? [{ label: 'DOE central-AC range', value: `${system.doeRange} yrs` }] : []),
          ]}
        />

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blue-600" />
            What the guidance says
          </h4>
          <BreakdownTable
            rows={[
              { label: 'Your system', detail: system.name, factor: `${fmt(age)} yrs old` },
              { label: 'ENERGY STAR signal', detail: `Consider replacing ${system.esGroup} over ${system.esSignalYears} yrs`, factor: calc.pastSignal ? 'Past it' : 'Under it' },
              ...(system.doeRange ? [{ label: 'DOE typical life (central AC)', detail: 'Energy Saver', factor: `${system.doeRange} yrs` }] : []),
            ]}
            totals={[]}
          />
        </div>

        {calc.haveQuotes && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-blue-600" />
              Repair vs. replacement
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Repair quote', detail: 'Your number', factor: `$${fmtMoney(repair)}` },
                { label: 'Replacement quote', detail: 'Your number', factor: `$${fmtMoney(replacement)}` },
              ]}
              totals={[
                { label: 'Repair as a share of replacement', value: `${calc.repairPct!.toFixed(0)}%`, valueClass: 'text-blue-700' },
              ]}
            />
            <p className="text-xs text-gray-700 mt-3 leading-relaxed">
              A common contractor rule of thumb is to replace when a repair costs more than about half of a new system; it&rsquo;s a rule of thumb, not a standard.
            </p>
          </div>
        )}

        <DisclaimerBox title="Beyond age and cost">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>A cracked heat exchanger is a carbon monoxide risk, replace it regardless of the age or cost ratio.</li>
            <li>Systems made before 2010 often use R-22 refrigerant, which is expensive and phased out, so even small leak repairs can be uneconomic.</li>
            <li>State and utility rebates and IRA-funded HEAR/HOMES programs can shift the math; the federal 25C/25D credits ended for 2026 installs under the OBBBA.</li>
            <li>Comfort problems from an oversized system or bad ductwork won&rsquo;t be fixed by a repair; replacement is a chance to correct the design.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
