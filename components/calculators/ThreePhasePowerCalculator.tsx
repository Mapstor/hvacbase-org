'use client';

import { useState } from 'react';
import { Calculator, Zap, BarChart, TrendingUp, Info } from 'lucide-react';

const voltageConfigurations = [
  { value: '208', name: '208V (Low Voltage)', common: true },
  { value: '240', name: '240V (Low Voltage)', common: true },
  { value: '277', name: '277V (High Leg)', common: false },
  { value: '480', name: '480V (Medium Voltage)', common: true },
  { value: '600', name: '600V (Medium Voltage)', common: false },
  { value: '4160', name: '4160V (High Voltage)', common: false }
];

const connectionTypes = [
  { value: 'wye', name: 'Wye (Star) Connection', factor: Math.sqrt(3) },
  { value: 'delta', name: 'Delta Connection', factor: Math.sqrt(3) }
];

export default function ThreePhasePowerCalculator() {
  const [voltage, setVoltage] = useState('480');
  const [current, setCurrent] = useState('20');
  const [powerFactor, setPowerFactor] = useState('0.85');
  const [connectionType, setConnectionType] = useState('wye');
  const [inputType, setInputType] = useState('line'); // line or phase
  const [calculated, setCalculated] = useState(false);
  
  // Parse inputs
  const volts = parseFloat(voltage);
  const amps = parseFloat(current);
  const pf = parseFloat(powerFactor);
  const selectedConnection = connectionTypes.find(c => c.value === connectionType);
  
  // Calculate three-phase power
  let apparentPower, realPower, reactivePower;
  
  if (inputType === 'line') {
    // Line-to-line voltage and line current
    apparentPower = Math.sqrt(3) * volts * amps; // VA
  } else {
    // Phase voltage and phase current
    apparentPower = 3 * volts * amps; // VA
  }
  
  realPower = apparentPower * pf; // Watts
  reactivePower = Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(realPower, 2)); // VAR
  
  // Calculate line and phase values
  let lineVoltage, phaseVoltage, lineCurrent, phaseCurrent;
  
  if (connectionType === 'wye') {
    if (inputType === 'line') {
      lineVoltage = volts;
      phaseVoltage = volts / Math.sqrt(3);
      lineCurrent = amps;
      phaseCurrent = amps;
    } else {
      phaseVoltage = volts;
      lineVoltage = volts * Math.sqrt(3);
      phaseCurrent = amps;
      lineCurrent = amps;
    }
  } else { // delta
    if (inputType === 'line') {
      lineVoltage = volts;
      phaseVoltage = volts;
      lineCurrent = amps;
      phaseCurrent = amps / Math.sqrt(3);
    } else {
      phaseVoltage = volts;
      lineVoltage = volts;
      phaseCurrent = amps;
      lineCurrent = amps * Math.sqrt(3);
    }
  }
  
  // Power per phase
  const powerPerPhase = realPower / 3;
  
  // Convert to different units
  const powerKW = realPower / 1000;
  const powerHP = realPower / 746; // 1 HP = 746 watts
  const apparentPowerKVA = apparentPower / 1000;
  
  // Power factor as percentage
  const powerFactorPercent = (pf * 100).toFixed(1);
  
  // Current per phase and total
  const totalCurrent = lineCurrent * 3; // Total current draw
  
  // Energy calculations
  const dailyKWh = (realPower * 24) / 1000;
  const monthlyKWh = dailyKWh * 30;
  
  // Wire sizing estimate (very rough)
  const wireSize = lineCurrent <= 20 ? '12 AWG' :
                   lineCurrent <= 30 ? '10 AWG' :
                   lineCurrent <= 40 ? '8 AWG' :
                   lineCurrent <= 55 ? '6 AWG' :
                   lineCurrent <= 75 ? '4 AWG' :
                   lineCurrent <= 100 ? '2 AWG' :
                   lineCurrent <= 130 ? '1 AWG' :
                   lineCurrent <= 170 ? '2/0 AWG' :
                   lineCurrent <= 200 ? '3/0 AWG' : '4/0+ AWG';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-indigo-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Three-Phase Power Calculator</h2>
          <p className="text-sm text-gray-600">Calculate power, current, and electrical parameters for three-phase systems</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Connection Type
            </label>
            <select
              value={connectionType}
              onChange={(e) => setConnectionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {connectionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Type
            </label>
            <select
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="line">Line Values (Line-to-Line)</option>
              <option value="phase">Phase Values</option>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="480"
              min="100"
              max="15000"
            />
            <p className="text-xs text-gray-500 mt-1">
              {inputType === 'line' ? 'Line-to-line voltage' : 'Phase voltage'}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="20"
              min="0.1"
              max="5000"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">
              {inputType === 'line' ? 'Line current' : 'Phase current'}
            </p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power Factor
            </label>
            <input
              type="number"
              value={powerFactor}
              onChange={(e) => setPowerFactor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="0.85"
              min="0.1"
              max="1.0"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">Typical: 0.8-0.95 for motors, 1.0 for resistive loads</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Three-Phase Power
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Three-Phase Power Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Total Power */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Real Power</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {Math.round(realPower).toLocaleString()}
                </p>
                <p className="text-lg font-medium text-gray-700">Watts</p>
                <div className="pt-2 border-t border-indigo-200 mt-4">
                  <p className="text-sm text-gray-600">{powerKW.toFixed(2)} kW</p>
                  <p className="text-sm text-gray-600">{powerHP.toFixed(2)} HP</p>
                </div>
              </div>
            </div>
            
            {/* Power Triangle */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <BarChart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Power Components</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Apparent Power:</span>
                    <span className="font-medium">{apparentPowerKVA.toFixed(1)} kVA</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Real Power:</span>
                    <span className="font-medium">{powerKW.toFixed(1)} kW</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reactive Power:</span>
                    <span className="font-medium">{(reactivePower/1000).toFixed(1)} kVAR</span>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Power Factor:</span>
                      <span className="font-semibold text-blue-600">{powerFactorPercent}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Line and Phase Values */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Electrical Parameters</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Line Voltage:</span>
                    <span className="font-medium">{Math.round(lineVoltage)}V</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phase Voltage:</span>
                    <span className="font-medium">{Math.round(phaseVoltage)}V</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Line Current:</span>
                    <span className="font-medium">{lineCurrent.toFixed(1)}A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phase Current:</span>
                    <span className="font-medium">{phaseCurrent.toFixed(1)}A</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Per Phase Analysis */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Per Phase Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Power per phase:</span>
                  <span className="font-medium">{(powerPerPhase/1000).toFixed(2)} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Connection:</span>
                  <span className="font-medium">{connectionType === 'wye' ? 'Wye (Y)' : 'Delta (Δ)'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total phases:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. wire size:</span>
                  <span className="font-medium">{wireSize}</span>
                </div>
              </div>
            </div>
            
            {/* Energy Consumption */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Energy Consumption</h4>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Daily (24/7):</span>
                  <span className="font-medium">{dailyKWh.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly (24/7):</span>
                  <span className="font-medium">{monthlyKWh.toFixed(0)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per hour:</span>
                  <span className="font-medium">$0.16 × {powerKW.toFixed(2)} = ${(powerKW * 0.16).toFixed(3)}</span>
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  Assumes continuous operation
                </p>
              </div>
            </div>
            
            {/* Voltage Standards */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Common 3φ Voltages
              </h4>
              <div className="space-y-1 text-xs text-blue-800">
                <div className="flex justify-between">
                  <span>208V:</span>
                  <span>Commercial low voltage</span>
                </div>
                <div className="flex justify-between">
                  <span>240V:</span>
                  <span>Small commercial</span>
                </div>
                <div className="flex justify-between">
                  <span>480V:</span>
                  <span>Most common industrial</span>
                </div>
                <div className="flex justify-between">
                  <span>600V:</span>
                  <span>Heavy industrial</span>
                </div>
                <div className="flex justify-between">
                  <span>4160V+:</span>
                  <span>Distribution/transmission</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection Diagram Info */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">
              {connectionType === 'wye' ? 'Wye (Y) Connection' : 'Delta (Δ) Connection'} Characteristics
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-800">
              <div>
                <p className="font-medium mb-1">Voltage Relationships:</p>
                {connectionType === 'wye' ? (
                  <p>Line voltage = √3 × Phase voltage</p>
                ) : (
                  <p>Line voltage = Phase voltage</p>
                )}
              </div>
              <div>
                <p className="font-medium mb-1">Current Relationships:</p>
                {connectionType === 'wye' ? (
                  <p>Line current = Phase current</p>
                ) : (
                  <p>Line current = √3 × Phase current</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}