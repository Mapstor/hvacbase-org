'use client';

import { useState, useMemo } from 'react';
import {
  Thermometer,
  DollarSign,
  Zap,
  CheckCircle,
  Home,
  Flame,
  Snowflake,
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
} from './_shared';

const ACCENT = 'purple' as const;

const climateZones = [
  { value: 'very-cold', name: 'Very cold', summary: 'MN, AK, N. Maine', designTemp: -10, heatingHours: 3500, coolingHours: 800, heatPumpViable: 'cold-climate-only' },
  { value: 'cold', name: 'Cold', summary: 'Chicago, Boston, Denver', designTemp: 5, heatingHours: 2800, coolingHours: 1200, heatPumpViable: 'yes-with-backup' },
  { value: 'mixed', name: 'Mixed', summary: 'DC, St. Louis, Portland', designTemp: 15, heatingHours: 1800, coolingHours: 1800, heatPumpViable: 'ideal' },
  { value: 'hot', name: 'Hot', summary: 'Atlanta, Dallas, Phoenix', designTemp: 25, heatingHours: 1000, coolingHours: 2500, heatPumpViable: 'excellent' },
  { value: 'very-hot', name: 'Very hot', summary: 'Miami, S. Texas, HI', designTemp: 35, heatingHours: 200, coolingHours: 3200, heatPumpViable: 'excellent' },
];

const fuelTypes = [
  { value: 'natural-gas', name: 'Natural Gas', sub: 'per therm', btuContent: 100000 },
  { value: 'propane', name: 'Propane', sub: 'per gallon', btuContent: 91000 },
  { value: 'heating-oil', name: 'Heating Oil', sub: 'per gallon', btuContent: 138000 },
  { value: 'electric-resistance', name: 'Electric resistance', sub: 'per kWh', btuContent: 3412 },
];

const homeSizePresets = [1500, 2000, 2500, 3000, 4000];

