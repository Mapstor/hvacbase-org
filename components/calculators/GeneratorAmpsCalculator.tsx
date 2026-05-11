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
  fmtMoney,
  CalcShell,
  SectionHeader,
  Segmented,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
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
  { watts: 2000, label: '2,000W inverter', amps120: 16.7, amps240: 8.3 },
  { watts: 3500, label: '3,500W portable', amps120: 29.2, amps240: 14.6 },
  { watts: 5500, label: '5,500W portable', amps120: 45.8, amps240: 22.9 },
  { watts: 7500, label: '7,500W portable', amps120: 62.5, amps240: 31.3 },
  { watts: 10000, label: '10,000W portable', amps120: 83.3, amps240: 41.7 },
  { watts: 14000, label: '14 kW standby', amps120: 116.7, amps240: 58.3 },
  { watts: 20000, label: '20 kW standby', amps120: 166.7, amps240: 83.3 },
  { watts: 22000, label: '22 kW whole house', amps120: 183.3, amps240: 91.7 },
];

const wireSizeFor = (a: number) => {
  if (a <= 15) return '14 AWG';
  if (a <= 20) return '12 AWG';
  if (a <= 30) return '10 AWG';
  if (a <= 40) return '8 AWG';
  if (a <= 55) return '6 AWG';
  if (a <= 70) return '4 AWG';
  if (a <= 85) return '3 AWG';
  if (a <= 95) return '2 AWG';
  if (a <= 110) return '1 AWG';
  if (a <= 125) return '1/0 AWG';
  if (a <= 145) return '2/0 AWG';
  if (a <= 165) return '3/0 AWG';
  if (a <= 195) return '4/0 AWG';
  return '250 kcmil+';
};

const breakerFor = (a: number) => {
  const required = a * 1.25;
  const standardSizes = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200];
  return standardSizes.find((s) => s >= required) || 200;
};

const outletFor = (volts: number, amps: number) => {
  if (volts === 120 && amps <= 15) return 'NEMA 5-15 (standard)';
  if (volts === 120 && amps <= 20) return 'NEMA 5-20';
  if (volts === 120 && amps <= 30) return 'NEMA L5-30';
  if (volts === 240 && amps <= 30) return 'NEMA L14-30';
  if (volts === 240 && amps <= 50) return 'NEMA 14-50';
  return 'Hardwired';
};

