'use client';

import { useState } from 'react';
import { Calculator, Home, Snowflake, Sun, TrendingUp, Zap } from 'lucide-react';

const climateRegions = [
  { value: 'hot-humid', name: 'Hot-Humid', coolingBTU: 22, heatingBTU: 15, description: 'Southeast coastal' },
  { value: 'hot-dry', name: 'Hot-Dry', coolingBTU: 20, heatingBTU: 18, description: 'Southwest desert' },
  { value: 'mixed-humid', name: 'Mixed-Humid', coolingBTU: 21, heatingBTU: 30, description: 'Mid-Atlantic' },
  { value: 'mixed-dry', name: 'Mixed-Dry', coolingBTU: 20, heatingBTU: 28, description: 'Central plains' },
  { value: 'cold', name: 'Cold', coolingBTU: 18, heatingBTU: 40, description: 'Northern states' },
  { value: 'very-cold', name: 'Very Cold', coolingBTU: 16, heatingBTU: 50, description: 'Upper midwest' },
  { value: 'marine', name: 'Marine', coolingBTU: 15, heatingBTU: 25, description: 'Pacific Northwest' }
];

const homeAge = [
  { value: 'new', name: 'New (2020+)', factor: 0.85, description: 'Modern insulation, tight envelope' },
  { value: 'modern', name: 'Modern (2000-2019)', factor: 0.95, description: 'Good insulation standards' },
  { value: 'standard', name: 'Standard (1980-1999)', factor: 1.0, description: 'Basic insulation' },
  { value: 'older', name: 'Older (1960-1979)', factor: 1.15, description: 'Limited insulation' },
  { value: 'vintage', name: 'Vintage (Pre-1960)', factor: 1.3, description: 'Poor/no insulation' }
];

const heatPumpTypes = [
  { value: 'standard', name: 'Standard (14-16 SEER)', efficiency: 14, hspf: 8.2, price: 3500 },
  { value: 'high', name: 'High Efficiency (17-20 SEER)', efficiency: 18, hspf: 9.5, price: 5000 },
  { value: 'premium', name: 'Premium (21+ SEER)', efficiency: 22, hspf: 10.5, price: 7000 },
  { value: 'cold-climate', name: 'Cold Climate (Variable)', efficiency: 20, hspf: 12, price: 8000 }
];

const backupHeatTypes = [
  { value: 'none', name: 'None (Mild climate only)', factor: 0 },
  { value: 'strips-5kw', name: '5kW Electric Strips', factor: 5000 },
  { value: 'strips-10kw', name: '10kW Electric Strips', factor: 10000 },
  { value: 'strips-15kw', name: '15kW Electric Strips', factor: 15000 },
  { value: 'gas-furnace', name: 'Gas Furnace Backup', factor: 0 }
];

