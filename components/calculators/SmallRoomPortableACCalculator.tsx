'use client';

import { useState } from 'react';
import { Wind, Zap, Volume2, Package } from 'lucide-react';

interface CompactACUnit {
  btu: number;
  coverage: { min: number; max: number };
  power: number;
  noise: number;
  weight: number;
  dimensions: { w: number; d: number; h: number };
  price: { min: number; max: number };
  pros: string[];
  cons: string[];
}

const compactUnits: Record<string, CompactACUnit> = {
  '5000': {
    btu: 5000,
    coverage: { min: 100, max: 150 },
    power: 450,
    noise: 48,
    weight: 45,
    dimensions: { w: 16, d: 13, h: 26 },
    price: { min: 200, max: 350 },
    pros: ['Very compact', 'Low power', 'Quiet operation'],
    cons: ['Limited cooling', 'Single speed']
  },
  '6000': {
    btu: 6000,
    coverage: { min: 150, max: 200 },
    power: 520,
    noise: 50,
    weight: 50,
    dimensions: { w: 17, d: 14, h: 27 },
    price: { min: 250, max: 400 },
    pros: ['Good for bedrooms', 'Affordable', 'Energy efficient'],
    cons: ['Basic features', 'Manual drainage']
  },
  '8000': {
    btu: 8000,
    coverage: { min: 200, max: 300 },
    power: 700,
    noise: 52,
    weight: 58,
    dimensions: { w: 18, d: 15, h: 29 },
    price: { min: 300, max: 500 },
    pros: ['Versatile size', 'Good features', 'Remote control'],
    cons: ['Getting bulky', 'Moderate noise']
  },
  '10000': {
    btu: 10000,
    coverage: { min: 300, max: 450 },
    power: 900,
    noise: 54,
    weight: 65,
    dimensions: { w: 19, d: 16, h: 31 },
    price: { min: 350, max: 600 },
    pros: ['Strong cooling', 'Multi-speed', 'Timer function'],
    cons: ['Not truly compact', 'Higher power use']
  }
};

