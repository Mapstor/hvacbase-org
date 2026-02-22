'use client';

import { useState } from 'react';
import { Calculator, Droplets, DollarSign, TrendingUp, Clock, Zap } from 'lucide-react';

const dehumidifierSizes = [
  { value: '30', name: '30-Pint', watts: 300, coverage: 1500, price: 200 },
  { value: '50', name: '50-Pint', watts: 590, coverage: 3000, price: 280 },
  { value: '70', name: '70-Pint', watts: 700, coverage: 4500, price: 350 },
  { value: '95', name: '95-Pint', watts: 800, coverage: 6000, price: 450 },
  { value: '110', name: '110-Pint', watts: 900, coverage: 7000, price: 550 },
  { value: 'custom', name: 'Custom Size', watts: 600, coverage: 3000, price: 300 }
];

const climateZones = [
  { value: 'dry', name: 'Dry Climate', humidityFactor: 0.7, description: 'Desert regions, low humidity' },
  { value: 'moderate', name: 'Moderate Climate', humidityFactor: 1.0, description: 'Most temperate regions' },
  { value: 'humid', name: 'Humid Climate', humidityFactor: 1.3, description: 'Coastal, southeastern US' },
  { value: 'very-humid', name: 'Very Humid Climate', humidityFactor: 1.5, description: 'Tropical, bayous, swamps' }
];

const usagePatterns = [
  { value: 'seasonal', name: 'Seasonal (4 months)', monthsPerYear: 4, description: 'Summer months only' },
  { value: 'extended', name: 'Extended Season (7 months)', monthsPerYear: 7, description: 'Spring through fall' },
  { value: 'year-round', name: 'Year-Round (12 months)', monthsPerYear: 12, description: 'Continuous operation' }
];

