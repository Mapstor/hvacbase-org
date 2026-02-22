'use client';

import { useState } from 'react';
import { Calculator, Thermometer, Home, Sun, Snowflake, Wind, CheckCircle, Info, AlertTriangle, Zap } from 'lucide-react';

const climateZones = [
  { value: 'very-hot', name: 'Very Hot (Zone 1)', description: 'Southern FL, HI', btuPerSqFt: 18 },
  { value: 'hot-humid', name: 'Hot & Humid (Zone 2)', description: 'Southern TX, LA, MS, AL, GA', btuPerSqFt: 20 },
  { value: 'hot-dry', name: 'Hot & Dry (Zone 3)', description: 'AZ, Southern CA, NV', btuPerSqFt: 22 },
  { value: 'mixed-humid', name: 'Mixed-Humid (Zone 4)', description: 'NC, SC, TN, AR, OK', btuPerSqFt: 25 },
  { value: 'mixed-dry', name: 'Mixed-Dry (Zone 5)', description: 'Northern CA, OR, WA', btuPerSqFt: 28 },
  { value: 'cool', name: 'Cool (Zone 6)', description: 'PA, NY, MI, WI, IL', btuPerSqFt: 30 },
  { value: 'cold', name: 'Cold (Zone 7)', description: 'MN, ND, MT, ME', btuPerSqFt: 35 },
  { value: 'very-cold', name: 'Very Cold (Zone 8)', description: 'Northern MN, AK', btuPerSqFt: 40 }
];

const roomTypes = [
  { value: 'bedroom', name: 'Bedroom', heatLoad: 1.0 },
  { value: 'living', name: 'Living Room', heatLoad: 1.1 },
  { value: 'kitchen', name: 'Kitchen', heatLoad: 1.4 },
  { value: 'bathroom', name: 'Bathroom', heatLoad: 0.9 },
  { value: 'office', name: 'Home Office', heatLoad: 1.2 },
  { value: 'sunroom', name: 'Sunroom', heatLoad: 1.5 },
  { value: 'basement', name: 'Basement', heatLoad: 0.8 },
  { value: 'garage', name: 'Garage', heatLoad: 1.3 }
];

const windowTypes = [
  { value: 'single', name: 'Single Pane', factor: 1.3 },
  { value: 'double', name: 'Double Pane', factor: 1.0 },
  { value: 'triple', name: 'Triple Pane', factor: 0.8 },
  { value: 'low-e', name: 'Low-E Coated', factor: 0.9 }
];

