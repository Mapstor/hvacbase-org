'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Calculator } from 'lucide-react';
import UnverifiedCalcNotice from './UnverifiedCalcNotice';

// Calculators whose formulas have not yet been re-verified against primary
// sources. Any <CalcWrapper type=""> whose key is in this Set renders
// <UnverifiedCalcNotice /> instead of the underlying calculator component,
// so no unverified math is served in production. As each calculator finishes
// its verification pass (Tier 1 electrical done; Tier 2 SIZING next), remove
// its type key from this Set and it goes live on the next deploy.
//
// Verified live (NOT in this Set — render normally):
//   mini-split, battery-12v-watts, battery-watt-hours, three-phase-power,
//   generator-amps, furnace-electrical
const UNVERIFIED_TYPES = new Set<string>([
  'ac-tonnage',
  'btu',
  'seer2',
  'kwh-cost',
  'power-consumption',
  'dehumidifier-sizing',
  'air-purifier-sizing',
  'ach',
  'gas-vs-electric',
  'solar-panel',
  'specific-heat',
  'dehumidifier-cost',
  'furnace-sizing',
  'heat-pump-size',
  'water-heater-sizing',
  'generator-sizing',
  'ac-generator',
  'hvac-lifespan',
  'water-heater-lifespan',
  'afue',
  'water-heating-cost',
  'large-room-portable-ac',
  'small-room-portable-ac',
  'hvac-roi',
  'heat-pump-vs-furnace',
]);

// Per-unverified-calc pointer to a topically-adjacent VERIFIED sibling calc,
// shown as an inline "Try our X Calculator →" link inside the notice. Only
// mapped where the sibling covers meaningfully similar ground; unmapped
// types just show the base notice.
const SIBLING_HINT: Record<string, { slug: string; label: string }> = {
  btu:              { slug: '/mini-split-sizing-calculator',        label: 'Mini-Split Sizing Calculator' },
  'ac-tonnage':     { slug: '/mini-split-sizing-calculator',        label: 'Mini-Split Sizing Calculator' },
  'heat-pump-size': { slug: '/mini-split-sizing-calculator',        label: 'Mini-Split Sizing Calculator' },
  'generator-sizing': { slug: '/how-many-amps-does-generator-produce', label: 'Generator Amps Calculator' },
  'ac-generator':     { slug: '/how-many-amps-does-generator-produce', label: 'Generator Amps Calculator' },
};

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
  }),
  'hvac-roi': dynamic(() => import('./HVACROICalculator'), { 
    loading: () => <LoadingCalculator />
  }),
  'heat-pump-vs-furnace': dynamic(() => import('./HeatPumpVsFurnaceCalculator'), { 
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

  // Gate — replace unverified calcs with the notice. This check runs BEFORE
  // the not-found fallback so any type in UNVERIFIED_TYPES that doesn't have
  // a matching component entry still shows the notice, not the fallback.
  if (UNVERIFIED_TYPES.has(calcType)) {
    const sibling = SIBLING_HINT[calcType];
    return (
      <UnverifiedCalcNotice
        siblingSlug={sibling?.slug}
        siblingLabel={sibling?.label}
      />
    );
  }

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