'use client';

import { useState, useMemo } from 'react';
import {
  Sun,
  Home,
  Battery,
  DollarSign,
  Leaf,
  Zap,
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

const ACCENT = 'emerald' as const;

const locations = [
  { value: 'arizona', name: 'Arizona', summary: '7.0 sun hr/day', sunHours: 7.0 },
  { value: 'nevada', name: 'Nevada', summary: '6.8 sun hr/day', sunHours: 6.8 },
  { value: 'colorado', name: 'Colorado', summary: '6.2 sun hr/day', sunHours: 6.2 },
  { value: 'california', name: 'California', summary: '6.0 sun hr/day', sunHours: 6.0 },
  { value: 'texas', name: 'Texas', summary: '5.8 sun hr/day', sunHours: 5.8 },
  { value: 'florida', name: 'Florida', summary: '5.5 sun hr/day', sunHours: 5.5 },
  { value: 'north-carolina', name: 'North Carolina', summary: '5.2 sun hr/day', sunHours: 5.2 },
  { value: 'average', name: 'US average', summary: '5.0 sun hr/day', sunHours: 5.0 },
  { value: 'new-york', name: 'New York', summary: '4.2 sun hr/day', sunHours: 4.2 },
  { value: 'washington', name: 'Washington', summary: '3.8 sun hr/day', sunHours: 3.8 },
];

const panelTypes = [
  { value: 'monocrystalline', name: 'Monocrystalline', summary: '20% efficient — most common', tier: 'High', efficiency: 0.20, costPerWatt: 3.00 },
  { value: 'polycrystalline', name: 'Polycrystalline', summary: '18% efficient — older tech', tier: 'Mid', efficiency: 0.18, costPerWatt: 2.50 },
  { value: 'thin-film', name: 'Thin film', summary: '12% efficient — flexible/cheap', tier: 'Low', efficiency: 0.12, costPerWatt: 2.00 },
];

export default function SolarPanelCalculator() {
  const [monthlyBill, setMonthlyBill] = useState('150');
  const [electricRate, setElectricRate] = useState('0.16');
  const [location, setLocation] = useState('average');
  const [panelType, setPanelType] = useState('monocrystalline');
  const [roofSpace, setRoofSpace] = useState('800');
  const [shadingFactor, setShadingFactor] = useState('100');
  const [systemEfficiency, setSystemEfficiency] = useState('85');

  const loc = locations.find((l) => l.value === location)!;
  const panel = panelTypes.find((p) => p.value === panelType)!;
  const bill = Math.max(parseFloat(monthlyBill) || 0, 0);
  const rate = Math.max(parseFloat(electricRate) || 0, 0.01);
  const roof = Math.max(parseFloat(roofSpace) || 0, 0);
  const shading = Math.min(Math.max(parseFloat(shadingFactor) || 100, 50), 100);
  const sysEff = Math.min(Math.max(parseFloat(systemEfficiency) || 85, 70), 95);

  const calc = useMemo(() => {
    const monthlyKwh = bill / rate;
    const dailyKwh = monthlyKwh / 30;
    const yearlyKwh = monthlyKwh * 12;
    const effectiveSunHours = loc.sunHours * (shading / 100) * (sysEff / 100);
    const systemSizeKW = effectiveSunHours > 0 ? dailyKwh / effectiveSunHours : 0;
    const systemSizeWatts = systemSizeKW * 1000;
    const typicalPanelWatts = 400;
    const panelsNeeded = Math.ceil(systemSizeWatts / typicalPanelWatts);
    const actualSystemWatts = panelsNeeded * typicalPanelWatts;
    const actualSystemKW = actualSystemWatts / 1000;
    const panelArea = 22;
    const totalPanelArea = panelsNeeded * panelArea;
    const spaceUtilization = roof > 0 ? (totalPanelArea / roof) * 100 : 0;
    const dailyProduction = actualSystemKW * effectiveSunHours;
    const monthlyProduction = dailyProduction * 30;
    const yearlyProduction = dailyProduction * 365;
    const systemCost = actualSystemWatts * panel.costPerWatt;
    const federalTaxCredit = systemCost * 0.30;
    const netSystemCost = systemCost - federalTaxCredit;
    const monthlyElectricSavings = monthlyProduction * rate;
    const yearlyElectricSavings = monthlyElectricSavings * 12;
    const paybackYears = yearlyElectricSavings > 0 ? netSystemCost / yearlyElectricSavings : 999;
    const twentyYearSavings = (yearlyElectricSavings * 20) - netSystemCost;
    const yearlyCO2Offset = yearlyProduction * 0.92;
    const twentyYearCO2Offset = yearlyCO2Offset * 20;
    const netMetering = monthlyProduction > monthlyKwh;
    const excessProduction = Math.max(0, monthlyProduction - monthlyKwh);
    const remainingUsage = Math.max(0, monthlyKwh - monthlyProduction);
    return { monthlyKwh, dailyKwh, yearlyKwh, effectiveSunHours, actualSystemKW, panelsNeeded, totalPanelArea, spaceUtilization, dailyProduction, monthlyProduction, yearlyProduction, systemCost, federalTaxCredit, netSystemCost, yearlyElectricSavings, paybackYears, twentyYearSavings, yearlyCO2Offset, twentyYearCO2Offset, netMetering, excessProduction, remainingUsage };
  }, [bill, rate, loc, panel, roof, shading, sysEff]);

  const fit =
    calc.spaceUtilization > 100 ? { tone: 'bad' as const, text: 'Roof too small — need ground mount' } :
    calc.paybackYears <= 8 ? { tone: 'good' as const, text: 'Excellent payback — great investment' } :
    calc.paybackYears <= 12 ? { tone: 'good' as const, text: 'Good investment' } :
    calc.paybackYears <= 18 ? { tone: 'ok' as const, text: 'Long payback — wait for incentives' } :
    { tone: 'warn' as const, text: 'Marginal economics in your area' };

  return (
    <CalcShell
      Icon={Sun}
      title="Solar Panel Calculator"
      subtitle="System size + 20-year ROI from your bill. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="Your electric usage" subtitle="From your last bill" Icon={Zap} accent={ACCENT} />
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Monthly bill</label>
            <NumberInput value={monthlyBill} onChange={setMonthlyBill} min={20} max={1000} suffix="$" ariaLabel="Monthly bill" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
            <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          That works out to <strong>{fmt(Math.round(calc.monthlyKwh))} kWh/month</strong> ({fmt(Math.round(calc.yearlyKwh))} kWh/yr) of usage.
        </div>
      </section>

      <section>
        <SectionHeader step={2} title="Location & panels" subtitle="Sun hours and panel type" Icon={Sun} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Location (sun hours)</label>
            <CardChoice value={location} onChange={setLocation} options={locations} ariaLabel="Location" accent={ACCENT} columns={5} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Panel type</label>
            <CardChoice value={panelType} onChange={setPanelType} options={panelTypes} ariaLabel="Panel type" accent={ACCENT} columns={3} />
          </div>
        </div>
      </section>

      <section>
        <SectionHeader step={3} title="Roof & conditions" subtitle="Available space + losses" Icon={Home} accent={ACCENT} />
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Available roof space</label>
            <NumberInput value={roofSpace} onChange={setRoofSpace} min={200} max={5000} suffix="sq ft" ariaLabel="Roof space" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Shading factor
              <InfoTip label="shading">100% = no shading. 80% = some tree/structure shade during the day. Heavy shading kills solar economics.</InfoTip>
              <span className="ml-auto text-sm font-semibold text-emerald-700">{shading}%</span>
            </label>
            <input type="range" min={50} max={100} step={1} value={shadingFactor} onChange={(e) => setShadingFactor(e.target.value)} className="w-full accent-emerald-600" aria-label="Shading factor" />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              System efficiency
              <InfoTip label="system efficiency">Accounts for inverter losses, wiring resistance, panel mismatch. Typical: 80–90%.</InfoTip>
              <span className="ml-auto text-sm font-semibold text-emerald-700">{sysEff}%</span>
            </label>
            <input type="range" min={70} max={95} step={1} value={systemEfficiency} onChange={(e) => setSystemEfficiency(e.target.value)} className="w-full accent-emerald-600" aria-label="System efficiency" />
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow="Recommended system size"
          value={`${calc.actualSystemKW.toFixed(1)}`}
          unit={`kW · ${calc.panelsNeeded} × 400W panels`}
          secondaryText={
            <>
              Produces <strong>{fmt(Math.round(calc.monthlyProduction))} kWh/month</strong> in {loc.name}.
              {calc.netMetering && <> Sends <strong>{fmt(Math.round(calc.excessProduction))} kWh/mo</strong> back to grid.</>}
              {' '}Net cost after federal credit: <strong>${fmtMoney(calc.netSystemCost)}</strong>.
            </>
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Net system cost', value: `$${fmtMoney(calc.netSystemCost)}` },
            { label: 'Payback', value: calc.paybackYears < 50 ? `${calc.paybackYears.toFixed(1)} yr` : '50+ yr' },
            { label: '20-yr savings', value: `$${fmtMoney(calc.twentyYearSavings)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Sun className="w-4 h-4 text-emerald-600" />
              System sizing
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Daily usage', detail: 'From monthly bill ÷ rate', factor: `${calc.dailyKwh.toFixed(1)} kWh` },
                { label: 'Sun hours', detail: loc.name, factor: `${loc.sunHours} hr` },
                { label: 'Effective sun', detail: `× shading × system eff`, factor: `${calc.effectiveSunHours.toFixed(2)} hr` },
                { label: 'Raw size needed', detail: 'Daily ÷ effective sun', factor: `${calc.actualSystemKW.toFixed(2)} kW` },
                { label: 'Panels (400W each)', detail: `${calc.actualSystemKW * 1000} W ÷ 400W`, factor: `${calc.panelsNeeded} panels` },
                { label: 'Total panel area', detail: '22 sq ft per panel', factor: `${fmt(Math.round(calc.totalPanelArea))} sq ft` },
                { label: 'Roof utilization', detail: `${fmt(Math.round(roof))} sq ft available`, factor: `${calc.spaceUtilization.toFixed(0)}%` },
              ]}
              totals={[
                { label: 'Daily production', value: `${calc.dailyProduction.toFixed(1)} kWh`, valueClass: 'text-emerald-700' },
                { label: 'Annual production', value: `${fmt(Math.round(calc.yearlyProduction))} kWh`, valueClass: 'text-emerald-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Investment analysis
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Equipment cost', detail: `${calc.panelsNeeded} × 400W × $${panel.costPerWatt}/W`, factor: `$${fmtMoney(calc.systemCost)}` },
                { label: 'Federal 25D credit', detail: '30% of system cost', factor: `−$${fmtMoney(calc.federalTaxCredit)}` },
                { label: 'Net investment', detail: 'After federal credit', factor: `$${fmtMoney(calc.netSystemCost)}` },
                { label: 'Annual savings', detail: `${fmt(Math.round(calc.monthlyProduction))} kWh × $${rate.toFixed(2)} × 12`, factor: `$${fmtMoney(calc.yearlyElectricSavings)}` },
                { label: 'Payback', detail: 'Net cost ÷ annual savings', factor: calc.paybackYears < 50 ? `${calc.paybackYears.toFixed(1)} yr` : '50+ yr' },
              ]}
              totals={[
                { label: '20-year net profit', value: `${calc.twentyYearSavings > 0 ? '+' : ''}$${fmtMoney(calc.twentyYearSavings)}`, valueClass: calc.twentyYearSavings > 0 ? 'text-emerald-700' : 'text-red-700' },
              ]}
            />
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Battery className="w-4 h-4 text-emerald-700" />
              Grid interaction
            </h4>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>Monthly usage</span><strong>{fmt(Math.round(calc.monthlyKwh))} kWh</strong></div>
              <div className="flex justify-between"><span>Monthly production</span><strong>{fmt(Math.round(calc.monthlyProduction))} kWh</strong></div>
              {calc.netMetering ? (
                <div className="flex justify-between text-emerald-700"><span>Excess to grid</span><strong>{fmt(Math.round(calc.excessProduction))} kWh/mo</strong></div>
              ) : (
                <div className="flex justify-between text-amber-700"><span>Still need from grid</span><strong>{fmt(Math.round(calc.remainingUsage))} kWh/mo</strong></div>
              )}
            </div>
            <p className="text-[11px] text-gray-600 mt-2">{calc.netMetering ? 'Surplus — earns net-metering credits at most utilities.' : 'Partial offset — pair with battery storage for self-consumption.'}</p>
          </div>

          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <Leaf className="w-4 h-4 text-emerald-700" />
              Environmental impact
            </h4>
            <div className="space-y-1 text-xs text-gray-700">
              <div className="flex justify-between"><span>CO₂ offset/yr</span><strong>{fmt(Math.round(calc.yearlyCO2Offset))} lbs</strong></div>
              <div className="flex justify-between"><span>20-year CO₂</span><strong>{fmt(Math.round(calc.twentyYearCO2Offset / 1000))}k lbs ({(calc.twentyYearCO2Offset / 2000).toFixed(1)} tons)</strong></div>
              <div className="flex justify-between"><span>Equivalent trees</span><strong>{fmt(Math.round(calc.twentyYearCO2Offset / 48))} (1 yr each)</strong></div>
            </div>
          </div>
        </div>

        <DisclaimerBox title="Solar economics caveats">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Federal 25D credit (30%) is current as of 2026 — verify before relying on it for your tax year</li>
            <li>Net metering rates vary by utility — California's NEM 3.0 cut export rates by ~75% vs older systems</li>
            <li>Roof age matters — replace shingles BEFORE solar install if roof is &gt; 15 yr old (otherwise pay to remove + reinstall panels)</li>
            <li>Lease vs purchase: purchase + tax credit yields 2–3× more lifetime savings than leasing in most cases</li>
            <li>Battery storage adds $10–$20k but enables backup power + self-consumption when net metering is weak</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
