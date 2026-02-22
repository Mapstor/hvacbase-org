'use client';

import { useState } from 'react';
import { Calculator, Info, ChevronDown, Home, Thermometer, CheckCircle, AlertTriangle } from 'lucide-react';

const climateZones = {
  '1': { name: 'Very Hot', factor: 0.9, description: 'Miami, Houston' },
  '2': { name: 'Hot', factor: 1.0, description: 'Phoenix, Las Vegas' },
  '3': { name: 'Warm', factor: 1.1, description: 'Atlanta, Los Angeles' },
  '4': { name: 'Mixed', factor: 1.2, description: 'Washington DC, Kansas City' },
  '5': { name: 'Cool', factor: 1.3, description: 'Chicago, Boston' },
  '6': { name: 'Cold', factor: 1.4, description: 'Minneapolis, Denver' },
  '7': { name: 'Very Cold', factor: 1.5, description: 'Fargo, Anchorage' }
};

const insulationTypes = {
  'poor': { name: 'Poor (Old/None)', factor: 1.3 },
  'average': { name: 'Average (Standard)', factor: 1.0 },
  'good': { name: 'Good (Modern)', factor: 0.9 },
  'excellent': { name: 'Excellent (Energy Star)', factor: 0.8 }
};

const ceilingHeights = {
  '8': { name: '8 feet (Standard)', factor: 1.0 },
  '9': { name: '9 feet', factor: 1.1 },
  '10': { name: '10 feet', factor: 1.2 },
  '12': { name: '12+ feet (Vaulted)', factor: 1.4 }
};

const sunExposure = {
  'low': { name: 'Low (Shaded)', factor: 0.9 },
  'average': { name: 'Average', factor: 1.0 },
  'high': { name: 'High (Full Sun)', factor: 1.1 },
  'extreme': { name: 'Extreme (South/West)', factor: 1.2 }
};

