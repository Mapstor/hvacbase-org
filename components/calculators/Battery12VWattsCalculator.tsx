'use client';

import { useState } from 'react';
import { Calculator, Battery, Zap, Clock, TrendingUp, Gauge } from 'lucide-react';

const commonLoads = [
  { value: 'led-lights', name: 'LED Light Strip (5m)', watts: 24, description: '12V LED strip lighting' },
  { value: 'car-fridge', name: '12V Car Fridge', watts: 45, description: 'Portable refrigerator' },
  { value: 'fan', name: '12V Fan', watts: 15, description: 'Small DC cooling fan' },
  { value: 'water-pump', name: 'Water Pump', watts: 60, description: '12V water circulation pump' },
  { value: 'radio', name: 'CB/Ham Radio', watts: 25, description: 'Two-way radio equipment' },
  { value: 'inverter-small', name: '300W Inverter Load', watts: 300, description: 'Small AC devices via inverter' },
  { value: 'inverter-medium', name: '600W Inverter Load', watts: 600, description: 'Medium AC devices via inverter' },
  { value: 'winch', name: '12V Winch', watts: 1200, description: 'Electric winch (peak load)' },
  { value: 'custom', name: 'Custom Load', watts: 100, description: 'Enter custom wattage' }
];

const batterySizes = [
  { value: '35', name: '35Ah (Small)', type: 'Group 24' },
  { value: '55', name: '55Ah (Medium)', type: 'Group 24F' },
  { value: '75', name: '75Ah (Large)', type: 'Group 31' },
  { value: '100', name: '100Ah (Deep Cycle)', type: 'Marine/RV' },
  { value: '150', name: '150Ah (Large Deep Cycle)', type: 'Marine/RV' },
  { value: '200', name: '200Ah (Extra Large)', type: 'Marine/RV' }
];