export default function SmallRoomPortableACCalculator() {
  const [roomSize, setRoomSize] = useState('150');
  const [roomType, setRoomType] = useState('bedroom');
  const [priority, setPriority] = useState('size');
  const [noiseImportance, setNoiseImportance] = useState('important');
  const [budget, setBudget] = useState('400');
  const [powerLimit, setPowerLimit] = useState('standard');
  const [results, setResults] = useState<any>(null);

  const calculateAC = () => {
    const sqft = parseFloat(roomSize);
    const maxBudget = parseFloat(budget);

    // Base BTU calculation for small rooms
    let requiredBTU = sqft * 20;

    // Room type adjustments
    if (roomType === 'office') requiredBTU *= 1.15; // Electronics heat
    else if (roomType === 'kitchen') requiredBTU *= 1.25; // Cooking heat
    else if (roomType === 'sunroom') requiredBTU *= 1.3; // Extra sun

    // Portable AC efficiency penalty (less for small units)
    requiredBTU *= 1.2;

    // Find suitable units
    const suitableUnits = Object.entries(compactUnits).filter(([key, unit]) => {
      const meetsCapacity = unit.btu >= requiredBTU * 0.85; // Allow 15% under for small rooms
      const meetsBudget = unit.price.min <= maxBudget;
      const meetsPower = powerLimit === 'low' ? unit.power <= 600 : true;
      const meetsNoise = noiseImportance === 'critical' ? unit.noise <= 50 : true;
      
      return meetsCapacity && meetsBudget && meetsPower && meetsNoise;
    });

    // Score units based on priority
    const scoredUnits = suitableUnits.map(([key, unit]) => {
      let score = 100;
      
      if (priority === 'size') {
        score -= (unit.dimensions.w * unit.dimensions.d * unit.dimensions.h) / 100;
      } else if (priority === 'quiet') {
        score -= unit.noise * 2;
      } else if (priority === 'efficiency') {
        score -= (unit.power / unit.btu) * 1000;
      } else if (priority === 'price') {
        score -= unit.price.min / 10;
      }

      return { key, unit, score };
    });

    scoredUnits.sort((a, b) => b.score - a.score);
    const recommended = scoredUnits[0] || { key: '6000', unit: compactUnits['6000'], score: 0 };

    // Operating cost calculation
    const dailyHours = roomType === 'bedroom' ? 8 : 6;
    const kwhPerDay = (recommended.unit.power / 1000) * dailyHours;
    const dailyCost = kwhPerDay * 0.14;
    const monthlyCost = dailyCost * 30;

    // Space analysis
    const volumeCubicInches = recommended.unit.dimensions.w * recommended.unit.dimensions.d * recommended.unit.dimensions.h;
    const isUltraCompact = volumeCubicInches < 6000;
    const fitsDormRoom = recommended.unit.dimensions.w <= 18 && recommended.unit.weight <= 60;

    setResults({
      sqft,
      requiredBTU,
      recommended,
      suitableUnits,
      dailyHours,
      kwhPerDay,
      dailyCost,
      monthlyCost,
      isUltraCompact,
      fitsDormRoom,
      roomType,
      priority
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Small Room Portable AC Calculator</h3>
          <p className="text-sm text-gray-600">Find the most compact AC for small spaces (under 300 sq ft)</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Size (sq ft)
            </label>
            <input
              type="number"
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 150"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bedroom">Bedroom</option>
              <option value="office">Home Office</option>
              <option value="dorm">Dorm Room</option>
              <option value="studio">Studio Apartment</option>
              <option value="kitchen">Kitchen</option>
              <option value="sunroom">Sunroom</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Top Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="size">Smallest Size</option>
              <option value="quiet">Quietest Operation</option>
              <option value="efficiency">Energy Efficiency</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Noise Level Importance
            </label>
            <select
              value={noiseImportance}
              onChange={(e) => setNoiseImportance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="critical">Critical (Sleep/Work)</option>
              <option value="important">Important</option>
              <option value="moderate">Moderate</option>
              <option value="low">Not Important</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Budget ($)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Power Limitations
            </label>
            <select
              value={powerLimit}
              onChange={(e) => setPowerLimit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard Outlet (15A)</option>
              <option value="low">Limited (Old wiring/Shared circuit)</option>
              <option value="none">No Limitations</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateAC}
          disabled={!roomSize || !budget}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">
                Recommended: {results.recommended.key} BTU Unit
              </h4>
            </div>
            <p className="text-sm text-green-700">
              Perfect for your {results.sqft} sq ft {results.roomType}. 
              {results.isUltraCompact && ' Ultra-compact design ideal for tight spaces.'}
              {results.fitsDormRoom && ' Dorm-room friendly size and weight.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Physical Specifications</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimensions:</span>
                  <span className="font-medium">
                    {results.recommended.unit.dimensions.w}"W × {results.recommended.unit.dimensions.d}"D × {results.recommended.unit.dimensions.h}"H
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{results.recommended.unit.weight} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-medium">{results.recommended.unit.coverage.min}-{results.recommended.unit.coverage.max} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Portability:</span>
                  <span className="font-medium">
                    {results.recommended.unit.weight < 50 ? 'Easy' : 
                     results.recommended.unit.weight < 60 ? 'Moderate' : 'Challenging'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Performance Metrics</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Power Draw:</span>
                  <span className="font-medium">{results.recommended.unit.power}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Noise Level:</span>
                  <span className="font-medium">{results.recommended.unit.noise} dB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium">${results.recommended.unit.price.min}-${results.recommended.unit.price.max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className="font-medium">{(results.recommended.unit.btu / results.recommended.unit.power).toFixed(1)} BTU/W</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-2">Pros</h5>
              <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                {results.recommended.unit.pros.map((pro: string, idx: number) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-4">
              <h5 className="font-semibold text-amber-900 mb-2">Cons</h5>
              <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                {results.recommended.unit.cons.map((con: string, idx: number) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Operating Costs</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Daily:</span>
                <p className="text-xl font-bold text-blue-900">${results.dailyCost.toFixed(2)}</p>
                <p className="text-xs text-blue-600">{results.dailyHours} hrs/day</p>
              </div>
              <div>
                <span className="text-blue-700">Monthly:</span>
                <p className="text-xl font-bold text-blue-900">${results.monthlyCost.toFixed(0)}</p>
                <p className="text-xs text-blue-600">{(results.kwhPerDay * 30).toFixed(0)} kWh</p>
              </div>
              <div>
                <span className="text-blue-700">vs Window AC:</span>
                <p className="text-xl font-bold text-blue-900">+30%</p>
                <p className="text-xs text-blue-600">Higher cost</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <h4 className="font-semibold text-gray-900">Noise Level Context</h4>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Your unit ({results.recommended.unit.noise} dB):</span>
                <span className="font-medium">
                  {results.recommended.unit.noise <= 50 ? 'Quiet conversation' :
                   results.recommended.unit.noise <= 55 ? 'Normal conversation' :
                   'Moderate background noise'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Library:</span>
                <span>40 dB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Refrigerator:</span>
                <span>50 dB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Normal conversation:</span>
                <span>60 dB</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Small Room Cooling Tips</h4>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>Position near a window for shortest exhaust hose run</li>
              <li>Use blackout curtains during peak sun hours</li>
              <li>Run a small fan to circulate cool air</li>
              {results.roomType === 'bedroom' && <li>Set timer to start 30 min before bedtime</li>}
              {results.roomType === 'dorm' && <li>Check dorm policies - some ban portable ACs</li>}
              <li>Empty condensate tank daily in humid climates</li>
              {results.recommended.unit.btu < 6000 && <li className="font-bold">Consider a window AC if possible - better cooling at this size</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}