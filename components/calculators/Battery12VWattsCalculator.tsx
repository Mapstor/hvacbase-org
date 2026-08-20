'use client';

import { useState, useMemo } from 'react';
import {
  Battery,
  Zap,
  Gauge,
  Lightbulb,
  Refrigerator,
  Wind,
  Snowflake,
  AlertTriangle,
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
  CalculateResetBar,
  useCalculatorSubmit,
} from './_shared';

const ACCENT = 'blue' as const;

// Chemistry drives the DoD default AND the temperature-derating curve. Users can
// override the DoD slider after picking a chemistry; changing chemistry re-sets
// the slider to that chemistry's cycle-life-safe default.
const chemistries = [
  {
    value: 'lithium',
    name: 'LiFePO4 / Lithium',
    sub: 'Deep DoD OK, cold-tolerant',
    defaultDod: 90,
  },
  {
    value: 'lead-acid',
    name: 'Lead-acid (AGM/Flooded)',
    sub: '~50% DoD for cycle life',
    defaultDod: 50,
  },
] as const;

const batterySizes = [
  { value: '35', name: '35Ah', sub: 'Group 24' },
  { value: '55', name: '55Ah', sub: 'Group 24F' },
  { value: '75', name: '75Ah', sub: 'Group 31' },
  { value: '100', name: '100Ah', sub: 'Deep cycle' },
  { value: '150', name: '150Ah', sub: 'Large deep cycle' },
  { value: '200', name: '200Ah', sub: 'Extra large' },
];

const commonLoads = [
  { value: 'led-lights', name: 'LED strip (5m)', summary: '12V DC — 24W', watts: 24, isAc: false, Icon: Lightbulb },
  { value: 'car-fridge', name: '12V fridge', summary: '12V DC — 45W', watts: 45, isAc: false, Icon: Refrigerator },
  { value: 'fan', name: '12V fan', summary: '12V DC — 15W', watts: 15, isAc: false, Icon: Wind },
  { value: 'water-pump', name: 'Water pump', summary: '12V DC — 60W', watts: 60, isAc: false, Icon: Wind },
  { value: 'radio', name: 'CB / ham radio', summary: '12V DC — 25W', watts: 25, isAc: false, Icon: Wind },
  { value: 'inverter-small', name: '300W inverter load', summary: 'AC via inverter — 300W', watts: 300, isAc: true, Icon: Zap },
  { value: 'inverter-medium', name: '600W inverter load', summary: 'AC via inverter — 600W', watts: 600, isAc: true, Icon: Zap },
  { value: 'winch', name: '12V winch (peak)', summary: '12V DC — 1200W surge', watts: 1200, isAc: false, Icon: Wind },
];

// Charge-time efficiency factor covers the CC-CV taper (last 15-20% of a charge
// takes disproportionately longer as current tapers) plus round-trip charging
// efficiency losses. Standard mainstream guidance (Battery University, Victron).
const CHARGE_TAPER_FACTOR = 1.15;

// Recommended universal charge rate — C/10 is safe for both chemistries.
// Lithium accepts up to C/2 with a matched charger; the caveat in the results
// panel notes this so users don't assume 11.5 hr is the ceiling.
const RECOMMENDED_C_RATE = 0.1;

// Chemistry-specific temperature derating anchors, verified against
// Battery University BU-410 (capacity vs temperature) — cold reduces capacity;
// warm at 25 °C is baseline. Values below are approximate — real curves vary
// by cell model, discharge rate, and age.
type Chemistry = 'lithium' | 'lead-acid';
function tempDerating(tempF: number, chem: Chemistry): number {
  // Anchors (chemistry-conditional):
  //   Lithium:    77°F → 1.00,  32°F → 0.80,  -4°F → 0.60
  //   Lead-acid:  77°F → 1.00,  32°F → 0.65,  -4°F → 0.40
  const roomAnchor = 77;
  const freezeAnchor = 32;
  const deepColdAnchor = -4;

  const [freezeDerate, deepColdDerate] =
    chem === 'lithium' ? [0.80, 0.60] : [0.65, 0.40];

  if (tempF >= roomAnchor) return 1.0;
  if (tempF >= freezeAnchor) {
    // 77°F → 32°F : linear interpolation between 1.0 and freezeDerate
    const drop = 1.0 - freezeDerate;
    return 1.0 - drop * (roomAnchor - tempF) / (roomAnchor - freezeAnchor);
  }
  if (tempF >= deepColdAnchor) {
    // 32°F → -4°F : linear interpolation between freezeDerate and deepColdDerate
    const drop = freezeDerate - deepColdDerate;
    return freezeDerate - drop * (freezeAnchor - tempF) / (freezeAnchor - deepColdAnchor);
  }
  return deepColdDerate;
}

