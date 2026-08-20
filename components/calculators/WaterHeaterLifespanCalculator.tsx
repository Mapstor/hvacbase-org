'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  AlertTriangle,
  TrendingDown,
  Clock,
  Wrench,
  DollarSign,
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
  CalculateResetBar,
  useCalculatorSubmit,
  accentMap,
} from './_shared';

const ACCENT = 'red' as const;
const a = accentMap[ACCENT];

const waterHeaters = [
  { value: 'gas-tank', name: 'Gas tank', summary: 'Standard tank with gas burner', avgLifespan: 10, minLifespan: 8, maxLifespan: 12, replacementMin: 1200, replacementMax: 2500 },
  { value: 'electric-tank', name: 'Electric tank', summary: 'Tank with resistive heating element', avgLifespan: 12, minLifespan: 10, maxLifespan: 15, replacementMin: 1000, replacementMax: 2000 },
  { value: 'gas-tankless', name: 'Gas tankless', summary: 'On-demand gas heater', avgLifespan: 20, minLifespan: 15, maxLifespan: 25, replacementMin: 2500, replacementMax: 4500 },
  { value: 'electric-tankless', name: 'Electric tankless', summary: 'On-demand electric heater', avgLifespan: 20, minLifespan: 15, maxLifespan: 25, replacementMin: 1500, replacementMax: 3000 },
  { value: 'heat-pump', name: 'Heat pump (HPWH)', summary: '3× efficient hybrid tank', avgLifespan: 13, minLifespan: 10, maxLifespan: 15, replacementMin: 2000, replacementMax: 3500 },
  { value: 'solar', name: 'Solar + backup', summary: 'Roof collectors + tank', avgLifespan: 20, minLifespan: 15, maxLifespan: 25, replacementMin: 4000, replacementMax: 8000 },
];

const waterHardnessOptions = [
  { value: 'soft', name: 'Soft', sub: '0–3.5 gpg', delta: 1 },
  { value: 'moderate', name: 'Moderate', sub: '3.5–7 gpg', delta: 0 },
  { value: 'hard', name: 'Hard', sub: '7–10 gpg', delta: -2 },
  { value: 'very-hard', name: 'Very hard', sub: '10+ gpg', delta: -3 },
];

