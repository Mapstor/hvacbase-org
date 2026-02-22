'use client';

import { useState } from 'react';
import CalcWrapper from './CalcWrapper';
import { DollarSign, TrendingDown, Clock } from 'lucide-react';

export default function SEERCalculator() {
  const [seer1, setSeer1] = useState('14');
  const [seer2, setSeer2] = useState('20');
  const [btu, setBtu] = useState('36000');
  const [hours, setHours] = useState('1500');
  const [rate, setRate] = useState('0.15');
  const [priceDiff, setPriceDiff] = useState('2000');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const s1 = parseFloat(seer1);
    const s2 = parseFloat(seer2);
    const b = parseFloat(btu);
    const h = parseFloat(hours);
    const r = parseFloat(rate);
    const pd = parseFloat(priceDiff);

    if (!s1 || !s2 || !b || !h || !r) return;

    // Annual kWh = (BTU × hours) / (SEER × 1000)
    const kwh1 = (b * h) / (s1 * 1000);
    const kwh2 = (b * h) / (s2 * 1000);
    const cost1 = kwh1 * r;
    const cost2 = kwh2 * r;
    const annualSavings = cost1 - cost2;
    const paybackYears = pd > 0 && annualSavings > 0 ? pd / annualSavings : 0;
    const savings10yr = annualSavings * 10;
    const savings15yr = annualSavings * 15;

    setResult({
      kwh1: Math.round(kwh1),
      kwh2: Math.round(kwh2),
      cost1: cost1.toFixed(0),
      cost2: cost2.toFixed(0),
      annualSavings: annualSavings.toFixed(0),
      paybackYears: paybackYears.toFixed(1),
      savings10yr: savings10yr.toFixed(0),
      savings15yr: savings15yr.toFixed(0),
      percentSaved: ((1 - s1 / s2) * 100).toFixed(0),
    });
  };

  return (
    <CalcWrapper
      title="SEER Savings Calculator"
      description="Compare energy costs between two AC efficiency ratings"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current/Lower SEER</label>
          <input type="number" value={seer1} onChange={(e) => setSeer1(e.target.value)} className="calc-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New/Higher SEER</label>
          <input type="number" value={seer2} onChange={(e) => setSeer2(e.target.value)} className="calc-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">AC Size (BTU)</label>
          <select value={btu} onChange={(e) => setBtu(e.target.value)} className="calc-select">
            <option value="18000">18,000 BTU (1.5 Ton)</option>
            <option value="24000">24,000 BTU (2 Ton)</option>
            <option value="30000">30,000 BTU (2.5 Ton)</option>
            <option value="36000">36,000 BTU (3 Ton)</option>
            <option value="42000">42,000 BTU (3.5 Ton)</option>
            <option value="48000">48,000 BTU (4 Ton)</option>
            <option value="60000">60,000 BTU (5 Ton)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cooling Hours/Year</label>
          <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="calc-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Electric Rate ($/kWh)</label>
          <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} className="calc-input" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Difference ($)</label>
          <input type="number" value={priceDiff} onChange={(e) => setPriceDiff(e.target.value)} className="calc-input" />
        </div>
      </div>

      <button onClick={calculate} className="calc-button w-full mt-4">
        Compare SEER Ratings
      </button>

      {result && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-700 text-white rounded-xl p-5 text-center">
            <DollarSign size={24} className="mx-auto mb-2 text-brand-200" />
            <p className="text-sm text-brand-200">Annual Savings</p>
            <p className="text-3xl font-bold">${result.annualSavings}</p>
            <p className="text-xs text-brand-300 mt-1">{result.percentSaved}% less energy</p>
          </div>
          <div className="bg-green-700 text-white rounded-xl p-5 text-center">
            <Clock size={24} className="mx-auto mb-2 text-green-200" />
            <p className="text-sm text-green-200">Payback Period</p>
            <p className="text-3xl font-bold">{result.paybackYears} yrs</p>
            <p className="text-xs text-green-300 mt-1">to recover ${priceDiff} premium</p>
          </div>
          <div className="bg-amber-600 text-white rounded-xl p-5 text-center">
            <TrendingDown size={24} className="mx-auto mb-2 text-amber-200" />
            <p className="text-sm text-amber-200">15-Year Savings</p>
            <p className="text-3xl font-bold">${result.savings15yr}</p>
            <p className="text-xs text-amber-300 mt-1">over AC lifetime</p>
          </div>
          <div className="md:col-span-3 bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-medium text-gray-900 mb-2">Detailed Comparison:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">{seer1} SEER</p>
                <p className="text-gray-800">{result.kwh1.toLocaleString()} kWh/year → <strong>${result.cost1}/year</strong></p>
              </div>
              <div>
                <p className="text-gray-500">{seer2} SEER</p>
                <p className="text-gray-800">{result.kwh2.toLocaleString()} kWh/year → <strong>${result.cost2}/year</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </CalcWrapper>
  );
}
