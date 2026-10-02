'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  DollarSign,
  AlertCircle,
  BarChart,
  Flame,
  Settings,
  Wind,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
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
import residentialRates from '@/data/eia/residential-rates.json';

const ACCENT = 'orange' as const;

const furnaceSizes = [
  { value: '40000', name: '40,000 BTU', sub: '1–2 bedroom', btu: 40000, blowerWatts: 400, inducerWatts: 60, igniterWatts: 200, controlWatts: 10 },
  { value: '60000', name: '60,000 BTU', sub: '2–3 bedroom', btu: 60000, blowerWatts: 500, inducerWatts: 75, igniterWatts: 200, controlWatts: 10 },
  { value: '80000', name: '80,000 BTU', sub: '3–4 bedroom', btu: 80000, blowerWatts: 600, inducerWatts: 85, igniterWatts: 200, controlWatts: 10 },
  { value: '100000', name: '100,000 BTU', sub: '4+ bedroom', btu: 100000, blowerWatts: 750, inducerWatts: 100, igniterWatts: 200, controlWatts: 10 },
  { value: '120000', name: '120,000 BTU', sub: 'Large home', btu: 120000, blowerWatts: 900, inducerWatts: 125, igniterWatts: 200, controlWatts: 10 },
];

const blowerTypes = [
  { value: 'psc', name: 'PSC (standard)', sub: 'Older single-speed motor', multiplier: 1 },
  { value: 'ecm', name: 'ECM (variable)', sub: 'Modern energy-efficient', multiplier: 0.5 },
];

const heatingHoursOptions = [
  { value: '600', name: 'Mild', sub: '600 hrs' },
  { value: '900', name: 'Moderate', sub: '900 hrs' },
  { value: '1200', name: 'Average', sub: '1200 hrs' },
  { value: '1500', name: 'Cold', sub: '1500 hrs' },
  { value: '2000', name: 'Very cold', sub: '2000 hrs' },
];

// State residential prices from the EIA Electric Power Monthly dataset
// (year-to-date average, January to July 2026). Optional quick-fill picker.
const NAME_TO_CODE: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA', Colorado: 'CO',
  Connecticut: 'CT', Delaware: 'DE', Florida: 'FL', Georgia: 'GA', Hawaii: 'HI', Idaho: 'ID',
  Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS', Kentucky: 'KY', Louisiana: 'LA',
  Maine: 'ME', Maryland: 'MD', Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN', Mississippi: 'MS',
  Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK',
  Oregon: 'OR', Pennsylvania: 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', Tennessee: 'TN',
  Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA', Washington: 'WA', 'West Virginia': 'WV',
  Wisconsin: 'WI', Wyoming: 'WY', 'District of Columbia': 'DC',
};
const rateData = residentialRates.rates as Record<string, { yearToDateCentsPerKwh: number }>;
const stateRates: Record<string, { rate: number; name: string }> = Object.fromEntries(
  Object.entries(NAME_TO_CODE)
    .filter(([name]) => rateData[name])
    .map(([name, code]) => [code, { rate: rateData[name].yearToDateCentsPerKwh, name }]),
);
const stateList = Object.entries(stateRates).sort((a, b) => a[1].name.localeCompare(b[1].name));

const DEFAULTS = {
  furnaceSize: '80000',
  blowerType: 'psc',
  runHours: '1200',
  electricRate: '0.18', // EIA 2026 US residential average
  state: '',
  fanOnlyHours: '500',
};