export default function HeatPumpVsFurnaceCalculator() {
  const [homeSize, setHomeSize] = useState('2000');
  const [climate, setClimate] = useState('mixed');
  const [currentFuel, setCurrentFuel] = useState('natural-gas');
  const [currentEfficiency, setCurrentEfficiency] = useState('80');
  const [electricRate, setElectricRate] = useState('0.16');
  const [gasRate, setGasRate] = useState('1.25');
  const [systemAge, setSystemAge] = useState('12');
  const [heatPumpCost, setHeatPumpCost] = useState('12000');
  const [furnaceCost, setFurnaceCost] = useState('6500');
  const [heatPumpCredit, setHeatPumpCredit] = useState('2000');
  const [furnaceCredit, setFurnaceCredit] = useState('600');
  const [utilityRebate, setUtilityRebate] = useState('500');

  const selectedClimate = climateZones.find((z) => z.value === climate)!;
  const selectedFuel = fuelTypes.find((f) => f.value === currentFuel)!;

  const sqft = Math.max(parseFloat(homeSize) || 0, 0);
  const cEff = Math.max(parseFloat(currentEfficiency) || 1, 1);
  const eR = Math.max(parseFloat(electricRate) || 0, 0);
  const gR = Math.max(parseFloat(gasRate) || 0, 0);
  const age = parseFloat(systemAge) || 0;
  const hpCost = Math.max(parseFloat(heatPumpCost) || 0, 0);
  const furCost = Math.max(parseFloat(furnaceCost) || 0, 0);
  const hpCredit = Math.max(parseFloat(heatPumpCredit) || 0, 0);
  const furCredit = Math.max(parseFloat(furnaceCredit) || 0, 0);
  const rebate = Math.max(parseFloat(utilityRebate) || 0, 0);

  const calc = useMemo(() => {
    const heatingLoad = sqft * 40;
    const coolingLoad = sqft * 25;

    const currentCost = (() => {
      if (currentFuel === 'electric-resistance') {
        const totalLoad = heatingLoad * selectedClimate.heatingHours + coolingLoad * selectedClimate.coolingHours;
        const kwh = totalLoad / 3412;
        return kwh * eR;
      }
      const heatBtu = heatingLoad * selectedClimate.heatingHours;
      const heatCost = (heatBtu / selectedFuel.btuContent / (cEff / 100)) * gR;
      const coolBtu = coolingLoad * selectedClimate.coolingHours;
      const coolKwh = coolBtu / (14 * 1000);
      const coolCost = coolKwh * eR;
      return heatCost + coolCost;
    })();

    const heatPumpEnergy = (() => {
      const coolBtu = coolingLoad * selectedClimate.coolingHours;
      const heatBtu = heatingLoad * selectedClimate.heatingHours;
      const coolKwh = coolBtu / (18 * 1000);
      const heatKwh = heatBtu / (9.5 * 3412);
      return (coolKwh + heatKwh) * eR;
    })();

    const furnaceEnergy = (() => {
      if (currentFuel === 'electric-resistance') {
        const heatBtu = heatingLoad * selectedClimate.heatingHours;
        const coolBtu = coolingLoad * selectedClimate.coolingHours;
        const heatKwh = heatBtu / 3412;
        const coolKwh = coolBtu / (16 * 1000);
        return (heatKwh + coolKwh) * eR;
      }
      const heatBtu = heatingLoad * selectedClimate.heatingHours;
      const heatCost = (heatBtu / selectedFuel.btuContent / 0.95) * gR;
      const coolBtu = coolingLoad * selectedClimate.coolingHours;
      const coolKwh = coolBtu / (16 * 1000);
      const coolCost = coolKwh * eR;
      return heatCost + coolCost;
    })();

    const currentMaint = age > 10 ? 500 : 300;
    const heatPumpMaint = 250;
    const furnaceMaint = 200;
    const currentTotal = currentCost + currentMaint;
    const heatPumpTotal = heatPumpEnergy + heatPumpMaint;
    const furnaceTotal = furnaceEnergy + furnaceMaint;
    const heatPumpSavings = currentTotal - heatPumpTotal;
    const furnaceSavings = currentTotal - furnaceTotal;
    const heatPumpNetCost = Math.max(hpCost - hpCredit - rebate, 0);
    const furnaceNetCost = Math.max(furCost - furCredit, 0);
    const heatPumpPayback = heatPumpSavings > 0 ? heatPumpNetCost / heatPumpSavings : 999;
    const furnacePayback = furnaceSavings > 0 ? furnaceNetCost / furnaceSavings : 999;
    const heatPump15 = heatPumpSavings * 15 - heatPumpNetCost;
    const furnace15 = furnaceSavings * 15 - furnaceNetCost;

    return {
      heatingLoad, coolingLoad, currentCost, heatPumpEnergy, furnaceEnergy,
      currentMaint, heatPumpMaint, furnaceMaint,
      currentTotal, heatPumpTotal, furnaceTotal,
      heatPumpSavings, furnaceSavings,
      heatPumpNetCost, furnaceNetCost,
      heatPumpPayback, furnacePayback,
      heatPump15, furnace15,
    };
  }, [sqft, cEff, eR, gR, age, hpCost, furCost, hpCredit, furCredit, rebate, currentFuel, selectedClimate, selectedFuel]);

  const recommendation = useMemo(() => {
    const climateScore = selectedClimate.heatPumpViable;
    const savingsDiff = calc.heatPumpSavings - calc.furnaceSavings;
    if (climateScore === 'excellent' && calc.heatPumpPayback < 12) return { choice: 'heat-pump' as const, confidence: 'high', reason: 'Excellent climate match with strong financial returns.' };
    if (climateScore === 'ideal' && calc.heatPump15 > calc.furnace15) return { choice: 'heat-pump' as const, confidence: 'high', reason: 'Ideal climate zone with better long-term economics.' };
    if (climateScore === 'cold-climate-only') return { choice: 'furnace' as const, confidence: 'medium', reason: 'Very cold climate needs a cold-climate heat pump or backup heating.' };
    if (calc.heatPumpPayback - calc.furnacePayback > 5 && calc.furnacePayback < 10) return { choice: 'furnace' as const, confidence: 'medium', reason: 'Significantly faster payback with furnace system.' };
    if (Math.abs(savingsDiff) < 100) return { choice: 'heat-pump' as const, confidence: 'medium', reason: 'Similar economics — heat pump wins on environmental benefits.' };
    if (calc.heatPump15 > calc.furnace15) return { choice: 'heat-pump' as const, confidence: 'medium', reason: 'Better long-term financial performance.' };
    return { choice: 'furnace' as const, confidence: 'medium', reason: 'Better short-term financial performance.' };
  }, [selectedClimate, calc]);

  const recColor = recommendation.choice === 'heat-pump' ? 'purple' : 'orange';

  return (
    <CalcShell
      Icon={Thermometer}
      title="Heat Pump vs Furnace Decision Tool"
      subtitle="Compare costs, climate fit, and 15-year ROI side by side. Updates live."
      accent={ACCENT}
    >
      {/* Section 1 — Home & climate */}
      <section>
        <SectionHeader step={1} title="Home & climate" subtitle="Size and DOE climate zone" Icon={Home} accent={ACCENT} />

        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Home size</label>
              <NumberInput value={homeSize} onChange={setHomeSize} min={500} max={10000} suffix="sq ft" ariaLabel="Home size" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Current system age</label>
              <NumberInput value={systemAge} onChange={setSystemAge} min={0} max={30} suffix="years" ariaLabel="System age" accent={ACCENT} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Climate zone</label>
            <CardChoice value={climate} onChange={setClimate} options={climateZones} ariaLabel="Climate zone" accent={ACCENT} columns={5} />
          </div>
        </div>
      </section>

      {/* Section 2 — Current system */}
      <section>
        <SectionHeader step={2} title="Current heating fuel" subtitle="What you heat with today" Icon={Flame} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Fuel type</label>
            <CardChoice value={currentFuel} onChange={setCurrentFuel} options={fuelTypes} ariaLabel="Current fuel" accent={ACCENT} columns={4} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                Current efficiency
                <InfoTip label="efficiency">Gas/oil/propane: AFUE % on nameplate. Electric resistance: ~100%.</InfoTip>
              </label>
              <NumberInput value={currentEfficiency} onChange={setCurrentEfficiency} min={60} max={100} suffix="%" ariaLabel="Current efficiency" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Electric rate</label>
              <NumberInput value={electricRate} onChange={setElectricRate} min={0.05} max={0.5} suffix="$/kWh" ariaLabel="Electric rate" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{selectedFuel.name} rate ({selectedFuel.sub})</label>
              <NumberInput value={gasRate} onChange={setGasRate} min={0.5} max={5} suffix={`$/${selectedFuel.sub.replace('per ', '')}`} ariaLabel="Fuel rate" accent={ACCENT} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — System costs & incentives */}
      <section>
        <SectionHeader step={3} title="New system costs & incentives" subtitle="Get 3 contractor quotes; prices vary 20–40%" Icon={DollarSign} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Heat pump cost</label>
            <NumberInput value={heatPumpCost} onChange={setHeatPumpCost} min={5000} max={25000} suffix="$" ariaLabel="Heat pump cost" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Furnace+AC cost</label>
            <NumberInput value={furnaceCost} onChange={setFurnaceCost} min={3000} max={20000} suffix="$" ariaLabel="Furnace cost" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Heat pump credit</label>
            <NumberInput value={heatPumpCredit} onChange={setHeatPumpCredit} min={0} max={2000} suffix="$" ariaLabel="Heat pump credit" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Furnace credit</label>
            <NumberInput value={furnaceCredit} onChange={setFurnaceCredit} min={0} max={600} suffix="$" ariaLabel="Furnace credit" accent={ACCENT} className="max-w-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Utility rebate (HP)</label>
            <NumberInput value={utilityRebate} onChange={setUtilityRebate} min={0} max={3000} suffix="$" ariaLabel="Utility rebate" accent={ACCENT} className="max-w-none" />
          </div>
        </div>
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        {/* Recommendation hero */}
        <div className={`rounded-2xl p-5 sm:p-6 ring-2 ${recColor === 'purple' ? 'ring-purple-300 bg-gradient-to-br from-purple-50 to-fuchsia-50' : 'ring-orange-300 bg-gradient-to-br from-orange-50 to-amber-50'}`}>
          <div className="flex items-start gap-3 flex-wrap">
            <div className={`p-2 rounded-lg ${recColor === 'purple' ? 'bg-purple-600' : 'bg-orange-600'}`}>
              {recColor === 'purple' ? <Zap className="w-5 h-5 text-white" /> : <Flame className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className={`text-xs uppercase tracking-wider font-bold ${recColor === 'purple' ? 'text-purple-700' : 'text-orange-700'}`}>
                  Recommendation · {recommendation.confidence} confidence
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {recommendation.choice === 'heat-pump' ? 'Heat Pump' : 'Furnace + AC'}
              </h3>
              <p className="text-sm text-gray-700">{recommendation.reason}</p>
            </div>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid lg:grid-cols-2 gap-4">
          {[
            { label: 'Heat pump', tone: 'purple', Icon: Zap, total: calc.heatPumpTotal, energy: calc.heatPumpEnergy, maint: calc.heatPumpMaint, cost: hpCost, credit: hpCredit + rebate, net: calc.heatPumpNetCost, payback: calc.heatPumpPayback, savings: calc.heatPumpSavings, year15: calc.heatPump15, isChoice: recommendation.choice === 'heat-pump' },
            { label: 'Furnace + AC', tone: 'orange', Icon: Flame, total: calc.furnaceTotal, energy: calc.furnaceEnergy, maint: calc.furnaceMaint, cost: furCost, credit: furCredit, net: calc.furnaceNetCost, payback: calc.furnacePayback, savings: calc.furnaceSavings, year15: calc.furnace15, isChoice: recommendation.choice === 'furnace' },
          ].map((sys) => {
            const Icon = sys.Icon;
            const isPurple = sys.tone === 'purple';
            return (
              <div key={sys.label} className={`bg-white rounded-xl border-2 p-4 ${sys.isChoice ? (isPurple ? 'border-purple-400 ring-2 ring-purple-100' : 'border-orange-400 ring-2 ring-orange-100') : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${isPurple ? 'text-purple-600' : 'text-orange-600'}`} />
                  <h4 className="font-bold text-gray-900">{sys.label}</h4>
                  {sys.isChoice && (
                    <span className={`ml-auto text-[10px] uppercase tracking-wider font-bold ${isPurple ? 'text-purple-700' : 'text-orange-700'}`}>
                      Recommended
                    </span>
                  )}
                </div>
                <div className="space-y-2 text-xs">
                  <div className={`p-3 rounded-lg ${isPurple ? 'bg-purple-50' : 'bg-orange-50'}`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 font-medium">Annual operating cost</span>
                      <span className={`font-bold ${isPurple ? 'text-purple-700' : 'text-orange-700'}`}>${fmtMoney(sys.total)}</span>
                    </div>
                    <div className="text-[11px] text-gray-500">${fmtMoney(sys.energy)} energy + ${fmtMoney(sys.maint)} maintenance</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Net cost</div>
                      <div className="font-bold text-gray-900 tabular-nums">${fmtMoney(sys.net)}</div>
                      <div className="text-[10px] text-gray-500">${fmtMoney(sys.cost)} − ${fmtMoney(sys.credit)} credits</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Payback</div>
                      <div className="font-bold text-gray-900 tabular-nums">{sys.payback < 50 ? `${sys.payback.toFixed(1)} yr` : '50+ yr'}</div>
                      <div className="text-[10px] text-gray-500">${fmtMoney(sys.savings)}/yr saved</div>
                    </div>
                  </div>
                  <div className={`p-2 rounded text-center ${sys.year15 > 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">15-year net profit</div>
                    <div className={`text-lg font-bold tabular-nums ${sys.year15 > 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                      {sys.year15 > 0 ? '+' : ''}${fmtMoney(sys.year15)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Climate context + current system */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Snowflake className="w-4 h-4 text-purple-600" />
              Climate context · {selectedClimate.name}
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Design temp', detail: 'Coldest 1% winter hours', factor: `${selectedClimate.designTemp}°F` },
                { label: 'Heating hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedClimate.heatingHours)}` },
                { label: 'Cooling hours/yr', detail: 'Equivalent full-load', factor: `${fmt(selectedClimate.coolingHours)}` },
                { label: 'Heat pump fit', detail: selectedClimate.heatPumpViable.replace(/-/g, ' '), factor: '—' },
              ]}
              totals={[]}
            />
            <p className="text-[11px] text-gray-600 mt-3 leading-snug">
              {selectedClimate.heatPumpViable === 'excellent' && '✓ Heat pumps thrive here. Minimal backup heating needed.'}
              {selectedClimate.heatPumpViable === 'ideal' && '✓ Perfect heat pump climate — balanced loads, mild winters.'}
              {selectedClimate.heatPumpViable === 'yes-with-backup' && '⚠ Heat pumps work but expect to run electric strips on the coldest 5–10 days.'}
              {selectedClimate.heatPumpViable === 'cold-climate-only' && '⚠ Standard heat pumps lose capacity below 17°F. Use cold-climate model (75% capacity at 5°F) or stick with gas furnace.'}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl border border-red-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-red-700" />
              Current system baseline
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Fuel', detail: selectedFuel.name, factor: `${cEff}% eff.` },
                { label: 'Heating cost', detail: `${fmt(selectedClimate.heatingHours)} hrs × ${fmt(calc.heatingLoad)} BTU`, factor: `—` },
                { label: 'Cooling cost', detail: `${fmt(selectedClimate.coolingHours)} hrs × ${fmt(calc.coolingLoad)} BTU`, factor: `—` },
                { label: 'Maintenance', detail: age > 10 ? 'Aging system (>10 yr)' : 'Normal upkeep', factor: `$${fmtMoney(calc.currentMaint)}/yr` },
              ]}
              totals={[
                { label: 'Current annual total', value: `$${fmtMoney(calc.currentTotal)}`, valueClass: 'text-red-700' },
              ]}
            />
          </div>
        </div>

        <DisclaimerBox title="What this comparison can't tell you">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Whether your existing ductwork can handle the lower delivery temperature heat pumps produce (gas furnaces deliver 130°F air; heat pumps deliver 95–105°F)</li>
            <li>Your home's actual load — this assumes 40 BTU/sq ft heating and 25 BTU/sq ft cooling, which varies ±30% with construction</li>
            <li>Whether utility electrification programs in your area subsidize heat pumps further</li>
            <li>The price trajectory of your fuel — gas has averaged 3%/yr inflation for 20 years</li>
          </ul>
        </DisclaimerBox>
      </section>

      <EmbedCode calculatorType="heat-pump-vs-furnace-calculator" title="Heat Pump vs Furnace Calculator" />
    </CalcShell>
  );
}
