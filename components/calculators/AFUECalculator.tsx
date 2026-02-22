'use client';

import { useState } from 'react';
import { Flame, TrendingUp, DollarSign, Leaf } from 'lucide-react';

interface FurnaceData {
  afue: number;
  label: string;
  annualCost: number; // per 100k BTU heating load
}

const furnaceTypes: Record<string, FurnaceData> = {
  'old-60': { afue: 60, label: 'Old Low-Efficiency (60% AFUE)', annualCost: 1667 },
  'old-70': { afue: 70, label: 'Old Standard (70% AFUE)', annualCost: 1429 },
  'standard-80': { afue: 80, label: 'Standard Efficiency (80% AFUE)', annualCost: 1250 },
  'mid-85': { afue: 85, label: 'Mid-Efficiency (85% AFUE)', annualCost: 1176 },
  'high-90': { afue: 90, label: 'High-Efficiency (90% AFUE)', annualCost: 1111 },
  'high-92': { afue: 92, label: 'High-Efficiency (92% AFUE)', annualCost: 1087 },
  'high-95': { afue: 95, label: 'High-Efficiency (95% AFUE)', annualCost: 1053 },
  'ultra-97': { afue: 97, label: 'Ultra High-Efficiency (97% AFUE)', annualCost: 1031 },
  'ultra-98': { afue: 98, label: 'Ultra High-Efficiency (98% AFUE)', annualCost: 1020 }
};

const gasPrices: Record<string, number> = {
  'low': 0.60,
  'average': 1.00,
  'high': 1.40,
  'very-high': 1.80
};

