'use client';

import { useState } from 'react';
import { Calculator, Zap, DollarSign, Clock, TrendingUp, CheckCircle, AlertTriangle, Info, Leaf } from 'lucide-react';

export default function KWhCostCalculator() {
  const [powerWatts, setPowerWatts] = useState('1500');
  const [hoursPerDay, setHoursPerDay] = useState('8');
  const [daysPerMonth, setDaysPerMonth] = useState('30');
  const [electricRate, setElectricRate] = useState('0.16');
  const [calculated, setCalculated] = useState(false);
  
  // Calculate energy consumption
  const dailyKwh = (parseFloat(powerWatts) * parseFloat(hoursPerDay)) / 1000;
  const monthlyKwh = dailyKwh * parseFloat(daysPerMonth);
  const yearlyKwh = monthlyKwh * 12;
  
  // Calculate costs
  const dailyCost = dailyKwh * parseFloat(electricRate);
  const monthlyCost = monthlyKwh * parseFloat(electricRate);
  const yearlyCost = yearlyKwh * parseFloat(electricRate);
  
  // Cost per hour
  const hourlyKwh = parseFloat(powerWatts) / 1000;
  const hourlyCost = hourlyKwh * parseFloat(electricRate);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-yellow-100 p-3 rounded-lg">
          <Calculator className="w-6 h-6 text-yellow-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">kWh Cost Calculator</h2>
          <p className="text-sm text-gray-600">Calculate electricity costs for any appliance</p>
        </div>
      </div>
      
      {/* Input Section */}
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power Consumption (Watts)
            </label>
            <input
              type="number"
              value={powerWatts}
              onChange={(e) => setPowerWatts(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="1500"
              min="1"
              max="10000"
            />
            <p className="text-xs text-gray-500 mt-1">Check appliance label or manual</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours Used Per Day
            </label>
            <input
              type="number"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="8"
              min="0.1"
              max="24"
              step="0.1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Days Used Per Month
            </label>
            <input
              type="number"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="30"
              min="1"
              max="31"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Rate ($/kWh)
            </label>
            <input
              type="number"
              value={electricRate}
              onChange={(e) => setElectricRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="0.16"
              min="0.05"
              max="0.50"
              step="0.01"
            />
            <p className="text-xs text-gray-500 mt-1">US average: $0.16/kWh</p>
          </div>
        </div>
        
        {/* Calculate Button */}
        <button
          onClick={() => setCalculated(true)}
          className="w-full md:w-auto md:mx-auto md:px-12 bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Energy Costs
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
              Energy Cost Analysis
            </h3>
            
            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Primary Cost Result */}
              <div className="lg:col-span-2 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Operating Costs</h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Monthly Cost</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        ${monthlyCost.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">per month</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Annual Cost</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ${yearlyCost.toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-500">per year</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-3">Cost Breakdown</p>
                    <div className="bg-white/60 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Hour:</span>
                        <span className="font-medium">${hourlyCost.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Day:</span>
                        <span className="font-medium">${dailyCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Per Month:</span>
                        <span className="font-medium">${monthlyCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm border-t pt-2">
                        <span className="text-gray-700 font-semibold">Per Year:</span>
                        <span className="font-bold text-yellow-600">${yearlyCost.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Energy Consumption */}
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Energy Usage</h4>
                </div>
                <div className="space-y-3">
                  <div className="text-center p-3">
                    <p className="text-2xl font-bold text-blue-600">{dailyKwh.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">kWh per day</p>
                  </div>
                  <div className="text-center p-3">
                    <p className="text-xl font-bold text-gray-800">{monthlyKwh.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">kWh per month</p>
                  </div>
                  <div className="text-center p-3">
                    <p className="text-lg font-bold text-gray-700">{yearlyKwh.toFixed(0)}</p>
                    <p className="text-sm text-gray-600">kWh per year</p>
                  </div>
                  
                  <div className="pt-2 border-t border-blue-300">
                    <p className="text-xs text-gray-600 text-center">
                      At {parseFloat(hoursPerDay)} hours/day, {parseFloat(daysPerMonth)} days/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Usage Scenarios & Efficiency */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Usage Scenarios */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  Usage Scenarios
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Light Usage (4 hrs/day)</span>
                      <span className="text-lg font-bold text-green-600">
                        ${(yearlyCost * 4 / parseFloat(hoursPerDay)).toFixed(0)}/yr
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {(monthlyKwh * 4 / parseFloat(hoursPerDay)).toFixed(1)} kWh/month
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Medium Usage (8 hrs/day)</span>
                      <span className="text-lg font-bold text-yellow-600">
                        ${(yearlyCost * 8 / parseFloat(hoursPerDay)).toFixed(0)}/yr
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {(monthlyKwh * 8 / parseFloat(hoursPerDay)).toFixed(1)} kWh/month
                    </p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">Continuous (24/7)</span>
                      <span className="text-lg font-bold text-red-600">
                        ${(yearlyCost * 24 / parseFloat(hoursPerDay)).toFixed(0)}/yr
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {(monthlyKwh * 24 / parseFloat(hoursPerDay)).toFixed(0)} kWh/month
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Efficiency & Savings */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Efficiency Insights
                </h4>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-semibold text-green-800 mb-1">Energy Star Savings</p>
                    <p className="text-sm text-green-700">
                      ENERGY STAR appliances use 10-25% less energy. Potential annual savings: 
                      ${(yearlyCost * 0.175).toFixed(0)}
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="font-semibold text-blue-800 mb-1">Timer Controls</p>
                    <p className="text-sm text-blue-700">
                      Using smart timers to reduce usage by 2 hours daily could save ${(yearlyCost * 2 / parseFloat(hoursPerDay)).toFixed(0)}/year
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="font-semibold text-purple-800 mb-1">Peak Hour Avoidance</p>
                    <p className="text-sm text-purple-700">
                      Time-of-use rates: Avoid peak hours (2-7 PM) to save 20-40% on electricity costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Appliance Reference & Environmental Impact */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Common Appliances */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Common Appliance Power Consumption
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Space Heater</span>
                    <span className="font-medium text-gray-800">1500W</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Window AC Unit</span>
                    <span className="font-medium text-gray-800">1200W</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Dehumidifier</span>
                    <span className="font-medium text-gray-800">700W</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Hair Dryer</span>
                    <span className="font-medium text-gray-800">1800W</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Microwave Oven</span>
                    <span className="font-medium text-gray-800">1000W</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">LED Bulb (60W equiv)</span>
                    <span className="font-medium text-gray-800">9W</span>
                  </div>
                </div>
              </div>
              
              {/* Environmental Impact */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Environmental Impact
                </h4>
                <div className="space-y-3">
                  <div className="text-center p-3">
                    <p className="text-2xl font-bold text-green-600">
                      {(yearlyKwh * 0.92 / 1000).toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-600">Metric tons CO₂/year</p>
                  </div>
                  <div className="text-center p-3">
                    <p className="text-xl font-bold text-blue-600">
                      {Math.round(yearlyKwh * 0.92 / 48)}
                    </p>
                    <p className="text-sm text-gray-600">Tree seedlings needed to offset</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 text-center">
                      Based on US average grid emissions (0.92 lbs CO₂/kWh)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Disclaimer */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Important Cost Considerations</h4>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• Electricity rates vary by region, season, and time of day - check with your utility provider</p>
                    <p>• Actual appliance power consumption may vary based on settings, age, and efficiency</p>
                    <p>• Additional fees (delivery charges, taxes) may apply to your electric bill</p>
                    <p>• Consider demand charges for large commercial/industrial loads</p>
                    <p>• Energy-efficient models can significantly reduce long-term operating costs</p>
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