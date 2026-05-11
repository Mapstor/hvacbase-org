'use client';

import { useState, useMemo } from 'react';
import {
  Battery,
  Clock,
  Zap,
  TrendingUp,
  Smartphone,
  Laptop,
  Lightbulb,
  Wind,
  Tv,
  Refrigerator,
  Microwave,
  Settings,
} from 'lucide-react';
import {
  fmt,
  CalcShell,
  SectionHeader,
  CardChoice,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'emerald' as const;

const batteryChemistries = [
  { value: 'lithium-ion', name: 'Lithium-ion', summary: '95% eff · 3000 cycles', efficiency: 0.95, cycles: 3000 },
  { value: 'lifepo4', name: 'LiFePO4', summary: '98% eff · 6000 cycles · safest', efficiency: 0.98, cycles: 6000 },
  { value: 'lead-acid', name: 'Lead acid', summary: '85% eff · 500 cycles · cheap', efficiency: 0.85, cycles: 500 },
  { value: 'agm', name: 'AGM', summary: '88% eff · 800 cycles · sealed', efficiency: 0.88, cycles: 800 },
  { value: 'gel', name: 'Gel', summary: '87% eff · 1000 cycles · deep cycle', efficiency: 0.87, cycles: 1000 },
];

const commonDevices = [
  { value: 'phone', name: 'Smartphone', summary: '5W × 2 hr', watts: 5, hours: 2, Icon: Smartphone },
  { value: 'laptop', name: 'Laptop', summary: '65W × 8 hr', watts: 65, hours: 8, Icon: Laptop },
  { value: 'led-light', name: 'LED bulb', summary: '10W × 6 hr', watts: 10, hours: 6, Icon: Lightbulb },
  { value: 'fan', name: 'Ceiling fan', summary: '75W × 8 hr', watts: 75, hours: 8, Icon: Wind },
  { value: 'tv', name: 'TV (55″)', summary: '120W × 5 hr', watts: 120, hours: 5, Icon: Tv },
  { value: 'refrigerator', name: 'Refrigerator', summary: '150W × 24 hr', watts: 150, hours: 24, Icon: Refrigerator },
  { value: 'microwave', name: 'Microwave', summary: '1000W × 0.5 hr', watts: 1000, hours: 0.5, Icon: Microwave },
  { value: 'space-heater', name: 'Space heater', summary: '1500W × 4 hr', watts: 1500, hours: 4, Icon: Wind },
];

const voltagePresets = [12, 24, 48];

export default function BatteryWattHoursCalculator() {
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [batteryCapacityAh, setBatteryCapacityAh] = useState('100');
  const [batteryChemistry, setBatteryChemistry] = useState('lithium-ion');
  const [depthOfDischarge, setDepthOfDischarge] = useState('80');
  const [deviceType, setDeviceType] = useState('laptop');
  const [customWatts, setCustomWatts] = useState('100');
  const [customHours, setCustomHours] = useState('8');
  const [inverterEfficiency, setInverterEfficiency] = useState('90');

  const chemistry = batteryChemistries.find((c) => c.value === batteryChemistry)!;
  const device = commonDevices.find((d) => d.value === deviceType);
  const isCustom = deviceType === 'custom';
  const deviceWatts = isCustom ? Math.max(parseFloat(customWatts) || 0, 1) : device?.watts || 0;
  const deviceHours = isCustom ? Math.max(parseFloat(customHours) || 0, 0.1) : device?.hours || 0;
  const volts = Math.max(parseFloat(batteryVoltage) || 1, 1);
  const ah = Math.max(parseFloat(batteryCapacityAh) || 1, 1);
  const dod = Math.min(Math.max(parseFloat(depthOfDischarge) || 80, 20), 100);
  const invEff = Math.min(Math.max(parseFloat(inverterEfficiency) || 90, 70), 100);

  const calc = useMemo(() => {
    const batteryWattHours = volts * ah;
    const usableWattHours = batteryWattHours * (dod / 100);
    const effectiveWattHours = usableWattHours * (invEff / 100);
    const deviceWattHours = deviceWatts * deviceHours;
    const runtimeHours = deviceWatts > 0 ? effectiveWattHours / deviceWatts : 0;
    const runtimeDays = runtimeHours / 24;
    const cyclesPerDay = usableWattHours > 0 ? deviceWattHours / usableWattHours : 0;
    const daysPerCycle = cyclesPerDay > 0 ? 1 / cyclesPerDay : 0;
    const estimatedLifeDays = cyclesPerDay > 0 ? chemistry.cycles / cyclesPerDay : 0;
    const estimatedLifeYears = estimatedLifeDays / 365;
    const systemEfficiency = chemistry.efficiency * (invEff / 100);
    const energyLoss = batteryWattHours - effectiveWattHours;
    const simultaneousDevices = deviceWattHours > 0 ? Math.floor(effectiveWattHours / deviceWattHours) : 0;
    const chargerAmps = 10 * (volts / 12);
    const rechargeTimeHours = ah / chargerAmps;
    return { batteryWattHours, usableWattHours, effectiveWattHours, deviceWattHours, runtimeHours, runtimeDays, cyclesPerDay, daysPerCycle, estimatedLifeDays, estimatedLifeYears, systemEfficiency, energyLoss, simultaneousDevices, rechargeTimeHours };
  }, [volts, ah, dod, invEff, deviceWatts, deviceHours, chemistry]);

  const fit =
    calc.runtimeHours >= 24 ? { tone: 'good' as const, text: `${calc.runtimeDays.toFixed(1)} days runtime — excellent` } :
    calc.runtimeHours >= deviceHours ? { tone: 'good' as const, text: 'Comfortable runtime' } :
    calc.cyclesPerDay > 1 ? { tone: 'bad' as const, text: '> 1 cycle/day — battery dies fast' } :
    { tone: 'ok' as const, text: 'Adequate for daily use' };

  return (
    <CalcShell
      Icon={Battery}
      title="Battery Watt-Hours Calculator"
      subtitle="Capacity, runtime, cycle life. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Battery specs" subtitle="Voltage, capacity, chemistry" Icon={Battery} accent={ACCENT} />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Voltage</label>
              <div className="mb-2 flex flex-wrap gap-1.5">
                {voltagePresets.map((v) => (
                  <button key={v} type="button" onClick={() => setBatteryVoltage(String(v))} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${parseFloat(batteryVoltage) === v ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-400'}`}>{v}V</button>
                ))}
              </div>
              <NumberInput value={batteryVoltage} onChange={setBatteryVoltage} min={1.5} max={48} suffix="V" ariaLabel="Battery voltage" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Capacity</label>
              <NumberInput value={batteryCapacityAh} onChange={setBatteryCapacityAh} min={1} max={1000} suffix="Ah" ariaLabel="Battery capacity" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">{calc.batteryWattHours.toFixed(0)} Wh nominal</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Chemistry</label>
            <CardChoice value={batteryChemistry} onChange={setBatteryChemistry} options={batteryChemistries} ariaLabel="Chemistry" accent={ACCENT} columns={5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Depth of discharge
                <InfoTip label="DOD">Lithium can safely discharge to 80–100%. Lead acid should stay above 50% to preserve cycle life.</InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{dod}%</span>
              </label>
              <input type="range" min={20} max={100} step={5} value={depthOfDischarge} onChange={(e) => setDepthOfDischarge(e.target.value)} className="w-full accent-emerald-600" aria-label="Depth of discharge" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Inverter efficiency
                <InfoTip label="inverter">For AC devices, the DC-to-AC inverter loses 8–15% of energy. Set to 100% if you're powering DC-only loads.</InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{invEff}%</span>
              </label>
              <input type="range" min={70} max={100} step={1} value={inverterEfficiency} onChange={(e) => setInverterEfficiency(e.target.value)} className="w-full accent-emerald-600" aria-label="Inverter efficiency" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="What you're powering" subtitle="Common devices or custom" Icon={Zap} accent={ACCENT} />
        <CardChoice
          value={deviceType}
          onChange={setDeviceType}
          options={[
            ...commonDevices.map(({ value, name, summary, Icon }) => ({ value, name, summary, Icon })),
            { value: 'custom', name: 'Custom', summary: 'Enter watts + hours' },
          ]}
          ariaLabel="Device"
          accent={ACCENT}
          columns={3}
        />
        {isCustom && (
          <div className="mt-4 grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Custom watts</label>
              <NumberInput value={customWatts} onChange={setCustomWatts} min={1} max={5000} suffix="W" ariaLabel="Custom watts" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Daily hours</label>
              <NumberInput value={customHours} onChange={setCustomHours} min={0.1} max={24} suffix="hr" ariaLabel="Custom hours" accent={ACCENT} />
            </div>
          </div>
        )}
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Device runtime"
          value={calc.runtimeHours.toFixed(1)}
          unit={`hr (${calc.runtimeDays.toFixed(1)} days)`}
          secondaryText={
            <>
              A {volts}V × {ah}Ah {chemistry.name} battery has <strong>{fmt(Math.round(calc.batteryWattHours))} Wh</strong>{' '}
              nominal, <strong>{fmt(Math.round(calc.usableWattHours))} Wh</strong> usable at {dod}% DOD.
              After inverter losses, that's <strong>{fmt(Math.round(calc.effectiveWattHours))} Wh</strong> delivered to your {isCustom ? 'device' : device?.name.toLowerCase()}.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Usable energy', value: `${fmt(Math.round(calc.usableWattHours))} Wh` },
            { label: 'Effective (after inverter)', value: `${fmt(Math.round(calc.effectiveWattHours))} Wh` },
            { label: 'Recharge time', value: `${calc.rechargeTimeHours.toFixed(1)} hr` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Battery className="w-4 h-4 text-emerald-600" />
              Energy budget
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Nominal capacity', detail: `${volts}V × ${ah}Ah`, factor: `${fmt(Math.round(calc.batteryWattHours))} Wh` },
                { label: 'DOD limit', detail: `${dod}% × nominal`, factor: `${fmt(Math.round(calc.usableWattHours))} Wh` },
                { label: 'Inverter eff.', detail: `${invEff}% × usable`, factor: `${fmt(Math.round(calc.effectiveWattHours))} Wh` },
                { label: 'Device draw', detail: `${deviceWatts}W × ${deviceHours} hr`, factor: `${fmt(Math.round(calc.deviceWattHours))} Wh/day` },
                { label: 'Cycles per day', detail: 'Device Wh ÷ usable Wh', factor: `${calc.cyclesPerDay.toFixed(2)}` },
                { label: 'Energy lost', detail: 'Nominal − effective', factor: `${fmt(Math.round(calc.energyLoss))} Wh` },
              ]}
              totals={[
                { label: 'System efficiency', value: `${(calc.systemEfficiency * 100).toFixed(0)}%`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              Cycle life + runtime
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Rated cycles ({chemistry.name})</span><strong>{fmt(chemistry.cycles)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Cycles/day at this load</span><strong>{calc.cyclesPerDay.toFixed(2)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Days per cycle</span><strong>{calc.daysPerCycle.toFixed(1)} days</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Estimated lifespan</span><strong>{calc.estimatedLifeYears.toFixed(1)} years</strong></div>
              <div className="flex justify-between py-1.5"><span>Devices simultaneously</span><strong>{calc.simultaneousDevices}</strong></div>
            </div>
            {calc.cyclesPerDay > 1 && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900">
                ⚠ <strong>{calc.cyclesPerDay.toFixed(1)} cycles/day</strong> exhausts cycle life in {calc.estimatedLifeYears.toFixed(1)} years. Bigger battery or different chemistry recommended.
              </div>
            )}
            {calc.estimatedLifeYears >= 10 && (
              <div className="mt-3 p-3 bg-emerald-50 rounded text-xs text-emerald-900">
                ✓ <strong>{calc.estimatedLifeYears.toFixed(1)}-year</strong> expected lifespan — battery is well-sized for this load.
              </div>
            )}
          </div>
        </div>

        <DisclaimerBox title="Battery sizing tips">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>For off-grid: size for 2–3 days of autonomy + 50% DOD safety buffer</li>
            <li>For RV/marine: lithium pays back in 2–3 years vs lead-acid through weight and cycle life</li>
            <li>Inverter sizing should match peak load, not average — motors need 3–5× their running watts at startup</li>
            <li>Temperature halves lead-acid capacity at 0°F; lithium degrades much less</li>
            <li>Recharge time scales linearly with charger size — bigger chargers cost more but recover faster</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
