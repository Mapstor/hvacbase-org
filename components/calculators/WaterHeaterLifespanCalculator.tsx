'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  AlertTriangle,
  Clock,
  Zap,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
  CardChoice,
  NumberInput,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
  accentMap,
} from './_shared';

const ACCENT = 'red' as const;
const a = accentMap[ACCENT];

// Expected lifespans are the DOE Energy Saver water heater comparison ranges
// (energy.gov/node/1026276): storage tank 10-15 years, demand/tankless about 20,
// heat pump water heater 10-15, solar about 20. ENERGY STAR gives tankless a
// "life expectancy of 20 years" and advises replacing a water heater that is
// "over 10 years old." No unsourced hardness/maintenance lifespan modifiers, no
// operating-cost or degradation model, no replacement price ranges (the result
// links the cost guides instead).
const waterHeaters = [
  { value: 'gas-tank',          name: 'Gas tank',          summary: 'Storage tank, gas burner',       doeMin: 10, doeMax: 15, doeLabel: '10 to 15 years', isTank: true },
  { value: 'electric-tank',     name: 'Electric tank',     summary: 'Storage tank, electric element', doeMin: 10, doeMax: 15, doeLabel: '10 to 15 years', isTank: true },
  { value: 'gas-tankless',      name: 'Gas tankless',      summary: 'On-demand gas heater',           doeMin: 20, doeMax: 20, doeLabel: 'about 20 years', isTank: false },
  { value: 'electric-tankless', name: 'Electric tankless', summary: 'On-demand electric heater',       doeMin: 20, doeMax: 20, doeLabel: 'about 20 years', isTank: false },
  { value: 'heat-pump',         name: 'Heat pump (HPWH)',  summary: 'Hybrid tank, high efficiency',    doeMin: 10, doeMax: 15, doeLabel: '10 to 15 years', isTank: true },
  { value: 'solar',             name: 'Solar + backup',    summary: 'Roof collectors + tank',          doeMin: 20, doeMax: 20, doeLabel: 'about 20 years', isTank: false },
];

const warningSignsList = [
  { id: 'rust', label: 'Rusty hot water', score: 3 },
  { id: 'leaking', label: 'Tank leaking', score: 5, critical: true },
  { id: 'noisy', label: 'Rumbling / noises', score: 2 },
  { id: 'temperature', label: 'Inconsistent temp', score: 3 },
  { id: 'age', label: 'Over 10 yrs old', score: 2 },
  { id: 'sediment', label: 'Sediment in water', score: 2 },
  { id: 'pilot', label: 'Pilot light issues', score: 2 },
  { id: 'pressure', label: 'Low water pressure', score: 3 },
  { id: 'smell', label: 'Rotten egg smell', score: 4, critical: true },
];

const DEFAULTS = {
  heaterType: 'gas-tank',
  heaterAge: '8',
};