const maintenanceOptions = [
  { value: 'annual', name: 'Annual flush', sub: 'Once a year service', delta: 1 },
  { value: 'occasional', name: 'Occasional', sub: 'Every 2–3 yrs', delta: 0 },
  { value: 'rare', name: 'Rare', sub: 'Every 4+ yrs', delta: -2 },
  { value: 'never', name: 'Never', sub: 'No flush ever', delta: -3 },
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

const repairPresets = [200, 500, 1000, 2000];

const DEFAULTS = {
  heaterType: 'gas-tank',
  heaterAge: '8',
  waterHardness: 'moderate',
  maintenanceFreq: 'annual',
  repairCost: '500',
};

export default function WaterHeaterLifespanCalculator() {
  const [heaterType, setHeaterType] = useState(DEFAULTS.heaterType);
  const [heaterAge, setHeaterAge] = useState(DEFAULTS.heaterAge);
  const [waterHardness, setWaterHardness] = useState(DEFAULTS.waterHardness);
  const [maintenanceFreq, setMaintenanceFreq] = useState(DEFAULTS.maintenanceFreq);
  const [warningSigns, setWarningSigns] = useState<Set<string>>(new Set());
  const [repairCost, setRepairCost] = useState(DEFAULTS.repairCost);

  // Serialize the Set for the submit hook (which tracks string inputs).
  const warningSignsSerialized = Array.from(warningSigns).sort().join(',');

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    heaterType, heaterAge, waterHardness, maintenanceFreq, warningSignsSerialized, repairCost,
  });

  const heater = waterHeaters.find((h) => h.value === src.heaterType)!;
  const hardness = waterHardnessOptions.find((w) => w.value === src.waterHardness)!;
  const maint = maintenanceOptions.find((m) => m.value === src.maintenanceFreq)!;
  const age = Math.max(parseFloat(src.heaterAge) || 0, 0);
  const repair = Math.max(parseFloat(src.repairCost) || 0, 0);
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
    setWaterHardness(DEFAULTS.waterHardness);
    setMaintenanceFreq(DEFAULTS.maintenanceFreq);
    setWarningSigns(new Set());
    setRepairCost(DEFAULTS.repairCost);
    clear();
  };

  const calc = useMemo(() => {
    const adjustedLifespan = Math.max(heater.avgLifespan + hardness.delta + maint.delta, 1);
    const remainingYears = Math.max(adjustedLifespan - age, 0);
    const percentLifeUsed = (age / adjustedLifespan) * 100;
    const totalScore = Array.from(srcWarningSigns).reduce((sum, id) => {
      const sign = warningSignsList.find((s) => s.id === id);
      return sum + (sign?.score || 0);
    }, 0);
    const hasCritical = Array.from(srcWarningSigns).some((id) => warningSignsList.find((s) => s.id === id)?.critical);
    const avgReplacementCost = (heater.replacementMin + heater.replacementMax) / 2;
    const repairThreshold = avgReplacementCost * 0.5;
    const shouldReplace = hasCritical || repair > repairThreshold || age > adjustedLifespan * 0.8 || totalScore >= 8;
    const efficiencyLoss = age > 8 ? Math.min((age - 8) * 5, 30) : 0;
    const baseOperatingCost = src.heaterType.includes('gas') ? 350 : 500;
    const currentOperatingCost = baseOperatingCost * (1 + efficiencyLoss / 100);
    const annualExtraCost = currentOperatingCost - baseOperatingCost;
    const severity = totalScore >= 10 ? 'critical' : totalScore >= 6 ? 'high' : totalScore > 0 ? 'moderate' : 'none';
    return { adjustedLifespan, remainingYears, percentLifeUsed, totalScore, hasCritical, avgReplacementCost, repairThreshold, shouldReplace, efficiencyLoss, annualExtraCost, severity };
  }, [heater, hardness, maint, age, repair, src.warningSignsSerialized, src.heaterType]);

  const fit =
    age === 0 ? { tone: 'warn' as const, text: 'Enter heater age' } :
    calc.hasCritical ? { tone: 'bad' as const, text: 'Critical issue — replace immediately' } :
    calc.shouldReplace ? { tone: 'warn' as const, text: 'Replace recommended' } :
                         { tone: 'good' as const, text: 'Keep + maintain — repair is economical' };

  const severityColor =
    calc.severity === 'critical' ? 'bg-red-500' :
    calc.severity === 'high' ? 'bg-amber-500' :
    calc.severity === 'moderate' ? 'bg-yellow-500' : 'bg-gray-300';

  return (
    <CalcShell
      Icon={Droplets}
      title="Water Heater Lifespan Calculator"
      subtitle="Repair vs replace — 50% rule + age + warning signs."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Your water heater" subtitle="Type, age, and water conditions" Icon={Droplets} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <CardChoice value={heaterType} onChange={setHeaterType} options={waterHeaters} ariaLabel="Heater type" accent={ACCENT} columns={3} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current age</label>
              <NumberInput value={heaterAge} onChange={setHeaterAge} min={0} max={40} suffix="years" ariaLabel="Heater age" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">{heater.name} typically lasts {heater.minLifespan}–{heater.maxLifespan} years</p>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Repair cost (if quoted)
                <InfoTip label="repair cost">If you don't have a quote yet, skip — the calculator still factors age + warning signs.</InfoTip>
              </label>
              <div className="mb-2">
                <Segmented value={repairCost} onChange={setRepairCost} options={repairPresets.map(p => ({ value: String(p), name: `$${fmt(p)}` }))} ariaLabel="Repair preset" accent={ACCENT} />
              </div>
              <NumberInput value={repairCost} onChange={setRepairCost} min={0} max={10000} suffix="$" ariaLabel="Custom repair cost" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Conditions" subtitle="Water hardness and maintenance shape lifespan" Icon={Wrench} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Water hardness
              <InfoTip label="hardness">Hard water deposits scale inside the tank, insulating the heating element and accelerating failure. If you have a water softener, treat as soft.</InfoTip>
            </label>
            <CardChoice value={waterHardness} onChange={setWaterHardness} options={waterHardnessOptions} ariaLabel="Water hardness" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Maintenance frequency</label>
            <CardChoice value={maintenanceFreq} onChange={setMaintenanceFreq} options={maintenanceOptions} ariaLabel="Maintenance" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={3} title="Warning signs" subtitle="Check any symptoms you've noticed" Icon={AlertTriangle} accent={ACCENT} />
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
          value={calc.shouldReplace ? 'Replace' : 'Keep & maintain'}
          unit=""
          secondaryText={
            calc.hasCritical ? (
              <>
                <strong>Critical safety issue detected</strong> — leaks cause water damage; gas smell is a CO/explosion hazard.
                Call a plumber today; replace, don't repair.
              </>
            ) : calc.shouldReplace ? (
              <>
                Your {fmt(age)}-year-old {heater.name.toLowerCase()} has used {calc.percentLifeUsed.toFixed(0)}% of expected life.
                {repair > 0 && <> Quoted repair (${fmtMoney(repair)}) is {((repair / calc.avgReplacementCost) * 100).toFixed(0)}% of replacement.</>}
              </>
            ) : (
              <>
                Your repair is well under the 50%-of-replacement threshold (${fmtMoney(calc.repairThreshold)}).
                System has roughly <strong>{calc.remainingYears.toFixed(1)} years</strong> of expected life remaining.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Adjusted lifespan', value: `${calc.adjustedLifespan} yrs` },
            { label: 'Remaining', value: `${calc.remainingYears.toFixed(1)} yrs` },
            { label: '50% rule threshold', value: `$${fmtMoney(calc.repairThreshold)}` },
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
              Lifespan breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Industry typical', detail: heater.name, factor: `${heater.minLifespan}–${heater.maxLifespan} yrs` },
                { label: 'Average', detail: '', factor: `${heater.avgLifespan} yrs` },
                { label: 'Water hardness', detail: hardness.name, factor: `${hardness.delta >= 0 ? '+' : ''}${hardness.delta} yrs` },
                { label: 'Maintenance', detail: maint.name, factor: `${maint.delta >= 0 ? '+' : ''}${maint.delta} yrs` },
                { label: 'Your adjusted', detail: '', factor: `${calc.adjustedLifespan} yrs` },
                { label: 'Current age', detail: '', factor: `${fmt(age)} yrs` },
              ]}
              totals={[
                { label: 'Years remaining', value: `${calc.remainingYears.toFixed(1)} yrs`, valueClass: calc.remainingYears < 2 ? 'text-red-700' : calc.remainingYears < 5 ? 'text-amber-700' : 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-red-600" />
              Cost analysis (50% rule)
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Quoted repair', detail: 'Your number', factor: `$${fmtMoney(repair)}` },
                { label: 'Replacement range', detail: heater.name, factor: `$${fmtMoney(heater.replacementMin)}–$${fmtMoney(heater.replacementMax)}` },
                { label: 'Avg replacement', detail: 'Midpoint', factor: `$${fmtMoney(calc.avgReplacementCost)}` },
                { label: '50% threshold', detail: '50% of avg replacement', factor: `$${fmtMoney(calc.repairThreshold)}` },
                { label: 'Efficiency loss', detail: `Age >${heater.avgLifespan}yr = scale + element wear`, factor: `${calc.efficiencyLoss}%` },
                { label: 'Extra energy cost', detail: `Due to loss above`, factor: `$${fmtMoney(calc.annualExtraCost)}/yr` },
              ]}
              totals={[]}
            />
          </div>

          {calc.efficiencyLoss > 0 && (
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <TrendingDown className="w-4 h-4 text-blue-700" />
                Efficiency loss penalty
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Your {fmt(age)}-year-old unit has lost roughly <strong>{calc.efficiencyLoss}%</strong> of original efficiency due to sediment buildup, anode rod depletion, and component wear.
                That adds about <strong>${fmtMoney(calc.annualExtraCost)}/yr</strong> to your energy bill.
                A new high-efficiency model would save roughly <strong>${fmtMoney(calc.annualExtraCost * 1.5)}–${fmtMoney(calc.annualExtraCost * 2)}</strong> per year vs your current unit.
              </p>
            </div>
          )}
        </div>

        <DisclaimerBox title="Type-specific lifespan notes">
          {heater.value.includes('tank') && !heater.value.includes('tankless') ? (
            <p>
              Tank heaters typically fail by tank corrosion through the bottom — usually sudden and catastrophic (40–60 gallons of water on the floor).
              {age > 8 && ' At your age, proactive replacement avoids water damage to flooring + drywall.'}
              {' '}Annual flushing removes sediment and extends life 3–5 years.
            </p>
          ) : heater.value.includes('tankless') ? (
            <p>
              Tankless units last longer but need annual descaling — especially in hard water areas. The heat exchanger is the failure point.
              {(src.waterHardness === 'hard' || src.waterHardness === 'very-hard') && ' Your hard water materially shortens lifespan — a water softener pays for itself.'}
            </p>
          ) : heater.value === 'heat-pump' ? (
            <p>HPWH compressors are the failure mode (similar to refrigerators). Lifespan is shorter than gas tankless but operating cost is 60–70% lower.</p>
          ) : (
            <p>Solar systems last as long as their backup heater. The collectors themselves usually exceed 25 years; tanks and pumps need replacement on standard schedules.</p>
          )}
          {calc.hasCritical && (
            <p className="text-red-800 font-semibold pt-2">
              ⚠ Leaking tanks or gas odors are <strong>safety hazards</strong>. Shut off water + gas/electric supply and call a licensed plumber immediately.
            </p>
          )}
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