export default function DehumidifierCostCalculator() {
  const [dehumidifierSize, setDehumidifierSize] = useState('50');
  const [customWatts, setCustomWatts] = useState('600');
  const [customPrice, setCustomPrice] = useState('300');
  const [spaceSize, setSpaceSize] = useState('1200');
  const [climateZone, setClimateZone] = useState('moderate');
  const [currentHumidity, setCurrentHumidity] = useState('65');
  const [targetHumidity, setTargetHumidity] = useState('45');
  const [electricRate, setElectricRate] = useState('0.16');
  const [usagePattern, setUsagePattern] = useState('seasonal');
  const [hoursPerDay, setHoursPerDay] = useState('12');
  const [calculated, setCalculated] = useState(false);
  
  // Get selected data
  const selectedSize = dehumidifierSizes.find(s => s.value === dehumidifierSize);
  const selectedClimate = climateZones.find(c => c.value === climateZone);
  const selectedUsage = usagePatterns.find(u => u.value === usagePattern);
  
  // Use custom values if specified
  const actualWatts = dehumidifierSize === 'custom' ? parseFloat(customWatts) : selectedSize.watts;
  const unitPrice = dehumidifierSize === 'custom' ? parseFloat(customPrice) : selectedSize.price;
  
  // Calculate runtime based on humidity differential and climate
  const humidityDiff = parseFloat(currentHumidity) - parseFloat(targetHumidity);
  const baseRuntime = Math.min(24, Math.max(4, humidityDiff * 0.6)); // Base hours per day
  const climateAdjustedRuntime = baseRuntime * selectedClimate.humidityFactor;
  const actualRuntime = Math.min(parseFloat(hoursPerDay), climateAdjustedRuntime);
  
  // Energy consumption calculations
  const dailyKwh = (actualWatts * actualRuntime) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const seasonalKwh = monthlyKwh * selectedUsage.monthsPerYear;
  const yearlyKwh = dailyKwh * 365;
  
  // Cost calculations
  const rate = parseFloat(electricRate);
  const dailyCost = dailyKwh * rate;
  const monthlyCost = monthlyKwh * rate;
  const seasonalCost = seasonalKwh * rate;
  const yearlyCost = yearlyKwh * rate;
  
  // Calculate moisture removal
  const pintsPerHour = dehumidifierSize === 'custom' ? 50 : parseFloat(dehumidifierSize);
  const dailyMoistureRemoval = pintsPerHour * actualRuntime;
  const monthlyMoistureRemoval = dailyMoistureRemoval * 30;
  
  // Efficiency calculations
  const energyPerPint = actualWatts / pintsPerHour; // Watts per pint capacity
  const costPerPint = dailyCost / dailyMoistureRemoval; // Cost per pint removed
  
  // Total cost of ownership (5 years)
  const fiveYearEnergyCost = seasonalCost * 5;
  const maintenanceCost = 50 * 5; // Estimated $50/year maintenance
  const totalCostOfOwnership = unitPrice + fiveYearEnergyCost + maintenanceCost;
  
  // Payback for energy efficient model (comparison)
  const standardWatts = selectedSize ? selectedSize.watts : actualWatts;
  const efficientWatts = standardWatts * 0.75; // 25% more efficient
  const efficientPrice = unitPrice * 1.3; // 30% more expensive
  const energySavingsPerYear = ((standardWatts - efficientWatts) * actualRuntime * 365 / 1000) * rate;
  const paybackYears = (efficientPrice - unitPrice) / energySavingsPerYear;
  
  // Environmental impact
  const annualCO2 = yearlyKwh * 0.92; // lbs CO2 per kWh (US average)
  const fiveYearCO2 = annualCO2 * 5;
  
  // Sizing adequacy
  const recommendedCapacity = (parseFloat(spaceSize) / 150) * selectedClimate.humidityFactor;
  const adequateSize = pintsPerHour >= recommendedCapacity;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-cyan-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dehumidifier Cost Calculator</h2>
          <p className="text-sm text-gray-600">Calculate operating costs and total cost of ownership</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dehumidifier Size
            </label>
            <select
              value={dehumidifierSize}
              onChange={(e) => setDehumidifierSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {dehumidifierSizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.name} - {size.watts}W
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Space Size (sq ft)
            </label>
            <input
              type="number"
              value={spaceSize}
              onChange={(e) => setSpaceSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="1200"
              min="100"
              max="10000"
            />
          </div>
          
          {dehumidifierSize === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power Consumption (Watts)
                </label>
                <input
                  type="number"
                  value={customWatts}
                  onChange={(e) => setCustomWatts(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="600"
                  min="200"
                  max="1500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Price ($)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="300"
                  min="100"
                  max="1000"
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate Zone
            </label>
            <select
              value={climateZone}
              onChange={(e) => setClimateZone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {climateZones.map(zone => (
                <option key={zone.value} value={zone.value}>
                  {zone.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedClimate?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Pattern
            </label>
            <select
              value={usagePattern}
              onChange={(e) => setUsagePattern(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {usagePatterns.map(pattern => (
                <option key={pattern.value} value={pattern.value}>
                  {pattern.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedUsage?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Humidity (%)
            </label>
            <input
              type="number"
              value={currentHumidity}
              onChange={(e) => setCurrentHumidity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="65"
              min="30"
              max="95"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Humidity (%)
            </label>
            <input
              type="number"
              value={targetHumidity}
              onChange={(e) => setTargetHumidity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="45"
              min="30"
              max="60"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="0.16"
              min="0.05"
              max="0.50"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Hours/Day
            </label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="12"
              min="1"
              max="24"
            />
            <p className="text-xs text-gray-500 mt-1">Actual runtime may be less</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Dehumidifier Costs
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Cost Analysis Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Operating Costs */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
              <div className="text-center space-y-2">
                <DollarSign className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Operating Costs</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-cyan-600">
                    ${monthlyCost.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">per month</p>
                  <p className="text-sm text-gray-600">
                    ${dailyCost.toFixed(2)}/day
                  </p>
                  <p className="text-sm text-gray-600">
                    ${seasonalCost.toFixed(0)}/season
                  </p>
                </div>
              </div>
            </div>
            
            {/* Energy Consumption */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Energy Use</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-yellow-600">
                    {monthlyKwh.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600">kWh/month</p>
                  <p className="text-sm text-gray-600">
                    {dailyKwh.toFixed(1)} kWh/day
                  </p>
                  <p className="text-sm text-gray-600">
                    {actualRuntime.toFixed(1)} hrs/day runtime
                  </p>
                </div>
              </div>
            </div>
            
            {/* Moisture Removal */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Moisture Removal</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">
                    {monthlyMoistureRemoval.toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600">pints/month</p>
                  <p className="text-sm text-gray-600">
                    {dailyMoistureRemoval.toFixed(0)} pints/day
                  </p>
                  <p className="text-sm text-gray-600">
                    {pintsPerHour} pint capacity
                  </p>
                </div>
              </div>
            </div>
            
            {/* Total Cost of Ownership */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">5-Year Cost of Ownership</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit price:</span>
                  <span className="font-medium">${unitPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy (5 years):</span>
                  <span className="font-medium">${fiveYearEnergyCost.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance:</span>
                  <span className="font-medium">${maintenanceCost}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-700">Total:</span>
                  <span className="font-bold text-cyan-600">${totalCostOfOwnership.toFixed(0)}</span>
                </div>
              </div>
            </div>
            
            {/* Efficiency Metrics */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Efficiency Metrics
              </h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>Energy per pint:</span>
                  <span className="font-medium">{energyPerPint.toFixed(1)}W/pint</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per pint:</span>
                  <span className="font-medium">${costPerPint.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>kWh per pint:</span>
                  <span className="font-medium">{(energyPerPint/1000).toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity utilization:</span>
                  <span className="font-medium">{((actualRuntime/24)*100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
            
            {/* Energy Efficiency Upgrade */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Efficient Model ROI
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Efficient model cost:</span>
                  <span className="font-medium">${efficientPrice.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual savings:</span>
                  <span className="font-medium">${energySavingsPerYear.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payback period:</span>
                  <span className="font-medium">{paybackYears.toFixed(1)} years</span>
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  {paybackYears < 3 ? 'Excellent ROI' : paybackYears < 5 ? 'Good ROI' : 'Consider standard model'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Size Adequacy Check */}
          {!adequateSize && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Undersized Unit</h4>
              <p className="text-sm text-yellow-800">
                The selected {selectedSize?.name || 'custom'} dehumidifier may be undersized for {spaceSize} sq ft in a {selectedClimate?.name.toLowerCase()} climate. 
                Consider a {Math.ceil(recommendedCapacity)}-pint or larger capacity for optimal performance.
              </p>
            </div>
          )}
          
          {actualRuntime >= 20 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚡ High Runtime</h4>
              <p className="text-sm text-red-800">
                The unit will run {actualRuntime.toFixed(1)} hours/day, which is quite high. This may indicate high humidity levels, 
                inadequate ventilation, or an undersized unit. Consider addressing the moisture source or upgrading to a larger capacity.
              </p>
            </div>
          )}
          
          {seasonalCost < 100 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Low Operating Cost</h4>
              <p className="text-sm text-green-800">
                Annual operating costs are very reasonable at ${seasonalCost.toFixed(0)} per season. 
                The dehumidifier will provide excellent value for humidity control in your space.
              </p>
            </div>
          )}
          
          {/* Environmental Impact */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🌍 Environmental Impact</h4>
            <p className="text-sm text-blue-800">
              Annual CO₂ emissions: <strong>{Math.round(annualCO2)} lbs</strong> 
              ({(annualCO2/2000).toFixed(1)} tons). Over 5 years: {Math.round(fiveYearCO2/1000)}k lbs CO₂.
              Consider energy-efficient models or renewable energy to reduce environmental impact.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}