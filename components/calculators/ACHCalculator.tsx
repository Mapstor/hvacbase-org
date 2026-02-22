'use client';

import { useState } from 'react';
import { Calculator, Wind, Gauge, TrendingUp, Info } from 'lucide-react';

const ventilationStandards = [
  { category: 'Residential Living Areas', minACH: 0.35, recommendedACH: 2.0 },
  { category: 'Bedrooms', minACH: 0.35, recommendedACH: 1.5 },
  { category: 'Kitchens', minACH: 5.0, recommendedACH: 15.0 },
  { category: 'Bathrooms', minACH: 5.0, recommendedACH: 10.0 },
  { category: 'Basements', minACH: 0.35, recommendedACH: 1.0 },
  { category: 'Laundry Rooms', minACH: 3.0, recommendedACH: 8.0 },
  { category: 'Garages', minACH: 4.0, recommendedACH: 6.0 },
  { category: 'Commercial Offices', minACH: 4.0, recommendedACH: 8.0 },
  { category: 'Restaurants', minACH: 7.5, recommendedACH: 15.0 },
  { category: 'Hospitals', minACH: 6.0, recommendedACH: 12.0 }
];

export default function ACHCalculator() {
  const [roomLength, setRoomLength] = useState('12');
  const [roomWidth, setRoomWidth] = useState('10');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [airflow, setAirflow] = useState('240');
  const [spaceType, setSpaceType] = useState('Residential Living Areas');
  const [calculated, setCalculated] = useState(false);
  
  // Calculate room volume and ACH
  const roomVolume = parseFloat(roomLength) * parseFloat(roomWidth) * parseFloat(ceilingHeight);
  const roomArea = parseFloat(roomLength) * parseFloat(roomWidth);
  const currentACH = (parseFloat(airflow) * 60) / roomVolume; // CFM to ACH conversion
  
  // Get standard for selected space type
  const selectedStandard = ventilationStandards.find(s => s.category === spaceType);
  
  // Calculate required airflow for recommended ACH
  const requiredAirflowMin = selectedStandard ? (selectedStandard.minACH * roomVolume) / 60 : 0;
  const requiredAirflowRec = selectedStandard ? (selectedStandard.recommendedACH * roomVolume) / 60 : 0;
  
  // Determine compliance status
  const meetsMinimum = selectedStandard ? currentACH >= selectedStandard.minACH : false;
  const meetsRecommended = selectedStandard ? currentACH >= selectedStandard.recommendedACH : false;
  
  // Calculate air change interval
  const minutesPerChange = 60 / currentACH;
  
  // Energy implications
  const dailyAirVolume = parseFloat(airflow) * 60 * 24; // cubic feet per day
  const estimatedFanPower = parseFloat(airflow) * 0.1; // rough estimate: 0.1W per CFM
  const dailyEnergyUse = (estimatedFanPower * 24) / 1000; // kWh per day

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-teal-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-teal-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Air Changes Per Hour (ACH) Calculator</h2>
          <p className="text-sm text-gray-600">Calculate ventilation rates and compliance with standards</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Length (feet)
            </label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="12"
              min="5"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Width (feet)
            </label>
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="10"
              min="5"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ceiling Height (feet)
            </label>
            <input
              type="number"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="8"
              min="7"
              max="20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airflow Rate (CFM)
            </label>
            <input
              type="number"
              value={airflow}
              onChange={(e) => setAirflow(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="240"
              min="10"
              max="5000"
            />
            <p className="text-xs text-gray-500 mt-1">Measured or designed airflow</p>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Space Type
            </label>
            <select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {ventilationStandards.map(standard => (
                <option key={standard.category} value={standard.category}>
                  {standard.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate ACH
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Ventilation Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Current ACH */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 border border-teal-200">
              <div className="text-center space-y-2">
                <Wind className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Current ACH</p>
                <p className="text-3xl font-bold text-teal-600">
                  {currentACH.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">changes/hour</p>
                <p className="text-sm text-gray-600 mt-2">
                  {roomVolume.toLocaleString()} cu ft room
                </p>
              </div>
            </div>
            
            {/* Compliance Status */}
            <div className={`bg-gradient-to-br rounded-lg p-6 border ${
              meetsRecommended 
                ? 'from-green-50 to-emerald-50 border-green-200' 
                : meetsMinimum 
                  ? 'from-yellow-50 to-orange-50 border-yellow-200'
                  : 'from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="text-center space-y-2">
                <Gauge className={`w-8 h-8 mx-auto mb-2 ${
                  meetsRecommended 
                    ? 'text-green-600' 
                    : meetsMinimum 
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`} />
                <p className="text-sm text-gray-600">Compliance Status</p>
                <p className={`text-xl font-bold ${
                  meetsRecommended 
                    ? 'text-green-600' 
                    : meetsMinimum 
                      ? 'text-yellow-600'
                      : 'text-red-600'
                }`}>
                  {meetsRecommended ? 'Exceeds Standards' : meetsMinimum ? 'Meets Minimum' : 'Below Minimum'}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Minimum: <span className="font-semibold">{selectedStandard?.minACH} ACH</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Recommended: <span className="font-semibold">{selectedStandard?.recommendedACH} ACH</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Air Change Frequency */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Complete Air Change</p>
                <p className="text-3xl font-bold text-blue-600">
                  {minutesPerChange.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">minutes</p>
                <p className="text-sm text-gray-600 mt-2">
                  Time to replace all air in room
                </p>
              </div>
            </div>
            
            {/* Required Airflow */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Required Airflow</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">For minimum ACH:</span>
                  <span className="font-medium">{Math.round(requiredAirflowMin)} CFM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">For recommended ACH:</span>
                  <span className="font-medium">{Math.round(requiredAirflowRec)} CFM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current airflow:</span>
                  <span className="font-medium">{airflow} CFM</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Airflow per sq ft:</span>
                    <span className="font-medium">{(parseFloat(airflow) / roomArea).toFixed(1)} CFM/sq ft</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Energy Impact */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Energy Impact</h4>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex justify-between">
                  <span>Est. fan power:</span>
                  <span className="font-medium">{Math.round(estimatedFanPower)}W</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily energy:</span>
                  <span className="font-medium">{dailyEnergyUse.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Air volume/day:</span>
                  <span className="font-medium">{Math.round(dailyAirVolume/1000)}k cu ft</span>
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  Higher ACH = more energy use
                </p>
              </div>
            </div>
            
            {/* Ventilation Standards */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Common ACH Standards
              </h4>
              <div className="space-y-1 text-xs text-blue-800">
                <div className="flex justify-between">
                  <span>Living areas:</span>
                  <span>0.35-2.0 ACH</span>
                </div>
                <div className="flex justify-between">
                  <span>Bathrooms:</span>
                  <span>5-10 ACH</span>
                </div>
                <div className="flex justify-between">
                  <span>Kitchens:</span>
                  <span>5-15 ACH</span>
                </div>
                <div className="flex justify-between">
                  <span>Hospitals:</span>
                  <span>6-12 ACH</span>
                </div>
                <div className="flex justify-between">
                  <span>Clean rooms:</span>
                  <span>20-600 ACH</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          {!meetsMinimum && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-900 mb-2">⚠️ Insufficient Ventilation</h4>
              <p className="text-sm text-red-800">
                Current ACH ({currentACH.toFixed(1)}) is below the minimum requirement ({selectedStandard?.minACH} ACH) for {spaceType.toLowerCase()}. 
                Increase airflow to at least {Math.round(requiredAirflowMin)} CFM to meet minimum standards.
              </p>
            </div>
          )}
          
          {meetsMinimum && !meetsRecommended && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">💡 Room for Improvement</h4>
              <p className="text-sm text-yellow-800">
                Current ACH meets minimum requirements but is below recommended levels. 
                Consider increasing airflow to {Math.round(requiredAirflowRec)} CFM for optimal ventilation.
              </p>
            </div>
          )}
          
          {meetsRecommended && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">✅ Excellent Ventilation</h4>
              <p className="text-sm text-green-800">
                Current ACH exceeds recommended standards, providing excellent air quality and comfort.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}