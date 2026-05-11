'use client';

import { useState, useMemo } from 'react';
import {
  Battery,
  Zap,
  Clock,
  TrendingUp,
  Gauge,
  Lightbulb,
  Refrigerator,
  Wind,
} from 'lucide-react';
import {
  fmt,
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
} from './_shared';

const ACCENT = 'blue' as const;

const batterySizes = [
  { value: '35', name: '35Ah', sub: 'Group 24' },
  { value: '55', name: '55Ah', sub: 'Group 24F' },
  { value: '75', name: '75Ah', sub: 'Group 31' },
  { value: '100', name: '100Ah', sub: 'Deep cycle' },
  { value: '150', name: '150Ah', sub: 'Large deep cycle' },
  { value: '200', name: '200Ah', sub: 'Extra large' },
];

const commonLoads = [
  { value: 'led-lights', name: 'LED strip (5m)', summary: '12V — 24W', watts: 24, Icon: Lightbulb },
  { value: 'car-fridge', name: '12V fridge', summary: '12V — 45W', watts: 45, Icon: Refrigerator },
  { value: 'fan', name: '12V fan', summary: '12V — 15W', watts: 15, Icon: Wind },
  { value: 'water-pump', name: 'Water pump', summary: '12V — 60W', watts: 60, Icon: Wind },
  { value: 'radio', name: 'CB / ham radio', summary: '12V — 25W', watts: 25, Icon: Wind },
  { value: 'inverter-small', name: '300W inverter load', summary: 'AC via inverter', watts: 300, Icon: Zap },
  { value: 'inverter-medium', name: '600W inverter load', summary: 'AC via inverter', watts: 600, Icon: Zap },
  { value: 'winch', name: '12V winch (peak)', summary: '12V — 1200W surge', watts: 1200, Icon: Wind },
];

