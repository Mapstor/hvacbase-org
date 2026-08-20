'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle,
  Zap,
  Home,
  Wallet,
  Receipt,
} from 'lucide-react';
import EmbedCode from '../EmbedCode';
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

const ACCENT = 'emerald' as const;

const systemTypes = [
  { value: 'central-ac', name: 'Central AC', summary: 'SEER cooling only', effMin: 13.4, effMax: 26, isGas: false },
  { value: 'heat-pump', name: 'Heat Pump', summary: 'SEER cooling + HSPF heating', effMin: 13.4, effMax: 26, isGas: false },
  { value: 'mini-split', name: 'Mini Split', summary: 'Ductless, high SEER', effMin: 16, effMax: 30, isGas: false },
  { value: 'furnace', name: 'Gas Furnace', summary: 'AFUE heating', effMin: 80, effMax: 98.5, isGas: true },
  { value: 'boiler', name: 'Gas Boiler', summary: 'AFUE radiant heat', effMin: 80, effMax: 95, isGas: true },
];

const climateZones = [
  { value: 'hot-humid', name: 'Hot & humid', summary: 'Z1–Z2 (FL, GA, AL)', coolingHours: 2800, heatingHours: 800 },
  { value: 'hot-dry', name: 'Hot & dry', summary: 'Z3 (AZ, NM, S. CA)', coolingHours: 2400, heatingHours: 1000 },
  { value: 'mixed', name: 'Mixed', summary: 'Z4–Z5 (mid-Atlantic, midwest)', coolingHours: 1800, heatingHours: 1800 },
  { value: 'cold', name: 'Cold', summary: 'Z6–Z7 (northern US)', coolingHours: 1200, heatingHours: 2800 },
  { value: 'very-cold', name: 'Very cold', summary: 'Z8 (N. MN, AK)', coolingHours: 800, heatingHours: 3500 },
];

const homeSizePresets = [1000, 1500, 2000, 2500, 3000, 4000];

const DEFAULTS = {
  currentType: 'central-ac',
  currentEfficiency: '14',
  currentAge: '12',
  newType: 'central-ac',
  newEfficiency: '18',
  systemCost: '8500',
  homeSize: '2000',
  climate: 'mixed',
  electricityRate: '0.16',
  gasRate: '1.25',
  federalCredit: '0',
  utilityRebate: '300',
};

