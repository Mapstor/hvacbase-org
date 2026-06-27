'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Leaf,
  Search,
  ExternalLink,
  Zap,
} from 'lucide-react';
import EmbedCode from '../EmbedCode';
import SocialShare from '../SocialShare';
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
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'emerald' as const;

const utilityRebates = [
  { utility: 'Austin Energy', state: 'TX', city: 'Austin', rebate: '$1200', amount: 1200, minSeer: 16, website: 'austinenergy.com/rebates' },
  { utility: 'CenterPoint Energy', state: 'TX', city: 'Houston', rebate: '$500', amount: 500, minSeer: 15, website: 'centerpointenergy.com/rebates' },
  { utility: 'Oncor Electric', state: 'TX', city: 'Dallas', rebate: '$400', amount: 400, minSeer: 16, website: 'oncor.com/rebates' },
  { utility: 'CPS Energy', state: 'TX', city: 'San Antonio', rebate: '$800', amount: 800, minSeer: 15, website: 'cpsenergy.com/rebates' },
  { utility: 'PG&E', state: 'CA', city: 'San Francisco', rebate: '$600', amount: 600, minSeer: 16, website: 'pge.com/rebates' },
  { utility: 'SCE', state: 'CA', city: 'Los Angeles', rebate: '$500', amount: 500, minSeer: 15, website: 'sce.com/rebates' },
  { utility: 'SDG&E', state: 'CA', city: 'San Diego', rebate: '$400', amount: 400, minSeer: 16, website: 'sdge.com/rebates' },
  { utility: 'SMUD', state: 'CA', city: 'Sacramento', rebate: '$1500', amount: 1500, minSeer: 18, website: 'smud.org/rebates' },
  { utility: 'FPL', state: 'FL', city: 'Miami', rebate: '$300', amount: 300, minSeer: 16, website: 'fpl.com/save' },
  { utility: 'Duke Energy Florida', state: 'FL', city: 'Tampa', rebate: '$250', amount: 250, minSeer: 15, website: 'duke-energy.com/fl-rebates' },
  { utility: 'TECO', state: 'FL', city: 'Tampa', rebate: '$300', amount: 300, minSeer: 16, website: 'tecoenergy.com/rebates' },
  { utility: 'APS', state: 'AZ', city: 'Phoenix', rebate: '$400', amount: 400, minSeer: 16, website: 'aps.com/rebates' },
  { utility: 'Salt River Project', state: 'AZ', city: 'Phoenix', rebate: '$500', amount: 500, minSeer: 15, website: 'srpnet.com/rebates' },
  { utility: 'TEP', state: 'AZ', city: 'Tucson', rebate: '$350', amount: 350, minSeer: 16, website: 'tep.com/rebates' },
  { utility: 'Con Edison', state: 'NY', city: 'New York', rebate: '$1000', amount: 1000, minSeer: 16, website: 'coned.com/coolny' },
  { utility: 'PSEG Long Island', state: 'NY', city: 'Long Island', rebate: '$500', amount: 500, minSeer: 15, website: 'psegliny.com/rebates' },
  { utility: 'NYSEG', state: 'NY', city: 'Albany', rebate: '$400', amount: 400, minSeer: 16, website: 'nyseg.com/rebates' },
  { utility: 'Georgia Power', state: 'GA', city: 'Atlanta', rebate: '$600', amount: 600, minSeer: 16, website: 'georgiapower.com/rebates' },
  { utility: 'Walton EMC', state: 'GA', city: 'Monroe', rebate: '$500', amount: 500, minSeer: 15, website: 'waltonemc.com/rebates' },
  { utility: 'Xcel Energy Colorado', state: 'CO', city: 'Denver', rebate: '$800', amount: 800, minSeer: 16, website: 'xcelenergy.com/co-rebates' },
  { utility: 'Colorado Springs Utilities', state: 'CO', city: 'Colorado Springs', rebate: '$600', amount: 600, minSeer: 15, website: 'csu.org/rebates' },
  { utility: 'ComEd', state: 'IL', city: 'Chicago', rebate: '$500', amount: 500, minSeer: 16, website: 'comed.com/rebates' },
  { utility: 'Ameren Illinois', state: 'IL', city: 'Springfield', rebate: '$400', amount: 400, minSeer: 15, website: 'ameren.com/il-rebates' },
  { utility: 'NV Energy', state: 'NV', city: 'Las Vegas', rebate: '$300', amount: 300, minSeer: 15, website: 'nvenergy.com/rebates' },
  { utility: 'Duke Energy Carolinas', state: 'NC', city: 'Charlotte', rebate: '$350', amount: 350, minSeer: 16, website: 'duke-energy.com/nc-rebates' },
  { utility: 'Progress Energy', state: 'NC', city: 'Raleigh', rebate: '$300', amount: 300, minSeer: 15, website: 'progress-energy.com/rebates' },
];

