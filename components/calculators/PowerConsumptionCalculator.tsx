'use client';

import { useState } from 'react';
import { Calculator, Zap, BarChart, Info, TrendingUp, CheckCircle, AlertTriangle, Settings, Activity } from 'lucide-react';

export default function PowerConsumptionCalculator() {
  const [voltage, setVoltage] = useState('120');
  const [current, setCurrent] = useState('12.5');
  const [powerFactor, setPowerFactor] = useState('1.0');
  const [phases, setPhases] = useState('single');
  const [calculated, setCalculated] = useState(false);
  
  // Calculate power consumption
  const volts = parseFloat(voltage);
  const amps = parseFloat(current);
  const pf = parseFloat(powerFactor);
  
  let apparentPower, realPower, reactivePower;
  
  if (phases === 'single') {
    apparentPower = volts * amps; // VA
    realPower = apparentPower * pf; // Watts
  } else {
    // Three-phase calculations
    apparentPower = Math.sqrt(3) * volts * amps; // VA
    realPower = apparentPower * pf; // Watts
  }
  
  reactivePower = Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(realPower, 2)); // VAR
  
  // Convert to different units
  const powerKW = realPower / 1000;
  const powerHP = realPower / 746; // 1 HP = 746 watts
  
  // Calculate energy consumption over time
  const dailyKWh = (realPower * 24) / 1000;
  const monthlyKWh = dailyKWh * 30;
  const yearlyKWh = monthlyKWh * 12;
  
  // Power factor percentage
  const powerFactorPercent = (pf * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-purple-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Power Consumption Calculator</h2>
          <p className="text-sm text-gray-600">Calculate electrical power consumption from voltage and current</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Type
            </label>
            <select
              value={phases}
              onChange={(e) => setPhases(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="single">Single Phase</option>
              <option value="three">Three Phase</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voltage (V)
            </label>
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="120"
              min="1"
              max="600"
            />
            <p className="text-xs text-gray-500 mt-1">
              {phases === 'single' ? 'Common: 120V, 240V' : 'Common: 208V, 240V, 480V'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current (A)
            </label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="12.5"
              min="0.1"
              max="1000"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Measured with clamp meter</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power Factor
            </label>
            <input
              type="number"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="1.0"
              min="0.1"
              max="1.0"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">1.0 for resistive loads, 0.8-0.9 for motors</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Power Consumption
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
              Electrical Power Analysis
            </h3>
            
            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Power Result */}
              <div className="lg:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Power Consumption</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Real Power (Watts)</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {Math.round(realPower).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">W ({powerKW.toFixed(2)} kW)</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Horsepower Equivalent</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {powerHP.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">HP (746W = 1HP)</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">System Configuration</p>
                    <div className="bg-white/60 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Voltage:</span>
                        <span className="font-medium">{voltage} V</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Current:</span>
                        <span className="font-medium">{current} A</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">System:</span>
                        <span className="font-medium">{phases === 'single' ? 'Single Phase' : 'Three Phase'}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-gray-700 font-semibold">Power Factor:</span>
                        <span className="font-bold text-purple-600">{powerFactorPercent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Power Quality Analysis */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Power Quality</h4>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-3">
                    <p className="text-lg font-bold text-blue-600">{powerFactorPercent}%</p>
                    <p className="text-sm text-gray-600">Power Factor</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {pf >= 0.95 ? 'Excellent efficiency' :
                       pf >= 0.85 ? 'Good efficiency' :
                       'Consider correction'}
                    </p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Apparent Power:</span>
                      <span className="font-medium">{Math.round(apparentPower)} VA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Real Power:</span>
                      <span className="font-medium">{Math.round(realPower)} W</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reactive Power:</span>
                      <span className="font-medium">{Math.round(reactivePower)} VAR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Energy Consumption & Load Analysis */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Energy Consumption */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Energy Consumption (Continuous Operation)
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Daily Consumption</span>
                      <span className="text-lg font-bold text-green-600">
                        {dailyKWh.toFixed(1)} kWh
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      24 hours continuous operation
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Monthly Consumption</span>
                      <span className="text-lg font-bold text-blue-600">
                        {monthlyKWh.toFixed(0)} kWh
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      30 days continuous operation
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Annual Consumption</span>
                      <span className="text-lg font-bold text-purple-600">
                        {(yearlyKWh/1000).toFixed(1)} MWh
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      365 days continuous operation
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Load Type Analysis */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-orange-500" />
                  Load Type Analysis
                </h4>
                <div className="space-y-4">
                  {pf === 1.0 && (
                    <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="font-semibold text-orange-800 mb-1">Resistive Load</p>
                      <p className="text-sm text-orange-700">
                        Perfect power factor indicates resistive load like heaters, incandescent bulbs, or toasters.
                      </p>
                    </div>
                  )}
                  
                  {pf >= 0.8 && pf < 1.0 && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-800 mb-1">Inductive Load</p>
                      <p className="text-sm text-blue-700">
                        Good power factor suggests motors, transformers, or other inductive equipment.
                      </p>
                    </div>
                  )}
                  
                  {pf < 0.8 && (
                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="font-semibold text-red-800 mb-1">Poor Power Factor</p>
                      <p className="text-sm text-red-700">
                        Low power factor may indicate switching power supplies, fluorescent lights, or motor issues. Consider power factor correction.
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Common Load Power Factors:</p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Resistive heaters:</span>
                        <span>1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Induction motors:</span>
                        <span>0.8-0.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LED lights:</span>
                        <span>0.9-1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fluorescent lights:</span>
                        <span>0.5-0.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Computer equipment:</span>
                        <span>0.6-0.8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Power Triangle Visualization */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Power Triangle Analysis
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-purple-800">S</span>
                  </div>
                  <p className="font-semibold text-gray-800">{Math.round(apparentPower)} VA</p>
                  <p className="text-sm text-gray-600">Apparent Power</p>
                  <p className="text-xs text-gray-500 mt-1">Total power drawn from source</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-green-800">P</span>
                  </div>
                  <p className="font-semibold text-gray-800">{Math.round(realPower)} W</p>
                  <p className="text-sm text-gray-600">Real Power</p>
                  <p className="text-xs text-gray-500 mt-1">Actual work performed</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-blue-800">Q</span>
                  </div>
                  <p className="font-semibold text-gray-800">{Math.round(reactivePower)} VAR</p>
                  <p className="text-sm text-gray-600">Reactive Power</p>
                  <p className="text-xs text-gray-500 mt-1">Power for magnetic fields</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white/60 rounded-lg">
                <p className="text-sm text-gray-700 text-center mb-2">
                  <strong>Power Factor = Real Power / Apparent Power = {pf.toFixed(3)} ({powerFactorPercent}%)</strong>
                </p>
                <p className="text-xs text-gray-600 text-center">
                  Higher power factor means more efficient use of electrical power. Unity (1.0) is ideal.
                </p>
              </div>
            </div>
            
            {/* Professional Disclaimer */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Electrical Safety & Professional Considerations</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• These calculations are based on steady-state conditions - actual power consumption may vary</p>
                    <p>• Always use proper electrical measurement equipment and follow safety procedures</p>
                    <p>• Three-phase calculations assume balanced loads - unbalanced loads require specialized analysis</p>
                    <p>• Power factor correction may be required for large inductive loads to avoid utility penalties</p>
                    <p>• For critical applications, consult with a licensed electrical engineer for detailed power analysis</p>
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