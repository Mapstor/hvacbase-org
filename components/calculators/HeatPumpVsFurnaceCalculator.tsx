'use client';

import { useState } from 'react';
import { Calculator, Thermometer, DollarSign, Zap, CheckCircle, AlertTriangle, TrendingUp, Home } from 'lucide-react';
import EmbedCode from '../EmbedCode';

const climateZones = [
  { 
    value: 'very-cold', 
    name: 'Very Cold (Zone 7-8)', 
    description: 'Minnesota, Alaska, Northern Maine',
    designTemp: -10,
    heatingHours: 3500,
    coolingHours: 800,
    heatPumpViable: 'cold-climate-only'
  },
  { 
    value: 'cold', 
    name: 'Cold (Zone 6)', 
    description: 'Chicago, Boston, Denver, Montana',
    designTemp: 5,
    heatingHours: 2800,
    coolingHours: 1200,
    heatPumpViable: 'yes-with-backup'
  },
  { 
    value: 'mixed', 
    name: 'Mixed (Zone 4-5)', 
    description: 'DC, St. Louis, Kansas City, Portland',
    designTemp: 15,
    heatingHours: 1800,
    coolingHours: 1800,
    heatPumpViable: 'ideal'
  },
  { 
    value: 'hot', 
    name: 'Hot (Zone 2-3)', 
    description: 'Atlanta, Dallas, Phoenix, LA',
    designTemp: 25,
    heatingHours: 1000,
    coolingHours: 2500,
    heatPumpViable: 'excellent'
  },
  { 
    value: 'very-hot', 
    name: 'Very Hot (Zone 1)', 
    description: 'Miami, South Texas, Hawaii',
    designTemp: 35,
    heatingHours: 200,
    coolingHours: 3200,
    heatPumpViable: 'excellent'
  }
];

const fuelTypes = [
  { value: 'natural-gas', name: 'Natural Gas', btuContent: 100000, typical: 1.25 },
  { value: 'propane', name: 'Propane', btuContent: 91000, typical: 2.75 },
  { value: 'heating-oil', name: 'Heating Oil', btuContent: 138000, typical: 3.50 },
  { value: 'electric-resistance', name: 'Electric Resistance', btuContent: 3412, typical: 0.16 }
];

