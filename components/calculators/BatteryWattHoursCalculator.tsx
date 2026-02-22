'use client';

import { useState } from 'react';
import { Calculator, Battery, Clock, Zap, TrendingUp, Info } from 'lucide-react';

const batteryChemistries = [
  { value: 'lithium-ion', name: 'Lithium-ion', efficiency: 0.95, cycles: 3000, voltageNominal: 3.7 },
  { value: 'lifepo4', name: 'LiFePO4', efficiency: 0.98, cycles: 6000, voltageNominal: 3.2 },
  { value: 'lead-acid', name: 'Lead Acid', efficiency: 0.85, cycles: 500, voltageNominal: 2.0 },
  { value: 'agm', name: 'AGM', efficiency: 0.88, cycles: 800, voltageNominal: 2.0 },
  { value: 'gel', name: 'Gel', efficiency: 0.87, cycles: 1000, voltageNominal: 2.0 }
];

const commonDevices = [
  { value: 'phone', name: 'Smartphone', watts: 5, hours: 2 },
  { value: 'laptop', name: 'Laptop', watts: 65, hours: 8 },
  { value: 'led-light', name: 'LED Light Bulb', watts: 10, hours: 6 },
  { value: 'fan', name: 'Ceiling Fan', watts: 75, hours: 8 },
  { value: 'tv', name: 'TV (LED 55")', watts: 120, hours: 5 },
  { value: 'refrigerator', name: 'Refrigerator', watts: 150, hours: 24 },
  { value: 'microwave', name: 'Microwave', watts: 1000, hours: 0.5 },
  { value: 'space-heater', name: 'Space Heater', watts: 1500, hours: 4 },
  { value: 'custom', name: 'Custom Device', watts: 100, hours: 1 }
];