export default function HeatPumpSizeCalculator() {
  const [squareFeet, setSquareFeet] = useState('2000');
  const [climate, setClimate] = useState('mixed-humid');
  const [homeAgeValue, setHomeAgeValue] = useState('standard');
  const [heatPumpType, setHeatPumpType] = useState('high');
  const [stories, setStories] = useState('2');
  const [occupants, setOccupants] = useState('4');
  const [windowArea, setWindowArea] = useState('average');
  const [backupHeat, setBackupHeat] = useState('strips-10kw');
  const [calculated, setCalculated] = useState(false);
  
  // Get selected options
  const selectedClimate = climateRegions.find(c => c.value === climate);
  const selectedAge = homeAge.find(a => a.value === homeAgeValue);
  const selectedType = heatPumpTypes.find(t => t.value === heatPumpType);
  const selectedBackup = backupHeatTypes.find(b => b.value === backupHeat);
  
  // Calculate cooling load
  const baseCoolingBTU = selectedClimate ? parseFloat(squareFeet) * selectedClimate.coolingBTU : parseFloat(squareFeet) * 25;
  const baseHeatingBTU = selectedClimate ? parseFloat(squareFeet) * selectedClimate.heatingBTU : parseFloat(squareFeet) * 30;
  
  // Apply adjustments
  let coolingLoad = baseCoolingBTU * (selectedAge?.factor || 1);
  let heatingLoad = baseHeatingBTU * (selectedAge?.factor || 1);
  
  // Story adjustment
  const storyFactor = parseFloat(stories) === 1 ? 0.95 : parseFloat(stories) === 2 ? 1.0 : 1.1;
  coolingLoad *= storyFactor;
  heatingLoad *= storyFactor;
  
  // Occupant adjustment (400 BTU per person over 2)
  const occupantAdjustment = Math.max(0, (parseFloat(occupants) - 2) * 400);
  coolingLoad += occupantAdjustment;
  
  // Window adjustment
  const windowFactor = windowArea === 'minimal' ? 0.9 : windowArea === 'average' ? 1.0 : 1.15;
  coolingLoad *= windowFactor;
  heatingLoad *= windowFactor;
  
  // Convert to tons
  const coolingTons = coolingLoad / 12000;
  const heatingTons = heatingLoad / 12000;
  
  // Recommend size (use larger of heating/cooling)
  const requiredTons = Math.max(coolingTons, heatingTons);
  const standardSizes = [1.5, 2, 2.5, 3, 3.5, 4, 5];
  const recommendedSize = standardSizes.find(size => size >= requiredTons) || 5;
  
  // Calculate capacity at different temperatures
  const capacityAt47F = recommendedSize * 12000;
  const capacityAt17F = capacityAt47F * 0.6; // Typical for standard heat pump
  const capacityAt5F = heatPumpType === 'cold-climate' ? capacityAt47F * 0.75 : capacityAt47F * 0.4;
  
  // Balance point calculation
  const balancePoint = heatPumpType === 'cold-climate' ? 5 : 25;
  
  // Operating cost estimates
  const coolingHours = selectedClimate?.value.includes('hot') ? 2000 : 1000;
  const heatingHours = selectedClimate?.value.includes('cold') ? 3000 : 1500;
  
  const coolingKWh = selectedType ? (recommendedSize * 12000 / selectedType.efficiency) * coolingHours / 1000 : 0;
  const heatingKWh = selectedType ? (recommendedSize * 12000 / selectedType.hspf) * heatingHours / 1000 : 0;
  const totalKWh = coolingKWh + heatingKWh;
  const annualCost = totalKWh * 0.16; // $0.16/kWh average
  
  // Backup heat requirements
  const coldestTemp = selectedClimate.value.includes('very-cold') ? -10 :
                      selectedClimate.value.includes('cold') ? 0 :
                      selectedClimate.value.includes('mixed') ? 15 : 30;
  const backupNeeded = coldestTemp < balancePoint;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Heat Pump Size Calculator</h2>
          <p className="text-sm text-gray-600">Calculate the right heat pump capacity for heating and cooling</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Square Footage
            </label>
            <input
              type="number"
              value={squareFeet}
              onChange={(e) => setSquareFeet(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2000"
              min="500"
              max="10000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate Region
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {climateRegions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedClimate?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Age & Insulation
            </label>
            <select
              value={homeAgeValue}
              onChange={(e) => setHomeAgeValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {homeAge.map(age => (
                <option key={age.value} value={age.value}>
                  {age.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedAge?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heat Pump Type
            </label>
            <select
              value={heatPumpType}
              onChange={(e) => setHeatPumpType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {heatPumpTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Stories
            </label>
            <select
              value={stories}
              onChange={(e) => setStories(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3+ Stories</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Occupants
            </label>
            <input
              type="number"
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="4"
              min="1"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Window Area
            </label>
            <select
              value={windowArea}
              onChange={(e) => setWindowArea(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="minimal">Minimal (Few windows)</option>
              <option value="average">Average</option>
              <option value="extensive">Extensive (Many/large windows)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Heat Source
            </label>
            <select
              value={backupHeat}
              onChange={(e) => setBackupHeat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {backupHeatTypes.map(backup => (
                <option key={backup.value} value={backup.value}>
                  {backup.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Heat Pump Size
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Heat Pump Sizing Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Recommended Size */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recommended Size</p>
                <p className="text-3xl font-bold text-blue-600">
                  {recommendedSize}
                </p>
                <p className="text-lg font-medium text-gray-700">Tons</p>
                <div className="pt-2 border-t border-blue-200 mt-4">
                  <p className="text-sm text-gray-600">{recommendedSize * 12000} BTU</p>
                  <p className="text-sm text-gray-600">Required: {requiredTons.toFixed(1)} tons</p>
                </div>
              </div>
            </div>
            
            {/* Heating/Cooling Loads */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
              <div className="text-center space-y-2">
                <Sun className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Load Calculations</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cooling:</span>
                    <span className="font-medium">{Math.round(coolingLoad).toLocaleString()} BTU</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Heating:</span>
                    <span className="font-medium">{Math.round(heatingLoad).toLocaleString()} BTU</span>
                  </div>
                  <div className="pt-2 border-t border-orange-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cooling tons:</span>
                      <span className="font-medium">{coolingTons.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Heating tons:</span>
                      <span className="font-medium">{heatingTons.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Operating Cost */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Estimated Annual Cost</p>
                <p className="text-3xl font-bold text-green-600">
                  ${annualCost.toFixed(0)}
                </p>
                <p className="text-lg font-medium text-gray-700">per year</p>
                <div className="pt-2 border-t border-green-200 mt-4">
                  <p className="text-sm text-gray-600">{Math.round(totalKWh).toLocaleString()} kWh/year</p>
                  <p className="text-sm text-gray-600">SEER {selectedType?.efficiency} / HSPF {selectedType?.hspf}</p>
                </div>
              </div>
            </div>
            
            {/* Temperature Performance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Heating Capacity by Temperature</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">At 47°F:</span>
                  <span className="font-medium">{Math.round(capacityAt47F).toLocaleString()} BTU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">At 17°F:</span>
                  <span className="font-medium">{Math.round(capacityAt17F).toLocaleString()} BTU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">At 5°F:</span>
                  <span className="font-medium">{Math.round(capacityAt5F).toLocaleString()} BTU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance point:</span>
                  <span className="font-medium">{balancePoint}°F</span>
                </div>
              </div>
            </div>
            
            {/* Backup Heat Analysis */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Snowflake className="w-4 h-4" />
                Backup Heat Analysis
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Coldest temp:</span>
                  <span className="font-medium">{coldestTemp}°F</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup needed:</span>
                  <span className="font-medium">{backupNeeded ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Backup type:</span>
                  <span className="font-medium">{selectedBackup?.name}</span>
                </div>
                {selectedBackup?.factor > 0 && (
                  <div className="flex justify-between">
                    <span>Backup capacity:</span>
                    <span className="font-medium">{selectedBackup.factor} W</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* System Specifications */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                System Specifications
              </h4>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{selectedType?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>SEER:</span>
                  <span className="font-medium">{selectedType?.efficiency}</span>
                </div>
                <div className="flex justify-between">
                  <span>HSPF:</span>
                  <span className="font-medium">{selectedType?.hspf}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. price:</span>
                  <span className="font-medium">${selectedType?.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {backupNeeded && backupHeat === 'none' && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚠️ Backup Heat Required</h4>
              <p className="text-sm text-red-800">
                Your climate zone experiences temperatures below {balancePoint}°F where the heat pump alone cannot meet heating demands. 
                Select a backup heat source (electric strips or gas furnace) for reliable heating during extreme cold.
              </p>
            </div>
          )}
          
          {heatPumpType !== 'cold-climate' && climate.includes('cold') && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">❄️ Consider Cold Climate Model</h4>
              <p className="text-sm text-blue-800">
                In {selectedClimate?.name} climates, cold climate heat pumps maintain 75% capacity at 5°F compared to 40% for standard models. 
                This reduces backup heat usage and lowers operating costs by approximately 30%.
              </p>
            </div>
          )}
          
          {coolingTons > heatingTons * 1.3 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">☀️ Cooling-Dominated Climate</h4>
              <p className="text-sm text-yellow-800">
                Your cooling load ({coolingTons.toFixed(1)} tons) significantly exceeds your heating load ({heatingTons.toFixed(1)} tons). 
                Focus on high SEER ratings for maximum efficiency. Consider variable-speed models for better dehumidification.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}