const stateNames: Record<string, string> = {
  AZ: 'Arizona', CA: 'California', CO: 'Colorado', FL: 'Florida',
  GA: 'Georgia', IL: 'Illinois', NC: 'North Carolina', NV: 'Nevada',
  NY: 'New York', TX: 'Texas',
};

const acSizes = [
  { value: '1.5', name: '1.5 ton', sub: '18k BTU' },
  { value: '2', name: '2 ton', sub: '24k BTU' },
  { value: '2.5', name: '2.5 ton', sub: '30k BTU' },
  { value: '3', name: '3 ton', sub: '36k BTU' },
  { value: '3.5', name: '3.5 ton', sub: '42k BTU' },
  { value: '4', name: '4 ton', sub: '48k BTU' },
  { value: '5', name: '5 ton', sub: '60k BTU' },
];

const coolingHourPresets = [
  { value: '600', name: '600 hr', sub: 'Very cool (N. Maine, Seattle)' },
  { value: '1200', name: '1200 hr', sub: 'Moderate (Chicago, DC)' },
  { value: '1500', name: '1500 hr', sub: 'Warm (Atlanta, Dallas)' },
  { value: '2100', name: '2100 hr', sub: 'Hot (Phoenix, Houston)' },
  { value: '2800', name: '2800 hr', sub: 'Very hot (Miami, Tucson)' },
];

