'use client';

import { useState } from 'react';
import CalcWrapper from './CalcWrapper';
import { Home, Sun, Users, Thermometer } from 'lucide-react';

interface BTUResult {
  baseBTU: number;
  adjustedBTU: number;
  tonnage: number;
  factors: string[];
}

export default function BTUCalculator() {
  const [sqft, setSqft] = useState('');
  const [ceilingHeight, setCeilingHeight] = useState('8');
  const [climate, setClimate] = useState('moderate');
  const [sunExposure, setSunExposure] = useState('average');
  const [occupants, setOccupants] = useState('2');
  const [insulation, setInsulation] = useState('average');
  const [result, setResult] = useState<BTUResult | null>(null);

  const calculate = () => {
    const area = parseFloat(sqft);
    if (!area || area <= 0) return;

    let btu = area * 20; // base: 20 BTU per sq ft
    const factors: string[] = [];

    // Ceiling height adjustment
    const ceiling = parseFloat(ceilingHeight);
    if (ceiling > 8) {
      const factor = ceiling / 8;
      btu *= factor;
      factors.push(`+${Math.round((factor - 1) * 100)}% for ${ceiling}ft ceilings`);
    }

    // Climate zone
    const climateFactors: Record<string, number> = {
      hot: 1.3, warm: 1.15, moderate: 1.0, cool: 0.9, cold: 0.8,
    };
    const cf = climateFactors[climate] || 1;
    if (cf !== 1) {
      btu *= cf;
      factors.push(`${cf > 1 ? '+' : ''}${Math.round((cf - 1) * 100)}% for ${climate} climate`);
    }

    // Sun exposure
    const sunFactors: Record<string, number> = {
      heavy: 1.1, average: 1.0, shaded: 0.9,
    };
    const sf = sunFactors[sunExposure] || 1;
    if (sf !== 1) {
      btu *= sf;
      factors.push(`${sf > 1 ? '+' : ''}${Math.round((sf - 1) * 100)}% for ${sunExposure} sun`);
    }

    // Occupants (add 600 BTU per person above 2)
    const occ = parseInt(occupants);
    if (occ > 2) {
      const extra = (occ - 2) * 600;
      btu += extra;
      factors.push(`+${extra.toLocaleString()} BTU for ${occ - 2} extra occupants`);
    }

    // Insulation
    const insFactors: Record<string, number> = {
      poor: 1.15, average: 1.0, good: 0.9, excellent: 0.82,
    };
    const inf = insFactors[insulation] || 1;
    if (inf !== 1) {
      btu *= inf;
      factors.push(`${inf > 1 ? '+' : ''}${Math.round((inf - 1) * 100)}% for ${insulation} insulation`);
    }

    const baseBTU = area * 20;
    const adjustedBTU = Math.round(btu / 1000) * 1000;
    const tonnage = Math.round((adjustedBTU / 12000) * 10) / 10;

    setResult({ baseBTU, adjustedBTU, tonnage, factors });
  };

  return (
    <CalcWrapper
      title="Air Conditioner BTU Calculator"
      description="Find the right AC size for your room based on 6 key factors"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Home size={14} className="inline mr-1" />
            Room Size (sq ft)
          </label>
          <input
            type="number"
            value={sqft}
            onChange={(e) => setSqft(e.target.value)}
            placeholder="e.g. 500"
            className="calc-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ceiling Height (ft)
          </label>
          <select value={ceilingHeight} onChange={(e) => setCeilingHeight(e.target.value)} className="calc-select">
            <option value="8">8 ft (Standard)</option>
            <option value="9">9 ft</option>
            <option value="10">10 ft</option>
            <option value="12">12 ft (Vaulted)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Thermometer size={14} className="inline mr-1" />
            Climate Zone
          </label>
          <select value={climate} onChange={(e) => setClimate(e.target.value)} className="calc-select">
            <option value="hot">Hot (AZ, TX, FL)</option>
            <option value="warm">Warm (GA, SC, LA)</option>
            <option value="moderate">Moderate (NC, TN, VA)</option>
            <option value="cool">Cool (NY, OH, PA)</option>
            <option value="cold">Cold (MN, WI, MI)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Sun size={14} className="inline mr-1" />
            Sun Exposure
          </label>
          <select value={sunExposure} onChange={(e) => setSunExposure(e.target.value)} className="calc-select">
            <option value="heavy">Heavy (South/West facing, lots of windows)</option>
            <option value="average">Average</option>
            <option value="shaded">Shaded (North facing, trees)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Users size={14} className="inline mr-1" />
            Number of Occupants
          </label>
          <select value={occupants} onChange={(e) => setOccupants(e.target.value)} className="calc-select">
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5+ people</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insulation Quality
          </label>
          <select value={insulation} onChange={(e) => setInsulation(e.target.value)} className="calc-select">
            <option value="poor">Poor (Old home, no upgrades)</option>
            <option value="average">Average (Standard construction)</option>
            <option value="good">Good (Updated insulation)</option>
            <option value="excellent">Excellent (New build, spray foam)</option>
          </select>
        </div>
      </div>

      <button onClick={calculate} className="calc-button w-full mt-4">
        Calculate BTU Requirement
      </button>

      {result && (
        <div className="calc-result">
          <p className="text-sm text-brand-200 mb-1">Recommended AC Size</p>
          <p className="text-4xl font-bold">{result.adjustedBTU.toLocaleString()} BTU</p>
          <p className="text-xl mt-1 text-brand-200">{result.tonnage} Tons</p>
          <div className="mt-4 text-left bg-brand-800 rounded-lg p-4">
            <p className="text-sm font-medium text-brand-200 mb-2">Calculation Breakdown:</p>
            <p className="text-sm text-brand-100">Base: {sqft} sq ft × 20 BTU = {result.baseBTU.toLocaleString()} BTU</p>
            {result.factors.map((f, i) => (
              <p key={i} className="text-sm text-brand-100">• {f}</p>
            ))}
          </div>
        </div>
      )}
    </CalcWrapper>
  );
}
