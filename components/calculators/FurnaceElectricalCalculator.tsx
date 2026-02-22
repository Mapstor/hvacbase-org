'use client';

import { useState } from 'react';
import { Zap, DollarSign, AlertCircle, BarChart } from 'lucide-react';

interface FurnaceSpecs {
  btu: number;
  blowerWatts: number;
  inducerWatts: number;
  igniterWatts: number;
  controlWatts: number;
  ecmSavings: number;
}

const furnaceSizes: Record<string, FurnaceSpecs> = {
  '40000': {
    btu: 40000,
    blowerWatts: 400,
    inducerWatts: 60,
    igniterWatts: 200,
    controlWatts: 10,
    ecmSavings: 0.5
  },
  '60000': {
    btu: 60000,
    blowerWatts: 500,
    inducerWatts: 75,
    igniterWatts: 200,
    controlWatts: 10,
    ecmSavings: 0.5
  },
  '80000': {
    btu: 80000,
    blowerWatts: 600,
    inducerWatts: 85,
    igniterWatts: 200,
    controlWatts: 10,
    ecmSavings: 0.5
  },
  '100000': {
    btu: 100000,
    blowerWatts: 750,
    inducerWatts: 100,
    igniterWatts: 200,
    controlWatts: 10,
    ecmSavings: 0.5
  },
  '120000': {
    btu: 120000,
    blowerWatts: 900,
    inducerWatts: 125,
    igniterWatts: 200,
    controlWatts: 10,
    ecmSavings: 0.5
  }
};

const electricityRates: Record<string, number> = {
  'low': 0.10,
  'average': 0.14,
  'high': 0.20,
  'very-high': 0.30
};