export default function WaterHeaterLifespanCalculator() {
  const [heaterType, setHeaterType] = useState(DEFAULTS.heaterType);
  const [heaterAge, setHeaterAge] = useState(DEFAULTS.heaterAge);
  const [warningSigns, setWarningSigns] = useState<Set<string>>(new Set());

  // Serialize the Set for the submit hook (which tracks string inputs).
  const warningSignsSerialized = Array.from(warningSigns).sort().join(',');

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    heaterType, heaterAge, warningSignsSerialized,
  });

  const heater = waterHeaters.find((h) => h.value === src.heaterType)!;
  const age = Math.max(parseFloat(src.heaterAge) || 0, 0);
  const srcWarningSigns = new Set<string>(src.warningSignsSerialized ? src.warningSignsSerialized.split(',') : []);

  const toggleSign = (id: string) => {
    setWarningSigns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleReset = () => {
    setHeaterType(DEFAULTS.heaterType);
    setHeaterAge(DEFAULTS.heaterAge);
    setWarningSigns(new Set());
    clear();
  };

  const calc = useMemo(() => {
    const totalScore = Array.from(srcWarningSigns).reduce((sum, id) => {
      const sign = warningSignsList.find((s) => s.id === id);
      return sum + (sign?.score || 0);
    }, 0);
    const hasCritical = Array.from(srcWarningSigns).some((id) => warningSignsList.find((s) => s.id === id)?.critical);
    const beforeRange = age < heater.doeMin;
    const withinRange = age >= heater.doeMin && age <= heater.doeMax;
    const pastRange = age > heater.doeMax;
    // ENERGY STAR advises replacing a tank water heater that is over 10 years old.
    const over10Tank = heater.isTank && age >= 10;
    const remainingYears = Math.max(heater.doeMax - age, 0);
    const shouldReplace = hasCritical || pastRange || totalScore >= 8 || (over10Tank && totalScore >= 4);
    const severity = totalScore >= 10 ? 'critical' : totalScore >= 6 ? 'high' : totalScore > 0 ? 'moderate' : 'none';
    const rangeWord = pastRange ? 'past' : withinRange ? 'within' : 'below';
    return { totalScore, hasCritical, beforeRange, withinRange, pastRange, over10Tank, remainingYears, shouldReplace, severity, rangeWord };
  }, [heater, age, src.warningSignsSerialized]);

  const fit =
    age === 0 ? { tone: 'warn' as const, text: 'Enter heater age' } :
    calc.hasCritical ? { tone: 'bad' as const, text: 'Critical issue, replace immediately' } :
    calc.shouldReplace ? { tone: 'warn' as const, text: 'Replace recommended' } :
                         { tone: 'good' as const, text: 'Within expected life' };

  const severityColor =
    calc.severity === 'critical' ? 'bg-red-500' :
    calc.severity === 'high' ? 'bg-amber-500' :
    calc.severity === 'moderate' ? 'bg-yellow-500' : 'bg-gray-300';

  // Cost-guide links shown in place of invented replacement prices.
  const costGuides: { href: string; label: string }[] = [
    { href: '/water-heater-guide', label: 'water heater guide' },
    ...(heater.value.includes('tankless') ? [{ href: '/tankless-water-heater-cost', label: 'tankless cost guide' }] : []),
    ...(heater.value === 'heat-pump' ? [{ href: '/heat-pump-water-heater-guide', label: 'heat pump water heater guide' }] : []),
  ];

  return (
    <CalcShell
      Icon={Droplets}
      title="Water Heater Lifespan Calculator"
      subtitle="Your unit's age against the DOE expected-life range."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Your water heater" subtitle="Type and current age" Icon={Droplets} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <CardChoice value={heaterType} onChange={setHeaterType} options={waterHeaters} ariaLabel="Heater type" accent={ACCENT} columns={3} />
          </div>
          <div className="max-w-xs">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Current age</label>
            <NumberInput value={heaterAge} onChange={setHeaterAge} min={0} max={40} suffix="years" ariaLabel="Heater age" accent={ACCENT} className="max-w-none" />
            <p className="text-xs text-gray-500 mt-1.5">{heater.name} lasts {heater.doeLabel} (DOE)</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Warning signs" subtitle="Check any symptoms you've noticed" Icon={AlertTriangle} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {warningSignsList.map((sign) => {
            const active = warningSigns.has(sign.id);
            return (
              <button
                key={sign.id}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggleSign(sign.id)}
                className={`text-left p-2.5 rounded-lg border-2 transition-all flex items-center gap-2 ${
                  active
                    ? `${a.selectedBorder} ${a.selectedBg} ring-1 ${a.selectedRing}`
                    : `border-gray-200 bg-white ${a.hoverBorder} ${a.hoverBg}/50`
                }`}
              >
                <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${active ? `${a.iconBg} border-transparent` : 'border-gray-300'}`}>
                  {active && <span className="text-white text-[10px] leading-none">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${active ? a.selectedText : 'text-gray-900'}`}>
                    {sign.label}
                  </div>
                  {sign.critical && <div className="text-[10px] text-red-700 uppercase font-bold">Critical</div>}
                </div>
              </button>
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

      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommendation"
          value={calc.shouldReplace ? 'Replace' : 'Keep & monitor'}
          unit=""
          secondaryText={
            calc.hasCritical ? (
              <>
                <strong>Critical safety issue</strong> (a leak, or a gas smell). Shut off the water and gas or electric supply and call a licensed plumber; replace, don&rsquo;t repair.
              </>
            ) : (
              <>
                Your {fmt(age)}-year-old {heater.name.toLowerCase()} is {calc.rangeWord} the DOE typical life of {heater.doeLabel}.
                {calc.over10Tank && ' ENERGY STAR advises replacing a tank water heater that is over 10 years old.'}
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'DOE typical life', value: heater.doeLabel },
            { label: 'Your unit', value: `${fmt(age)} yrs` },
            { label: 'Years remaining', value: calc.pastRange ? 'Past range' : `${fmt(calc.remainingYears)} yrs` },
          ]}
        />

        {calc.totalScore > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Warning sign severity
              </h4>
              <span className={`font-bold text-sm capitalize ${
                calc.severity === 'critical' ? 'text-red-700' :
                calc.severity === 'high' ? 'text-amber-700' :
                'text-yellow-700'
              }`}>
                {calc.severity} ({calc.totalScore} pts)
              </span>
            </div>
            <div className="bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className={`h-full transition-all ${severityColor}`} style={{ width: `${Math.min(calc.totalScore * 10, 100)}%` }} />
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-red-600" />
              Lifespan vs DOE range
            </h4>
            <BreakdownTable
              rows={[
                { label: 'DOE typical life', detail: heater.name, factor: heater.doeLabel },
                { label: 'Your unit age', detail: '', factor: `${fmt(age)} yrs` },
                { label: 'Status', detail: 'vs DOE range', factor: calc.pastRange ? 'Past range' : calc.withinRange ? 'In range' : 'Within life' },
              ]}
              totals={[
                { label: 'Years to range end', value: calc.pastRange ? 'Past' : `${fmt(calc.remainingYears)} yrs`, valueClass: calc.pastRange ? 'text-red-700' : calc.remainingYears < 3 ? 'text-amber-700' : 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-red-600" />
              Efficiency & replacement cost
            </h4>
            <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
              {heater.value === 'heat-pump' && (
                <p>A heat pump water heater uses less than half the energy of a standard electric storage water heater (ENERGY STAR).</p>
              )}
              <p>
                This tool does not estimate prices. For replacement cost, see our{' '}
                {costGuides.map((g, i) => (
                  <span key={g.href}>
                    {i > 0 ? (i === costGuides.length - 1 ? ' and ' : ', ') : ''}
                    <a href={g.href} className="text-red-700 underline">{g.label}</a>
                  </span>
                ))}.
              </p>
            </div>
          </div>
        </div>

        <DisclaimerBox title="How this estimate works">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Expected life is the DOE Energy Saver range by type: storage tank 10 to 15 years, tankless about 20, heat pump water heater 10 to 15, solar about 20.</li>
            <li>ENERGY STAR advises replacing a water heater that is over 10 years old, and gives tankless units a life expectancy of 20 years.</li>
            <li>Hard water and skipped maintenance shorten life, by amounts too variable to put a single number on; annual flushing helps.</li>
            <li>Warning signs can mean replace sooner than age alone suggests. A leaking tank or a gas smell is a safety hazard, act now.</li>
          </ul>
          {calc.hasCritical && (
            <p className="text-red-800 font-semibold pt-2">
              ⚠ A leaking tank or gas odor is a safety hazard. Shut off the water and gas or electric supply and call a licensed plumber immediately.
            </p>
          )}
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
