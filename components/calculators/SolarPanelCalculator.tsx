'use client';

import { useState } from 'react';
import { Calculator, Sun, Home, Battery, DollarSign, Leaf } from 'lucide-react';

const locationFactors = [
  { value: 'arizona', name: 'Arizona', sunHours: 7.0, factor: 1.4 },
  { value: 'california', name: 'California', sunHours: 6.0, factor: 1.2 },
  { value: 'florida', name: 'Florida', sunHours: 5.5, factor: 1.1 },
  { value: 'texas', name: 'Texas', sunHours: 5.8, factor: 1.15 },
  { value: 'nevada', name: 'Nevada', sunHours: 6.8, factor: 1.35 },
  { value: 'colorado', name: 'Colorado', sunHours: 6.2, factor: 1.25 },
  { value: 'north-carolina', name: 'North Carolina', sunHours: 5.2, factor: 1.05 },
  { value: 'new-york', name: 'New York', sunHours: 4.2, factor: 0.85 },
  { value: 'washington', name: 'Washington', sunHours: 3.8, factor: 0.75 },
  { value: 'average', name: 'US Average', sunHours: 5.0, factor: 1.0 }
];

const panelTypes = [
  { value: 'monocrystalline', name: 'Monocrystalline', efficiency: 0.20, costPerWatt: 3.00 },
  { value: 'polycrystalline', name: 'Polycrystalline', efficiency: 0.18, costPerWatt: 2.50 },
  { value: 'thin-film', name: 'Thin Film', efficiency: 0.12, costPerWatt: 2.00 }
];

