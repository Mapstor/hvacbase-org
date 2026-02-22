'use client';

import { useState } from 'react';
import { Calculator, Wind, Home, Zap, DollarSign, AlertTriangle, CheckCircle, Info } from 'lucide-react';

// AC unit specifications
const acUnits = [
  { size: '1.5', label: '1.5 Ton AC', running: 2000, surge: 5250, rla: 8.3, lra: 22 },
  { size: '2.0', label: '2.0 Ton AC', running: 2700, surge: 7000, rla: 11.3, lra: 29 },
  { size: '2.5', label: '2.5 Ton AC', running: 3300, surge: 8250, rla: 13.8, lra: 34 },
  { size: '3.0', label: '3.0 Ton AC', running: 3850, surge: 9500, rla: 16, lra: 40 },
  { size: '3.5', label: '3.5 Ton AC', running: 4400, surge: 10750, rla: 18.3, lra: 45 },
  { size: '4.0', label: '4.0 Ton AC', running: 4950, surge: 12000, rla: 20.6, lra: 50 },
  { size: '5.0', label: '5.0 Ton AC', running: 5500, surge: 13200, rla: 23, lra: 55 }
];

// Additional household loads
const householdLoads = [
  { id: 'fridge', name: 'Refrigerator', running: 200, surge: 1000, essential: true },
  { id: 'freezer', name: 'Freezer', running: 150, surge: 700, essential: true },
  { id: 'lights', name: 'LED Lights (whole house)', running: 300, surge: 300, essential: true },
  { id: 'internet', name: 'Internet/Router/Modem', running: 75, surge: 75, essential: true },
  { id: 'tv', name: 'TV (50")', running: 150, surge: 150, essential: false },
  { id: 'fans', name: 'Ceiling Fans (3)', running: 225, surge: 300, essential: false },
  { id: 'wellpump', name: 'Well Pump (1/2 HP)', running: 750, surge: 2000, essential: false },
  { id: 'sumppump', name: 'Sump Pump (1/3 HP)', running: 500, surge: 1200, essential: false },
  { id: 'microwave', name: 'Microwave', running: 1200, surge: 1200, essential: false },
  { id: 'garagedoor', name: 'Garage Door Opener', running: 600, surge: 1400, essential: false }
];

// Generator sizes
const generatorSizes = [
  { kw: 7, watts: 7000, label: '7 kW', price: 1800 },
  { kw: 10, watts: 10000, label: '10 kW', price: 2500 },
  { kw: 12, watts: 12000, label: '12 kW', price: 3000 },
  { kw: 14, watts: 14000, label: '14 kW', price: 3500 },
  { kw: 16, watts: 16000, label: '16 kW', price: 4000 },
  { kw: 17, watts: 17000, label: '17 kW', price: 4200 },
  { kw: 20, watts: 20000, label: '20 kW', price: 4800 },
  { kw: 22, watts: 22000, label: '22 kW (Whole House)', price: 5500 },
  { kw: 24, watts: 24000, label: '24 kW (Whole House)', price: 6000 },
  { kw: 27, watts: 27000, label: '27 kW', price: 6800 },
  { kw: 30, watts: 30000, label: '30 kW', price: 7500 }
];

