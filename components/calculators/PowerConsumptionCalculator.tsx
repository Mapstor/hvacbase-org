'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  Activity,
  TrendingUp,
  Settings,
  BarChart,
  Gauge,
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
} from './_shared';

const ACCENT = 'purple' as const;

const phaseOptions = [
  { value: 'single', name: 'Single phase', sub: 'Residential standard' },
  { value: 'three', name: 'Three phase', sub: 'Commercial / industrial' },
];

const voltagePresets = {
  single: [120, 208, 240, 277],
  three: [208, 240, 480, 600],
};

const pfPresets = [0.6, 0.8, 0.85, 0.95, 1.0];

export default function PowerConsumptionCalculator() {
  const [phases, setPhases] = useState('single');
  const [voltage, setVoltage] = useState('120');
  const [current, setCurrent] = useState('12.5');
  const [powerFactor, setPowerFactor] = useState('1.0');

  const volts = Math.max(parseFloat(voltage) || 0, 0);
  const amps = Math.max(parseFloat(current) || 0, 0);
  const pf = Math.min(Math.max(parseFloat(powerFactor) || 1, 0.1), 1);

  const calc = useMemo(() => {
    const apparentPower = phases === 'three' ? Math.sqrt(3) * volts * amps : volts * amps;
    const realPower = apparentPower * pf;
    const reactivePower = Math.sqrt(Math.max(Math.pow(apparentPower, 2) - Math.pow(realPower, 2), 0));
    const powerKW = realPower / 1000;
    const powerHP = realPower / 746;
    const dailyKWh = (realPower * 24) / 1000;
    const monthlyKWh = dailyKWh * 30;
    const yearlyKWh = monthlyKWh * 12;
    const yearlyMWh = yearlyKWh / 1000;
    return { apparentPower, realPower, reactivePower, powerKW, powerHP, dailyKWh, monthlyKWh, yearlyKWh, yearlyMWh };
  }, [phases, volts, amps, pf]);

  const fit =
    calc.realPower === 0 ? { tone: 'warn' as const, text: 'Enter voltage + current' } :
    pf >= 0.95 ? { tone: 'good' as const, text: 'Excellent power factor — efficient load' } :
    pf >= 0.85 ? { tone: 'ok' as const, text: 'Good power factor' } :
                 { tone: 'warn' as const, text: 'Poor power factor — consider correction' };

  const loadType =
    pf === 1.0 ? { name: 'Resistive load', desc: 'Heaters, incandescent bulbs, toasters', color: 'orange' } :
    pf >= 0.85 ? { name: 'Inductive (motor)', desc: 'Induction motors, transformers', color: 'blue' } :
    pf >= 0.6 ? { name: 'Mixed inductive', desc: 'Fluorescent ballasts, switched-mode supplies', color: 'amber' } :
    { name: 'Highly inductive / poor', desc: 'Old fluorescent gear, neglected motors — needs PF correction', color: 'red' };

  return (
    <CalcShell
      Icon={Zap}
      title="Power Consumption Calculator"
      subtitle="Real power, apparent power, and energy from voltage + current. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="System type" subtitle="Single phase (residential) or three phase (commercial)" Icon={Settings} accent={ACCENT} />

        <div className="space-y-5">
          <Segmented value={phases} onChange={setPhases} options={phaseOptions} ariaLabel="Phase type" accent={ACCENT} />

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Voltage
              <InfoTip label="voltage">
                Common single-phase: 120V (US standard outlet), 240V (dryer/range), 277V (commercial lighting).
                Common three-phase: 208V, 240V, 480V, 600V.
              </InfoTip>
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {voltagePresets[phases as 'single' | 'three'].map((v) => {
                const active = parseFloat(voltage) === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVoltage(String(v))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    {v}V
                  </button>
                );
              })}
            </div>
            <NumberInput value={voltage} onChange={setVoltage} min={1} max={600} suffix="V" ariaLabel="Voltage" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Current & power factor" subtitle="From a clamp meter or nameplate" Icon={Gauge} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current
              <InfoTip label="current">Measure with a clamp meter on the supply wire while the load is running. For nameplate-only, use the FLA (Full Load Amps) value.</InfoTip>
            </label>
            <NumberInput value={current} onChange={setCurrent} min={0.1} max={1000} suffix="A" ariaLabel="Current" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Power factor
              <InfoTip label="power factor">
                Ratio of real to apparent power. Resistive loads = 1.0. Modern LED/SMPS = 0.9–1.0. Induction motors = 0.8–0.9. Old fluorescent ballasts = 0.5–0.7.
              </InfoTip>
              <span className="ml-auto text-sm font-semibold text-purple-700">{(pf * 100).toFixed(0)}%</span>
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {pfPresets.map((p) => {
                const active = parseFloat(powerFactor) === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPowerFactor(String(p))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    {p.toFixed(2)}
                  </button>
                );
              })}
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.01}
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="w-full accent-purple-600"
              aria-label="Power factor slider"
            />
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Real power consumption"
          value={`${fmt(Math.round(calc.realPower))}`}
          unit={`W (${calc.powerKW.toFixed(2)} kW)`}
          secondaryText={
            <>
              At {volts}V / {amps}A {phases === 'three' && '× √3'} × PF {pf.toFixed(2)} = <strong>{fmt(Math.round(calc.realPower))}W</strong> real power.
              {phases === 'three' && ' Three-phase math: P = √3 × V × I × PF.'}
              {' '}Apparent power: <strong>{fmt(Math.round(calc.apparentPower))} VA</strong>; reactive: <strong>{fmt(Math.round(calc.reactivePower))} VAR</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Horsepower equiv.', value: `${calc.powerHP.toFixed(2)} HP` },
            { label: 'Daily (24hr)', value: `${calc.dailyKWh.toFixed(1)} kWh` },
            { label: 'Annual', value: `${fmt(Math.round(calc.yearlyKWh))} kWh` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <BarChart className="w-4 h-4 text-purple-600" />
              Power triangle (S² = P² + Q²)
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-purple-700">S · Apparent</div>
                <div className="text-xl font-bold text-purple-900 tabular-nums">{fmt(Math.round(calc.apparentPower))}</div>
                <div className="text-[11px] text-purple-700">VA</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">P · Real</div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.realPower))}</div>
                <div className="text-[11px] text-emerald-700">W</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-blue-700">Q · Reactive</div>
                <div className="text-xl font-bold text-blue-900 tabular-nums">{fmt(Math.round(calc.reactivePower))}</div>
                <div className="text-[11px] text-blue-700">VAR</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded text-center">
              <div className="text-xs text-gray-600">Power factor = P/S = <strong className="text-purple-700">{pf.toFixed(3)} ({(pf * 100).toFixed(1)}%)</strong></div>
              <div className="text-[11px] text-gray-500 mt-1">Higher PF = less wasted current = lower utility demand charges</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4 text-purple-600" />
              Load type detected
            </h4>
            <div className={`p-3 rounded-lg ${
              loadType.color === 'orange' ? 'bg-orange-50 border border-orange-200' :
              loadType.color === 'blue' ? 'bg-blue-50 border border-blue-200' :
              loadType.color === 'amber' ? 'bg-amber-50 border border-amber-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <div className={`font-semibold ${
                loadType.color === 'orange' ? 'text-orange-900' :
                loadType.color === 'blue' ? 'text-blue-900' :
                loadType.color === 'amber' ? 'text-amber-900' :
                'text-red-900'
              }`}>
                {loadType.name}
              </div>
              <p className="text-xs text-gray-700 mt-1">{loadType.desc}</p>
            </div>
            <div className="mt-3 bg-gray-50 rounded p-3">
              <div className="text-xs font-semibold text-gray-700 mb-2">Typical power factors:</div>
              <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-600">
                <div className="flex justify-between"><span>Heaters / toasters</span><span className="font-mono">1.00</span></div>
                <div className="flex justify-between"><span>LED lights</span><span className="font-mono">0.90–1.00</span></div>
                <div className="flex justify-between"><span>Induction motors</span><span className="font-mono">0.80–0.90</span></div>
                <div className="flex justify-between"><span>Computer PSU</span><span className="font-mono">0.60–0.80</span></div>
                <div className="flex justify-between"><span>Fluorescent (mag.)</span><span className="font-mono">0.50–0.90</span></div>
                <div className="flex justify-between"><span>AC compressors</span><span className="font-mono">0.85–0.95</span></div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              Energy consumption (24/7 operation)
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Hourly', detail: '1 hour at full load', factor: `${(calc.realPower / 1000).toFixed(3)} kWh` },
                { label: 'Daily', detail: '24 hours continuous', factor: `${calc.dailyKWh.toFixed(1)} kWh` },
                { label: 'Monthly', detail: '30 days continuous', factor: `${fmt(Math.round(calc.monthlyKWh))} kWh` },
                { label: 'Annual', detail: '365 days continuous', factor: `${fmt(Math.round(calc.yearlyKWh))} kWh (${calc.yearlyMWh.toFixed(2)} MWh)` },
              ]}
              totals={[]}
            />
          </div>
        </div>

        <DisclaimerBox title="Electrical safety + edge cases">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>These results assume steady-state operation — motor inrush (starting) currents can be 3–6× higher for a few seconds</li>
            <li>Three-phase math assumes <strong>balanced</strong> loads across all 3 phases; unbalanced loads need per-phase analysis</li>
            <li>Low PF (under 0.85) triggers utility demand charges on commercial accounts — power factor correction capacitors usually pay back in 1–3 years</li>
            <li>Always use proper electrical PPE and lockout/tagout before measuring on live circuits</li>
            <li>For critical or high-stakes work, consult a licensed electrical engineer</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