export default function BatteryWattHoursCalculator() {
  const [batteryVoltage, setBatteryVoltage] = useState('12');
  const [batteryCapacityAh, setBatteryCapacityAh] = useState('100');
  const [batteryChemistry, setBatteryChemistry] = useState('lithium-ion');
  const [depthOfDischarge, setDepthOfDischarge] = useState('80');
  const [deviceType, setDeviceType] = useState('laptop');
  const [customWatts, setCustomWatts] = useState('100');
  const [customHours, setCustomHours] = useState('8');
  const [inverterEfficiency, setInverterEfficiency] = useState('90');
  const [calculated, setCalculated] = useState(false);
  
  // Get battery and device data
  const selectedChemistry = batteryChemistries.find(c => c.value === batteryChemistry);
  const selectedDevice = commonDevices.find(d => d.value === deviceType);
  
  // Use custom values for custom device
  const deviceWatts = deviceType === 'custom' ? parseFloat(customWatts) : selectedDevice?.watts || 0;
  const deviceHours = deviceType === 'custom' ? parseFloat(customHours) : selectedDevice?.hours || 0;
  
  // Calculate battery capacity in watt-hours
  const batteryWattHours = parseFloat(batteryVoltage) * parseFloat(batteryCapacityAh);
  const usableWattHours = batteryWattHours * (parseFloat(depthOfDischarge) / 100);
  
  // Account for inverter efficiency if using AC devices
  const effectiveWattHours = usableWattHours * (parseFloat(inverterEfficiency) / 100);
  
  // Calculate device power consumption
  const deviceWattHours = deviceWatts * deviceHours;
  
  // Calculate runtime
  const runtimeHours = effectiveWattHours / deviceWatts;
  const runtimeDays = runtimeHours / 24;
  
  // Calculate how many charge cycles for daily use
  const dailyUsage = deviceWattHours;
  const cyclesPerDay = dailyUsage / usableWattHours;
  const daysPerCycle = 1 / cyclesPerDay;
  
  // Battery life estimation
  const estimatedLifeDays = selectedChemistry.cycles / cyclesPerDay;
  const estimatedLifeYears = estimatedLifeDays / 365;
  
  // Energy efficiency
  const systemEfficiency = selectedChemistry.efficiency * (parseFloat(inverterEfficiency) / 100);
  const energyLoss = batteryWattHours - effectiveWattHours;
  
  // Cost per kWh calculations (rough estimates)
  const batteryCapacityKWh = batteryWattHours / 1000;
  const usableCapacityKWh = usableWattHours / 1000;
  
  // Multiple device calculations
  const simultaneousDevices = Math.floor(effectiveWattHours / deviceWattHours);
  
  // Recharge time estimates (assuming 10A charger for 12V, scaled for voltage)
  const chargerAmps = 10 * (parseFloat(batteryVoltage) / 12);
  const rechargeTimeHours = parseFloat(batteryCapacityAh) / chargerAmps;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-green-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Battery Watt Hours Calculator</h2>
          <p className="text-sm text-gray-600">Calculate battery capacity, runtime, and efficiency</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Voltage (V)
            </label>
            <input
              type="number"
              value={batteryVoltage}
              onChange={(e) => setBatteryVoltage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="12"
              min="1.5"
              max="48"
              step="0.1"
            />
            <p className="text-xs text-gray-500 mt-1">Common: 12V, 24V, 48V</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Capacity (Ah)
            </label>
            <input
              type="number"
              value={batteryCapacityAh}
              onChange={(e) => setBatteryCapacityAh(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="100"
              min="1"
              max="1000"
            />
            <p className="text-xs text-gray-500 mt-1">Amp-hours rating</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Battery Chemistry
            </label>
            <select
              value={batteryChemistry}
              onChange={(e) => setBatteryChemistry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {batteryChemistries.map(chem => (
                <option key={chem.value} value={chem.value}>
                  {chem.name} ({(chem.efficiency * 100).toFixed(0)}% efficient)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depth of Discharge (%)
            </label>
            <input
              type="number"
              value={depthOfDischarge}
              onChange={(e) => setDepthOfDischarge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="80"
              min="20"
              max="100"
            />
            <p className="text-xs text-gray-500 mt-1">Safe discharge limit</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Device Type
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {commonDevices.map(device => (
                <option key={device.value} value={device.value}>
                  {device.name} ({device.watts}W)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inverter Efficiency (%)
            </label>
            <input
              type="number"
              value={inverterEfficiency}
              onChange={(e) => setInverterEfficiency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="90"
              min="70"
              max="98"
            />
            <p className="text-xs text-gray-500 mt-1">For AC devices (set 100% for DC)</p>
          </div>
          
          {deviceType === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Power (Watts)
                </label>
                <input
                  type="number"
                  value={customWatts}
                  onChange={(e) => setCustomWatts(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="100"
                  min="1"
                  max="5000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Usage (Hours)
                </label>
                <input
                  type="number"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="8"
                  min="0.1"
                  max="24"
                  step="0.1"
                />
              </div>
            </>
          )}
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Battery Performance
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Battery Analysis Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Battery Capacity */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <Battery className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-3xl font-bold text-green-600">
                  {batteryWattHours.toLocaleString()}
                </p>
                <p className="text-lg font-medium text-gray-700">Wh</p>
                <div className="pt-2 border-t border-green-200 mt-4">
                  <p className="text-sm text-gray-600">Usable: {usableWattHours.toLocaleString()} Wh</p>
                  <p className="text-sm text-gray-600">Effective: {effectiveWattHours.toLocaleString()} Wh</p>
                </div>
              </div>
            </div>
            
            {/* Device Runtime */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Device Runtime</p>
                <p className="text-3xl font-bold text-blue-600">
                  {runtimeHours.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">hours</p>
                <div className="pt-2 border-t border-blue-200 mt-4">
                  <p className="text-sm text-gray-600">{selectedDevice?.name || 'Custom Device'}</p>
                  <p className="text-sm text-gray-600">{deviceWatts}W power draw</p>
                </div>
              </div>
            </div>
            
            {/* Power Consumption */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
              <div className="text-center space-y-2">
                <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Daily Energy Use</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {deviceWattHours}
                </p>
                <p className="text-lg font-medium text-gray-700">Wh</p>
                <div className="pt-2 border-t border-yellow-200 mt-4">
                  <p className="text-sm text-gray-600">{deviceHours} hours/day usage</p>
                  <p className="text-sm text-gray-600">{simultaneousDevices} devices max</p>
                </div>
              </div>
            </div>
            
            {/* Battery Specifications */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Battery Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Voltage:</span>
                  <span className="font-medium">{batteryVoltage}V</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{batteryCapacityAh}Ah</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chemistry:</span>
                  <span className="font-medium">{selectedChemistry?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">DOD limit:</span>
                  <span className="font-medium">{depthOfDischarge}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recharge time:</span>
                  <span className="font-medium">{rechargeTimeHours.toFixed(1)} hrs</span>
                </div>
              </div>
            </div>
            
            {/* Cycle Life Analysis */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Cycle Life Analysis
              </h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Rated cycles:</span>
                  <span className="font-medium">{selectedChemistry?.cycles.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cycles per day:</span>
                  <span className="font-medium">{cyclesPerDay.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days per cycle:</span>
                  <span className="font-medium">{daysPerCycle.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated life:</span>
                  <span className="font-medium">{estimatedLifeYears.toFixed(1)} years</span>
                </div>
              </div>
            </div>
            
            {/* System Efficiency */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-medium text-orange-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                System Efficiency
              </h4>
              <div className="space-y-2 text-sm text-orange-800">
                <div className="flex justify-between">
                  <span>Battery efficiency:</span>
                  <span className="font-medium">{(selectedChemistry?.efficiency * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Inverter efficiency:</span>
                  <span className="font-medium">{inverterEfficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span>System efficiency:</span>
                  <span className="font-medium">{(systemEfficiency * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Energy loss:</span>
                  <span className="font-medium">{energyLoss.toFixed(0)} Wh</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {cyclesPerDay > 1 && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ High Daily Usage</h4>
              <p className="text-sm text-yellow-800">
                Your daily usage ({cyclesPerDay.toFixed(1)} cycles/day) will significantly reduce battery life. 
                Consider using a larger battery capacity or reducing daily consumption to extend battery lifespan.
              </p>
            </div>
          )}
          
          {estimatedLifeYears < 2 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">🔋 Battery Undersized</h4>
              <p className="text-sm text-red-800">
                At current usage levels, the battery will only last {estimatedLifeYears.toFixed(1)} years. 
                Consider upgrading to a higher capacity battery or a different chemistry for longer life.
              </p>
            </div>
          )}
          
          {runtimeHours >= 24 && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Excellent Runtime</h4>
              <p className="text-sm text-green-800">
                Your battery can power the device for {runtimeHours.toFixed(1)} hours ({runtimeDays.toFixed(1)} days), 
                providing excellent backup power capacity.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}