'use client';

import { useState } from 'react';
import { Calculator, Zap, Activity, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export default function GeneratorAmpsCalculator() {
  const [calculatorMode, setCalculatorMode] = useState<'watts-to-amps' | 'amps-to-watts' | 'generator-size'>('watts-to-amps');
  const [watts, setWatts] = useState('7500');
  const [voltage, setVoltage] = useState('120');
  const [amps, setAmps] = useState('30');
  const [powerFactor, setPowerFactor] = useState('1.0');
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [calculated, setCalculated] = useState(false);
  
  // Calculations
  const pf = parseFloat(powerFactor);
  let calculatedAmps = 0;
  let calculatedWatts = 0;
  let calculatedKW = 0;
  let calculatedKVA = 0;
  
  if (calculatorMode === 'watts-to-amps') {
    if (phases === 'single') {
      calculatedAmps = parseFloat(watts) / (parseFloat(voltage) * pf);
    } else {
      calculatedAmps = parseFloat(watts) / (Math.sqrt(3) * parseFloat(voltage) * pf);
    }
    calculatedKW = parseFloat(watts) / 1000;
    calculatedKVA = calculatedKW / pf;
  } else if (calculatorMode === 'amps-to-watts') {
    if (phases === 'single') {
      calculatedWatts = parseFloat(amps) * parseFloat(voltage) * pf;
    } else {
      calculatedWatts = Math.sqrt(3) * parseFloat(amps) * parseFloat(voltage) * pf;
    }
    calculatedKW = calculatedWatts / 1000;
    calculatedKVA = calculatedKW / pf;
  }
  
  // Wire gauge recommendation based on amps
  const getWireGauge = (amperage: number) => {
    if (amperage <= 15) return '14 AWG';
    if (amperage <= 20) return '12 AWG';
    if (amperage <= 30) return '10 AWG';
    if (amperage <= 40) return '8 AWG';
    if (amperage <= 55) return '6 AWG';
    if (amperage <= 70) return '4 AWG';
    if (amperage <= 85) return '3 AWG';
    if (amperage <= 95) return '2 AWG';
    if (amperage <= 110) return '1 AWG';
    if (amperage <= 125) return '1/0 AWG';
    if (amperage <= 145) return '2/0 AWG';
    if (amperage <= 165) return '3/0 AWG';
    if (amperage <= 195) return '4/0 AWG';
    return '250 kcmil or larger';
  };
  
  // Breaker sizing (125% of continuous load)
  const getBreakerSize = (amperage: number) => {
    const requiredSize = amperage * 1.25;
    const standardSizes = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200];
    return standardSizes.find(size => size >= requiredSize) || 200;
  };
  
  // Common generator sizes
  const generatorExamples = [
    { watts: 2000, label: '2,000W Inverter', amps120: 16.7, amps240: 8.3 },
    { watts: 3500, label: '3,500W Portable', amps120: 29.2, amps240: 14.6 },
    { watts: 5500, label: '5,500W Portable', amps120: 45.8, amps240: 22.9 },
    { watts: 7500, label: '7,500W Portable', amps120: 62.5, amps240: 31.3 },
    { watts: 10000, label: '10,000W Portable', amps120: 83.3, amps240: 41.7 },
    { watts: 14000, label: '14kW Standby', amps120: 116.7, amps240: 58.3 },
    { watts: 20000, label: '20kW Standby', amps120: 166.7, amps240: 83.3 },
    { watts: 22000, label: '22kW Whole House', amps120: 183.3, amps240: 91.7 }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-3 rounded-lg">
          <Activity className="w-6 h-6 text-purple-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Generator Amps Calculator</h2>
          <p className="text-sm text-gray-600">Convert between watts, amps, and voltage for generators</p>
        </div>
      </div>
      
      {/* Calculator Mode Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Calculator Mode
        </label>
        <div className="grid md:grid-cols-3 gap-2">
          <button
            onClick={() => { setCalculatorMode('watts-to-amps'); setCalculated(false); }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              calculatorMode === 'watts-to-amps'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Watts → Amps
          </button>
          <button
            onClick={() => { setCalculatorMode('amps-to-watts'); setCalculated(false); }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              calculatorMode === 'amps-to-watts'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Amps → Watts
          </button>
          <button
            onClick={() => { setCalculatorMode('generator-size'); setCalculated(false); }}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              calculatorMode === 'generator-size'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Generator Reference
          </button>
        </div>
      </div>
      
      {/* Input Fields */}
      {calculatorMode !== 'generator-size' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {calculatorMode === 'watts-to-amps' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generator Watts
                </label>
                <input
                  type="number"
                  value={watts}
                  onChange={(e) => setWatts(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="7500"
                />
                <p className="text-xs text-gray-500 mt-1">Running watts of generator</p>
              </div>
            )}
            
            {calculatorMode === 'amps-to-watts' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amperage
                </label>
                <input
                  type="number"
                  value={amps}
                  onChange={(e) => setAmps(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="30"
                  step="0.1"
                />
                <p className="text-xs text-gray-500 mt-1">Current in amps</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voltage
              </label>
              <select
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="120">120V (Standard outlet)</option>
                <option value="240">240V (Large appliance)</option>
                <option value="208">208V (Commercial 3-phase)</option>
                <option value="277">277V (Commercial lighting)</option>
                <option value="480">480V (Industrial)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phase Type
              </label>
              <select
                value={phases}
                onChange={(e) => setPhases(e.target.value as 'single' | 'three')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="single">Single Phase</option>
                <option value="three">Three Phase</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Power Factor
              </label>
              <input
                type="number"
                value={powerFactor}
                onChange={(e) => setPowerFactor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                min="0.1"
                max="1.0"
                step="0.05"
              />
              <p className="text-xs text-gray-500 mt-1">1.0 for resistive, 0.8 for motors</p>
            </div>
          </div>
          
          {/* Calculate Button */}
          <button
            onClick={() => setCalculated(true)}
            className="w-full md:w-auto md:mx-auto md:px-12 bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate
          </button>
        </div>
      )}
      
      {/* Generator Reference Mode */}
      {calculatorMode === 'generator-size' && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-4">Common Generator Amp Outputs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left font-medium text-gray-700">Generator Size</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700">Watts</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700">Amps @ 120V</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700">Amps @ 240V</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-700">Wire Size</th>
                </tr>
              </thead>
              <tbody>
                {generatorExamples.map((gen) => (
                  <tr key={gen.watts} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{gen.label}</td>
                    <td className="px-4 py-2 text-center">{gen.watts.toLocaleString()}W</td>
                    <td className="px-4 py-2 text-center">{gen.amps120.toFixed(1)}A</td>
                    <td className="px-4 py-2 text-center">{gen.amps240.toFixed(1)}A</td>
                    <td className="px-4 py-2 text-center">{getWireGauge(gen.amps240)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Results Section */}
      {calculated && calculatorMode !== 'generator-size' && (
        <div className="mt-8 space-y-6">
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              Calculation Results
            </h3>
          </div>
          
          {/* Main Results */}
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-3">Electrical Calculations</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {calculatorMode === 'watts-to-amps' ? (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Amperage Output</p>
                          <p className="text-2xl font-bold text-purple-600">{calculatedAmps.toFixed(1)}A</p>
                          <p className="text-xs text-gray-500">at {voltage}V</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Power</p>
                          <p className="text-xl font-bold text-gray-800">{calculatedKW.toFixed(2)} kW</p>
                          <p className="text-xs text-gray-500">{calculatedKVA.toFixed(2)} kVA</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Power Output</p>
                          <p className="text-2xl font-bold text-purple-600">{calculatedWatts.toFixed(0)}W</p>
                          <p className="text-xs text-gray-500">{calculatedKW.toFixed(2)} kW</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Apparent Power</p>
                          <p className="text-xl font-bold text-gray-800">{calculatedKVA.toFixed(2)} kVA</p>
                          <p className="text-xs text-gray-500">at PF {powerFactor}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-3 p-2 bg-white/60 rounded text-xs text-gray-700">
                    <strong>Formula used:</strong> {phases === 'single' ? 'Single Phase: ' : 'Three Phase: '}
                    {calculatorMode === 'watts-to-amps' 
                      ? phases === 'single' ? 'Amps = Watts ÷ (Volts × PF)' : 'Amps = Watts ÷ (√3 × Volts × PF)'
                      : phases === 'single' ? 'Watts = Amps × Volts × PF' : 'Watts = √3 × Amps × Volts × PF'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Electrical Requirements */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h4 className="font-semibold text-gray-800">Requirements</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600">Wire Size Needed:</p>
                  <p className="font-bold text-blue-600">
                    {getWireGauge(calculatorMode === 'watts-to-amps' ? calculatedAmps : parseFloat(amps))}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Breaker Size (125%):</p>
                  <p className="font-bold text-blue-600">
                    {getBreakerSize(calculatorMode === 'watts-to-amps' ? calculatedAmps : parseFloat(amps))}A
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Outlet Type:</p>
                  <p className="font-bold text-blue-600">
                    {voltage === '120' && calculatedAmps <= 15 ? 'NEMA 5-15 (standard)' :
                     voltage === '120' && calculatedAmps <= 20 ? 'NEMA 5-20' :
                     voltage === '120' && calculatedAmps <= 30 ? 'NEMA L5-30' :
                     voltage === '240' && calculatedAmps <= 30 ? 'NEMA L14-30' :
                     voltage === '240' && calculatedAmps <= 50 ? 'NEMA 14-50' :
                     'Hardwired connection'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800">Important Electrical Safety Notes</p>
                <p>• Always use 80% rule for continuous loads (generator capacity should be 125% of continuous load)</p>
                <p>• Wire gauge recommendations based on copper wire at 75°C rating, max 100ft run</p>
                <p>• Consult local electrical codes and licensed electrician for installation</p>
                <p>• Generator outlets have maximum amp ratings - verify before connecting loads</p>
                <p>• Starting/surge amps can be 2-3× running amps for motors and compressors</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}