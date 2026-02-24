'use client';

import { useState } from 'react';
import { Calculator, Thermometer, Beaker, TrendingUp, Info, Flame } from 'lucide-react';

const materials = [
  { value: 'water', name: 'Water', specificHeat: 4186, density: 1000, units: 'J/kg·°C' },
  { value: 'air', name: 'Air (dry)', specificHeat: 1005, density: 1.225, units: 'J/kg·°C' },
  { value: 'steel', name: 'Steel', specificHeat: 490, density: 7850, units: 'J/kg·°C' },
  { value: 'aluminum', name: 'Aluminum', specificHeat: 903, density: 2700, units: 'J/kg·°C' },
  { value: 'copper', name: 'Copper', specificHeat: 385, density: 8960, units: 'J/kg·°C' },
  { value: 'concrete', name: 'Concrete', specificHeat: 880, density: 2400, units: 'J/kg·°C' },
  { value: 'wood', name: 'Wood (oak)', specificHeat: 2010, density: 750, units: 'J/kg·°C' },
  { value: 'glass', name: 'Glass', specificHeat: 840, density: 2500, units: 'J/kg·°C' },
  { value: 'ice', name: 'Ice', specificHeat: 2090, density: 917, units: 'J/kg·°C' },
  { value: 'oil', name: 'Engine Oil', specificHeat: 1880, density: 900, units: 'J/kg·°C' },
  { value: 'ethanol', name: 'Ethanol', specificHeat: 2440, density: 789, units: 'J/kg·°C' },
  { value: 'custom', name: 'Custom Material', specificHeat: 1000, density: 1000, units: 'J/kg·°C' }
];

const calculationTypes = [
  { value: 'energy', name: 'Energy Required', description: 'Calculate energy needed to heat/cool' },
  { value: 'temperature', name: 'Final Temperature', description: 'Calculate final temperature from energy input' },
  { value: 'mass', name: 'Mass Required', description: 'Calculate mass needed for specific energy storage' }
];

