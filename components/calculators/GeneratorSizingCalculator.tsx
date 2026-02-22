'use client';

import { useState } from 'react';
import { Calculator, Zap, Home, AlertTriangle, CheckCircle, DollarSign, Info, Battery } from 'lucide-react';

// Common appliances with their wattage requirements
const appliances = {
  'Refrigerators & Freezers': [
    { id: 'fridge-standard', name: 'Standard Refrigerator (18-21 cu ft)', running: 150, starting: 1200 },
    { id: 'fridge-sidebyside', name: 'Side-by-Side Refrigerator (22-26 cu ft)', running: 225, starting: 1500 },
    { id: 'fridge-french', name: 'French Door Refrigerator (22-28 cu ft)', running: 225, starting: 1500 },
    { id: 'fridge-mini', name: 'Mini Fridge (1.7-4.5 cu ft)', running: 75, starting: 450 },
    { id: 'freezer-chest-small', name: 'Chest Freezer (5-9 cu ft)', running: 75, starting: 650 },
    { id: 'freezer-chest-medium', name: 'Chest Freezer (10-18 cu ft)', running: 150, starting: 900 },
    { id: 'freezer-chest-large', name: 'Chest Freezer (18-25 cu ft)', running: 200, starting: 1100 },
    { id: 'freezer-upright-medium', name: 'Upright Freezer (10-18 cu ft)', running: 200, starting: 1000 },
    { id: 'freezer-upright-large', name: 'Upright Freezer (18-25 cu ft)', running: 300, starting: 1250 }
  ],
  'Essential Home': [
    { id: 'lights-led-5', name: '5 LED Lights (10W each)', running: 50, starting: 50 },
    { id: 'lights-led-10', name: '10 LED Lights (10W each)', running: 100, starting: 100 },
    { id: 'fan-ceiling', name: 'Ceiling Fan', running: 75, starting: 100 },
    { id: 'fan-box', name: 'Box Fan', running: 100, starting: 120 },
    { id: 'phone-charger', name: 'Phone/Laptop Chargers', running: 25, starting: 25 },
    { id: 'tv-led', name: 'LED TV (50")', running: 100, starting: 100 },
    { id: 'internet-modem', name: 'Internet Modem & Router', running: 50, starting: 50 }
  ],
  'Pumps & Motors': [
    { id: 'sump-pump-1/3', name: 'Sump Pump (1/3 HP)', running: 800, starting: 1800 },
    { id: 'sump-pump-1/2', name: 'Sump Pump (1/2 HP)', running: 1050, starting: 2150 },
    { id: 'well-pump-1/2', name: 'Well Pump (1/2 HP)', running: 1000, starting: 2100 },
    { id: 'well-pump-3/4', name: 'Well Pump (3/4 HP)', running: 1500, starting: 3000 },
    { id: 'furnace-blower', name: 'Furnace Blower (1/2 HP)', running: 800, starting: 2350 }
  ],
  'Kitchen Appliances': [
    { id: 'microwave-small', name: 'Microwave (700W)', running: 700, starting: 700 },
    { id: 'microwave-large', name: 'Microwave (1000W)', running: 1000, starting: 1000 },
    { id: 'coffee-maker', name: 'Coffee Maker', running: 1000, starting: 1000 },
    { id: 'toaster', name: 'Toaster', running: 850, starting: 850 },
    { id: 'electric-skillet', name: 'Electric Skillet', running: 1500, starting: 1500 }
  ],
  'Cooling & Heating': [
    { id: 'window-ac-5000', name: 'Window AC (5,000 BTU)', running: 500, starting: 1200 },
    { id: 'window-ac-8000', name: 'Window AC (8,000 BTU)', running: 700, starting: 1800 },
    { id: 'window-ac-10000', name: 'Window AC (10,000 BTU)', running: 900, starting: 2200 },
    { id: 'space-heater', name: 'Space Heater (1500W)', running: 1500, starting: 1500 },
    { id: 'electric-blanket', name: 'Electric Blanket', running: 200, starting: 200 }
  ]
};

const generatorSizes = [
  { watts: 1000, label: '1,000W', price: 300 },
  { watts: 2000, label: '2,000W Inverter', price: 500 },
  { watts: 2200, label: '2,200W Inverter', price: 600 },
  { watts: 3000, label: '3,000W', price: 700 },
  { watts: 3500, label: '3,500W', price: 800 },
  { watts: 5000, label: '5,000W', price: 1200 },
  { watts: 5500, label: '5,500W', price: 1400 },
  { watts: 7500, label: '7,500W', price: 2000 },
  { watts: 10000, label: '10,000W', price: 3000 }
];

