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
} from './_shared';

const ACCENT = 'orange' as const;

const applianceTypes = [
  { value: 'water-heater', name: 'Water heater', summary: '50,000 BTU gas / 4500W electric', Icon: Droplets,
    gasEfficiency: 0.85, electricEfficiency: 0.95, gasSize: 50000, electricSize: 4500, usageHours: 3 },
  { value: 'furnace', name: 'Furnace / heating', summary: '80,000 BTU gas / 15,000W electric', Icon: Flame,
    gasEfficiency: 0.90, electricEfficiency: 0.98, gasSize: 80000, electricSize: 15000, usageHours: 8 },
  { value: 'dryer', name: 'Clothes dryer', summary: '22,000 BTU gas / 5000W electric', Icon: Shirt,
    gasEfficiency: 0.80, electricEfficiency: 1.0, gasSize: 22000, electricSize: 5000, usageHours: 1 },
  { value: 'range', name: 'Cooking range', summary: '30,000 BTU gas / 3000W electric', Icon: ChefHat,
    gasEfficiency: 0.55, electricEfficiency: 0.85, gasSize: 30000, electricSize: 3000, usageHours: 1.5 },
  { value: 'fireplace', name: 'Fireplace', summary: '40,000 BTU gas / 1500W electric', Icon: Wind,
    gasEfficiency: 0.75, electricEfficiency: 1.0, gasSize: 40000, electricSize: 1500, usageHours: 4 },
];

