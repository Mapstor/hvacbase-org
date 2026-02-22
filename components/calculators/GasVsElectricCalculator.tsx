'use client';

import { useState } from 'react';
import { Calculator, Flame, Zap, DollarSign, Leaf, TrendingUp } from 'lucide-react';

const applianceTypes = [
  { 
    value: 'water-heater', 
    name: 'Water Heater',
    gasEfficiency: 0.85,
    electricEfficiency: 0.95,
    gasSize: 50000, // BTU/hr
    electricSize: 4500, // Watts
    usageHours: 3 // hours per day
  },
  {
    value: 'furnace',
    name: 'Furnace/Heating',
    gasEfficiency: 0.90,
    electricEfficiency: 0.98,
    gasSize: 80000,
    electricSize: 15000,
    usageHours: 8
  },
  {
    value: 'dryer',
    name: 'Clothes Dryer',
    gasEfficiency: 0.80,
    electricEfficiency: 1.0,
    gasSize: 22000,
    electricSize: 5000,
    usageHours: 1
  },
  {
    value: 'range',
    name: 'Cooking Range',
    gasEfficiency: 0.55,
    electricEfficiency: 0.85,
    gasSize: 30000,
    electricSize: 3000,
    usageHours: 1.5
  },
  {
    value: 'fireplace',
    name: 'Fireplace',
    gasEfficiency: 0.75,
    electricEfficiency: 1.0,
    gasSize: 40000,
    electricSize: 1500,
    usageHours: 4
  }
];

