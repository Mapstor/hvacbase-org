'use client';

import { useState } from 'react';
import { Calculator, Home, Zap, DollarSign, CheckCircle, Info, AlertTriangle, Settings, TrendingUp, Leaf } from 'lucide-react';

const zoneTypes = [
  { value: 'bedroom', name: 'Bedroom', baseBTU: 100 },
  { value: 'living', name: 'Living Room', baseBTU: 120 },
  { value: 'kitchen', name: 'Kitchen', baseBTU: 150 },
  { value: 'office', name: 'Home Office', baseBTU: 110 },
  { value: 'basement', name: 'Basement', baseBTU: 90 },
  { value: 'sunroom', name: 'Sunroom', baseBTU: 140 }
];

interface Zone {
  id: number;
  name: string;
  type: string;
  squareFeet: string;
  sunExposure: string;
}

export default function MiniSplitCalculator() {
  const [zones, setZones] = useState<Zone[]>([
    { id: 1, name: 'Zone 1', type: 'living', squareFeet: '400', sunExposure: 'moderate' }
  ]);
  const [climate, setClimate] = useState('moderate');
  const [insulation, setInsulation] = useState('average');
  const [calculated, setCalculated] = useState(false);
  
  const addZone = () => {
    if (zones.length < 5) {
      setZones([...zones, {
        id: Date.now(),
        name: `Zone ${zones.length + 1}`,
        type: 'bedroom',
        squareFeet: '200',
        sunExposure: 'moderate'
      }]);
    }
  };
  
  const removeZone = (id: number) => {
    if (zones.length > 1) {
      setZones(zones.filter(z => z.id !== id));
    }
  };
  
  const updateZone = (id: number, field: string, value: string) => {
    setZones(zones.map(z => z.id === id ? { ...z, [field]: value } : z));
  };
  
  // Calculate BTU for each zone
  const calculateZoneBTU = (zone: Zone) => {
    const zoneType = zoneTypes.find(t => t.value === zone.type);
    const baseBTU = (zoneType?.baseBTU || 100) * parseFloat(zone.squareFeet || '0');
    
    // Apply factors
    const climateFactor = climate === 'hot' ? 1.2 : climate === 'cold' ? 0.9 : 1.0;
    const insulationFactor = insulation === 'poor' ? 1.2 : insulation === 'good' ? 0.9 : 1.0;
    const sunFactor = zone.sunExposure === 'high' ? 1.15 : zone.sunExposure === 'low' ? 0.9 : 1.0;
    
    return baseBTU * climateFactor * insulationFactor * sunFactor;
  };
  
  const zoneBTUs = zones.map(zone => ({
    ...zone,
    btu: calculateZoneBTU(zone),
    tons: calculateZoneBTU(zone) / 12000
  }));
  
  const totalBTU = zoneBTUs.reduce((sum, zone) => sum + zone.btu, 0);
  const totalTons = totalBTU / 12000;
  
  // Get recommended outdoor unit size
  const getOutdoorUnitSize = () => {
    const sizes = [18000, 24000, 30000, 36000, 42000, 48000, 60000];
    return sizes.find(size => size >= totalBTU * 1.1) || 60000; // Add 10% safety margin
  };
  
  const recommendedOutdoor = getOutdoorUnitSize();
  
  // Estimate costs
  const estimatedEquipmentCost = 800 + (zones.length * 600) + (totalBTU / 1000 * 15);
  const estimatedInstallCost = 500 + (zones.length * 400);
  const totalEstimatedCost = estimatedEquipmentCost + estimatedInstallCost;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-purple-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mini Split Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Size multi-zone ductless systems</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">System Configuration</h3>
            <button
              onClick={addZone}
              disabled={zones.length >= 5}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              + Add Zone (Max 5)
            </button>
          </div>
          
          {/* Climate Settings */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Climate Type
              </label>
              <select
                value={climate}
                onChange={(e) => setClimate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="hot">Hot Climate</option>
                <option value="moderate">Moderate Climate</option>
                <option value="cold">Cold Climate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insulation Quality
              </label>
              <select
                value={insulation}
                onChange={(e) => setInsulation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="poor">Poor</option>
                <option value="average">Average</option>
                <option value="good">Good</option>
              </select>
            </div>
          </div>
          
          {/* Zones */}
          <div className="space-y-3">
            {zones.map((zone, index) => (
              <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Zone {index + 1}</h4>
                  {zones.length > 1 && (
                    <button
                      onClick={() => removeZone(zone.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Room Type
                    </label>
                    <select
                      value={zone.type}
                      onChange={(e) => updateZone(zone.id, 'type', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    >
                      {zoneTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      value={zone.squareFeet}
                      onChange={(e) => updateZone(zone.id, 'squareFeet', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                      min="50"
                      max="1000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Sun Exposure
                    </label>
                    <select
                      value={zone.sunExposure}
                      onChange={(e) => updateZone(zone.id, 'sunExposure', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                {/* Zone BTU Result */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Required Capacity:</span>
                  <span className="font-semibold text-purple-600">
                    {Math.round(zoneBTUs.find(z => z.id === zone.id)?.btu || 0).toLocaleString()} BTU
                  </span>
                </div>
              </div>
            ))}
          </div>
          
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate System Requirements
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
              Your Mini Split System Requirements
            </h3>
            
            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Result */}
              <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-800">System Configuration</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Total Cooling Capacity</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {Math.round(totalBTU).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">BTU per hour ({totalTons.toFixed(2)} tons)</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Outdoor Unit Size</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {(recommendedOutdoor / 1000).toFixed(0)}K BTU
                      </p>
                      <p className="text-sm text-gray-500">Recommended condensing unit</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Zone Configuration</p>
                    <div className="bg-white/60 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Number of Zones:</span>
                        <span className="font-medium">{zones.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Area:</span>
                        <span className="font-medium">{zones.reduce((sum, z) => sum + parseFloat(z.squareFeet || '0'), 0).toFixed(0)} sq ft</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">System Type:</span>
                        <span className="font-medium">{zones.length === 1 ? 'Single-Zone' : 'Multi-Zone'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Climate:</span>
                        <span className="font-medium">{climate.charAt(0).toUpperCase() + climate.slice(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Cost Breakdown */}
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Investment Estimate</h4>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Equipment</span>
                      <span className="font-semibold text-gray-800">
                        ${Math.round(estimatedEquipmentCost).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Installation</span>
                      <span className="font-semibold text-gray-800">
                        ${Math.round(estimatedInstallCost).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-green-200/50 rounded-lg p-3 border-2 border-green-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-800">Total Investment</span>
                      <span className="text-xl font-bold text-green-800">
                        ${Math.round(totalEstimatedCost).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Professional installation included</p>
                  </div>
                  
                  <div className="pt-2 text-xs text-gray-600">
                    <p>• Price varies by region and complexity</p>
                    <p>• May qualify for tax credits</p>
                    <p>• 10+ year equipment warranties typical</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Zone Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Indoor Unit Specifications */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  Indoor Unit Requirements
                </h4>
                <div className="space-y-3">
                  {zoneBTUs.map((zone, index) => {
                    const recommendedSize = Math.ceil(zone.btu / 3000) * 3;
                    const zoneType = zoneTypes.find(t => t.value === zone.type);
                    return (
                      <div key={zone.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">Zone {index + 1}</span>
                          <span className="text-lg font-bold text-blue-600">
                            {recommendedSize}K BTU
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Room Type:</span>
                            <span className="font-medium">{zoneType?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Area:</span>
                            <span className="font-medium">{zone.squareFeet} sq ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Calculated Load:</span>
                            <span className="font-medium">{Math.round(zone.btu).toLocaleString()} BTU</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sun Exposure:</span>
                            <span className="font-medium capitalize">{zone.sunExposure}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* System Benefits */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Mini Split Advantages
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Energy Efficiency</p>
                    <p className="text-sm text-blue-700">
                      16-22+ SEER rating - up to 40% more efficient than central AC systems.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">Zone Control</p>
                    <p className="text-sm text-green-700">
                      Individual temperature control for each room - no wasted energy cooling unused areas.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-semibold text-purple-800 mb-1">Installation Benefits</p>
                    <p className="text-sm text-purple-700">
                      No ductwork required - minimal disruption to your home during installation.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-semibold text-orange-800 mb-1">Year-Round Comfort</p>
                    <p className="text-sm text-orange-700">
                      Heat pump technology provides both heating and cooling with excellent cold climate performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Efficiency & Savings */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Efficiency & Operating Cost Benefits
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-3">
                  <p className="text-2xl font-bold text-green-600">30-40%</p>
                  <p className="text-sm text-gray-600">Lower energy costs vs central AC</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-2xl font-bold text-blue-600">&lt;40dB</p>
                  <p className="text-sm text-gray-600">Whisper-quiet operation</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-2xl font-bold text-purple-600">15-20yr</p>
                  <p className="text-sm text-gray-600">Expected system lifespan</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Annual Operating Cost Estimate:</strong> Based on {totalTons.toFixed(1)} tons of capacity:
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Cooling season: $${Math.round(totalTons * 120)}-$${Math.round(totalTons * 180)} (varies by usage and local rates)</p>
                  <p>• Heating season: $${Math.round(totalTons * 200)}-$${Math.round(totalTons * 300)} (heat pump mode)</p>
                  <p>• Potential tax credits: Up to $2,000 for ENERGY STAR qualified systems</p>
                </div>
              </div>
            </div>
            
            {/* Professional Disclaimer */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Professional Design & Installation Recommended</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• This calculator provides preliminary sizing estimates based on room characteristics and standard load calculations</p>
                    <p>• Professional load calculation (Manual J) ensures optimal sizing and performance for your specific conditions</p>
                    <p>• Installation requires licensed HVAC technician - proper refrigerant lines, electrical, and mounting critical</p>
                    <p>• Local codes may require permits and inspections - professional installers handle compliance</p>
                    <p>• Manufacturer warranties typically require professional installation for coverage</p>
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