const DEFAULTS = {
  batteryCapacity: '100',
  chemistry: 'lithium',
  loadType: 'led-lights',
  customWatts: '100',
  operatingHours: '4',
  depthOfDischarge: '90', // chemistry default (lithium)
  systemEfficiency: '90',
  temperature: '68',
};

export default function Battery12VWattsCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState(DEFAULTS.batteryCapacity);
  const [chemistry, setChemistry] = useState(DEFAULTS.chemistry);
  const [loadType, setLoadType] = useState(DEFAULTS.loadType);
  const [customWatts, setCustomWatts] = useState(DEFAULTS.customWatts);
  const [operatingHours, setOperatingHours] = useState(DEFAULTS.operatingHours);
  const [depthOfDischarge, setDepthOfDischarge] = useState(DEFAULTS.depthOfDischarge);
  const [systemEfficiency, setSystemEfficiency] = useState(DEFAULTS.systemEfficiency);
  const [temperature, setTemperature] = useState(DEFAULTS.temperature);

  // Changing chemistry snaps DoD to that chemistry's cycle-life-safe default.
  // User can still override the slider afterwards.
  const handleChemistryChange = (v: string) => {
    setChemistry(v);
    const chem = chemistries.find((c) => c.value === v);
    if (chem) setDepthOfDischarge(String(chem.defaultDod));
  };

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    batteryCapacity, chemistry, loadType, customWatts,
    operatingHours, depthOfDischarge, systemEfficiency, temperature,
  });

  const load = commonLoads.find((l) => l.value === src.loadType);
  const isCustom = src.loadType === 'custom';
  const loadWatts = isCustom ? Math.max(parseFloat(src.customWatts) || 0, 1) : load?.watts || 0;
  const isAcLoad = isCustom ? false : (load?.isAc ?? false);
  const totalCapacity = Math.max(parseFloat(src.batteryCapacity) || 0, 1);
  const requestedHours = Math.max(parseFloat(src.operatingHours) || 0, 0.1);
  const dod = Math.min(Math.max(parseFloat(src.depthOfDischarge) || 50, 20), 100);
  const sysEff = Math.min(Math.max(parseFloat(src.systemEfficiency) || 90, 50), 100);
  const tempF = parseFloat(src.temperature) || 68;
  const srcChemistry = (src.chemistry === 'lead-acid' ? 'lead-acid' : 'lithium') as Chemistry;

  const handleReset = () => {
    setBatteryCapacity(DEFAULTS.batteryCapacity);
    setChemistry(DEFAULTS.chemistry);
    setLoadType(DEFAULTS.loadType);
    setCustomWatts(DEFAULTS.customWatts);
    setOperatingHours(DEFAULTS.operatingHours);
    setDepthOfDischarge(DEFAULTS.depthOfDischarge);
    setSystemEfficiency(DEFAULTS.systemEfficiency);
    setTemperature(DEFAULTS.temperature);
    clear();
  };

  const calc = useMemo(() => {
    // === Runtime, per verified standard formula ===
    // usableWh = Ah × V × DoD × systemEfficiency × temperatureDerating
    // runtimeHours = usableWh / loadWatts
    // (systemEfficiency covers inverter losses on AC loads and wiring losses;
    //  temperatureDerating accounts for capacity reduction in the cold.)
    const nominalWh = totalCapacity * 12;
    const currentAmps = loadWatts / 12;
    const usableAhBeforeTemp = totalCapacity * (dod / 100);
    const derating = tempDerating(tempF, srcChemistry);
    const adjustedCapacityAh = usableAhBeforeTemp * derating;
    const usableWh = adjustedCapacityAh * 12 * (sysEff / 100);
    const runtimeHours = loadWatts > 0 ? usableWh / loadWatts : 0;

    // === Capacity required for the user's requested runtime ===
    const dailyWh = loadWatts * requestedHours;
    // Solving usableWh = requestedWh for totalCapacity:
    //   requiredAh = (loadWatts × hours) / (12 × DoD × sysEff × derating)
    const effectiveFactor = 12 * (dod / 100) * (sysEff / 100) * derating;
    const requiredBatteryCapacity = effectiveFactor > 0 ? dailyWh / effectiveFactor : 0;
    const canMeet = runtimeHours >= requestedHours;
    const parallelBatteries = Math.max(1, Math.ceil(requiredBatteryCapacity / totalCapacity));

    // === Charge time, per verified standard formula ===
    // chargeTime = (Ah × DoD) / chargeCurrent × CHARGE_TAPER_FACTOR
    // Show BOTH:
    //   - Recharge time for the used portion (matches DoD input)
    //   - Full charge from 0% → 100%
    const recommendedChargeRateA = totalCapacity * RECOMMENDED_C_RATE;
    const rechargeUsedPortionHours = recommendedChargeRateA > 0
      ? (totalCapacity * (dod / 100)) / recommendedChargeRateA * CHARGE_TAPER_FACTOR
      : 0;
    const fullChargeFromEmptyHours = recommendedChargeRateA > 0
      ? totalCapacity / recommendedChargeRateA * CHARGE_TAPER_FACTOR
      : 0;

    return {
      nominalWh,
      currentAmps,
      usableAhBeforeTemp,
      derating,
      adjustedCapacityAh,
      usableWh,
      runtimeHours,
      canMeet,
      dailyWh,
      requiredBatteryCapacity,
      parallelBatteries,
      recommendedChargeRateA,
      rechargeUsedPortionHours,
      fullChargeFromEmptyHours,
    };
  }, [loadWatts, totalCapacity, requestedHours, dod, sysEff, tempF, srcChemistry]);

  const fit =
    !calc.canMeet ? { tone: 'bad' as const, text: `Need ${calc.parallelBatteries}× battery in parallel for ${requestedHours} hr` } :
    calc.runtimeHours >= requestedHours * 2 ? { tone: 'good' as const, text: 'Excellent reserve — 2× your need' } :
    { tone: 'good' as const, text: 'Battery covers requested runtime' };

  return (
    <CalcShell
      Icon={Battery}
      title="12V Battery Watts Calculator"
      subtitle="Runtime estimate for 12V DC systems — planning tool, not a design specification."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Battery & load" subtitle="What you've got + what you're running" Icon={Battery} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Battery chemistry</label>
            <Segmented value={chemistry} onChange={handleChemistryChange} options={chemistries as any} ariaLabel="Battery chemistry" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">
              Switching chemistry resets the DoD slider below to that chemistry's cycle-life-safe default.
            </p>
          </div>
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
                { value: 'custom', name: 'Custom', summary: 'Enter watts (assumed DC)' },
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
              <p className="text-xs text-gray-500 mt-1.5">
                If this is an AC load driven through an inverter, drop System efficiency to ~85% to account for inverter losses.
              </p>
            </div>
          )}
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Operating conditions" subtitle="Runtime, DoD, efficiency, temperature" Icon={Gauge} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Operating hours/day</label>
            <NumberInput value={operatingHours} onChange={setOperatingHours} min={0.1} max={24} suffix="hr" ariaLabel="Operating hours" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Depth of discharge
              <InfoTip label="DOD">
                LiFePO4/lithium: 80–90% safely (some go 100% for one-shot runtime).
                Lead-acid (flooded/AGM): 50% preserves cycle life; 80% shortens life dramatically.
              </InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{dod}%</span>
            </label>
            <input type="range" min={20} max={100} step={5} value={depthOfDischarge} onChange={(e) => setDepthOfDischarge(e.target.value)} className="w-full accent-blue-600" aria-label="DOD" />
            <p className="text-xs text-gray-500 mt-1">
              Default snapped from chemistry above — override if you know what you're doing.
            </p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              System efficiency
              <InfoTip label="efficiency">
                Combined inverter + wiring losses. ~90% is typical for a system with an inverter driving AC loads.
                For pure DC loads (LED, 12V fridge), use ~95%. Bad wiring or an old inverter can drop this to 80%.
              </InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{sysEff}%</span>
            </label>
            <input type="range" min={50} max={100} step={1} value={systemEfficiency} onChange={(e) => setSystemEfficiency(e.target.value)} className="w-full accent-blue-600" aria-label="System efficiency" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Operating temperature
              <InfoTip label="temperature">
                Cold reduces battery capacity — cold is a loss, never a gain. Lithium is more tolerant than lead-acid.
                Approximate anchor points: at 32 °F, lithium delivers ~80% of rated capacity, lead-acid ~65%.
                At −4 °F, lithium ~60%, lead-acid ~40%.
              </InfoTip>
              <span className="ml-auto text-sm font-semibold text-blue-700">{tempF}°F</span>
            </label>
            <input type="range" min={-20} max={120} step={1} value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full accent-blue-600" aria-label="Temperature" />
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
          eyebrow="Estimated runtime"
          value={calc.runtimeHours.toFixed(1)}
          unit={`hr at ${loadWatts}W draw`}
          secondaryText={
            <>
              Your {totalCapacity}Ah {srcChemistry === 'lithium' ? 'lithium' : 'lead-acid'} battery delivers{' '}
              <strong>{calc.usableWh.toFixed(0)} Wh usable</strong> (after DoD, temperature, and system efficiency),
              running {isCustom ? `${loadWatts}W` : load?.name.toLowerCase()} at <strong>{calc.currentAmps.toFixed(1)}A draw</strong> for{' '}
              <strong>{calc.runtimeHours.toFixed(1)} hours</strong>.
              {!calc.canMeet && <> Need {calc.parallelBatteries} batteries in parallel to hit {requestedHours} hr.</>}
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Nominal', value: `${fmt(calc.nominalWh)} Wh` },
            { label: 'Usable', value: `${calc.usableWh.toFixed(0)} Wh` },
            { label: 'Current draw', value: `${calc.currentAmps.toFixed(1)}A` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Battery className="w-4 h-4 text-blue-600" />
              Capacity math
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Nominal capacity', detail: `${totalCapacity}Ah × 12V`, factor: `${fmt(calc.nominalWh)} Wh` },
                { label: 'DoD limit', detail: `× ${dod}%`, factor: `${calc.usableAhBeforeTemp.toFixed(0)}Ah` },
                { label: 'Temperature derating', detail: `${tempF}°F, ${srcChemistry} → ${(calc.derating * 100).toFixed(0)}%`, factor: `${calc.adjustedCapacityAh.toFixed(0)}Ah` },
                { label: 'System efficiency', detail: `× ${sysEff}%`, factor: `${calc.usableWh.toFixed(0)} Wh usable` },
                { label: 'Load current', detail: `${loadWatts}W ÷ 12V`, factor: `${calc.currentAmps.toFixed(1)}A` },
              ]}
              totals={[
                { label: 'Estimated runtime', value: `${calc.runtimeHours.toFixed(1)} hours`, valueClass: calc.canMeet ? 'text-emerald-700' : 'text-red-700' },
                { label: 'Required for daily use', value: `${requestedHours.toFixed(1)} hours` },
              ]}
            />
            {srcChemistry === 'lead-acid' && (
              <div className="mt-3 p-3 bg-amber-50 rounded text-xs text-amber-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Lead-acid Peukert effect:</strong> lead-acid batteries deliver less than their rated capacity at
                  high discharge rates. For heavy or fast loads (draining in &lt;5 hours), derate an additional 20–30%
                  beyond the number above. Lithium (LiFePO4) is barely affected.
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-blue-600" />
              Charging
            </h4>
            <div className="space-y-1.5 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Recommended charger (C/10 universal)</span>
                <strong>{calc.recommendedChargeRateA.toFixed(1)}A</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Recharge time (used portion — {dod}% DoD)</span>
                <strong>{calc.rechargeUsedPortionHours.toFixed(1)} hr</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Full charge (0% → 100%)</span>
                <strong>{calc.fullChargeFromEmptyHours.toFixed(1)} hr</strong>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-900">
              Formula: <code className="bg-blue-100 px-1 rounded">time = (Ah × DoD) / charge amps × 1.15</code>
              — the 1.15 covers CC-CV taper (last 15–20% of charging slows) plus round-trip charging losses.
              {srcChemistry === 'lithium' && (
                <> Lithium (LiFePO4) can safely accept up to C/2 (50A on a 100Ah battery) with a matched lithium charger — cut these times ~5×.</>
              )}
            </div>

            {!calc.canMeet && (
              <div className="mt-3 p-3 bg-red-50 rounded text-xs text-red-900 flex gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>{totalCapacity}Ah is too small.</strong> For {requestedHours} hr × {loadWatts}W you need{' '}
                  <strong>{Math.round(calc.requiredBatteryCapacity)}Ah</strong>{' '}
                  ({calc.parallelBatteries} × {totalCapacity}Ah batteries in parallel).
                </div>
              </div>
            )}
            {tempF < 50 && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-xs text-blue-900 flex gap-2">
                <Snowflake className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Cold-weather derating:</strong> at {tempF}°F, {srcChemistry} capacity is reduced by{' '}
                  {((1 - calc.derating) * 100).toFixed(0)}%. Lithium (LiFePO4) with a self-heat option or an insulated
                  enclosure handles cold better than lead-acid.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SAFETY BLOCK — replaces the old wire-gauge / fuse / voltage-drop outputs.
            Rationale: the previous outputs mixed ampacity tables without stating standard,
            used an arbitrary 0.02Ω voltage-drop model with no cable-length input, and
            rounded fuse ratings to non-standard sizes. A homeowner acting on those numbers
            could install undersized wire — a real fire risk. Educational guidance + pointer
            to the actual sizing standards is the honest answer. */}
        <div className="bg-white rounded-xl border border-red-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            Wire gauge, fuse sizing, and voltage drop — do this by the standard, not a rule of thumb
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            Correct wire gauge and fuse size for a DC circuit depend on the specific cable run length, ambient
            temperature, insulation rating, and whether you follow <strong>NEC 310</strong> (residential /
            general) or <strong>ABYC E-11</strong> (marine, ~40% stricter derating). Voltage drop follows{' '}
            <code className="bg-gray-100 px-1 rounded">V_drop = 2 × I × L × ρ / A_cmil</code> — length matters, and a
            lookup that ignores length can push you toward wire that overheats.
          </p>
          <p className="text-xs text-gray-700 leading-relaxed mt-2">
            <strong>Do not size wire or a fuse from this calculator's runtime estimate alone.</strong>
            {' '}Look up your ampacity from an NEC 310.16 or ABYC E-11 wire chart for your specific cable length and
            temperature, and pick a standard fuse size from NEC 240.6(A) that protects the WIRE (not the load).
            Consult a licensed electrician for anything permanent — undersized wire is a real fire hazard.
          </p>
          <div className="mt-2 text-[11px] text-gray-500">
            The <em>load current</em> above ({calc.currentAmps.toFixed(1)}A at 12V) is correct as a starting point —
            it's the input to your wire-sizing chart, not a substitute for one.
          </div>
        </div>

        <DisclaimerBox title="Honest framing — what this calculator is and isn't">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li><strong>This is a planning estimate, not a design.</strong> Real runtime varies with battery age (down 20–30% at 3–5 years), discharge rate (see Peukert note for lead-acid), and repeated deep-cycling.</li>
            <li><strong>Lead-acid Peukert:</strong> derate 20–30% for heavy or fast loads (finishing in &lt;5 hr). Lithium (LiFePO4) barely affected — ignore Peukert for lithium.</li>
            <li><strong>AC loads:</strong> add another 5–10% loss on top of System efficiency for the inverter itself — pure sinewave inverters run 85–90%, cheap modified-sinewave 80% or less.</li>
            <li><strong>Cold:</strong> capacity numbers here use approximate anchors — get manufacturer capacity-vs-temperature curves for your exact cell for a real answer.</li>
            <li><strong>Electrical installation:</strong> wire, fuse, and connector sizing follow NEC or ABYC — use those standards or a licensed electrician. This calculator deliberately does not emit specific gauge or fuse numbers.</li>
            <li><strong>Fuse within 7 inches of the positive battery terminal</strong> — shorts in unfused wire can melt copper.</li>
            <li><strong>Parallel batteries should be identical age + chemistry</strong> — mismatched batteries kill cycle life.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
