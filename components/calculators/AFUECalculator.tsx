'use client';

import { useState, useMemo } from 'react';
import {
  Flame,
  TrendingUp,
  DollarSign,
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
  UA_PER_SQFT,
  annualHeatingOutputBtu,
} from './_shared';

const ACCENT = 'orange' as const;

const furnaceTiers = [
  { value: 'old-60', name: '60% AFUE', tier: 'Old low', afue: 60, summary: 'Pre-1980, no condensing tech' },
  { value: 'old-70', name: '70% AFUE', tier: 'Old std', afue: 70, summary: '1980s–early 1990s standard' },
  { value: 'standard-80', name: '80% AFUE', tier: 'Standard', afue: 80, summary: 'Non-condensing, metal vent' },
  { value: 'mid-85', name: '85% AFUE', tier: 'Mid', afue: 85, summary: 'Transitional efficiency' },
  { value: 'high-90', name: '90% AFUE', tier: 'High', afue: 90, summary: 'Entry condensing furnace' },
  { value: 'high-92', name: '92% AFUE', tier: 'High', afue: 92, summary: 'Common high-efficiency' },
  { value: 'high-95', name: '95% AFUE', tier: 'High', afue: 95, summary: '2026 northern US minimum' },
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

// Home heat-loss coefficient — UA (BTU/hr·°F) = UA_PER_SQFT × floorArea.
// UA_PER_SQFT (0.25, average envelope) is imported from _shared so every
// heating calc cites the same value; the calc doesn't expose an insulation
// input, and the disclaimer notes that ±20% envelope variance flows straight
// to bills.
const BTU_PER_THERM = 100000;   // NIST — natural gas 1 therm = 100,000 BTU
// Incremental install cost is computed vs 80% AFUE code-min baseline — the
// question the calc answers is "is the extra premium for a higher tier
// worth it?" not "should I keep a broken furnace."
const BASELINE_INSTALL_COST = 4000;

const homeSizePresets = [1000, 1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  currentAfue: 'old-70',
  newAfue: 'high-95',
  homeSize: '2000',
  gasPrice: '1.35',           // EIA 2026 US heating-season national midpoint
  climate: 'average',         // DC/KC ~4,500 HDD
  currentAge: '15',
};

export default function AFUECalculator() {
  const [currentAfue, setCurrentAfue] = useState(DEFAULTS.currentAfue);
  const [newAfue, setNewAfue]         = useState(DEFAULTS.newAfue);
  const [homeSize, setHomeSize]       = useState(DEFAULTS.homeSize);
  const [gasPrice, setGasPrice]       = useState(DEFAULTS.gasPrice);
  const [climate, setClimate]         = useState(DEFAULTS.climate);
  const [currentAge, setCurrentAge]   = useState(DEFAULTS.currentAge);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    currentAfue, newAfue, homeSize, gasPrice, climate, currentAge,
  });

  const cur = furnaceTiers.find((t) => t.value === src.currentAfue)!;
  const nxt = furnaceTiers.find((t) => t.value === src.newAfue)!;
  const selectedClimate = climateOptions.find((c) => c.value === src.climate)!;
  const price = Math.max(parseFloat(src.gasPrice) || 1.35, 0);

  const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
  const age  = Math.max(parseFloat(src.currentAge) || 0, 0);

  const handleReset = () => {
    setCurrentAfue(DEFAULTS.currentAfue);
    setNewAfue(DEFAULTS.newAfue);
    setHomeSize(DEFAULTS.homeSize);
    setGasPrice(DEFAULTS.gasPrice);
    setClimate(DEFAULTS.climate);
    setCurrentAge(DEFAULTS.currentAge);
    clear();
  };

  const calc = useMemo(() => {
    // === ANNUAL HEAT LOAD (degree-day method) ===
    // UA is the home's heat-loss coefficient in BTU/hr·°F. Multiplying by
    // HDD (degree-days below 65°F base) × 24 (hours/day) converts to the
    // total annual heating energy the furnace must deliver — in BTU/yr.
    // Previously the calc computed peak BTU/hr and never multiplied by
    // time, so annual "therms" were really therms-per-peak-hour, and every
    // downstream number (cost, savings, CO₂, payback) was ~10-20× off.
    const ua = UA_PER_SQFT * sqft;
    const annualHeatLoadBTU = annualHeatingOutputBtu(sqft, selectedClimate.hdd);
    const annualThermsOutput = annualHeatLoadBTU / BTU_PER_THERM;

    // Fuel input at each AFUE tier. AFUE = seasonal fraction of input BTU
    // that becomes usable heat, so input = output ÷ AFUE.
    const currentThermsInput = annualThermsOutput / (cur.afue / 100);
    const newThermsInput     = annualThermsOutput / (nxt.afue / 100);

    // Degradation for aged current furnace (real-world efficiency drops
    // 5-15% over service life per DOE Building America field studies).
    let degradation = 1;
    if (age > 20)      degradation = 0.85;
    else if (age > 15) degradation = 0.90;
    else if (age > 10) degradation = 0.95;

    // Old furnace running at degraded efficiency uses MORE fuel — adjust up.
    const adjustedCurrentTherms = currentThermsInput / degradation;
    const currentAnnualCost = adjustedCurrentTherms * price;
    const newAnnualCost     = newThermsInput * price;

    const annualSavings = currentAnnualCost - newAnnualCost;
    const percentSavings = currentAnnualCost > 0
      ? (annualSavings / currentAnnualCost) * 100
      : 0;
    const thermsSaved = adjustedCurrentTherms - newThermsInput;
    // EPA natural gas emissions factor: 11.7 lbs CO₂/therm = 5.3 kg/therm.
    const co2ReductionKg = Math.max(thermsSaved * 5.3, 0);

    // Full installed cost of the NEW furnace by tier — ballpark only.
    // Real cost scales with home size + venting + labor market.
    const installCost = nxt.afue >= 95 ? 6000 : nxt.afue >= 90 ? 5000 : 4000;
    // Payback uses INCREMENTAL cost (extra premium over an 80% code-min
    // replacement). The relevant decision is "is the tier premium worth
    // it?", not "should I replace a broken furnace" (you have to replace
    // either way). Note: 80% AFUE upgrade returns incrementalCost = 0
    // and the calc surfaces "no premium — payback is instant".
    const incrementalCost = Math.max(0, installCost - BASELINE_INSTALL_COST);
    const paybackYears = annualSavings > 0 && incrementalCost > 0
      ? incrementalCost / annualSavings
      : 0;

    const fiveYearSavings   = annualSavings * 5;
    const tenYearSavings    = annualSavings * 10;
    const twentyYearSavings = annualSavings * 20;

    return {
      ua,
      annualHeatLoadBTU: Math.round(annualHeatLoadBTU),
      annualThermsOutput,
      currentThermsUsed: adjustedCurrentTherms,
      newThermsUsed: newThermsInput,
      currentAnnualCost,
      newAnnualCost,
      annualSavings,
      percentSavings,
      thermsSaved,
      co2ReductionKg,
      installCost,
      incrementalCost,
      paybackYears,
      fiveYearSavings,
      tenYearSavings,
      twentyYearSavings,
      degradation,
    };
  }, [sqft, age, cur, nxt, selectedClimate, price]);

  const isUpgrade = nxt.afue > cur.afue;
  const fit =
    !isUpgrade ? { tone: 'warn' as const, text: 'New AFUE must exceed current to show savings' } :
    calc.percentSavings >= 25 ? { tone: 'good' as const, text: 'Massive savings — strong upgrade' } :
    calc.percentSavings >= 15 ? { tone: 'good' as const, text: 'Strong upgrade' } :
    calc.percentSavings >= 5  ? { tone: 'ok' as const, text: 'Meaningful savings' } :
                                { tone: 'warn' as const, text: 'Modest improvement — comfort + reliability matter too' };

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
                Look at the yellow EnergyGuide sticker on your existing furnace. Pre-1990 units are often 60–70% AFUE; 2000s code-min is 80%; modern condensing is 90%+.
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
        <SectionHeader step={2} title="Your home & climate" subtitle="Drives heating load" Icon={TrendingUp} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current furnace age
                <InfoTip label="age">Old furnaces lose 5–15% of their nameplate efficiency over their lifetime. We adjust your current annual cost up accordingly.</InfoTip>
              </label>
              <NumberInput value={currentAge} onChange={setCurrentAge} min={0} max={30} suffix="years" ariaLabel="Furnace age" accent={ACCENT} />
              {calc.degradation < 1 && (
                <p className="text-xs text-amber-700 mt-1.5">
                  ⚠ {age}-year-old furnace loses ~{((1 - calc.degradation) * 100).toFixed(0)}% of nameplate efficiency.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Climate zone
              <InfoTip label="climate">
                Pick the row whose example cities match yours. HDD (heating degree-days, base 65°F) is the physical driver — the calc multiplies your home's heat-loss coefficient by HDD × 24 hr/day to get annual heating BTU.
              </InfoTip>
            </label>
            <CardChoice value={climate} onChange={setClimate} options={climateOptions} ariaLabel="Climate" accent={ACCENT} columns={5} />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Natural gas price ($/therm)
              <InfoTip label="gas price">
                Check your latest bill. EIA 2026 US heating-season national average is ~$1.35/therm. Regional spread: Northeast ~$1.60, West ~$1.35, Midwest ~$1.15, South ~$1.05.
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
              Upgrading from {cur.afue}% → {nxt.afue}% AFUE saves {fmt(Math.max(Math.round(calc.thermsSaved), 0))} therms/year.
              Incremental cost vs an 80% code-min replacement:{' '}
              <strong>{calc.incrementalCost > 0 ? `$${fmtMoney(calc.incrementalCost)}` : 'none — same tier'}</strong>{' · '}
              payback in{' '}
              <strong>
                {calc.incrementalCost === 0 ? 'immediate (no premium)' :
                 calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} years` : '—'}
              </strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Therms saved', value: `${fmt(Math.max(Math.round(calc.thermsSaved), 0))}/yr` },
            { label: 'CO₂ reduced', value: `${fmt(Math.round(calc.co2ReductionKg))} kg/yr`, valueClass: 'text-emerald-700' },
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
                { label: 'UA (heat loss)',    detail: `${fmt(sqft)} sq ft × ${UA_PER_SQFT} BTU/hr·°F`, factor: `${fmt(Math.round(calc.ua))} BTU/hr·°F` },
                { label: 'Annual heat load',  detail: `UA × ${fmt(selectedClimate.hdd)} HDD × 24 hr`,   factor: `${(calc.annualHeatLoadBTU / 1000000).toFixed(1)} MMBtu (${fmt(Math.round(calc.annualThermsOutput))} therms out)` },
                { label: 'Current input',     detail: `÷ ${cur.afue}% AFUE ÷ ${(calc.degradation * 100).toFixed(0)}% age`, factor: `${fmt(Math.round(calc.currentThermsUsed))} therms` },
                { label: 'New input',         detail: `÷ ${nxt.afue}% AFUE`,                             factor: `${fmt(Math.round(calc.newThermsUsed))} therms` },
                { label: 'Gas price',         detail: 'Per therm delivered',                             factor: `× $${price.toFixed(2)}/therm` },
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
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Assumes stable gas prices. Gas has averaged 3%/yr inflation over the last 20 years, so real savings are likely higher.
            </p>
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="font-semibold text-amber-900 text-sm mb-1">
                {nxt.afue >= 95 ? 'Condensing furnace (95%+ AFUE)' : nxt.afue >= 90 ? 'High-efficiency (90–94% AFUE)' : 'Standard efficiency (80–89% AFUE)'}
              </div>
              <p className="text-xs text-amber-800">
                {nxt.afue >= 95
                  ? `Requires PVC venting + condensate drain. Best for climates above ~3,000 HDD; your zone is ${fmt(selectedClimate.hdd)} HDD.`
                  : nxt.afue >= 90
                  ? `Uses traditional metal venting. Lower install cost than condensing units.`
                  : `Meets bare minimum standards. Only allowed in southern US for 2026 installs.`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
            <Leaf className="w-4 h-4 text-emerald-700" />
            Environmental impact
          </h4>
          <div className="grid sm:grid-cols-3 gap-3 text-xs text-gray-700">
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Annual CO₂ avoided</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2ReductionKg))} kg</div>
              <div className="text-[11px] text-gray-500">({fmt(Math.round(calc.co2ReductionKg * 2.2))} lbs)</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Equivalent trees</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{fmt(Math.round(calc.co2ReductionKg / 21))}</div>
              <div className="text-[11px] text-gray-500">planted per year</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-emerald-100">
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-0.5">Cars off road</div>
              <div className="text-lg font-bold text-emerald-900 tabular-nums">{(calc.co2ReductionKg / 4040).toFixed(1)}</div>
              <div className="text-[11px] text-gray-500">for one year</div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Real-world AFUE notes">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Annual load uses the <strong>degree-day rule of thumb</strong> (UA × HDD × 24 with UA = 0.25 × sqft, a code-built IRC-2018+ tight-envelope assumption). Older / leaky homes can use <strong>50–100% more gas</strong> for the same climate; deep-retrofit passive-house builds use less. Get an <strong>ACCA Manual J</strong> or blower-door test for a real UA.</li>
            <li>Lab AFUE is a steady-state rating. Real seasonal efficiency runs lower when a furnace is oversized and short-cycles.</li>
            <li>Condensing furnaces (90%+) only deliver their full rating when return-air temp is below 130°F. Hot returns kill condensing efficiency.</li>
            <li>Above 95% AFUE, every 1% gain costs disproportionately more — diminishing returns set in.</li>
            <li>A modulating two-stage furnace at 95% AFUE often outperforms a single-stage 97% in real-world comfort and total bills.</li>
            <li>Payback compares incremental cost (extra premium over an 80% AFUE code-min replacement) — if you're just replacing a working furnace with no upgrade, the "payback" question doesn't apply.</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>
    </CalcShell>
  );
}