export default function Battery12VWattsCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState('100');
  const [loadType, setLoadType] = useState('led-lights');
  const [customWatts, setCustomWatts] = useState('100');
  const [operatingHours, setOperatingHours] = useState('4');
  const [depthOfDischarge, setDepthOfDischarge] = useState('50');
  const [batteryEfficiency, setBatteryEfficiency] = useState('85');
  const [temperature, setTemperature] = useState('68');

  const load = commonLoads.find((l) => l.value === loadType);
  const isCustom = loadType === 'custom';
  const loadWatts = isCustom ? Math.max(parseFloat(customWatts) || 0, 1) : load?.watts || 0;
  const totalCapacity = Math.max(parseFloat(batteryCapacity) || 0, 1);
  const requestedHours = Math.max(parseFloat(operatingHours) || 0, 0.1);
  const dod = Math.min(Math.max(parseFloat(depthOfDischarge) || 50, 20), 100);
  const battEff = Math.min(Math.max(parseFloat(batteryEfficiency) || 85, 50), 100);
  const tempF = parseFloat(temperature) || 68;

  const calc = useMemo(() => {
    const currentAmps = loadWatts / 12;
    const usableCapacity = totalCapacity * (dod / 100);
    const tempDerating = tempF < 32 ? 0.7 : tempF < 50 ? 0.85 : tempF < 80 ? 1.0 : 0.95;
    const adjustedCapacity = usableCapacity * tempDerating;
    const runtimeHours = currentAmps > 0 ? (adjustedCapacity * (battEff / 100)) / currentAmps : 0;
    const canMeet = runtimeHours >= requestedHours;
    const dailyWh = loadWatts * requestedHours;
    const requiredBatteryCapacity = (dailyWh / 12) / (dod / 100);
    const voltageDropEstimate = currentAmps * 0.02;
    const loadVoltage = 12 - voltageDropEstimate;
    const recommendedChargeRate = totalCapacity * 0.1;
    const chargeTimeHours = recommendedChargeRate > 0 ? (totalCapacity - adjustedCapacity) / recommendedChargeRate : 0;
    const wireSize = currentAmps <= 10 ? '14 AWG' : currentAmps <= 15 ? '12 AWG' : currentAmps <= 20 ? '10 AWG'
      : currentAmps <= 30 ? '8 AWG' : currentAmps <= 50 ? '6 AWG' : currentAmps <= 75 ? '4 AWG'
      : currentAmps <= 100 ? '2 AWG' : '1 AWG+';
    const fuseRating = Math.ceil(currentAmps * 1.25);
    const parallelBatteries = Math.max(1, Math.ceil(requiredBatteryCapacity / totalCapacity));
    return { currentAmps, usableCapacity, tempDerating, adjustedCapacity, runtimeHours, canMeet, dailyWh, requiredBatteryCapacity, voltageDropEstimate, loadVoltage, recommendedChargeRate, chargeTimeHours, wireSize, fuseRating, parallelBatteries };
  }, [loadWatts, totalCapacity, requestedHours, dod, battEff, tempF]);

  const fit =
    !calc.canMeet ? { tone: 'bad' as const, text: `Need ${calc.parallelBatteries}× battery in parallel for ${requestedHours} hr` } :
    calc.runtimeHours >= requestedHours * 2 ? { tone: 'good' as const, text: 'Excellent reserve — 2× your need' } :
    { tone: 'good' as const, text: 'Battery covers requested runtime' };

  return (
    <CalcShell
      Icon={Battery}
      title="12V Battery Watts Calculator"
      subtitle="Runtime + circuit sizing for 12V DC systems. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Battery & load" subtitle="What you've got + what you're running" Icon={Battery} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Battery capacity</label>
            <Segmented value={batteryCapacity} onChange={setBatteryCapacity} options={batterySizes} ariaLabel="Battery capacity" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Load type</label>
            <CardChoice
              value={loadType}
              onChange={setLoadType}
              options={[
                ...commonLoads.map(({ value, name, summary, Icon }) => ({ value, name, summary, Icon })),
                { value: 'custom', name: 'Custom', summary: 'Enter watts' },
              ]}
              ariaLabel="Load type"
              accent={ACCENT}
              columns={3}
            />
          </div>
          {isCustom && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Custom load (watts)</label>
              <NumberInput value={customWatts} onChange={setCustomWatts} min={1} max={2000} suffix="W" ariaLabel="Custom watts" accent={ACCENT} />
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Operating conditions" subtitle="Runtime, DOD, temperature" Icon={Gauge} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Operating hours/day</label>
            <NumberInput value={operatingHours} onChange={setOperatingHours} min={0.1} max={24} suffix="hr" ariaLabel="Operating hours" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Depth of discharge
              <InfoTip label="DOD">50% for lead-acid (preserves life), 80% for AGM, 90–100% for lithium.</InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{dod}%</span>
            </label>
            <input type="range" min={20} max={100} step={5} value={depthOfDischarge} onChange={(e) => setDepthOfDischarge(e.target.value)} className="w-full accent-blue-600" aria-label="DOD" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Battery efficiency
              <InfoTip label="efficiency">Includes inverter, wiring, and battery internal resistance losses. Typical 80–90%.</InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{battEff}%</span>
            </label>
            <input type="range" min={50} max={100} step={1} value={batteryEfficiency} onChange={(e) => setBatteryEfficiency(e.target.value)} className="w-full accent-blue-600" aria-label="Efficiency" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Operating temperature
              <InfoTip label="temperature">Below 50°F, lead-acid loses 15–30% capacity. Lithium loses much less.</InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{tempF}°F</span>
            </label>
            <input type="range" min={0} max={120} step={1} value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full accent-blue-600" aria-label="Temperature" />
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Maximum runtime"
          value={calc.runtimeHours.toFixed(1)}
          unit={`hr at ${loadWatts}W draw`}
          secondaryText={
            <>
              Your {totalCapacity}Ah battery delivers <strong>{calc.adjustedCapacity.toFixed(0)}Ah usable</strong> (after DOD + temp), running{' '}
              {isCustom ? `${loadWatts}W` : load?.name.toLowerCase()} at <strong>{calc.currentAmps.toFixed(1)}A draw</strong> for <strong>{calc.runtimeHours.toFixed(1)} hours</strong>.
              {!calc.canMeet && <> Need {calc.parallelBatteries} batteries in parallel to hit {requestedHours} hr.</>}
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Current draw', value: `${calc.currentAmps.toFixed(1)}A` },
            { label: 'Wire size', value: calc.wireSize },
            { label: 'Fuse', value: `${calc.fuseRating}A` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Battery className="w-4 h-4 text-blue-600" />
              Capacity calculation
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Nominal capacity', detail: `${totalCapacity}Ah`, factor: `${(totalCapacity * 12).toFixed(0)} Wh` },
                { label: 'DOD limit', detail: `× ${dod}%`, factor: `${calc.usableCapacity.toFixed(0)}Ah` },
                { label: 'Temperature derating', detail: `${tempF}°F = ${(calc.tempDerating * 100).toFixed(0)}%`, factor: `${calc.adjustedCapacity.toFixed(0)}Ah` },
                { label: 'Battery efficiency', detail: `× ${battEff}%`, factor: `${(calc.adjustedCapacity * battEff / 100).toFixed(0)}Ah effective` },
                { label: 'Load current', detail: `${loadWatts}W ÷ 12V`, factor: `${calc.currentAmps.toFixed(1)}A` },
                { label: 'Voltage drop', detail: 'Under load', factor: `−${calc.voltageDropEstimate.toFixed(2)}V` },
              ]}
              totals={[
                { label: 'Max runtime', value: `${calc.runtimeHours.toFixed(1)} hours`, valueClass: calc.canMeet ? 'text-emerald-700' : 'text-red-700' },
                { label: 'Required for daily use', value: `${requestedHours.toFixed(1)} hours` },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              Circuit + charging
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Wire size (75°C, ≤10ft)</span><strong>{calc.wireSize}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Fuse rating (125% load)</span><strong>{calc.fuseRating}A</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Recommended charger (C/10)</span><strong>{calc.recommendedChargeRate.toFixed(1)}A</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Charge time (from empty)</span><strong>{calc.chargeTimeHours.toFixed(1)} hr</strong></div>
              <div className="flex justify-between py-1.5"><span>Voltage under load</span><strong>{calc.loadVoltage.toFixed(2)}V</strong></div>
            </div>
            {!calc.canMeet && (
              <div className="mt-3 p-3 bg-red-50 rounded text-xs text-red-900">
                ⚠ <strong>{totalCapacity}Ah is too small.</strong> For {requestedHours} hr × {loadWatts}W, you need <strong>{Math.round(calc.requiredBatteryCapacity)}Ah</strong>{' '}
                ({calc.parallelBatteries} × {totalCapacity}Ah batteries in parallel).
              </div>
            )}
            {calc.currentAmps > 50 && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900">
                ⚡ <strong>High current ({calc.currentAmps.toFixed(0)}A)</strong> — use {calc.wireSize} wire, {calc.fuseRating}A fuse, and short cable runs to minimize voltage drop.
              </div>
            )}
            {tempF < 50 && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-900">
                ❄ Cold-weather derating: capacity reduced by {((1 - calc.tempDerating) * 100).toFixed(0)}%. Switch to lithium for cold climates.
              </div>
            )}
          </div>
        </div>

        <DisclaimerBox title="12V DC system tips">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>For inverters, derate your battery — AC loads through an inverter lose 10–15% to inverter efficiency on top of battery efficiency</li>
            <li>Lithium (LiFePO4) costs 2–3× more upfront but lasts 5–10× longer than lead-acid — break-even in 2–4 years</li>
            <li>Run wires direct from battery to load — never daisy chain through other connections</li>
            <li>Always fuse within 7 inches of the positive battery terminal — shorts in unfused wire can melt copper</li>
            <li>Parallel batteries should be identical age + chemistry — mismatched batteries kill cycle life</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
