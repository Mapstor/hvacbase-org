'use client';

import { useState, useMemo } from 'react';
import {
  Thermometer,
  Beaker,
  TrendingUp,
  Flame,
  Snowflake,
  Calculator,
} from 'lucide-react';
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
  BreakdownTable,
  DisclaimerBox,
  ResultsHeader,
} from './_shared';

const ACCENT = 'red' as const;

const materials = [
  { value: 'water', name: 'Water', summary: '4186 J/kg·°C (high)', specificHeat: 4186, density: 1000 },
  { value: 'air', name: 'Air (dry)', summary: '1005 J/kg·°C', specificHeat: 1005, density: 1.225 },
  { value: 'steel', name: 'Steel', summary: '490 J/kg·°C', specificHeat: 490, density: 7850 },
  { value: 'aluminum', name: 'Aluminum', summary: '903 J/kg·°C', specificHeat: 903, density: 2700 },
  { value: 'copper', name: 'Copper', summary: '385 J/kg·°C', specificHeat: 385, density: 8960 },
  { value: 'concrete', name: 'Concrete', summary: '880 J/kg·°C', specificHeat: 880, density: 2400 },
  { value: 'wood', name: 'Wood (oak)', summary: '2010 J/kg·°C', specificHeat: 2010, density: 750 },
  { value: 'glass', name: 'Glass', summary: '840 J/kg·°C', specificHeat: 840, density: 2500 },
  { value: 'ice', name: 'Ice', summary: '2090 J/kg·°C', specificHeat: 2090, density: 917 },
  { value: 'oil', name: 'Engine oil', summary: '1880 J/kg·°C', specificHeat: 1880, density: 900 },
  { value: 'ethanol', name: 'Ethanol', summary: '2440 J/kg·°C', specificHeat: 2440, density: 789 },
  { value: 'custom', name: 'Custom', summary: 'Enter your own values', specificHeat: 1000, density: 1000 },
];

const calculationTypes = [
  { value: 'energy', name: 'Energy needed', sub: 'For ΔT' },
  { value: 'temperature', name: 'Final temp', sub: 'From energy in' },
  { value: 'mass', name: 'Mass needed', sub: 'For ΔT + energy' },
];

const unitModeOptions = [
  { value: 'mass', name: 'Mass (kg)' },
  { value: 'volume', name: 'Volume (m³)' },
];

