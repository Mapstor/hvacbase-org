'use client';

import { useState } from 'react';
import { Calculator, Home, Flame, MapPin, Thermometer, Info, CheckCircle, AlertTriangle, TrendingUp, DollarSign, Settings, Leaf } from 'lucide-react';

const climateZones = [
  { value: 'zone1', name: 'Zone 1 (Hot)', btuPerSqFt: 30, description: 'Southern Florida, Hawaii' },
  { value: 'zone2', name: 'Zone 2 (Warm)', btuPerSqFt: 35, description: 'Southern Texas, Southern California' },
  { value: 'zone3', name: 'Zone 3 (Moderate)', btuPerSqFt: 40, description: 'Virginia, Tennessee, Arkansas' },
  { value: 'zone4', name: 'Zone 4 (Cool)', btuPerSqFt: 45, description: 'New York, Illinois, Missouri' },
  { value: 'zone5', name: 'Zone 5 (Cold)', btuPerSqFt: 50, description: 'Iowa, Michigan, Maine' },
  { value: 'zone6', name: 'Zone 6 (Very Cold)', btuPerSqFt: 55, description: 'Minnesota, Wisconsin, Montana' },
  { value: 'zone7', name: 'Zone 7 (Extreme Cold)', btuPerSqFt: 60, description: 'Northern Minnesota, Alaska' }
];

const insulationQuality = [
  { value: 'poor', name: 'Poor', factor: 1.25, description: 'Old/no insulation, single pane windows' },
  { value: 'average', name: 'Average', factor: 1.0, description: 'Standard insulation, double pane windows' },
  { value: 'good', name: 'Good', factor: 0.9, description: 'Modern insulation, energy efficient windows' },
  { value: 'excellent', name: 'Excellent', factor: 0.8, description: 'Spray foam, triple pane windows' }
];

const ceilingHeights = [
  { value: '8', name: '8 ft (Standard)', factor: 1.0 },
  { value: '9', name: '9 ft', factor: 1.125 },
  { value: '10', name: '10 ft', factor: 1.25 },
  { value: '12', name: '12 ft (Vaulted)', factor: 1.5 }
];

const furnaceEfficiency = [
  { value: '80', name: '80% AFUE (Standard)', efficiency: 0.80, price: 2500 },
  { value: '90', name: '90% AFUE (High)', efficiency: 0.90, price: 3500 },
  { value: '95', name: '95% AFUE (High)', efficiency: 0.95, price: 4500 },
  { value: '98', name: '98% AFUE (Ultra High)', efficiency: 0.98, price: 5500 }
];

