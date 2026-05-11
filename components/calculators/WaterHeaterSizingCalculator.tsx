'use client';

import { useState, useMemo } from 'react';
import {
  Droplets,
  Home,
  Users,
  Clock,
  TrendingUp,
  Flame,
  Zap,
  Sun,
  ShowerHead,
  Bath,
  ChefHat,
  Shirt,
} from 'lucide-react';
import {
  fmt,
  fmtMoney,
  CalcShell,
  SectionHeader,
  Segmented,
  CardChoice,
  NumberInput,
  InfoTip,
  ResultHero,
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'red' as const;

const heaterTypes = [
  { value: 'tank-electric', name: 'Tank — Electric', tier: 'Common',
    efficiency: 0.95, recoveryRate: 20, price: 1200, isTank: true,
    note: 'Cheapest install. Slow recovery (20 gal/hr).' },
  { value: 'tank-gas', name: 'Tank — Gas', tier: 'Common',
    efficiency: 0.60, recoveryRate: 40, price: 1500, isTank: true,
    note: 'Fast recovery (40 gal/hr). Standard in most homes.' },
  { value: 'tankless-electric', name: 'Tankless — Electric', tier: 'High',
    efficiency: 0.98, recoveryRate: 0, price: 2500, isTank: false,
    note: 'Unlimited hot water. May need panel upgrade for >5 GPM.' },
  { value: 'tankless-gas', name: 'Tankless — Gas', tier: 'High',
    efficiency: 0.82, recoveryRate: 0, price: 3000, isTank: false,
    note: 'Unlimited + handles cold inlet better than electric.' },
  { value: 'heat-pump', name: 'Heat Pump (HPWH)', tier: 'Ultra',
    efficiency: 3.0, recoveryRate: 15, price: 3500, isTank: true,
    note: '3× more efficient than electric tank. Best in warm spaces.' },
  { value: 'solar', name: 'Solar + Backup', tier: 'Ultra',
    efficiency: 0.90, recoveryRate: 30, price: 6000, isTank: true,
    note: 'Lowest operating cost. Highest upfront cost.' },
];

const usagePatterns = [
  { value: 'low', name: 'Low', summary: 'Minimal hot water use, conservative habits', factor: 0.75 },
  { value: 'average', name: 'Average', summary: 'Typical household routines', factor: 1.0 },
  { value: 'high', name: 'High', summary: 'Frequent showers + dishwasher daily', factor: 1.25 },
  { value: 'very-high', name: 'Very high', summary: 'Large family, multiple baths/showers', factor: 1.5 },
];

const bathroomOptions = [
  { value: '1', name: '1' },
  { value: '1.5', name: '1.5' },
  { value: '2', name: '2' },
  { value: '2.5', name: '2.5' },
  { value: '3', name: '3' },
  { value: '4', name: '4+' },
];

const simultaneousOptions = [
  { value: '1', name: '1 fixture', sub: 'Single shower at peak' },
  { value: '2', name: '2 fixtures', sub: 'Shower + sink' },
  { value: '3', name: '3 fixtures', sub: '2 showers + sink' },
  { value: '4', name: '4+ fixtures', sub: 'Multiple bathrooms at once' },
];

export default function WaterHeaterSizingCalculator() {
  const [residents, setResidents] = useState('4');
  const [bathrooms, setBathrooms] = useState('2.5');
  const [heaterType, setHeaterType] = useState('tank-gas');
  const [usagePattern, setUsagePattern] = useState('average');
  const [showersPerDay, setShowersPerDay] = useState('4');
  const [bathsPerWeek, setBathsPerWeek] = useState('2');
  const [dishwasherLoads, setDishwasherLoads] = useState('7');
  const [laundryLoads, setLaundryLoads] = useState('5');
  const [simultaneousUse, setSimultaneousUse] = useState('2');

  const selectedType = heaterTypes.find((t) => t.value === heaterType)!;
  const selectedUsage = usagePatterns.find((u) => u.value === usagePattern)!;

  const rN = Math.max(parseFloat(residents) || 0, 0);
  const sN = Math.max(parseFloat(showersPerDay) || 0, 0);
  const bN = Math.max(parseFloat(bathsPerWeek) || 0, 0);
  const dN = Math.max(parseFloat(dishwasherLoads) || 0, 0);
  const lN = Math.max(parseFloat(laundryLoads) || 0, 0);

  const calc = useMemo(() => {
    const showerGallons = sN * 25;
    const bathGallons = (bN / 7) * 40;
    const dishwasherGallons = (dN / 7) * 6;
    const laundryGallons = (lN / 7) * 25;
    const sinkGallons = rN * 4;
    const dailyGallons = (showerGallons + bathGallons + dishwasherGallons + laundryGallons + sinkGallons) * selectedUsage.factor;
    const peakHourDemand = dailyGallons * 0.3;

    let recommendedTankSize = 40;
    let recommendedTanklessGPM = 5;
    let maxTemperatureRise = 0;

    if (selectedType.isTank) {
      const tankSizes = [30, 40, 50, 65, 75, 80, 100, 120];
      const requiredFHR = peakHourDemand + selectedType.recoveryRate;
      recommendedTankSize = tankSizes.find((s) => s >= requiredFHR) || 120;
    } else {
      const simultaneousGPM = parseFloat(simultaneousUse) * 2.5;
      const adjustedGPM = heaterType === 'tankless-electric' ? simultaneousGPM * 1.2 : simultaneousGPM;
      recommendedTanklessGPM = Math.ceil(adjustedGPM);
      maxTemperatureRise = heaterType === 'tankless-gas' ? 70 : 50;
    }

    const energyPerGallon = 8.33 * 60 / (selectedType.efficiency === 3.0 ? 3.0 : selectedType.efficiency);
    const dailyEnergyBTU = dailyGallons * energyPerGallon;
    const yearlyEnergyBTU = dailyEnergyBTU * 365;

    let yearlyCost = 0;
    if (heaterType.includes('electric') || heaterType === 'heat-pump') {
      const kWhPerYear = yearlyEnergyBTU / 3412 / (heaterType === 'heat-pump' ? 3.0 : selectedType.efficiency);
      yearlyCost = kWhPerYear * 0.16;
    } else if (heaterType.includes('gas')) {
      const thermsPerYear = yearlyEnergyBTU / 100000 / selectedType.efficiency;
      yearlyCost = thermsPerYear * 1.2;
    } else {
      yearlyCost = dailyGallons * 365 * 0.001;
    }

    const recoveryTime = selectedType.isTank && selectedType.recoveryRate > 0
      ? recommendedTankSize / selectedType.recoveryRate : 0;
    const needsVenting = heaterType.includes('gas');
    const needsElectricalUpgrade = heaterType === 'tankless-electric' && recommendedTanklessGPM > 5;

    const standardTankCost = 500;
    const annualSavings = standardTankCost - yearlyCost;
    const paybackYears = annualSavings > 0 ? (selectedType.price - 1200) / annualSavings : 0;

    return {
      showerGallons, bathGallons, dishwasherGallons, laundryGallons, sinkGallons,
      dailyGallons, peakHourDemand,
      recommendedTankSize, recommendedTanklessGPM, maxTemperatureRise,
      yearlyCost, recoveryTime, needsVenting, needsElectricalUpgrade,
      annualSavings, paybackYears,
    };
  }, [rN, sN, bN, dN, lN, selectedUsage, selectedType, heaterType, simultaneousUse]);

  const fit =
    calc.dailyGallons === 0 ? { tone: 'warn' as const, text: 'Add residents to start' } :
    selectedType.isTank
      ? (calc.peakHourDemand < calc.recommendedTankSize * 0.6
          ? { tone: 'good' as const, text: 'Comfortable headroom' }
          : { tone: 'ok' as const, text: 'Sized to demand' })
      : { tone: 'good' as const, text: 'Tankless — unlimited supply' };

  return (
    <CalcShell
      Icon={Droplets}
      title="Water Heater Sizing Calculator"
      subtitle="Match capacity to your household's hot-water demand. Updates live."
      accent={ACCENT}
    >
      {/* Section 1 — Household */}
      <section>
        <SectionHeader step={1} title="Your household" subtitle="People and bathrooms drive base demand" Icon={Users} accent={ACCENT} />

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Residents
              <InfoTip label="residents">Count people living in the home full-time. Part-time guests don't materially change peak demand.</InfoTip>
            </label>
            <NumberInput value={residents} onChange={setResidents} min={1} max={10} suffix="people" ariaLabel="Residents" accent={ACCENT} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Bathrooms</label>
            <Segmented value={bathrooms} onChange={setBathrooms} options={bathroomOptions} ariaLabel="Bathrooms" accent={ACCENT} />
          </div>
        </div>
      </section>

      {/* Section 2 — Hot water habits */}
      <section>
        <SectionHeader step={2} title="Hot-water habits" subtitle="What gets used and how often" Icon={ShowerHead} accent={ACCENT} />

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Usage pattern</label>
            <CardChoice value={usagePattern} onChange={setUsagePattern} options={usagePatterns} ariaLabel="Usage pattern" accent={ACCENT} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <ShowerHead className="w-4 h-4 mr-1.5 text-gray-500" />
                Showers / day
              </label>
              <NumberInput value={showersPerDay} onChange={setShowersPerDay} min={0} max={20} ariaLabel="Showers per day" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Bath className="w-4 h-4 mr-1.5 text-gray-500" />
                Baths / week
              </label>
              <NumberInput value={bathsPerWeek} onChange={setBathsPerWeek} min={0} max={20} ariaLabel="Baths per week" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <ChefHat className="w-4 h-4 mr-1.5 text-gray-500" />
                Dishwasher / wk
              </label>
              <NumberInput value={dishwasherLoads} onChange={setDishwasherLoads} min={0} max={30} ariaLabel="Dishwasher loads per week" accent={ACCENT} className="max-w-none" />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Shirt className="w-4 h-4 mr-1.5 text-gray-500" />
                Laundry / wk
              </label>
              <NumberInput value={laundryLoads} onChange={setLaundryLoads} min={0} max={30} ariaLabel="Laundry loads per week" accent={ACCENT} className="max-w-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Heater type */}
      <section>
        <SectionHeader step={3} title="Heater type" subtitle="Tank, tankless, heat pump, or solar" Icon={Flame} accent={ACCENT} />

        <CardChoice value={heaterType} onChange={setHeaterType} options={heaterTypes} ariaLabel="Heater type" accent={ACCENT} />

        {!selectedType.isTank && (
          <div className="mt-4">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Peak simultaneous fixtures
              <InfoTip label="simultaneous fixtures">How many hot-water fixtures run at the same time during your peak hour. A morning where a shower + bathroom sink + kitchen sink might all run = 3.</InfoTip>
            </label>
            <CardChoice value={simultaneousUse} onChange={setSimultaneousUse} options={simultaneousOptions} ariaLabel="Simultaneous fixtures" accent={ACCENT} columns={4} />
          </div>
        )}
      </section>

      {/* Results */}
      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow={selectedType.isTank ? 'Recommended tank size' : 'Recommended tankless capacity'}
          value={selectedType.isTank ? calc.recommendedTankSize : calc.recommendedTanklessGPM}
          unit={selectedType.isTank ? 'gallon tank' : 'GPM flow rate'}
          secondaryText={
            selectedType.isTank ? (
              <>
                Sized for your {fmt(Math.round(calc.dailyGallons))} gallons/day demand
                ({fmt(Math.round(calc.peakHourDemand))} gal in your peak hour). Recovery time: <strong>{calc.recoveryTime.toFixed(1)} hrs</strong>.
              </>
            ) : (
              <>
                Sized for {simultaneousUse} simultaneous fixture{simultaneousUse === '1' ? '' : 's'}.
                Max temperature rise: <strong>{calc.maxTemperatureRise}°F</strong>. Unlimited hot water as long as flow stays within capacity.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          warning={calc.needsElectricalUpgrade ? (
            <>
              An electric tankless above 5 GPM needs <strong>200A service + multiple 240V circuits</strong>.
              Panel upgrade typically costs $2,000–$4,000.
            </>
          ) : undefined}
          sidePanel={[
            { label: 'Daily use', value: `${fmt(Math.round(calc.dailyGallons))} gal` },
            { label: 'Peak hour', value: `${fmt(Math.round(calc.peakHourDemand))} gal` },
            { label: 'Annual cost', value: `$${fmtMoney(calc.yearlyCost)}`, valueClass: 'text-emerald-700' },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-red-600" />
              Daily usage breakdown
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Showers', detail: `${sN} × 25 gal`, factor: `${fmt(Math.round(calc.showerGallons))} gal` },
                { label: 'Baths', detail: `${bN}/wk × 40 gal ÷ 7`, factor: `${fmt(Math.round(calc.bathGallons))} gal` },
                { label: 'Dishwasher', detail: `${dN}/wk × 6 gal ÷ 7`, factor: `${fmt(Math.round(calc.dishwasherGallons))} gal` },
                { label: 'Laundry', detail: `${lN}/wk × 25 gal ÷ 7`, factor: `${fmt(Math.round(calc.laundryGallons))} gal` },
                { label: 'Misc (sinks)', detail: `${rN} people × 4 gal`, factor: `${fmt(Math.round(calc.sinkGallons))} gal` },
                { label: 'Usage pattern', detail: selectedUsage.name, factor: `× ${selectedUsage.factor.toFixed(2)}` },
              ]}
              totals={[
                { label: 'Daily hot water', value: `${fmt(Math.round(calc.dailyGallons))} gal/day`, valueClass: 'text-red-700' },
                { label: 'Annual', value: `${fmt(Math.round(calc.dailyGallons * 365))} gal/yr` },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-red-600" />
              Performance & operating cost
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li><strong>Type:</strong> {selectedType.name} ({selectedType.tier})</li>
              <li><strong>Efficiency:</strong> {selectedType.efficiency >= 1 ? `COP ${selectedType.efficiency.toFixed(1)}` : `${(selectedType.efficiency * 100).toFixed(0)}% EF`}</li>
              {selectedType.isTank ? (
                <>
                  <li><strong>Recovery:</strong> {selectedType.recoveryRate} gal/hr · full tank refill in {calc.recoveryTime.toFixed(1)} hrs</li>
                  <li><strong>Standby loss:</strong> 5–10%/day (tank radiates heat continuously)</li>
                </>
              ) : (
                <>
                  <li><strong>Flow rate:</strong> {calc.recommendedTanklessGPM} GPM at {calc.maxTemperatureRise}°F rise</li>
                  <li><strong>No standby loss:</strong> only fires when water flows</li>
                </>
              )}
              <li><strong>Equipment cost:</strong> ~${fmtMoney(selectedType.price)}</li>
              <li><strong>Venting required:</strong> {calc.needsVenting ? 'Yes (gas)' : 'No (electric)'}</li>
              <li className="pt-1.5 border-t border-gray-100"><strong>Annual operating cost:</strong> <span className="text-emerald-700 font-bold">${fmtMoney(calc.yearlyCost)}</span></li>
              {calc.paybackYears > 0 && calc.paybackYears < 20 && (
                <li><strong>Payback vs std tank:</strong> {calc.paybackYears.toFixed(1)} years</li>
              )}
            </ul>
          </div>

          {heaterType === 'heat-pump' && (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-700" /> Why a heat pump water heater (HPWH)
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                HPWHs pull heat from surrounding air (basement, garage, utility room) instead of generating it electrically. That gives them an effective COP of 2.5–3.5 — saving roughly ${fmtMoney(Math.max(500 - calc.yearlyCost, 0))}/yr vs a standard electric tank. They also cool and dehumidify the space they're in. Federal credit covers up to $2,000 for ENERGY STAR HPWHs.
              </p>
            </div>
          )}

          {calc.dailyGallons > 80 && selectedType.isTank && (
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-700" /> Consider tankless
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                At {fmt(Math.round(calc.dailyGallons))} gallons/day, a tankless unit would give you unlimited hot water and could
                save ~${fmtMoney(calc.yearlyCost * 0.2)}/yr by eliminating standby losses. The tradeoff is higher upfront cost
                (${fmtMoney(3000)} typical install) and potentially a panel upgrade for electric tankless.
              </p>
            </div>
          )}
        </div>

        <DisclaimerBox title="Sizing right matters — both ways.">
          <p>
            Undersized water heaters leave you with cold showers in the morning. Oversized tanks waste energy on standby losses
            (the bigger the tank, the more heat it radiates 24/7). For tankless, the most common mistake is undersizing the
            temperature rise capacity — a unit that delivers 7 GPM in Texas will only deliver 4 GPM in Minnesota in February.
            Always have a plumber verify with your local groundwater temperature.
          </p>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
