'use client';

import { useState } from 'react';
import { Droplets, AlertTriangle, CheckCircle, TrendingDown } from 'lucide-react';

interface HeaterData {
  type: string;
  avgLifespan: number;
  minLifespan: number;
  maxLifespan: number;
  replacementCost: { min: number; max: number };
  annualMaintenance: number;
}

const waterHeaters: Record<string, HeaterData> = {
  'gas-tank': {
    type: 'Gas Tank Water Heater',
    avgLifespan: 10,
    minLifespan: 8,
    maxLifespan: 12,
    replacementCost: { min: 1200, max: 2500 },
    annualMaintenance: 100
  },
  'electric-tank': {
    type: 'Electric Tank Water Heater',
    avgLifespan: 12,
    minLifespan: 10,
    maxLifespan: 15,
    replacementCost: { min: 1000, max: 2000 },
    annualMaintenance: 75
  },
  'gas-tankless': {
    type: 'Gas Tankless Water Heater',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 25,
    replacementCost: { min: 2500, max: 4500 },
    annualMaintenance: 150
  },
  'electric-tankless': {
    type: 'Electric Tankless Water Heater',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 25,
    replacementCost: { min: 1500, max: 3000 },
    annualMaintenance: 100
  },
  'heat-pump': {
    type: 'Heat Pump Water Heater',
    avgLifespan: 13,
    minLifespan: 10,
    maxLifespan: 15,
    replacementCost: { min: 2000, max: 3500 },
    annualMaintenance: 125
  },
  'solar': {
    type: 'Solar Water Heater',
    avgLifespan: 20,
    minLifespan: 15,
    maxLifespan: 25,
    replacementCost: { min: 4000, max: 8000 },
    annualMaintenance: 200
  }
};

const warningSignScores: Record<string, number> = {
  'rust': 3,
  'leaking': 5,
  'noisy': 2,
  'temperature': 3,
  'age': 2,
  'sediment': 2,
  'pilot': 2,
  'pressure': 3,
  'smell': 4
};

