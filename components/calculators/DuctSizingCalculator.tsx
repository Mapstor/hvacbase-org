'use client';

import { useState, useMemo } from 'react';
import { Wind, Gauge, Ruler, AlertTriangle } from 'lucide-react';
import EmbedCode from '../EmbedCode';
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

const ACCENT = 'blue' as const;

// ─────────────────────────────────────────────────────────────────────────
// Round sheet-metal duct sizing, standard air.
//   density  ρ = 0.075 lb/ft³
//   viscosity μ = 1.22e-5 lb/(ft·s)
//   roughness ε = 0.0003 ft (galvanized steel)
// Friction per 100 ft by Darcy-Weisbach with the Swamee-Jain friction factor:
//   f = 0.25 / [log10(ε/(3.7D) + 5.74/Re^0.9)]²
// Pressure drop ΔP = f·(L/D)·(ρV²)/(2·gc); 1 in. w.c. = 5.202 lbf/ft².
// Solve the exact diameter for the target friction by bisection, then round
// up to the next standard size. (ASHRAE Fundamentals, Duct Design.)
// ─────────────────────────────────────────────────────────────────────────
const RHO = 0.075;        // lb/ft³
const MU = 1.22e-5;       // lb/(ft·s)
const EPS = 0.0003;       // ft (galvanized steel)
const GC = 32.174;        // lbm·ft/(lbf·s²)
const INWC = 5.202;       // lbf/ft² per 1 in. w.c.
const STANDARD_SIZES = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24]; // inches
const RECT_HEIGHTS = [6, 8, 10, 12]; // inches
const VELOCITY_FLAG_FPM = 900;

function velocityFpm(Qcfm: number, Dft: number): number {
  const area = (Math.PI * Dft * Dft) / 4;
  return area > 0 ? Qcfm / area : 0;
}
function reynolds(Qcfm: number, Dft: number): number {
  const Vfps = velocityFpm(Qcfm, Dft) / 60;
  return (RHO * Vfps * Dft) / MU;
}
function swameeJain(Dft: number, Re: number): number {
  const t = Math.log10(EPS / (3.7 * Dft) + 5.74 / Math.pow(Re, 0.9));
  return 0.25 / (t * t);
}
// Friction per 100 ft, in inches of water column.
function friction100(Qcfm: number, Dft: number): number {
  const Vfps = velocityFpm(Qcfm, Dft) / 60;
  const Re = reynolds(Qcfm, Dft);
  const f = swameeJain(Dft, Re);
  const dP = f * (100 / Dft) * (RHO * Vfps * Vfps) / (2 * GC); // lbf/ft² over 100 ft
  return dP / INWC;
}
// Exact round diameter (inches) that produces the target friction, by bisection.
// Friction falls as diameter grows, so bisect on that monotonic relationship.
function solveDiameterInches(Qcfm: number, targetFriction: number): number {
  if (Qcfm <= 0 || targetFriction <= 0) return 0;
  let lo = 0.05, hi = 6.0; // feet
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (friction100(Qcfm, mid) > targetFriction) lo = mid; else hi = mid;
  }
  return ((lo + hi) / 2) * 12;
}
function roundUpStandard(inches: number): number {
  for (const s of STANDARD_SIZES) if (s >= inches - 1e-9) return s;
  return STANDARD_SIZES[STANDARD_SIZES.length - 1];
}
// Huebscher equivalent round diameter for a rectangular duct a×b (inches).
function huebscher(a: number, b: number): number {
  return (1.30 * Math.pow(a * b, 0.625)) / Math.pow(a + b, 0.25);
}
// Smallest even-inch width whose equivalent diameter reaches at least targetDia.
function smallestEvenWidth(height: number, targetDia: number): { w: number; De: number } | null {
  for (let w = 4; w <= 160; w += 2) {
    const De = huebscher(w, height);
    if (De >= targetDia - 1e-9) return { w, De };
  }
  return null;
}

const DEFAULTS = {
  mode: 'cfm' as 'cfm' | 'tons',
  airflow: '400',
  tons: '3',
  cfmPerTon: '400',
  friction: '0.08',
};

