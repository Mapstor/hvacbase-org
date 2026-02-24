'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Zap, Info, CheckCircle, AlertCircle, Leaf } from 'lucide-react';

export default function SEER2Calculator() {
  const [currentSeer, setCurrentSeer] = useState('10');
  const [newSeer, setNewSeer] = useState('16');
  const [acSize, setAcSize] = useState('3');
  const [electricRate, setElectricRate] = useState('0.16');
  const [coolingHours, setCoolingHours] = useState('1500');
  const [systemAge, setSystemAge] = useState('15');
  const [calculated, setCalculated] = useState(false);

  // Calculations
  const tons = parseFloat(acSize);
  const btuPerHour = tons * 12000;
  
  // Energy consumption (kWh/year) - SEER2 is about 4.5% lower than SEER
  const seer2Adjustment = 0.955; // SEER2 is ~4.5% lower than SEER
  const currentKwh = (btuPerHour / parseFloat(currentSeer)) * parseFloat(coolingHours) / 1000;
  const newKwh = (btuPerHour / (parseFloat(newSeer) * seer2Adjustment)) * parseFloat(coolingHours) / 1000;
  const kwhSaved = currentKwh - newKwh;
  
  // Cost calculations
  const rate = parseFloat(electricRate);
  const currentCost = currentKwh * rate;
  const newCost = newKwh * rate;
  const annualSavings = currentCost - newCost;
  const monthlySavings = annualSavings / 5; // Assuming 5 months of cooling season
  const tenYearSavings = annualSavings * 10;
  const lifetimeSavings = annualSavings * 15;
  
  // ROI calculations
  const systemCost = tons * 1800; // Rough estimate
  const paybackYears = systemCost / annualSavings;
  
  // Environmental impact
  const co2Reduction = kwhSaved * 0.92; // lbs CO2 per kWh
  const percentSavings = ((kwhSaved / currentKwh) * 100);
  const treesEquivalent = Math.round(co2Reduction / 48); // One tree absorbs ~48 lbs CO2/year
  const carsOffRoad = (co2Reduction / 9600).toFixed(1); // Average car emits 9,600 lbs CO2/year
  
  // Comfort and reliability metrics
  const isHighEfficiency = parseFloat(newSeer) >= 18;
  const qualifiesForRebates = parseFloat(newSeer) >= 16;
  const meetsNewStandards = parseFloat(newSeer) >= 14.3;

  // Helper function for climate description
  const getClimateDescription = (hours: number) => {
    if (hours <= 800) return { zone: 'Cool Climate', desc: 'Northern regions with mild summers' };
    if (hours <= 1200) return { zone: 'Moderate Climate', desc: 'Temperate regions with average cooling needs' };
    if (hours <= 1500) return { zone: 'Warm Climate', desc: 'Southern regions with hot summers' };
    if (hours <= 2100) return { zone: 'Hot Climate', desc: 'Desert and subtropical regions' };
    return { zone: 'Very Hot Climate', desc: 'Extreme heat regions requiring heavy AC use' };
  };

  const climate = getClimateDescription(parseFloat(coolingHours));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">SEER2 Energy Savings Calculator</h2>
          <div className="bg-blue-100 p-2 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-700" />
          </div>
        </div>
        <p className="text-sm text-gray-600">Calculate exact savings when upgrading your AC system. Get personalized ROI analysis and environmental impact.</p>
      </div>
      
      {/* Input Section with Better UX */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600" />
          System Information
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Current System SEER Rating
            </label>
            <input
              type="number"
              value={currentSeer}
              onChange={(e) => setCurrentSeer(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="6"
              max="25"
            />
            <p className="text-xs text-gray-500 mt-1">Typical: 8-13 for systems 10+ years old</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              New System SEER2 Rating
            </label>
            <input
              type="number"
              value={newSeer}
              onChange={(e) => setNewSeer(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="13"
              max="30"
            />
            <p className="text-xs text-gray-500 mt-1">2024 minimum: 14.3 (South), 13.8 (North)</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              AC System Size
            </label>
            <select
              value={acSize}
              onChange={(e) => setAcSize(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1.5">1.5 Tons (18,000 BTU)</option>
              <option value="2">2 Tons (24,000 BTU)</option>
              <option value="2.5">2.5 Tons (30,000 BTU)</option>
              <option value="3">3 Tons (36,000 BTU)</option>
              <option value="3.5">3.5 Tons (42,000 BTU)</option>
              <option value="4">4 Tons (48,000 BTU)</option>
              <option value="5">5 Tons (60,000 BTU)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your Electric Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-sm text-gray-500">$</span>
              <input
                type="number"
                value={electricRate}
                onChange={(e) => setElectricRate(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.01"
                min="0.05"
                max="0.50"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">US average: $0.16/kWh</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Annual Cooling Hours
            </label>
            <select
              value={coolingHours}
              onChange={(e) => setCoolingHours(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="600">600 hours (Very Cool)</option>
              <option value="800">800 hours (Cool)</option>
              <option value="1200">1200 hours (Moderate)</option>
              <option value="1500">1500 hours (Warm)</option>
              <option value="2100">2100 hours (Hot)</option>
              <option value="2800">2800 hours (Very Hot)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">{climate.desc}</p>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Current System Age
            </label>
            <input
              type="number"
              value={systemAge}
              onChange={(e) => setSystemAge(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="30"
            />
            <p className="text-xs text-gray-500 mt-1">Average lifespan: 15-20 years</p>
          </div>
        </div>
        
        <button
          onClick={() => setCalculated(true)}
          className="w-full mt-4 bg-blue-600 text-white font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          Calculate Energy Savings
        </button>
      </div>
      
      {/* Comprehensive Results */}
      {calculated && (
        <div className="space-y-6">
          {/* Primary Savings Hero */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Annual Energy Savings</p>
                <p className="text-3xl font-bold text-green-600">${Math.round(annualSavings)}</p>
                <p className="text-sm text-gray-600 mt-1">per year</p>
                <p className="text-xs text-green-600 font-medium mt-2">
                  {percentSavings.toFixed(1)}% reduction in cooling costs
                </p>
              </div>
              
              <div className="border-l border-green-200 pl-4">
                <p className="text-sm font-medium text-gray-600 mb-1">10-Year Total Savings</p>
                <p className="text-2xl font-bold text-gray-900">${tenYearSavings.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Enough to pay for {(tenYearSavings / systemCost).toFixed(1)} new systems
                </p>
              </div>
              
              <div className="border-l border-green-200 pl-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Lifetime Savings (15 yrs)</p>
                <p className="text-2xl font-bold text-gray-900">${lifetimeSavings.toLocaleString()}</p>
                <p className="text-xs text-gray-600 mt-1">
                  ${monthlySavings.toFixed(0)}/month during cooling season
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Cost Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              Operating Cost Analysis
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">Current System ({currentSeer} SEER)</p>
                  <p className="text-xs text-gray-500">{Math.round(currentKwh).toLocaleString()} kWh/year • {parseFloat(systemAge)} years old</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${Math.round(currentCost)}/year</p>
                  <p className="text-xs text-gray-500">${(currentCost/12).toFixed(0)}/month</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">New System ({newSeer} SEER2)</p>
                  <p className="text-xs text-gray-500">{Math.round(newKwh).toLocaleString()} kWh/year • High efficiency</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${Math.round(newCost)}/year</p>
                  <p className="text-xs text-gray-500">${(newCost/12).toFixed(0)}/month</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 bg-green-50 px-2 rounded">
                <div>
                  <p className="text-sm font-bold text-green-700">Your Savings</p>
                  <p className="text-xs text-green-600">{Math.round(kwhSaved).toLocaleString()} kWh saved annually</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-700">${Math.round(annualSavings)}/year</p>
                  <p className="text-xs text-green-600">{percentSavings.toFixed(0)}% reduction</p>
                </div>
              </div>
            </div>
          </div>

          {/* ROI and Payback Analysis */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Return on Investment
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estimated System Cost</span>
                  <span className="text-sm font-semibold text-gray-900">${systemCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Simple Payback Period</span>
                  <span className="text-sm font-semibold text-gray-900">{paybackYears.toFixed(1)} years</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ROI Over 15 Years</span>
                  <span className="text-sm font-semibold text-green-600">
                    {((lifetimeSavings / systemCost - 1) * 100).toFixed(0)}%
                  </span>
                </div>
                
                {qualifiesForRebates && (
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-xs text-blue-700">
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                      May qualify for federal tax credits (up to 30%) and local utility rebates
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                Environmental Impact
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Annual CO₂ Reduction</span>
                  <span className="text-sm font-semibold text-gray-900">{Math.round(co2Reduction).toLocaleString()} lbs</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Equivalent to Planting</span>
                  <span className="text-sm font-semibold text-green-600">{treesEquivalent} trees/year</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Like Taking Off Road</span>
                  <span className="text-sm font-semibold text-gray-900">{carsOffRoad} cars</span>
                </div>
                
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-xs text-green-700">
                    Over 15 years: {Math.round(co2Reduction * 15 / 2000)} tons of CO₂ prevented
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* System Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Additional Benefits of Upgrading to {newSeer} SEER2
            </h3>
            
            <div className="grid md:grid-cols-2 gap-3">
              {isHighEfficiency && (
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Premium Efficiency Rating</p>
                    <p className="text-xs text-gray-600">Qualifies for ENERGY STAR Most Efficient designation</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Enhanced Comfort</p>
                  <p className="text-xs text-gray-600">Better humidity control and more consistent temperatures</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Quieter Operation</p>
                  <p className="text-xs text-gray-600">New systems run 50% quieter than 10+ year old units</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Increased Home Value</p>
                  <p className="text-xs text-gray-600">High-efficiency HVAC adds ~5% to home resale value</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Recommendations */}
          {parseFloat(systemAge) >= 12 && (
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Your {systemAge}-Year-Old System Is Near End of Life
                  </p>
                  <p className="text-xs text-gray-600">
                    Average AC lifespan is 15-20 years. Your system likely needs frequent repairs and operates well below its original efficiency. 
                    Upgrading now prevents unexpected breakdowns and immediately reduces energy costs by ${Math.round(annualSavings)}/year. 
                    Many homeowners see repair costs drop to near zero after upgrading.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Professional Disclaimer */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
            <p>
              *Calculations based on {tons}-ton system operating {coolingHours} hours annually in {climate.zone} at ${electricRate}/kWh. 
              Actual savings depend on home insulation, ductwork condition, thermostat settings, and maintenance. 
              SEER2 ratings use new M1 testing standards (2023+) that better reflect real-world conditions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}