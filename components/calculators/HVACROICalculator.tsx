'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Calendar, CheckCircle, Info, Zap, Home } from 'lucide-react';
import EmbedCode from '../EmbedCode';

const systemTypes = [
  { value: 'central-ac', name: 'Central Air Conditioning', efficiency: { min: 13.4, max: 26 } },
  { value: 'heat-pump', name: 'Heat Pump', efficiency: { min: 13.4, max: 26 } },
  { value: 'mini-split', name: 'Mini Split System', efficiency: { min: 16, max: 30 } },
  { value: 'furnace', name: 'Gas Furnace', efficiency: { min: 80, max: 98.5 } },
  { value: 'boiler', name: 'Gas Boiler', efficiency: { min: 80, max: 95 } }
];

const climateZones = [
  { value: 'hot-humid', name: 'Hot & Humid (Zone 1-2)', factor: 1.2, coolingHours: 2800, heatingHours: 800 },
  { value: 'hot-dry', name: 'Hot & Dry (Zone 3)', factor: 1.15, coolingHours: 2400, heatingHours: 1000 },
  { value: 'mixed', name: 'Mixed Climate (Zone 4-5)', factor: 1.0, coolingHours: 1800, heatingHours: 1800 },
  { value: 'cold', name: 'Cold (Zone 6-7)', factor: 0.85, coolingHours: 1200, heatingHours: 2800 },
  { value: 'very-cold', name: 'Very Cold (Zone 8)', factor: 0.8, coolingHours: 800, heatingHours: 3500 }
];

