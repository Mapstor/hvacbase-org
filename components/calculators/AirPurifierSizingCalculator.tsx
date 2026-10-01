'use client';

import { useState, useMemo } from 'react';
import {
  Wind,
  Home,
  Gauge,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
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

const DEFAULTS = {
  roomLength: '12',
  roomWidth: '10',
  ceilingHeight: '8',
  achTarget: '', // optional higher target, empty by default
};

export default function AirPurifierSizingCalculator() {
  const [roomLength, setRoomLength] = useState(DEFAULTS.roomLength);
  const [roomWidth, setRoomWidth] = useState(DEFAULTS.roomWidth);
  const [ceilingHeight, setCeilingHeight] = useState(DEFAULTS.ceilingHeight);
  const [achTarget, setAchTarget] = useState(DEFAULTS.achTarget);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    roomLength, roomWidth, ceilingHeight, achTarget,
  });

  const L = Math.max(parseFloat(src.roomLength) || 0, 0);
  const W = Math.max(parseFloat(src.roomWidth) || 0, 0);
  const H = Math.max(parseFloat(src.ceilingHeight) || 0, 0);
  const ach = Math.max(parseFloat(src.achTarget) || 0, 0);

  const handleReset = () => {
    setRoomLength(DEFAULTS.roomLength);
    setRoomWidth(DEFAULTS.roomWidth);
    setCeilingHeight(DEFAULTS.ceilingHeight);
    setAchTarget(DEFAULTS.achTarget);
    clear();
  };

  const calc = useMemo(() => {
    const area = L * W;
    const volume = area * H;
    // AHAM two-thirds rule: an air cleaner's smoke CADR should be at least
    // two-thirds of the room's floor area in square feet, for an 8-foot ceiling
    // (about 5 air changes per hour). Scale by ceiling height ÷ 8 for taller rooms.
    const smokeCadr = area * (2 / 3) * (H / 8);
    // Equivalent air changes per hour for that CADR in this room.
    const smokeAch = volume > 0 ? (smokeCadr * 60) / volume : 0;
    // Optional user-chosen higher target: CADR = volume × ACH ÷ 60.
    const hasTarget = ach > 0;
    const targetCadr = hasTarget ? (volume * ach) / 60 : 0;
    const requiredCadr = hasTarget ? targetCadr : smokeCadr;
    const equivalentAch = hasTarget ? ach : smokeAch;
    return { area, volume, smokeCadr, smokeAch, hasTarget, targetCadr, requiredCadr, equivalentAch };
  }, [L, W, H, ach]);

  const fit =
    calc.requiredCadr === 0 ? { tone: 'warn' as const, text: 'Enter room dimensions' } :
    calc.hasTarget ? { tone: 'good' as const, text: `Sized to your ${calc.equivalentAch.toFixed(1)} ACH target` } :
    { tone: 'good' as const, text: `AHAM two-thirds rule, about ${calc.smokeAch.toFixed(1)} ACH` };

  return (
    <CalcShell
      Icon={Wind}
      title="Air Purifier Sizing Calculator"
      subtitle="Smoke CADR from AHAM's two-thirds rule."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Room dimensions" subtitle="Length × width × ceiling" Icon={Home} accent={ACCENT} />
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Length</label>
            <NumberInput value={roomLength} onChange={setRoomLength} min={5} max={50} suffix="ft" ariaLabel="Length" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Width</label>
            <NumberInput value={roomWidth} onChange={setRoomWidth} min={5} max={50} suffix="ft" ariaLabel="Width" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Ceiling height</label>
            <NumberInput value={ceilingHeight} onChange={setCeilingHeight} min={7} max={20} suffix="ft" ariaLabel="Ceiling height" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="px-2 py-1 bg-gray-50 rounded"><span className="text-gray-500">Floor area:</span> <strong className="text-gray-800">{fmt(Math.round(calc.area))} sq ft</strong></div>
          <div className="px-2 py-1 bg-gray-50 rounded"><span className="text-gray-500">Volume:</span> <strong className="text-gray-800">{fmt(Math.round(calc.volume))} cu ft</strong></div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Higher target (optional)" subtitle="Air changes per hour, if you want more than the AHAM rule" Icon={Gauge} accent={ACCENT} />
        <div className="max-w-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Higher target (air changes per hour)
            <InfoTip label="higher ACH target">
              Leave blank to use AHAM's two-thirds smoke-CADR rule (about 5 air changes per hour at an 8-foot ceiling). Enter a higher number for a faster clean rate. The required CADR then becomes volume × ACH ÷ 60.
            </InfoTip>
          </label>
          <NumberInput
            value={achTarget}
            onChange={setAchTarget}
            min={0}
            max={30}
            suffix="ACH"
            placeholder="optional"
            ariaLabel="Higher air changes per hour target"
            accent={ACCENT}
            className="max-w-none"
          />
          <p className="text-xs text-gray-500 mt-1.5">Your choice, for example for allergies or wildfire smoke.</p>
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
          eyebrow="Required smoke CADR"
          value={`${Math.round(calc.requiredCadr)}`}
          unit={`CFM · ${calc.equivalentAch.toFixed(1)} ACH`}
          secondaryText={
            calc.hasTarget ? (
              <>
                Your {calc.equivalentAch.toFixed(1)} ACH target needs <strong>{Math.round(calc.targetCadr)} CFM</strong> (volume × ACH ÷ 60).
                AHAM's two-thirds rule calls for <strong>{Math.round(calc.smokeCadr)} CFM</strong> of smoke CADR for this {fmt(Math.round(calc.area))} sq ft room, about {calc.smokeAch.toFixed(1)} air changes per hour.
              </>
            ) : (
              <>
                For your {fmt(Math.round(calc.area))} sq ft room with a {H}-ft ceiling, AHAM's two-thirds rule calls for a smoke CADR of at least <strong>{Math.round(calc.smokeCadr)} CFM</strong>,
                about {calc.smokeAch.toFixed(1)} air changes per hour.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'AHAM smoke CADR', value: `${Math.round(calc.smokeCadr)} CFM` },
            { label: 'Equivalent ACH', value: `${calc.equivalentAch.toFixed(1)}` },
            calc.hasTarget
              ? { label: 'Your target CADR', value: `${Math.round(calc.targetCadr)} CFM` }
              : { label: 'Floor area', value: `${fmt(Math.round(calc.area))} sq ft` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-blue-600" />
              CADR calculation
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Floor area', detail: `${L} × ${W}`, factor: `${fmt(Math.round(calc.area))} sq ft` },
                { label: 'Two-thirds rule', detail: 'area × 2/3', factor: `${fmt(Math.round((calc.area * 2) / 3))} CFM` },
                { label: 'Ceiling adjustment', detail: `${H} ft ÷ 8`, factor: `× ${(H / 8).toFixed(2)}` },
                ...(calc.hasTarget
                  ? [{ label: 'Your ACH target', detail: 'volume × ACH ÷ 60', factor: `${fmt(Math.round(calc.targetCadr))} CFM` }]
                  : []),
              ]}
              totals={[
                { label: 'Required smoke CADR', value: `${Math.round(calc.requiredCadr)} CFM`, valueClass: 'text-blue-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-blue-600" />
              How AHAM sizing works
            </h4>
            <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
              <p>AHAM's guidance: an air cleaner's smoke CADR should be at least two-thirds of the room's floor area in square feet, for an 8-foot ceiling (about 5 air changes per hour).</p>
              <p>For a taller ceiling, scale the target by ceiling height ÷ 8.</p>
              <div className="mt-2 bg-blue-50 rounded-lg p-3 text-[11px] text-blue-800">
                AHAM rates three CADRs (smoke, dust, pollen); the two-thirds rule uses the smoke CADR.
              </div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="What CADR does and doesn't cover">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>CADR is AHAM-certified for smoke, dust, and pollen; gaseous pollutants such as VOCs need activated carbon, not a higher CADR</li>
            <li>The two-thirds rule assumes an 8-foot ceiling and targets about 5 air changes per hour; taller rooms scale by ceiling height ÷ 8</li>
            <li>For allergies or wildfire smoke, set a higher ACH target above and size to that CADR instead</li>
            <li>HEPA filters need replacing every 6 to 12 months and pre-filters every 3 months; factor that into running cost</li>
            <li>A unit's labeled coverage area is set by its maker; compare its smoke CADR against the figure here</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
