'use client';

import { useState } from 'react';
import { Calculator, Wind, Home, TrendingUp, Info } from 'lucide-react';

const roomTypes = [
  { value: 'bedroom', name: 'Bedroom', acph: 2, sizeFactor: 1.0 },
  { value: 'living', name: 'Living Room', acph: 2, sizeFactor: 1.2 },
  { value: 'kitchen', name: 'Kitchen', acph: 3, sizeFactor: 1.5 },
  { value: 'office', name: 'Home Office', acph: 2, sizeFactor: 1.0 },
  { value: 'basement', name: 'Basement', acph: 1, sizeFactor: 0.8 },
  { value: 'bathroom', name: 'Bathroom', acph: 4, sizeFactor: 1.3 }
];

const pollutionLevels = [
  { value: 'low', name: 'Low', description: 'Rural area, no smoking', multiplier: 1.0 },
  { value: 'moderate', name: 'Moderate', description: 'Suburban, light traffic', multiplier: 1.3 },
  { value: 'high', name: 'High', description: 'Urban, heavy traffic, pets', multiplier: 1.6 },
  { value: 'severe', name: 'Severe', description: 'Smoking, allergies, construction', multiplier: 2.0 }
];

export default function AirPurifierSizingCalculator() {
  const [roomLength, setRoomLength] = useState('12');
  const [roomWidth, setRoomWidth] = useState('10');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [roomType, setRoomType] = useState('bedroom');
  const [pollutionLevel, setPollutionLevel] = useState('moderate');
  const [hasAllergies, setHasAllergies] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [calculated, setCalculated] = useState(false);
  
  // Get room and pollution factors
  const selectedRoom = roomTypes.find(r => r.value === roomType);
  const selectedPollution = pollutionLevels.find(p => p.value === pollutionLevel);
  
  // Calculate room volume
  const roomVolume = parseFloat(roomLength) * parseFloat(roomWidth) * parseFloat(ceilingHeight);
  const roomArea = parseFloat(roomLength) * parseFloat(roomWidth);
  
  // Calculate required CADR (Clean Air Delivery Rate)
  // Base CADR = room volume × ACH (Air Changes per Hour) / 60 minutes
  let requiredCadr = (roomVolume * selectedRoom.acph) / 60;
  
  // Apply pollution multiplier
  requiredCadr *= selectedPollution.multiplier;
  
  // Apply additional factors
  if (hasAllergies) requiredCadr *= 1.3;
  if (hasPets) requiredCadr *= 1.2;
  
  // Recommend purifier sizes based on coverage area
  const getRecommendedSizes = () => {
    const standardSizes = [
      { area: 150, cadr: 100, name: 'Small Room' },
      { area: 300, cadr: 200, name: 'Medium Room' },
      { area: 500, cadr: 300, name: 'Large Room' },
      { area: 800, cadr: 450, name: 'Extra Large Room' },
      { area: 1200, cadr: 600, name: 'Whole Home' }
    ];
    
    const suitable = standardSizes.filter(size => 
      size.area >= roomArea && size.cadr >= requiredCadr
    );
    
    return suitable.length > 0 ? suitable[0] : standardSizes[standardSizes.length - 1];
  };
  
  const recommended = getRecommendedSizes();
  
  // Calculate air changes achieved with recommended purifier
  const actualAch = (recommended.cadr * 60) / roomVolume;
  
  // Operating estimates
  const dailyRuntime = 16; // Typical continuous operation
  const powerConsumption = Math.round(recommended.cadr * 0.8); // Approximate watts
  const dailyEnergyUse = (powerConsumption * dailyRuntime) / 1000;
  const monthlyEnergyUse = dailyEnergyUse * 30;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Air Purifier Sizing Calculator</h2>
          <p className="text-sm text-gray-600">Find the right CADR rating and coverage for your space</p>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="12"
              min="5"
              max="50"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
              min="5"
              max="50"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8"
              min="7"
              max="20"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pollution Level
            </label>
            <select
              value={pollutionLevel}
              onChange={(e) => setPollutionLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {pollutionLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{selectedPollution?.description}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allergies"
                checked={hasAllergies}
                onChange={(e) => setHasAllergies(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allergies" className="ml-2 text-sm text-gray-700">
                Household member has allergies
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pets"
                checked={hasPets}
                onChange={(e) => setHasPets(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="pets" className="ml-2 text-sm text-gray-700">
                Have pets in the home
              </label>
            </div>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Air Purifier Size
        </button>
      </div>
      
      {/* Results Section - Only show after calculation */}
      {calculated && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Sizing Results</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
            {/* Required CADR */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center space-y-2">
                <Wind className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Required CADR</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(requiredCadr)}
                </p>
                <p className="text-lg font-medium text-gray-700">CFM</p>
                <p className="text-sm text-gray-600 mt-2">
                  For {roomArea} sq ft room
                </p>
              </div>
            </div>
            
            {/* Recommended Purifier */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
              <div className="text-center space-y-2">
                <Home className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Recommended Size</p>
                <p className="text-xl font-bold text-green-600">
                  {recommended.name}
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    CADR: <span className="font-semibold">{recommended.cadr} CFM</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Coverage: <span className="font-semibold">{recommended.area} sq ft</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Air Changes Per Hour */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <div className="text-center space-y-2">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Air Changes Achieved</p>
                <p className="text-3xl font-bold text-purple-600">
                  {actualAch.toFixed(1)}
                </p>
                <p className="text-lg font-medium text-gray-700">ACH</p>
                <p className="text-xs text-gray-500 mt-2">
                  Target: {selectedRoom?.acph} ACH for {selectedRoom?.name.toLowerCase()}
                </p>
              </div>
            </div>
            
            {/* Room Analysis */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Room Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room volume:</span>
                  <span className="font-medium">{Math.round(roomVolume)} cu ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Floor area:</span>
                  <span className="font-medium">{roomArea} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room type:</span>
                  <span className="font-medium">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pollution level:</span>
                  <span className="font-medium">{selectedPollution?.name}</span>
                </div>
                {hasAllergies && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Allergy factor:</span>
                    <span className="font-medium">+30%</span>
                  </div>
                )}
                {hasPets && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pet factor:</span>
                    <span className="font-medium">+20%</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Operating Estimates */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Operating Estimates</h4>
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex justify-between">
                  <span>Power consumption:</span>
                  <span className="font-medium">{powerConsumption}W</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily energy:</span>
                  <span className="font-medium">{dailyEnergyUse.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly energy:</span>
                  <span className="font-medium">{monthlyEnergyUse.toFixed(0)} kWh</span>
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  Based on 16 hours/day operation
                </p>
              </div>
            </div>
            
            {/* CADR Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                CADR Guidelines
              </h4>
              <div className="space-y-1 text-xs text-blue-800">
                <div className="flex justify-between">
                  <span>Smoke particles:</span>
                  <span>10-450 CFM</span>
                </div>
                <div className="flex justify-between">
                  <span>Dust particles:</span>
                  <span>10-400 CFM</span>
                </div>
                <div className="flex justify-between">
                  <span>Pollen particles:</span>
                  <span>25-450 CFM</span>
                </div>
                <p className="text-xs text-blue-700 mt-2">
                  Higher CADR = faster air cleaning
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}