export default function HVACROICalculator() {
  const [currentType, setCurrentType] = useState(DEFAULTS.currentType);
  const [currentEfficiency, setCurrentEfficiency] = useState(DEFAULTS.currentEfficiency);
  const [currentAge, setCurrentAge] = useState(DEFAULTS.currentAge);

  const [newType, setNewType] = useState(DEFAULTS.newType);
  const [newEfficiency, setNewEfficiency] = useState(DEFAULTS.newEfficiency);
  const [systemCost, setSystemCost] = useState(DEFAULTS.systemCost);

  const [homeSize, setHomeSize] = useState(DEFAULTS.homeSize);
  const [climate, setClimate] = useState(DEFAULTS.climate);
  const [electricityRate, setElectricityRate] = useState(DEFAULTS.electricityRate);
  const [gasRate, setGasRate] = useState(DEFAULTS.gasRate);

  const [federalCredit, setFederalCredit] = useState(DEFAULTS.federalCredit);
  const [utilityRebate, setUtilityRebate] = useState(DEFAULTS.utilityRebate);

  const { src, hasResult, dirty, calculate, clear } = useCalculatorSubmit({
    currentType, currentEfficiency, currentAge,
    newType, newEfficiency, systemCost,
    homeSize, climate, electricityRate, gasRate,
    federalCredit, utilityRebate,
  });

  // Live lookups for input JSX (labels, min/max, suffix must react as user picks a type)
  const currentSystem = systemTypes.find((s) => s.value === currentType)!;
  const newSystem = systemTypes.find((s) => s.value === newType)!;

  // Submitted lookups for calc + results (reflect Calculate-time snapshot)
  const srcCurrentSystem = systemTypes.find((s) => s.value === src.currentType)!;
  const srcNewSystem = systemTypes.find((s) => s.value === src.newType)!;
  const srcSelectedClimate = climateZones.find((z) => z.value === src.climate)!;

  const handleReset = () => {
    setCurrentType(DEFAULTS.currentType);
    setCurrentEfficiency(DEFAULTS.currentEfficiency);
    setCurrentAge(DEFAULTS.currentAge);
    setNewType(DEFAULTS.newType);
    setNewEfficiency(DEFAULTS.newEfficiency);
    setSystemCost(DEFAULTS.systemCost);
    setHomeSize(DEFAULTS.homeSize);
    setClimate(DEFAULTS.climate);
    setElectricityRate(DEFAULTS.electricityRate);
    setGasRate(DEFAULTS.gasRate);
    setFederalCredit(DEFAULTS.federalCredit);
    setUtilityRebate(DEFAULTS.utilityRebate);
    clear();
  };

  const calc = useMemo(() => {
    const sqft = Math.max(parseFloat(src.homeSize) || 0, 0);
    const size = sqft / 600;
    const cEff = Math.max(parseFloat(src.currentEfficiency) || 1, 1);
    const nEff = Math.max(parseFloat(src.newEfficiency) || 1, 1);
    const eRate = Math.max(parseFloat(src.electricityRate) || 0, 0);
    const gRate = Math.max(parseFloat(src.gasRate) || 0, 0);
    const cost = Math.max(parseFloat(src.systemCost) || 0, 0);
    const credit = Math.max(parseFloat(src.federalCredit) || 0, 0);
    const rebate = Math.max(parseFloat(src.utilityRebate) || 0, 0);
    const age = parseFloat(src.currentAge) || 0;

    const energy = (sys: typeof systemTypes[0], eff: number) => {
      if (sys.isGas) {
        const btuNeeded = size * 50000;
        const therms = (btuNeeded / eff * 100) / 100000;
        return therms * gRate;
      } else {
        const cooling = size * 12000 * srcSelectedClimate.coolingHours;
        const heating = sys.value === 'heat-pump' ? size * 10000 * srcSelectedClimate.heatingHours : 0;
        const total = cooling + heating;
        const kwh = total / (eff * 1000);
        return kwh * eRate;
      }
    };

    const currentEnergy = energy(srcCurrentSystem, cEff);
    const newEnergy = energy(srcNewSystem, nEff);
    const currentMaint = age > 10 ? 450 : 250;
    const newMaint = 200;
    const currentTotal = currentEnergy + currentMaint;
    const newTotal = newEnergy + newMaint;
    const annualSavings = currentTotal - newTotal;
    const netCost = Math.max(cost - credit - rebate, 0);
    const payback = annualSavings > 0 ? netCost / annualSavings : 999;
    const totalSavings15 = annualSavings * 15;
    const netROI15 = totalSavings15 - netCost;
    const roiPct = netCost > 0 ? (netROI15 / netCost) * 100 : 0;
    const annualReturn = netCost > 0 && annualSavings > 0 ? (annualSavings / netCost) * 100 : 0;

    return {
      sqft, size, cEff, nEff, eRate, gRate, cost, credit, rebate, age,
      currentEnergy, newEnergy, currentMaint, newMaint, currentTotal, newTotal,
      annualSavings, netCost, payback, totalSavings15, netROI15, roiPct, annualReturn,
    };
  }, [
    src.homeSize, src.currentEfficiency, src.newEfficiency, src.electricityRate, src.gasRate,
    src.systemCost, src.federalCredit, src.utilityRebate, src.currentAge,
    srcCurrentSystem, srcNewSystem, srcSelectedClimate,
  ]);

  const fit =
    calc.annualSavings <= 0 ? { tone: 'warn' as const, text: 'New system costs more to run — recheck efficiency' } :
    calc.payback < 5 ? { tone: 'good' as const, text: 'Excellent — pays back fast' } :
    calc.payback < 8 ? { tone: 'good' as const, text: 'Strong investment' } :
    calc.payback < 12 ? { tone: 'ok' as const, text: 'Reasonable payback' } :
                        { tone: 'warn' as const, text: 'Long payback — comfort + reliability matter more than ROI here' };

  const effLabel = (sys: typeof systemTypes[0]) => sys.isGas ? 'AFUE %' : 'SEER';

  return (
    <CalcShell
      Icon={TrendingUp}
      title="HVAC ROI Calculator"
      subtitle="Energy savings, payback, and 15-year ROI for an HVAC upgrade."
      accent={ACCENT}
    >
      <form onSubmit={(e) => { e.preventDefault(); calculate(); }} className="space-y-8">
      {/* Section 1 — Current system */}
      <section>
        <SectionHeader step={1} title="Current system" subtitle="What you have today" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <CardChoice value={currentType} onChange={setCurrentType} options={systemTypes} ariaLabel="Current system type" accent={ACCENT} columns={5} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                {effLabel(currentSystem)} rating
                <InfoTip label="current efficiency">
                  Look at your existing equipment's nameplate. Old AC: 8–13 SEER. Old furnace: 60–80% AFUE.
                </InfoTip>
              </label>
              <NumberInput value={currentEfficiency} onChange={setCurrentEfficiency} min={currentSystem.effMin} max={currentSystem.effMax} suffix={currentSystem.isGas ? '%' : 'SEER'} ariaLabel="Current efficiency" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
              <NumberInput value={currentAge} onChange={setCurrentAge} min={0} max={30} suffix="years" ariaLabel="Current system age" accent={ACCENT} />
              {calc.age > 10 && (
                <p className="text-xs text-amber-700 mt-1.5">
                  ⚠ Over 10 years old — assumed maintenance cost rises to ${calc.currentMaint}/yr.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — New system */}
      <section>
        <SectionHeader step={2} title="Proposed new system" subtitle="What you're considering buying" Icon={Zap} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <CardChoice value={newType} onChange={setNewType} options={systemTypes} ariaLabel="New system type" accent={ACCENT} columns={5} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{effLabel(newSystem)} rating</label>
              <NumberInput value={newEfficiency} onChange={setNewEfficiency} min={newSystem.effMin} max={newSystem.effMax} suffix={newSystem.isGas ? '%' : 'SEER'} ariaLabel="New efficiency" accent={ACCENT} />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Total installed cost
                <InfoTip label="installed cost">Equipment + labor + permits. Get 3+ contractor quotes — installed prices vary 20–40% in the same market.</InfoTip>
              </label>
              <NumberInput value={systemCost} onChange={setSystemCost} min={1000} max={50000} suffix="$" ariaLabel="System cost" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Home + utilities */}
      <section>
        <SectionHeader step={3} title="Your home & utility rates" subtitle="Determines runtime and operating cost" Icon={Wallet} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
            <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">Estimated system tonnage: {calc.size.toFixed(1)} tons</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climate} onChange={setClimate} options={climateZones} ariaLabel="Climate zone" accent={ACCENT} columns={5} />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Electricity rate</label>
              <NumberInput value={electricityRate} onChange={setElectricityRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electricity rate" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Gas rate</label>
              <NumberInput value={gasRate} onChange={setGasRate} min={0.5} max={3} suffix="$/therm" ariaLabel="Gas rate" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — Incentives */}
      <section>
        <SectionHeader step={4} title="Incentives" subtitle="Utility rebates reduce net cost (federal 25C credit ended for 2026 installs)" Icon={Receipt} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Federal tax credit
              <InfoTip label="federal credit">The federal Section 25C tax credit ended for property placed in service after Dec 31, 2025 (OBBBA), with no federal successor. Enter 0 for a 2026 install. For a 2024–2025 install, enter the amount you actually claimed — consult a tax professional if unsure.</InfoTip>
            </label>
            <NumberInput value={federalCredit} onChange={setFederalCredit} min={0} max={2000} suffix="$" ariaLabel="Federal tax credit" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Utility rebate</label>
            <NumberInput value={utilityRebate} onChange={setUtilityRebate} min={0} max={3000} suffix="$" ariaLabel="Utility rebate" accent={ACCENT} />
            <p className="text-xs text-gray-500 mt-1.5">Check your state/utility program or the DSIRE database (dsireusa.org) for current rebates in your area.</p>
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
          eyebrow="Annual savings vs current system"
          value={`$${fmtMoney(Math.max(calc.annualSavings, 0))}`}
          unit={`/yr · payback in ${calc.payback < 50 ? `${calc.payback.toFixed(1)} years` : '50+ years'}`}
          secondaryText={
            <>
              Net investment after credits: <strong>${fmtMoney(calc.netCost)}</strong>.
              15-year net profit: <strong>${fmtMoney(calc.netROI15)}</strong> ({calc.roiPct.toFixed(0)}% ROI).
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Annual return', value: `${calc.annualReturn.toFixed(1)}%`, valueClass: 'text-emerald-700' },
            { label: '15-yr savings', value: `$${fmtMoney(calc.totalSavings15)}` },
            { label: 'Net cost', value: `$${fmtMoney(calc.netCost)}` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Annual cost comparison
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 ring-1 ring-red-200">
                <div>
                  <div className="font-semibold text-red-900 text-sm">Current — {srcCurrentSystem.name}</div>
                  <div className="text-[11px] text-red-700">{calc.cEff} {srcCurrentSystem.isGas ? 'AFUE' : 'SEER'} · {calc.age}-yr-old</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-700 tabular-nums">${fmtMoney(calc.currentTotal)}/yr</div>
                  <div className="text-[11px] text-red-600">${fmtMoney(calc.currentEnergy)} energy + ${fmtMoney(calc.currentMaint)} maint</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                <div>
                  <div className="font-semibold text-emerald-900 text-sm">New — {srcNewSystem.name}</div>
                  <div className="text-[11px] text-emerald-700">{calc.nEff} {srcNewSystem.isGas ? 'AFUE' : 'SEER'} · new install</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-700 tabular-nums">${fmtMoney(calc.newTotal)}/yr</div>
                  <div className="text-[11px] text-emerald-600">${fmtMoney(calc.newEnergy)} energy + ${fmtMoney(calc.newMaint)} maint</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 ring-2 ring-blue-300">
                <div className="font-semibold text-blue-900">Annual difference</div>
                <div className="text-xl font-bold text-blue-700 tabular-nums">${fmtMoney(calc.annualSavings)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-emerald-600" />
              15-year financial picture
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Equipment + install', detail: 'Quoted system cost', factor: `$${fmtMoney(calc.cost)}` },
                { label: 'Federal credit', detail: 'If any — 25C ended for 2026 installs', factor: `−$${fmtMoney(calc.credit)}` },
                { label: 'Utility rebate', detail: 'Local utility program', factor: `−$${fmtMoney(calc.rebate)}` },
              ]}
              totals={[
                { label: 'Net investment', value: `$${fmtMoney(calc.netCost)}`, valueClass: 'text-gray-900' },
                { label: '15-yr energy + maint savings', value: `+$${fmtMoney(calc.totalSavings15)}`, valueClass: 'text-emerald-700' },
                { label: 'Net profit / loss', value: `${calc.netROI15 > 0 ? '+' : ''}$${fmtMoney(calc.netROI15)}`, valueClass: calc.netROI15 > 0 ? 'text-emerald-700' : 'text-red-700' },
              ]}
            />
            <p className="text-[11px] text-gray-500 mt-2 leading-snug">
              Assumes stable utility rates over 15 years. Rates have historically risen 2–4%/yr, making real-world savings ~20% higher.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3">
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-center">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 mb-1">5-yr savings</div>
            <div className="text-2xl font-bold text-emerald-900 tabular-nums">${fmtMoney(Math.max(calc.annualSavings * 5, 0))}</div>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-center">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 mb-1">10-yr savings</div>
            <div className="text-2xl font-bold text-emerald-900 tabular-nums">${fmtMoney(Math.max(calc.annualSavings * 10, 0))}</div>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3 text-center">
            <div className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 mb-1">15-yr savings</div>
            <div className="text-2xl font-bold text-emerald-900 tabular-nums">${fmtMoney(Math.max(calc.totalSavings15, 0))}</div>
          </div>
        </div>

        <DisclaimerBox title="Benefits this calculator can't quantify">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Improved comfort, humidity control, and even temperatures</li>
            <li>Lower repair frequency vs an aging system on borrowed time</li>
            <li>Better indoor air quality (variable-speed blowers filter more air)</li>
            <li>~3–5% home resale value bump for high-efficiency HVAC</li>
            <li>Utility demand-response program payments (some areas)</li>
            <li>Avoided cost of a sudden mid-summer failure (emergency replacement is 20–40% more)</li>
          </ul>
        </DisclaimerBox>
      </section>
      )}
      </form>

      <EmbedCode calculatorType="hvac-roi-calculator" title="HVAC ROI Calculator" />
    </CalcShell>
  );
}