export default function HeatPumpVsFurnaceCalculator() {
  const [homeSize, setHomeSize] = useState('2000');
  const [climate, setClimate] = useState('mixed');
  const [currentFuel, setCurrentFuel] = useState('natural-gas');
  const [currentEfficiency, setCurrentEfficiency] = useState('80');
  const [electricRate, setElectricRate] = useState('0.16');
  const [gasRate, setGasRate] = useState('1.25');
  const [systemAge, setSystemAge] = useState('12');
  
  // System costs
  const [heatPumpCost, setHeatPumpCost] = useState('12000');
  const [furnaceCost, setFurnaceCost] = useState('6500');
  
  // Incentives
  const [heatPumpCredit, setHeatPumpCredit] = useState('2000');
  const [furnaceCredit, setFurnaceCredit] = useState('600');
  const [utilityRebate, setUtilityRebate] = useState('500');
  
  const [calculated, setCalculated] = useState(false);

  // Get selected values
  const selectedClimate = climateZones.find(z => z.value === climate)!;
  const selectedFuel = fuelTypes.find(f => f.value === currentFuel)!;
  
  // Calculate heating load
  const homeSquareFeet = parseFloat(homeSize);
  const heatingLoad = homeSquareFeet * 40; // BTU per sq ft for heating
  const coolingLoad = homeSquareFeet * 25; // BTU per sq ft for cooling
  
  // Current system annual cost
  const calculateCurrentCost = () => {
    if (currentFuel === 'electric-resistance') {
      const totalLoad = (heatingLoad * selectedClimate.heatingHours) + (coolingLoad * selectedClimate.coolingHours);
      const kwhUsed = totalLoad / 3412; // Convert BTU to kWh
      return kwhUsed * parseFloat(electricRate);
    } else {
      // Gas/oil/propane heating + separate AC
      const heatingBtu = heatingLoad * selectedClimate.heatingHours;
      const heatingCost = (heatingBtu / selectedFuel.btuContent / (parseFloat(currentEfficiency) / 100)) * parseFloat(gasRate);
      
      // Assume 14 SEER AC for cooling
      const coolingBtu = coolingLoad * selectedClimate.coolingHours;
      const coolingKwh = coolingBtu / (14 * 1000);
      const coolingCost = coolingKwh * parseFloat(electricRate);
      
      return heatingCost + coolingCost;
    }
  };

  // Heat pump system cost
  const calculateHeatPumpCost = () => {
    const totalLoad = (heatingLoad * selectedClimate.heatingHours) + (coolingLoad * selectedClimate.coolingHours);
    
    // Heat pump efficiency: 18 SEER2 cooling, 9.5 HSPF2 heating
    const coolingBtu = coolingLoad * selectedClimate.coolingHours;
    const heatingBtu = heatingLoad * selectedClimate.heatingHours;
    
    const coolingKwh = coolingBtu / (18 * 1000);
    const heatingKwh = heatingBtu / (9.5 * 3412);
    
    return (coolingKwh + heatingKwh) * parseFloat(electricRate);
  };

  // High-efficiency furnace + AC cost
  const calculateFurnaceCost = () => {
    if (currentFuel === 'electric-resistance') {
      // Electric furnace + AC
      const heatingBtu = heatingLoad * selectedClimate.heatingHours;
      const coolingBtu = coolingLoad * selectedClimate.coolingHours;
      
      const heatingKwh = heatingBtu / 3412; // 100% efficient
      const coolingKwh = coolingBtu / (16 * 1000); // 16 SEER AC
      
      return (heatingKwh + coolingKwh) * parseFloat(electricRate);
    } else {
      // 95% AFUE furnace + 16 SEER AC
      const heatingBtu = heatingLoad * selectedClimate.heatingHours;
      const heatingCost = (heatingBtu / selectedFuel.btuContent / 0.95) * parseFloat(gasRate);
      
      const coolingBtu = coolingLoad * selectedClimate.coolingHours;
      const coolingKwh = coolingBtu / (16 * 1000);
      const coolingCost = coolingKwh * parseFloat(electricRate);
      
      return heatingCost + coolingCost;
    }
  };

  const currentAnnualCost = calculateCurrentCost();
  const heatPumpAnnualCost = calculateHeatPumpCost();
  const furnaceAnnualCost = calculateFurnaceCost();
  
  // Add maintenance costs
  const currentMaintenance = parseFloat(systemAge) > 10 ? 500 : 300;
  const heatPumpMaintenance = 250;
  const furnaceMaintenance = 200; // Furnace + AC maintenance
  
  const currentTotal = currentAnnualCost + currentMaintenance;
  const heatPumpTotal = heatPumpAnnualCost + heatPumpMaintenance;
  const furnaceTotal = furnaceAnnualCost + furnaceMaintenance;
  
  // ROI calculations
  const heatPumpSavings = currentTotal - heatPumpTotal;
  const furnaceSavings = currentTotal - furnaceTotal;
  
  const heatPumpNetCost = parseFloat(heatPumpCost) - parseFloat(heatPumpCredit) - parseFloat(utilityRebate);
  const furnaceNetCost = parseFloat(furnaceCost) - parseFloat(furnaceCredit);
  
  const heatPumpPayback = heatPumpSavings > 0 ? heatPumpNetCost / heatPumpSavings : 999;
  const furnacePayback = furnaceSavings > 0 ? furnaceNetCost / furnaceSavings : 999;
  
  // 15-year analysis
  const heatPump15yr = (heatPumpSavings * 15) - heatPumpNetCost;
  const furnace15yr = (furnaceSavings * 15) - furnaceNetCost;

  // Recommendation logic
  const getRecommendation = () => {
    const climateScore = selectedClimate.heatPumpViable;
    const paybackDiff = heatPumpPayback - furnacePayback;
    const savingsDiff = heatPumpSavings - furnaceSavings;
    
    if (climateScore === 'excellent' && heatPumpPayback < 12) {
      return { choice: 'heat-pump', confidence: 'high', reason: 'Excellent climate match with strong financial returns' };
    } else if (climateScore === 'ideal' && heatPump15yr > furnace15yr) {
      return { choice: 'heat-pump', confidence: 'high', reason: 'Ideal climate zone with better long-term savings' };
    } else if (climateScore === 'cold-climate-only') {
      return { choice: 'furnace', confidence: 'medium', reason: 'Very cold climate requires cold-climate heat pump or backup heating' };
    } else if (paybackDiff > 5 && furnacePayback < 10) {
      return { choice: 'furnace', confidence: 'medium', reason: 'Significantly better payback period with furnace system' };
    } else if (Math.abs(savingsDiff) < 100) {
      return { choice: 'heat-pump', confidence: 'medium', reason: 'Similar costs, heat pump provides environmental benefits' };
    } else if (heatPump15yr > furnace15yr) {
      return { choice: 'heat-pump', confidence: 'medium', reason: 'Better long-term financial performance' };
    } else {
      return { choice: 'furnace', confidence: 'medium', reason: 'Better short-term financial performance' };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Thermometer className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Heat Pump vs Furnace Decision Tool</h2>
          <p className="text-sm text-gray-600">Compare costs, efficiency, and ROI for your climate and situation</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Home & Climate */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-600" />
            Home & Climate Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Size (sq ft)</label>
              <input
                type="number"
                value={homeSize}
                onChange={(e) => setHomeSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {climateZones.map((zone) => (
                  <option key={zone.value} value={zone.value}>{zone.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{selectedClimate.description}</p>
            </div>
          </div>
        </div>

        {/* Current System */}
        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="font-semibold text-gray-800 mb-4">Current Heating System</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={currentFuel}
                onChange={(e) => setCurrentFuel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {fuelTypes.map((fuel) => (
                  <option key={fuel.value} value={fuel.value}>{fuel.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentFuel === 'electric-resistance' ? 'Efficiency (%)' : 'AFUE (%)'}
              </label>
              <input
                type="number"
                value={currentEfficiency}
                onChange={(e) => setCurrentEfficiency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="60"
                max="98"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">System Age (years)</label>
              <input
                type="number"
                value={systemAge}
                onChange={(e) => setSystemAge(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="30"
              />
            </div>
          </div>
        </div>

        {/* Energy Rates */}
        <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            Local Energy Rates
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Electricity Rate ($/kWh)</label>
              <input
                type="number"
                value={electricRate}
                onChange={(e) => setElectricRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0.05"
                max="0.50"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentFuel === 'natural-gas' ? 'Gas Rate ($/therm)' :
                 currentFuel === 'propane' ? 'Propane Rate ($/gallon)' :
                 currentFuel === 'heating-oil' ? 'Oil Rate ($/gallon)' : 'Electric Rate'}
              </label>
              <input
                type="number"
                value={gasRate}
                onChange={(e) => setGasRate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0.50"
                max="5.00"
                step="0.05"
              />
            </div>
          </div>
        </div>

        {/* System Costs */}
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="font-semibold text-gray-800 mb-4">New System Costs & Incentives</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heat Pump Cost ($)</label>
              <input
                type="number"
                value={heatPumpCost}
                onChange={(e) => setHeatPumpCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="5000"
                max="25000"
                step="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnace+AC Cost ($)</label>
              <input
                type="number"
                value={furnaceCost}
                onChange={(e) => setFurnaceCost(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="3000"
                max="20000"
                step="500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Heat Pump Credit ($)</label>
              <input
                type="number"
                value={heatPumpCredit}
                onChange={(e) => setHeatPumpCredit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="2000"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnace Credit ($)</label>
              <input
                type="number"
                value={furnaceCredit}
                onChange={(e) => setFurnaceCredit(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="600"
                step="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utility Rebate ($)</label>
              <input
                type="number"
                value={utilityRebate}
                onChange={(e) => setUtilityRebate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="3000"
                step="100"
              />
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg"
        >
          <Calculator className="w-6 h-6" />
          Compare Heat Pump vs Furnace
        </button>

        {/* Results */}
        {calculated && (
          <div className="space-y-8 mt-8 border-t border-gray-200 pt-8">
            {/* Recommendation */}
            <div className={`rounded-xl p-6 border-2 ${
              recommendation.choice === 'heat-pump' 
                ? 'bg-green-50 border-green-300' 
                : 'bg-orange-50 border-orange-300'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className={`w-6 h-6 ${
                  recommendation.choice === 'heat-pump' ? 'text-green-600' : 'text-orange-600'
                }`} />
                <h3 className="text-xl font-bold text-gray-800">
                  Recommendation: {recommendation.choice === 'heat-pump' ? 'Heat Pump' : 'Furnace + AC'}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  recommendation.confidence === 'high' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {recommendation.confidence} confidence
                </span>
              </div>
              <p className="text-gray-700 text-lg">{recommendation.reason}</p>
            </div>

            {/* Comparison Table */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Heat Pump */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <h4 className="text-xl font-semibold text-gray-800">Heat Pump System</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Annual Energy Cost</span>
                      <span className="text-xl font-bold text-blue-600">${Math.round(heatPumpAnnualCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Maintenance</span>
                      <span>+${heatPumpMaintenance}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
                      <span>Total Annual</span>
                      <span>${Math.round(heatPumpTotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Cost</span>
                      <span>${parseFloat(heatPumpCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax Credit</span>
                      <span className="text-green-600">-${parseFloat(heatPumpCredit).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Utility Rebate</span>
                      <span className="text-green-600">-${parseFloat(utilityRebate).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Net Cost</span>
                      <span>${heatPumpNetCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Payback Period</span>
                      <span className="font-bold">{heatPumpPayback < 50 ? `${heatPumpPayback.toFixed(1)} years` : '50+ years'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Annual Savings</span>
                      <span className="text-sm">${Math.round(heatPumpSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">15-Year Net</span>
                      <span className={`text-sm font-medium ${heatPump15yr > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.round(heatPump15yr).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Furnace + AC */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                  <h4 className="text-xl font-semibold text-gray-800">Furnace + AC System</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Annual Energy Cost</span>
                      <span className="text-xl font-bold text-orange-600">${Math.round(furnaceAnnualCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Maintenance</span>
                      <span>+${furnaceMaintenance}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-800 border-t pt-2 mt-2">
                      <span>Total Annual</span>
                      <span>${Math.round(furnaceTotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Cost</span>
                      <span>${parseFloat(furnaceCost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax Credit</span>
                      <span className="text-green-600">-${parseFloat(furnaceCredit).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Utility Rebate</span>
                      <span className="text-green-600">-$0</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Net Cost</span>
                      <span>${furnaceNetCost.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Payback Period</span>
                      <span className="font-bold">{furnacePayback < 50 ? `${furnacePayback.toFixed(1)} years` : '50+ years'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Annual Savings</span>
                      <span className="text-sm">${Math.round(furnaceSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">15-Year Net</span>
                      <span className={`text-sm font-medium ${furnace15yr > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${Math.round(furnace15yr).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Climate Considerations */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Climate Zone Analysis</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Your Climate Zone: {selectedClimate.name}</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Design temperature: {selectedClimate.designTemp}°F</li>
                    <li>• Annual heating hours: {selectedClimate.heatingHours}</li>
                    <li>• Annual cooling hours: {selectedClimate.coolingHours}</li>
                    <li>• Heat pump suitability: {selectedClimate.heatPumpViable.replace('-', ' ')}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Climate Recommendations</h5>
                  {selectedClimate.heatPumpViable === 'excellent' && (
                    <p className="text-sm text-green-700">Heat pumps work excellently in your climate with minimal backup heating needed.</p>
                  )}
                  {selectedClimate.heatPumpViable === 'ideal' && (
                    <p className="text-sm text-blue-700">Perfect heat pump climate with balanced heating and cooling loads.</p>
                  )}
                  {selectedClimate.heatPumpViable === 'yes-with-backup' && (
                    <p className="text-sm text-yellow-700">Heat pumps work well but may need backup heating for coldest days.</p>
                  )}
                  {selectedClimate.heatPumpViable === 'cold-climate-only' && (
                    <p className="text-sm text-orange-700">Consider cold-climate heat pumps rated to -15°F or stick with gas heating.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Current System Comparison */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-gray-800 mb-4">Current System vs New Options</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-red-100 rounded-lg p-4">
                  <h5 className="font-medium text-red-800 mb-2">Current System</h5>
                  <p className="text-2xl font-bold text-red-800">${Math.round(currentTotal)}/yr</p>
                  <p className="text-sm text-red-600">Energy + maintenance</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-2">Heat Pump</h5>
                  <p className="text-2xl font-bold text-blue-800">${Math.round(heatPumpTotal)}/yr</p>
                  <p className="text-sm text-blue-600">
                    {heatPumpSavings > 0 ? 'Saves' : 'Costs'} ${Math.abs(Math.round(heatPumpSavings))}/yr
                  </p>
                </div>
                <div className="bg-orange-100 rounded-lg p-4">
                  <h5 className="font-medium text-orange-800 mb-2">Furnace + AC</h5>
                  <p className="text-2xl font-bold text-orange-800">${Math.round(furnaceTotal)}/yr</p>
                  <p className="text-sm text-orange-600">
                    {furnaceSavings > 0 ? 'Saves' : 'Costs'} ${Math.abs(Math.round(furnaceSavings))}/yr
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <EmbedCode calculatorType="heat-pump-vs-furnace-calculator" title="Heat Pump vs Furnace Calculator" />
    </div>
  );
}