export default function GasVsElectricCalculator() {
  const [applianceType, setApplianceType] = useState('water-heater');
  const [gasPrice, setGasPrice] = useState('1.20');
  const [electricRate, setElectricRate] = useState('0.16');
  const [customGasSize, setCustomGasSize] = useState('');
  const [customElectricSize, setCustomElectricSize] = useState('');
  const [customHours, setCustomHours] = useState('');
  const [calculated, setCalculated] = useState(false);
  
  // Get appliance data
  const selectedAppliance = applianceTypes.find(a => a.value === applianceType);
  
  // Use custom values if provided, otherwise use defaults
  const gasBtuPerHour = customGasSize ? parseFloat(customGasSize) : selectedAppliance?.gasSize || 0;
  const electricWatts = customElectricSize ? parseFloat(customElectricSize) : selectedAppliance?.electricSize || 0;
  const hoursPerDay = customHours ? parseFloat(customHours) : selectedAppliance?.usageHours || 0;
  
  // Calculate energy consumption
  const dailyGasBtu = gasBtuPerHour * hoursPerDay;
  const monthlyGasBtu = dailyGasBtu * 30;
  const yearlyGasBtu = monthlyGasBtu * 12;
  
  const dailyElectricKwh = (electricWatts * hoursPerDay) / 1000;
  const monthlyElectricKwh = dailyElectricKwh * 30;
  const yearlyElectricKwh = monthlyElectricKwh * 12;
  
  // Calculate costs (gas is per therm = 100,000 BTU)
  const dailyGasCost = (dailyGasBtu / 100000) * parseFloat(gasPrice);
  const monthlyGasCost = dailyGasCost * 30;
  const yearlyGasCost = monthlyGasCost * 12;
  
  const dailyElectricCost = dailyElectricKwh * parseFloat(electricRate);
  const monthlyElectricCost = dailyElectricCost * 30;
  const yearlyElectricCost = monthlyElectricCost * 12;
  
  // Calculate savings
  const monthlySavings = monthlyElectricCost - monthlyGasCost;
  const yearlySavings = monthlySavings * 12;
  const gasCheaper = monthlySavings > 0;
  
  // Environmental impact (approximate)
  // Natural gas: ~117 lbs CO2 per million BTU
  // Electricity: ~1,222 lbs CO2 per MWh (US average grid mix)
  const yearlyGasCO2 = (yearlyGasBtu / 1000000) * 117;
  const yearlyElectricCO2 = (yearlyElectricKwh / 1000) * 1222;
  const co2Difference = yearlyElectricCO2 - yearlyGasCO2;
  
  // Efficiency comparison
  const gasEffectiveBtu = gasBtuPerHour * (selectedAppliance?.gasEfficiency || 1);
  const electricEquivalentBtu = electricWatts * 3.412; // Convert watts to BTU/hr
  const electricEffectiveBtu = electricEquivalentBtu * (selectedAppliance?.electricEfficiency || 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-orange-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gas vs Electric Cost Calculator</h2>
          <p className="text-sm text-gray-600">Compare operating costs and environmental impact</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appliance Type
            </label>
            <select
              value={applianceType}
              onChange={(e) => setApplianceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {applianceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Natural Gas Price ($/therm)
            </label>
            <input
              type="number"
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="1.20"
              min="0.50"
              max="5.00"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">US average: $1.20/therm</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electric Rate ($/kWh)
            </label>
            <input
              type="number"
              value={electricRate}
              onChange={(e) => setElectricRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="0.16"
              min="0.05"
              max="0.50"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">US average: $0.16/kWh</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usage Hours/Day (optional)
            </label>
            <input
              type="number"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={`Default: ${selectedAppliance?.usageHours} hrs`}
              min="0.1"
              max="24"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gas Size (BTU/hr) (optional)
            </label>
            <input
              type="number"
              value={customGasSize}
              onChange={(e) => setCustomGasSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={`Default: ${selectedAppliance?.gasSize?.toLocaleString() || '0'} BTU/hr`}
              min="1000"
              max="200000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electric Size (Watts) (optional)
            </label>
            <input
              type="number"
              value={customElectricSize}
              onChange={(e) => setCustomElectricSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={`Default: ${selectedAppliance?.electricSize?.toLocaleString() || '0'}W`}
              min="100"
              max="50000"
            />
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Compare Gas vs Electric
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Cost Comparison Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Gas Costs */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <div className="text-center space-y-2">
                <Flame className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Natural Gas Costs</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-orange-600">
                    ${monthlyGasCost.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">per month</p>
                  <p className="text-sm text-gray-600">
                    ${dailyGasCost.toFixed(2)}/day
                  </p>
                  <p className="text-sm text-gray-600">
                    ${yearlyGasCost.toFixed(0)}/year
                  </p>
                </div>
              </div>
            </div>
            
            {/* Electric Costs */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Electric Costs</p>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600">
                    ${monthlyElectricCost.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">per month</p>
                  <p className="text-sm text-gray-600">
                    ${dailyElectricCost.toFixed(2)}/day
                  </p>
                  <p className="text-sm text-gray-600">
                    ${yearlyElectricCost.toFixed(0)}/year
                  </p>
                </div>
              </div>
            </div>
            
            {/* Savings Comparison */}
            <div className={`bg-gradient-to-br rounded-lg p-6 border ${
              gasCheaper 
                ? 'from-green-50 to-emerald-50 border-green-200' 
                : 'from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="text-center space-y-2">
                <DollarSign className={`w-8 h-8 mx-auto mb-2 ${
                  gasCheaper ? 'text-green-600' : 'text-red-600'
                }`} />
                <p className="text-sm text-gray-600">
                  {gasCheaper ? 'Gas Savings' : 'Electric Savings'}
                </p>
                <p className={`text-2xl font-bold ${
                  gasCheaper ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(monthlySavings).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">per month</p>
                <p className="text-sm text-gray-600">
                  ${Math.abs(yearlySavings).toFixed(0)}/year saved
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {gasCheaper ? 'Gas is cheaper' : 'Electric is cheaper'}
                </p>
              </div>
            </div>
            
            {/* Energy Consumption */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Energy Consumption</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gas (monthly):</span>
                  <span className="font-medium">{(monthlyGasBtu/100000).toFixed(1)} therms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Electric (monthly):</span>
                  <span className="font-medium">{monthlyElectricKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Usage hours/day:</span>
                  <span className="font-medium">{hoursPerDay} hrs</span>
                </div>
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
                  <span>Gas CO₂/year:</span>
                  <span className="font-medium">{Math.round(yearlyGasCO2)} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Electric CO₂/year:</span>
                  <span className="font-medium">{Math.round(yearlyElectricCO2)} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span>Difference:</span>
                  <span className={`font-medium ${co2Difference > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {co2Difference > 0 ? '+' : ''}{Math.round(co2Difference)} lbs
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-2">
                  {co2Difference > 0 ? 'Gas produces less CO₂' : 'Electric produces less CO₂'}
                </p>
              </div>
            </div>
            
            {/* Efficiency Comparison */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Efficiency Comparison
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Gas efficiency:</span>
                  <span className="font-medium">{selectedAppliance?.gasEfficiency ? (selectedAppliance.gasEfficiency * 100).toFixed(0) : '0'}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Electric efficiency:</span>
                  <span className="font-medium">{selectedAppliance?.electricEfficiency ? (selectedAppliance.electricEfficiency * 100).toFixed(0) : '0'}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Gas effective BTU/hr:</span>
                  <span className="font-medium">{Math.round(gasEffectiveBtu).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Electric effective BTU/hr:</span>
                  <span className="font-medium">{Math.round(electricEffectiveBtu).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
            <p className="text-sm text-blue-800">
              For your {selectedAppliance?.name?.toLowerCase() || 'appliance'}, <strong>{gasCheaper ? 'natural gas' : 'electric'}</strong> is 
              more economical, saving you <strong>${Math.abs(monthlySavings).toFixed(2)}/month</strong> or 
              <strong>${Math.abs(yearlySavings).toFixed(0)}/year</strong>. 
              {co2Difference > 0 
                ? ' Natural gas also produces less CO₂ emissions.' 
                : ' However, electric produces less CO₂ emissions.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}