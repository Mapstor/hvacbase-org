'use client';

import { useState } from 'react';
import { Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemData {
  type: string;
  avgLifespan: number;
  minLifespan: number;
  maxLifespan: number;
  replacementCost: { min: number; max: number };
}

const hvacSystems: Record<string, SystemData> = {
  'central-ac': {
    type: 'Central Air Conditioner',
    avgLifespan: 15,
    minLifespan: 10,
    maxLifespan: 20,
    replacementCost: { min: 3500, max: 8000 }
  },
  'heat-pump': {
    type: 'Heat Pump',
    avgLifespan: 15,
    minLifespan: 10,
    maxLifespan: 20,
    replacementCost: { min: 4000, max: 10000 }
  },
  'gas-furnace': {
    type: 'Gas Furnace',
    avgLifespan: 18,
    minLifespan: 15,
    maxLifespan: 25,
    replacementCost: { min: 3000, max: 7500 }
  },
  'electric-furnace': {
    type: 'Electric Furnace',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 30,
    replacementCost: { min: 2000, max: 5500 }
  },
  'boiler': {
    type: 'Boiler',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 30,
    replacementCost: { min: 4000, max: 10000 }
  },
  'ductless-mini': {
    type: 'Ductless Mini-Split',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 25,
    replacementCost: { min: 3000, max: 8000 }
  }
};

export default function HVACLifespanCalculator() {
  const [systemType, setSystemType] = useState('central-ac');
  const [systemAge, setSystemAge] = useState('');
  const [repairCost, setRepairCost] = useState('');
  const [maintenanceFreq, setMaintenanceFreq] = useState('regular');
  const [efficiency, setEfficiency] = useState('normal');
  const [results, setResults] = useState<any>(null);

  const calculateLifespan = () => {
    const system = hvacSystems[systemType];
    const age = parseFloat(systemAge);
    const repair = parseFloat(repairCost);

    // Calculate adjusted lifespan based on maintenance
    let adjustedLifespan = system.avgLifespan;
    if (maintenanceFreq === 'regular') adjustedLifespan += 3;
    else if (maintenanceFreq === 'minimal') adjustedLifespan -= 3;
    else if (maintenanceFreq === 'none') adjustedLifespan -= 5;

    // Calculate remaining years
    const remainingYears = Math.max(0, adjustedLifespan - age);
    const percentLifeUsed = (age / adjustedLifespan) * 100;

    // Repair vs Replace Analysis
    const avgReplacementCost = (system.replacementCost.min + system.replacementCost.max) / 2;
    const repairThreshold = avgReplacementCost * 0.5; // 50% rule
    const repairRecommendation = repair > repairThreshold || age > system.avgLifespan * 0.75;

    // Calculate annual cost of waiting
    let efficiencyPenalty = 0;
    if (efficiency === 'low') efficiencyPenalty = 300;
    else if (efficiency === 'very-low') efficiencyPenalty = 600;

    const annualCostOfWaiting = efficiencyPenalty + (age > 10 ? 200 : 0); // Breakdown risk

    // Future repair probability
    const repairProbability = age > system.avgLifespan * 0.8 ? 'High' :
                             age > system.avgLifespan * 0.6 ? 'Moderate' : 'Low';

    setResults({
      system,
      age,
      repair,
      adjustedLifespan,
      remainingYears,
      percentLifeUsed,
      avgReplacementCost,
      repairThreshold,
      repairRecommendation,
      annualCostOfWaiting,
      repairProbability,
      maintenanceFreq,
      efficiency
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Clock className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">HVAC Lifespan & Repair vs Replace Calculator</h3>
          <p className="text-sm text-gray-600">Determine if you should repair or replace your HVAC system</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            System Type
          </label>
          <select
            value={systemType}
            onChange={(e) => setSystemType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(hvacSystems).map(([key, data]) => (
              <option key={key} value={key}>{data.type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current System Age (years)
          </label>
          <input
            type="number"
            value={systemAge}
            onChange={(e) => setSystemAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 12"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Repair Cost ($)
          </label>
          <input
            type="number"
            value={repairCost}
            onChange={(e) => setRepairCost(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maintenance Frequency
          </label>
          <select
            value={maintenanceFreq}
            onChange={(e) => setMaintenanceFreq(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="regular">Regular (Annual)</option>
            <option value="occasional">Occasional</option>
            <option value="minimal">Minimal</option>
            <option value="none">None</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current System Efficiency
          </label>
          <select
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="high">High (Working Well)</option>
            <option value="normal">Normal</option>
            <option value="low">Low (Higher Bills)</option>
            <option value="very-low">Very Low (Much Higher Bills)</option>
          </select>
        </div>

        <button
          onClick={calculateLifespan}
          disabled={!systemAge || !repairCost}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className={`p-4 rounded-lg ${results.repairRecommendation ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {results.repairRecommendation ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <h4 className={`font-semibold ${results.repairRecommendation ? 'text-red-900' : 'text-green-900'}`}>
                Recommendation: {results.repairRecommendation ? 'REPLACE' : 'REPAIR'}
              </h4>
            </div>
            <p className={`text-sm ${results.repairRecommendation ? 'text-red-700' : 'text-green-700'}`}>
              {results.repairRecommendation 
                ? `Your system is ${results.age} years old (${Math.round(results.percentLifeUsed)}% of expected life) and the repair cost exceeds economic thresholds. Replacement is recommended.`
                : `Your repair cost is reasonable for a ${results.age}-year-old system. Repairing is the economical choice.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">System Lifespan Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Lifespan:</span>
                  <span className="font-medium">{results.system.minLifespan}-{results.system.maxLifespan} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adjusted for Maintenance:</span>
                  <span className="font-medium">{results.adjustedLifespan} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Years:</span>
                  <span className="font-medium">{results.remainingYears.toFixed(1)} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Life Used:</span>
                  <span className="font-medium">{Math.round(results.percentLifeUsed)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Cost Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Repair Cost:</span>
                  <span className="font-medium">${results.repair.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Replacement Cost:</span>
                  <span className="font-medium">${results.system.replacementCost.min.toLocaleString()}-${results.system.replacementCost.max.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">50% Rule Threshold:</span>
                  <span className="font-medium">${results.repairThreshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Cost of Waiting:</span>
                  <span className="font-medium">${results.annualCostOfWaiting}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Future Repair Risk</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      results.repairProbability === 'High' ? 'bg-red-500' :
                      results.repairProbability === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${results.percentLifeUsed}%` }}
                  />
                </div>
              </div>
              <span className={`font-medium ${
                results.repairProbability === 'High' ? 'text-red-700' :
                results.repairProbability === 'Moderate' ? 'text-yellow-700' : 'text-green-700'
              }`}>
                {results.repairProbability} Risk
              </span>
            </div>
            <p className="text-sm text-blue-700 mt-2">
              {results.repairProbability === 'High' 
                ? 'System is nearing end of life. Expect frequent repairs and decreased efficiency.'
                : results.repairProbability === 'Moderate'
                ? 'System is middle-aged. Monitor performance and plan for replacement within 3-5 years.'
                : 'System is relatively young. Regular maintenance will maximize lifespan.'}
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Professional Insight</h4>
            <p className="text-sm text-amber-700">
              The "50% Rule" suggests replacing when repair costs exceed 50% of replacement cost. 
              Your repair represents {Math.round((results.repair / results.avgReplacementCost) * 100)}% of replacement cost. 
              {results.age > 15 ? ' Additionally, systems over 15 years old often have outdated refrigerants (R-22) that are expensive to replace.' : ''}
              {results.efficiency === 'low' || results.efficiency === 'very-low' ? ' Your current efficiency issues suggest potential savings of $300-600/year with a new high-efficiency system.' : ''}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}