export default function HVACROICalculator() {
  // Current System
  const [currentType, setCurrentType] = useState('central-ac');
  const [currentEfficiency, setCurrentEfficiency] = useState('14');
  const [currentAge, setCurrentAge] = useState('12');
  
  // New System
  const [newType, setNewType] = useState('central-ac');
  const [newEfficiency, setNewEfficiency] = useState('18');
  const [systemCost, setSystemCost] = useState('8500');
  
  // Home Details
  const [homeSize, setHomeSize] = useState('2000');
  const [climate, setClimate] = useState('mixed');
  const [electricityRate, setElectricityRate] = useState('0.16');
  const [gasRate, setGasRate] = useState('1.25');
  
  // Incentives
  const [federalCredit, setFederalCredit] = useState('600');
  const [utilityRebate, setUtilityRebate] = useState('300');
  
  const [calculated, setCalculated] = useState(false);

  // Helper functions
  const selectedClimate = climateZones.find(z => z.value === climate);
  const currentSystem = systemTypes.find(s => s.value === currentType);
  const newSystem = systemTypes.find(s => s.value === newType);

  // Calculate energy usage and costs
  const calculateEnergyCost = (systemType: string, efficiency: number, size: number) => {
    const climate = selectedClimate!;
    
    if (systemType === 'furnace' || systemType === 'boiler') {
      // Gas heating calculation (therms)
      const btuNeeded = size * 50000; // BTU per year for heating
      const thermsUsed = (btuNeeded / efficiency * 100) / 100000; // Convert AFUE% to decimal
      return thermsUsed * parseFloat(gasRate);
    } else {
      // Electric cooling/heat pump calculation (kWh)
      const coolingLoad = (size * 12000) * climate.coolingHours; // BTU-hours per year
      const heatingLoad = systemType === 'heat-pump' ? (size * 10000) * climate.heatingHours : 0;
      const totalLoad = coolingLoad + heatingLoad;
      
      // Convert SEER to EER approximation and calculate kWh
      const seasonalEfficiency = efficiency;
      const kwhUsed = totalLoad / (seasonalEfficiency * 1000); // Convert BTU to kWh
      return kwhUsed * parseFloat(electricityRate);
    }
  };

  const homeSquareFeet = parseFloat(homeSize);
  const systemSize = homeSquareFeet / 600; // Rough tonnage estimate

  // Current system costs
  const currentAnnualCost = calculateEnergyCost(currentType, parseFloat(currentEfficiency), systemSize);
  const currentMaintenanceCost = parseFloat(currentAge) > 10 ? 450 : 250; // Higher maintenance for older systems
  const currentTotalAnnual = currentAnnualCost + currentMaintenanceCost;

  // New system costs
  const newAnnualCost = calculateEnergyCost(newType, parseFloat(newEfficiency), systemSize);
  const newMaintenanceCost = 200; // New system maintenance
  const newTotalAnnual = newAnnualCost + newMaintenanceCost;

  // ROI calculations
  const annualSavings = currentTotalAnnual - newTotalAnnual;
  const netSystemCost = parseFloat(systemCost) - parseFloat(federalCredit) - parseFloat(utilityRebate);
  const simplePayback = annualSavings > 0 ? netSystemCost / annualSavings : 999;
  
  // 15-year analysis
  const totalSavings15yr = annualSavings * 15;
  const netROI15yr = totalSavings15yr - netSystemCost;
  const roiPercentage = netSystemCost > 0 ? (netROI15yr / netSystemCost) * 100 : 0;

  // Annual rate of return
  const annualReturnRate = annualSavings > 0 ? (annualSavings / netSystemCost) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-lg">
          <TrendingUp className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">HVAC ROI Calculator</h2>
          <p className="text-sm text-gray-600">Calculate energy savings, payback period, and return on investment</p>
        </div>
      </div>

      {/* Input Sections */}
      <div className="space-y-8">
        {/* Current System */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-red-600" />
            Current HVAC System
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Type</label>
              <select
                value={currentType}
                onChange={(e) => setCurrentType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {systemTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentType === 'furnace' || currentType === 'boiler' ? 'AFUE Efficiency (%)' : 'SEER Rating'}
              </label>
              <input
                type="number"
                value={currentEfficiency}
                onChange={(e) => setCurrentEfficiency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min={currentSystem?.efficiency.min || 10}
                max={currentSystem?.efficiency.max || 30}
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="0"
                max="30"
              />
            </div>
          </div>
        </div>

        {/* New System */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Proposed New System
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {systemTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {newType === 'furnace' || newType === 'boiler' ? 'AFUE Efficiency (%)' : 'SEER Rating'}
              </label>
              <input
                type="number"
                value={newEfficiency}
                onChange={(e) => setNewEfficiency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min={newSystem?.efficiency.min || 10}
                max={newSystem?.efficiency.max || 30}
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Cost ($)</label>
              <input
                type="number"
                value={systemCost}
                onChange={(e) => setSystemCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="1000"
                max="50000"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Home & Location Details */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-4">Home & Location Details</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Size (sq ft)</label>
              <input
                type="number"
                value={homeSize}
                onChange={(e) => setHomeSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="500"
                max="10000"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Climate Zone</label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {climateZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>{zone.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Rate ($/kWh)</label>
              <input
                type="number"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="0.05"
                max="0.50"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gas Rate ($/therm)</label>
              <input
                type="number"
                value={gasRate}
                onChange={(e) => setGasRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="0.50"
                max="3.00"
                step="0.05"
              />
            </div>
          </div>
        </div>

        {/* Incentives */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            Available Incentives
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Federal Tax Credit ($)</label>
              <input
                type="number"
                value={federalCredit}
                onChange={(e) => setFederalCredit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="0"
                max="2000"
                step="50"
              />
              <p className="text-xs text-gray-500 mt-1">Up to $600 for AC, $2,000 for heat pumps</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utility Rebate ($)</label>
              <input
                type="number"
                value={utilityRebate}
                onChange={(e) => setUtilityRebate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                min="0"
                max="3000"
                step="50"
              />
              <p className="text-xs text-gray-500 mt-1">Check your local utility programs</p>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg"
        >
          <Calculator className="w-6 h-6" />
          Calculate ROI & Payback Period
        </button>

        {/* Results */}
        {calculated && (
          <div className="space-y-6 mt-8 border-t border-gray-200 pt-8">
            {/* Key Metrics */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6" />
                  <h4 className="text-lg font-semibold">Annual Savings</h4>
                </div>
                <p className="text-3xl font-bold mb-1">${Math.round(annualSavings).toLocaleString()}</p>
                <p className="text-green-100 text-sm">
                  Energy: ${Math.round(currentAnnualCost - newAnnualCost)} + Maintenance: ${currentMaintenanceCost - newMaintenanceCost}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-6 h-6" />
                  <h4 className="text-lg font-semibold">Payback Period</h4>
                </div>
                <p className="text-3xl font-bold mb-1">
                  {simplePayback < 50 ? `${simplePayback.toFixed(1)} years` : '50+ years'}
                </p>
                <p className="text-blue-100 text-sm">
                  Net cost: ${netSystemCost.toLocaleString()}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6" />
                  <h4 className="text-lg font-semibold">Annual Return</h4>
                </div>
                <p className="text-3xl font-bold mb-1">{annualReturnRate.toFixed(1)}%</p>
                <p className="text-purple-100 text-sm">
                  15-year ROI: {roiPercentage.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Detailed Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Annual Cost Comparison</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium text-red-800">Current System</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-red-800">${Math.round(currentTotalAnnual)}</p>
                      <p className="text-sm text-red-600">Energy: ${Math.round(currentAnnualCost)} + Service: ${currentMaintenanceCost}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">New System</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-800">${Math.round(newTotalAnnual)}</p>
                      <p className="text-sm text-green-600">Energy: ${Math.round(newAnnualCost)} + Service: ${newMaintenanceCost}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border-2 border-blue-300">
                    <span className="font-semibold text-blue-800">Annual Savings</span>
                    <span className="text-2xl font-bold text-blue-800">${Math.round(annualSavings)}</span>
                  </div>
                </div>
              </div>

              {/* 15-Year Projection */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-800 mb-4">15-Year Financial Impact</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Cost</span>
                    <span className="font-medium text-red-600">${parseFloat(systemCost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Federal Tax Credit</span>
                    <span className="font-medium text-green-600">-${parseFloat(federalCredit).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Utility Rebate</span>
                    <span className="font-medium text-green-600">-${parseFloat(utilityRebate).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Net Investment</span>
                    <span className="font-bold">${netSystemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">15-Year Energy Savings</span>
                    <span className="font-medium text-green-600">${Math.round(totalSavings15yr).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 bg-green-50 p-2 rounded">
                    <span className="font-bold text-green-800">Net Profit (15 years)</span>
                    <span className="font-bold text-green-800 text-xl">
                      {netROI15yr > 0 ? '+' : ''}${Math.round(netROI15yr).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Investment Recommendation
              </h4>
              <div className="prose max-w-none">
                {simplePayback < 7 && (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">
                      <strong>Excellent Investment</strong> - With a {simplePayback.toFixed(1)}-year payback and {annualReturnRate.toFixed(1)}% annual return, 
                      this upgrade significantly outperforms most investments and provides immediate comfort benefits.
                    </p>
                  </div>
                )}
                
                {simplePayback >= 7 && simplePayback <= 12 && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 font-medium">
                      <strong>Good Investment</strong> - The {simplePayback.toFixed(1)}-year payback is reasonable for a major home improvement. 
                      Factor in comfort, reliability, and potential home value increase.
                    </p>
                  </div>
                )}
                
                {simplePayback > 12 && (
                  <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-4">
                    <p className="text-orange-800 font-medium">
                      <strong>Consider Alternatives</strong> - With a {simplePayback.toFixed(1)}-year payback, the financial benefits are limited. 
                      Consider if reliability, comfort, or environmental factors justify the investment.
                    </p>
                  </div>
                )}

                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Additional Benefits Not Quantified:</strong></p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Improved comfort and temperature consistency</li>
                    <li>Better indoor air quality and humidity control</li>
                    <li>Reduced repair costs and service calls</li>
                    <li>Potential home resale value increase</li>
                    <li>Environmental impact reduction</li>
                    <li>Utility demand response program eligibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <EmbedCode calculatorType="hvac-roi-calculator" title="HVAC ROI Calculator" />
    </div>
  );
}