export default function GasVsElectricCalculator() {
  const [applianceType, setApplianceType] = useState('water-heater');
  const [gasPrice, setGasPrice] = useState('1.20');
  const [electricRate, setElectricRate] = useState('0.16');
  const [customGasSize, setCustomGasSize] = useState('');
  const [customElectricSize, setCustomElectricSize] = useState('');
  const [customHours, setCustomHours] = useState('');

  const selected = applianceTypes.find((t) => t.value === applianceType)!;
  const gP = Math.max(parseFloat(gasPrice) || 0, 0);
  const eR = Math.max(parseFloat(electricRate) || 0, 0);
  const gasBtuPerHr = customGasSize ? parseFloat(customGasSize) || 0 : selected.gasSize;
  const electricWatts = customElectricSize ? parseFloat(customElectricSize) || 0 : selected.electricSize;
  const hours = customHours ? parseFloat(customHours) || 0 : selected.usageHours;

  const calc = useMemo(() => {
    const dailyGasBtu = gasBtuPerHr * hours;
    const monthlyGasBtu = dailyGasBtu * 30;
    const yearlyGasBtu = monthlyGasBtu * 12;
    const dailyElectricKwh = (electricWatts * hours) / 1000;
    const monthlyElectricKwh = dailyElectricKwh * 30;
    const yearlyElectricKwh = monthlyElectricKwh * 12;

    const dailyGasCost = (dailyGasBtu / 100000) * gP;
    const monthlyGasCost = dailyGasCost * 30;
    const yearlyGasCost = monthlyGasCost * 12;
    const dailyElectricCost = dailyElectricKwh * eR;
    const monthlyElectricCost = dailyElectricCost * 30;
    const yearlyElectricCost = monthlyElectricCost * 12;

    const monthlySavings = monthlyElectricCost - monthlyGasCost;
    const yearlySavings = monthlySavings * 12;
    const gasCheaper = yearlySavings > 0;

    const yearlyGasCO2 = (yearlyGasBtu / 1000000) * 117;
    const yearlyElectricCO2 = (yearlyElectricKwh / 1000) * 1222;
    const co2Difference = yearlyElectricCO2 - yearlyGasCO2;
    const gasGreener = co2Difference > 0;

    const gasEffectiveBtu = gasBtuPerHr * selected.gasEfficiency;
    const electricEffectiveBtu = electricWatts * 3.412 * selected.electricEfficiency;

    return {
      dailyGasBtu, monthlyGasBtu, yearlyGasBtu,
      dailyElectricKwh, monthlyElectricKwh, yearlyElectricKwh,
      dailyGasCost, monthlyGasCost, yearlyGasCost,
      dailyElectricCost, monthlyElectricCost, yearlyElectricCost,
      monthlySavings, yearlySavings, gasCheaper,
      yearlyGasCO2, yearlyElectricCO2, co2Difference, gasGreener,
      gasEffectiveBtu, electricEffectiveBtu,
    };
  }, [gasBtuPerHr, electricWatts, hours, gP, eR, selected]);

  const fit =
    Math.abs(calc.yearlySavings) < 30 ? { tone: 'ok' as const, text: 'Roughly equal — pick on comfort or fuel availability' } :
    Math.abs(calc.yearlySavings) < 150 ? { tone: 'good' as const, text: 'Modest difference — convenience may matter more' } :
                                         { tone: 'good' as const, text: `Clear winner — ${calc.gasCheaper ? 'gas' : 'electric'} saves $${fmtMoney(Math.abs(calc.yearlySavings))}/yr` };

  return (
    <CalcShell
      Icon={Flame}
      title="Gas vs Electric Cost Calculator"
      subtitle="Operating cost + CO₂ + efficiency side-by-side for any appliance. Updates live."
      accent={ACCENT}
    >
      {/* Section 1 — Appliance */}
      <section>
        <SectionHeader step={1} title="Pick an appliance" subtitle="Common defaults ship with each — override below if you have specs" Icon={Flame} accent={ACCENT} />

        <CardChoice value={applianceType} onChange={setApplianceType} options={applianceTypes} ariaLabel="Appliance type" accent={ACCENT} />
      </section>

      {/* Section 2 — Rates */}
      <section>
        <SectionHeader step={2} title="Local utility rates" subtitle="From your last bill" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Natural gas price
              <InfoTip label="gas price">Check your bill: the per-therm rate (not the total). US 2026 average ~$1.20/therm. Propane averages $2.75/gal.</InfoTip>
            </label>
            <NumberInput value={gasPrice} onChange={setGasPrice} min={0.5} max={5} suffix="$/therm" ariaLabel="Gas price" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">US 2026 average: $1.20/therm</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
            <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">US 2026 average: $0.16/kWh</p>
          </div>
        </div>
      </section>

      {/* Section 3 — Custom overrides */}
      <section>
        <SectionHeader step={3} title="Specs (optional override)" subtitle={`Defaults for ${selected.name.toLowerCase()}: ${fmt(selected.gasSize)} BTU gas, ${fmt(selected.electricSize)}W electric, ${selected.usageHours} hr/day`} Icon={TrendingUp} accent={ACCENT} />

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Gas size override</label>
            <NumberInput value={customGasSize} onChange={setCustomGasSize} min={0} max={200000} suffix="BTU/hr" placeholder={`Default: ${fmt(selected.gasSize)}`} ariaLabel="Custom gas size" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Electric size override</label>
            <NumberInput value={customElectricSize} onChange={setCustomElectricSize} min={0} max={50000} suffix="W" placeholder={`Default: ${fmt(selected.electricSize)}`} ariaLabel="Custom electric size" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Hours/day override</label>
            <NumberInput value={customHours} onChange={setCustomHours} min={0} max={24} suffix="hr/day" placeholder={`Default: ${selected.usageHours}`} ariaLabel="Custom hours" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow={calc.gasCheaper ? 'Natural gas is cheaper' : 'Electric is cheaper'}
          value={`$${fmtMoney(Math.abs(calc.yearlySavings))}`}
          unit={`/yr savings choosing ${calc.gasCheaper ? 'gas' : 'electric'}`}
          secondaryText={
            <>
              For this {selected.name.toLowerCase()} at {hours} hr/day, gas costs <strong>${fmtMoney(calc.yearlyGasCost)}/yr</strong> vs electric at{' '}
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
                { label: 'Therms/month', detail: '1 therm = 100,000 BTU', factor: `${(calc.monthlyGasBtu / 100000).toFixed(1)}` },
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
              Electric
              {!calc.gasCheaper && <span className="ml-auto text-[10px] uppercase tracking-wider font-bold text-blue-700">Winner</span>}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Wattage', detail: 'Electric draw', factor: `${fmt(electricWatts)}W` },
                { label: 'Hours/day', detail: 'Average use', factor: `${hours} hr` },
                { label: 'kWh/month', detail: 'Energy used', factor: `${calc.monthlyElectricKwh.toFixed(0)}` },
                { label: 'Rate', detail: 'Per kWh', factor: `× $${eR.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Daily', value: `$${calc.dailyElectricCost.toFixed(2)}` },
                { label: 'Monthly', value: `$${fmtMoney(calc.monthlyElectricCost)}` },
                { label: 'Yearly', value: `$${fmtMoney(calc.yearlyElectricCost)}`, valueClass: 'text-blue-700' },
              ]}
            />
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
              Based on US grid average (1,222 lbs CO₂/MWh). Renewable-heavy grids (CA, WA) tip the balance toward electric; coal grids (WV, KY) tip toward gas.
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
                <span>Electric efficiency</span>
                <strong>{(selected.electricEfficiency * 100).toFixed(0)}%</strong>
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
              Electric is point-of-use efficient (90–100%) but loses 60%+ of the input fuel at the power plant. Gas combusts on-site but rejects heat up the flue. The "effective BTU" line shows what actually warms or cooks.
            </p>
          </div>
        </div>

        <DisclaimerBox title="What this comparison can't tell you">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Heat pumps change the game — for water heaters and home heating, heat pumps deliver 2–3× the heat per kWh, often beating gas on cost AND CO₂</li>
            <li>Connection fees: switching from gas to all-electric saves the monthly gas meter fee ($15–$30/mo in most utilities)</li>
            <li>Resale value: in some markets, gas hookup adds value; in CA and parts of NE, all-electric adds value</li>
            <li>Cooking preference: chefs often pay for gas comfort; induction matches gas on responsiveness for a fraction of the energy</li>
            <li>Time-of-use electric rates can make electric appliances much cheaper when run overnight</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