export default function ACGeneratorCalculator() {
  const [acSize, setAcSize] = useState('5.0');
  const [hasHardStart, setHasHardStart] = useState(false);
  const [selectedLoads, setSelectedLoads] = useState<string[]>(['fridge', 'freezer', 'lights', 'internet']);
  const [calculated, setCalculated] = useState(false);
  
  const selectedAC = acUnits.find(unit => unit.size === acSize) || acUnits[6];
  
  // Calculate with hard-start kit reduction (30-40% surge reduction)
  const acSurge = hasHardStart ? selectedAC.surge * 0.65 : selectedAC.surge;
  const acRunning = selectedAC.running;
  
  // Calculate household loads
  const selectedHouseholdLoads = householdLoads.filter(load => selectedLoads.includes(load.id));
  const householdRunning = selectedHouseholdLoads.reduce((sum, load) => sum + load.running, 0);
  const householdLargestSurge = Math.max(...selectedHouseholdLoads.map(load => load.surge - load.running), 0);
  
  // Total calculations
  const totalRunning = acRunning + householdRunning;
  const totalSurge = totalRunning + (acSurge - acRunning); // AC has the largest surge
  const recommendedSize = Math.ceil(totalSurge * 1.2 / 1000) * 1000; // 20% margin, round up to nearest kW
  
  // Find appropriate generators
  const minimumGenerator = generatorSizes.find(g => g.watts >= totalSurge) || generatorSizes[generatorSizes.length - 1];
  const recommendedGenerator = generatorSizes.find(g => g.watts >= recommendedSize) || generatorSizes[generatorSizes.length - 1];
  
  // Natural gas consumption (approximate)
  const ngConsumption = recommendedGenerator.kw * 2.5; // Cubic feet per hour at 50% load
  const propaneConsumption = recommendedGenerator.kw * 0.11; // Gallons per hour at 50% load
  
  const toggleLoad = (loadId: string) => {
    setSelectedLoads(prev =>
      prev.includes(loadId)
        ? prev.filter(id => id !== loadId)
        : [...prev, loadId]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Wind className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AC Generator Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Calculate generator size for central AC with household loads</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        {/* AC Unit Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Central AC Unit Size
            </label>
            <select
              value={acSize}
              onChange={(e) => setAcSize(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {acUnits.map(unit => (
                <option key={unit.size} value={unit.size}>
                  {unit.label} ({unit.running}W running / {unit.surge}W surge)
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              RLA: {selectedAC.rla}A • LRA: {selectedAC.lra}A @ 240V
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hard-Start Kit Installed?
            </label>
            <div className="flex items-center gap-4 mt-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!hasHardStart}
                  onChange={() => setHasHardStart(false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">No (Standard)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={hasHardStart}
                  onChange={() => setHasHardStart(true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Yes (-35% surge)</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Hard-start kits reduce startup surge by 30-40% ($200-400 installed)
            </p>
          </div>
        </div>
        
        {/* Additional Household Loads */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Home className="w-4 h-4 text-green-600" />
            Additional Household Loads
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {householdLoads.map(load => (
              <label
                key={load.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedLoads.includes(load.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedLoads.includes(load.id)}
                    onChange={() => toggleLoad(load.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-800">
                      {load.name}
                      {load.essential && <span className="text-xs text-green-600 ml-1">(Essential)</span>}
                    </span>
                    <p className="text-xs text-gray-500">
                      {load.running}W run / {load.surge}W start
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Generator Size
        </button>
      </div>
      
      {/* Results Section */}
      {calculated && (
        <div className="mt-8 space-y-6">
          {/* Results Header */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              Generator Requirements for {selectedAC.label}
            </h3>
          </div>
          
          {/* Primary Results */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Power Requirements */}
            <div className="lg:col-span-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Recommended Generator</h4>
                    <span className="text-2xl font-bold text-blue-600">{recommendedGenerator.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Total Running:</span>
                      <p className="font-semibold">{totalRunning.toLocaleString()}W</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Peak Surge:</span>
                      <p className="font-semibold">{Math.round(totalSurge).toLocaleString()}W</p>
                    </div>
                    <div>
                      <span className="text-gray-600">With 20% Margin:</span>
                      <p className="font-semibold">{recommendedSize.toLocaleString()}W</p>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white/60 rounded text-xs text-gray-700">
                    <strong>Sizing explanation:</strong> Your {selectedAC.label} needs {acRunning}W to run and 
                    {hasHardStart ? ` ${Math.round(acSurge)}W to start (reduced from ${selectedAC.surge}W by hard-start kit)` : ` ${acSurge}W to start`}. 
                    With {selectedHouseholdLoads.length} additional loads ({householdRunning}W), you need {Math.round(totalSurge)}W peak. 
                    The {recommendedGenerator.label} generator provides reliable operation with safety margin.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fuel & Cost */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <h4 className="font-semibold text-gray-800">Cost Analysis</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xl font-bold text-green-600">${recommendedGenerator.price}</p>
                  <p className="text-xs text-gray-600">Equipment cost (before installation)</p>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• Natural gas: {ngConsumption} cu ft/hr</p>
                  <p>• Propane: {propaneConsumption.toFixed(1)} gal/hr</p>
                  <p>• Installation: $1,500-3,000</p>
                  <p>• Transfer switch: $500-1,500</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Load Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* AC Details */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-600" />
                AC Unit Analysis
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{selectedAC.label}</span>
                    <span className="font-bold text-blue-600">{acRunning}W</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>• Running current: {selectedAC.rla}A @ 240V</p>
                    <p>• Starting current: {selectedAC.lra}A @ 240V</p>
                    <p>• Surge watts: {Math.round(acSurge)}W {hasHardStart && '(with hard-start)'}</p>
                    <p>• Annual cooling cost: ~${(selectedAC.running * 0.16 * 8 * 120 / 1000).toFixed(0)}</p>
                  </div>
                </div>
                {hasHardStart && (
                  <div className="p-2 bg-green-50 rounded text-xs">
                    <p className="font-semibold text-green-800">Hard-Start Kit Benefit</p>
                    <p className="text-green-700">Surge reduced by {(selectedAC.surge - acSurge).toLocaleString()}W, allowing smaller generator</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Generator Options */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-600" />
                Generator Recommendations
              </h4>
              <div className="space-y-2">
                {minimumGenerator.watts < recommendedGenerator.watts && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Minimum: {minimumGenerator.label}</span>
                      <span>${minimumGenerator.price}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Handles load with no safety margin</p>
                  </div>
                )}
                <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Recommended: {recommendedGenerator.label}</span>
                    <span>${recommendedGenerator.price}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">20% safety margin for reliable operation</p>
                </div>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Whole House: 22-24 kW</span>
                    <span>$5,500-6,000</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Run everything without load management</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Important Notes */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800">Important Installation Requirements</p>
                <p>• AC units require 240V power - generator must provide 240V output</p>
                <p>• Automatic transfer switch recommended for seamless power transition</p>
                <p>• Professional installation required for permanent standby generators</p>
                <p>• Consider soft-start or hard-start kit to reduce generator size requirements</p>
                <p>• Natural gas or propane connection needed for standby generators</p>
                <p>• Weekly exercise cycles maintain generator readiness</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}