export default function SpecificHeatCalculator() {
  const [material, setMaterial] = useState('water');
  const [calculationType, setCalculationType] = useState('energy');
  const [mass, setMass] = useState('10');
  const [initialTemp, setInitialTemp] = useState('20');
  const [finalTemp, setFinalTemp] = useState('80');
  const [energyInput, setEnergyInput] = useState('2500000');
  const [customSpecificHeat, setCustomSpecificHeat] = useState('1000');
  const [customDensity, setCustomDensity] = useState('1000');
  const [volume, setVolume] = useState('0.01');
  const [useVolume, setUseVolume] = useState(false);
  const [calculated, setCalculated] = useState(false);
  
  // Get material data
  const selectedMaterial = materials.find(m => m.value === material);
  const specificHeat = material === 'custom' ? parseFloat(customSpecificHeat) : selectedMaterial?.specificHeat || 1;
  const density = material === 'custom' ? parseFloat(customDensity) : selectedMaterial?.density || 1;
  
  // Calculate mass from volume if needed
  const actualMass = useVolume ? parseFloat(volume) * density : parseFloat(mass);
  
  // Perform calculations based on type
  let energyRequired, finalTemperature, requiredMass;
  const deltaT = parseFloat(finalTemp) - parseFloat(initialTemp);
  
  switch (calculationType) {
    case 'energy':
      energyRequired = actualMass * specificHeat * deltaT;
      break;
    case 'temperature':
      const energyJ = parseFloat(energyInput);
      const tempChange = energyJ / (actualMass * specificHeat);
      finalTemperature = parseFloat(initialTemp) + tempChange;
      break;
    case 'mass':
      const energyForMass = parseFloat(energyInput);
      requiredMass = energyForMass / (specificHeat * deltaT);
      break;
  }
  
  // Convert energy to different units
  const energyKJ = energyRequired / 1000;
  const energyKWh = energyRequired / 3600000;
  const energyBTU = energyRequired / 1055;
  const energyCal = energyRequired / 4184;
  
  // Calculate power requirements (time-based)
  const timeHours = 1; // Default 1 hour
  const powerWatts = energyRequired / (timeHours * 3600);
  const powerKW = powerWatts / 1000;
  
  // Calculate thermal mass
  const thermalMass = actualMass * specificHeat;
  
  // Energy per unit calculations
  const energyPerKg = energyRequired / actualMass;
  const energyPerLiter = useVolume ? energyRequired / (parseFloat(volume) * 1000) : energyRequired / (actualMass / density * 1000);
  
  // Cost estimates (rough)
  const electricityCostPerkWh = 0.16; // Average US rate
  const electricityCost = energyKWh * electricityCostPerkWh;
  const gasCostPerTherm = 1.20; // Average US rate
  const gasCost = (energyBTU / 100000) * gasCostPerTherm;
  
  // Temperature scales conversion
  const initialTempF = (parseFloat(initialTemp) * 9/5) + 32;
  const finalTempF = (parseFloat(finalTemp) * 9/5) + 32;
  const initialTempK = parseFloat(initialTemp) + 273.15;
  const finalTempK = parseFloat(finalTemp) + 273.15;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-red-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Specific Heat Calculator</h2>
          <p className="text-sm text-gray-600">Calculate energy requirements for heating and cooling materials</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {materials.map(mat => (
                <option key={mat.value} value={mat.value}>
                  {mat.name} ({mat.specificHeat} J/kg·°C)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {calculationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{calculationTypes.find(t => t.value === calculationType)?.description}</p>
          </div>
          
          {material === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specific Heat (J/kg·°C)
                </label>
                <input
                  type="number"
                  value={customSpecificHeat}
                  onChange={(e) => setCustomSpecificHeat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="1000"
                  min="1"
                  max="10000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Density (kg/m³)
                </label>
                <input
                  type="number"
                  value={customDensity}
                  onChange={(e) => setCustomDensity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="1000"
                  min="0.1"
                  max="20000"
                />
              </div>
            </>
          )}
          
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="useVolume"
                checked={useVolume}
                onChange={(e) => setUseVolume(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="useVolume" className="ml-2 text-sm text-gray-700">
                Specify volume instead of mass
              </label>
            </div>
          </div>
          
          {useVolume ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Volume (m³)
              </label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.01"
                min="0.001"
                max="1000"
                step="0.001"
              />
              <p className="text-xs text-gray-500 mt-1">Mass: {(parseFloat(volume) * density).toFixed(1)} kg</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mass (kg)
              </label>
              <input
                type="number"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="10"
                min="0.001"
                max="10000"
                step="0.001"
              />
            </div>
          )}
          
          {calculationType !== 'temperature' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Temperature (°C)
                </label>
                <input
                  type="number"
                  value={initialTemp}
                  onChange={(e) => setInitialTemp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="20"
                  min="-273"
                  max="3000"
                />
                <p className="text-xs text-gray-500 mt-1">{initialTempF.toFixed(1)}°F, {initialTempK.toFixed(1)}K</p>
              </div>
              
              {calculationType !== 'mass' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Final Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={finalTemp}
                    onChange={(e) => setFinalTemp(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="80"
                    min="-273"
                    max="3000"
                  />
                  <p className="text-xs text-gray-500 mt-1">{finalTempF.toFixed(1)}°F, {finalTempK.toFixed(1)}K</p>
                </div>
              )}
            </>
          )}
          
          {(calculationType === 'temperature' || calculationType === 'mass') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Input (Joules)
              </label>
              <input
                type="number"
                value={energyInput}
                onChange={(e) => setEnergyInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="2500000"
                min="1"
                max="1000000000"
              />
              <p className="text-xs text-gray-500 mt-1">{(parseFloat(energyInput)/3600000).toFixed(2)} kWh</p>
            </div>
          )}
          
          {calculationType === 'temperature' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Temperature (°C)
              </label>
              <input
                type="number"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="20"
                min="-273"
                max="3000"
              />
            </div>
          )}
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Specific Heat
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Thermal Calculations</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {calculationType === 'energy' && (
              <>
                {/* Energy Required */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
                  <div className="text-center space-y-2">
                    <Flame className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Energy Required</p>
                    <p className="text-3xl font-bold text-red-600">
                      {Math.abs(energyRequired).toLocaleString()}
                    </p>
                    <p className="text-lg font-medium text-gray-700">Joules</p>
                    <div className="pt-2 border-t border-red-200 mt-4">
                      <p className="text-sm text-gray-600">{energyKJ.toFixed(1)} kJ</p>
                      <p className="text-sm text-gray-600">{energyKWh.toFixed(3)} kWh</p>
                    </div>
                  </div>
                </div>
                
                {/* Power Requirement */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <div className="text-center space-y-2">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Power Required</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {powerKW.toFixed(2)}
                    </p>
                    <p className="text-lg font-medium text-gray-700">kW</p>
                    <div className="pt-2 border-t border-blue-200 mt-4">
                      <p className="text-sm text-gray-600">For 1 hour heating</p>
                      <p className="text-sm text-gray-600">{powerWatts.toFixed(0)}W</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {calculationType === 'temperature' && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
                <div className="text-center space-y-2">
                  <Thermometer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Final Temperature</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {finalTemperature?.toFixed(1)}
                  </p>
                  <p className="text-lg font-medium text-gray-700">°C</p>
                  <div className="pt-2 border-t border-blue-200 mt-4">
                    <p className="text-sm text-gray-600">{((finalTemperature || 0) * 9/5 + 32).toFixed(1)}°F</p>
                    <p className="text-sm text-gray-600">ΔT = {((finalTemperature || 0) - parseFloat(initialTemp)).toFixed(1)}°C</p>
                  </div>
                </div>
              </div>
            )}
            
            {calculationType === 'mass' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div className="text-center space-y-2">
                  <Beaker className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Required Mass</p>
                  <p className="text-3xl font-bold text-green-600">
                    {requiredMass?.toFixed(2)}
                  </p>
                  <p className="text-lg font-medium text-gray-700">kg</p>
                  <div className="pt-2 border-t border-green-200 mt-4">
                    <p className="text-sm text-gray-600">{(requiredMass || 0 * 2.20462).toFixed(1)} lbs</p>
                    <p className="text-sm text-gray-600">Volume: {((requiredMass || 0)/density).toFixed(3)} m³</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Material Properties */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Material Properties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium">{selectedMaterial?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specific heat:</span>
                  <span className="font-medium">{specificHeat.toLocaleString()} J/kg·°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Density:</span>
                  <span className="font-medium">{density.toLocaleString()} kg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thermal mass:</span>
                  <span className="font-medium">{thermalMass.toLocaleString()} J/°C</span>
                </div>
              </div>
            </div>
            
            {/* Energy Conversions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Energy Conversions</h4>
              <div className="space-y-2 text-sm text-yellow-800">
                {calculationType === 'energy' && (
                  <>
                    <div className="flex justify-between">
                      <span>Joules:</span>
                      <span className="font-medium">{Math.abs(energyRequired).toLocaleString()} J</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BTU:</span>
                      <span className="font-medium">{energyBTU.toFixed(0)} BTU</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{energyCal.toFixed(0)} cal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>kWh:</span>
                      <span className="font-medium">{energyKWh.toFixed(3)} kWh</span>
                    </div>
                  </>
                )}
                {(calculationType === 'temperature' || calculationType === 'mass') && (
                  <>
                    <div className="flex justify-between">
                      <span>Input energy:</span>
                      <span className="font-medium">{parseFloat(energyInput).toLocaleString()} J</span>
                    </div>
                    <div className="flex justify-between">
                      <span>kWh:</span>
                      <span className="font-medium">{(parseFloat(energyInput)/3600000).toFixed(3)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BTU:</span>
                      <span className="font-medium">{(parseFloat(energyInput)/1055).toFixed(0)} BTU</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Cost Analysis */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Estimated Costs
              </h4>
              <div className="space-y-2 text-sm text-green-800">
                {calculationType === 'energy' && (
                  <>
                    <div className="flex justify-between">
                      <span>Electric heat:</span>
                      <span className="font-medium">${electricityCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gas heat:</span>
                      <span className="font-medium">${gasCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per kg:</span>
                      <span className="font-medium">${(electricityCost/actualMass).toFixed(3)}/kg</span>
                    </div>
                  </>
                )}
                <p className="text-xs text-green-700 mt-2">
                  US average rates: $0.16/kWh, $1.20/therm
                </p>
              </div>
            </div>
          </div>
          
          {/* Temperature Change Direction */}
          {calculationType === 'energy' && deltaT !== 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                {deltaT > 0 ? '🔥 Heating Process' : '❄️ Cooling Process'}
              </h4>
              <p className="text-sm text-blue-800">
                {deltaT > 0 
                  ? `Energy will be added to heat ${selectedMaterial?.name.toLowerCase()} from ${initialTemp}°C to ${finalTemp}°C (ΔT = +${deltaT.toFixed(1)}°C).`
                  : `Energy will be removed to cool ${selectedMaterial?.name.toLowerCase()} from ${initialTemp}°C to ${finalTemp}°C (ΔT = ${deltaT.toFixed(1)}°C).`
                }
                The process requires {Math.abs(energyRequired).toLocaleString()} Joules of energy.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}