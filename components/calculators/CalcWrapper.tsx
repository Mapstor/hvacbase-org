'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Calculator } from 'lucide-react';

// Dynamically import calculators with SSR enabled for better SEO
const calculators = {
  'ac-tonnage': dynamic(() => import('./ACTonnageCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'btu': dynamic(() => import('./BTUCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'seer2': dynamic(() => import('./SEER2Calculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'mini-split': dynamic(() => import('./MiniSplitCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'kwh-cost': dynamic(() => import('./KWhCostCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'power-consumption': dynamic(() => import('./PowerConsumptionCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'dehumidifier-sizing': dynamic(() => import('./DehumidifierSizingCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'air-purifier-sizing': dynamic(() => import('./AirPurifierSizingCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'ach': dynamic(() => import('./ACHCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'gas-vs-electric': dynamic(() => import('./GasVsElectricCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'three-phase-power': dynamic(() => import('./ThreePhasePowerCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'solar-panel': dynamic(() => import('./SolarPanelCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'battery-watt-hours': dynamic(() => import('./BatteryWattHoursCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'battery-12v-watts': dynamic(() => import('./Battery12VWattsCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'specific-heat': dynamic(() => import('./SpecificHeatCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'dehumidifier-cost': dynamic(() => import('./DehumidifierCostCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'furnace-sizing': dynamic(() => import('./FurnaceSizingCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'heat-pump-size': dynamic(() => import('./HeatPumpSizeCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'water-heater-sizing': dynamic(() => import('./WaterHeaterSizingCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'generator-sizing': dynamic(() => import('./GeneratorSizingCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'ac-generator': dynamic(() => import('./ACGeneratorCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'generator-amps': dynamic(() => import('./GeneratorAmpsCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'hvac-lifespan': dynamic(() => import('./HVACLifespanCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'water-heater-lifespan': dynamic(() => import('./WaterHeaterLifespanCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'afue': dynamic(() => import('./AFUECalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'furnace-electrical': dynamic(() => import('./FurnaceElectricalCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'water-heating-cost': dynamic(() => import('./WaterHeatingCostCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'large-room-portable-ac': dynamic(() => import('./LargeRoomPortableACCalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'small-room-portable-ac': dynamic(() => import('./SmallRoomPortableACCalculator'), { 
    loading: () => <LoadingCalculator />
  })
};

function LoadingCalculator() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gray-100 p-3 rounded-lg animate-pulse">
          <Calculator className="w-6 h-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
        <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

interface CalcWrapperProps {
  type?: string;
  calculator?: string;
}

export default function CalcWrapper({ type, calculator }: CalcWrapperProps) {
  // Support both 'type' and 'calculator' props for flexibility
  const calcType = type || calculator || 'btu';
  const CalculatorComponent = calculators[calcType as keyof typeof calculators];
  
  if (!CalculatorComponent) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
        <p className="text-yellow-800">
          Calculator type "{calcType}" not found. Available types: {Object.keys(calculators).join(', ')}
        </p>
      </div>
    );
  }
  
  return (
    <Suspense fallback={<LoadingCalculator />}>
      <CalculatorComponent />
    </Suspense>
  );
}