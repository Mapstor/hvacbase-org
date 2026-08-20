'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  BarChart,
  TrendingUp,
  Settings,
  Activity,
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
} from './_shared';

const ACCENT = 'purple' as const;

const connectionTypes = [
  { value: 'wye', name: 'Wye (Y / star)', summary: 'V_line = √3 × V_phase; I_line = I_phase' },
  { value: 'delta', name: 'Delta (Δ)', summary: 'V_line = V_phase; I_line = √3 × I_phase' },
];

const inputTypeOptions = [
  { value: 'line', name: 'Line values', sub: 'Line-to-line V + line I' },
  { value: 'phase', name: 'Phase values', sub: 'Per-phase V + I' },
];

const voltagePresets = [208, 240, 480, 600];
const pfPresets = [0.7, 0.8, 0.85, 0.9, 0.95, 1.0];

const DEFAULTS = {
  voltage: '480',
  current: '20',
  powerFactor: '0.85',
  connectionType: 'wye',
  inputType: 'line',
};

export default function ThreePhasePowerCalculator() {
  const [voltage, setVoltage] = useState(DEFAULTS.voltage);
  const [current, setCurrent] = useState(DEFAULTS.current);
  const [powerFactor, setPowerFactor] = useState(DEFAULTS.powerFactor);
  const [connectionType, setConnectionType] = useState(DEFAULTS.connectionType);
  const [inputType, setInputType] = useState(DEFAULTS.inputType);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    voltage, current, powerFactor, connectionType, inputType,
  });

  const volts = Math.max(parseFloat(src.voltage) || 0, 0);
  const amps = Math.max(parseFloat(src.current) || 0, 0);
  const pf = Math.min(Math.max(parseFloat(src.powerFactor) || 1, 0.1), 1);
  const conn = src.connectionType;
  const mode = src.inputType;

  const handleReset = () => {
    setVoltage(DEFAULTS.voltage);
    setCurrent(DEFAULTS.current);
    setPowerFactor(DEFAULTS.powerFactor);
    setConnectionType(DEFAULTS.connectionType);
    setInputType(DEFAULTS.inputType);
    clear();
  };

  const calc = useMemo(() => {
    const apparentPower = mode === 'line' ? Math.sqrt(3) * volts * amps : 3 * volts * amps;
    const realPower = apparentPower * pf;
    const reactivePower = Math.sqrt(Math.max(Math.pow(apparentPower, 2) - Math.pow(realPower, 2), 0));
    let lineVoltage = volts, phaseVoltage = volts, lineCurrent = amps, phaseCurrent = amps;
    if (conn === 'wye') {
      if (mode === 'line') { phaseVoltage = volts / Math.sqrt(3); }
      else { lineVoltage = volts * Math.sqrt(3); }
    } else {
      if (mode === 'line') { phaseCurrent = amps / Math.sqrt(3); }
      else { lineCurrent = amps * Math.sqrt(3); }
    }
    const powerPerPhase = realPower / 3;
    const powerKW = realPower / 1000;
    const powerHP = realPower / 746;
    const apparentPowerKVA = apparentPower / 1000;
    const dailyKWh = (realPower * 24) / 1000;
    const monthlyKWh = dailyKWh * 30;
    const yearlyKWh = monthlyKWh * 12;
    const hourlyCost = (powerKW) * 0.16;
    const wireSize = lineCurrent <= 20 ? '12 AWG' : lineCurrent <= 30 ? '10 AWG' : lineCurrent <= 40 ? '8 AWG'
      : lineCurrent <= 55 ? '6 AWG' : lineCurrent <= 75 ? '4 AWG' : lineCurrent <= 100 ? '2 AWG'
      : lineCurrent <= 130 ? '1 AWG' : lineCurrent <= 170 ? '2/0 AWG' : lineCurrent <= 200 ? '3/0 AWG' : '4/0+ AWG';
    return { apparentPower, realPower, reactivePower, lineVoltage, phaseVoltage, lineCurrent, phaseCurrent, powerPerPhase, powerKW, powerHP, apparentPowerKVA, dailyKWh, monthlyKWh, yearlyKWh, hourlyCost, wireSize };
  }, [volts, amps, pf, conn, mode]);

  const fit =
    calc.realPower === 0 ? { tone: 'warn' as const, text: 'Enter voltage + current' } :
    pf >= 0.95 ? { tone: 'good' as const, text: 'Excellent PF — efficient industrial load' } :
    pf >= 0.85 ? { tone: 'good' as const, text: 'Good PF for motor-heavy loads' } :
    pf >= 0.75 ? { tone: 'ok' as const, text: 'Marginal PF — utility may apply demand penalty' } :
                 { tone: 'warn' as const, text: 'Poor PF — install correction capacitors' };

  return (
    <CalcShell
      Icon={Zap}
      title="Three-Phase Power Calculator"
      subtitle="P = √3 × V × I × PF — full electrical analysis for industrial systems."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Configuration" subtitle="Wye vs delta + input convention" Icon={Settings} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Connection type
              <InfoTip label="connection type">
                Wye (Y): neutral wire available, common for distribution. V_line = √3 × V_phase. Delta (Δ): no neutral, common for motors. V_line = V_phase, but I_line = √3 × I_phase.
              </InfoTip>
            </label>
            <CardChoice value={connectionType} onChange={setConnectionType} options={connectionTypes} ariaLabel="Connection type" accent={ACCENT} columns={2} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Input values type</label>
            <Segmented value={inputType} onChange={setInputType} options={inputTypeOptions} ariaLabel="Input type" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Measurements" subtitle="Voltage, current, power factor" Icon={Activity} accent={ACCENT} />
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Voltage ({inputType === 'line' ? 'L-L' : 'phase'})
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {voltagePresets.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVoltage(String(v))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${parseFloat(voltage) === v ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400'}`}
                >{v}V</button>
              ))}
            </div>
            <NumberInput value={voltage} onChange={setVoltage} min={100} max={15000} suffix="V" ariaLabel="Voltage" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Current ({inputType === 'line' ? 'line' : 'phase'})
            </label>
            <NumberInput value={current} onChange={setCurrent} min={0.1} max={5000} suffix="A" ariaLabel="Current" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Power factor
              <span className="ml-auto text-sm font-semibold text-purple-700">{(pf * 100).toFixed(0)}%</span>
            </label>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {pfPresets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPowerFactor(String(p))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border ${parseFloat(powerFactor) === p ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400'}`}
                >{p.toFixed(2)}</button>
              ))}
            </div>
            <input type="range" min={0.1} max={1} step={0.01} value={powerFactor} onChange={(e) => setPowerFactor(e.target.value)} className="w-full accent-purple-600" aria-label="Power factor" />
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

      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Total real power"
          value={`${fmt(Math.round(calc.realPower))}`}
          unit={`W (${calc.powerKW.toFixed(2)} kW · ${calc.powerHP.toFixed(2)} HP)`}
          secondaryText={
            <>
              {mode === 'line' ? `√3 × ${volts}V × ${amps}A` : `3 × ${volts}V × ${amps}A`} × PF {pf.toFixed(2)} = <strong>{fmt(Math.round(calc.realPower))}W</strong> real power.
              Apparent: <strong>{calc.apparentPowerKVA.toFixed(1)} kVA</strong> · Reactive: <strong>{(calc.reactivePower / 1000).toFixed(1)} kVAR</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Per phase', value: `${(calc.powerPerPhase / 1000).toFixed(2)} kW` },
            { label: 'Daily (24/7)', value: `${calc.dailyKWh.toFixed(1)} kWh` },
            { label: 'Est. wire size', value: calc.wireSize },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <BarChart className="w-4 h-4 text-purple-600" />
              Power triangle
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-purple-700">S · Apparent</div>
                <div className="text-xl font-bold text-purple-900 tabular-nums">{calc.apparentPowerKVA.toFixed(1)}</div>
                <div className="text-[11px] text-purple-700">kVA</div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">P · Real</div>
                <div className="text-xl font-bold text-emerald-900 tabular-nums">{calc.powerKW.toFixed(1)}</div>
                <div className="text-[11px] text-emerald-700">kW</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="text-[10px] uppercase font-bold tracking-wider text-blue-700">Q · Reactive</div>
                <div className="text-xl font-bold text-blue-900 tabular-nums">{(calc.reactivePower / 1000).toFixed(1)}</div>
                <div className="text-[11px] text-blue-700">kVAR</div>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded text-center text-xs text-gray-600">
              PF = P / S = <strong className="text-purple-700">{pf.toFixed(3)} ({(pf * 100).toFixed(1)}%)</strong>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Line vs phase values · {conn === 'wye' ? 'Wye (Y)' : 'Delta (Δ)'}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Line voltage', detail: 'Between any 2 phases', factor: `${fmt(Math.round(calc.lineVoltage))}V` },
                { label: 'Phase voltage', detail: 'Phase to neutral (Y) / phase winding (Δ)', factor: `${fmt(Math.round(calc.phaseVoltage))}V` },
                { label: 'Line current', detail: 'In the supply conductor', factor: `${calc.lineCurrent.toFixed(1)}A` },
                { label: 'Phase current', detail: 'Through each phase winding', factor: `${calc.phaseCurrent.toFixed(1)}A` },
              ]}
              totals={[
                { label: 'Per-phase power', value: `${(calc.powerPerPhase / 1000).toFixed(2)} kW`, valueClass: 'text-purple-700' },
              ]}
            />
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-emerald-700" />
              Energy consumption (continuous operation)
            </h4>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Per hour</span><strong>{calc.powerKW.toFixed(3)} kWh · ${calc.hourlyCost.toFixed(3)}</strong></div>
              <div className="flex justify-between"><span>Per day (24h)</span><strong>{calc.dailyKWh.toFixed(1)} kWh · ${(calc.dailyKWh * 0.16).toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Per month (30d)</span><strong>{fmt(Math.round(calc.monthlyKWh))} kWh · ${fmtMoney(calc.monthlyKWh * 0.16)}</strong></div>
              <div className="flex justify-between"><span>Per year (365d)</span><strong>{fmt(Math.round(calc.yearlyKWh))} kWh · ${fmtMoney(calc.yearlyKWh * 0.16)}</strong></div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 leading-snug">Commercial accounts also pay demand charges (kW peak) — low PF amplifies these.</p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 text-amber-700" />
              Common 3-phase voltages
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>208V</span><span>Commercial low-V</span></div>
              <div className="flex justify-between"><span>240V</span><span>Small commercial</span></div>
              <div className="flex justify-between"><span>277V</span><span>High-leg / lighting</span></div>
              <div className="flex justify-between"><span>480V</span><span>Most common industrial</span></div>
              <div className="flex justify-between"><span>600V</span><span>Heavy industrial (CA, Canada)</span></div>
              <div className="flex justify-between"><span>4160V+</span><span>Medium-V distribution</span></div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Three-phase electrical notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Three-phase math assumes <strong>balanced loads</strong> — if currents differ by &gt;5% across phases, use per-phase analysis</li>
            <li>Motor inrush (starting) current is 3–6× FLA for 1–10 seconds — sized conductors must handle this</li>
            <li>Low PF triggers utility demand charges + larger conductor sizing — PF correction capacitors usually pay back in 1–3 yr at industrial scale</li>
            <li>Wire sizing here is a rough copper @75°C estimate — always derate per NEC Article 310 for ambient temp + bundling</li>
            <li>For critical work, get a licensed electrical engineer's stamp</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}

