'use client';

import { useState, useMemo } from 'react';
import {
  Activity,
  Zap,
  AlertTriangle,
  Settings,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
  Segmented,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'purple' as const;

const modeOptions = [
  { value: 'watts-to-amps', name: 'Watts → Amps', sub: 'Solve for current' },
  { value: 'amps-to-watts', name: 'Amps → Watts', sub: 'Solve for power' },
  { value: 'generator-size', name: 'Reference table', sub: 'Common generators' },
];

const voltageOptions = [
  { value: '120', name: '120V', sub: 'Standard outlet' },
  { value: '240', name: '240V', sub: 'Large appliance' },
  { value: '208', name: '208V', sub: '3-phase commercial' },
  { value: '277', name: '277V', sub: 'Commercial lighting' },
  { value: '480', name: '480V', sub: '3-phase industrial' },
];

const phaseOptions = [
  { value: 'single', name: 'Single phase' },
  { value: 'three', name: 'Three phase' },
];

const generatorExamples = [
  { watts: 2000,  label: '2,000W inverter',   amps120: 16.7,  amps240: 8.3 },
  { watts: 3500,  label: '3,500W portable',   amps120: 29.2,  amps240: 14.6 },
  { watts: 5500,  label: '5,500W portable',   amps120: 45.8,  amps240: 22.9 },
  { watts: 7500,  label: '7,500W portable',   amps120: 62.5,  amps240: 31.3 },
  { watts: 10000, label: '10,000W portable',  amps120: 83.3,  amps240: 41.7 },
  { watts: 14000, label: '14 kW standby',     amps120: 116.7, amps240: 58.3 },
  { watts: 20000, label: '20 kW standby',     amps120: 166.7, amps240: 83.3 },
  { watts: 22000, label: '22 kW whole house', amps120: 183.3, amps240: 91.7 },
];

// Minimum breaker per NEC 210.20 (125% × continuous load) + standard sizes
// per NEC 240.6(A). Kept as a computation but surfaced ONLY inside the safety
// block so it's visually paired with the wire-sizing guidance — a breaker
// protects its conductor, so a breaker spec without matched wire sizing is
// half a picture.
const breakerFor = (a: number) => {
  const required = a * 1.25;
  const standardSizes = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200];
  return standardSizes.find((s) => s >= required) || 200;
};

// NEMA outlet identification per NEMA WD 6. This is a plug-type LOOKUP (not a
// wire-able install spec) — safe to display and useful for identifying which
// receptacle a given generator uses.
const outletFor = (volts: number, amps: number) => {
  if (volts === 120 && amps <= 15) return 'NEMA 5-15 (standard household)';
  if (volts === 120 && amps <= 20) return 'NEMA 5-20';
  if (volts === 120 && amps <= 30) return 'NEMA L5-30 (twist-lock)';
  if (volts === 240 && amps <= 30) return 'NEMA L14-30 (twist-lock, common generator plug)';
  if (volts === 240 && amps <= 50) return 'NEMA 14-50 (RV / EV plug)';
  return 'Hardwired';
};

const DEFAULTS = {
  mode: 'watts-to-amps',
  watts: '7500',
  voltage: '120',
  amps: '30',
  powerFactor: '1.0',
  phases: 'single',
};