export default function GeneratorAmpsCalculator() {
  const [mode, setMode] = useState('watts-to-amps');
  const [watts, setWatts] = useState('7500');
  const [voltage, setVoltage] = useState('120');
  const [amps, setAmps] = useState('30');
  const [powerFactor, setPowerFactor] = useState('1.0');
  const [phases, setPhases] = useState('single');

  const v = Math.max(parseFloat(voltage) || 0, 1);
  const w = Math.max(parseFloat(watts) || 0, 0);
  const aIn = Math.max(parseFloat(amps) || 0, 0);
  const pf = Math.min(Math.max(parseFloat(powerFactor) || 1, 0.1), 1);

  const calc = useMemo(() => {
    let calculatedAmps = 0;
    let calculatedWatts = 0;
    if (mode === 'watts-to-amps') {
      calculatedAmps = phases === 'single' ? w / (v * pf) : w / (Math.sqrt(3) * v * pf);
    } else if (mode === 'amps-to-watts') {
      calculatedWatts = phases === 'single' ? aIn * v * pf : Math.sqrt(3) * aIn * v * pf;
    }
    const resultAmps = mode === 'watts-to-amps' ? calculatedAmps : aIn;
    const resultWatts = mode === 'watts-to-amps' ? w : calculatedWatts;
    const resultKW = resultWatts / 1000;
    const resultKVA = resultKW / pf;
    return { calculatedAmps, calculatedWatts, resultAmps, resultWatts, resultKW, resultKVA };
  }, [mode, phases, v, w, aIn, pf]);

  const fit =
    mode === 'generator-size' ? { tone: 'good' as const, text: 'Reference table mode' } :
    calc.resultAmps === 0 ? { tone: 'warn' as const, text: 'Enter values to compute' } :
    calc.resultAmps > 100 ? { tone: 'warn' as const, text: 'High current — need heavy gauge wire' } :
    { tone: 'good' as const, text: 'Calculation complete' };

  return (
    <CalcShell
      Icon={Activity}
      title="Generator Amps Calculator"
      subtitle="Convert watts ↔ amps for generators + wire and breaker sizing. Updates live."
      accent={ACCENT}
    >
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
                  <InfoTip label="PF">1.0 for resistive loads, 0.8 for motors. Defaults to 1.0 for generator nameplate calculations.</InfoTip>
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
          <SectionHeader step={2} title="Common generator amp outputs" subtitle="Standard sizes at 120V + 240V" Icon={Zap} accent={ACCENT} />
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-gray-700">Generator</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Watts</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">A @ 120V</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">A @ 240V</th>
                  <th className="px-3 py-2 text-right font-medium text-gray-700">Wire (240V)</th>
                </tr>
              </thead>
              <tbody>
                {generatorExamples.map((g) => (
                  <tr key={g.watts} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{g.label}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(g.watts)}W</td>
                    <td className="px-3 py-2 text-right tabular-nums">{g.amps120.toFixed(1)}A</td>
                    <td className="px-3 py-2 text-right tabular-nums">{g.amps240.toFixed(1)}A</td>
                    <td className="px-3 py-2 text-right tabular-nums">{wireSizeFor(g.amps240)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {mode !== 'generator-size' && (
        <section aria-live="polite" className="space-y-5">
          <ResultsHeader />

          <ResultHero
            accent={ACCENT}
            eyebrow={mode === 'watts-to-amps' ? 'Amperage' : 'Power output'}
            value={mode === 'watts-to-amps' ? `${calc.calculatedAmps.toFixed(1)}` : `${fmt(Math.round(calc.calculatedWatts))}`}
            unit={mode === 'watts-to-amps' ? `A @ ${v}V` : `W (${calc.resultKW.toFixed(2)} kW)`}
            secondaryText={
              <>
                Formula ({phases === 'single' ? 'single phase' : 'three phase'}):{' '}
                {mode === 'watts-to-amps'
                  ? phases === 'single' ? <code>A = W ÷ (V × PF)</code> : <code>A = W ÷ (√3 × V × PF)</code>
                  : phases === 'single' ? <code>W = A × V × PF</code> : <code>W = √3 × A × V × PF</code>}
                {' · '}{calc.resultKVA.toFixed(2)} kVA apparent
              </>
            }
            fitTone={fit.tone}
            fitText={fit.text}
            sidePanel={[
              { label: 'Wire size', value: wireSizeFor(calc.resultAmps) },
              { label: 'Breaker (125% rule)', value: `${breakerFor(calc.resultAmps)}A` },
              { label: 'Outlet', value: outletFor(v, calc.resultAmps) },
            ]}
          />

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-purple-600" />
              Electrical requirements
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Voltage', detail: `${voltageOptions.find(o => o.value === voltage)?.sub}`, factor: `${v}V` },
                { label: 'Current', detail: '', factor: `${calc.resultAmps.toFixed(1)}A` },
                { label: 'Real power', detail: `${phases} phase × PF ${pf.toFixed(2)}`, factor: `${fmt(Math.round(calc.resultWatts))}W` },
                { label: 'Apparent power', detail: '÷ PF', factor: `${calc.resultKVA.toFixed(2)} kVA` },
                { label: 'Wire size', detail: '75°C copper, ≤100ft run', factor: wireSizeFor(calc.resultAmps) },
                { label: 'Breaker', detail: '125% × continuous load (NEC)', factor: `${breakerFor(calc.resultAmps)}A` },
                { label: 'Outlet', detail: `${v}V configuration`, factor: outletFor(v, calc.resultAmps) },
              ]}
              totals={[]}
            />
          </div>
        </section>
      )}

      <DisclaimerBox title="Electrical safety + sizing notes">
        <ul className="space-y-0.5 list-disc list-outside ml-4">
          <li><strong>80% rule:</strong> Generator capacity should be 125% of continuous load (or load ≤ 80% of capacity)</li>
          <li>Wire sizing assumes 75°C copper conductors with runs ≤ 100ft — for longer runs, derate per NEC tables</li>
          <li>Motors and compressors have startup surge 2–3× their running amps — use the surge value for wire and breaker sizing</li>
          <li>Generator outlets have maximum amp ratings — verify before connecting high-amp loads</li>
          <li>Backfeeding a generator through a wall outlet (no transfer switch) is illegal and deadly to line workers — use an interlock kit or transfer switch</li>
        </ul>
      </DisclaimerBox>
    </CalcShell>
  );
}
