'use client';

import { useState } from 'react';
import { DollarSign, MapPin, Droplets, TrendingUp } from 'lucide-react';

// State electricity rates (cents/kWh) - 2024 data
const stateRates: Record<string, { rate: number; name: string }> = {
  'AL': { rate: 14.91, name: 'Alabama' },
  'AK': { rate: 24.42, name: 'Alaska' },
  'AZ': { rate: 13.73, name: 'Arizona' },
  'AR': { rate: 12.82, name: 'Arkansas' },
  'CA': { rate: 29.45, name: 'California' },
  'CO': { rate: 14.87, name: 'Colorado' },
  'CT': { rate: 25.49, name: 'Connecticut' },
  'DE': { rate: 14.05, name: 'Delaware' },
  'FL': { rate: 13.85, name: 'Florida' },
  'GA': { rate: 13.73, name: 'Georgia' },
  'HI': { rate: 44.19, name: 'Hawaii' },
  'ID': { rate: 11.34, name: 'Idaho' },
  'IL': { rate: 15.83, name: 'Illinois' },
  'IN': { rate: 14.79, name: 'Indiana' },
  'IA': { rate: 13.81, name: 'Iowa' },
  'KS': { rate: 14.33, name: 'Kansas' },
  'KY': { rate: 12.82, name: 'Kentucky' },
  'LA': { rate: 12.15, name: 'Louisiana' },
  'ME': { rate: 22.87, name: 'Maine' },
  'MD': { rate: 14.48, name: 'Maryland' },
  'MA': { rate: 25.21, name: 'Massachusetts' },
  'MI': { rate: 17.72, name: 'Michigan' },
  'MN': { rate: 14.36, name: 'Minnesota' },
  'MS': { rate: 13.15, name: 'Mississippi' },
  'MO': { rate: 13.53, name: 'Missouri' },
  'MT': { rate: 12.70, name: 'Montana' },
  'NE': { rate: 12.07, name: 'Nebraska' },
  'NV': { rate: 12.54, name: 'Nevada' },
  'NH': { rate: 23.15, name: 'New Hampshire' },
  'NJ': { rate: 16.84, name: 'New Jersey' },
  'NM': { rate: 14.37, name: 'New Mexico' },
  'NY': { rate: 21.88, name: 'New York' },
  'NC': { rate: 12.44, name: 'North Carolina' },
  'ND': { rate: 11.66, name: 'North Dakota' },
  'OH': { rate: 14.22, name: 'Ohio' },
  'OK': { rate: 12.49, name: 'Oklahoma' },
  'OR': { rate: 12.16, name: 'Oregon' },
  'PA': { rate: 16.42, name: 'Pennsylvania' },
  'RI': { rate: 25.27, name: 'Rhode Island' },
  'SC': { rate: 13.70, name: 'South Carolina' },
  'SD': { rate: 13.04, name: 'South Dakota' },
  'TN': { rate: 12.51, name: 'Tennessee' },
  'TX': { rate: 13.30, name: 'Texas' },
  'UT': { rate: 11.23, name: 'Utah' },
  'VT': { rate: 20.24, name: 'Vermont' },
  'VA': { rate: 13.52, name: 'Virginia' },
  'WA': { rate: 11.38, name: 'Washington' },
  'WV': { rate: 13.72, name: 'West Virginia' },
  'WI': { rate: 15.69, name: 'Wisconsin' },
  'WY': { rate: 11.55, name: 'Wyoming' }
};

interface HeaterSpecs {
  type: string;
  capacity: number;
  watts: number;
  efficiency: number;
  standbyLoss: number; // kWh/day
}

const heaterTypes: Record<string, HeaterSpecs> = {
  'tank-40': {
    type: '40 Gallon Tank',
    capacity: 40,
    watts: 4500,
    efficiency: 0.90,
    standbyLoss: 1.2
  },
  'tank-50': {
    type: '50 Gallon Tank',
    capacity: 50,
    watts: 4500,
    efficiency: 0.90,
    standbyLoss: 1.4
  },
  'tank-80': {
    type: '80 Gallon Tank',
    capacity: 80,
    watts: 4500,
    efficiency: 0.90,
    standbyLoss: 1.8
  },
  'heat-pump': {
    type: 'Heat Pump (50 gal)',
    capacity: 50,
    watts: 2000,
    efficiency: 3.5, // COP
    standbyLoss: 0.5
  },
  'tankless': {
    type: 'Tankless Electric',
    capacity: 999,
    watts: 18000,
    efficiency: 0.98,
    standbyLoss: 0
  }
};

