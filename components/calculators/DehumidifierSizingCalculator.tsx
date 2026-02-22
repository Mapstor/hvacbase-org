'use client';

import { useState } from 'react';
import { Calculator, Droplets, Home, TrendingUp, Info } from 'lucide-react';

const spaceTypes = [
  { value: 'basement', name: 'Basement', moistureFactor: 1.3 },
  { value: 'living', name: 'Living Areas', moistureFactor: 1.0 },
  { value: 'bedroom', name: 'Bedrooms', moistureFactor: 0.9 },
  { value: 'bathroom', name: 'Bathroom', moistureFactor: 1.5 },
  { value: 'laundry', name: 'Laundry Room', moistureFactor: 1.4 },
  { value: 'crawlspace', name: 'Crawl Space', moistureFactor: 1.2 },
  { value: 'garage', name: 'Garage', moistureFactor: 1.1 }
];

const moistureConditions = [
  { value: 'moderate', name: 'Moderately Damp', description: 'Musty odor, damp feeling', factor: 1.0 },
  { value: 'very', name: 'Very Damp', description: 'Occasional water stains', factor: 1.2 },
  { value: 'wet', name: 'Wet', description: 'Water stains, mold spots', factor: 1.4 },
  { value: 'extremely', name: 'Extremely Wet', description: 'Standing water, severe mold', factor: 1.6 }
];

export default function DehumidifierSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState('1000');
  const [spaceType, setSpaceType] = useState('basement');
  const [moistureLevel, setMoistureLevel] = useState('moderate');
  const [currentHumidity, setCurrentHumidity] = useState('65');
  const [targetHumidity, setTargetHumidity] = useState('45');
  const [calculated, setCalculated] = useState(false);
  
  // Get factors
  const selectedSpace = spaceTypes.find(s => s.value === spaceType);
  const selectedMoisture = moistureConditions.find(m => m.value === moistureLevel);
  
  // Calculate base capacity needed (pints per day)
  // Base: 1 pint per 150 sq ft for moderate conditions
  const baseCapacity = parseFloat(squareFeet) / 150;
  
  // Apply space and moisture factors
  const adjustedCapacity = baseCapacity * (selectedSpace?.moistureFactor || 1) * (selectedMoisture?.factor || 1);
  
  // Additional capacity based on humidity difference
  const humidityDifference = parseFloat(currentHumidity) - parseFloat(targetHumidity);
  const humidityFactor = 1 + (humidityDifference - 20) * 0.02; // Base assumption: 20% reduction
  
  const totalCapacity = adjustedCapacity * Math.max(0.5, humidityFactor);
  
  // Recommend standard sizes
  const getRecommendedSizes = () => {
    const standardSizes = [30, 35, 50, 70, 95, 110, 130];
    const ideal = standardSizes.find(size => size >= totalCapacity) || 130;
    const minimum = standardSizes[Math.max(0, standardSizes.indexOf(ideal) - 1)] || ideal;
    const maximum = standardSizes[Math.min(standardSizes.length - 1, standardSizes.indexOf(ideal) + 1)] || ideal;
    
    return { minimum, ideal, maximum };
  };
  
  const recommended = getRecommendedSizes();
  
  // Calculate operating estimates
  const dailyRuntime = Math.min(24, totalCapacity / recommended.ideal * 12); // Estimated hours per day
  const dailyEnergyUse = (recommended.ideal * 8 * dailyRuntime) / 1000; // kWh (assuming ~8W per pint capacity)
  const monthlyEnergyUse = dailyEnergyUse * 30;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-cyan-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dehumidifier Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Find the right capacity dehumidifier for your space</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Space Size (Square Feet)
            </label>
            <input
              type="number"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="1000"
              min="100"
              max="5000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Space Type
            </label>
            <select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {spaceTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Moisture Condition
            </label>
            <select
              value={moistureLevel}
              onChange={(e) => setMoistureLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {moistureConditions.map(condition => (
                <option key={condition.value} value={condition.value}>
                  {condition.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedMoisture?.description}</p>
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
          
          <div className="md:col-span-2">
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
            <p className="text-xs text-gray-500 mt-1">Recommended: 30-50% for basements, 40-50% for living areas</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Dehumidifier Size
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Sizing Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Capacity Requirement */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
              <div className="text-center space-y-2">
                <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Required Capacity</p>
                <p className="text-3xl font-bold text-cyan-600">
                  {Math.round(totalCapacity)}
                </p>
                <p className="text-lg font-medium text-gray-700">pints/day</p>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {squareFeet} sq ft {selectedSpace?.name.toLowerCase()}
                </p>
              </div>
            </div>
            
            {/* Recommended Sizes */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recommended Sizes</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Minimum: <span className="font-semibold">{recommended.minimum} pint</span>
                  </p>
                  <p className="text-xl font-bold text-green-600">
                    {recommended.ideal} pint
                  </p>
                  <p className="text-sm text-gray-600">
                    Maximum: <span className="font-semibold">{recommended.maximum} pint</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">Standard dehumidifier sizes</p>
              </div>
            </div>
            
            {/* Operating Estimates */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Operating Estimates</p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Runtime: <span className="font-semibold">{dailyRuntime.toFixed(1)} hrs/day</span>
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    {dailyEnergyUse.toFixed(1)} kWh/day
                  </p>
                  <p className="text-sm text-gray-600">
                    Monthly: <span className="font-semibold">{monthlyEnergyUse.toFixed(0)} kWh</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Calculation Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Calculation Factors</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base capacity:</span>
                  <span className="font-medium">{baseCapacity.toFixed(1)} pints</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Space factor:</span>
                  <span className="font-medium">×{selectedSpace?.moistureFactor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moisture factor:</span>
                  <span className="font-medium">×{selectedMoisture?.factor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Humidity adjustment:</span>
                  <span className="font-medium">×{humidityFactor.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold text-gray-700">Total needed:</span>
                  <span className="font-bold text-cyan-600">{Math.round(totalCapacity)} pints</span>
                </div>
              </div>
            </div>
            
            {/* Humidity Benefits */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Benefits of Proper Humidity
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Prevents mold and mildew growth</li>
                <li>• Reduces dust mites and allergens</li>
                <li>• Protects wood and furniture</li>
                <li>• Improves indoor air quality</li>
                <li>• Eliminates musty odors</li>
              </ul>
            </div>
            
            {/* Size Recommendations */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Standard Sizes Guide</h4>
              <div className="space-y-1 text-xs text-yellow-800">
                <div className="flex justify-between">
                  <span>30-pint:</span>
                  <span>Up to 1,500 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>50-pint:</span>
                  <span>Up to 2,500 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>70-pint:</span>
                  <span>Up to 3,500 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span>95-pint:</span>
                  <span>Up to 4,500 sq ft</span>
                </div>
              </div>
              <p className="text-xs text-yellow-700 mt-2">
                Larger is better for severe moisture problems
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}