export default function FurnaceSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState('2000');
  const [climateZone, setClimateZone] = useState('zone4');
  const [insulation, setInsulation] = useState('average');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [efficiency, setEfficiency] = useState('90');
  const [windowPercentage, setWindowPercentage] = useState('15');
  const [sunExposure, setSunExposure] = useState('average');
  const [calculated, setCalculated] = useState(false);
  
  // Get selected options
  const selectedZone = climateZones.find(z => z.value === climateZone);
  const selectedInsulation = insulationQuality.find(i => i.value === insulation);
  const selectedCeiling = ceilingHeights.find(c => c.value === ceilingHeight);
  const selectedEfficiency = furnaceEfficiency.find(e => e.value === efficiency);
  
  // Calculate base BTU requirement
  const baseBTU = selectedZone ? parseFloat(squareFeet) * selectedZone.btuPerSqFt : parseFloat(squareFeet) * 30;
  
  // Apply adjustment factors
  let adjustedBTU = baseBTU;
  adjustedBTU *= selectedInsulation?.factor || 1;
  adjustedBTU *= selectedCeiling?.factor || 1;
  
  // Window adjustment
  const windowFactor = 1 + ((parseFloat(windowPercentage) - 15) * 0.01);
  adjustedBTU *= windowFactor;
  
  // Sun exposure adjustment
  const sunFactor = sunExposure === 'high' ? 1.1 : sunExposure === 'low' ? 0.9 : 1.0;
  adjustedBTU *= sunFactor;
  
  // This is OUTPUT BTU needed
  const outputBTUNeeded = Math.round(adjustedBTU);
  
  // Calculate INPUT BTU (what furnace is rated at)
  const inputBTUNeeded = selectedEfficiency ? Math.round(outputBTUNeeded / selectedEfficiency.efficiency) : outputBTUNeeded;
  
  // Standard furnace sizes (INPUT BTU)
  const standardSizes = [40000, 60000, 80000, 100000, 120000, 140000];
  const recommendedSize = standardSizes.find(size => size >= inputBTUNeeded) || 140000;
  
  // Actual output with selected furnace
  const actualOutput = selectedEfficiency ? recommendedSize * selectedEfficiency.efficiency : recommendedSize;
  
  // Oversizing percentage
  const oversizing = ((actualOutput - outputBTUNeeded) / outputBTUNeeded) * 100;
  
  // Operating cost estimates
  const heatingDegreeDays = selectedZone?.value === 'zone7' ? 10000 :
                           selectedZone?.value === 'zone6' ? 8000 :
                           selectedZone?.value === 'zone5' ? 6500 :
                           selectedZone?.value === 'zone4' ? 5000 :
                           selectedZone?.value === 'zone3' ? 3500 :
                           selectedZone?.value === 'zone2' ? 2000 : 1000;
  
  const annualGasUsage = selectedEfficiency ? (outputBTUNeeded * heatingDegreeDays * 24) / (selectedEfficiency.efficiency * 100000 * 65) : 0;
  const annualCost = annualGasUsage * 1.20; // $1.20 per therm average

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-orange-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Furnace Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Calculate the right furnace size for your home</p>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="2000"
              min="500"
              max="10000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate Zone
            </label>
            <select
              value={climateZone}
              onChange={(e) => setClimateZone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {climateZones.map((zone) => (
                <option key={zone.value} value={zone.value}>
                  {zone.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedZone?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insulation Quality
            </label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {insulationQuality.map((qual) => (
                <option key={qual.value} value={qual.value}>
                  {qual.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedInsulation?.description}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ceiling Height
            </label>
            <select
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {ceilingHeights.map((height) => (
                <option key={height.value} value={height.value}>
                  {height.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Furnace Efficiency
            </label>
            <select
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {furnaceEfficiency.map((eff) => (
                <option key={eff.value} value={eff.value}>
                  {eff.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Window Area (% of wall)
            </label>
            <input
              type="number"
              value={windowPercentage}
              onChange={(e) => setWindowPercentage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="15"
              min="5"
              max="50"
            />
            <p className="text-xs text-gray-500 mt-1">Typical: 10-20%</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sun Exposure
            </label>
            <select
              value={sunExposure}
              onChange={(e) => setSunExposure(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="low">Low (Heavy shade)</option>
              <option value="average">Average</option>
              <option value="high">High (Full sun)</option>
            </select>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Furnace Size
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 space-y-6">
          {/* Results Header */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              Your Furnace Requirements
            </h3>
          </div>
          
          {/* Primary Results - Compact */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Primary Recommendation - More Compact */}
            <div className="lg:col-span-2 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 text-orange-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Recommended Furnace</h4>
                    <span className="text-2xl font-bold text-orange-600">{recommendedSize.toLocaleString()} BTU</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Input Rating:</span>
                      <p className="font-semibold">{recommendedSize.toLocaleString()} BTU/hr</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Heat Output:</span>
                      <p className="font-semibold">{actualOutput.toLocaleString()} BTU/hr</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Heat Required:</span>
                      <p className="font-semibold">{outputBTUNeeded.toLocaleString()} BTU/hr</p>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white/60 rounded text-xs text-gray-700">
                    <strong>System Match:</strong> {oversizing < 10 ? 'Excellent fit' : oversizing < 20 ? 'Good fit' : 'Slightly oversized'} ({oversizing.toFixed(0)}% margin). 
                    This {efficiency}% AFUE furnace converts {recommendedSize.toLocaleString()} BTU input to {actualOutput.toLocaleString()} BTU heat output, 
                    providing {(actualOutput - outputBTUNeeded).toLocaleString()} BTU safety margin for extreme cold days.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Annual Cost - Compact */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <h4 className="font-semibold text-gray-800">Annual Operating Cost</h4>
              </div>
              <p className="text-xl font-bold text-green-600 mb-1">${annualCost.toFixed(0)}/year</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• {Math.round(annualGasUsage)} therms @ $1.20/therm</p>
                <p>• {heatingDegreeDays.toLocaleString()} heating degree days</p>
                <p>• Based on {efficiency}% AFUE efficiency</p>
              </div>
            </div>
          </div>
          
          {/* Detailed Analysis Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Heat Load Breakdown */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-600" />
                Heat Load Analysis
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Total Heat Load</span>
                    <span className="text-lg font-bold text-blue-600">{outputBTUNeeded.toLocaleString()} BTU</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <p>• {(outputBTUNeeded/parseFloat(squareFeet)).toFixed(0)} BTU per sq ft</p>
                    <p>• Equivalent to {(outputBTUNeeded/12000).toFixed(1)} tons of heating</p>
                    <p>• {((outputBTUNeeded/inputBTUNeeded)*100).toFixed(0)}% efficiency factor applied</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-700">Load Calculation Factors:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Climate ({selectedZone?.name}):</span>
                      <span className="font-medium">{selectedZone?.btuPerSqFt} BTU/ft²</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Insulation:</span>
                      <span className="font-medium">×{selectedInsulation?.factor}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Ceiling Height:</span>
                      <span className="font-medium">×{selectedCeiling?.factor}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Windows:</span>
                      <span className="font-medium">×{windowFactor.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Base load of {baseBTU.toLocaleString()} BTU adjusted by insulation, ceiling height, 
                    window percentage ({windowPercentage}%), and sun exposure factors.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Efficiency & Savings Analysis */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                Efficiency & Savings Options
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Current Selection</span>
                    <span className="font-bold text-green-600">{efficiency}% AFUE</span>
                  </div>
                  <p className="text-xs text-gray-600">Annual fuel cost: ${annualCost.toFixed(0)}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Efficiency Comparison:</div>
                  {furnaceEfficiency.map((eff) => {
                    const effCost = selectedEfficiency ? (annualGasUsage / (eff.efficiency / selectedEfficiency.efficiency)) * 1.20 : 0;
                    const savings = annualCost - effCost;
                    return (
                      <div key={eff.value} className={`p-2 rounded text-xs ${eff.value === efficiency ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{eff.name}</span>
                          <span>${effCost.toFixed(0)}/yr</span>
                        </div>
                        {eff.value !== efficiency && (
                          <p className="text-gray-600 mt-0.5">
                            {savings > 0 ? `Save $${savings.toFixed(0)}/yr` : `Cost $${Math.abs(savings).toFixed(0)}/yr more`}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-600">
                  Higher AFUE units cost more upfront but save on fuel. 10-year savings with 95% AFUE: 
                  ${selectedEfficiency ? ((annualCost - (annualGasUsage / (0.95 / selectedEfficiency.efficiency)) * 1.20) * 10).toFixed(0) : '0'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Climate & Regional Context */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              Climate Zone Analysis: {selectedZone?.name}
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Your Region</p>
                <p className="text-xs text-gray-600">{selectedZone?.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-1">{heatingDegreeDays.toLocaleString()} HDD</p>
                <p className="text-xs text-gray-500">Heating Degree Days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Design Temperature</p>
                <p className="text-xs text-gray-600">Typical winter low:</p>
                <p className="text-lg font-bold text-purple-600 mt-1">
                  {selectedZone?.value === 'zone7' ? '-30°F' :
                   selectedZone?.value === 'zone6' ? '-10°F' :
                   selectedZone?.value === 'zone5' ? '0°F' :
                   selectedZone?.value === 'zone4' ? '10°F' :
                   selectedZone?.value === 'zone3' ? '20°F' :
                   selectedZone?.value === 'zone2' ? '30°F' : '40°F'}
                </p>
                <p className="text-xs text-gray-500">99% design temp</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Heating Season</p>
                <p className="text-xs text-gray-600">Typical duration:</p>
                <p className="text-lg font-bold text-orange-600 mt-1">
                  {selectedZone?.value === 'zone7' ? '8-9' :
                   selectedZone?.value === 'zone6' ? '7-8' :
                   selectedZone?.value === 'zone5' ? '6-7' :
                   selectedZone?.value === 'zone4' ? '5-6' :
                   selectedZone?.value === 'zone3' ? '4-5' :
                   selectedZone?.value === 'zone2' ? '3-4' : '2-3'} months
                </p>
                <p className="text-xs text-gray-500">Active heating needed</p>
              </div>
            </div>
          </div>
          
          {/* Additional Insights */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Installation Considerations */}
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-600" />
                Installation Considerations
              </h4>
              <div className="space-y-2 text-xs text-gray-700">
                <p>• <strong>Venting:</strong> {parseInt(efficiency) >= 90 ? 'PVC venting (condensing)' : 'Metal B-vent or chimney (non-condensing)'}</p>
                <p>• <strong>Electrical:</strong> Standard 115V circuit for blower and controls</p>
                <p>• <strong>Gas Line:</strong> {recommendedSize >= 100000 ? '3/4" or 1" gas line recommended' : '1/2" gas line typically sufficient'}</p>
                <p>• <strong>Installation Cost:</strong> ${selectedEfficiency?.price?.toLocaleString() || '0'} - ${selectedEfficiency?.price ? (selectedEfficiency.price * 1.4).toLocaleString() : '0'} installed</p>
                <p>• <strong>Warranty:</strong> Typical 10-year heat exchanger, 5-year parts warranty</p>
              </div>
            </div>
            
            {/* Environmental Impact */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Environmental Impact
              </h4>
              <div className="space-y-2 text-xs text-gray-700">
                <p>• <strong>CO₂ Emissions:</strong> {(annualGasUsage * 11.7).toFixed(0)} lbs/year</p>
                <p>• <strong>Efficiency Impact:</strong> {efficiency}% AFUE means {100 - parseInt(efficiency)}% heat lost to exhaust</p>
                <p>• <strong>Upgrade Benefit:</strong> Moving to 95% AFUE would reduce emissions by {selectedEfficiency ? ((annualGasUsage - annualGasUsage / (0.95 / selectedEfficiency.efficiency)) * 11.7).toFixed(0) : '0'} lbs/year</p>
                <p>• <strong>Alternative:</strong> Heat pumps can reduce emissions 30-50% with grid electricity</p>
              </div>
            </div>
          </div>
          
          {/* Professional Disclaimer */}
          <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800">Professional Installation Required</p>
                <p>• This calculator provides estimates based on industry-standard heat load calculations (similar to Manual J)</p>
                <p>• Actual requirements vary based on home construction, air infiltration, and local climate conditions</p>
                <p>• Professional HVAC contractors should perform detailed load calculations and ensure proper sizing</p>
                <p>• Oversizing reduces efficiency and comfort; undersizing can't maintain temperature on coldest days</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}