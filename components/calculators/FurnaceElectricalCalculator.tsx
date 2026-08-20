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

const electricRateOptions = [
  { value: '0.10', name: 'Low', sub: '$0.10/kWh' },
  { value: '0.14', name: 'Average', sub: '$0.14/kWh' },
  { value: '0.20', name: 'High', sub: '$0.20/kWh' },
  { value: '0.30', name: 'Very high', sub: '$0.30/kWh' },
];

const DEFAULTS = {
  furnaceSize: '80000',
  blowerType: 'psc',
  runHours: '1200',
  electricRate: '0.14',
  fanOnlyHours: '500',
};

export default function FurnaceElectricalCalculator() {
  const [furnaceSize, setFurnaceSize] = useState(DEFAULTS.furnaceSize);
  const [blowerType, setBlowerType] = useState(DEFAULTS.blowerType);
  const [runHours, setRunHours] = useState(DEFAULTS.runHours);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [fanOnlyHours, setFanOnlyHours] = useState(DEFAULTS.fanOnlyHours);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    furnaceSize, blowerType, runHours, electricRate, fanOnlyHours,
  });

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
    setFanOnlyHours(DEFAULTS.fanOnlyHours);
    clear();
  };

  const calc = useMemo(() => {
    const actualBlowerWatts = specs.blowerWatts * blower.multiplier;
    const heatingWatts = actualBlowerWatts + specs.inducerWatts + specs.controlWatts;
    const startupWatts = heatingWatts + specs.igniterWatts;
    const startupCycles = (heatHrs / 120) * 10;
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
                            { tone: 'ok' as const, text: 'Notable cost — ECM upgrade pays back' };

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
              <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
              <Segmented value={electricRate} onChange={setElectricRate} options={electricRateOptions} ariaLabel="Electric rate" accent={ACCENT} />
            </div>
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
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-orange-600" />
              Circuit & wiring needs
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Voltage', detail: 'Standard 120V circuit', factor: '120V' },
                { label: 'Max amps', detail: 'At startup surge', factor: `${calc.maxAmps.toFixed(1)}A` },
                { label: 'Recommended breaker', detail: 'NEC sizing rule', factor: `${calc.recommendedBreaker}A` },
                { label: 'Wire gauge', detail: 'Copper, 75°C insulation', factor: calc.wireGauge },
              ]}
              totals={[]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              Most gas furnaces need a <strong>dedicated circuit</strong>. Sharing with other appliances can trip the breaker on startup surge. The breaker size shown gives 25% headroom above the running load.
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
                { label: 'Igniter cycles', detail: '~30s per cycle', factor: `${calc.startupKwh.toFixed(1)} kWh` },
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
                ECM motors also run variable-speed for better comfort and 50% quieter operation. Upgrade typically costs $800–$1,200 — payback in {calc.ecmSavings > 0 ? `${(1000 / calc.ecmSavings).toFixed(1)} years` : '—'}.
                Some state/utility programs (check DSIRE for your area) offset part of the swap cost.
              </p>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-blue-700" />
              Cost in perspective
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Gas furnaces use surprisingly little electricity — about as much as 2–3 LED bulbs during operation.
              The blower motor accounts for <strong>{Math.round((calc.actualBlowerWatts / calc.heatingWatts) * 100)}%</strong> of furnace electrical draw.
              {calc.maxAmps > 10 && <> Your furnace needs a dedicated <strong>{calc.recommendedBreaker}A</strong> circuit — sharing with other appliances will trip the breaker on startup.</>}
              {fanHrs > 1000 && <> Running fan-only continuously adds <strong>${fmtMoney(calc.fanOnlyKwh * rate)}</strong> per year — worth it only if you're filtering allergens.</>}
            </p>
          </div>
        </div>

        <DisclaimerBox title="Real-world notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Igniter wattage shown is the peak draw — it runs only 20–60 seconds per cycle, so total kWh impact is tiny</li>
            <li>ECM motors save more in homes with longer heating seasons or extensive fan-only runtime</li>
            <li>Two-stage and modulating furnaces with ECM can pull as little as 100W on low fire — half what's shown here</li>
            <li>If your furnace shares a circuit with the AC condensate pump, sump pump, or AC blower (rare but possible), wire amperage may need to be sized for the larger load</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