export default function FurnaceElectricalCalculator() {
  const [furnaceSize, setFurnaceSize] = useState('80000');
  const [blowerType, setBlowerType] = useState('psc');
  const [runHours, setRunHours] = useState('1200');
  const [electricRate, setElectricRate] = useState('average');
  const [fanOnlyHours, setFanOnlyHours] = useState('500');
  const [results, setResults] = useState<any>(null);

  const calculateUsage = () => {
    const specs = furnaceSizes[furnaceSize];
    const rate = electricityRates[electricRate];
    const heatingHours = parseFloat(runHours);
    const circulationHours = parseFloat(fanOnlyHours);

    // Adjust blower watts for ECM motors
    const actualBlowerWatts = blowerType === 'ecm' 
      ? specs.blowerWatts * specs.ecmSavings 
      : specs.blowerWatts;

    // Heating mode consumption
    const heatingWatts = actualBlowerWatts + specs.inducerWatts + specs.controlWatts;
    const startupWatts = heatingWatts + specs.igniterWatts;
    
    // Startup energy (igniter runs for ~30 seconds per cycle, assume 10 cycles/day for 180 days)
    const startupCycles = (heatingHours / 120) * 10; // Rough estimate
    const startupKwh = (specs.igniterWatts * 0.5 / 60) * startupCycles / 1000;
    
    // Running energy
    const runningKwh = (heatingWatts * heatingHours) / 1000;
    
    // Fan-only mode energy
    const fanOnlyKwh = (actualBlowerWatts * circulationHours) / 1000;
    
    // Total consumption
    const totalKwh = runningKwh + startupKwh + fanOnlyKwh;
    const annualCost = totalKwh * rate;

    // Monthly breakdown (assuming 6-month heating season)
    const monthlyKwhHeating = runningKwh / 6;
    const monthlyCostHeating = monthlyKwhHeating * rate;

    // Daily usage during heating season
    const dailyHoursHeating = heatingHours / 180; // 180 heating days
    const dailyKwhHeating = (heatingWatts * dailyHoursHeating) / 1000;
    const dailyCostHeating = dailyKwhHeating * rate;

    // Comparisons
    const ecmSavings = blowerType === 'psc' 
      ? ((specs.blowerWatts - specs.blowerWatts * specs.ecmSavings) * (heatingHours + circulationHours) / 1000) * rate
      : 0;

    // Circuit requirements
    const maxAmps = startupWatts / 120;
    const recommendedBreaker = maxAmps < 12 ? 15 : maxAmps < 16 ? 20 : 30;

    setResults({
      specs,
      actualBlowerWatts,
      heatingWatts,
      startupWatts,
      totalKwh,
      annualCost,
      runningKwh,
      startupKwh,
      fanOnlyKwh,
      monthlyKwhHeating,
      monthlyCostHeating,
      dailyKwhHeating,
      dailyCostHeating,
      ecmSavings,
      maxAmps,
      recommendedBreaker,
      rate,
      heatingHours,
      circulationHours,
      blowerType
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <Zap className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Gas Furnace Electrical Usage Calculator</h3>
          <p className="text-sm text-gray-600">Calculate electricity consumption and costs for your gas furnace</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furnace Size (BTU)
            </label>
            <select
              value={furnaceSize}
              onChange={(e) => setFurnaceSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="40000">40,000 BTU (1-2 BR)</option>
              <option value="60000">60,000 BTU (2-3 BR)</option>
              <option value="80000">80,000 BTU (3-4 BR)</option>
              <option value="100000">100,000 BTU (4+ BR)</option>
              <option value="120000">120,000 BTU (Large Home)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blower Motor Type
            </label>
            <select
              value={blowerType}
              onChange={(e) => setBlowerType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="psc">PSC (Standard)</option>
              <option value="ecm">ECM (Variable Speed)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Heating Hours
            </label>
            <select
              value={runHours}
              onChange={(e) => setRunHours(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="600">Mild Climate (600 hrs)</option>
              <option value="900">Moderate Climate (900 hrs)</option>
              <option value="1200">Average Climate (1200 hrs)</option>
              <option value="1500">Cold Climate (1500 hrs)</option>
              <option value="2000">Very Cold Climate (2000 hrs)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fan-Only Circulation Hours
            </label>
            <input
              type="number"
              value={fanOnlyHours}
              onChange={(e) => setFanOnlyHours(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="e.g., 500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Electricity Rate
          </label>
          <select
            value={electricRate}
            onChange={(e) => setElectricRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="low">Low ($0.10/kWh)</option>
            <option value="average">Average ($0.14/kWh)</option>
            <option value="high">High ($0.20/kWh)</option>
            <option value="very-high">Very High ($0.30/kWh)</option>
          </select>
        </div>

        <button
          onClick={calculateUsage}
          className="w-full bg-yellow-600 text-white py-3 px-4 rounded-md hover:bg-yellow-700 transition-colors font-medium"
        >
          Calculate Usage
        </button>
      </div>

      {results && (
        <div className="mt-6 space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Annual Electricity Cost: ${results.annualCost.toFixed(2)}</h4>
            </div>
            <p className="text-sm text-blue-700">
              Your gas furnace uses {results.totalKwh.toFixed(0)} kWh per year for blower, inducer, and controls.
              {results.blowerType === 'psc' && ` Upgrading to an ECM blower would save $${results.ecmSavings.toFixed(0)} annually.`}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Power Draw</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Running:</span>
                  <span className="font-medium">{results.heatingWatts}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Starting:</span>
                  <span className="font-medium">{results.startupWatts}W</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fan Only:</span>
                  <span className="font-medium">{results.actualBlowerWatts}W</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Usage Breakdown</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Heating:</span>
                  <span className="font-medium">{results.runningKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fan Only:</span>
                  <span className="font-medium">{results.fanOnlyKwh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ignition:</span>
                  <span className="font-medium">{results.startupKwh.toFixed(0)} kWh</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-2">Electrical Needs</h5>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Amps:</span>
                  <span className="font-medium">{results.maxAmps.toFixed(1)}A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breaker:</span>
                  <span className="font-medium">{results.recommendedBreaker}A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wire:</span>
                  <span className="font-medium">{results.recommendedBreaker <= 15 ? '14 AWG' : '12 AWG'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-green-900">Cost Breakdown</h4>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-green-700">Daily (Heating Season):</span>
                <p className="text-xl font-bold text-green-900">${results.dailyCostHeating.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-green-700">Monthly (Heating Season):</span>
                <p className="text-xl font-bold text-green-900">${results.monthlyCostHeating.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-green-700">Annual Total:</span>
                <p className="text-xl font-bold text-green-900">${results.annualCost.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Component Power Breakdown</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Blower Motor ({results.blowerType.toUpperCase()})</span>
                  <span className="font-medium">{results.actualBlowerWatts}W</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: `${(results.actualBlowerWatts / results.startupWatts) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Inducer Motor</span>
                  <span className="font-medium">{results.specs.inducerWatts}W</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: `${(results.specs.inducerWatts / results.startupWatts) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Hot Surface Igniter</span>
                  <span className="font-medium">{results.specs.igniterWatts}W</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-orange-500 h-full" style={{ width: `${(results.specs.igniterWatts / results.startupWatts) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {results.blowerType === 'psc' && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-semibold text-yellow-900">ECM Motor Upgrade Potential</h4>
              </div>
              <p className="text-sm text-yellow-700">
                Your PSC blower motor uses {results.specs.blowerWatts}W. An ECM motor would use only {Math.round(results.specs.blowerWatts * results.specs.ecmSavings)}W, 
                saving ${results.ecmSavings.toFixed(0)} annually. ECM motors also provide better comfort with variable speeds and quieter operation.
                The upgrade typically costs $800-1200 but may qualify for utility rebates.
              </p>
            </div>
          )}

          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Professional Insight</h4>
            <p className="text-sm text-amber-700">
              Gas furnaces use surprisingly little electricity - about the same as 2-3 light bulbs when running. 
              The blower motor accounts for {Math.round((results.actualBlowerWatts / results.heatingWatts) * 100)}% of electrical usage.
              {results.maxAmps > 10 && ` Your furnace needs a dedicated ${results.recommendedBreaker}A circuit - sharing with other appliances may trip breakers.`}
              {results.circulationHours > 1000 && ' Running fan-only mode extensively adds significant cost - consider if continuous air circulation is necessary.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}