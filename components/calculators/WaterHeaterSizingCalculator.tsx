'use client';

import { useState } from 'react';
import { Calculator, Droplets, Home, Users, Clock, TrendingUp } from 'lucide-react';

const waterHeaterTypes = [
  { value: 'tank-electric', name: 'Tank - Electric', efficiency: 0.95, recoveryRate: 20, price: 1200 },
  { value: 'tank-gas', name: 'Tank - Gas', efficiency: 0.60, recoveryRate: 40, price: 1500 },
  { value: 'tankless-electric', name: 'Tankless - Electric', efficiency: 0.98, recoveryRate: 'unlimited', price: 2500 },
  { value: 'tankless-gas', name: 'Tankless - Gas', efficiency: 0.82, recoveryRate: 'unlimited', price: 3000 },
  { value: 'heat-pump', name: 'Heat Pump Water Heater', efficiency: 3.0, recoveryRate: 15, price: 3500 },
  { value: 'solar', name: 'Solar with Backup', efficiency: 0.90, recoveryRate: 30, price: 6000 }
];

const usagePatterns = [
  { value: 'low', name: 'Low Usage', factor: 0.75, description: 'Minimal hot water use' },
  { value: 'average', name: 'Average Usage', factor: 1.0, description: 'Typical household use' },
  { value: 'high', name: 'High Usage', factor: 1.25, description: 'Frequent showers, dishwasher' },
  { value: 'very-high', name: 'Very High Usage', factor: 1.5, description: 'Large family, multiple baths' }
];

