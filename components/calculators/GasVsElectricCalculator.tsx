'use client';

import { useState, useMemo } from 'react';
import {
  Flame,
  Zap,
  DollarSign,
  Leaf,
  TrendingUp,
  Droplets,
  Wind,
  ChefHat,
  Shirt,
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

const ACCENT = 'orange' as const;

// gasEfficiency: combustion efficiency (delivered heat ÷ fuel input).
// electricEfficiency: resistance point-of-use efficiency.
// heatPumpCOP: assumed coefficient of performance for the heat-pump option
// (space heating 3.0, water heating 3.5 — matching the site's other calculators).
// allowsHeatPump: whether the "Heat pump" electric option is offered.
const applianceTypes = [
  { value: 'water-heater', name: 'Water heater', summary: '50,000 BTU gas, resistance or heat pump electric', Icon: Droplets,
    gasEfficiency: 0.85, electricEfficiency: 0.95, gasSize: 50000, electricSize: 4500, usageHours: 3, allowsHeatPump: true, heatPumpCOP: 3.5 },
  { value: 'furnace', name: 'Furnace / heating', summary: '80,000 BTU gas, resistance or heat pump electric', Icon: Flame,
    gasEfficiency: 0.90, electricEfficiency: 0.98, gasSize: 80000, electricSize: 15000, usageHours: 8, allowsHeatPump: true, heatPumpCOP: 3.0 },
  { value: 'dryer', name: 'Clothes dryer', summary: '22,000 BTU gas / 5000W electric', Icon: Shirt,
    gasEfficiency: 0.80, electricEfficiency: 1.0, gasSize: 22000, electricSize: 5000, usageHours: 1, allowsHeatPump: false, heatPumpCOP: 0 },
  { value: 'range', name: 'Cooking range', summary: '30,000 BTU gas / 3000W electric', Icon: ChefHat,
    gasEfficiency: 0.55, electricEfficiency: 0.85, gasSize: 30000, electricSize: 3000, usageHours: 1.5, allowsHeatPump: false, heatPumpCOP: 0 },
  { value: 'fireplace', name: 'Fireplace', summary: '40,000 BTU gas / 1500W electric', Icon: Wind,
    gasEfficiency: 0.75, electricEfficiency: 1.0, gasSize: 40000, electricSize: 1500, usageHours: 4, allowsHeatPump: false, heatPumpCOP: 0 },
];

const electricEquipmentOptions = [
  { value: 'standard', name: 'Standard', sub: 'Resistance' },
  { value: 'heat-pump', name: 'Heat pump', sub: 'COP 3.0-3.5' },
];

const DEFAULTS = {
  applianceType: 'water-heater',
  electricEquipment: 'standard',
  gasPrice: '1.35',        // assumed; your bill shows your rate
  electricRate: '0.18',    // EIA 2026 national residential average (sitewide standard)
  customGasSize: '',
  customElectricSize: '',
  customHours: '',
};

const GRID_LB_CO2_PER_MWH = 823;   // EPA eGRID2022 U.S. average (823.1 lb CO2e/MWh = 0.823 lb/kWh)
const NG_LB_CO2_PER_MMBTU = 117;   // U.S. EIA natural gas emission coefficient (~117 lb CO2 per million BTU)
const BTU_PER_KWH = 3412;

export default function GasVsElectricCalculator() {
  const [applianceType, setApplianceType] = useState(DEFAULTS.applianceType);
  const [electricEquipment, setElectricEquipment] = useState(DEFAULTS.electricEquipment);
  const [gasPrice, setGasPrice] = useState(DEFAULTS.gasPrice);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);
  const [customGasSize, setCustomGasSize] = useState(DEFAULTS.customGasSize);
  const [customElectricSize, setCustomElectricSize] = useState(DEFAULTS.customElectricSize);
  const [customHours, setCustomHours] = useState(DEFAULTS.customHours);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    applianceType, electricEquipment, gasPrice, electricRate, customGasSize, customElectricSize, customHours,
  });

  const uiSelected = applianceTypes.find((t) => t.value === applianceType)!;
  const selected = applianceTypes.find((t) => t.value === src.applianceType)!;
  const gP = Math.max(parseFloat(src.gasPrice) || 0, 0);
  const eR = Math.max(parseFloat(src.electricRate) || 0, 0);
  const gasBtuPerHr = src.customGasSize ? parseFloat(src.customGasSize) || 0 : selected.gasSize;
  const electricWatts = src.customElectricSize ? parseFloat(src.customElectricSize) || 0 : selected.electricSize;
  const hours = src.customHours ? parseFloat(src.customHours) || 0 : selected.usageHours;
  const isHeatPump = src.electricEquipment === 'heat-pump' && selected.allowsHeatPump;
  const electricEff = isHeatPump ? selected.heatPumpCOP : selected.electricEfficiency;

  const handleReset = () => {
    setApplianceType(DEFAULTS.applianceType);
    setElectricEquipment(DEFAULTS.electricEquipment);
    setGasPrice(DEFAULTS.gasPrice);
    setElectricRate(DEFAULTS.electricRate);
    setCustomGasSize(DEFAULTS.customGasSize);
    setCustomElectricSize(DEFAULTS.customElectricSize);
    setCustomHours(DEFAULTS.customHours);
    clear();
  };

  const calc = useMemo(() => {
    // Compare EQUAL DELIVERED HEAT, not equal hours. The gas appliance's
    // delivered (useful) heat is the reference; the electric option delivers
    // the same heat, using kWh = usefulHeat / (3,412 × electric efficiency).
    const dailyGasInputBtu = gasBtuPerHr * hours;
    const dailyUsefulHeatBtu = dailyGasInputBtu * selected.gasEfficiency;
    const dailyGasTherms = dailyGasInputBtu / 100000;
    const dailyElectricKwh = electricEff > 0 ? dailyUsefulHeatBtu / (BTU_PER_KWH * electricEff) : 0;

    const monthlyGasTherms = dailyGasTherms * 30;
    const yearlyGasTherms = monthlyGasTherms * 12;
    const monthlyElectricKwh = dailyElectricKwh * 30;
    const yearlyElectricKwh = monthlyElectricKwh * 12;

    const dailyGasCost = dailyGasTherms * gP;
    const monthlyGasCost = dailyGasCost * 30;
    const yearlyGasCost = monthlyGasCost * 12;
    const dailyElectricCost = dailyElectricKwh * eR;
    const monthlyElectricCost = dailyElectricCost * 30;
    const yearlyElectricCost = monthlyElectricCost * 12;

    const monthlySavings = monthlyElectricCost - monthlyGasCost;
    const yearlySavings = monthlySavings * 12;
    const gasCheaper = yearlySavings > 0;

    const yearlyGasInputBtu = dailyGasInputBtu * 360;
    const yearlyGasCO2 = (yearlyGasInputBtu / 1000000) * NG_LB_CO2_PER_MMBTU;
    const yearlyElectricCO2 = (yearlyElectricKwh / 1000) * GRID_LB_CO2_PER_MWH;
    const co2Difference = yearlyElectricCO2 - yearlyGasCO2;
    const gasGreener = co2Difference > 0;

    // The custom electric size no longer drives cost; it answers "how long
    // would an electric unit of this size run to deliver the same heat?"
    const electricKw = electricWatts / 1000;
    const electricHoursForSameHeat = electricKw > 0 ? dailyElectricKwh / electricKw : 0;

    const gasEffectiveBtu = gasBtuPerHr * selected.gasEfficiency;
    const electricEffectiveBtu = electricWatts * 3.412 * electricEff;

    return {
      dailyUsefulHeatBtu, dailyGasTherms, monthlyGasTherms, yearlyGasTherms,
      dailyElectricKwh, monthlyElectricKwh, yearlyElectricKwh,
      dailyGasCost, monthlyGasCost, yearlyGasCost,
      dailyElectricCost, monthlyElectricCost, yearlyElectricCost,
      monthlySavings, yearlySavings, gasCheaper,
      yearlyGasCO2, yearlyElectricCO2, co2Difference, gasGreener,
      electricHoursForSameHeat, gasEffectiveBtu, electricEffectiveBtu,
    };
  }, [gasBtuPerHr, electricWatts, hours, gP, eR, selected, electricEff]);

  const fit =
    Math.abs(calc.yearlySavings) < 30 ? { tone: 'ok' as const, text: 'Roughly equal, pick on comfort or fuel availability' } :
    Math.abs(calc.yearlySavings) < 150 ? { tone: 'good' as const, text: 'Modest difference, convenience may matter more' } :
                                         { tone: 'good' as const, text: `Clear winner, ${calc.gasCheaper ? 'gas' : 'electric'} saves $${fmtMoney(Math.abs(calc.yearlySavings))}/yr` };

  return (
    <CalcShell
      Icon={Flame}
      title="Gas vs Electric Cost Calculator"
      subtitle="Operating cost + CO₂ for the same delivered heat, any appliance."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Appliance */}
      <section>
        <SectionHeader step={1} title="Pick an appliance" subtitle="Common defaults ship with each | override below if you have specs" Icon={Flame} accent={ACCENT} />

        <CardChoice value={applianceType} onChange={setApplianceType} options={applianceTypes} ariaLabel="Appliance type" accent={ACCENT} />

        {uiSelected.allowsHeatPump && (
          <div className="mt-4">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Electric equipment
              <InfoTip label="electric equipment">Standard means resistance heating. A heat pump moves heat instead of making it, so it uses a fraction of the electricity; assumed COP {uiSelected.heatPumpCOP} here, matching the site&rsquo;s other calculators.</InfoTip>
            </label>
            <CardChoice value={electricEquipment} onChange={setElectricEquipment} options={electricEquipmentOptions} ariaLabel="Electric equipment" accent={ACCENT} columns={2} />
          </div>
        )}
      </section>

      {/* Section 2 — Rates */}
      <section>
        <SectionHeader step={2} title="Local utility rates" subtitle="From your last bill" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Natural gas price
              <InfoTip label="gas price">Check your bill: the per-therm rate (not the total). $1.35/therm is assumed; your bill shows your rate.</InfoTip>
            </label>
            <NumberInput value={gasPrice} onChange={setGasPrice} min={0.5} max={5} suffix="$/therm" ariaLabel="Gas price" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">Assumed $1.35/therm; your bill shows your rate</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
            <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">EIA 2026 US avg: ~$0.18/kWh</p>
          </div>
        </div>
      </section>

      {/* Section 3 — Custom overrides */}
      <section>
        <SectionHeader step={3} title="Specs (optional override)" subtitle={`Defaults for ${uiSelected.name.toLowerCase()}: ${fmt(uiSelected.gasSize)} BTU gas, ${fmt(uiSelected.electricSize)}W electric, ${uiSelected.usageHours} hr/day`} Icon={TrendingUp} accent={ACCENT} />

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Gas size override</label>
            <NumberInput value={customGasSize} onChange={setCustomGasSize} min={0} max={200000} suffix="BTU/hr" placeholder={`Default: ${fmt(uiSelected.gasSize)}`} ariaLabel="Custom gas size" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Electric size override</label>
            <NumberInput value={customElectricSize} onChange={setCustomElectricSize} min={0} max={50000} suffix="W" placeholder={`Default: ${fmt(uiSelected.electricSize)}`} ariaLabel="Custom electric size" accent={ACCENT} className="max-w-none" />
            <p className="text-[11px] text-gray-500 mt-1.5">Used for the run-time note, not the cost.</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Hours/day override</label>
            <NumberInput value={customHours} onChange={setCustomHours} min={0} max={24} suffix="hr/day" placeholder={`Default: ${uiSelected.usageHours}`} ariaLabel="Custom hours" accent={ACCENT} className="max-w-none" />
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

      {/* Results */}
      {hasResult && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow={calc.gasCheaper ? 'Natural gas is cheaper' : 'Electric is cheaper'}
          value={`$${fmtMoney(Math.abs(calc.yearlySavings))}`}
          unit={`/yr savings choosing ${calc.gasCheaper ? 'gas' : 'electric'}`}
          secondaryText={
            <>
              For this {selected.name.toLowerCase()} at {hours} hr/day, delivering the same heat, gas costs <strong>${fmtMoney(calc.yearlyGasCost)}/yr</strong> vs {isHeatPump ? 'a heat pump' : 'resistance electric'} at{' '}
              <strong>${fmtMoney(calc.yearlyElectricCost)}/yr</strong>. CO₂: gas {fmt(Math.round(calc.yearlyGasCO2))} lbs/yr vs electric {fmt(Math.round(calc.yearlyElectricCO2))} lbs/yr.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Gas annual', value: `$${fmtMoney(calc.yearlyGasCost)}` },
            { label: 'Electric annual', value: `$${fmtMoney(calc.yearlyElectricCost)}` },
            { label: 'Monthly diff', value: `$${fmtMoney(Math.abs(calc.monthlySavings))}/mo`, valueClass: calc.gasCheaper ? 'text-orange-700' : 'text-blue-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className={`bg-white rounded-xl border-2 p-4 ${calc.gasCheaper ? 'border-orange-400 ring-2 ring-orange-100' : 'border-gray-200'}`}>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              Natural gas
              {calc.gasCheaper && <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-orange-700">Winner</span>}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'BTU/hr rating', detail: 'Gas burner capacity', factor: `${fmt(gasBtuPerHr)} BTU` },
                { label: 'Hours/day', detail: 'Average use', factor: `${hours} hr` },
                { label: 'Delivered heat', detail: `× ${(selected.gasEfficiency * 100).toFixed(0)}% efficiency`, factor: `${fmt(Math.round(calc.dailyUsefulHeatBtu))} BTU/day` },
                { label: 'Therms/month', detail: '1 therm = 100,000 BTU', factor: `${calc.monthlyGasTherms.toFixed(1)}` },
                { label: 'Rate', detail: 'Per therm', factor: `× $${gP.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Daily', value: `$${calc.dailyGasCost.toFixed(2)}` },
                { label: 'Monthly', value: `$${fmtMoney(calc.monthlyGasCost)}` },
                { label: 'Yearly', value: `$${fmtMoney(calc.yearlyGasCost)}`, valueClass: 'text-orange-700' },
              ]}
            />
          </div>

          <div className={`bg-white rounded-xl border-2 p-4 ${!calc.gasCheaper ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'}`}>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Electric{isHeatPump ? ' (heat pump)' : ''}
              {!calc.gasCheaper && <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-blue-700">Winner</span>}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Same heat', detail: 'Matches the gas appliance', factor: `${fmt(Math.round(calc.dailyUsefulHeatBtu))} BTU/day` },
                { label: isHeatPump ? 'Heat pump COP' : 'Resistance efficiency', detail: isHeatPump ? 'Assumed' : 'Point of use', factor: isHeatPump ? `${electricEff.toFixed(1)}×` : `${(electricEff * 100).toFixed(0)}%` },
                { label: 'kWh/month', detail: 'heat ÷ (3,412 × efficiency)', factor: `${calc.monthlyElectricKwh.toFixed(0)}` },
                { label: 'Rate', detail: 'Per kWh', factor: `× $${eR.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Daily', value: `$${calc.dailyElectricCost.toFixed(2)}` },
                { label: 'Monthly', value: `$${fmtMoney(calc.monthlyElectricCost)}` },
                { label: 'Yearly', value: `$${fmtMoney(calc.yearlyElectricCost)}`, valueClass: 'text-blue-700' },
              ]}
            />
            {electricWatts > 0 && (
              <p className="text-[11px] text-gray-600 mt-2 leading-snug">
                An electric unit of {fmt(electricWatts)}W needs about <strong>{calc.electricHoursForSameHeat.toFixed(1)} hours</strong> a day to deliver the same heat (its kWh ÷ its kW).
              </p>
            )}
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Environmental impact
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded bg-white text-xs">
                <span className="font-medium text-gray-800">Gas CO₂/year</span>
                <span className="font-bold tabular-nums text-gray-900">{fmt(Math.round(calc.yearlyGasCO2))} lbs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-white text-xs">
                <span className="font-medium text-gray-800">Electric CO₂/year</span>
                <span className="font-bold tabular-nums text-gray-900">{fmt(Math.round(calc.yearlyElectricCO2))} lbs</span>
              </div>
              <div className={`flex items-center justify-between p-2.5 rounded text-xs ${calc.gasGreener ? 'bg-orange-50 ring-1 ring-orange-200' : 'bg-blue-50 ring-1 ring-blue-200'}`}>
                <span className="font-bold text-gray-900">
                  {calc.gasGreener ? 'Gas wins by' : 'Electric wins by'}
                </span>
                <span className={`font-bold tabular-nums ${calc.gasGreener ? 'text-orange-700' : 'text-blue-700'}`}>
                  {fmt(Math.round(Math.abs(calc.co2Difference)))} lbs CO₂/yr
                </span>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 mt-2 leading-snug">
              Electricity uses the EPA eGRID2022 U.S. average ({GRID_LB_CO2_PER_MWH} lb CO2e/MWh, or 0.823 lb/kWh; <a href="https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700">EPA Greenhouse Gas Equivalencies</a>). Gas uses the U.S. EIA natural gas emission coefficient (about {NG_LB_CO2_PER_MMBTU} lb CO2 per million BTU). Renewable-heavy grids (CA, WA) tip toward electric; coal grids (WV, KY) toward gas.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              Efficiency comparison
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Gas efficiency</span>
                <strong>{(selected.gasEfficiency * 100).toFixed(0)}%</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Electric {isHeatPump ? 'COP' : 'efficiency'}</span>
                <strong>{isHeatPump ? `${electricEff.toFixed(1)}×` : `${(electricEff * 100).toFixed(0)}%`}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span>Gas effective BTU/hr</span>
                <strong className="tabular-nums">{fmt(Math.round(calc.gasEffectiveBtu))}</strong>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Electric effective BTU/hr</span>
                <strong className="tabular-nums">{fmt(Math.round(calc.electricEffectiveBtu))}</strong>
              </div>
            </div>
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              A resistance element is 90-100% efficient at the point of use; a heat pump moves several times more heat per kWh. The "effective BTU" line shows what actually warms or cooks at the appliance&rsquo;s rated size.
            </p>
          </div>
        </div>

        <DisclaimerBox title="What this comparison can't tell you">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Both sides deliver the same heat; the electric column sizes its kWh to match the gas appliance&rsquo;s output, so hours and wattage set the heat, not the winner</li>
            <li>Connection fees: switching from gas to all-electric saves the monthly gas meter fee ($15-$30/mo in most utilities)</li>
            <li>Resale value: in some markets, gas hookup adds value; in CA and parts of NE, all-electric adds value</li>
            <li>Cooking preference: chefs often pay for gas comfort; induction matches gas on responsiveness for a fraction of the energy</li>
            <li>Time-of-use electric rates can make electric appliances much cheaper when run overnight</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