export default function BTUCalculator() {
  const [length, setLength] = useState('15');
  const [width, setWidth] = useState('12');
  const [height, setHeight] = useState('8');
  const [climate, setClimate] = useState('mixed-humid');
  const [roomType, setRoomType] = useState('living');
  const [windowType, setWindowType] = useState('double');
  const [windowArea, setWindowArea] = useState('30');
  const [insulation, setInsulation] = useState('average');
  const [sunExposure, setSunExposure] = useState('moderate');
  const [occupants, setOccupants] = useState('2');
  const [appliances, setAppliances] = useState('2');
  const [calculated, setCalculated] = useState(false);
  
  // Calculate room area and volume
  const roomArea = parseFloat(length) * parseFloat(width);
  const roomVolume = roomArea * parseFloat(height);
  
  // Get base BTU from climate zone
  const selectedZone = climateZones.find(z => z.value === climate);
  const baseBTU = selectedZone ? roomArea * selectedZone.btuPerSqFt : 0;
  
  // Apply room type factor
  const selectedRoom = roomTypes.find(r => r.value === roomType);
  const roomFactor = selectedRoom ? selectedRoom.heatLoad : 1;
  
  // Apply window factor
  const selectedWindow = windowTypes.find(w => w.value === windowType);
  const windowFactor = selectedWindow ? selectedWindow.factor : 1;
  const windowAreaFactor = 1 + (parseFloat(windowArea) / roomArea) * 0.3;
  
  // Apply insulation factor
  const insulationFactors = {
    'poor': 1.3,
    'average': 1.0,
    'good': 0.9,
    'excellent': 0.85
  };
  const insulationFactor = insulationFactors[insulation as keyof typeof insulationFactors];
  
  // Apply sun exposure factor
  const sunFactors = {
    'heavy-shade': 0.9,
    'moderate': 1.0,
    'direct-sun': 1.1,
    'southwest': 1.15
  };
  const sunFactor = sunFactors[sunExposure as keyof typeof sunFactors];
  
  // Add for ceiling height (adjustment for volumes over standard 8ft)
  const heightFactor = parseFloat(height) / 8;
  
  // Add for occupants (600 BTU per person over 2)
  const occupantBTU = Math.max(0, parseInt(occupants) - 2) * 600;
  
  // Add for appliances (400 BTU each)
  const applianceBTU = parseInt(appliances) * 400;
  
  // Calculate total BTU
  const adjustedBTU = baseBTU * roomFactor * windowFactor * windowAreaFactor * 
                      insulationFactor * sunFactor * heightFactor;
  const totalBTU = adjustedBTU + occupantBTU + applianceBTU;
  
  // Calculate tonnage
  const tonnage = totalBTU / 12000;
  
  // Get recommended unit sizes
  const getRecommendedUnits = () => {
    const standardSizes = [5000, 6000, 8000, 10000, 12000, 14000, 18000, 24000, 30000, 36000];
    const ideal = standardSizes.find(size => size >= totalBTU) || 36000;
    const minimum = standardSizes[Math.max(0, standardSizes.indexOf(ideal) - 1)] || ideal;
    return { minimum, ideal };
  };
  
  const recommended = getRecommendedUnits();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">BTU Calculator</h2>
          <p className="text-sm text-gray-600">Calculate exact cooling capacity for any room</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room Dimensions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" />
              Room Dimensions
            </h3>
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Length (feet)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="5"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room Width (feet)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="5"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ceiling Height (feet)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="7"
                max="20"
              />
            </div>
            
            <div className="bg-gray-50 rounded p-3 text-sm">
              <p className="font-medium text-gray-700">Room Stats:</p>
              <p className="text-gray-600">Area: {roomArea.toFixed(0)} sq ft</p>
              <p className="text-gray-600">Volume: {roomVolume.toFixed(0)} cu ft</p>
            </div>
          </div>
          
          {/* Environmental Factors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-gray-500" />
              Environmental Factors
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Climate Zone
              </label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                Room Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {roomTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sun Exposure
              </label>
              <select
                value={sunExposure}
                onChange={(e) => setSunExposure(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="heavy-shade">Heavy Shade (North facing)</option>
                <option value="moderate">Moderate (East facing)</option>
                <option value="direct-sun">Direct Sun (West facing)</option>
                <option value="southwest">Heavy Sun (South/Southwest)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insulation Quality
              </label>
              <select
                value={insulation}
                onChange={(e) => setInsulation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="poor">Poor (Old/No insulation)</option>
                <option value="average">Average (Standard)</option>
                <option value="good">Good (Modern)</option>
                <option value="excellent">Excellent (Energy Star)</option>
              </select>
            </div>
          </div>
          
          {/* Additional Factors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-2">
              <Sun className="w-5 h-5 text-gray-500" />
              Additional Factors
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Type
              </label>
              <select
                value={windowType}
                onChange={(e) => setWindowType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {windowTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Window Area (sq ft)
              </label>
              <input
                type="number"
                value={windowArea}
                onChange={(e) => setWindowArea(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Occupants
              </label>
              <input
                type="number"
                value={occupants}
                onChange={(e) => setOccupants(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="20"
              />
              <p className="text-xs text-gray-500 mt-1">People regularly in room</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heat-Generating Appliances
              </label>
              <input
                type="number"
                value={appliances}
                onChange={(e) => setAppliances(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="10"
              />
              <p className="text-xs text-gray-500 mt-1">TVs, computers, etc.</p>
            </div>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate BTU Requirements
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 space-y-8">
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              BTU Requirements for Your Room
            </h3>
            
            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Result */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Required Cooling Capacity</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total BTU Requirement</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {Math.round(totalBTU).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">BTU per hour</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Equivalent Tonnage</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {tonnage.toFixed(2)} tons
                      </p>
                      <p className="text-sm text-gray-500">({Math.round(tonnage * 2) / 2} tons rounded)</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Room Details</p>
                    <div className="bg-white/60 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Area:</span>
                        <span className="font-medium">{roomArea.toFixed(0)} sq ft</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Volume:</span>
                        <span className="font-medium">{roomVolume.toFixed(0)} cu ft</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Room Type:</span>
                        <span className="font-medium">{selectedRoom.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Climate:</span>
                        <span className="font-medium">{selectedZone.name.split(' (')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Unit Recommendations */}
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">AC Unit Sizes</h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/60 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Minimum Size</span>
                      <span className="text-lg font-bold text-gray-800">
                        {recommended.minimum.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">BTU per hour</p>
                  </div>
                  <div className="bg-green-200/50 rounded-lg p-3 border-2 border-green-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-800">Recommended</span>
                      <span className="text-xl font-bold text-green-800">
                        {recommended.ideal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">BTU per hour - Optimal choice</p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-gray-600">
                      {totalBTU <= 8000 ? 'Window AC or Portable unit suitable' :
                       totalBTU <= 24000 ? 'Mini-split system recommended' :
                       'Central AC or multi-zone system needed'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Calculation Breakdown */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Calculation Breakdown
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Base Load</span>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">{Math.round(baseBTU).toLocaleString()} BTU</span>
                      <p className="text-xs text-gray-500">{roomArea.toFixed(0)} sq ft × {selectedZone.btuPerSqFt} BTU/sq ft</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Room Type ({selectedRoom.name})</span>
                      <span className="font-medium text-gray-700">×{roomFactor.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Windows ({selectedWindow.name})</span>
                      <span className="font-medium text-gray-700">×{(windowFactor * windowAreaFactor).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Insulation ({insulation})</span>
                      <span className="font-medium text-gray-700">×{insulationFactor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sun Exposure</span>
                      <span className="font-medium text-gray-700">×{sunFactor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ceiling Height ({height} ft)</span>
                      <span className="font-medium text-gray-700">×{heightFactor.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Extra Occupants</span>
                      <span className="font-medium text-gray-700">+{occupantBTU} BTU</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Appliances ({appliances})</span>
                      <span className="font-medium text-gray-700">+{applianceBTU} BTU</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-800">Final Requirement</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">{Math.round(totalBTU).toLocaleString()}</span>
                      <p className="text-xs text-gray-500">BTU/hr</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System Type & Efficiency */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  System Recommendations
                </h4>
                <div className="space-y-4">
                  {totalBTU <= 8000 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-800 mb-1">Window AC or Portable Unit</p>
                      <p className="text-sm text-blue-700">
                        Affordable option for single room. Window units are more efficient than portable.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        Expected cost: $200-$800 • Installation: DIY friendly
                      </p>
                    </div>
                  )}
                  
                  {totalBTU > 8000 && totalBTU <= 24000 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-800 mb-1">Mini-Split System (Recommended)</p>
                      <p className="text-sm text-green-700">
                        Most efficient, quiet operation, and precise temperature control.
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        Expected cost: $1,500-$4,000 • Professional installation required
                      </p>
                    </div>
                  )}
                  
                  {totalBTU > 24000 && (
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="font-semibold text-purple-800 mb-1">Central AC or Multi-Zone System</p>
                      <p className="text-sm text-purple-700">
                        Large room requires whole-home solution or multiple mini-splits.
                      </p>
                      <p className="text-xs text-purple-600 mt-2">
                        Expected cost: $3,000-$8,000+ • Professional design & installation
                      </p>
                    </div>
                  )}
                  
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="font-semibold text-amber-800 mb-1">Energy Efficiency Tip</p>
                    <p className="text-sm text-amber-700">
                      Look for ENERGY STAR certified units with SEER2 ratings of 15+ for best efficiency and lowest operating costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Disclaimer */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Important Considerations</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• This calculator provides estimates based on standard industry formulas and typical room conditions</p>
                    <p>• Actual BTU requirements may vary based on local climate, building construction, and usage patterns</p>
                    <p>• For rooms over 500 sq ft, consider professional load calculation (Manual J) for optimal sizing</p>
                    <p>• Proper unit sizing is critical - oversized units cycle frequently and don't dehumidify effectively</p>
                    <p>• Installation quality significantly affects performance - use licensed HVAC professionals for best results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}