const fixtureTypes = [
  { name: 'Standard Shower', gallonsPerUse: 25, duration: 10 },
  { name: 'Low-Flow Shower', gallonsPerUse: 15, duration: 10 },
  { name: 'Bathtub', gallonsPerUse: 40, duration: 15 },
  { name: 'Kitchen Sink', gallonsPerUse: 3, duration: 5 },
  { name: 'Dishwasher', gallonsPerUse: 6, duration: 45 },
  { name: 'Washing Machine', gallonsPerUse: 25, duration: 30 }
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
  const [calculated, setCalculated] = useState(false);
  
  // Get selected options
  const selectedType = waterHeaterTypes.find(t => t.value === heaterType);
  const selectedUsage = usagePatterns.find(u => u.value === usagePattern);
  
  // Calculate peak hour demand (First Hour Rating)
  const showerGallons = parseFloat(showersPerDay) * 25; // Average shower
  const bathGallons = (parseFloat(bathsPerWeek) / 7) * 40; // Daily bath usage
  const dishwasherGallons = (parseFloat(dishwasherLoads) / 7) * 6;
  const laundryGallons = (parseFloat(laundryLoads) / 7) * 25;
  const sinkGallons = parseFloat(residents) * 4; // Misc usage per person
  
  const dailyGallons = (showerGallons + bathGallons + dishwasherGallons + laundryGallons + sinkGallons) * (selectedUsage?.factor || 1);
  
  // Peak hour demand (typically morning - 30% of daily in 1 hour)
  const peakHourDemand = dailyGallons * 0.3;
  
  // Tank sizing
  let recommendedTankSize = 40, recommendedTanklessGPM = 5;
  
  if (heaterType.includes('tank')) {
    // Tank size based on first hour rating
    const tankSizes = [30, 40, 50, 65, 75, 80, 100, 120];
    const requiredFHR = peakHourDemand + (selectedType?.recoveryRate ? Number(selectedType.recoveryRate) : 20);
    recommendedTankSize = tankSizes.find(size => size >= requiredFHR) || 120;
  } else {
    // Tankless sizing based on flow rate
    const simultaneousGPM = parseFloat(simultaneousUse) * 2.5; // 2.5 GPM per fixture
    const temperatureRise = 60; // Typical rise from 50°F to 110°F
    
    // Adjust for temperature rise
    const adjustedGPM = heaterType === 'tankless-electric' 
      ? simultaneousGPM * 1.2  // Electric needs more capacity
      : simultaneousGPM;
    
    recommendedTanklessGPM = Math.ceil(adjustedGPM);
  }
  
  // Energy calculations
  const energyPerGallon = selectedType ? 8.33 * 60 / (selectedType.efficiency === 3.0 ? 3.0 : selectedType.efficiency) : 8.33 * 60 / 0.6; // BTU per gallon
  const dailyEnergyBTU = dailyGallons * energyPerGallon;
  const yearlyEnergyBTU = dailyEnergyBTU * 365;
  
  // Cost calculations
  let yearlyCost;
  if (heaterType.includes('electric') || heaterType === 'heat-pump') {
    const kWhPerYear = yearlyEnergyBTU / 3412 / (heaterType === 'heat-pump' ? 3.0 : selectedType?.efficiency || 0.9);
    yearlyCost = kWhPerYear * 0.16; // $0.16/kWh
  } else if (heaterType.includes('gas')) {
    const thermsPerYear = yearlyEnergyBTU / 100000 / (selectedType?.efficiency || 0.8);
    yearlyCost = thermsPerYear * 1.20; // $1.20/therm
  } else {
    // Solar - minimal operating cost
    yearlyCost = dailyGallons * 365 * 0.001; // Minimal backup cost
  }
  
  // Recovery time calculation (for tank heaters)
  const recoveryTime = heaterType.includes('tank') 
    ? recommendedTankSize / (selectedType?.recoveryRate ? Number(selectedType.recoveryRate) : 20)
    : 0;
  
  // Tankless temperature rise capability
  const maxTemperatureRise = heaterType === 'tankless-gas' ? 70 : 
                             heaterType === 'tankless-electric' ? 50 : 0;
  
  // Installation considerations
  const needsVenting = heaterType.includes('gas');
  const needsElectricalUpgrade = heaterType === 'tankless-electric' && recommendedTanklessGPM > 5;
  
  // Payback analysis (vs standard tank)
  const standardTankCost = 500; // Annual operating cost baseline
  const annualSavings = standardTankCost - yearlyCost;
  const paybackYears = ((selectedType?.price || 2000) - 1200) / Math.max(1, annualSavings);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-cyan-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-cyan-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Water Heater Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Find the right size water heater for your household</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Residents
            </label>
            <input
              type="number"
              value={residents}
              onChange={(e) => setResidents(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="4"
              min="1"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Bathrooms
            </label>
            <select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Heater Type
            </label>
            <select
              value={heaterType}
              onChange={(e) => setHeaterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {waterHeaterTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
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
              Showers Per Day
            </label>
            <input
              type="number"
              value={showersPerDay}
              onChange={(e) => setShowersPerDay(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="4"
              min="0"
              max="20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Baths Per Week
            </label>
            <input
              type="number"
              value={bathsPerWeek}
              onChange={(e) => setBathsPerWeek(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="2"
              min="0"
              max="20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dishwasher Loads/Week
            </label>
            <input
              type="number"
              value={dishwasherLoads}
              onChange={(e) => setDishwasherLoads(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="7"
              min="0"
              max="30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Laundry Loads/Week
            </label>
            <input
              type="number"
              value={laundryLoads}
              onChange={(e) => setLaundryLoads(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="5"
              min="0"
              max="30"
            />
          </div>
          
          {heaterType.includes('tankless') && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Simultaneous Fixtures
              </label>
              <select
                value={simultaneousUse}
                onChange={(e) => setSimultaneousUse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="1">1 (Single shower)</option>
                <option value="2">2 (Shower + sink)</option>
                <option value="3">3 (2 showers + sink)</option>
                <option value="4">4+ (Multiple bathrooms)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Maximum hot water fixtures used at once</p>
            </div>
          )}
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Water Heater Size
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Water Heater Sizing Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Recommended Size */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border border-cyan-200">
              <div className="text-center space-y-2">
                <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recommended Size</p>
                {heaterType.includes('tank') ? (
                  <>
                    <p className="text-3xl font-bold text-cyan-600">
                      {recommendedTankSize}
                    </p>
                    <p className="text-lg font-medium text-gray-700">Gallon Tank</p>
                    <div className="pt-2 border-t border-cyan-200 mt-4">
                      <p className="text-sm text-gray-600">First Hour: {Math.round(peakHourDemand)} gal</p>
                      <p className="text-sm text-gray-600">Recovery: {recoveryTime.toFixed(1)} hrs</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-cyan-600">
                      {recommendedTanklessGPM}
                    </p>
                    <p className="text-lg font-medium text-gray-700">GPM Flow Rate</p>
                    <div className="pt-2 border-t border-cyan-200 mt-4">
                      <p className="text-sm text-gray-600">Unlimited hot water</p>
                      <p className="text-sm text-gray-600">Max rise: {maxTemperatureRise}°F</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Daily Usage */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Home className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Daily Hot Water Usage</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(dailyGallons)}
                </p>
                <p className="text-lg font-medium text-gray-700">Gallons/Day</p>
                <div className="pt-2 border-t border-blue-200 mt-4">
                  <p className="text-sm text-gray-600">Peak hour: {Math.round(peakHourDemand)} gal</p>
                  <p className="text-sm text-gray-600">Annual: {Math.round(dailyGallons * 365).toLocaleString()} gal</p>
                </div>
              </div>
            </div>
            
            {/* Operating Cost */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Annual Operating Cost</p>
                <p className="text-3xl font-bold text-green-600">
                  ${yearlyCost.toFixed(0)}
                </p>
                <p className="text-lg font-medium text-gray-700">per year</p>
                <div className="pt-2 border-t border-green-200 mt-4">
                  <p className="text-sm text-gray-600">${(yearlyCost/12).toFixed(2)}/month</p>
                  <p className="text-sm text-gray-600">Efficiency: {selectedType?.efficiency && selectedType.efficiency > 1 ? 'COP ' : ''}{selectedType?.efficiency || 'N/A'}</p>
                </div>
              </div>
            </div>
            
            {/* Usage Breakdown */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Daily Usage Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Showers:</span>
                  <span className="font-medium">{Math.round(showerGallons)} gal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Baths:</span>
                  <span className="font-medium">{Math.round(bathGallons)} gal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dishwasher:</span>
                  <span className="font-medium">{Math.round(dishwasherGallons)} gal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Laundry:</span>
                  <span className="font-medium">{Math.round(laundryGallons)} gal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Other:</span>
                  <span className="font-medium">{Math.round(sinkGallons)} gal</span>
                </div>
              </div>
            </div>
            
            {/* System Specifications */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                System Details
              </h4>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{selectedType?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. price:</span>
                  <span className="font-medium">${selectedType?.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Venting required:</span>
                  <span className="font-medium">{needsVenting ? 'Yes' : 'No'}</span>
                </div>
                {paybackYears > 0 && paybackYears < 20 && (
                  <div className="flex justify-between">
                    <span>Payback:</span>
                    <span className="font-medium">{paybackYears.toFixed(1)} years</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Efficiency Comparison */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Performance Metrics
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                {heaterType.includes('tank') ? (
                  <>
                    <div className="flex justify-between">
                      <span>Recovery rate:</span>
                      <span className="font-medium">{selectedType?.recoveryRate} GPH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Full recovery:</span>
                      <span className="font-medium">{recoveryTime.toFixed(1)} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standby loss:</span>
                      <span className="font-medium">5-10%/day</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span>Flow rate:</span>
                      <span className="font-medium">{recommendedTanklessGPM} GPM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>No standby loss:</span>
                      <span className="font-medium">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space saving:</span>
                      <span className="font-medium">✓</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {needsElectricalUpgrade && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚡ Electrical Upgrade Required</h4>
              <p className="text-sm text-red-800">
                A {recommendedTanklessGPM} GPM electric tankless water heater requires 200A service and multiple 240V circuits. 
                Most homes need electrical panel upgrades ($2,000-4,000) for installation.
              </p>
            </div>
          )}
          
          {heaterType === 'heat-pump' && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Most Efficient Option</h4>
              <p className="text-sm text-green-800">
                Heat pump water heaters are 3× more efficient than standard electric tanks, saving ${Math.round(500 - yearlyCost)}/year. 
                They work best in warm climates or unconditioned spaces like basements or garages.
              </p>
            </div>
          )}
          
          {dailyGallons > 80 && heaterType.includes('tank') && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Consider Tankless</h4>
              <p className="text-sm text-yellow-800">
                With {Math.round(dailyGallons)} gallons daily usage, a tankless water heater could provide unlimited hot water 
                and save ${Math.round(yearlyCost * 0.2)}/year in energy costs while freeing up floor space.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}