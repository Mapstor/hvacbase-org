'use client';

import { useState, useMemo } from 'react';
import {
  Battery,
  Clock,
  Zap,
  Smartphone,
  Laptop,
  Lightbulb,
  Wind,
  Tv,
  Refrigerator,
  Microwave,
  Snowflake,
  AlertTriangle,
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
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'emerald' as const;

// Chemistry table — verified round-trip efficiency ranges (Battery University +
// mainstream manufacturer datasheets), temperature-derating family, chemistry
// cycle-life-safe default DoD. Round-trip efficiency is a CHARGE-side loss
// (energy in vs energy out over a full cycle) — it is NOT applied to runtime
// (that would double-count). It is surfaced in the "Round-trip efficiency"
// display so users planning solar/off-grid can size their charge source.
type TempFamily = 'lithium' | 'lead-acid';

const batteryChemistries = [
  { value: 'lifepo4',     name: 'LiFePO4',     summary: '~94% round-trip · ~6,000 cycles · safest', roundTripEff: 0.94, cycles: 6000, tempFamily: 'lithium'   as TempFamily, defaultDod: 90 },
  { value: 'lithium-ion', name: 'Lithium-ion', summary: '~93% round-trip · ~3,000 cycles',          roundTripEff: 0.93, cycles: 3000, tempFamily: 'lithium'   as TempFamily, defaultDod: 80 },
  { value: 'lead-acid',   name: 'Lead acid',   summary: '~80% round-trip · ~500 cycles · cheap',    roundTripEff: 0.80, cycles: 500,  tempFamily: 'lead-acid' as TempFamily, defaultDod: 50 },
  { value: 'agm',         name: 'AGM',         summary: '~82% round-trip · ~800 cycles · sealed',   roundTripEff: 0.82, cycles: 800,  tempFamily: 'lead-acid' as TempFamily, defaultDod: 50 },
  { value: 'gel',         name: 'Gel',         summary: '~82% round-trip · ~1,000 cycles · deep cycle', roundTripEff: 0.82, cycles: 1000, tempFamily: 'lead-acid' as TempFamily, defaultDod: 50 },
];

// Device presets. Watts × hours reflect REAL daily energy consumption.
// - Refrigerator: 150W nameplate compressor duty-cycles at ~35%, so effective
//   24hr average draw is ~52W → 52 × 24 = 1,248 Wh/day. (Nameplate × 24hr =
//   3,600 Wh/day is a common off-grid sizing error.)
// - Microwave: 1,000W is the cooking output rating (magnetron); the wall draw
//   is ~1,500W. Battery has to supply the input draw, not the output.
const commonDevices = [
  { value: 'phone',        name: 'Smartphone',   summary: '5W × 2 hr = 10 Wh/day',                                                       watts: 5,    hours: 2,   Icon: Smartphone },
  { value: 'laptop',       name: 'Laptop',       summary: '65W × 8 hr = 520 Wh/day',                                                     watts: 65,   hours: 8,   Icon: Laptop },
  { value: 'led-light',    name: 'LED bulb',     summary: '10W × 6 hr = 60 Wh/day',                                                      watts: 10,   hours: 6,   Icon: Lightbulb },
  { value: 'fan',          name: 'Ceiling fan',  summary: '75W × 8 hr = 600 Wh/day',                                                     watts: 75,   hours: 8,   Icon: Wind },
  { value: 'tv',           name: 'TV (55″)',     summary: '120W × 5 hr = 600 Wh/day',                                                    watts: 120,  hours: 5,   Icon: Tv },
  { value: 'refrigerator', name: 'Refrigerator', summary: '~52W avg × 24 hr = 1,248 Wh/day (150W nameplate at 35% duty cycle)',          watts: 52,   hours: 24,  Icon: Refrigerator },
  { value: 'microwave',    name: 'Microwave',    summary: '1,500W input × 0.5 hr = 750 Wh/day (1,000W cooking = 1,500W wall draw)',      watts: 1500, hours: 0.5, Icon: Microwave },
  { value: 'space-heater', name: 'Space heater', summary: '1,500W × 4 hr = 6,000 Wh/day',                                                watts: 1500, hours: 4,   Icon: Wind },
];

const voltagePresets = [12, 24, 48];

// Charging constants — matched to sibling Battery12V calc for consistency.
const CHARGE_TAPER_FACTOR = 1.15;   // CC-CV taper + round-trip charging losses
const RECOMMENDED_C_RATE  = 0.1;    // C/10 universal — safe for all chemistries

// Chemistry-conditional temperature derating (Battery University BU-410 anchors).
// Above 25°C (77°F) → baseline 1.0. Below 25°C → linear falloff. Cold reduces
// capacity; warm at rest does not. High-temp cycle-life degradation is out of
// scope for a runtime estimator.
function tempDerating(tempF: number, fam: TempFamily): number {
  const roomAnchor = 77, freezeAnchor = 32, deepColdAnchor = -4;
  const [freezeDerate, deepColdDerate] =
    fam === 'lithium' ? [0.80, 0.60] : [0.65, 0.40];
  if (tempF >= roomAnchor) return 1.0;
  if (tempF >= freezeAnchor) {
    const drop = 1.0 - freezeDerate;
    return 1.0 - drop * (roomAnchor - tempF) / (roomAnchor - freezeAnchor);
  }
  if (tempF >= deepColdAnchor) {
    const drop = freezeDerate - deepColdDerate;
    return freezeDerate - drop * (freezeAnchor - tempF) / (freezeAnchor - deepColdAnchor);
  }
  return deepColdDerate;
}

const DEFAULTS = {
  batteryVoltage: '12',
  batteryCapacityAh: '100',
  batteryChemistry: 'lithium-ion',
  depthOfDischarge: '80',
  deviceType: 'laptop',
  customWatts: '100',
  customHours: '8',
  inverterEfficiency: '90',
  temperature: '68',
};

export default function BatteryWattHoursCalculator() {
  const [batteryVoltage,     setBatteryVoltage]     = useState(DEFAULTS.batteryVoltage);
  const [batteryCapacityAh,  setBatteryCapacityAh]  = useState(DEFAULTS.batteryCapacityAh);
  const [batteryChemistry,   setBatteryChemistry]   = useState(DEFAULTS.batteryChemistry);
  const [depthOfDischarge,   setDepthOfDischarge]   = useState(DEFAULTS.depthOfDischarge);
  const [deviceType,         setDeviceType]         = useState(DEFAULTS.deviceType);
  const [customWatts,        setCustomWatts]        = useState(DEFAULTS.customWatts);
  const [customHours,        setCustomHours]        = useState(DEFAULTS.customHours);
  const [inverterEfficiency, setInverterEfficiency] = useState(DEFAULTS.inverterEfficiency);
  const [temperature,        setTemperature]        = useState(DEFAULTS.temperature);

  // Chemistry drives DoD default per chemistry's cycle-life-safe zone.
  const handleChemistryChange = (v: string) => {
    setBatteryChemistry(v);
    const chem = batteryChemistries.find((c) => c.value === v);
    if (chem) setDepthOfDischarge(String(chem.defaultDod));
  };

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    batteryVoltage, batteryCapacityAh, batteryChemistry, depthOfDischarge,
    deviceType, customWatts, customHours, inverterEfficiency, temperature,
  });

  const isCustom = deviceType === 'custom';
  const chemistry = batteryChemistries.find((c) => c.value === src.batteryChemistry)!;
  const device = commonDevices.find((d) => d.value === src.deviceType);
  const deviceWatts = src.deviceType === 'custom' ? Math.max(parseFloat(src.customWatts) || 0, 1) : device?.watts || 0;
  const deviceHours = src.deviceType === 'custom' ? Math.max(parseFloat(src.customHours) || 0, 0.1) : device?.hours || 0;
  const volts = Math.max(parseFloat(src.batteryVoltage) || 1, 1);
  const ah = Math.max(parseFloat(src.batteryCapacityAh) || 1, 1);
  const dod = Math.min(Math.max(parseFloat(src.depthOfDischarge) || 80, 20), 100);
  const invEff = Math.min(Math.max(parseFloat(src.inverterEfficiency) || 90, 70), 100);
  const tempF = parseFloat(src.temperature) || 68;

  const handleReset = () => {
    setBatteryVoltage(DEFAULTS.batteryVoltage);
    setBatteryCapacityAh(DEFAULTS.batteryCapacityAh);
    setBatteryChemistry(DEFAULTS.batteryChemistry);
    setDepthOfDischarge(DEFAULTS.depthOfDischarge);
    setDeviceType(DEFAULTS.deviceType);
    setCustomWatts(DEFAULTS.customWatts);
    setCustomHours(DEFAULTS.customHours);
    setInverterEfficiency(DEFAULTS.inverterEfficiency);
    setTemperature(DEFAULTS.temperature);
    clear();
  };

  const calc = useMemo(() => {
    // === Verified runtime formula ===
    // batteryWh = V × Ah
    // usableWh  = batteryWh × DoD × tempDerating       (temperature reduces
    //                                                    available capacity)
    // effectiveWh = usableWh × invEff                  (inverter loss ONLY —
    //                                                    round-trip / chemistry
    //                                                    efficiency is a CHARGE-
    //                                                    side loss and would
    //                                                    double-count if applied
    //                                                    here)
    // continuousRuntimeHr = effectiveWh / deviceWatts  (device drawing
    //                                                    continuously until DoD)
    // daysBetweenCharges  = effectiveWh / dailyWh      (at user's daily use
    //                                                    pattern — the actionable
    //                                                    battery-sizing number)
    const derating = tempDerating(tempF, chemistry.tempFamily);
    const batteryWattHours   = volts * ah;
    const usableWattHours    = batteryWattHours * (dod / 100) * derating;
    const effectiveWattHours = usableWattHours * (invEff / 100);
    const deviceWattHoursPerDay = deviceWatts * deviceHours;
    const continuousRuntimeHr =
      deviceWatts > 0 ? effectiveWattHours / deviceWatts : 0;
    const daysBetweenCharges =
      deviceWattHoursPerDay > 0 ? effectiveWattHours / deviceWattHoursPerDay : 0;
    const cyclesPerDay =
      effectiveWattHours > 0 ? deviceWattHoursPerDay / effectiveWattHours : 0;
    const estimatedLifeYears =
      cyclesPerDay > 0 ? chemistry.cycles / cyclesPerDay / 365 : 0;

    // Round-trip efficiency for DISPLAY ONLY — sum of chemistry (charge-side)
    // and inverter (discharge-side) losses that a solar/off-grid designer
    // needs when sizing the charge source. Never used in runtime math.
    const roundTripEfficiency = chemistry.roundTripEff * (invEff / 100);

    // === Verified charge-time formulas (match Battery12V calc) ===
    // (Ah × DoD) / charge_current × 1.15  — used portion (matches the DoD input)
    //  Ah        / charge_current × 1.15  — full charge from 0% → 100%
    // recommendedChargeRate is C/10 UNIVERSAL — safe for both chemistries.
    // Prior implementation scaled by voltage (10 × V/12), which had no basis;
    // a 48V bank should not get a 40A charger recommendation just for being 48V.
    const recommendedChargeRateA = ah * RECOMMENDED_C_RATE;
    const rechargeUsedPortionHours =
      recommendedChargeRateA > 0
        ? (ah * (dod / 100)) / recommendedChargeRateA * CHARGE_TAPER_FACTOR
        : 0;
    const fullChargeFromEmptyHours =
      recommendedChargeRateA > 0
        ? ah / recommendedChargeRateA * CHARGE_TAPER_FACTOR
        : 0;

    return {
      derating,
      batteryWattHours,
      usableWattHours,
      effectiveWattHours,
      deviceWattHoursPerDay,
      continuousRuntimeHr,
      daysBetweenCharges,
      cyclesPerDay,
      estimatedLifeYears,
      roundTripEfficiency,
      recommendedChargeRateA,
      rechargeUsedPortionHours,
      fullChargeFromEmptyHours,
    };
  }, [volts, ah, dod, invEff, tempF, deviceWatts, deviceHours, chemistry]);

  const isLeadAcidGroup = chemistry.tempFamily === 'lead-acid';

  const fit =
    calc.daysBetweenCharges >= 3 ? { tone: 'good' as const, text: `${calc.daysBetweenCharges.toFixed(1)} days between charges — strong reserve` } :
    calc.daysBetweenCharges >= 1 ? { tone: 'good' as const, text: `${calc.daysBetweenCharges.toFixed(1)} days between charges` } :
    calc.cyclesPerDay > 1        ? { tone: 'bad'  as const, text: `${calc.cyclesPerDay.toFixed(1)} cycles/day — battery dies fast, add capacity` } :
                                   { tone: 'ok'   as const, text: 'Adequate for daily use' };

  return (
    <CalcShell
      Icon={Battery}
      title="Battery Watt-Hours Calculator"
      subtitle="Runtime, days-per-charge, cycle life — planning estimate for battery banks."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
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
              <p className="text-xs text-gray-500 mt-1.5">{calc.batteryWattHours.toFixed(0)} Wh nominal (once you Calculate)</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Chemistry</label>
            <CardChoice value={batteryChemistry} onChange={handleChemistryChange} options={batteryChemistries} ariaLabel="Chemistry" accent={ACCENT} columns={5} />
            <p className="text-xs text-gray-500 mt-1.5">
              Chemistry snaps the DoD slider below to its cycle-life-safe default and drives temperature derating.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Depth of discharge
                <InfoTip label="DOD">
                  LiFePO4: 80–90% safe. Lithium-ion: 80% for cycle life.
                  Lead-acid / AGM / Gel: 50% preserves cycle life — deeper cycling drops cycle count dramatically.
                </InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{dod}%</span>
              </label>
              <input type="range" min={20} max={100} step={5} value={depthOfDischarge} onChange={(e) => setDepthOfDischarge(e.target.value)} className="w-full accent-emerald-600" aria-label="Depth of discharge" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Inverter efficiency
                <InfoTip label="inverter">
                  DC-to-AC inverter loss. Pure sinewave 88–92% typical; modified sinewave 80–85%.
                  For pure DC loads (12V LED, 12V fridge), set close to 100%.
                </InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{invEff}%</span>
              </label>
              <input type="range" min={70} max={100} step={1} value={inverterEfficiency} onChange={(e) => setInverterEfficiency(e.target.value)} className="w-full accent-emerald-600" aria-label="Inverter efficiency" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Operating temperature
                <InfoTip label="temperature">
                  Cold reduces battery capacity — cold is a loss, never a gain. Lithium tolerates cold better than lead-acid.
                  Approximate anchor points (per Battery University BU-410):
                  at 32 °F, lithium delivers ~80% of rated capacity, lead-acid ~65%.
                  At −4 °F, lithium ~60%, lead-acid ~40%.
                </InfoTip>
                <span className="ml-auto text-sm font-semibold text-emerald-700">{tempF}°F</span>
              </label>
              <input type="range" min={-20} max={120} step={1} value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full accent-emerald-600" aria-label="Temperature" />
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
            { value: 'custom', name: 'Custom', summary: 'Enter watts + daily hours' },
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
              <p className="text-xs text-gray-500 mt-1.5">
                For appliances that duty-cycle (fridges, freezers, well pumps), enter your average draw × 24, not the nameplate.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Daily hours</label>
              <NumberInput value={customHours} onChange={setCustomHours} min={0.1} max={24} suffix="hr" ariaLabel="Custom hours" accent={ACCENT} />
            </div>
          </div>
        )}
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
          eyebrow="Days between charges (at your daily use)"
          value={calc.daysBetweenCharges.toFixed(2)}
          unit="days"
          secondaryText={
            <>
              A {volts}V × {ah}Ah {chemistry.name} battery has <strong>{fmt(Math.round(calc.batteryWattHours))} Wh</strong>{' '}
              nominal, <strong>{fmt(Math.round(calc.usableWattHours))} Wh</strong> usable at {dod}% DoD and {tempF}°F.
              After inverter losses, that's <strong>{fmt(Math.round(calc.effectiveWattHours))} Wh</strong> delivered to your{' '}
              {isCustom ? 'device' : device?.name.toLowerCase()} — enough for <strong>{calc.daysBetweenCharges.toFixed(2)} days</strong>{' '}
              at {deviceWatts}W × {deviceHours} hr/day, or <strong>{calc.continuousRuntimeHr.toFixed(1)} hours</strong> if you ran it nonstop.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Continuous runtime', value: `${calc.continuousRuntimeHr.toFixed(1)} hr` },
            { label: 'Usable energy', value: `${fmt(Math.round(calc.usableWattHours))} Wh` },
            { label: 'After inverter', value: `${fmt(Math.round(calc.effectiveWattHours))} Wh` },
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
                { label: 'Nominal capacity',      detail: `${volts}V × ${ah}Ah`,                                                          factor: `${fmt(Math.round(calc.batteryWattHours))} Wh` },
                { label: 'DoD limit',             detail: `× ${dod}%`,                                                                    factor: `${fmt(Math.round(calc.batteryWattHours * dod / 100))} Wh` },
                { label: 'Temperature derating',  detail: `${tempF}°F, ${chemistry.tempFamily} → ${(calc.derating * 100).toFixed(0)}%`,   factor: `${fmt(Math.round(calc.usableWattHours))} Wh usable` },
                { label: 'Inverter efficiency',   detail: `× ${invEff}% (AC loads only)`,                                                 factor: `${fmt(Math.round(calc.effectiveWattHours))} Wh effective` },
                { label: 'Daily device draw',     detail: `${deviceWatts}W × ${deviceHours} hr`,                                          factor: `${fmt(Math.round(calc.deviceWattHoursPerDay))} Wh/day` },
              ]}
              totals={[
                { label: 'Days between charges', value: `${calc.daysBetweenCharges.toFixed(2)} days`, valueClass: fit.tone === 'bad' ? 'text-red-700' : 'text-emerald-700' },
                { label: 'Continuous runtime',   value: `${calc.continuousRuntimeHr.toFixed(1)} hours` },
              ]}
            />
            {isLeadAcidGroup && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Lead-acid Peukert effect:</strong> lead-acid delivers less than its rated capacity at high discharge
                  rates. For heavy or fast loads (draining in &lt;5 hours), derate an additional 20–30% beyond the number above.
                  Lithium (LiFePO4, lithium-ion) is barely affected.
                </div>
              </div>
            )}
            {tempF < 50 && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-900 flex gap-2">
                <Snowflake className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cold-weather derating:</strong> at {tempF}°F, {chemistry.tempFamily} capacity is reduced by{' '}
                  {((1 - calc.derating) * 100).toFixed(0)}%. Insulate the battery enclosure or move to lithium with a self-heat
                  option for reliable cold-weather performance.
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-emerald-600" />
              Cycle life + charging
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Rated cycles ({chemistry.name})</span><strong>{fmt(chemistry.cycles)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Cycles/day at this load</span><strong>{calc.cyclesPerDay.toFixed(2)}</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Estimated lifespan</span><strong>{calc.estimatedLifeYears.toFixed(1)} years</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Round-trip efficiency (charging losses)</span><strong>{(calc.roundTripEfficiency * 100).toFixed(0)}%</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Recommended charger (C/10 universal)</span><strong>{calc.recommendedChargeRateA.toFixed(1)}A</strong></div>
              <div className="flex justify-between py-1.5 border-b border-gray-100"><span>Recharge time (used portion — {dod}% DoD)</span><strong>{calc.rechargeUsedPortionHours.toFixed(1)} hr</strong></div>
              <div className="flex justify-between py-1.5"><span>Full charge (0% → 100%)</span><strong>{calc.fullChargeFromEmptyHours.toFixed(1)} hr</strong></div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-900">
              <div><strong>Round-trip efficiency</strong> is a CHARGE-side loss — energy you have to put IN vs energy that
              comes OUT over a full cycle. It sizes your solar array or grid charger, NOT the runtime above (which counts only
              the inverter loss on discharge — round-tripping it would double-count).</div>
              <div className="mt-1.5">
                Formula: <code className="bg-blue-100 px-1 rounded">time = (Ah × DoD) / charge amps × 1.15</code> — the 1.15
                covers CC-CV taper plus round-trip charging losses.
                {(chemistry.value === 'lifepo4' || chemistry.value === 'lithium-ion') && (
                  <> Lithium can safely accept up to C/2 (50A on 100Ah) with a matched charger — cut these times ~5×.</>
                )}
              </div>
            </div>
            {calc.cyclesPerDay > 1 && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>{calc.cyclesPerDay.toFixed(1)} cycles/day</strong> exhausts rated cycles in{' '}
                  {calc.estimatedLifeYears.toFixed(1)} years. Add capacity or move to a higher-cycle chemistry.
                </div>
              </div>
            )}
            {calc.estimatedLifeYears >= 10 && calc.cyclesPerDay <= 1 && (
              <div className="mt-3 p-3 bg-emerald-50 rounded text-xs text-emerald-900">
                ✓ <strong>{calc.estimatedLifeYears.toFixed(1)}-year</strong> expected lifespan — battery is well-sized for this load.
              </div>
            )}
          </div>
        </div>

        <DisclaimerBox title="Honest framing — what this calculator is and isn't">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li><strong>This is a planning estimate, not a design.</strong> Real values vary with battery age (down 20–30% at 3–5 years), discharge rate (Peukert for lead-acid), and repeated deep-cycling.</li>
            <li><strong>Cycle ratings assume standard discharge depth</strong>; deeper cycling (especially lead-acid) reduces cycle life significantly — a lead-acid battery cycled to 80% DoD delivers roughly one-third of its rated cycles vs 50% DoD.</li>
            <li><strong>Round-trip efficiency values are approximate ranges</strong> from Battery University / manufacturer datasheets; individual cells vary. LiFePO4 92–96%, lithium-ion 90–95%, lead-acid 75–85%, AGM 80–85%.</li>
            <li><strong>Duty-cycled appliances</strong> (fridges, freezers, well pumps): the number that matters is your 24-hour AVERAGE draw, not the nameplate. The Refrigerator preset uses 52W average (150W nameplate × 35% duty cycle) as a real-world approximation; your fridge could be more or less.</li>
            <li><strong>Microwaves and kettles</strong>: the wattage on the door is COOKING output; wall draw is 40–60% higher. The Microwave preset uses 1,500W input, not the 1,000W plate rating.</li>
            <li><strong>Cold weather:</strong> capacity anchors here are approximate — get manufacturer capacity-vs-temperature curves for your exact cell for a real answer.</li>
            <li><strong>For off-grid:</strong> size for 2–3 days of autonomy on top of the daily draw, and match your solar/charge source to the round-trip efficiency (charging losses) figure above.</li>
            <li><strong>Motors and pumps need 3–5× their running watts at startup</strong> — the inverter must handle the surge, not just the average.</li>
            <li><strong>Parallel batteries should be identical age + chemistry</strong> — mismatched cells kill cycle life.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
