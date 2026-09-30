'use client';

import { useState, useMemo } from 'react';
import {
  Flame,
  TrendingUp,
  Leaf,
  Calendar,
  Wallet,
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

const ACCENT = 'orange' as const;

const furnaceTiers = [
  { value: 'old-60', name: '60% AFUE', tier: 'Old low', afue: 60, summary: 'Pre-1980, no condensing tech' },
  { value: 'old-70', name: '70% AFUE', tier: 'Old std', afue: 70, summary: '1980s–early 1990s standard' },
  { value: 'standard-80', name: '80% AFUE', tier: 'Standard', afue: 80, summary: 'Non-condensing, metal vent' },
  { value: 'mid-85', name: '85% AFUE', tier: 'Mid', afue: 85, summary: 'Transitional efficiency' },
  { value: 'high-90', name: '90% AFUE', tier: 'High', afue: 90, summary: 'Entry condensing furnace' },
  { value: 'high-92', name: '92% AFUE', tier: 'High', afue: 92, summary: 'Common high-efficiency' },
  { value: 'high-95', name: '95% AFUE', tier: 'High', afue: 95, summary: '2028 federal minimum' },
  { value: 'ultra-97', name: '97% AFUE', tier: 'Ultra', afue: 97, summary: 'Modulating premium' },
  { value: 'ultra-98', name: '98% AFUE', tier: 'Ultra', afue: 98, summary: 'Top of market' },
];

// Climate regions with heating-degree-days (HDD65, °F-days) — the physical
// driver for annual heat load via the degree-day method: annualBTU = UA × HDD
// × 24 (ASHRAE Fundamentals Ch. 19, DOE Building America). HDD midpoints
// verified vs NOAA / IECC 2021 population centroids for each band.
const climateOptions = [
  { value: 'mild',      name: 'Mild',      sub: 'S FL, Hawaii · ~1,500 HDD',     hdd: 1500 },
  { value: 'moderate',  name: 'Moderate',  sub: 'Atlanta, Dallas · ~3,000 HDD',  hdd: 3000 },
  { value: 'average',   name: 'Average',   sub: 'DC, KC, St Louis · ~4,500 HDD', hdd: 4500 },
  { value: 'cold',      name: 'Cold',      sub: 'Chicago, Boston · ~6,500 HDD',  hdd: 6500 },
  { value: 'very-cold', name: 'Very cold', sub: 'Minneapolis, Fargo · ~8,000 HDD', hdd: 8000 },
];

// Envelope heat-loss coefficient — UA per sq ft (BTU/hr·°F), from the shared
// heat-loss model in _heatloss.ts, the same values the furnace and heat-pump
// size calculators use. Annual heat the furnace must deliver =
// UA × sqft × HDD × 24; no ceiling/stories/window adjustments here.
const insulationOptions = [
  { value: 'poor',      name: 'Poor',      sub: 'Pre-1970, little insulation', ua: UA_PER_SQFT.poor },      // 0.604
  { value: 'average',   name: 'Average',   sub: '1980s–90s construction',      ua: UA_PER_SQFT.average },   // 0.270
  { value: 'good',      name: 'Good',      sub: '2000s construction',          ua: UA_PER_SQFT.good },      // 0.189
  { value: 'excellent', name: 'Excellent', sub: 'Current code, tight envelope', ua: UA_PER_SQFT.excellent }, // 0.177
];

const BTU_PER_THERM = 100000;   // NIST — natural gas 1 therm = 100,000 BTU
// EPA Greenhouse Gas Equivalencies: 0.0053 metric tons CO2 per therm of
// natural gas, which is 5.3 kg or about 11.7 lb.
const CO2_KG_PER_THERM = 5.3;
const CO2_LB_PER_THERM = 11.7;

const DEFAULTS = {
  currentAfue: 'old-70',
  newAfue: 'high-95',
  homeSize: '2000',
  gasPrice: '1.35',           // EIA 2026 US heating-season national midpoint
  climate: 'average',         // DC/KC ~4,500 HDD
  insulation: 'average',      // 1980s–90s envelope, UA 0.270
  priceDifference: '',        // optional; payback only shows when provided
};

export default function AFUECalculator() {
  const [currentAfue, setCurrentAfue] = useState(DEFAULTS.currentAfue);
  const [newAfue, setNewAfue]         = useState(DEFAULTS.newAfue);
  const [homeSize, setHomeSize]       = useState(DEFAULTS.homeSize);
  const [gasPrice, setGasPrice]       = useState(DEFAULTS.gasPrice);
  const [climate, setClimate]         = useState(DEFAULTS.climate);
  const [insulation, setInsulation]   = useState(DEFAULTS.insulation);
  const [priceDifference, setPriceDifference] = useState(DEFAULTS.priceDifference);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    currentAfue, newAfue, homeSize, gasPrice, climate, insulation, priceDifference,
  });

  const cur = furnaceTiers.find((t) => t.value === src.currentAfue)!;
  const nxt = furnaceTiers.find((t) => t.value === src.newAfue)!;
  const selectedClimate = climateOptions.find((c) => c.value === src.climate)!;
  const selectedInsulation = insulationOptions.find((i) => i.value === src.insulation)!;
  const price = Math.max(parseFloat(src.gasPrice) || 1.35, 0);

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);

  const handleReset = () => {
    setCurrentAfue(DEFAULTS.currentAfue);
    setNewAfue(DEFAULTS.newAfue);
    setHomeSize(DEFAULTS.homeSize);
    setGasPrice(DEFAULTS.gasPrice);
    setClimate(DEFAULTS.climate);
    setInsulation(DEFAULTS.insulation);
    setPriceDifference(DEFAULTS.priceDifference);
    clear();
  };

  const calc = useMemo(() => {
    // === ANNUAL HEAT LOAD (shared degree-day model) ===
    // Heat the furnace must DELIVER in a year = UA_PER_SQFT × sqft × HDD × 24,
    // from _heatloss.ts (same model as the furnace + heat-pump size calcs).
    const ua = selectedInsulation.ua * sqft;
    const annualHeatLoadBTU = annualHeatOutputBtu(selectedInsulation.ua, sqft, 1, selectedClimate.hdd);
    const annualThermsOutput = annualHeatLoadBTU / BTU_PER_THERM;

    // Fuel input at each AFUE tier. AFUE = seasonal fraction of input BTU that
    // becomes usable heat, so gas input = delivered heat ÷ (AFUE × 100,000).
    const currentTherms = annualThermsOutput / (cur.afue / 100);
    const newTherms     = annualThermsOutput / (nxt.afue / 100);

    const currentAnnualCost = currentTherms * price;
    const newAnnualCost     = newTherms * price;

    const annualSavings = currentAnnualCost - newAnnualCost;
    const percentSavings = currentAnnualCost > 0
      ? (annualSavings / currentAnnualCost) * 100
      : 0;
    const thermsSaved = Math.max(currentTherms - newTherms, 0);
    const co2ReductionKg = thermsSaved * CO2_KG_PER_THERM;
    const co2ReductionLb = thermsSaved * CO2_LB_PER_THERM;

    // Payback from the user's own price difference between the two furnaces.
    // Shown only when both the price difference and the annual saving are > 0.
    const priceDiff = parseFloat(src.priceDifference);
    const hasPriceDiff = Number.isFinite(priceDiff) && priceDiff > 0;
    const paybackYears = hasPriceDiff && annualSavings > 0 ? priceDiff / annualSavings : 0;

    const fiveYearSavings   = annualSavings * 5;
    const tenYearSavings    = annualSavings * 10;
    const twentyYearSavings = annualSavings * 20;

    return {
      ua,
      annualHeatLoadBTU: Math.round(annualHeatLoadBTU),
      annualThermsOutput,
      currentTherms,
      newTherms,
      currentAnnualCost,
      newAnnualCost,
      annualSavings,
      percentSavings,
      thermsSaved,
      co2ReductionKg,
      co2ReductionLb,
      hasPriceDiff,
      priceDiff,
      paybackYears,
      fiveYearSavings,
      tenYearSavings,
      twentyYearSavings,
    };
  }, [sqft, cur, nxt, selectedClimate, selectedInsulation, price, src.priceDifference]);

  const isUpgrade = nxt.afue > cur.afue;
  const fit =
    !isUpgrade ? { tone: 'warn' as const, text: 'New AFUE must exceed current to show savings' } :
    calc.percentSavings >= 25 ? { tone: 'good' as const, text: 'Large savings, strong upgrade' } :
    calc.percentSavings >= 15 ? { tone: 'good' as const, text: 'Strong upgrade' } :
    calc.percentSavings >= 5  ? { tone: 'ok' as const, text: 'Meaningful savings' } :
                                { tone: 'warn' as const, text: 'Modest improvement, comfort and reliability matter too' };

  return (
    <CalcShell
      Icon={Flame}
      title="AFUE Efficiency Savings Calculator"
      subtitle="What you save by upgrading from one AFUE tier to another."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Current vs new */}
      <section>
        <SectionHeader step={1} title="Current vs new furnace" subtitle="Pick efficiency tiers" Icon={Flame} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current furnace
              <InfoTip label="current AFUE">
                Look at the yellow EnergyGuide sticker on your existing furnace. Pre-1990 units are often 60 to 70% AFUE; 2000s code-min is 80%; modern condensing is 90%+.
              </InfoTip>
            </label>
            <CardChoice value={currentAfue} onChange={setCurrentAfue} options={furnaceTiers} ariaLabel="Current AFUE" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">New furnace</label>
            <CardChoice value={newAfue} onChange={setNewAfue} options={furnaceTiers} ariaLabel="New AFUE" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      {/* Section 2 — Home + climate */}
      <section>
        <SectionHeader step={2} title="Your home & climate" subtitle="Drives the heating load" Icon={TrendingUp} accent={ACCENT} />

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
                  Sets the home&rsquo;s heat-loss rate (UA per sq ft): Poor 0.604, Average 0.270, Good 0.189, Excellent 0.177 BTU/hr·°F. Average is 1980s to 90s construction; a blower-door test or Manual J gives your real number.
                </InfoTip>
              </label>
              <CardChoice value={insulation} onChange={setInsulation} options={insulationOptions} ariaLabel="Insulation level" accent={ACCENT} columns={4} />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Climate zone
              <InfoTip label="climate">
                Pick the row whose example cities match yours. HDD (heating degree-days, base 65°F) is the physical driver; the calc multiplies the home&rsquo;s heat-loss rate by HDD × 24 hr/day to get annual heating BTU.
              </InfoTip>
            </label>
            <CardChoice value={climate} onChange={setClimate} options={climateOptions} ariaLabel="Climate" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Natural gas price ($/therm)
              <InfoTip label="gas price">
                Check your latest bill. EIA 2026 US heating-season national average is about $1.35/therm. Regional spread: Northeast ~$1.60, West ~$1.35, Midwest ~$1.15, South ~$1.05.
              </InfoTip>
            </label>
            <NumberInput
              value={gasPrice}
              onChange={setGasPrice}
              min={0.30}
              max={4.00}
              suffix="$/therm"
              ariaLabel="Gas price per therm"
              accent={ACCENT}
              className="max-w-xs"
            />
          </div>
        </div>
      </section>

      {/* Section 3 — Optional payback */}
      <section>
        <SectionHeader step={3} title="Payback (optional)" subtitle="Compare the two quotes" Icon={Wallet} accent={ACCENT} />
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Price difference between the two furnaces ($)
            <InfoTip label="price difference">
              How much more the higher-AFUE furnace costs installed, versus the lower one. Leave blank to skip payback. Payback = price difference ÷ annual fuel saving.
            </InfoTip>
          </label>
          <NumberInput
            value={priceDifference}
            onChange={setPriceDifference}
            min={0}
            max={20000}
            suffix="$"
            ariaLabel="Price difference between the two furnaces"
            accent={ACCENT}
            className="max-w-xs"
          />
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
      {hasResult && sqft > 0 && (
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader dirty={dirty} />

        <ResultHero
          accent={ACCENT}
          eyebrow="Annual savings from upgrading"
          value={`$${fmtMoney(Math.max(calc.annualSavings, 0))}`}
          unit={`/yr (${calc.percentSavings > 0 ? calc.percentSavings.toFixed(1) : 0}% lower heating cost)`}
          secondaryText={
            <>
              Upgrading from {cur.afue}% → {nxt.afue}% AFUE saves {fmt(Math.max(Math.round(calc.thermsSaved), 0))} therms/year.{' '}
              {calc.hasPriceDiff && calc.annualSavings > 0
                ? <>A ${fmtMoney(calc.priceDiff)} price difference pays back in <strong>{calc.paybackYears.toFixed(1)} years</strong>.</>
                : <>Enter the price difference to see payback.</>}
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Therms saved', value: `${fmt(Math.max(Math.round(calc.thermsSaved), 0))}/yr` },
            { label: 'CO₂ reduced', value: `${fmt(Math.round(calc.co2ReductionLb))} lb/yr`, valueClass: 'text-emerald-700' },
            { label: '20-yr savings', value: `$${fmtMoney(Math.max(calc.twentyYearSavings, 0))}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Wallet className="w-4 h-4 text-orange-600" />
              Annual operating cost
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Heat loss (UA)',   detail: `${fmt(sqft)} sq ft × ${selectedInsulation.ua} BTU/hr·°F`, factor: `${fmt(Math.round(calc.ua))} BTU/hr·°F` },
                { label: 'Annual heat load', detail: `UA × ${fmt(selectedClimate.hdd)} HDD × 24 hr`,             factor: `${(calc.annualHeatLoadBTU / 1000000).toFixed(1)} MMBtu (${fmt(Math.round(calc.annualThermsOutput))} therms out)` },
                { label: 'Current input',    detail: `÷ ${cur.afue}% AFUE`,                                      factor: `${fmt(Math.round(calc.currentTherms))} therms` },
                { label: 'New input',        detail: `÷ ${nxt.afue}% AFUE`,                                      factor: `${fmt(Math.round(calc.newTherms))} therms` },
                { label: 'Gas price',        detail: 'Per therm delivered',                                      factor: `× $${price.toFixed(2)}/therm` },
              ]}
              totals={[
                { label: 'Current annual cost', value: `$${fmtMoney(calc.currentAnnualCost)}`, valueClass: 'text-red-700' },
                { label: 'New annual cost',     value: `$${fmtMoney(calc.newAnnualCost)}`,     valueClass: 'text-emerald-700' },
                { label: 'Annual savings',      value: `$${fmtMoney(Math.max(calc.annualSavings, 0))}`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Long-term savings
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: '5-yr', value: calc.fiveYearSavings },
                { label: '10-yr', value: calc.tenYearSavings },
                { label: '20-yr', value: calc.twentyYearSavings },
              ].map(({ label, value }) => (
                <div key={label} className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">{label} savings</div>
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">${fmtMoney(Math.max(value, 0))}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="font-semibold text-amber-900 text-sm mb-1">
                {calc.hasPriceDiff && calc.annualSavings > 0
                  ? `Payback: ${calc.paybackYears.toFixed(1)} years`
                  : 'Payback'}
              </div>
              <p className="text-xs text-amber-800">
                {calc.hasPriceDiff && calc.annualSavings > 0
                  ? `A $${fmtMoney(calc.priceDiff)} price difference between the two furnaces ÷ $${fmtMoney(calc.annualSavings)}/yr saved.`
                  : 'Enter the price difference to see payback.'}
              </p>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Assumes stable gas prices. Natural gas has averaged about 3%/yr over the last 20 years, so real savings are likely higher.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Carbon saved
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-700">
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">CO₂ avoided per year</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2ReductionLb))} lb</div>
              <div className="text-[11px] text-gray-500">({(calc.co2ReductionKg / 1000).toFixed(2)} metric tons)</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100 flex items-center">
              <p className="text-[11px] text-gray-600 leading-snug">
                EPA: 0.0053 metric tons CO₂ per therm (about 11.7 lb) of natural gas. Carbon saved tracks the {fmt(Math.max(Math.round(calc.thermsSaved), 0))} therms of gas you no longer burn.
              </p>
            </div>
          </div>
        </div>

        <DisclaimerBox title="How this is figured">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Annual heat uses the <strong>degree-day method</strong> (UA × sq ft × HDD × 24) from the shared heat-loss model, the same one behind our furnace and heat-pump size calculators. UA per sq ft is 0.604 poor / 0.270 average / 0.189 good / 0.177 excellent; a blower-door test or <strong>ACCA Manual J</strong> gives your home&rsquo;s real number.</li>
            <li>AFUE is a seasonal average from the federal test. A furnace runs below its rating when it is oversized and short-cycles.</li>
            <li>Condensing furnaces (90%+) reach their full rating only when return-air temperature stays below about 130°F.</li>
            <li>Payback is the <strong>price difference between the two furnaces</strong> divided by the annual fuel saving. It ignores install extras like new venting or a condensate drain, so enter the fully installed difference from your quotes.</li>
            <li>Carbon uses the EPA factor of 0.0053 metric tons (about 11.7 lb) of CO₂ per therm of natural gas.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
