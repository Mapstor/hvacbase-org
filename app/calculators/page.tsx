import Link from 'next/link';
import { Calculator, Thermometer, TrendingUp, Wrench, DollarSign, ArrowRight, Zap, Home, Gauge } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HVAC Calculators: Free BTU, Tonnage, Sizing & Cost Calculators',
  description: 'Professional HVAC calculators for BTU sizing, AC tonnage, heat pump sizing, furnace sizing, energy costs, and more. Free tools to size your HVAC system correctly.',
  alternates: { canonical: 'https://www.hvacbase.org/calculators' },
  openGraph: {
    title: 'Free HVAC Calculators | BTU, Sizing, Cost & Energy Tools',
    description: 'Professional HVAC calculators for system sizing, energy costs, and equipment selection. Size your AC, furnace, heat pump and more.',
    url: 'https://www.hvacbase.org/calculators',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free HVAC Calculators | BTU, Sizing, Cost & Energy Tools',
    description: 'Professional HVAC calculators for system sizing, energy costs, and equipment selection.',
    images: ['/opengraph-image'],
  },
}

// Calculator categories and their tools
const calculatorCategories = {
  'cooling': {
    title: 'AC & Cooling Calculators',
    description: 'Size air conditioners, mini splits, and portable units',
    icon: Thermometer,
    calculators: [
      {
        title: 'AC BTU Calculator',
        href: '/air-conditioner-btu-calculator',
        description: 'Calculate the BTUs needed for your room or house',
        difficulty: 'Easy',
        time: '2 min',
        popular: true
      },
      {
        title: 'AC Tonnage Calculator', 
        href: '/ac-tonnage-calculator',
        description: 'Convert BTUs to tons and size central AC systems',
        difficulty: 'Easy',
        time: '2 min',
        popular: true
      },
      {
        title: 'Mini Split Sizing Calculator',
        href: '/mini-split-sizing-calculator',
        description: 'Size ductless mini split systems for multiple zones',
        difficulty: 'Medium',
        time: '5 min',
        popular: false
      },
      {
        title: 'Heat Pump Size Calculator',
        href: '/heat-pump-size-calculator',
        description: 'Size heat pumps for heating and cooling',
        difficulty: 'Medium', 
        time: '5 min',
        popular: false
      }
    ]
  },
  'heating': {
    title: 'Heating & Furnace Calculators',
    description: 'Size furnaces, boilers, and heating systems',
    icon: Home,
    calculators: [
      {
        title: 'Furnace Sizing Calculator',
        href: '/furnace-sizing-calculator', 
        description: 'Calculate the right furnace size for your home',
        difficulty: 'Medium',
        time: '5 min',
        popular: true
      },
      {
        title: 'Water Heater Sizing Calculator',
        href: '/water-heater-sizing-calculator',
        description: 'Size water heaters based on household usage',
        difficulty: 'Easy',
        time: '3 min',
        popular: false
      }
    ]
  },
  'energy': {
    title: 'Energy & Cost Calculators', 
    description: 'Calculate energy costs, savings, and efficiency',
    icon: DollarSign,
    calculators: [
      {
        title: 'SEER2 Savings Calculator',
        href: '/seer2-savings-calculator',
        description: 'Calculate energy savings from high-efficiency AC',
        difficulty: 'Easy',
        time: '3 min',
        popular: true
      },
      {
        title: 'Heating Cost Calculator',
        href: '/heating-cost-calculator',
        description: 'Compare gas vs electric vs heat pump heating costs',
        difficulty: 'Medium',
        time: '5 min',
        popular: false
      },
      {
        title: 'kWh Cost Calculator',
        href: '/kwh-cost-calculator',
        description: 'Calculate electricity costs for appliances',
        difficulty: 'Easy', 
        time: '2 min',
        popular: false
      }
    ]
  },
  'power': {
    title: 'Electrical & Power Tools',
    description: 'Size generators, calculate power consumption',
    icon: Zap,
    calculators: [
      {
        title: 'Generator Size Calculator',
        href: '/what-size-generator-do-i-need',
        description: 'Size backup generators for your home',
        difficulty: 'Medium',
        time: '5 min',
        popular: false
      },
      {
        title: 'Wire Gauge Calculator', 
        href: '/wire-gauge-chart',
        description: 'Calculate proper wire gauge for HVAC installations',
        difficulty: 'Hard',
        time: '5 min',
        popular: false
      }
    ]
  }
};

// Popular calculators for hero section
const popularCalculators = [
  {
    title: 'AC BTU Calculator',
    href: '/air-conditioner-btu-calculator',
    description: 'Find the right BTU size for any room',
    users: '2.3M+'
  },
  {
    title: 'AC Tonnage Calculator',
    href: '/ac-tonnage-calculator', 
    description: 'Convert BTUs to tons for central AC',
    users: '890K+'
  },
  {
    title: 'SEER2 Savings Calculator',
    href: '/seer2-savings-calculator',
    description: 'Calculate energy savings potential',
    users: '456K+'
  }
];

export default function CalculatorsHub() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Free HVAC Calculators & Sizing Tools
            </h1>
            <p className="text-lg text-green-100 mb-4">
              Interactive calculators and sizing guides for air conditioners, furnaces, heat pumps, water heaters, and energy costs
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span>Professional tools</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>100% free</span>
              </div>
              <div className="flex items-center gap-1">
                <Gauge className="w-4 h-4" />
                <span>Accurate sizing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Most Popular Calculators</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {popularCalculators.map((calc) => (
              <Link 
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">{calc.users} users</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {calc.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {calc.description}
                </p>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <span>Start calculating</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">All HVAC Calculators</h2>
          <div className="space-y-12">
            {Object.entries(calculatorCategories).map(([key, category]) => (
              <div key={key}>
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Calculator className="w-5 h-5 text-green-600" />
                          {calc.popular && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Popular</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          <div>{calc.difficulty}</div>
                          <div>{calc.time}</div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {calc.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {calc.description}
                      </p>
                      
                      <div className="flex items-center text-green-600 text-sm font-medium">
                        <span>Use calculator</span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Use Our HVAC Calculators</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enter Your Details</h3>
              <p className="text-gray-600 text-sm">Input your room size, home details, or current energy usage</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Instant Results</h3>
              <p className="text-gray-600 text-sm">Professional calculations based on industry standards</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Make Informed Decisions</h3>
              <p className="text-gray-600 text-sm">Use results to size equipment, compare options, and save money</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing the Right Calculator?
          </h2>
          <p className="text-gray-600 mb-6">
            Our buying guides and how-to articles provide step-by-step guidance for sizing and selecting HVAC equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buying-guides"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Browse Buying Guides
            </Link>
            <Link
              href="/how-to"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors border border-green-200"
            >
              See How-To Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}