export default function SEER2Calculator() {
  const [currentSeer, setCurrentSeer] = useState('10');
  const [newSeer, setNewSeer] = useState('16');
  const [acSize, setAcSize] = useState('3');
  const [electricRate, setElectricRate] = useState('0.16');
  const [coolingHours, setCoolingHours] = useState('1500');
  const [systemAge, setSystemAge] = useState('15');
  const [selectedState, setSelectedState] = useState('');
  const [rebateSearch, setRebateSearch] = useState('');

  const tons = parseFloat(acSize) || 0;
  const cur = parseFloat(currentSeer) || 0;
  const next = parseFloat(newSeer) || 0;
  const rate = parseFloat(electricRate) || 0;
  const hours = parseFloat(coolingHours) || 0;
  const age = parseFloat(systemAge) || 0;

  const calc = useMemo(() => {
    const btuPerHour = tons * 12000;
    const seer2Adj = 0.955;
    const currentKwh = cur > 0 ? (btuPerHour / cur) * hours / 1000 : 0;
    const newKwh = next > 0 ? (btuPerHour / (next * seer2Adj)) * hours / 1000 : 0;
    const kwhSaved = currentKwh - newKwh;
    const currentCost = currentKwh * rate;
    const newCost = newKwh * rate;
    const annualSavings = currentCost - newCost;
    const monthlySavings = annualSavings / 5;
    const tenYearSavings = annualSavings * 10;
    const lifetimeSavings = annualSavings * 15;
    const systemCost = tons * 1800;
    const paybackYears = annualSavings > 0 ? systemCost / annualSavings : 0;
    const co2Reduction = kwhSaved * 0.92;
    const percentSavings = currentKwh > 0 ? (kwhSaved / currentKwh) * 100 : 0;
    const treesEquivalent = Math.round(co2Reduction / 48);
    const carsOffRoad = co2Reduction / 9600;
    return {
      btuPerHour,
      currentKwh,
      newKwh,
      kwhSaved,
      currentCost,
      newCost,
      annualSavings,
      monthlySavings,
      tenYearSavings,
      lifetimeSavings,
      systemCost,
      paybackYears,
      co2Reduction,
      percentSavings,
      treesEquivalent,
      carsOffRoad,
    };
  }, [tons, cur, next, rate, hours]);

  const filteredRebates = utilityRebates.filter((rebate) => {
    const term = rebateSearch.toLowerCase();
    const matchesSearch = term === '' || rebate.utility.toLowerCase().includes(term);
    const matchesState = selectedState === '' || rebate.state === selectedState;
    const qualifies = next >= rebate.minSeer;
    return matchesSearch && matchesState && qualifies;
  });
  const uniqueStates = Array.from(new Set(utilityRebates.map((r) => r.state))).sort();

  const fit =
    calc.annualSavings <= 0 ? { tone: 'warn' as const, text: 'New SEER must be higher than current' } :
    calc.percentSavings >= 40 ? { tone: 'good' as const, text: 'Huge savings — strong payback' } :
    calc.percentSavings >= 25 ? { tone: 'good' as const, text: 'Strong upgrade' } :
    calc.percentSavings >= 10 ? { tone: 'ok' as const, text: 'Meaningful savings' } :
                                { tone: 'warn' as const, text: 'Modest improvement' };

  return (
    <CalcShell
      Icon={Calculator}
      title="SEER2 Energy Savings Calculator"
      subtitle="Exact savings from upgrading your AC. Live ROI, rebates, and environmental impact."
      accent={ACCENT}
    >
      {/* Section 1 — Current vs new */}
      <section>
        <SectionHeader step={1} title="Current vs new system" subtitle="What you have, what you're upgrading to" Icon={TrendingUp} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Current SEER rating
              <InfoTip label="current SEER">
                Look at your existing condenser's nameplate. Systems 10+ years old are typically 8–13 SEER.
              </InfoTip>
            </label>
            <NumberInput value={currentSeer} onChange={setCurrentSeer} min={6} max={25} suffix="SEER" ariaLabel="Current SEER" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">Typical 10+ year old: 8–13 SEER</p>
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              New SEER2 rating
              <InfoTip label="SEER2">
                SEER2 is the post-2023 testing standard — about 4.5% stricter than old SEER. Current federal minimums: 14.3 (South), 13.8 (North).
              </InfoTip>
            </label>
            <NumberInput value={newSeer} onChange={setNewSeer} min={13} max={30} suffix="SEER2" ariaLabel="New SEER2" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">High-efficiency target: 17–20 SEER2</p>
          </div>
        </div>

        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700 mb-2 block">System size</label>
          <Segmented value={acSize} onChange={setAcSize} options={acSizes} ariaLabel="AC system size" accent={ACCENT} />
        </div>
      </section>

      {/* Section 2 — Local context */}
      <section>
        <SectionHeader step={2} title="Your usage & rates" subtitle="Local electricity cost and how much you run AC" Icon={Zap} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Electric rate
                <InfoTip label="electric rate">Check the kWh rate on a recent power bill. US average is $0.16/kWh in 2026 — California averages $0.30+, the South averages $0.10–$0.13.</InfoTip>
              </label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">US 2026 average: $0.16/kWh</p>
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                System age
                <InfoTip label="system age">Average AC lifespan is 15–20 years. Systems past 12 years typically need replacement soon — and lose efficiency every year.</InfoTip>
              </label>
              <NumberInput value={systemAge} onChange={setSystemAge} min={1} max={30} suffix="years" ariaLabel="System age" accent={ACCENT} />
              <p className="text-xs text-gray-500 mt-1.5">Average lifespan: 15–20 years</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Annual cooling hours</label>
            <CardChoice value={coolingHours} onChange={setCoolingHours} options={coolingHourPresets} ariaLabel="Annual cooling hours" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      {/* Section 3 — Rebate finder */}
      <section>
        <SectionHeader step={3} title="Find utility rebates" subtitle="Local rebate programs that match your new SEER2" Icon={Search} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">All states</option>
              {uniqueStates.map((s) => (
                <option key={s} value={s}>{stateNames[s] || s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Utility name (optional)</label>
            <input
              type="text"
              placeholder="e.g. PG&E, Austin Energy"
              value={rebateSearch}
              onChange={(e) => setRebateSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {(selectedState || rebateSearch) && (
          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">
              {filteredRebates.length > 0 ? (
                <>Found <span className="font-semibold text-emerald-700">{filteredRebates.length} program{filteredRebates.length === 1 ? '' : 's'}</span>{selectedState && <> in {stateNames[selectedState]}</>} for {next}+ SEER2 systems</>
              ) : (
                <>No matching rebates{selectedState && <> in {stateNames[selectedState]}</>} for {next} SEER2. Try a lower SEER2 or a different state.</>
              )}
            </p>
            {filteredRebates.length > 0 && (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {filteredRebates.map((r, i) => (
                  <div key={i} className="bg-white rounded-lg p-2.5 border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{r.utility}</p>
                        <p className="text-xs text-gray-500">{r.city}, {r.state} · Min SEER2: {r.minSeer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-700">{r.rebate}</p>
                        <a href={`https://${r.website}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-0.5">
                          Details <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Annual savings from upgrading"
          value={`$${fmtMoney(Math.max(calc.annualSavings, 0))}`}
          unit={`/yr (${calc.percentSavings > 0 ? calc.percentSavings.toFixed(0) : 0}% cooling cost reduction)`}
          secondaryText={
            <>
              Replacing your {cur} SEER with {next} SEER2 saves <strong>{fmt(Math.max(Math.round(calc.kwhSaved), 0))} kWh/yr</strong>.
              Over 15 years that's <strong>${fmtMoney(Math.max(calc.lifetimeSavings, 0))}</strong> in lifetime savings.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Monthly savings', value: `$${fmtMoney(Math.max(calc.monthlySavings, 0))}`, valueClass: 'text-emerald-700' },
            { label: '10-year savings', value: `$${fmtMoney(Math.max(calc.tenYearSavings, 0))}` },
            { label: 'Payback period', value: calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} yr` : '—' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Operating cost comparison
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Current — {cur} SEER</div>
                  <div className="text-[11px] text-gray-500">{fmt(Math.round(calc.currentKwh))} kWh/yr • {age} years old</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 tabular-nums">${fmtMoney(calc.currentCost)}/yr</div>
                  <div className="text-[11px] text-gray-500">${fmtMoney(calc.currentCost / 12)}/mo</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                <div>
                  <div className="font-semibold text-emerald-900 text-sm">New — {next} SEER2</div>
                  <div className="text-[11px] text-emerald-700">{fmt(Math.round(calc.newKwh))} kWh/yr • high efficiency</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tabular-nums">${fmtMoney(calc.newCost)}/yr</div>
                  <div className="text-[11px] text-emerald-600">−${fmtMoney(calc.annualSavings)}/yr</div>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 leading-snug">
              Based on {tons}-ton system × {hours} hours/yr at ${rate}/kWh. SEER2 ratings use 2023+ M1 testing, ~4.5% stricter than old SEER.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-600" />
              Environmental impact
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex justify-between"><span>Annual CO₂ reduction</span><strong>{fmt(Math.round(Math.max(calc.co2Reduction, 0)))} lbs</strong></li>
              <li className="flex justify-between"><span>Equivalent to planting</span><strong>{Math.max(calc.treesEquivalent, 0)} trees/yr</strong></li>
              <li className="flex justify-between"><span>Like taking off road</span><strong>{Math.max(calc.carsOffRoad, 0).toFixed(1)} cars</strong></li>
              <li className="flex justify-between pt-2 border-t border-gray-200"><span>15-year CO₂ prevented</span><strong>{fmt(Math.round(Math.max(calc.co2Reduction * 15 / 2000, 0)))} tons</strong></li>
            </ul>
            <div className="mt-3 bg-emerald-50 rounded-lg p-2.5 text-[11px] text-emerald-800">
              Estimated system cost: <strong>${fmtMoney(calc.systemCost)}</strong>. Payback: <strong>{calc.paybackYears > 0 ? `${calc.paybackYears.toFixed(1)} years` : '—'}</strong>.
              {next >= 16 && <span> May qualify for federal tax credit (up to 30%) and the rebates listed above.</span>}
            </div>
          </div>
        </div>

        {age >= 12 && (
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Your {age}-year-old system is near end of life</p>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                  Average AC lifespan is 15–20 years. Past 12 years, repair frequency rises sharply and the unit
                  has lost 10–25% of its original efficiency. Upgrading now locks in ${fmtMoney(calc.annualSavings)}/yr in lower bills
                  and avoids the cost of a sudden mid-summer failure.
                </p>
              </div>
            </div>
          </div>
        )}

        {next >= 18 && (
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {next} SEER2 qualifies for ENERGY STAR Most Efficient — best tier for tax credits and rebates.
          </div>
        )}

        <DisclaimerBox title="Calculation notes & caveats">
          <p>
            Based on {tons}-ton system × {hours} cooling hours × ${rate}/kWh. SEER2 ratings reflect 2023+ M1 testing
            (~4.5% stricter than old SEER). Actual savings depend on home insulation, ductwork tightness, thermostat
            habits, and maintenance. Federal residential energy credits and utility rebates are not auto-applied —
            check each program's specific equipment list.
          </p>
        </DisclaimerBox>
      </section>

      <SocialShare
        title="SEER2 Energy Savings Calculator"
        description="Calculate exact energy savings when upgrading your AC system. Includes utility rebates, environmental impact, and ROI analysis."
      />

      <EmbedCode calculatorType="seer2-savings-calculator" title="SEER2 Energy Savings Calculator" />
    </CalcShell>
  );
}