export default function AFUECalculator() {
  const [currentAfue, setCurrentAfue] = useState('old-70');
  const [newAfue, setNewAfue] = useState('high-95');
  const [homeSize, setHomeSize] = useState('2000');
  const [gasPrice, setGasPrice] = useState('average');
  const [heatingDays, setHeatingDays] = useState('180');
  const [currentAge, setCurrentAge] = useState('15');
  const [results, setResults] = useState<any>(null);

  const calculateSavings = () => {
    const current = furnaceTypes[currentAfue];
    const newFurnace = furnaceTypes[newAfue];
    const sqft = parseFloat(homeSize);
    const days = parseFloat(heatingDays);
    const age = parseFloat(currentAge);
    const price = gasPrices[gasPrice];

    // BTU requirement estimation (simplified)
    const btusPerSqFt = days > 200 ? 50 : days > 150 ? 40 : 30;
    const totalBtus = sqft * btusPerSqFt;
    const therms = totalBtus / 100000;

    // Current costs
    const currentThermsUsed = therms / (current.afue / 100);
    const currentAnnualCost = currentThermsUsed * price * 100;

    // New costs
    const newThermsUsed = therms / (newFurnace.afue / 100);
    const newAnnualCost = newThermsUsed * price * 100;

    // Savings
    const annualSavings = currentAnnualCost - newAnnualCost;
    const percentSavings = (annualSavings / currentAnnualCost) * 100;
    const thermsSaved = currentThermsUsed - newThermsUsed;

    // CO2 reduction (5.3 kg CO2 per therm)
    const co2Reduction = thermsSaved * 5.3;

    // Payback calculation
    const installCost = newFurnace.afue >= 95 ? 6000 : newFurnace.afue >= 90 ? 5000 : 4000;
    const paybackYears = installCost / annualSavings;

    // 10-year and lifetime savings
    const tenYearSavings = annualSavings * 10;
    const lifetimeSavings = annualSavings * 20; // 20-year lifespan

    // Efficiency degradation adjustment for old furnace
    let degradationFactor = 1;
    if (age > 20) degradationFactor = 0.85;
    else if (age > 15) degradationFactor = 0.90;
    else if (age > 10) degradationFactor = 0.95;

    const adjustedCurrentCost = currentAnnualCost / degradationFactor;

    setResults({
      current,
      newFurnace,
      currentAnnualCost: adjustedCurrentCost,
      newAnnualCost,
      annualSavings,
      percentSavings,
      thermsSaved,
      co2Reduction,
      installCost,
      paybackYears,
      tenYearSavings,
      lifetimeSavings,
      sqft,
      days,
      price,
      currentThermsUsed: currentThermsUsed / degradationFactor,
      newThermsUsed
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-orange-100 p-3 rounded-lg">
          <Flame className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">AFUE Efficiency Savings Calculator</h3>
          <p className="text-sm text-gray-600">Calculate your savings by upgrading to a high-efficiency furnace</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Furnace Efficiency
            </label>
            <select
              value={currentAfue}
              onChange={(e) => setCurrentAfue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.entries(furnaceTypes).map(([key, data]) => (
                <option key={key} value={key}>{data.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Furnace Efficiency
            </label>
            <select
              value={newAfue}
              onChange={(e) => setNewAfue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {Object.entries(furnaceTypes).map(([key, data]) => (
                <option key={key} value={key}>{data.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Size (sq ft)
            </label>
            <input
              type="number"
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Furnace Age (years)
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 15"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Natural Gas Price
            </label>
            <select
              value={gasPrice}
              onChange={(e) => setGasPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="low">Low ($0.60/therm)</option>
              <option value="average">Average ($1.00/therm)</option>
              <option value="high">High ($1.40/therm)</option>
              <option value="very-high">Very High ($1.80/therm)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heating Days per Year
            </label>
            <select
              value={heatingDays}
              onChange={(e) => setHeatingDays(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="120">Mild Climate (120 days)</option>
              <option value="150">Moderate Climate (150 days)</option>
              <option value="180">Average Climate (180 days)</option>
              <option value="210">Cold Climate (210 days)</option>
              <option value="240">Very Cold Climate (240 days)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateSavings}
          disabled={!homeSize || parseFloat(newAfue) <= parseFloat(currentAfue)}
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          Calculate Savings
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Annual Savings: ${Math.round(results.annualSavings).toLocaleString()}</h4>
            </div>
            <p className="text-sm text-green-700">
              Upgrading from {results.current.afue}% to {results.newFurnace.afue}% AFUE will save you {results.percentSavings.toFixed(1)}% on heating costs.
              Your investment will pay for itself in {results.paybackYears.toFixed(1)} years.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h5 className="font-semibold text-gray-900">Efficiency Gain</h5>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">{results.current.afue}% AFUE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New:</span>
                  <span className="font-medium">{results.newFurnace.afue}% AFUE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Improvement:</span>
                  <span className="font-medium text-green-600">+{results.newFurnace.afue - results.current.afue}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h5 className="font-semibold text-gray-900">Cost Analysis</h5>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current/year:</span>
                  <span className="font-medium">${Math.round(results.currentAnnualCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New/year:</span>
                  <span className="font-medium">${Math.round(results.newAnnualCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved/year:</span>
                  <span className="font-medium text-green-600">${Math.round(results.annualSavings).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-600" />
                <h5 className="font-semibold text-gray-900">Gas Usage</h5>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">{Math.round(results.currentThermsUsed)} therms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New:</span>
                  <span className="font-medium">{Math.round(results.newThermsUsed)} therms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saved:</span>
                  <span className="font-medium text-green-600">{Math.round(results.thermsSaved)} therms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Long-Term Savings Projection</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700">5-Year Savings:</span>
                <p className="text-2xl font-bold text-blue-900">${Math.round(results.annualSavings * 5).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-blue-700">10-Year Savings:</span>
                <p className="text-2xl font-bold text-blue-900">${Math.round(results.tenYearSavings).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-blue-700">20-Year Savings:</span>
                <p className="text-2xl font-bold text-blue-900">${Math.round(results.lifetimeSavings).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              *Assumes stable gas prices. Actual savings may be higher with rising energy costs.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Environmental Impact</h4>
            </div>
            <p className="text-sm text-green-700">
              Annual CO₂ reduction: <span className="font-bold">{Math.round(results.co2Reduction).toLocaleString()} kg</span> 
              ({Math.round(results.co2Reduction * 2.2).toLocaleString()} lbs)
            </p>
            <p className="text-sm text-green-700 mt-1">
              Equivalent to planting {Math.round(results.co2Reduction / 21).toLocaleString()} trees per year or 
              removing a car from the road for {Math.round(results.co2Reduction / 404).toLocaleString()} months.
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Professional Insight</h4>
            <p className="text-sm text-amber-700">
              {results.newFurnace.afue >= 95 
                ? `Condensing furnaces (95%+ AFUE) extract heat from exhaust gases, requiring PVC venting. They're ideal for cold climates with ${results.days}+ heating days. `
                : results.newFurnace.afue >= 90
                ? `90-94% AFUE furnaces offer good efficiency without condensing technology. They use traditional metal venting and cost less to install. `
                : `80-85% AFUE furnaces meet minimum standards but miss significant savings opportunities. `}
              {results.paybackYears < 5 
                ? 'Your quick payback period makes this upgrade highly recommended.'
                : results.paybackYears < 8
                ? 'Your moderate payback period still makes this a solid investment.'
                : 'Consider utility rebates and tax credits to improve your payback period.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}