export default function SpecificHeatCalculator() {
  const [material, setMaterial] = useState('water');
  const [calculationType, setCalculationType] = useState('energy');
  const [unitMode, setUnitMode] = useState('mass');
  const [mass, setMass] = useState('10');
  const [volume, setVolume] = useState('0.01');
  const [initialTemp, setInitialTemp] = useState('20');
  const [finalTemp, setFinalTemp] = useState('80');
  const [energyInput, setEnergyInput] = useState('2500000');
  const [customSpecificHeat, setCustomSpecificHeat] = useState('1000');
  const [customDensity, setCustomDensity] = useState('1000');

  const selected = materials.find((m) => m.value === material)!;
  const specificHeat = material === 'custom' ? parseFloat(customSpecificHeat) || 1 : selected.specificHeat;
  const density = material === 'custom' ? parseFloat(customDensity) || 1 : selected.density;
  const actualMass = unitMode === 'volume' ? (parseFloat(volume) || 0) * density : parseFloat(mass) || 0;
  const Ti = parseFloat(initialTemp) || 0;
  const Tf = parseFloat(finalTemp) || 0;
  const E = parseFloat(energyInput) || 0;

  const calc = useMemo(() => {
    const deltaT = Tf - Ti;
    let energyRequired = 0;
    let finalTemperature = 0;
    let requiredMass = 0;
    if (calculationType === 'energy') {
      energyRequired = actualMass * specificHeat * deltaT;
    } else if (calculationType === 'temperature') {
      const tempChange = actualMass > 0 ? E / (actualMass * specificHeat) : 0;
      finalTemperature = Ti + tempChange;
    } else if (calculationType === 'mass') {
      requiredMass = deltaT !== 0 ? E / (specificHeat * deltaT) : 0;
    }
    const energy = calculationType === 'energy' ? energyRequired : E;
    const energyKJ = energy / 1000;
    const energyKWh = energy / 3600000;
    const energyBTU = energy / 1055;
    const energyCal = energy / 4184;
    const powerWatts = energy / 3600;
    const thermalMass = actualMass * specificHeat;
    const electricityCost = energyKWh * 0.16;
    const gasCost = (energyBTU / 100000) * 1.2;
    const TiF = Ti * 9 / 5 + 32;
    const TfF = Tf * 9 / 5 + 32;
    const TiK = Ti + 273.15;
    const TfK = Tf + 273.15;
    return {
      deltaT, energyRequired, finalTemperature, requiredMass,
      energy, energyKJ, energyKWh, energyBTU, energyCal,
      powerWatts, thermalMass, electricityCost, gasCost,
      TiF, TfF, TiK, TfK,
    };
  }, [calculationType, actualMass, specificHeat, density, Ti, Tf, E]);

  const heroValue =
    calculationType === 'energy' ? `${fmt(Math.round(Math.abs(calc.energyRequired)))} J` :
    calculationType === 'temperature' ? `${calc.finalTemperature.toFixed(1)}°C` :
    `${calc.requiredMass.toFixed(2)} kg`;

  const heroEyebrow =
    calculationType === 'energy' ? 'Energy required' :
    calculationType === 'temperature' ? 'Final temperature' :
    'Required mass';

  const fit =
    calculationType === 'energy'
      ? (calc.deltaT === 0 ? { tone: 'warn' as const, text: 'Same start + final temp = no energy' } :
         calc.deltaT > 0 ? { tone: 'good' as const, text: '🔥 Heating process' } :
                          { tone: 'good' as const, text: '❄ Cooling process' })
      : actualMass === 0
        ? { tone: 'warn' as const, text: 'Enter mass or volume' }
        : { tone: 'good' as const, text: 'Calculation valid' };

  return (
    <CalcShell
      Icon={Thermometer}
      title="Specific Heat Calculator"
      subtitle="Q = mcΔT for heating, cooling, and energy storage. Updates live."
      accent={ACCENT}
    >
      <section>
        <SectionHeader step={1} title="What to calculate" subtitle="Pick the unknown" Icon={Calculator} accent={ACCENT} />
        <Segmented value={calculationType} onChange={setCalculationType} options={calculationTypes} ariaLabel="Calculation type" accent={ACCENT} />
      </section>

      <section>
        <SectionHeader step={2} title="Material" subtitle="Specific heat + density from material" Icon={Beaker} accent={ACCENT} />
        <CardChoice value={material} onChange={setMaterial} options={materials} ariaLabel="Material" accent={ACCENT} columns={4} />
        {material === 'custom' && (
          <div className="grid sm:grid-cols-2 gap-5 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Specific heat (J/kg·°C)</label>
              <NumberInput value={customSpecificHeat} onChange={setCustomSpecificHeat} min={1} max={10000} suffix="J/kg·°C" ariaLabel="Custom specific heat" accent={ACCENT} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Density (kg/m³)</label>
              <NumberInput value={customDensity} onChange={setCustomDensity} min={0.1} max={20000} suffix="kg/m³" ariaLabel="Custom density" accent={ACCENT} />
            </div>
          </div>
        )}
      </section>

      <section>
        <SectionHeader step={3} title="Mass + temperatures" subtitle="Sized in either mass or volume" Icon={Thermometer} accent={ACCENT} />
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
            <Segmented value={unitMode} onChange={setUnitMode} options={unitModeOptions} ariaLabel="Mass or volume" accent={ACCENT} />
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {unitMode === 'mass' ? 'Mass' : 'Volume'}
              </label>
              {unitMode === 'mass' ? (
                <NumberInput value={mass} onChange={setMass} min={0.001} max={10000} suffix="kg" ariaLabel="Mass" accent={ACCENT} className="max-w-none" />
              ) : (
                <NumberInput value={volume} onChange={setVolume} min={0.001} max={1000} suffix="m³" ariaLabel="Volume" accent={ACCENT} className="max-w-none" />
              )}
              <p className="text-xs text-gray-500 mt-1.5">
                {unitMode === 'volume' ? `Mass = ${(parseFloat(volume) * density).toFixed(2)} kg` : `Volume = ${(actualMass / density).toFixed(4)} m³`}
              </p>
            </div>
            {calculationType !== 'temperature' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Initial temp</label>
                <NumberInput value={initialTemp} onChange={setInitialTemp} min={-273} max={3000} suffix="°C" ariaLabel="Initial temperature" accent={ACCENT} className="max-w-none" />
                <p className="text-xs text-gray-500 mt-1.5">{calc.TiF.toFixed(1)}°F · {calc.TiK.toFixed(1)}K</p>
              </div>
            )}
            {(calculationType === 'energy' || calculationType === 'mass') && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Final temp</label>
                <NumberInput value={finalTemp} onChange={setFinalTemp} min={-273} max={3000} suffix="°C" ariaLabel="Final temperature" accent={ACCENT} className="max-w-none" />
                <p className="text-xs text-gray-500 mt-1.5">{calc.TfF.toFixed(1)}°F · {calc.TfK.toFixed(1)}K</p>
              </div>
            )}
            {calculationType === 'temperature' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Initial temp</label>
                <NumberInput value={initialTemp} onChange={setInitialTemp} min={-273} max={3000} suffix="°C" ariaLabel="Initial temperature" accent={ACCENT} className="max-w-none" />
              </div>
            )}
            {(calculationType === 'temperature' || calculationType === 'mass') && (
              <div className="sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  Energy input
                  <InfoTip label="energy">Joules. 1 kWh = 3.6 million J. 1 BTU = 1055 J. 1 calorie = 4.184 J.</InfoTip>
                </label>
                <NumberInput value={energyInput} onChange={setEnergyInput} min={1} max={1000000000} suffix="J" ariaLabel="Energy input" accent={ACCENT} className="max-w-none" />
                <p className="text-xs text-gray-500 mt-1.5">{(E / 3600000).toFixed(2)} kWh · {(E / 1055).toFixed(0)} BTU</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-live="polite" className="space-y-5">
        <ResultsHeader />

        <ResultHero
          accent={ACCENT}
          eyebrow={heroEyebrow}
          value={heroValue}
          unit=""
          secondaryText={
            calculationType === 'energy' ? (
              <>
                {calc.deltaT > 0 ? 'Heat' : 'Remove'} <strong>{fmt(Math.round(Math.abs(calc.energyRequired)))} J</strong>{' '}
                ({calc.energyKWh.toFixed(3)} kWh · {fmt(Math.round(calc.energyBTU))} BTU) to {calc.deltaT > 0 ? 'raise' : 'lower'} {actualMass.toFixed(2)} kg of {selected.name.toLowerCase()} by {Math.abs(calc.deltaT).toFixed(1)}°C.
              </>
            ) : calculationType === 'temperature' ? (
              <>
                Adding <strong>{fmt(Math.round(E))} J</strong> to {actualMass.toFixed(2)} kg of {selected.name.toLowerCase()} raises temperature from {Ti.toFixed(1)}°C to <strong>{calc.finalTemperature.toFixed(1)}°C</strong> (ΔT = +{(calc.finalTemperature - Ti).toFixed(1)}°C).
              </>
            ) : (
              <>
                You need <strong>{calc.requiredMass.toFixed(2)} kg</strong> of {selected.name.toLowerCase()} ({(calc.requiredMass / density).toFixed(4)} m³) to absorb {fmt(Math.round(E))} J over ΔT = {calc.deltaT.toFixed(1)}°C.
              </>
            )
          }
          fitTone={fit.tone}
          fitText={fit.text}
          sidePanel={[
            { label: 'Energy in kWh', value: `${calc.energyKWh.toFixed(3)} kWh` },
            { label: 'Energy in BTU', value: `${fmt(Math.round(calc.energyBTU))} BTU` },
            { label: 'Thermal mass', value: `${fmt(Math.round(calc.thermalMass))} J/°C` },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <Beaker className="w-4 h-4 text-red-600" />
              Material & equation
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Formula', detail: 'Q = m · c · ΔT', factor: '—' },
                { label: 'Material', detail: selected.name, factor: '' },
                { label: 'Specific heat (c)', detail: 'Energy per kg per °C', factor: `${fmt(specificHeat)} J/kg·°C` },
                { label: 'Density (ρ)', detail: 'kg per m³', factor: `${fmt(density)} kg/m³` },
                { label: 'Mass (m)', detail: unitMode === 'volume' ? `From ${volume} m³ × ρ` : 'Direct input', factor: `${actualMass.toFixed(3)} kg` },
                { label: 'ΔT', detail: `${Ti.toFixed(1)}°C → ${Tf.toFixed(1)}°C`, factor: `${calc.deltaT.toFixed(1)}°C` },
              ]}
              totals={[
                { label: 'Thermal mass (mc)', value: `${fmt(Math.round(calc.thermalMass))} J/°C`, valueClass: 'text-red-700' },
              ]}
            />
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-red-600" />
              Energy conversions
            </h4>
            <BreakdownTable
              rows={[
                { label: 'Joules', detail: 'SI base unit', factor: `${fmt(Math.round(calc.energy))} J` },
                { label: 'Kilojoules', detail: '÷ 1000', factor: `${calc.energyKJ.toFixed(2)} kJ` },
                { label: 'kWh (electric)', detail: '÷ 3,600,000', factor: `${calc.energyKWh.toFixed(4)} kWh` },
                { label: 'BTU (HVAC)', detail: '÷ 1055', factor: `${fmt(Math.round(calc.energyBTU))} BTU` },
                { label: 'Calories', detail: '÷ 4.184', factor: `${fmt(Math.round(calc.energyCal))} cal` },
                { label: 'Power (1hr)', detail: 'J ÷ 3600', factor: `${fmt(Math.round(calc.powerWatts))}W` },
              ]}
              totals={[]}
            />
          </div>

          {calculationType === 'energy' && Math.abs(calc.energyRequired) > 0 && (
            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 lg:col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                {calc.deltaT > 0 ? <Flame className="w-4 h-4 text-emerald-700" /> : <Snowflake className="w-4 h-4 text-emerald-700" />}
                Cost estimate (US average rates)
              </h4>
              <div className="grid sm:grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Electric heat</div>
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">${calc.electricityCost.toFixed(2)}</div>
                  <div className="text-[11px] text-gray-500">@ $0.16/kWh</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Gas heat</div>
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">${calc.gasCost.toFixed(2)}</div>
                  <div className="text-[11px] text-gray-500">@ $1.20/therm</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-emerald-100">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Cost per kg</div>
                  <div className="text-xl font-bold text-emerald-900 tabular-nums">${(calc.electricityCost / actualMass).toFixed(3)}</div>
                  <div className="text-[11px] text-gray-500">electric / kg</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 mt-2 leading-snug text-center">
                Assumes 100% efficient transfer (resistive electric, ideal combustion). Real systems lose 5–40% to inefficiency.
              </p>
            </div>
          )}
        </div>

        <DisclaimerBox title="Use cases + edge cases">
          <ul className="space-y-0.5 list-disc list-outside ml-4">
            <li>Water has the highest practical specific heat — that's why it dominates HVAC and process heating systems</li>
            <li>Phase changes (water freezing, ice melting) add huge latent-heat terms NOT captured by Q = mcΔT alone</li>
            <li>Real systems include heat losses through container walls — multiply input energy by 1.1–1.4 for real-world use</li>
            <li>Specific heat varies slightly with temperature — values used here are room-temp averages, accurate within ±5% for normal HVAC ranges</li>
            <li>Air has tiny mass per cubic meter (1.225 kg/m³), so heating a room of air takes much less energy than the same volume of water</li>
          </ul>
        </DisclaimerBox>
      </section>
    </CalcShell>
  );
}