export default function GeneratorSizingCalculator() {
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const [calculated, setCalculated] = useState(false);
  
  const toggleAppliance = (applianceId: string) => {
    setSelectedAppliances(prev => 
      prev.includes(applianceId) 
        ? prev.filter(id => id !== applianceId)
        : [...prev, applianceId]
    );
  };
  
  // Calculate total power requirements
  const getSelectedApplianceData = () => {
    const selected: any[] = [];
    Object.values(appliances).forEach(category => {
      category.forEach(appliance => {
        if (selectedAppliances.includes(appliance.id)) {
          selected.push(appliance);
        }
      });
    });
    return selected;
  };
  
  const selectedData = getSelectedApplianceData();
  const totalRunning = selectedData.reduce((sum, app) => sum + app.running, 0);
  const largestStarting = Math.max(...selectedData.map(app => app.starting - app.running), 0);
  const peakWatts = totalRunning + largestStarting;
  const recommendedWatts = Math.ceil(peakWatts * 1.2); // 20% safety margin
  
  // Find recommended generator
  const recommendedGenerator = generatorSizes.find(g => g.watts >= recommendedWatts) || generatorSizes[generatorSizes.length - 1];
  const minimumGenerator = generatorSizes.find(g => g.watts >= peakWatts) || generatorSizes[generatorSizes.length - 1];
  
  // Calculate runtime estimates
  const fuelConsumption = recommendedWatts / 5000; // Approximate gallons per hour at 50% load
  const runtime5Gal = 5 / fuelConsumption;
  const dailyCost = fuelConsumption * 8 * 4.50; // 8 hours at $4.50/gallon

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Generator Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Select appliances you need to power during an outage</p>
        </div>
      </div>
      
      {/* Appliance Selection */}
      <div className="space-y-6">
        {Object.entries(appliances).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              {category === 'Refrigerators & Freezers' && <Home className="w-4 h-4 text-blue-600" />}
              {category === 'Essential Home' && <Zap className="w-4 h-4 text-yellow-600" />}
              {category === 'Pumps & Motors' && <Battery className="w-4 h-4 text-green-600" />}
              {category}
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {items.map(appliance => (
                <label 
                  key={appliance.id}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAppliances.includes(appliance.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAppliances.includes(appliance.id)}
                      onChange={() => toggleAppliance(appliance.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-800">{appliance.name}</span>
                      <p className="text-xs text-gray-500">
                        {appliance.running}W running / {appliance.starting}W starting
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          disabled={selectedAppliances.length === 0}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Calculator className="w-5 h-5" />
          Calculate Generator Size
        </button>
      </div>
      
      {/* Results Section */}
      {calculated && selectedAppliances.length > 0 && (
        <div className="mt-8 space-y-6">
          {/* Results Header */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <div className="bg-green-100 p-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              Your Generator Requirements
            </h3>
          </div>
          
          {/* Primary Results */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Power Requirements */}
            <div className="lg:col-span-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">Recommended Generator</h4>
                    <span className="text-2xl font-bold text-yellow-600">{recommendedGenerator.label}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Total Running:</span>
                      <p className="font-semibold">{totalRunning.toLocaleString()}W</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Peak Surge:</span>
                      <p className="font-semibold">{peakWatts.toLocaleString()}W</p>
                    </div>
                    <div>
                      <span className="text-gray-600">With Margin:</span>
                      <p className="font-semibold">{recommendedWatts.toLocaleString()}W</p>
                    </div>
                  </div>
                  <div className="mt-2 p-2 bg-white/60 rounded text-xs text-gray-700">
                    <strong>Why this size:</strong> Your appliances need {totalRunning}W continuously, 
                    with a peak of {peakWatts}W when the largest motor starts. 
                    The {recommendedGenerator.label} generator provides 20% safety margin for reliable operation and prevents overloading.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cost Estimate */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <h4 className="font-semibold text-gray-800">Operating Cost</h4>
              </div>
              <p className="text-xl font-bold text-green-600 mb-1">${dailyCost.toFixed(0)}/day</p>
              <div className="space-y-1 text-xs text-gray-600">
                <p>• Fuel use: {fuelConsumption.toFixed(1)} gal/hour</p>
                <p>• Runtime on 5 gallons: {runtime5Gal.toFixed(1)} hours</p>
                <p>• Generator cost: ~${recommendedGenerator.price}</p>
              </div>
            </div>
          </div>
          
          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Selected Appliances */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Home className="w-4 h-4 text-blue-600" />
                Selected Appliances ({selectedData.length})
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {selectedData.map(appliance => (
                  <div key={appliance.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-700">{appliance.name}</span>
                    <span className="font-medium">{appliance.running}W</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total Continuous Load:</span>
                    <span className="text-blue-600">{totalRunning}W</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Generator Options */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-purple-600" />
                Generator Options
              </h4>
              <div className="space-y-2">
                <div className={`p-2 rounded text-sm ${minimumGenerator.watts === recommendedGenerator.watts ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Minimum: {minimumGenerator.label}</span>
                    <span>${minimumGenerator.price}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Handles peak load with no margin</p>
                </div>
                <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Recommended: {recommendedGenerator.label}</span>
                    <span>${recommendedGenerator.price}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">20% safety margin for reliable operation</p>
                </div>
                {recommendedGenerator.watts < 7500 && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Comfort: 7,500W</span>
                      <span>$2,000</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Room for additional loads</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Important Notes */}
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800">Important Sizing Notes</p>
                <p>• Starting watts: We calculate for only one motor starting at a time (largest surge)</p>
                <p>• Safety margin: 20% extra capacity prevents overload and extends generator life</p>
                <p>• Inverter generators are quieter and more fuel-efficient for loads under 3,500W</p>
                <p>• Consider future needs: You may want to add more appliances during extended outages</p>
                <p>• Professional electrician recommended for permanent transfer switch installation</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}