export default function ACTonnageCalculator() {
  const [squareFeet, setSquareFeet] = useState('2000');
  const [zone, setZone] = useState('4');
  const [insulation, setInsulation] = useState('average');
  const [ceiling, setCeiling] = useState('8');
  const [exposure, setExposure] = useState('average');
  const [windows, setWindows] = useState('15');
  const [occupants, setOccupants] = useState('4');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculated, setCalculated] = useState(false);
  
  // Calculate base BTU
  const baseBTU = parseInt(squareFeet) * 20;
  
  // Apply all factors
  const climateFactor = climateZones[zone].factor;
  const insulationFactor = insulationTypes[insulation].factor;
  const ceilingFactor = ceilingHeights[ceiling].factor;
  const exposureFactor = sunExposure[exposure].factor;
  const windowFactor = 1 + (parseInt(windows) - 15) * 0.01;
  const occupantFactor = 1 + Math.max(0, parseInt(occupants) - 2) * 0.02;
  
  const totalBTU = baseBTU * climateFactor * insulationFactor * ceilingFactor * exposureFactor * windowFactor * occupantFactor;
  const tonnage = totalBTU / 12000;
  const roundedTonnage = Math.round(tonnage * 2) / 2; // Round to nearest 0.5
  
  // Get recommended AC sizes
  const getRecommendedSizes = () => {
    const sizes = [1.5, 2, 2.5, 3, 3.5, 4, 5];
    const ideal = sizes.find(size => size >= tonnage) || 5;
    const range = {
      min: Math.max(1.5, ideal - 0.5),
      ideal: ideal,
      max: Math.min(5, ideal + 0.5)
    };
    return range;
  };
  
  const recommended = getRecommendedSizes();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AC Tonnage Calculator</h2>
          <p className="text-sm text-gray-600">Calculate the right AC size for your home</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Square Footage */}
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
              min="400"
              max="10000"
            />
            <p className="text-xs text-gray-500 mt-1">Total conditioned space</p>
          </div>
          
          {/* Climate Zone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Climate Zone
            </label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(climateZones).map(([key, value]) => (
                <option key={key} value={key}>
                  Zone {key}: {value.name} ({value.description})
                </option>
              ))}
            </select>
          </div>
          
          {/* Insulation Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insulation Quality
            </label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(insulationTypes).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Advanced Options Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </button>
          
          {showAdvanced && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ceiling Height
                </label>
                <select
                  value={ceiling}
                  onChange={(e) => setCeiling(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(ceilingHeights).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sun Exposure
                </label>
                <select
                  value={exposure}
                  onChange={(e) => setExposure(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(sunExposure).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Windows
                </label>
                <input
                  type="number"
                  value={windows}
                  onChange={(e) => setWindows(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="5"
                  max="50"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="10"
                />
                <p className="text-xs text-gray-500 mt-1">People regularly in the home</p>
              </div>
            </>
          )}
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate AC Tonnage
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
              Your AC Size Requirements
            </h3>
            
            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Result */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Recommended AC Size</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Calculated BTU Requirement</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {Math.round(totalBTU).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">BTU per hour</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Calculated Tonnage</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {tonnage.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">tons (rounded to {roundedTonnage} tons)</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Size Options for Your Home</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-700">Minimum Size</span>
                        <span className="text-lg font-bold text-gray-800">{recommended.min} ton</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-200/50 rounded-lg p-3 border-2 border-blue-300">
                        <span className="text-sm font-semibold text-blue-800">Recommended Size</span>
                        <span className="text-xl font-bold text-blue-800">{recommended.ideal} ton</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-700">Maximum Size</span>
                        <span className="text-lg font-bold text-gray-800">{recommended.max} ton</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Climate Context */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="w-5 h-5 text-orange-500" />
                  <h4 className="font-semibold text-gray-800">Climate Context</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Your Climate Zone</p>
                    <p className="font-semibold text-gray-800">
                      Zone {zone}: {climateZones[zone].name}
                    </p>
                    <p className="text-xs text-gray-500">{climateZones[zone].description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Load Adjustment</p>
                    <p className="font-semibold text-gray-800">
                      {climateFactor === 1 ? 'Standard' : climateFactor > 1 ? `+${Math.round((climateFactor - 1) * 100)}%` : `${Math.round((climateFactor - 1) * 100)}%`}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-300">
                    <p className="text-xs text-gray-600">
                      {climateFactor > 1.2 ? 'Cold climate requires larger capacity for heating mode' : 
                       climateFactor < 1 ? 'Very hot climate benefits from slightly smaller units' :
                       'Moderate climate with standard sizing requirements'}
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
                      <span className="font-semibold text-gray-800">{baseBTU.toLocaleString()} BTU</span>
                      <p className="text-xs text-gray-500">{squareFeet} sq ft × 20 BTU/sq ft</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Climate Zone {zone}</span>
                      <span className="font-medium text-gray-700">×{climateFactor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Insulation ({insulationTypes[insulation].name})</span>
                      <span className="font-medium text-gray-700">×{insulationFactor}</span>
                    </div>
                    {showAdvanced && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Ceiling Height ({ceilingHeights[ceiling].name})</span>
                          <span className="font-medium text-gray-700">×{ceilingFactor}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Sun Exposure ({sunExposure[exposure].name})</span>
                          <span className="font-medium text-gray-700">×{exposureFactor.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{windows} Windows</span>
                          <span className="font-medium text-gray-700">×{windowFactor.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{occupants} Occupants</span>
                          <span className="font-medium text-gray-700">×{occupantFactor.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-800">Total Requirement</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">{Math.round(totalBTU).toLocaleString()}</span>
                      <p className="text-xs text-gray-500">BTU/hr</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System Recommendations */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  System Recommendations
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">Optimal Choice: {recommended.ideal} Ton Unit</p>
                    <p className="text-sm text-green-700">
                      This size provides the best balance of comfort, efficiency, and humidity control for your home.
                    </p>
                  </div>
                  
                  {tonnage > 4.5 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-800 mb-1">Large Home Consideration</p>
                      <p className="text-sm text-blue-700">
                        Consider a zoned system or multiple units for better temperature control and efficiency.
                      </p>
                    </div>
                  )}
                  
                  {recommended.ideal !== roundedTonnage && (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="font-semibold text-amber-800 mb-1">Sizing Note</p>
                      <p className="text-sm text-amber-700">
                        Standard units come in 0.5-ton increments. The {recommended.ideal}-ton size is the closest available match.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Professional Disclaimer */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Professional Installation Required</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• This calculator provides estimates based on industry-standard formulas and typical conditions</p>
                    <p>• Always have a licensed HVAC professional perform a Manual J load calculation for final sizing</p>
                    <p>• Factors like ductwork condition, window quality, and local building codes affect sizing</p>
                    <p>• Proper installation and regular maintenance are crucial for optimal performance</p>
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