'use client';

import { useState, useMemo } from 'react';
import {
  Zap,
  Home,
  Thermometer,
  Snowflake,
  DollarSign,
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
import { UA_PER_SQFT, annualHeatOutputBtu } from './_heatloss';
import { climateZones, HP_HSPF2_BY_ZONE, HP_SEER2 } from './HeatPumpVsFurnaceCalculator';
import residentialRates from '@/data/eia/residential-rates.json';

const ACCENT = 'purple' as const;

// Running cost reuses the exact heat pump side of HeatPumpVsFurnaceCalculator:
// the shared degree-day heat-loss model (_heatloss.ts), the same per-zone HDD
// and cooling hours (climateZones), the same per-zone effective HSPF2
// (HP_HSPF2_BY_ZONE, with the 6.5 cold / 5.0 very-cold assumptions), the same
// 25 BTU/sqft screening cooling load, and the same default SEER2 (HP_SEER2).
// So at defaults this reproduces the heat pump column of heat-pump-vs-furnace.

// Insulation -> UA per sq ft, same mapping/values the sister tools use.
const insulationOptions = [
  { value: 'poor',      name: 'Poor',      sub: 'Pre-1970, little insulation', ua: UA_PER_SQFT.poor },      // 0.604
  { value: 'average',   name: 'Average',   sub: '1980s-90s construction',      ua: UA_PER_SQFT.average },   // 0.270
  { value: 'good',      name: 'Good',      sub: '2000s construction',          ua: UA_PER_SQFT.good },      // 0.189
  { value: 'excellent', name: 'Excellent', sub: 'Current code, tight envelope', ua: UA_PER_SQFT.excellent }, // 0.177
];

// State residential prices from the EIA Electric Power Monthly dataset
// (year-to-date average, January to July 2026), same source + pattern as the
// other calculators. Keyed by two-letter code for the quick-fill picker.
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
  homeSize: '2000',
  insulation: 'average',
  climate: 'mixed',
  // HSPF2 defaults to the selected zone's effective seasonal value (8.2 mixed/
  // hot/very-hot, 6.5 cold, 5.0 very-cold). Picking a zone resets it.
  hspf2: String(HP_HSPF2_BY_ZONE['mixed']),
  seer2: String(HP_SEER2),
  state: '',
  electricRate: '0.18', // EIA 2026 US residential average
};

