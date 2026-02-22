'use client';

import { useState } from 'react';
import { Wind, Thermometer, Home, AlertCircle } from 'lucide-react';

interface RoomFactors {
  sqft: number;
  ceilingHeight: number;
  sunExposure: string;
  insulation: string;
  windows: string;
  occupants: number;
  heatSources: number;
}

interface ACUnit {
  btu: number;
  coverage: { min: number; max: number };
  power: number;
  amps: number;
  price: { min: number; max: number };
  features: string[];
}

const portableACUnits: Record<string, ACUnit> = {
  '10000': {
    btu: 10000,
    coverage: { min: 250, max: 450 },
    power: 900,
    amps: 8.5,
    price: { min: 300, max: 500 },
    features: ['Single hose', 'Basic controls', '2-speed fan']
  },
  '12000': {
    btu: 12000,
    coverage: { min: 350, max: 550 },
    power: 1100,
    amps: 10,
    price: { min: 400, max: 600 },
    features: ['Single/dual hose', 'Timer', '3-speed fan']
  },
  '14000': {
    btu: 14000,
    coverage: { min: 450, max: 700 },
    power: 1300,
    amps: 11.5,
    price: { min: 500, max: 800 },
    features: ['Dual hose available', 'Dehumidifier', 'Remote']
  },
  '15000': {
    btu: 15000,
    coverage: { min: 500, max: 800 },
    power: 1400,
    amps: 12.5,
    price: { min: 600, max: 900 },
    features: ['Dual hose recommended', 'WiFi options', 'Sleep mode']
  },
  '18000': {
    btu: 18000,
    coverage: { min: 700, max: 1000 },
    power: 1700,
    amps: 15,
    price: { min: 800, max: 1200 },
    features: ['Dual hose', 'Inverter available', 'Heat pump option']
  }
};

