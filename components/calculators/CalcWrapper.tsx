'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Calculator } from 'lucide-react';

// Dynamically import calculators
const calculators = {
  'ac-tonnage': dynamic(() => import('./ACTonnageCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'btu': dynamic(() => import('./BTUCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'seer2': dynamic(() => import('./SEER2Calculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'mini-split': dynamic(() => import('./MiniSplitCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'kwh-cost': dynamic(() => import('./KWhCostCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'power-consumption': dynamic(() => import('./PowerConsumptionCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'dehumidifier-sizing': dynamic(() => import('./DehumidifierSizingCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'air-purifier-sizing': dynamic(() => import('./AirPurifierSizingCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'ach': dynamic(() => import('./ACHCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'gas-vs-electric': dynamic(() => import('./GasVsElectricCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'three-phase-power': dynamic(() => import('./ThreePhasePowerCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'solar-panel': dynamic(() => import('./SolarPanelCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'battery-watt-hours': dynamic(() => import('./BatteryWattHoursCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'battery-12v-watts': dynamic(() => import('./Battery12VWattsCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'specific-heat': dynamic(() => import('./SpecificHeatCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'dehumidifier-cost': dynamic(() => import('./DehumidifierCostCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'furnace-sizing': dynamic(() => import('./FurnaceSizingCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'heat-pump-size': dynamic(() => import('./HeatPumpSizeCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'water-heater-sizing': dynamic(() => import('./WaterHeaterSizingCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'generator-sizing': dynamic(() => import('./GeneratorSizingCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'ac-generator': dynamic(() => import('./ACGeneratorCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'generator-amps': dynamic(() => import('./GeneratorAmpsCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'hvac-lifespan': dynamic(() => import('./HVACLifespanCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'water-heater-lifespan': dynamic(() => import('./WaterHeaterLifespanCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'afue': dynamic(() => import('./AFUECalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'furnace-electrical': dynamic(() => import('./FurnaceElectricalCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'water-heating-cost': dynamic(() => import('./WaterHeatingCostCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'large-room-portable-ac': dynamic(() => import('./LargeRoomPortableACCalculator'), { 
    ssr: false,
    loading: () => <LoadingCalculator />
  }),
  'small-room-portable-ac': dynamic(() => import('./SmallRoomPortableACCalculator'), { 
    ssr: false,
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