export default function HeatPumpRunningCostCalculator() {
  const [homeSize, setHomeSize] = useState(DEFAULTS.homeSize);
  const [insulation, setInsulation] = useState(DEFAULTS.insulation);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [hspf2, setHspf2] = useState(DEFAULTS.hspf2);
  const [seer2, setSeer2] = useState(DEFAULTS.seer2);
  const [state, setState] = useState(DEFAULTS.state);
  const [electricRate, setElectricRate] = useState(DEFAULTS.electricRate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    homeSize, insulation, climate, hspf2, seer2, state, electricRate,
  });

  // Picking a climate zone resets HSPF2 to that zone's effective seasonal value,
  // matching HeatPumpVsFurnaceCalculator's per-zone assumption. User can override.
  const applyClimate = (zone: string) => {
    setClimate(zone);
    const z = HP_HSPF2_BY_ZONE[zone];
    if (z != null) setHspf2(String(z));
  };

  // Picking a state quick-fills the editable rate (cents -> $); user can override.
  const applyStateRate = (code: string) => {
    setState(code);
    if (stateRates[code]) setElectricRate((stateRates[code].rate / 100).toFixed(4).replace(/0+$/, '').replace(/\.$/, ''));
  };

  const handleReset = () => {
    setHomeSize(DEFAULTS.homeSize);
    setInsulation(DEFAULTS.insulation);
    setClimate(DEFAULTS.climate);
    setHspf2(DEFAULTS.hspf2);
    setSeer2(DEFAULTS.seer2);
    setState(DEFAULTS.state);
    setElectricRate(DEFAULTS.electricRate);
    clear();
  };

  const selectedZone = climateZones.find((z) => z.value === src.climate)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === src.insulation)!;

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
  const hspf2N = Math.max(parseFloat(src.hspf2) || 0.1, 0.1);
  const seer2N = Math.max(parseFloat(src.seer2) || 0.1, 0.1);
  const eR = Math.max(parseFloat(src.electricRate) || 0, 0);

  const calc = useMemo(() => {
    // Annual delivered heat (BTU) = UA x sqft x HDD x 24, the shared heat-loss
    // model; cooling = 25 BTU/sqft screening load x equivalent full-load hours.
    const heatBtu = annualHeatOutputBtu(selectedInsulation.ua, sqft, 1, selectedZone.hdd);
    const coolBtu = (sqft * 25) * selectedZone.coolingHours;

    // HSPF2 and SEER2 are BTU per watt-hour, so kWh = BTU / (rating x 1000).
    const heatKwh = heatBtu / (hspf2N * 1000);
    const coolKwh = coolBtu / (seer2N * 1000);
    const heatCost = heatKwh * eR;
    const coolCost = coolKwh * eR;
    const totalKwh = heatKwh + coolKwh;
    const totalCost = heatCost + coolCost;
    const perMonth = totalCost / 12;
    const costPerMMBtuHeat = heatBtu > 0 ? heatCost / (heatBtu / 1_000_000) : 0;

    return {
      heatBtu, coolBtu, heatKwh, coolKwh, heatCost, coolCost,
      totalKwh, totalCost, perMonth, costPerMMBtuHeat,
    };
  }, [sqft, hspf2N, seer2N, eR, selectedZone, selectedInsulation]);

  const fit =
    calc.totalCost === 0 ? { tone: 'warn' as const, text: 'Enter home size' } :
    selectedZone.value === 'very-cold' ? { tone: 'ok' as const, text: 'Very cold: a cold-climate model holds a higher HSPF2' } :
    { tone: 'good' as const, text: `Based on HSPF2 ${hspf2N} and SEER2 ${seer2N}` };

  return (
    <CalcShell
      Icon={Zap}
      title="Heat Pump Running Cost Calculator"
      subtitle="Yearly and monthly heating + cooling cost, on the shared heat-loss model."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      <section>
        <SectionHeader step={1} title="Home & climate" subtitle="Size, insulation and DOE climate zone" Icon={Home} accent={ACCENT} />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Insulation level
                <InfoTip label="insulation">
                  Sets the home&rsquo;s heat-loss rate (UA per sq ft): Poor 0.604, Average 0.270, Good 0.189, Excellent 0.177 BTU/hr&middot;&deg;F. Average is 1980s to 90s construction.
                </InfoTip>
              </label>
              <CardChoice value={insulation} onChange={setInsulation} options={insulationOptions} ariaLabel="Insulation level" accent={ACCENT} columns={4} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climate} onChange={applyClimate} options={climateZones} ariaLabel="Climate zone" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Heat pump efficiency" subtitle="HSPF2 for heating, SEER2 for cooling" Icon={Thermometer} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              HSPF2 (heating)
              <InfoTip label="HSPF2">
                Seasonal heating efficiency. This field defaults to an effective seasonal value by zone: 8.2 for mixed/hot/very-hot, 6.5 for cold, 5.0 for very cold, because a standard heat pump leans on resistance backup below its balance point. A NEEP-listed cold-climate model holds a higher HSPF2, enter its rating.
              </InfoTip>
            </label>
            <NumberInput value={hspf2} onChange={setHspf2} min={5} max={14} suffix="HSPF2" ariaLabel="HSPF2 rating" accent={ACCENT} />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              SEER2 (cooling)
              <InfoTip label="SEER2">
                Seasonal cooling efficiency. Default 17.1 is a premium inverter heat pump; ENERGY STAR&rsquo;s minimum is 15.2.
              </InfoTip>
            </label>
            <NumberInput value={seer2} onChange={setSeer2} min={13} max={30} suffix="SEER2" ariaLabel="SEER2 rating" accent={ACCENT} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={3} title="Your electricity rate" subtitle="Enter your rate or quick-fill from your state" Icon={DollarSign} accent={ACCENT} />
        <div className="space-y-4">
          <div className="max-w-sm">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Electricity rate
              <InfoTip label="electricity rate">
                Check your latest bill. The default $0.18/kWh is the EIA U.S. residential average, January to July 2026. Pick a state below to quick-fill that state&rsquo;s EIA average.
              </InfoTip>
            </label>
            <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.6} suffix="$/kWh" ariaLabel="Electricity rate" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              State quick-fill <span className="text-xs font-normal text-gray-500">(EIA average, Jan-Jul 2026)</span>
            </label>
            <select
              value={state}
              onChange={(e) => applyStateRate(e.target.value)}
              aria-label="State electricity rate"
              className="w-full max-w-sm px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="">Select a state (optional)</option>
              {stateList.map(([code, { name, rate }]) => (
                <option key={code} value={code}>{name} — {rate.toFixed(2)}&cent;/kWh</option>
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

      {hasResult && sqft > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Estimated running cost"
          value={`$${fmtMoney(calc.totalCost)}`}
          unit={`per year · $${fmtMoney(calc.perMonth)}/mo average`}
          secondaryText={
            <>
              Heating <strong>${fmtMoney(calc.heatCost)}</strong> ({fmt(Math.round(calc.heatKwh))} kWh) and cooling <strong>${fmtMoney(calc.coolCost)}</strong> ({fmt(Math.round(calc.coolKwh))} kWh)
              for a {fmt(sqft)} sq ft {selectedZone.name.toLowerCase()} home at ${eR.toFixed(2)}/kWh.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Heating', value: `$${fmtMoney(calc.heatCost)}/yr` },
            { label: 'Cooling', value: `$${fmtMoney(calc.coolCost)}/yr` },
            { label: 'Per million BTU heat', value: `$${calc.costPerMMBtuHeat.toFixed(2)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-purple-600" />
              Energy & cost breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Annual heat delivered', detail: `${selectedInsulation.name} envelope x ${fmt(selectedZone.hdd)} HDD`, factor: `${(calc.heatBtu / 1_000_000).toFixed(1)} MMBtu` },
                { label: 'Heating energy', detail: `/ (HSPF2 ${hspf2N} x 1000)`, factor: `${fmt(Math.round(calc.heatKwh))} kWh` },
                { label: 'Heating cost', detail: `x $${eR.toFixed(2)}/kWh`, factor: `$${fmtMoney(calc.heatCost)}` },
                { label: 'Cooling energy', detail: `${fmt(selectedZone.coolingHours)} hrs / (SEER2 ${seer2N} x 1000)`, factor: `${fmt(Math.round(calc.coolKwh))} kWh` },
                { label: 'Cooling cost', detail: `x $${eR.toFixed(2)}/kWh`, factor: `$${fmtMoney(calc.coolCost)}` },
              ]}
              totals={[
                { label: 'Total per year', value: `$${fmtMoney(calc.totalCost)}`, valueClass: 'text-purple-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Snowflake className="w-4 h-4 text-purple-600" />
              Climate context · {selectedZone.name}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Heating degree-days', detail: 'HDD65, drives annual heat', factor: `${fmt(selectedZone.hdd)}` },
                { label: 'Cooling hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedZone.coolingHours)}` },
                { label: 'Heating HSPF2', detail: 'Effective seasonal (editable)', factor: `${hspf2N}` },
                { label: 'Cooling SEER2', detail: 'Editable', factor: `${seer2N}` },
              ]}
              totals={[
                { label: 'Average per month', value: `$${fmtMoney(calc.perMonth)}`, valueClass: 'text-purple-700' },
              ]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              Heating uses the shared degree-day heat-loss model (UA x sqft x HDD x 24); cooling uses a 25 BTU/sqft screening load. These match the heat pump side of our Heat Pump vs Furnace tool.
            </p>
          </div>
        </div>

        <DisclaimerBox title="What this estimate assumes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Running cost scales with your local electricity rate; enter your actual bill rate for the closest figure.</li>
            <li>Cold and very-cold zones default to a lower effective HSPF2 (6.5 and 5.0) because a standard heat pump uses resistance backup below its balance point; a cold-climate model holds a higher rating.</li>
            <li>Cooling is a 25 BTU/sqft screening load times equivalent full-load hours; a humid climate&rsquo;s latent load can run higher.</li>
            <li>Absolute costs are directional and vary with construction, thermostat settings and duct losses; the per-million-BTU figure is the cleanest cross-fuel comparison.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