export default function LargeRoomPortableACCalculator() {
  const [roomSize, setRoomSize] = useState('600');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [sunExposure, setSunExposure] = useState('moderate');
  const [insulation, setInsulation] = useState('average');
  const [windows, setWindows] = useState('standard');
  const [occupants, setOccupants] = useState('2');
  const [appliances, setAppliances] = useState('1');
  const [climate, setClimate] = useState('moderate');
  const [results, setResults] = useState<any>(null);

  const calculateAC = () => {
    const sqft = parseFloat(roomSize);
    const ceiling = parseFloat(ceilingHeight);
    const people = parseInt(occupants);
    const heatSources = parseInt(appliances);

    // Base BTU calculation (20 BTU per sq ft for standard 8ft ceiling)
    let baseBTU = sqft * 20;

    // Adjust for ceiling height
    if (ceiling > 8) {
      baseBTU *= (ceiling / 8);
    }

    // Sun exposure adjustment
    let sunMultiplier = 1;
    if (sunExposure === 'high') sunMultiplier = 1.15;
    else if (sunExposure === 'low') sunMultiplier = 0.9;

    // Insulation adjustment
    let insulationMultiplier = 1;
    if (insulation === 'poor') insulationMultiplier = 1.2;
    else if (insulation === 'excellent') insulationMultiplier = 0.85;

    // Windows adjustment
    let windowMultiplier = 1;
    if (windows === 'large') windowMultiplier = 1.15;
    else if (windows === 'minimal') windowMultiplier = 0.95;

    // Climate adjustment
    let climateMultiplier = 1;
    if (climate === 'hot') climateMultiplier = 1.2;
    else if (climate === 'mild') climateMultiplier = 0.85;

    // Calculate adjusted BTU
    let adjustedBTU = baseBTU * sunMultiplier * insulationMultiplier * windowMultiplier * climateMultiplier;

    // Add for occupants (600 BTU per person beyond 2)
    if (people > 2) {
      adjustedBTU += (people - 2) * 600;
    }

    // Add for heat sources (400 BTU per appliance)
    adjustedBTU += heatSources * 400;

    // Portable AC efficiency penalty (30% less effective than window units)
    const portableAdjusted = adjustedBTU * 1.3;

    // Find recommended units
    const recommendedUnits = Object.entries(portableACUnits).filter(([key, unit]) => 
      unit.btu >= portableAdjusted * 0.9
    );

    const idealUnit = recommendedUnits[0] || ['18000', portableACUnits['18000']];
    const selectedUnit = portableACUnits[idealUnit[0]];

    // Check if room is too large
    const tooLarge = portableAdjusted > 18000;
    const needsMultiple = portableAdjusted > 15000;

    // Operating cost calculation
    const dailyHours = climate === 'hot' ? 10 : climate === 'moderate' ? 6 : 4;
    const seasonDays = climate === 'hot' ? 180 : climate === 'moderate' ? 120 : 90;
    const kwhPerDay = (selectedUnit.power / 1000) * dailyHours;
    const seasonalKwh = kwhPerDay * seasonDays;
    const electricRate = 0.14; // National average
    const dailyCost = kwhPerDay * electricRate;
    const seasonalCost = seasonalKwh * electricRate;

    // Circuit requirements
    const requiresDedicated = selectedUnit.amps > 12;

    setResults({
      sqft,
      baseBTU,
      adjustedBTU,
      portableAdjusted,
      recommendedUnits,
      idealUnit: idealUnit[0],
      selectedUnit,
      tooLarge,
      needsMultiple,
      dailyHours,
      seasonDays,
      kwhPerDay,
      seasonalKwh,
      dailyCost,
      seasonalCost,
      requiresDedicated,
      factors: {
        sunMultiplier,
        insulationMultiplier,
        windowMultiplier,
        climateMultiplier,
        occupantBTU: (people - 2) * 600,
        applianceBTU: heatSources * 400
      }
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Wind className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Large Room Portable AC Calculator</h3>
          <p className="text-sm text-gray-600">Find the right portable AC for large spaces (500+ sq ft)</p>
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
              placeholder="e.g., 600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ceiling Height (ft)
            </label>
            <select
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="8">8 ft (Standard)</option>
              <option value="9">9 ft</option>
              <option value="10">10 ft</option>
              <option value="12">12 ft (Vaulted)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sun Exposure
            </label>
            <select
              value={sunExposure}
              onChange={(e) => setSunExposure(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low (North-facing, shaded)</option>
              <option value="moderate">Moderate</option>
              <option value="high">High (South/West, direct sun)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insulation Quality
            </label>
            <select
              value={insulation}
              onChange={(e) => setInsulation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="poor">Poor (Old/drafty)</option>
              <option value="average">Average</option>
              <option value="excellent">Excellent (New/sealed)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Window Size
            </label>
            <select
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="minimal">Minimal (Few/small)</option>
              <option value="standard">Standard</option>
              <option value="large">Large (Many/floor-to-ceiling)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Climate Zone
            </label>
            <select
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="mild">Mild (70-80°F summers)</option>
              <option value="moderate">Moderate (80-90°F summers)</option>
              <option value="hot">Hot (90°F+ summers)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Regular Occupants
            </label>
            <select
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4+ People</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heat-Generating Appliances
            </label>
            <select
              value={appliances}
              onChange={(e) => setAppliances(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">None</option>
              <option value="1">1 (TV/Computer)</option>
              <option value="2">2 (TV + Gaming/Computer)</option>
              <option value="3">3+ (Multiple devices)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateAC}
          disabled={!roomSize}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          {results.tooLarge ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-900">Room Too Large for Single Portable AC</h4>
              </div>
              <p className="text-sm text-red-700">
                Your {results.sqft} sq ft room needs {Math.round(results.portableAdjusted).toLocaleString()} BTU, 
                exceeding the largest portable AC capacity. Consider:
              </p>
              <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
                <li>Installing a window or mini-split AC instead</li>
                <li>Using two 14,000 BTU portable units</li>
                <li>Improving insulation to reduce cooling load</li>
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  Recommended: {results.idealUnit} BTU Portable AC
                </h4>
              </div>
              <p className="text-sm text-green-700">
                For your {results.sqft} sq ft room requiring {Math.round(results.portableAdjusted).toLocaleString()} BTU cooling capacity.
                {results.needsMultiple && ' Consider dual-hose models for better efficiency in this large space.'}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">BTU Calculation Breakdown</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base BTU (20/sq ft):</span>
                  <span className="font-medium">{Math.round(results.baseBTU).toLocaleString()}</span>
                </div>
                {results.factors.sunMultiplier !== 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sun adjustment:</span>
                    <span className="font-medium">{results.factors.sunMultiplier > 1 ? '+' : ''}{Math.round((results.factors.sunMultiplier - 1) * 100)}%</span>
                  </div>
                )}
                {results.factors.insulationMultiplier !== 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insulation adjustment:</span>
                    <span className="font-medium">{results.factors.insulationMultiplier > 1 ? '+' : ''}{Math.round((results.factors.insulationMultiplier - 1) * 100)}%</span>
                  </div>
                )}
                {results.factors.occupantBTU > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Extra occupants:</span>
                    <span className="font-medium">+{results.factors.occupantBTU} BTU</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Portable AC adjustment (+30%):</span>
                  <span className="font-medium">{Math.round(results.portableAdjusted).toLocaleString()} BTU</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Unit Specifications</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Power Draw:</span>
                  <span className="font-medium">{results.selectedUnit.power}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amperage:</span>
                  <span className="font-medium">{results.selectedUnit.amps}A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage:</span>
                  <span className="font-medium">{results.selectedUnit.coverage.min}-{results.selectedUnit.coverage.max} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price Range:</span>
                  <span className="font-medium">${results.selectedUnit.price.min}-${results.selectedUnit.price.max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Circuit:</span>
                  <span className="font-medium">{results.requiresDedicated ? 'Dedicated 15A required' : 'Standard outlet OK'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Operating Cost Estimate</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Daily Cost:</span>
                <p className="text-2xl font-bold text-blue-900">${results.dailyCost.toFixed(2)}</p>
                <p className="text-xs text-blue-600">{results.dailyHours} hrs/day</p>
              </div>
              <div>
                <span className="text-blue-700">Monthly Cost:</span>
                <p className="text-2xl font-bold text-blue-900">${(results.dailyCost * 30).toFixed(0)}</p>
                <p className="text-xs text-blue-600">30 days</p>
              </div>
              <div>
                <span className="text-blue-700">Season Cost:</span>
                <p className="text-2xl font-bold text-blue-900">${results.seasonalCost.toFixed(0)}</p>
                <p className="text-xs text-blue-600">{results.seasonDays} days/year</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-amber-600" />
              <h4 className="font-semibold text-amber-900">Large Room Cooling Tips</h4>
            </div>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>Position the unit centrally for even cooling distribution</li>
              <li>Use ceiling fans to help circulate cool air throughout the space</li>
              <li>Seal the exhaust hose kit properly to prevent hot air infiltration</li>
              <li>Consider dual-hose models - they're 40% more efficient than single-hose</li>
              <li>Clean filters weekly in large spaces for maximum efficiency</li>
              {results.sqft > 700 && <li className="font-bold">For rooms over 700 sq ft, a mini-split may be more cost-effective long-term</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}