export default function FurnaceElectricalCalculator() {
  const [furnaceSize, setFurnaceSize] = useState(DEFAULTS.furnaceSize);
  const [blowerType, setBlowerType] = useState(DEFAULTS.blowerType);
  const [runHours, setRunHours] = useState(DEFAULTS.runHours);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [state, setState] = useState(DEFAULTS.state);
  const [fanOnlyHours, setFanOnlyHours] = useState(DEFAULTS.fanOnlyHours);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    furnaceSize, blowerType, runHours, electricRate, state, fanOnlyHours,
  });

  // Picking a state quick-fills the editable rate (cents -> $); user can override.
  const applyStateRate = (code: string) => {
    setState(code);
    if (stateRates[code]) setElectricRate((stateRates[code].rate / 100).toFixed(4).replace(/0+$/, '').replace(/\.$/, ''));
  };

  const specs = furnaceSizes.find((f) => f.value === src.furnaceSize)!;
  const blower = blowerTypes.find((b) => b.value === src.blowerType)!;
  const rate = parseFloat(src.electricRate);
  const heatHrs = Math.max(parseFloat(src.runHours) || 0, 0);
  const fanHrs = Math.max(parseFloat(src.fanOnlyHours) || 0, 0);

  const handleReset = () => {
    setFurnaceSize(DEFAULTS.furnaceSize);
    setBlowerType(DEFAULTS.blowerType);
    setRunHours(DEFAULTS.runHours);
    setElectricRate(DEFAULTS.electricRate);
    setState(DEFAULTS.state);
    setFanOnlyHours(DEFAULTS.fanOnlyHours);
    clear();
  };

  const calc = useMemo(() => {
    const actualBlowerWatts = specs.blowerWatts * blower.multiplier;
    const heatingWatts = actualBlowerWatts + specs.inducerWatts + specs.controlWatts;
    const startupWatts = heatingWatts + specs.igniterWatts;
    // Igniter fires at the start of each heating cycle. Real residential
    // thermostats cycle roughly 3–8 times per hour of active heating; we use
    // 3 cycles/hr (bottom of the range) as a conservative estimate. Prior
    // formula (heatHrs / 120 × 10 = 1 cycle per 12 hours of runtime) was ~30×
    // low; total kWh impact is trivial either way (~0.5% of annual furnace
    // electric), but the row-level number the user sees is now realistic.
    const startupCycles = heatHrs * 3;
    const startupKwh = (specs.igniterWatts * 0.5 / 60) * startupCycles / 1000;
    const runningKwh = (heatingWatts * heatHrs) / 1000;
    const fanOnlyKwh = (actualBlowerWatts * fanHrs) / 1000;
    const totalKwh = runningKwh + startupKwh + fanOnlyKwh;
    const annualCost = totalKwh * rate;
    const monthlyKwhHeating = runningKwh / 6;
    const monthlyCostHeating = monthlyKwhHeating * rate;
    const dailyHoursHeating = heatHrs / 180;
    const dailyKwhHeating = (heatingWatts * dailyHoursHeating) / 1000;
    const dailyCostHeating = dailyKwhHeating * rate;
    const ecmSavings = src.blowerType === 'psc'
      ? ((specs.blowerWatts - specs.blowerWatts * 0.5) * (heatHrs + fanHrs) / 1000) * rate
      : 0;
    const maxAmps = startupWatts / 120;
    const recommendedBreaker = maxAmps < 12 ? 15 : maxAmps < 16 ? 20 : 30;
    const wireGauge = recommendedBreaker <= 15 ? '14 AWG' : '12 AWG';

    return {
      actualBlowerWatts, heatingWatts, startupWatts,
      runningKwh, startupKwh, fanOnlyKwh, totalKwh, annualCost,
      monthlyKwhHeating, monthlyCostHeating, dailyKwhHeating, dailyCostHeating,
      ecmSavings, maxAmps, recommendedBreaker, wireGauge,
    };
  }, [specs, blower, src.blowerType, heatHrs, fanHrs, rate]);

  const fit =
    calc.totalKwh === 0 ? { tone: 'warn' as const, text: 'Enter runtime hours' } :
    calc.annualCost < 50 ? { tone: 'good' as const, text: 'Trivial annual electric cost' } :
    calc.annualCost < 120 ? { tone: 'good' as const, text: 'Modest annual electric cost' } :
                            { tone: 'ok' as const, text: 'Notable annual electric cost' };

  return (
    <CalcShell
      Icon={Flame}
      title="Gas Furnace Electrical Usage Calculator"
      subtitle="Blower + inducer + igniter electric draw, costs, and circuit needs."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Your furnace" subtitle="Size and blower motor type" Icon={Flame} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Furnace size</label>
            <CardChoice value={furnaceSize} onChange={setFurnaceSize} options={furnaceSizes.map(f => ({ value: f.value, name: f.name, sub: f.sub }))} ariaLabel="Furnace size" accent={ACCENT} columns={5} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Blower motor type
              <InfoTip label="blower type">PSC (permanent split capacitor) motors run at one speed and pull constant power. ECM (electronically commutated motors) are variable-speed and use about half the electricity.</InfoTip>
            </label>
            <CardChoice value={blowerType} onChange={setBlowerType} options={blowerTypes} ariaLabel="Blower type" accent={ACCENT} columns={2} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Runtime & rate" subtitle="Annual hours and your electric rate" Icon={Settings} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Annual heating hours</label>
            <CardChoice value={runHours} onChange={setRunHours} options={heatingHoursOptions} ariaLabel="Heating hours" accent={ACCENT} columns={5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Fan-only circulation hours
                <InfoTip label="fan-only hours">If you run the blower in "on" mode (rather than "auto") for air filtration, count those hours separately. 500 hrs/yr is typical.</InfoTip>
              </label>
              <NumberInput value={fanOnlyHours} onChange={setFanOnlyHours} min={0} max={8760} suffix="hrs" ariaLabel="Fan-only hours" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Electric rate
                <InfoTip label="electric rate">Check your latest bill. The default $0.18/kWh is the EIA U.S. residential average, January to July 2026. Pick a state below to quick-fill that state&rsquo;s EIA average.</InfoTip>
              </label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.6} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              State quick-fill <span className="text-xs font-normal text-gray-500">(EIA average, Jan-Jul 2026)</span>
            </label>
            <select
              value={state}
              onChange={(e) => applyStateRate(e.target.value)}
              aria-label="State electricity rate"
              className="w-full max-w-sm px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">Select a state (optional)</option>
              {stateList.map(([code, { name, rate }]) => (
                <option key={code} value={code}>{name}, {rate.toFixed(2)}&cent;/kWh</option>
              ))}
            </select>
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
          eyebrow="Annual electricity cost"
          value={`$${fmtMoney(calc.annualCost)}`}
          unit={`/yr (${fmt(Math.round(calc.totalKwh))} kWh)`}
          secondaryText={
            <>
              Your gas furnace pulls <strong>{specs.btu.toLocaleString('en-US')} BTU</strong> from gas but runs electrics on
              the side: blower {fmt(calc.actualBlowerWatts)}W, inducer {specs.inducerWatts}W, controls {specs.controlWatts}W.
              {src.blowerType === 'psc' && <> Switching to ECM would save <strong>${fmtMoney(calc.ecmSavings)}/yr</strong>.</>}
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Daily (heat season)', value: `$${calc.dailyCostHeating.toFixed(2)}` },
            { label: 'Monthly (heat season)', value: `$${fmtMoney(calc.monthlyCostHeating)}` },
            { label: 'Recommended breaker', value: `${calc.recommendedBreaker}A` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <BarChart className="w-4 h-4 text-orange-600" />
              Power draw by mode
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Running', detail: 'Blower + inducer + controls', factor: `${fmt(calc.heatingWatts)}W` },
                { label: 'Startup', detail: '+ hot surface igniter', factor: `${fmt(calc.startupWatts)}W` },
                { label: 'Fan only', detail: 'Blower in circulation', factor: `${fmt(calc.actualBlowerWatts)}W` },
                { label: 'Component: blower', detail: blower.name, factor: `${fmt(calc.actualBlowerWatts)}W` },
                { label: 'Component: inducer', detail: 'Combustion fan', factor: `${specs.inducerWatts}W` },
                { label: 'Component: igniter', detail: 'Hot surface, brief', factor: `${specs.igniterWatts}W` },
                { label: 'Component: controls', detail: 'Board + thermostat', factor: `${specs.controlWatts}W` },
              ]}
              totals={[
                { label: 'Total annual kWh', value: `${fmt(Math.round(calc.totalKwh))} kWh`, valueClass: 'text-orange-700' },
              ]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">Wattages are typical; check your furnace&rsquo;s rating plate (amps x 120 V) for its exact draw.</p>
          </div>

          {/* CIRCUIT / WIRING PANEL — reframed as CONFIRMING that the furnace
              fits within the standard residential dedicated circuit that NEC
              422 + the manufacturer's install manual already require, NOT
              sizing a custom circuit for the user. This calc is the ONE
              exception to the "no wire-gauge output" pattern we applied to
              Battery12V (#1), ThreePhase (#3), and GeneratorAmps (#4). The
              rationale: those siblings had wire-gauge outputs that (a) needed
              to handle a wide range of currents, (b) mixed ampacity standards,
              and (c) targeted install contexts (RV/marine, industrial 480V,
              generator transfer switches) where a wrong number is genuinely
              hazardous. Gas furnace circuits are bounded: <10 A draw at 120V,
              15A breaker + 14 AWG dedicated circuit is what the furnace
              install manual + NEC 422 require. The output here confirms fit,
              matches mandatory code, and can't send a homeowner to a wrong
              install because the "right" answer is the same standard circuit
              their electrician was already going to run. */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-orange-600" />
              Circuit confirmation
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Voltage', detail: 'Standard 120V residential', factor: '120V' },
                { label: 'Max amps', detail: 'At startup surge', factor: `${calc.maxAmps.toFixed(1)}A` },
                { label: 'Confirmed breaker', detail: 'Per NEC 210.20 (125% continuous)', factor: `${calc.recommendedBreaker}A` },
                { label: 'Confirmed wire gauge', detail: 'Per NEC 240.4(D) + 310.16', factor: calc.wireGauge },
              ]}
              totals={[]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              Gas furnaces install on a <strong>dedicated 120V circuit</strong> (typically 15A / 14 AWG) per the
              manufacturer's install manual and NEC 422. This confirms your furnace's draw fits within that standard
              circuit, always follow your unit's install manual and have a licensed electrician verify the circuit.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-orange-600" />
              Annual energy split
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Heating runtime', detail: `${fmt(heatHrs)} hrs × ${fmt(calc.heatingWatts)}W`, factor: `${fmt(Math.round(calc.runningKwh))} kWh` },
                { label: 'Fan-only mode', detail: `${fmt(fanHrs)} hrs × ${fmt(calc.actualBlowerWatts)}W`, factor: `${fmt(Math.round(calc.fanOnlyKwh))} kWh` },
                { label: 'Igniter energy', detail: `~3 cycles/hr × ~30s each`, factor: `${calc.startupKwh.toFixed(1)} kWh` },
              ]}
              totals={[
                { label: 'Total', value: `${fmt(Math.round(calc.totalKwh))} kWh`, valueClass: 'text-orange-700' },
                { label: 'Cost @ $' + rate.toFixed(2) + '/kWh', value: `$${fmtMoney(calc.annualCost)}`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          {src.blowerType === 'psc' && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                ECM upgrade potential
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Your PSC blower pulls <strong>{specs.blowerWatts}W</strong>. An ECM swap drops that to roughly{' '}
                <strong>{Math.round(specs.blowerWatts * 0.5)}W</strong>, saving <strong>${fmtMoney(calc.ecmSavings)}/yr</strong>.
                ECM motors also run variable-speed for better comfort and 50% quieter operation.
                Some state/utility programs (check DSIRE for your area) may offset part of the cost.
              </p>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-blue-700" />
              Cost in perspective
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Gas furnaces use surprisingly little electricity, about as much as 2–3 LED bulbs during operation.
              The blower motor accounts for <strong>{Math.round((calc.actualBlowerWatts / calc.heatingWatts) * 100)}%</strong> of furnace electrical draw.
              {calc.maxAmps > 10 && <> Your furnace needs a dedicated <strong>{calc.recommendedBreaker}A</strong> circuit, sharing with other appliances will trip the breaker on startup.</>}
              {fanHrs > 1000 && <> Running fan-only continuously adds <strong>${fmtMoney(calc.fanOnlyKwh * rate)}</strong> per year, worth it only if you're filtering allergens.</>}
            </p>
          </div>
        </div>

        <DisclaimerBox title="Real-world notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Igniter wattage shown is the peak draw, it runs only 20–60 seconds per cycle, so total kWh impact is tiny (~0.5% of annual furnace electricity)</li>
            <li>ECM motors save more in homes with longer heating seasons or extensive fan-only runtime</li>
            <li>Two-stage and modulating furnaces with ECM can pull as little as 100W on low fire, half what's shown here</li>
            <li>If your furnace shares a circuit with the AC condensate pump, sump pump, or AC blower (rare but possible), wire amperage may need to be sized for the larger load</li>
            <li><strong>Monthly/daily "heat season" figures assume a 6-month (~180-day) heating season</strong>, scale roughly to your climate (~2 months in Florida, ~9 months in Alaska). Total annual kWh and cost are driven by the runtime hours you selected above, not by this assumption.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