export default function DuctSizingCalculator() {
  const [mode, setMode] = useState<'cfm' | 'tons'>(DEFAULTS.mode);
  const [airflow, setAirflow] = useState(DEFAULTS.airflow);
  const [tons, setTons] = useState(DEFAULTS.tons);
  const [cfmPerTon, setCfmPerTon] = useState(DEFAULTS.cfmPerTon);
  const [friction, setFriction] = useState(DEFAULTS.friction);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    mode, airflow, tons, cfmPerTon, friction,
  });

  const handleReset = () => {
    setMode(DEFAULTS.mode);
    setAirflow(DEFAULTS.airflow);
    setTons(DEFAULTS.tons);
    setCfmPerTon(DEFAULTS.cfmPerTon);
    setFriction(DEFAULTS.friction);
    clear();
  };

  const calc = useMemo(() => {
    const cfmPerTonNum = Math.min(Math.max(parseFloat(src.cfmPerTon) || 400, 350), 450);
    const tonsNum = Math.max(parseFloat(src.tons) || 0, 0);
    const airflowNum = Math.max(parseFloat(src.airflow) || 0, 0);
    const Qcfm = src.mode === 'tons' ? tonsNum * cfmPerTonNum : airflowNum;
    const target = Math.min(Math.max(parseFloat(src.friction) || 0.08, 0.05), 0.15);

    const exactDia = solveDiameterInches(Qcfm, target);
    const stdSize = roundUpStandard(exactDia);
    const stdFt = stdSize / 12;
    const velocity = velocityFpm(Qcfm, stdFt);
    const actualFriction = friction100(Qcfm, stdFt);
    const noisy = velocity > VELOCITY_FLAG_FPM;

    const rect = RECT_HEIGHTS.map((h) => {
      const r = smallestEvenWidth(h, exactDia);
      return { h, w: r?.w ?? null, De: r?.De ?? null };
    });

    return { Qcfm, cfmPerTonNum, target, exactDia, stdSize, velocity, actualFriction, noisy, rect };
  }, [src.mode, src.airflow, src.tons, src.cfmPerTon, src.friction]);

  const valid = calc.Qcfm > 0;

  return (
    <CalcShell
      Icon={Wind}
      title="Duct Sizing Calculator"
      subtitle="Round and rectangular duct size from airflow and a design friction rate."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Airflow */}
      <section>
        <SectionHeader step={1} title="Airflow" subtitle="Enter CFM directly, or size it from tonnage" Icon={Wind} accent={ACCENT} />

        <div className="space-y-5">
          <Segmented
            value={mode}
            onChange={(v) => setMode(v)}
            options={[
              { value: 'cfm', name: 'Airflow (CFM)' },
              { value: 'tons', name: 'By tonnage' },
            ]}
            ariaLabel="Airflow input mode"
            accent={ACCENT}
          />

          {mode === 'cfm' ? (
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Airflow
                <InfoTip label="airflow">
                  The air the duct must carry, in cubic feet per minute. A branch to one room might be 100 to 150 CFM; a trunk carries the whole system&rsquo;s airflow.
                </InfoTip>
              </label>
              <NumberInput value={airflow} onChange={setAirflow} min={20} max={5000} suffix="CFM" ariaLabel="Airflow in CFM" accent={ACCENT} />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">System size</label>
                <NumberInput value={tons} onChange={setTons} min={0.5} max={10} suffix="tons" ariaLabel="System size in tons" accent={ACCENT} />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  CFM per ton
                  <InfoTip label="cfm per ton">
                    Typical design airflow is about 400 CFM per ton (350 to 450). Lower for humid climates, higher for dry. Total airflow = tons × CFM per ton.
                  </InfoTip>
                </label>
                <NumberInput value={cfmPerTon} onChange={setCfmPerTon} min={350} max={450} suffix="CFM/ton" ariaLabel="CFM per ton (typical design airflow)" accent={ACCENT} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 2 — Friction rate */}
      <section>
        <SectionHeader step={2} title="Design friction rate" subtitle="Static pressure lost per 100 ft of duct" Icon={Gauge} accent={ACCENT} />
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Friction rate
            <InfoTip label="friction rate">
              Inches of water column lost per 100 ft of duct. Residential design commonly uses 0.08 to 0.10 in. w.c. per 100 ft (ACCA Manual D). Lower means bigger, quieter ducts.
            </InfoTip>
          </label>
          <NumberInput value={friction} onChange={setFriction} min={0.05} max={0.15} suffix="in. w.c./100 ft" ariaLabel="Design friction rate" accent={ACCENT} className="max-w-xs" />
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
      {hasResult && valid && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow={`Round duct for ${fmt(Math.round(calc.Qcfm))} CFM at ${calc.target.toFixed(2)} in. w.c./100 ft`}
          value={`${calc.stdSize}`}
          unit="in round (next standard size up)"
          secondaryText={
            <>
              The exact diameter that hits your friction rate is {calc.exactDia.toFixed(2)} in; the next standard size up is {calc.stdSize} in.
              At {calc.stdSize} in the air moves at {fmt(Math.round(calc.velocity))} fpm and the actual friction is {calc.actualFriction.toFixed(3)} in. w.c./100 ft.
            </>
          }
          fitTone={calc.noisy ? 'warn' : 'good'}
          fitText={calc.noisy ? `${fmt(Math.round(calc.velocity))} fpm — may be noisy` : `${fmt(Math.round(calc.velocity))} fpm — within range`}
          warning={calc.noisy ? 'The calculator flags velocities above 900 fpm, which can be noisy. Consider the next size up or a lower friction rate.' : undefined}
          sidePanel={[
            { label: 'Exact diameter', value: `${calc.exactDia.toFixed(2)} in` },
            { label: 'Standard size', value: `${calc.stdSize} in` },
            { label: 'Velocity', value: `${fmt(Math.round(calc.velocity))} fpm`, valueClass: calc.noisy ? 'text-amber-700' : 'text-gray-900' },
            { label: 'Actual friction', value: `${calc.actualFriction.toFixed(3)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-blue-600" />
              At the {calc.stdSize} in standard size
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Airflow', detail: src.mode === 'tons' ? `${fmt(parseFloat(src.tons) || 0)} tons × ${calc.cfmPerTonNum} CFM/ton` : 'entered directly', factor: `${fmt(Math.round(calc.Qcfm))} CFM` },
                { label: 'Exact diameter', detail: `for ${calc.target.toFixed(2)} in. w.c./100 ft`, factor: `${calc.exactDia.toFixed(2)} in` },
                { label: 'Rounded up to', detail: 'next standard round size', factor: `${calc.stdSize} in` },
                { label: 'Velocity', detail: calc.noisy ? 'above 900 fpm, may be noisy' : 'within a quiet range', factor: `${fmt(Math.round(calc.velocity))} fpm` },
                { label: 'Actual friction', detail: 'at the standard size', factor: `${calc.actualFriction.toFixed(3)} in. w.c./100 ft` },
              ]}
              totals={[]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Ruler className="w-4 h-4 text-blue-600" />
              Rectangular equivalents
            </h4>
            <p className="text-[11px] text-gray-500 mb-2 leading-snug">
              The smallest even-inch width at each common height whose equivalent round diameter reaches the exact {calc.exactDia.toFixed(2)} in (Huebscher formula).
            </p>
            <BreakdownTable
              rows={calc.rect.map((r) => ({
                label: r.w ? `${r.w} × ${r.h} in` : `— × ${r.h} in`,
                detail: `${r.h} in tall`,
                factor: r.De ? `De ${r.De.toFixed(2)} in` : 'n/a',
              }))}
              totals={[]}
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-blue-700 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-900 leading-snug">
            Sizes are for smooth sheet-metal duct. Flexible duct has more friction; size it larger.
          </p>
        </div>

        <DisclaimerBox title="How this is figured">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Friction per 100 ft uses the <strong>Darcy-Weisbach</strong> equation with the <strong>Swamee-Jain</strong> friction factor, for standard air (density 0.075 lb/ft³, viscosity 1.22×10⁻⁵ lb/ft·s) in galvanized steel duct (roughness 0.0003 ft).</li>
            <li>The tool solves the exact round diameter for your friction rate, then rounds up to the next standard size, so the built duct runs a little below your target friction.</li>
            <li>It flags velocities above <strong>900 fpm</strong>, which can be noisy in living space. Trunks tolerate more; branches near registers should stay lower.</li>
            <li>Rectangular equivalents use the <strong>Huebscher</strong> equal-friction formula, De = 1.30 (a·b)<sup>0.625</sup> / (a+b)<sup>0.25</sup>.</li>
            <li>This sizes a single straight run. A full system also needs total effective length and fitting losses; see <strong>ACCA Manual D</strong> for the whole-house method.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>

      <EmbedCode calculatorType="duct-sizing-calculator" title="Duct Sizing Calculator" />
    </CalcShell>
  );
}