export default function WaterHeaterLifespanCalculator() {
  const [heaterType, setHeaterType] = useState('gas-tank');
  const [heaterAge, setHeaterAge] = useState('');
  const [waterHardness, setWaterHardness] = useState('moderate');
  const [maintenanceFreq, setMaintenanceFreq] = useState('annual');
  const [warningSigns, setWarningSigns] = useState<string[]>([]);
  const [repairCost, setRepairCost] = useState('');
  const [results, setResults] = useState<any>(null);

  const toggleWarningSign = (sign: string) => {
    setWarningSigns(prev => 
      prev.includes(sign) 
        ? prev.filter(s => s !== sign)
        : [...prev, sign]
    );
  };

  const calculateLifespan = () => {
    const heater = waterHeaters[heaterType];
    const age = parseFloat(heaterAge);
    const repair = parseFloat(repairCost) || 0;

    // Calculate adjusted lifespan
    let adjustedLifespan = heater.avgLifespan;
    
    // Water hardness adjustment
    if (waterHardness === 'very-hard') adjustedLifespan -= 3;
    else if (waterHardness === 'hard') adjustedLifespan -= 2;
    else if (waterHardness === 'soft') adjustedLifespan += 1;

    // Maintenance adjustment
    if (maintenanceFreq === 'never') adjustedLifespan -= 3;
    else if (maintenanceFreq === 'rare') adjustedLifespan -= 2;
    else if (maintenanceFreq === 'annual') adjustedLifespan += 1;

    // Calculate remaining years
    const remainingYears = Math.max(0, adjustedLifespan - age);
    const percentLifeUsed = (age / adjustedLifespan) * 100;

    // Calculate warning sign severity
    const totalWarningScore = warningSigns.reduce((sum, sign) => sum + warningSignScores[sign], 0);
    const criticalIssue = warningSigns.includes('leaking') || warningSigns.includes('smell');

    // Replacement recommendation
    const avgReplacementCost = (heater.replacementCost.min + heater.replacementCost.max) / 2;
    const repairThreshold = avgReplacementCost * 0.5;
    const shouldReplace = criticalIssue || 
                         repair > repairThreshold || 
                         age > adjustedLifespan * 0.8 || 
                         totalWarningScore >= 8;

    // Energy efficiency loss calculation
    let efficiencyLoss = 0;
    if (age > 8) efficiencyLoss = Math.min((age - 8) * 5, 30); // Up to 30% loss

    // Annual operating cost increase
    const baseOperatingCost = heaterType.includes('gas') ? 350 : 500;
    const currentOperatingCost = baseOperatingCost * (1 + efficiencyLoss / 100);
    const annualExtraCost = currentOperatingCost - baseOperatingCost;

    setResults({
      heater,
      age,
      repair,
      adjustedLifespan,
      remainingYears,
      percentLifeUsed,
      avgReplacementCost,
      repairThreshold,
      shouldReplace,
      totalWarningScore,
      criticalIssue,
      efficiencyLoss,
      annualExtraCost,
      waterHardness,
      maintenanceFreq
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Droplets className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Water Heater Lifespan Calculator</h3>
          <p className="text-sm text-gray-600">Determine when to repair or replace your water heater</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Heater Type
          </label>
          <select
            value={heaterType}
            onChange={(e) => setHeaterType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(waterHeaters).map(([key, data]) => (
              <option key={key} value={key}>{data.type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Age (years)
          </label>
          <input
            type="number"
            value={heaterAge}
            onChange={(e) => setHeaterAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 8"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Hardness Level
          </label>
          <select
            value={waterHardness}
            onChange={(e) => setWaterHardness(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="soft">Soft (0-3.5 gpg)</option>
            <option value="moderate">Moderate (3.5-7 gpg)</option>
            <option value="hard">Hard (7-10 gpg)</option>
            <option value="very-hard">Very Hard (10+ gpg)</option>
          </select>
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
            <option value="annual">Annual Flushing</option>
            <option value="occasional">Occasional (Every 2-3 years)</option>
            <option value="rare">Rare (Every 4+ years)</option>
            <option value="never">Never</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Warning Signs Present (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'rust', label: 'Rusty Water' },
              { id: 'leaking', label: 'Tank Leaking' },
              { id: 'noisy', label: 'Rumbling/Noises' },
              { id: 'temperature', label: 'Inconsistent Temperature' },
              { id: 'age', label: 'Over 10 Years Old' },
              { id: 'sediment', label: 'Sediment in Water' },
              { id: 'pilot', label: 'Pilot Light Issues' },
              { id: 'pressure', label: 'Low Water Pressure' },
              { id: 'smell', label: 'Rotten Egg Smell' }
            ].map(sign => (
              <label key={sign.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={warningSigns.includes(sign.id)}
                  onChange={() => toggleWarningSign(sign.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {sign.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Repair Cost ($ - Optional)
          </label>
          <input
            type="number"
            value={repairCost}
            onChange={(e) => setRepairCost(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 500"
          />
        </div>

        <button
          onClick={calculateLifespan}
          disabled={!heaterAge}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          Calculate
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className={`p-4 rounded-lg ${results.shouldReplace ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {results.shouldReplace ? (
                <AlertTriangle className="w-5 h-5 text-red-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <h4 className={`font-semibold ${results.shouldReplace ? 'text-red-900' : 'text-green-900'}`}>
                Recommendation: {results.shouldReplace ? 'REPLACE' : 'KEEP & MAINTAIN'}
              </h4>
            </div>
            <p className={`text-sm ${results.shouldReplace ? 'text-red-700' : 'text-green-700'}`}>
              {results.criticalIssue 
                ? 'Critical issues detected. Immediate replacement recommended for safety.'
                : results.shouldReplace 
                ? `Your ${results.age}-year-old water heater has reached ${Math.round(results.percentLifeUsed)}% of its expected life. Multiple warning signs indicate replacement is the best option.`
                : `Your water heater has ${results.remainingYears.toFixed(1)} years of expected life remaining. Continue with regular maintenance.`}
            </p>
          </div>

          {results.totalWarningScore > 0 && (
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 mb-2">Warning Sign Severity</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        results.totalWarningScore >= 10 ? 'bg-red-500' :
                        results.totalWarningScore >= 6 ? 'bg-amber-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(results.totalWarningScore * 10, 100)}%` }}
                    />
                  </div>
                </div>
                <span className={`font-medium ${
                  results.totalWarningScore >= 10 ? 'text-red-700' :
                  results.totalWarningScore >= 6 ? 'text-amber-700' : 'text-yellow-700'
                }`}>
                  {results.totalWarningScore >= 10 ? 'Critical' :
                   results.totalWarningScore >= 6 ? 'High' : 'Moderate'}
                </span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Lifespan Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Lifespan:</span>
                  <span className="font-medium">{results.heater.minLifespan}-{results.heater.maxLifespan} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adjusted for Conditions:</span>
                  <span className="font-medium">{results.adjustedLifespan} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining Life:</span>
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
                {results.repair > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Repair Cost:</span>
                    <span className="font-medium">${results.repair.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Replacement Cost:</span>
                  <span className="font-medium">${results.heater.replacementCost.min.toLocaleString()}-${results.heater.replacementCost.max.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">50% Rule Threshold:</span>
                  <span className="font-medium">${results.repairThreshold.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Energy Loss:</span>
                  <span className="font-medium">${Math.round(results.annualExtraCost)}/year</span>
                </div>
              </div>
            </div>
          </div>

          {results.efficiencyLoss > 0 && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Efficiency Loss: {results.efficiencyLoss}%</h4>
              </div>
              <p className="text-sm text-blue-700">
                Your {results.age}-year-old water heater has lost approximately {results.efficiencyLoss}% efficiency due to sediment buildup and component wear. 
                This adds roughly ${Math.round(results.annualExtraCost)} to your annual energy costs. 
                A new high-efficiency model could save ${Math.round(results.annualExtraCost * 1.5)}-${Math.round(results.annualExtraCost * 2)} per year.
              </p>
            </div>
          )}

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Professional Insight</h4>
            <p className="text-sm text-amber-700">
              {results.heater.type.includes('Tank') 
                ? `Tank water heaters typically fail suddenly when the tank corrodes through. ${results.age > 8 ? 'At ' + results.age + ' years, consider proactive replacement to avoid water damage.' : 'Annual flushing removes sediment and extends tank life.'}`
                : `Tankless units last longer but require annual descaling in hard water areas. ${results.waterHardness === 'hard' || results.waterHardness === 'very-hard' ? 'Your hard water significantly impacts lifespan - consider a water softener.' : 'Regular maintenance is crucial for longevity.'}`}
              {results.criticalIssue && ' Leaking tanks or gas odors are safety hazards requiring immediate attention.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}