export default function GeneratorAmpsCalculator() {
  const [mode, setMode] = useState(DEFAULTS.mode);
  const [watts, setWatts] = useState(DEFAULTS.watts);
  const [voltage, setVoltage] = useState(DEFAULTS.voltage);
  const [amps, setAmps] = useState(DEFAULTS.amps);
  const [powerFactor, setPowerFactor] = useState(DEFAULTS.powerFactor);
  const [phases, setPhases] = useState(DEFAULTS.phases);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    mode, watts, voltage, amps, powerFactor, phases,
  });

  const v = Math.max(parseFloat(src.voltage) || 0, 1);
  const w = Math.max(parseFloat(src.watts) || 0, 0);
  const aIn = Math.max(parseFloat(src.amps) || 0, 0);
  const pf = Math.min(Math.max(parseFloat(src.powerFactor) || 1, 0.1), 1);

  const handleReset = () => {
    setMode(DEFAULTS.mode);
    setWatts(DEFAULTS.watts);
    setVoltage(DEFAULTS.voltage);
    setAmps(DEFAULTS.amps);
    setPowerFactor(DEFAULTS.powerFactor);
    setPhases(DEFAULTS.phases);
    clear();
  };

  const calc = useMemo(() => {
    // Core watts↔amps math — verified against standard textbook formulas.
    // Single-phase: W = V × I × PF        →  I = W / (V × PF)
    // Three-phase: W = √3 × V × I × PF   →  I = W / (√3 × V × PF)
    let calculatedAmps = 0;
    let calculatedWatts = 0;
    if (src.mode === 'watts-to-amps') {
      calculatedAmps = src.phases === 'single' ? w / (v * pf) : w / (Math.sqrt(3) * v * pf);
    } else if (src.mode === 'amps-to-watts') {
      calculatedWatts = src.phases === 'single' ? aIn * v * pf : Math.sqrt(3) * aIn * v * pf;
    }
    const resultAmps = src.mode === 'watts-to-amps' ? calculatedAmps : aIn;
    const resultWatts = src.mode === 'watts-to-amps' ? w : calculatedWatts;
    const resultKW = resultWatts / 1000;
    const resultKVA = resultKW / pf;   // Apparent power: kVA = kW / PF
    return { calculatedAmps, calculatedWatts, resultAmps, resultWatts, resultKW, resultKVA };
  }, [src.mode, src.phases, v, w, aIn, pf]);

  const fit =
    src.mode === 'generator-size' ? { tone: 'good' as const, text: 'Reference table mode' } :
    calc.resultAmps === 0 ? { tone: 'warn' as const, text: 'Enter values to compute' } :
    calc.resultAmps > 100 ? { tone: 'warn' as const, text: 'High current — see the safety block below' } :
    { tone: 'good' as const, text: 'Calculation complete' };

  return (
    <CalcShell
      Icon={Activity}
      title="Generator Amps Calculator"
      subtitle="Convert watts ↔ amps for generators. Wire and breaker sizing is not a calculator job — see the NEC safety block."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Calculator mode" subtitle="Pick what you're solving for" Icon={Settings} accent={ACCENT} />
        <Segmented value={mode} onChange={setMode} options={modeOptions} ariaLabel="Calculator mode" accent={ACCENT} />
      </section>

      {mode !== 'generator-size' && (
        <section>
          <SectionHeader step={2} title="Inputs" subtitle="Voltage, current/watts, phase, PF" Icon={Zap} accent={ACCENT} />
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Voltage</label>
              <Segmented value={voltage} onChange={setVoltage} options={voltageOptions} ariaLabel="Voltage" accent={ACCENT} />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Phase type</label>
                <Segmented value={phases} onChange={setPhases} options={phaseOptions} ariaLabel="Phase" accent={ACCENT} />
              </div>
              {mode === 'watts-to-amps' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Generator watts</label>
                  <NumberInput value={watts} onChange={setWatts} min={100} max={50000} suffix="W" ariaLabel="Watts" accent={ACCENT} />
                </div>
              )}
              {mode === 'amps-to-watts' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Amperage</label>
                  <NumberInput value={amps} onChange={setAmps} min={0.1} max={500} suffix="A" ariaLabel="Amps" accent={ACCENT} />
                </div>
              )}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Power factor
                  <InfoTip label="PF">1.0 for resistive loads (heaters, incandescent). 0.8–0.9 for motor-heavy loads. Generators are rated at PF 1.0 nameplate.</InfoTip>
                  <span className="ml-auto text-sm font-semibold text-purple-700">{(pf * 100).toFixed(0)}%</span>
                </label>
                <input type="range" min={0.1} max={1} step={0.05} value={powerFactor} onChange={(e) => setPowerFactor(e.target.value)} className="w-full accent-purple-600" aria-label="PF" />
              </div>
            </div>
          </div>
        </section>
      )}

      {mode === 'generator-size' && (
        <section>
          <SectionHeader step={2} title="Common generator amp outputs" subtitle="Standard sizes at 120V + 240V (PF 1.0)" Icon={Zap} accent={ACCENT} />
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Generator</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Watts</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">A @ 120V</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">A @ 240V</th>
                </tr>
              </thead>
              <tbody>
                {generatorExamples.map((g) => (
                  <tr key={g.watts} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{g.label}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(g.watts)}W</td>
                    <td className="px-3 py-2 text-right tabular-nums">{g.amps120.toFixed(1)}A</td>
                    <td className="px-3 py-2 text-right tabular-nums">{g.amps240.toFixed(1)}A</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 leading-snug">
            Amps = watts ÷ voltage at PF 1.0 (single-phase). See the NEC safety block below for how wire gauge, breaker,
            and voltage drop have to be sized together — the calculator no longer emits a wire recommendation.
          </p>
        </section>
      )}

      {mode !== 'generator-size' && (
        <CalculateResetBar
          onCalculate={calculate}
          onReset={handleReset}
          dirty={dirty}
          hasResult={hasResult}
          accent={ACCENT}
        />
      )}

      {mode !== 'generator-size' && hasResult && (
        <section aria-live="polite" className="space-y-5">
          <ResultsHeader dirty={dirty} />

          <ResultHero
            accent={ACCENT}
            eyebrow={src.mode === 'watts-to-amps' ? 'Amperage' : 'Power output'}
            value={src.mode === 'watts-to-amps' ? `${calc.calculatedAmps.toFixed(1)}` : `${fmt(Math.round(calc.calculatedWatts))}`}
            unit={src.mode === 'watts-to-amps' ? `A @ ${v}V` : `W (${calc.resultKW.toFixed(2)} kW)`}
            secondaryText={
              <>
                Formula ({src.phases === 'single' ? 'single phase' : 'three phase'}):{' '}
                {src.mode === 'watts-to-amps'
                  ? src.phases === 'single' ? <code>A = W ÷ (V × PF)</code> : <code>A = W ÷ (√3 × V × PF)</code>
                  : src.phases === 'single' ? <code>W = A × V × PF</code> : <code>W = √3 × A × V × PF</code>}
                {' · '}{calc.resultKVA.toFixed(2)} kVA apparent
              </>
            }
            fitTone={fit.tone}
            fitText={fit.text}
            sidePanel={[
              { label: 'Line current', value: `${calc.resultAmps.toFixed(1)}A` },
              { label: 'Real power', value: `${calc.resultKW.toFixed(2)} kW` },
              { label: 'Outlet (NEMA)', value: outletFor(v, calc.resultAmps) },
            ]}
          />

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-purple-600" />
              Electrical breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Voltage',        detail: `${voltageOptions.find(o => o.value === src.voltage)?.sub}`, factor: `${v}V` },
                { label: 'Current',        detail: '',                                                          factor: `${calc.resultAmps.toFixed(1)}A` },
                { label: 'Real power',     detail: `${src.phases} phase × PF ${pf.toFixed(2)}`,                 factor: `${fmt(Math.round(calc.resultWatts))}W` },
                { label: 'Apparent power', detail: '÷ PF',                                                      factor: `${calc.resultKVA.toFixed(2)} kVA` },
                { label: 'Outlet (NEMA)',  detail: `${v}V receptacle type`,                                    factor: outletFor(v, calc.resultAmps) },
              ]}
              totals={[]}
            />
          </div>

          {/* SAFETY BLOCK — replaces the wire-gauge output (previously in
              ResultHero sidePanel, BreakdownTable row, AND the reference-table
              "Wire (240V)" column). Same reasons as Battery12V and ThreePhase
              calcs: the previous lookup ignored NEC 310.15(B) ambient temp,
              310.15(C) bundling, 240.4(D) small-conductor rules, 430.22 motor
              125%, and 210.19 voltage drop. Generator-to-detached-building runs
              are commonly 150-200ft where voltage drop dominates wire choice.
              Breaker computation moved INTO this block so it's visually paired
              with the wire guidance — a breaker protects its conductor and
              can't be sized in isolation.

              The backfeeding warning is kept at the TOP of the block because
              backfeeding a generator through a household outlet without a
              transfer switch has killed line workers repeatedly — NEC 702.5
              requires a transfer switch or interlock kit for standby
              generators. */}
          <div className="bg-white rounded-xl border border-red-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Wire, breaker, and voltage-drop sizing — follow NEC by a qualified person
            </h4>
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-900 mb-3 leading-relaxed">
              <strong>NEC 702.5 — never backfeed a generator through a household outlet.</strong> Doing so without a
              transfer switch or generator interlock kit re-energizes the utility drop and has killed line workers.
              Install an approved manual transfer switch or a listed interlock; this is a code requirement, not a
              suggestion.
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              The <strong>line current</strong> shown above ({calc.resultAmps.toFixed(1)}A at {v}V) is the correct starting
              input for sizing your conductors and overcurrent protection. Use it against the actual NEC sections for
              your installation — <strong>this calculator no longer emits a specific wire gauge.</strong>
            </p>
            <ul className="mt-2 space-y-1 text-xs text-gray-700 list-disc list-outside ml-5 leading-relaxed">
              <li><strong>Minimum breaker (NEC 210.20 continuous-load rule):</strong> {breakerFor(calc.resultAmps)}A ({calc.resultAmps.toFixed(1)}A × 1.25, rounded up to the next standard size per NEC 240.6(A)). A breaker only protects the conductor it's wired to — do <strong>not</strong> install this breaker without wire sized to carry the same current per NEC 310.16.</li>
              <li><strong>NEC 310.16</strong> — ampacity of insulated conductors (copper vs aluminum, 60/75/90°C insulation)</li>
              <li><strong>NEC 310.15(B)</strong> — ambient temperature correction (installations above 30°C derate)</li>
              <li><strong>NEC 310.15(C)</strong> — adjustment for more than 3 current-carrying conductors bundled</li>
              <li><strong>NEC 240.4(D)</strong> — small-conductor rules override ampacity: 14 AWG max 15A, 12 AWG max 20A, 10 AWG max 30A regardless of insulation temperature rating</li>
              <li><strong>NEC 430.22</strong> — motor branch circuit conductors must be sized at 125% × motor FLC, not the raw current shown above</li>
              <li><strong>NEC 210.19 / 215.2</strong> — voltage drop ≤3% branch, ≤5% total feeder + branch. Critical for generator-to-detached-building runs at 150–200 ft where voltage drop, not ampacity, drives wire choice.</li>
            </ul>
            <p className="text-xs text-gray-700 leading-relaxed mt-2">
              Wire and breaker are one package — a licensed electrician sizes them together for your actual load type,
              run length, and ambient. Do not install just the breaker from the number above without matched wire sizing.
            </p>
          </div>
        </section>
      )}

      <DisclaimerBox title="Generator sizing and electrical safety notes">
        <ul className="space-y-0.5 list-disc list-outside ml-4">
          <li>
            <strong>Two different rules people conflate:</strong>{' '}
            <strong>NEC 210.20</strong> — breakers and circuits are sized at <strong>125% of continuous load</strong> (the
            code rule).{' '}
            <strong>Generator continuous output</strong> is roughly <strong>80% of peak/surge rating</strong> — the
            manufacturer's running-vs-starting-watts distinction (a "10,000W surge / 8,000W running" nameplate). Both
            factors matter, but they answer different questions.
          </li>
          <li>Motors and compressors have startup surge <strong>3–6× running amps</strong> (well pumps up to 8×) — sized conductors AND breakers must handle this per NEC 430.52 motor branch tables</li>
          <li>Generator receptacles have maximum amp ratings printed on the panel — verify before connecting high-amp loads</li>
          <li><strong>NEC 702.5:</strong> never backfeed a generator through a wall outlet. Use a manual transfer switch or a listed generator interlock kit. Backfeeding has killed utility line workers.</li>
          <li>Wire and breaker sizing must follow NEC by a qualified person for the actual run — length, ambient, load type, and installation method all change the answer. This calculator sizes power (W/A/VA), not conductors.</li>
        </ul>
      </DisclaimerBox>
      </form>
    </CalcShell>
  );
}