export default function Battery12VWattsCalculator() {
  const [batteryCapacity, setBatteryCapacity] = useState('100');
  const [loadType, setLoadType] = useState('led-lights');
  const [customWatts, setCustomWatts] = useState('100');
  const [operatingHours, setOperatingHours] = useState('4');
  const [depthOfDischarge, setDepthOfDischarge] = useState('50');
  const [batteryEfficiency, setBatteryEfficiency] = useState('85');
  const [temperature, setTemperature] = useState('68');
  const [calculated, setCalculated] = useState(false);
  
  // Get selected load data
  const selectedLoad = commonLoads.find(l => l.value === loadType);
  const loadWatts = loadType === 'custom' ? parseFloat(customWatts) : selectedLoad.watts;
  
  // Calculate current draw
  const currentAmps = loadWatts / 12; // Ohm's law: I = P/V
  
  // Calculate usable capacity
  const totalCapacity = parseFloat(batteryCapacity);
  const usableCapacity = totalCapacity * (parseFloat(depthOfDischarge) / 100);
  
  // Temperature derating factor (approximation)
  const tempF = parseFloat(temperature);
  const tempDerating = tempF < 32 ? 0.7 : tempF < 50 ? 0.85 : tempF < 80 ? 1.0 : 0.95;
  const adjustedCapacity = usableCapacity * tempDerating;
  
  // Calculate runtime
  const runtimeHours = (adjustedCapacity * (parseFloat(batteryEfficiency) / 100)) / currentAmps;
  const requestedHours = parseFloat(operatingHours);
  const canMeetRequirement = runtimeHours >= requestedHours;
  
  // Calculate power consumption
  const hourlyWattHours = loadWatts;
  const dailyWattHours = hourlyWattHours * requestedHours;
  const requiredBatteryCapacity = (dailyWattHours / 12) / (parseFloat(depthOfDischarge) / 100);
  
  // Voltage drop under load (simple approximation)
  const voltageDropEstimate = currentAmps * 0.02; // Rough estimate based on internal resistance
  const loadVoltage = 12 - voltageDropEstimate;
  
  // Charging calculations
  const recommendedChargeRate = totalCapacity * 0.1; // 10% of capacity (C/10 rate)
  const fastChargeRate = totalCapacity * 0.2; // 20% of capacity (C/5 rate)
  const chargeTimeHours = (totalCapacity - adjustedCapacity) / recommendedChargeRate;
  
  // Wire size recommendation (very simplified)
  const wireSize = currentAmps <= 10 ? '14 AWG' :
                   currentAmps <= 15 ? '12 AWG' :
                   currentAmps <= 20 ? '10 AWG' :
                   currentAmps <= 30 ? '8 AWG' :
                   currentAmps <= 50 ? '6 AWG' :
                   currentAmps <= 75 ? '4 AWG' :
                   currentAmps <= 100 ? '2 AWG' : '1 AWG+';
  
  // Fuse/breaker recommendation
  const fuseRating = Math.ceil(currentAmps * 1.25); // 125% of load current
  
  // Battery bank configurations for higher capacity
  const parallelBatteries = Math.ceil(requiredBatteryCapacity / totalCapacity);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">12V Battery Watts Calculator</h2>
          <p className="text-sm text-gray-600">Calculate 12V DC system power requirements and battery runtime</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Capacity
            </label>
            <select
              value={batteryCapacity}
              onChange={(e) => setBatteryCapacity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {batterySizes.map(battery => (
                <option key={battery.value} value={battery.value}>
                  {battery.name} - {battery.type}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Load Type
            </label>
            <select
              value={loadType}
              onChange={(e) => setLoadType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {commonLoads.map(load => (
                <option key={load.value} value={load.value}>
                  {load.name} ({load.watts}W)
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedLoad?.description}</p>
          </div>
          
          {loadType === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Load (Watts)
              </label>
              <input
                type="number"
                value={customWatts}
                onChange={(e) => setCustomWatts(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
                min="1"
                max="2000"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Hours per Day
            </label>
            <input
              type="number"
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="4"
              min="0.1"
              max="24"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depth of Discharge (%)
            </label>
            <input
              type="number"
              value={depthOfDischarge}
              onChange={(e) => setDepthOfDischarge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50"
              min="20"
              max="80"
            />
            <p className="text-xs text-gray-500 mt-1">50% recommended for lead-acid</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Efficiency (%)
            </label>
            <input
              type="number"
              value={batteryEfficiency}
              onChange={(e) => setBatteryEfficiency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="85"
              min="70"
              max="95"
            />
            <p className="text-xs text-gray-500 mt-1">Includes system losses</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Temperature (°F)
            </label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="68"
              min="0"
              max="120"
            />
            <p className="text-xs text-gray-500 mt-1">Battery capacity varies with temperature</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate 12V System
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">12V System Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Current Draw */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Current Draw</p>
                <p className="text-3xl font-bold text-blue-600">
                  {currentAmps.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">Amps</p>
                <div className="pt-2 border-t border-blue-200 mt-4">
                  <p className="text-sm text-gray-600">{loadWatts}W load</p>
                  <p className="text-sm text-gray-600">@ {loadVoltage.toFixed(1)}V under load</p>
                </div>
              </div>
            </div>
            
            {/* Runtime */}
            <div className={`bg-gradient-to-br rounded-lg p-6 border ${
              canMeetRequirement 
                ? 'from-green-50 to-emerald-50 border-green-200' 
                : 'from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="text-center space-y-2">
                <Clock className={`w-8 h-8 mx-auto mb-2 ${
                  canMeetRequirement ? 'text-green-600' : 'text-red-600'
                }`} />
                <p className="text-sm text-gray-600">Maximum Runtime</p>
                <p className={`text-3xl font-bold ${
                  canMeetRequirement ? 'text-green-600' : 'text-red-600'
                }`}>
                  {runtimeHours.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">hours</p>
                <div className={`pt-2 border-t mt-4 ${
                  canMeetRequirement ? 'border-green-200' : 'border-red-200'
                }`}>
                  <p className="text-sm text-gray-600">Requested: {requestedHours} hrs</p>
                  <p className={`text-sm ${canMeetRequirement ? 'text-green-600' : 'text-red-600'}`}>
                    {canMeetRequirement ? '✓ Sufficient' : '✗ Insufficient'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Battery Status */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
              <div className="text-center space-y-2">
                <Battery className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Usable Capacity</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {adjustedCapacity.toFixed(0)}
                </p>
                <p className="text-lg font-medium text-gray-700">Ah</p>
                <div className="pt-2 border-t border-yellow-200 mt-4">
                  <p className="text-sm text-gray-600">Total: {totalCapacity}Ah</p>
                  <p className="text-sm text-gray-600">{depthOfDischarge}% DOD limit</p>
                </div>
              </div>
            </div>
            
            {/* Power Requirements */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Daily Power Requirements</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly consumption:</span>
                  <span className="font-medium">{hourlyWattHours} Wh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily consumption:</span>
                  <span className="font-medium">{dailyWattHours} Wh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Daily amp-hours:</span>
                  <span className="font-medium">{(dailyWattHours/12).toFixed(1)} Ah</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required capacity:</span>
                  <span className="font-medium">{requiredBatteryCapacity.toFixed(0)} Ah</span>
                </div>
              </div>
            </div>
            
            {/* System Components */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <Gauge className="w-4 h-4" />
                Recommended Components
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Wire size:</span>
                  <span className="font-medium">{wireSize}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuse/breaker:</span>
                  <span className="font-medium">{fuseRating}A</span>
                </div>
                <div className="flex justify-between">
                  <span>Charge rate:</span>
                  <span className="font-medium">{recommendedChargeRate.toFixed(1)}A</span>
                </div>
                <div className="flex justify-between">
                  <span>Charge time:</span>
                  <span className="font-medium">{chargeTimeHours.toFixed(1)} hrs</span>
                </div>
              </div>
            </div>
            
            {/* Temperature Effects */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Temperature Impact
              </h4>
              <div className="space-y-2 text-sm text-orange-800">
                <div className="flex justify-between">
                  <span>Operating temp:</span>
                  <span className="font-medium">{temperature}°F</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity factor:</span>
                  <span className="font-medium">{(tempDerating * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cold weather loss:</span>
                  <span className="font-medium">{((1 - tempDerating) * totalCapacity).toFixed(0)} Ah</span>
                </div>
                <p className="text-xs text-orange-700 mt-2">
                  {tempF < 50 ? 'Cold weather reduces capacity' : 'Temperature within good range'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {!canMeetRequirement && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚠️ Insufficient Battery Capacity</h4>
              <p className="text-sm text-red-800">
                Current battery ({totalCapacity}Ah) cannot support {requestedHours} hours of operation. 
                You need at least {requiredBatteryCapacity.toFixed(0)}Ah capacity or 
                {parallelBatteries > 1 ? `${parallelBatteries} batteries in parallel` : 'a larger battery'}.
              </p>
            </div>
          )}
          
          {currentAmps > 50 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚡ High Current Draw</h4>
              <p className="text-sm text-yellow-800">
                The load draws {currentAmps.toFixed(1)} amps, which is quite high. Consider using thicker wiring ({wireSize}), 
                a {fuseRating}A fuse/breaker, and ensure good connections to minimize voltage drop and heat buildup.
              </p>
            </div>
          )}
          
          {runtimeHours >= requestedHours * 2 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Battery Well-Sized</h4>
              <p className="text-sm text-green-800">
                Your battery has excellent capacity for this load, providing {runtimeHours.toFixed(1)} hours of runtime
                ({(runtimeHours/requestedHours).toFixed(1)}× your requirement). This gives you good reserve capacity.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}