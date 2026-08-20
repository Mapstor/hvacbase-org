'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  BarChart,
  TrendingUp,
  Settings,
  Activity,
  AlertTriangle,
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
  electricRate: '0.12', // industrial 3-phase averages lower than residential — user should set to their bill
};

export default function ThreePhasePowerCalculator() {
  const [voltage, setVoltage] = useState(DEFAULTS.voltage);
  const [current, setCurrent] = useState(DEFAULTS.current);
  const [powerFactor, setPowerFactor] = useState(DEFAULTS.powerFactor);
  const [connectionType, setConnectionType] = useState(DEFAULTS.connectionType);
  const [inputType, setInputType] = useState(DEFAULTS.inputType);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    voltage, current, powerFactor, connectionType, inputType, electricRate,
  });

  const volts = Math.max(parseFloat(src.voltage) || 0, 0);
  const amps = Math.max(parseFloat(src.current) || 0, 0);
  const pf = Math.min(Math.max(parseFloat(src.powerFactor) || 1, 0.1), 1);
  const conn = src.connectionType;
  const mode = src.inputType;
  const rate = Math.max(parseFloat(src.electricRate) || 0, 0);

  const handleReset = () => {
    setVoltage(DEFAULTS.voltage);
    setCurrent(DEFAULTS.current);
    setPowerFactor(DEFAULTS.powerFactor);
    setConnectionType(DEFAULTS.connectionType);
    setInputType(DEFAULTS.inputType);
    setElectricRate(DEFAULTS.electricRate);
    clear();
  };

  const calc = useMemo(() => {
    // Core 3-phase power math — verified against ANSI/IEEE 100 standard.
    // Balanced-load assumption applies; line/phase-input formulas give the
    // same total apparent power by construction.
    const apparentPower = mode === 'line' ? Math.sqrt(3) * volts * amps : 3 * volts * amps;
    const realPower = apparentPower * pf;
    const reactivePower = Math.sqrt(Math.max(Math.pow(apparentPower, 2) - Math.pow(realPower, 2), 0));

    // Line vs phase V/I conversions per connection topology.
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
    const powerHP = realPower / 746;          // NIST: 1 HP (mechanical) = 745.7 W
    const apparentPowerKVA = apparentPower / 1000;

    // Energy consumption ASSUMES continuous 24/7 operation.
    const dailyKWh = (realPower * 24) / 1000;
    const monthlyKWh = dailyKWh * 30;
    // Fixed: was dailyKWh × 360 (12 × 30-day months); real year is 365 days.
    const yearlyKWh = dailyKWh * 365;

    // Cost uses user's electricity rate (was hard-coded $0.16/kWh).
    const hourlyCost = powerKW * rate;
    const dailyCost = dailyKWh * rate;
    const monthlyCost = monthlyKWh * rate;
    const yearlyCost = yearlyKWh * rate;

    return {
      apparentPower, realPower, reactivePower,
      lineVoltage, phaseVoltage, lineCurrent, phaseCurrent,
      powerPerPhase, powerKW, powerHP, apparentPowerKVA,
      dailyKWh, monthlyKWh, yearlyKWh,
      hourlyCost, dailyCost, monthlyCost, yearlyCost,
    };
  }, [volts, amps, pf, conn, mode, rate]);

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

      <section>
        <SectionHeader step={3} title="Your electricity rate" subtitle="For the energy-cost estimates below" Icon={TrendingUp} accent={ACCENT} />
        <div className="max-w-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Electricity rate
            <InfoTip label="electricity rate">
              Check your latest bill. US industrial-3-phase rates typically run $0.08–0.15/kWh but vary widely: California and the Northeast run higher; the Southeast lower. Commercial and industrial accounts also pay <em>demand charges</em> (kW peak) that this calculator does not model.
            </InfoTip>
          </label>
          <NumberInput
            value={electricRate}
            onChange={setElectricRate}
            min={0.03}
            max={0.5}
            suffix="$/kWh"
            ariaLabel="Electricity rate"
            accent={ACCENT}
            className="max-w-xs"
          />
          <p className="text-xs text-gray-500 mt-1.5">Default 0.12 = rough US industrial average. Enter your own for accurate cost.</p>
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
            { label: 'Line current', value: `${calc.lineCurrent.toFixed(1)}A` },
            { label: 'Daily (24/7)', value: `${calc.dailyKWh.toFixed(1)} kWh` },
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
              Energy consumption (continuous 24/7 operation)
            </h4>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Per hour</span><strong>{calc.powerKW.toFixed(3)} kWh · ${calc.hourlyCost.toFixed(3)}</strong></div>
              <div className="flex justify-between"><span>Per day (24 hr)</span><strong>{calc.dailyKWh.toFixed(1)} kWh · ${calc.dailyCost.toFixed(2)}</strong></div>
              <div className="flex justify-between"><span>Per month (30 days)</span><strong>{fmt(Math.round(calc.monthlyKWh))} kWh · ${fmtMoney(calc.monthlyCost)}</strong></div>
              <div className="flex justify-between"><span>Per year (365 days)</span><strong>{fmt(Math.round(calc.yearlyKWh))} kWh · ${fmtMoney(calc.yearlyCost)}</strong></div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 leading-snug">
              At <strong>${rate.toFixed(2)}/kWh</strong>. Costs assume 24/7 continuous operation — adjust by your actual duty cycle.
              Commercial/industrial accounts also pay <strong>demand charges</strong> (kW peak) that this calculator does not model — low PF amplifies these.
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4 text-amber-700" />
              Common 3-phase voltages
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>208V wye</span><span>Small commercial (208/120 L-N)</span></div>
              <div className="flex justify-between"><span>240V delta</span><span>Older commercial (240/120 with high leg = 208V)</span></div>
              <div className="flex justify-between"><span>277V (wye phase-to-N)</span><span>Commercial lighting on 480V systems</span></div>
              <div className="flex justify-between"><span>480V wye</span><span>Most common US industrial</span></div>
              <div className="flex justify-between"><span>600V wye</span><span>Heavy industrial (typical in Canada)</span></div>
              <div className="flex justify-between"><span>4160V+</span><span>Medium-V distribution</span></div>
            </div>
          </div>
        </div>

        {/* SAFETY BLOCK — replaces the old "estimated wire size" output from
            the ResultHero sidePanel. Rationale: industrial 480V/600V wire
            sizing is safety-critical (a wrong gauge can start a fire or kill
            an installer). The previous rounded-down AWG table didn't cite
            which ampacity standard, didn't account for NEC 310.15(B) ambient
            temperature correction, 310.15(C) more-than-3-conductors bundling,
            240.4(D) small-conductor rules (12 AWG max 20A regardless of
            insulation), 430.22 motor branch circuits (125% × FLC), or 210.19
            voltage drop. The line current calculation above IS the legitimate
            output — that's the number an electrician takes to the NEC ampacity
            table for their specific installation. */}
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Wire, overcurrent protection, and voltage-drop sizing — follow NEC by a qualified person
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            The <strong>line current</strong> shown above ({calc.lineCurrent.toFixed(1)}A at {mode === 'line' ? volts : Math.round(calc.lineVoltage)}V L-L) is
            the correct starting input for sizing your conductors and protective devices. Use it against the actual code sections
            for your installation — <strong>this calculator deliberately does not emit a specific wire gauge or breaker size.</strong>
          </p>
          <ul className="mt-2 space-y-1 text-xs text-gray-700 list-disc list-outside ml-5 leading-relaxed">
            <li><strong>NEC 310.16</strong> — ampacity of insulated conductors (copper vs aluminum, 60/75/90°C insulation, ambient temp)</li>
            <li><strong>NEC 310.15(B)</strong> — ambient temperature correction factors (installations above 30°C ambient derate)</li>
            <li><strong>NEC 310.15(C)</strong> — adjustment for more than three current-carrying conductors bundled or in raceway</li>
            <li><strong>NEC 240.4(D)</strong> — small-conductor rules override the ampacity table: 14 AWG max 15A, 12 AWG max 20A, 10 AWG max 30A regardless of insulation temperature rating</li>
            <li><strong>NEC 430.22</strong> — motor branch circuit conductors must be sized at <strong>125% × motor full-load current</strong>, not the raw current shown above</li>
            <li><strong>NEC 210.19 / 215.2</strong> — voltage drop should be ≤3% for branch circuits, ≤5% total feeder + branch</li>
          </ul>
          <p className="text-xs text-gray-700 leading-relaxed mt-2">
            Industrial 3-phase installations require an electrical engineer's stamp for permit review in most jurisdictions —
            do not act on a rule-of-thumb gauge from any calculator for permanent 480V/600V work.
          </p>
        </div>

        <DisclaimerBox title="Three-phase electrical notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Three-phase math assumes <strong>balanced loads</strong> — if currents differ by &gt;5% across phases, use per-phase analysis</li>
            <li>Motor inrush (starting) current is 3–6× FLA for 1–10 seconds — sized conductors AND breakers must handle this per NEC 430</li>
            <li>Low PF triggers utility demand charges + larger conductor sizing — PF correction capacitors usually pay back in 1–3 yr at industrial scale</li>
            <li>Energy figures assume continuous 24/7 operation — adjust by your actual duty cycle for real bill impact</li>
            <li>Costs use your entered rate; commercial/industrial accounts also pay demand charges (kW peak) not modeled here</li>
            <li>For critical work, get a licensed electrical engineer's stamp — this calculator sizes power, not conductors</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
