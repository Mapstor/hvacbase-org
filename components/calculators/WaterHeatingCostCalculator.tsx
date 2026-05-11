'use client';

import { useState, useMemo } from 'react';
import {
  DollarSign,
  MapPin,
  Droplets,
  TrendingUp,
  Users,
  Flame,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  CardChoice,
  Segmented,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'red' as const;

const stateRates: Record<string, { rate: number; name: string }> = {
  AL: { rate: 14.91, name: 'Alabama' }, AK: { rate: 24.42, name: 'Alaska' }, AZ: { rate: 13.73, name: 'Arizona' },
  AR: { rate: 12.82, name: 'Arkansas' }, CA: { rate: 29.45, name: 'California' }, CO: { rate: 14.87, name: 'Colorado' },
  CT: { rate: 25.49, name: 'Connecticut' }, DE: { rate: 14.05, name: 'Delaware' }, FL: { rate: 13.85, name: 'Florida' },
  GA: { rate: 13.73, name: 'Georgia' }, HI: { rate: 44.19, name: 'Hawaii' }, ID: { rate: 11.34, name: 'Idaho' },
  IL: { rate: 15.83, name: 'Illinois' }, IN: { rate: 14.79, name: 'Indiana' }, IA: { rate: 13.81, name: 'Iowa' },
  KS: { rate: 14.33, name: 'Kansas' }, KY: { rate: 12.82, name: 'Kentucky' }, LA: { rate: 12.15, name: 'Louisiana' },
  ME: { rate: 22.87, name: 'Maine' }, MD: { rate: 14.48, name: 'Maryland' }, MA: { rate: 25.21, name: 'Massachusetts' },
  MI: { rate: 17.72, name: 'Michigan' }, MN: { rate: 14.36, name: 'Minnesota' }, MS: { rate: 13.15, name: 'Mississippi' },
  MO: { rate: 13.53, name: 'Missouri' }, MT: { rate: 12.70, name: 'Montana' }, NE: { rate: 12.07, name: 'Nebraska' },
  NV: { rate: 12.54, name: 'Nevada' }, NH: { rate: 23.15, name: 'New Hampshire' }, NJ: { rate: 16.84, name: 'New Jersey' },
  NM: { rate: 14.37, name: 'New Mexico' }, NY: { rate: 21.88, name: 'New York' }, NC: { rate: 12.44, name: 'North Carolina' },
  ND: { rate: 11.66, name: 'North Dakota' }, OH: { rate: 14.22, name: 'Ohio' }, OK: { rate: 12.49, name: 'Oklahoma' },
  OR: { rate: 12.16, name: 'Oregon' }, PA: { rate: 16.42, name: 'Pennsylvania' }, RI: { rate: 25.27, name: 'Rhode Island' },
  SC: { rate: 13.70, name: 'South Carolina' }, SD: { rate: 13.04, name: 'South Dakota' }, TN: { rate: 12.51, name: 'Tennessee' },
  TX: { rate: 13.30, name: 'Texas' }, UT: { rate: 11.23, name: 'Utah' }, VT: { rate: 20.24, name: 'Vermont' },
  VA: { rate: 13.52, name: 'Virginia' }, WA: { rate: 11.38, name: 'Washington' }, WV: { rate: 13.72, name: 'West Virginia' },
  WI: { rate: 15.69, name: 'Wisconsin' }, WY: { rate: 11.55, name: 'Wyoming' },
};

const heaterTypes = [
  { value: 'tank-40', name: '40-gal tank', summary: '4.5kW resistive', watts: 4500, efficiency: 0.90, standbyLoss: 1.2, capacity: 40 },
  { value: 'tank-50', name: '50-gal tank', summary: '4.5kW resistive', watts: 4500, efficiency: 0.90, standbyLoss: 1.4, capacity: 50 },
  { value: 'tank-80', name: '80-gal tank', summary: '4.5kW resistive', watts: 4500, efficiency: 0.90, standbyLoss: 1.8, capacity: 80 },
  { value: 'heat-pump', name: 'Heat pump (50 gal)', summary: '3.5 COP — 3× efficient', watts: 2000, efficiency: 3.5, standbyLoss: 0.5, capacity: 50 },
  { value: 'tankless', name: 'Tankless electric', summary: '18kW on demand', watts: 18000, efficiency: 0.98, standbyLoss: 0, capacity: 999 },
];

const householdOptions = [
  { value: '1', name: '1 person', sub: '~15 gal/day' },
  { value: '2', name: '2 people', sub: '~30 gal/day' },
  { value: '3', name: '3 people', sub: '~60 gal/day' },
  { value: '4', name: '4 people', sub: '~80 gal/day' },
  { value: '5', name: '5 people', sub: '~100 gal/day' },
  { value: '6', name: '6+ people', sub: '~120+ gal/day' },
];

const usageOptions = [
  { value: 'low', name: 'Low', sub: 'Quick showers, conservative' },
  { value: 'average', name: 'Average', sub: 'Typical use' },
  { value: 'high', name: 'High', sub: 'Long showers + lots of laundry' },
];

export default function WaterHeatingCostCalculator() {
  const [state, setState] = useState('CA');
  const [heaterType, setHeaterType] = useState('tank-50');
  const [householdSize, setHouseholdSize] = useState('3');
  const [usage, setUsage] = useState('average');

  const stateData = stateRates[state];
  const heater = heaterTypes.find((h) => h.value === heaterType)!;
  const people = parseInt(householdSize);

  const calc = useMemo(() => {
    const rate = stateData.rate / 100;
    let gallonsPerDay = people * 20;
    if (usage === 'low') gallonsPerDay *= 0.75;
    else if (usage === 'high') gallonsPerDay *= 1.5;
    const tempRise = 70;
    const btuPerDay = gallonsPerDay * 8.34 * tempRise;
    const kwhPerDay = btuPerDay / 3412;
    const actualKwhPerDay = (kwhPerDay / heater.efficiency) + heater.standbyLoss;
    const dailyCost = actualKwhPerDay * rate;
    const monthlyCost = dailyCost * 30.4;
    const annualCost = dailyCost * 365;
    const annualKwh = actualKwhPerDay * 365;
    const tankCost = heaterType === 'heat-pump' ? (kwhPerDay / 0.90 + 1.4) * rate * 365 : annualCost;
    const heatPumpCost = (kwhPerDay / 3.5 + 0.5) * rate * 365;
    const heatPumpSavings = tankCost - heatPumpCost;
    const heatPumpPayback = heatPumpSavings > 0 ? 1500 / heatPumpSavings : 0;
    const allRates = Object.values(stateRates);
    const nationalAvg = allRates.reduce((s, x) => s + x.rate, 0) / allRates.length;
    const cheapestEntry = Object.entries(stateRates).reduce((min, [k, v]) => v.rate < min[1].rate ? [k, v] as [string, typeof v] : min);
    const mostExpensiveEntry = Object.entries(stateRates).reduce((max, [k, v]) => v.rate > max[1].rate ? [k, v] as [string, typeof v] : max);
    const cheapestSavings = annualCost - (actualKwhPerDay * 365 * cheapestEntry[1].rate / 100);
    const mostExpensiveExtra = (actualKwhPerDay * 365 * mostExpensiveEntry[1].rate / 100) - annualCost;
    return { rate, gallonsPerDay, kwhPerDay, actualKwhPerDay, dailyCost, monthlyCost, annualCost, annualKwh, tankCost, heatPumpCost, heatPumpSavings, heatPumpPayback, nationalAvg, cheapestEntry, mostExpensiveEntry, cheapestSavings, mostExpensiveExtra };
  }, [stateData, heater, people, usage, heaterType]);

  const fit =
    calc.annualCost < 200 ? { tone: 'good' as const, text: 'Low cost — efficient setup or low usage' } :
    calc.annualCost < 500 ? { tone: 'ok' as const, text: 'Typical annual cost' } :
    calc.annualCost < 800 ? { tone: 'warn' as const, text: 'High — explore heat pump or solar' } :
                            { tone: 'bad' as const, text: 'Very high — major savings available' };

  const sortedStates = Object.entries(stateRates).sort((a, b) => a[1].name.localeCompare(b[1].name));

  return (
    <CalcShell
      Icon={Droplets}
      title="State Water Heating Cost Calculator"
      subtitle="Annual electric water-heating cost using your state's actual rate. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Your state" subtitle="Determines your electric rate" Icon={MapPin} accent={ACCENT} />

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Pick state</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {sortedStates.map(([code, data]) => (
              <option key={code} value={code}>{data.name} — {data.rate}¢/kWh</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1.5">
            <span className="font-semibold text-gray-800">{stateData.name}:</span> {stateData.rate}¢/kWh
            {stateData.rate > calc.nationalAvg + 3 && ' — above national average'}
            {stateData.rate < calc.nationalAvg - 3 && ' — below national average'}
            {' '}(national avg: {calc.nationalAvg.toFixed(1)}¢/kWh)
          </p>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Heater type" subtitle="Tank, tankless, or heat pump" Icon={Flame} accent={ACCENT} />
        <CardChoice value={heaterType} onChange={setHeaterType} options={heaterTypes} ariaLabel="Heater type" accent={ACCENT} columns={3} />
      </section>

      <section>
        <SectionHeader step={3} title="Household" subtitle="Size + use pattern" Icon={Users} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Household size</label>
            <Segmented value={householdSize} onChange={setHouseholdSize} options={householdOptions} ariaLabel="Household size" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Hot water usage</label>
            <CardChoice value={usage} onChange={setUsage} options={usageOptions} ariaLabel="Usage" accent={ACCENT} columns={3} />
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Annual water-heating cost"
          value={`$${fmtMoney(calc.annualCost)}`}
          unit={`/yr (${fmt(Math.round(calc.annualKwh))} kWh)`}
          secondaryText={
            <>
              In {stateData.name} at {stateData.rate}¢/kWh, your {heater.name.toLowerCase()} heats <strong>{fmt(Math.round(calc.gallonsPerDay))} gallons/day</strong> for {people} {people === 1 ? 'person' : 'people'}.
              Monthly cost: <strong>${fmtMoney(calc.monthlyCost)}</strong> · Daily: <strong>${calc.dailyCost.toFixed(2)}</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Per day', value: `$${calc.dailyCost.toFixed(2)}` },
            { label: 'Per month', value: `$${fmtMoney(calc.monthlyCost)}` },
            { label: 'kWh/day', value: `${calc.actualKwhPerDay.toFixed(1)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-red-600" />
              Energy + cost breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Gallons/day', detail: `${people} × ${usage === 'low' ? 15 : usage === 'high' ? 30 : 20}`, factor: `${fmt(Math.round(calc.gallonsPerDay))} gal` },
                { label: 'Temp rise', detail: '50°F → 120°F', factor: '70°F' },
                { label: 'Energy to heat', detail: `gal × 8.34 lb × 70°F ÷ 3412`, factor: `${calc.kwhPerDay.toFixed(1)} kWh` },
                { label: 'Efficiency factor', detail: heater.name, factor: `÷ ${heater.efficiency}${heater.efficiency >= 1 ? ' (COP)' : ''}` },
                { label: 'Standby loss', detail: 'Heat radiated from tank', factor: `+ ${heater.standbyLoss} kWh/day` },
              ]}
              totals={[
                { label: 'Actual daily', value: `${calc.actualKwhPerDay.toFixed(1)} kWh`, valueClass: 'text-red-700' },
                { label: 'Annual cost', value: `$${fmtMoney(calc.annualCost)}`, valueClass: 'text-red-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-600" />
              State comparison
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-semibold text-red-900 text-sm">Your state: {stateData.name}</div>
                    <div className="text-[11px] text-red-700">{stateData.rate}¢/kWh</div>
                  </div>
                  <div className="font-bold text-red-700 tabular-nums">${fmtMoney(calc.annualCost)}/yr</div>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-semibold text-emerald-900 text-sm">Cheapest: {calc.cheapestEntry[1].name}</div>
                    <div className="text-[11px] text-emerald-700">{calc.cheapestEntry[1].rate}¢/kWh</div>
                  </div>
                  <div className="font-bold text-emerald-700 tabular-nums">−${fmtMoney(calc.cheapestSavings)}/yr</div>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="font-semibold text-amber-900 text-sm">Most expensive: {calc.mostExpensiveEntry[1].name}</div>
                    <div className="text-[11px] text-amber-700">{calc.mostExpensiveEntry[1].rate}¢/kWh</div>
                  </div>
                  <div className="font-bold text-amber-700 tabular-nums">+${fmtMoney(calc.mostExpensiveExtra)}/yr</div>
                </div>
              </div>
            </div>
          </div>

          {heaterType !== 'heat-pump' && calc.heatPumpSavings > 0 && (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                Heat pump water heater (HPWH) savings potential
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                Switching to a heat pump water heater would save roughly <strong>${fmtMoney(calc.heatPumpSavings)}/yr</strong> ({((calc.heatPumpSavings / calc.annualCost) * 100).toFixed(0)}% reduction).
                In {stateData.name} at {stateData.rate}¢/kWh, a $1,500 HPWH pays back in <strong>{calc.heatPumpPayback.toFixed(1)} years</strong>.
                Federal tax credit (25C) covers up to $2,000 for ENERGY STAR HPWHs.
              </p>
            </div>
          )}
        </div>

        <DisclaimerBox title="Cost reduction levers (ranked by impact)">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li><strong>Heat pump water heater</strong> — saves 60–70% vs electric tank in most climates</li>
            <li><strong>Lower temp to 120°F</strong> — saves 3–5% per 10°F reduction; reduces scalding risk</li>
            <li><strong>Low-flow showerheads</strong> — 1.5 GPM vs 2.5 GPM saves 25–60% on shower water</li>
            <li>Insulate hot pipes + tank blanket (older units) — saves 4–9%</li>
            <li>Fix dripping faucets (1 drip/sec = 3,000 gallons wasted/year)</li>
            <li>Solar pre-heat — uses thermal panels to warm cold incoming water before the electric heater finishes it</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