export default function WaterHeatingCostCalculator() {
  const [state, setState] = useState('CA');
  const [heaterType, setHeaterType] = useState('tank-50');
  const [householdSize, setHouseholdSize] = useState('3');
  const [usage, setUsage] = useState('average');
  const [results, setResults] = useState<any>(null);

  const calculateCost = () => {
    const stateData = stateRates[state];
    const heater = heaterTypes[heaterType];
    const people = parseInt(householdSize);
    const rate = stateData.rate / 100; // Convert to dollars

    // Gallons per day based on household and usage
    let gallonsPerDay = people * 20; // Base usage
    if (usage === 'low') gallonsPerDay *= 0.75;
    else if (usage === 'high') gallonsPerDay *= 1.5;

    // Energy to heat water (BTU)
    const tempRise = 70; // 50°F to 120°F
    const btuPerDay = gallonsPerDay * 8.34 * tempRise;
    const kwhPerDay = btuPerDay / 3412;

    // Actual energy used (accounting for efficiency)
    let actualKwhPerDay: number;
    if (heater.type.includes('Heat Pump')) {
      actualKwhPerDay = kwhPerDay / heater.efficiency; // COP
    } else {
      actualKwhPerDay = kwhPerDay / heater.efficiency;
    }

    // Add standby losses
    actualKwhPerDay += heater.standbyLoss;

    // Calculate costs
    const dailyCost = actualKwhPerDay * rate;
    const monthlyCost = dailyCost * 30.4;
    const annualCost = dailyCost * 365;

    // Compare to other states
    const nationalAvg = Object.values(stateRates).reduce((sum, s) => sum + s.rate, 0) / Object.keys(stateRates).length;
    const cheapestState = Object.entries(stateRates).reduce((min, [key, val]) => 
      val.rate < min[1].rate ? [key, val] : min
    );
    const mostExpensiveState = Object.entries(stateRates).reduce((max, [key, val]) => 
      val.rate > max[1].rate ? [key, val] : max
    );

    // Savings calculations
    const tankCost = heaterType.includes('tank') ? annualCost : 
      (kwhPerDay / 0.90 + 1.4) * rate * 365; // Standard tank baseline
    const heatPumpCost = (kwhPerDay / 3.5 + 0.5) * rate * 365;
    const heatPumpSavings = tankCost - heatPumpCost;

    setResults({
      stateData,
      heater,
      gallonsPerDay,
      kwhPerDay,
      actualKwhPerDay,
      dailyCost,
      monthlyCost,
      annualCost,
      nationalAvg,
      cheapestState,
      mostExpensiveState,
      heatPumpSavings,
      rate,
      people
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Droplets className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">State-Specific Water Heating Cost Calculator</h3>
          <p className="text-sm text-gray-600">Calculate your electric water heating costs based on your state's rates</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(stateRates)
                .sort((a, b) => a[1].name.localeCompare(b[1].name))
                .map(([code, data]) => (
                  <option key={code} value={code}>
                    {data.name} ({data.rate}¢/kWh)
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Water Heater Type
            </label>
            <select
              value={heaterType}
              onChange={(e) => setHeaterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(heaterTypes).map(([key, data]) => (
                <option key={key} value={key}>{data.type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Household Size
            </label>
            <select
              value={householdSize}
              onChange={(e) => setHouseholdSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6+ People</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hot Water Usage
            </label>
            <select
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low (Quick showers)</option>
              <option value="average">Average</option>
              <option value="high">High (Long showers, frequent laundry)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateCost}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Cost
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Your Annual Cost: ${results.annualCost.toFixed(0)}</h4>
            </div>
            <p className="text-sm text-blue-700">
              In {results.stateData.name}, your {results.heater.type.toLowerCase()} water heater costs ${results.monthlyCost.toFixed(2)}/month 
              to heat {results.gallonsPerDay.toFixed(0)} gallons daily for {results.people} {results.people === 1 ? 'person' : 'people'}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Daily Breakdown</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gallons heated:</span>
                  <span className="font-medium">{results.gallonsPerDay.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Energy used:</span>
                  <span className="font-medium">{results.actualKwhPerDay.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily cost:</span>
                  <span className="font-medium">${results.dailyCost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Monthly Cost</h5>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">${results.monthlyCost.toFixed(0)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {results.actualKwhPerDay.toFixed(0) * 30} kWh/month
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Annual Cost</h5>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">${results.annualCost.toFixed(0)}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {(results.actualKwhPerDay * 365).toFixed(0)} kWh/year
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">State Comparison</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-700">Your State:</span>
                <p className="font-bold text-green-900">{results.stateData.name}</p>
                <p className="text-green-600">{results.stateData.rate}¢/kWh</p>
              </div>
              <div>
                <span className="text-green-700">Cheapest State:</span>
                <p className="font-bold text-green-900">{results.cheapestState[1].name}</p>
                <p className="text-green-600">{results.cheapestState[1].rate}¢/kWh</p>
                <p className="text-xs">Would save ${(results.annualCost - (results.actualKwhPerDay * 365 * results.cheapestState[1].rate / 100)).toFixed(0)}/yr</p>
              </div>
              <div>
                <span className="text-green-700">Most Expensive:</span>
                <p className="font-bold text-green-900">{results.mostExpensiveState[1].name}</p>
                <p className="text-green-600">{results.mostExpensiveState[1].rate}¢/kWh</p>
                <p className="text-xs">Would cost ${((results.actualKwhPerDay * 365 * results.mostExpensiveState[1].rate / 100) - results.annualCost).toFixed(0)} more/yr</p>
              </div>
            </div>
          </div>

          {!heaterType.includes('heat-pump') && results.heatPumpSavings > 0 && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-900">Heat Pump Savings Potential</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Switching to a heat pump water heater would save approximately <span className="font-bold">${results.heatPumpSavings.toFixed(0)}/year</span> 
                ({((results.heatPumpSavings / results.annualCost) * 100).toFixed(0)}% reduction). 
                With {results.stateData.name}'s electricity rate of {results.stateData.rate}¢/kWh, 
                a heat pump water heater would pay for itself in {(1500 / results.heatPumpSavings).toFixed(1)} years.
              </p>
            </div>
          )}

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Cost Reduction Tips</h4>
            <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
              <li>Lower temperature to 120°F (saves 3-5% per 10°F reduction)</li>
              <li>Install low-flow showerheads (saves 25-60% on shower water)</li>
              <li>Fix dripping faucets (1 drip/sec wastes 3,000 gallons/year)</li>
              <li>Insulate hot water pipes (saves 2-4% annually)</li>
              <li>Add tank insulation blanket for older units (saves 4-9%)</li>
              {results.stateData.rate > 15 && <li className="font-bold">Consider solar or heat pump water heater in your high-rate state</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}