export default function SolarPanelCalculator() {
  const [monthlyBill, setMonthlyBill] = useState('150');
  const [electricRate, setElectricRate] = useState('0.16');
  const [location, setLocation] = useState('average');
  const [panelType, setPanelType] = useState('monocrystalline');
  const [roofSpace, setRoofSpace] = useState('800');
  const [shadingFactor, setShadingFactor] = useState('100');
  const [systemEfficiency, setSystemEfficiency] = useState('85');
  const [calculated, setCalculated] = useState(false);
  
  // Get location and panel data
  const selectedLocation = locationFactors.find(l => l.value === location);
  const selectedPanel = panelTypes.find(p => p.value === panelType);
  
  // Calculate energy needs
  const monthlyKwh = parseFloat(monthlyBill) / parseFloat(electricRate);
  const dailyKwh = monthlyKwh / 30;
  const yearlyKwh = monthlyKwh * 12;
  
  // Calculate system size needed
  const shadingMultiplier = parseFloat(shadingFactor) / 100;
  const efficiencyMultiplier = parseFloat(systemEfficiency) / 100;
  const effectiveSunHours = selectedLocation ? selectedLocation.sunHours * shadingMultiplier * efficiencyMultiplier : 5;
  
  const systemSizeKW = dailyKwh / effectiveSunHours;
  const systemSizeWatts = systemSizeKW * 1000;
  
  // Panel calculations
  const typicalPanelWatts = 400; // Modern residential panels
  const panelsNeeded = Math.ceil(systemSizeWatts / typicalPanelWatts);
  const actualSystemWatts = panelsNeeded * typicalPanelWatts;
  const actualSystemKW = actualSystemWatts / 1000;
  
  // Space requirements
  const panelArea = 22; // sq ft per 400W panel
  const totalPanelArea = panelsNeeded * panelArea;
  const spaceUtilization = (totalPanelArea / parseFloat(roofSpace)) * 100;
  
  // Production estimates
  const dailyProduction = actualSystemKW * effectiveSunHours;
  const monthlyProduction = dailyProduction * 30;
  const yearlyProduction = dailyProduction * 365;
  
  // Cost calculations
  const systemCost = selectedPanel ? actualSystemWatts * selectedPanel.costPerWatt : actualSystemWatts * 3;
  const federalTaxCredit = systemCost * 0.30; // 30% federal tax credit
  const netSystemCost = systemCost - federalTaxCredit;
  
  // Savings calculations
  const monthlyElectricSavings = monthlyProduction * parseFloat(electricRate);
  const yearlyElectricSavings = monthlyElectricSavings * 12;
  const paybackYears = netSystemCost / yearlyElectricSavings;
  const twentyYearSavings = (yearlyElectricSavings * 20) - netSystemCost;
  
  // Environmental impact
  const yearlyCO2Offset = yearlyProduction * 0.92; // lbs CO2 per kWh (US average)
  const twentyYearCO2Offset = yearlyCO2Offset * 20;
  
  // Grid interaction
  const netMetering = monthlyProduction > monthlyKwh;
  const excessProduction = Math.max(0, monthlyProduction - monthlyKwh);
  const remainingUsage = Math.max(0, monthlyKwh - monthlyProduction);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Solar Panel Calculator</h2>
          <p className="text-sm text-gray-600">Size your solar system and estimate savings</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electric Bill ($)
            </label>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="150"
              min="20"
              max="1000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electric Rate ($/kWh)
            </label>
            <input
              type="number"
              value={electricRate}
              onChange={(e) => setElectricRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.16"
              min="0.05"
              max="0.50"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Check your utility bill</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {locationFactors.map(loc => (
                <option key={loc.value} value={loc.value}>
                  {loc.name} ({loc.sunHours} sun hours/day)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Panel Type
            </label>
            <select
              value={panelType}
              onChange={(e) => setPanelType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              {panelTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name} ({(type.efficiency * 100).toFixed(0)}% efficient)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Roof Space (sq ft)
            </label>
            <input
              type="number"
              value={roofSpace}
              onChange={(e) => setRoofSpace(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="800"
              min="200"
              max="5000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shading Factor (%)
            </label>
            <input
              type="number"
              value={shadingFactor}
              onChange={(e) => setShadingFactor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="100"
              min="50"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">100% = no shading, 80% = some shade</p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Efficiency (%)
            </label>
            <input
              type="number"
              value={systemEfficiency}
              onChange={(e) => setSystemEfficiency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="85"
              min="70"
              max="95"
            />
            <p className="text-xs text-gray-500 mt-1">Accounts for inverter losses, wiring, etc. (typical: 80-90%)</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Solar System
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Solar System Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* System Size */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
              <div className="text-center space-y-2">
                <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recommended System Size</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {actualSystemKW.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">kW</p>
                <p className="text-sm text-gray-600 mt-2">
                  {panelsNeeded} panels × {typicalPanelWatts}W
                </p>
              </div>
            </div>
            
            {/* Energy Production */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Energy Production</p>
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {monthlyProduction.toFixed(0)} kWh/month
                  </p>
                  <p className="text-sm text-gray-600">
                    {dailyProduction.toFixed(1)} kWh/day
                  </p>
                  <p className="text-sm text-gray-600">
                    {(yearlyProduction/1000).toFixed(1)} MWh/year
                  </p>
                </div>
              </div>
            </div>
            
            {/* Cost Analysis */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Investment Analysis</p>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-blue-600">
                    ${netSystemCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">after tax credit</p>
                  <p className="text-sm text-gray-600">
                    Payback: {paybackYears.toFixed(1)} years
                  </p>
                  <p className="text-sm text-gray-600">
                    20yr savings: ${twentyYearSavings.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Space Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Space Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Panels needed:</span>
                  <span className="font-medium">{panelsNeeded}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Panel area:</span>
                  <span className="font-medium">{totalPanelArea.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Roof utilization:</span>
                  <span className="font-medium">{spaceUtilization.toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available roof:</span>
                  <span className="font-medium">{parseFloat(roofSpace).toLocaleString()} sq ft</span>
                </div>
              </div>
            </div>
            
            {/* Grid Interaction */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Battery className="w-4 h-4" />
                Grid Interaction
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Monthly usage:</span>
                  <span className="font-medium">{monthlyKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly production:</span>
                  <span className="font-medium">{monthlyProduction.toFixed(0)} kWh</span>
                </div>
                {netMetering ? (
                  <div>
                    <div className="flex justify-between">
                      <span>Excess to grid:</span>
                      <span className="font-medium text-green-600">{excessProduction.toFixed(0)} kWh</span>
                    </div>
                    <p className="text-xs text-purple-700 mt-2">System produces surplus energy</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between">
                      <span>Still need from grid:</span>
                      <span className="font-medium text-orange-600">{remainingUsage.toFixed(0)} kWh</span>
                    </div>
                    <p className="text-xs text-purple-700 mt-2">Partial offset system</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Environmental Impact */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Environmental Impact
              </h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>CO₂ offset/year:</span>
                  <span className="font-medium">{Math.round(yearlyCO2Offset).toLocaleString()} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>20-year CO₂ offset:</span>
                  <span className="font-medium">{Math.round(twentyYearCO2Offset/1000).toLocaleString()}k lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Equivalent:</span>
                  <span className="font-medium">{Math.round(twentyYearCO2Offset/2000)} tons</span>
                </div>
                <p className="text-xs text-green-700 mt-2">
                  Like planting {Math.round(twentyYearCO2Offset/48)} trees
                </p>
              </div>
            </div>
          </div>
          
          {/* System Feasibility */}
          {spaceUtilization > 100 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚠️ Insufficient Roof Space</h4>
              <p className="text-sm text-red-800">
                The recommended system requires {totalPanelArea.toLocaleString()} sq ft but you only have {parseFloat(roofSpace).toLocaleString()} sq ft available. 
                Consider a smaller system that fits your available space or explore ground-mount options.
              </p>
            </div>
          )}
          
          {paybackYears > 15 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Long Payback Period</h4>
              <p className="text-sm text-yellow-800">
                The payback period is {paybackYears.toFixed(1)} years, which is longer than typical (8-12 years). 
                Consider factors like future electric rate increases, improved financing options, or waiting for equipment cost reductions.
              </p>
            </div>
          )}
          
          {paybackYears <= 10 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Excellent Investment</h4>
              <p className="text-sm text-green-800">
                With a {paybackYears.toFixed(1)}-year payback period and ${twentyYearSavings.toLocaleString()} in 20-year savings, 
                solar is an excellent investment for your location and usage profile.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}