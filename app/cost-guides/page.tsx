import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, DollarSign, TrendingUp, Calculator, PiggyBank, CreditCard, FileText, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Cost Guide 2024: Installation, Repair & Maintenance Pricing',
  description: 'Complete HVAC cost guide with detailed pricing for installation, repairs, and maintenance. Get accurate estimates, financing options, and money-saving tips.',
  openGraph: {
    title: 'HVAC Cost Guide | Installation & Repair Pricing',
    description: 'Comprehensive pricing guide for all HVAC services. Installation costs, repair estimates, and maintenance pricing.',
    type: 'website',
  }
}

const costCategories = {
  'Installation Costs': {
    icon: <Home className="w-6 h-6 text-blue-600" />,
    description: 'Complete system installation pricing and factors',
    guides: [
      {
        title: 'Central AC Installation Cost',
        href: '/air-conditioners/central-ac-installation-cost',
        priceRange: '$3,500 - $7,500',
        factors: ['System size', 'SEER rating', 'Ductwork', 'Labor'],
        savings: 'Save up to 20% off-season'
      },
      {
        title: 'Furnace Installation Cost',
        href: '/furnaces-heating/furnace-installation-cost',
        priceRange: '$2,500 - $6,500',
        factors: ['Fuel type', 'AFUE rating', 'Venting', 'Permits'],
        savings: 'Rebates up to $1,500'
      },
      {
        title: 'Heat Pump Installation Cost',
        href: '/heat-pumps/heat-pump-installation-cost',
        priceRange: '$4,000 - $8,500',
        factors: ['Type', 'HSPF/SEER', 'Dual fuel', 'Controls'],
        savings: 'Tax credits up to $2,000'
      },
      {
        title: 'Mini Split Installation Cost',
        href: '/mini-split-air-conditioners/mini-split-installation-cost',
        priceRange: '$3,000 - $10,000',
        factors: ['Zones', 'BTUs', 'Line sets', 'Electrical'],
        savings: 'DIY saves 30-40%'
      },
      {
        title: 'Boiler Installation Cost',
        href: '/furnaces-heating/boiler-installation-cost',
        priceRange: '$3,500 - $8,000',
        factors: ['Type', 'Efficiency', 'Piping', 'Controls'],
        savings: 'Energy savings 20-30%'
      },
      {
        title: 'Ductwork Installation Cost',
        href: '/ductwork/ductwork-installation-cost',
        priceRange: '$3,000 - $7,500',
        factors: ['Home size', 'Accessibility', 'Materials', 'Insulation'],
        savings: 'Improves efficiency 20%'
      }
    ]
  },
  'Repair Costs': {
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    description: 'Common repair pricing and diagnostic fees',
    guides: [
      {
        title: 'AC Repair Cost Guide',
        href: '/air-conditioners/ac-repair-costs',
        priceRange: '$150 - $1,200',
        commonRepairs: ['Capacitor', 'Compressor', 'Refrigerant', 'Fan motor'],
        avgCost: '$450'
      },
      {
        title: 'Furnace Repair Cost Guide',
        href: '/furnaces-heating/furnace-repair-costs',
        priceRange: '$100 - $1,500',
        commonRepairs: ['Ignitor', 'Blower motor', 'Heat exchanger', 'Control board'],
        avgCost: '$350'
      },
      {
        title: 'Heat Pump Repair Costs',
        href: '/heat-pumps/heat-pump-repair-costs',
        priceRange: '$150 - $1,500',
        commonRepairs: ['Reversing valve', 'Defrost board', 'Compressor', 'Coils'],
        avgCost: '$500'
      },
      {
        title: 'Emergency Repair Pricing',
        href: '/repairs/emergency-hvac-costs',
        priceRange: '$200 - $2,000+',
        commonRepairs: ['After hours', 'Weekend rates', 'Holiday pricing', 'Rush service'],
        avgCost: '1.5-2x normal rates'
      }
    ]
  },
  'Maintenance Costs': {
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    description: 'Annual service contracts and tune-up pricing',
    guides: [
      {
        title: 'Annual Maintenance Cost',
        href: '/maintenance/annual-hvac-maintenance-cost',
        priceRange: '$150 - $500/year',
        includes: ['Spring AC tune-up', 'Fall heating check', 'Filter changes', 'Priority service'],
        savings: 'Prevents 95% of breakdowns'
      },
      {
        title: 'AC Tune-Up Cost',
        href: '/air-conditioners/ac-tune-up-cost',
        priceRange: '$75 - $200',
        includes: ['Cleaning', 'Inspection', 'Refrigerant check', 'Electrical test'],
        savings: 'Improves efficiency 5-15%'
      },
      {
        title: 'Furnace Tune-Up Cost',
        href: '/furnaces-heating/furnace-tune-up-cost',
        priceRange: '$80 - $200',
        includes: ['Safety check', 'Cleaning', 'Calibration', 'Carbon monoxide test'],
        savings: 'Extends life 5+ years'
      },
      {
        title: 'Service Contract Comparison',
        href: '/maintenance/service-contract-comparison',
        priceRange: '$200 - $600/year',
        includes: ['Basic vs premium', 'Coverage details', 'Exclusions', 'Value analysis'],
        savings: 'Save 15-20% on repairs'
      }
    ]
  },
  'Replacement Costs': {
    icon: <Calculator className="w-6 h-6 text-orange-600" />,
    description: 'Component replacement and upgrade pricing',
    guides: [
      {
        title: 'Compressor Replacement Cost',
        href: '/repairs/compressor-replacement-cost',
        priceRange: '$1,500 - $2,800',
        factors: ['Type', 'Size', 'Brand', 'Warranty'],
        consideration: 'Consider full system if >10 years'
      },
      {
        title: 'Heat Exchanger Replacement',
        href: '/repairs/heat-exchanger-replacement-cost',
        priceRange: '$1,500 - $3,500',
        factors: ['Material', 'Warranty', 'Labor', 'Permits'],
        consideration: 'Often better to replace furnace'
      },
      {
        title: 'Blower Motor Replacement',
        href: '/repairs/blower-motor-replacement-cost',
        priceRange: '$450 - $1,200',
        factors: ['Type', 'ECM vs PSC', 'Horsepower', 'Speed'],
        consideration: 'Upgrade to variable speed'
      },
      {
        title: 'Thermostat Replacement Cost',
        href: '/thermostats/thermostat-replacement-cost',
        priceRange: '$150 - $500',
        factors: ['Smart features', 'Wiring', 'Zoning', 'Installation'],
        consideration: 'Smart upgrade saves 20%'
      }
    ]
  },
  'Operating Costs': {
    icon: <PiggyBank className="w-6 h-6 text-cyan-600" />,
    description: 'Monthly and annual energy cost calculators',
    guides: [
      {
        title: 'AC Operating Cost Calculator',
        href: '/energy-costs/ac-operating-cost-calculator',
        monthlyRange: '$50 - $300',
        factors: ['SEER rating', 'Runtime', 'Electric rates', 'Home size'],
        tool: 'Interactive calculator'
      },
      {
        title: 'Heating Cost Comparison',
        href: '/energy-costs/heating-cost-calculator',
        monthlyRange: '$80 - $400',
        factors: ['Fuel type', 'Efficiency', 'Climate', 'Insulation'],
        tool: 'Compare all fuel types'
      },
      {
        title: 'Heat Pump vs Gas Cost',
        href: '/energy-costs/heat-pump-vs-gas-cost',
        monthlyRange: 'Varies by region',
        factors: ['Electric vs gas rates', 'COP', 'Climate zone', 'Usage'],
        tool: 'Regional comparison'
      },
      {
        title: 'Energy Savings Calculator',
        href: '/energy-costs/energy-savings-calculator',
        savingsRange: '$200 - $1,000/year',
        factors: ['Current system', 'New efficiency', 'Usage patterns', 'Rates'],
        tool: 'ROI calculator'
      }
    ]
  },
  'Financing & Incentives': {
    icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
    description: 'Payment options, rebates, and tax credits',
    guides: [
      {
        title: 'HVAC Financing Options',
        href: '/financing/hvac-financing-options',
        options: ['0% APR', 'Home equity', 'Personal loans', 'Manufacturer financing'],
        terms: '6-120 months',
        tips: 'Compare rates and terms'
      },
      {
        title: 'Federal Tax Credits 2024',
        href: '/incentives/federal-tax-credits',
        amount: 'Up to $2,000',
        eligible: ['Heat pumps', 'Central AC', 'Boilers', 'Furnaces'],
        requirements: 'Energy Star certified'
      },
      {
        title: 'Utility Rebates by State',
        href: '/incentives/utility-rebates',
        amount: '$50 - $2,500',
        programs: ['Equipment rebates', 'Efficiency upgrades', 'Smart thermostats', 'Tune-ups'],
        finder: 'State-by-state database'
      },
      {
        title: 'Lease vs Buy Analysis',
        href: '/financing/lease-vs-buy-hvac',
        comparison: ['Monthly costs', 'Total cost', 'Maintenance', 'Flexibility'],
        recommendation: 'Best for each situation'
      }
    ]
  }
}

const priceRanges = {
  'System Installation': [
    { type: 'Central AC', low: 3500, high: 7500, avg: 5500 },
    { type: 'Gas Furnace', low: 2500, high: 6500, avg: 4500 },
    { type: 'Heat Pump', low: 4000, high: 8500, avg: 6200 },
    { type: 'Mini Split', low: 3000, high: 10000, avg: 5500 },
    { type: 'Boiler', low: 3500, high: 8000, avg: 5800 },
    { type: 'Dual System', low: 6000, high: 12000, avg: 9000 }
  ],
  'Common Repairs': [
    { type: 'Capacitor', low: 150, high: 450, avg: 300 },
    { type: 'Refrigerant', low: 200, high: 800, avg: 500 },
    { type: 'Blower Motor', low: 450, high: 1200, avg: 800 },
    { type: 'Ignitor', low: 150, high: 350, avg: 250 },
    { type: 'Control Board', low: 400, high: 800, avg: 600 },
    { type: 'Compressor', low: 1500, high: 2800, avg: 2100 }
  ]
}

const moneySavingTips = [
  'Get 3+ quotes for major work - prices vary 20-40%',
  'Schedule installation in off-season for 10-20% savings',
  'Regular maintenance prevents 95% of breakdowns',
  'Upgrade during replacement for best efficiency ROI',
  'Check for rebates before purchasing - save up to $2,500',
  'Consider financing for 0% APR promotional periods'
]

export default function CostGuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC Cost Guide 2024
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Complete pricing guide for installation, repairs, maintenance, and operating costs with money-saving tips
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/energy-costs/heating-cost-calculator"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                💰 Cost Calculator
              </Link>
              <Link
                href="/incentives/rebate-finder"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                🎁 Find Rebates
              </Link>
              <Link
                href="/financing/hvac-financing-options"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                💳 Financing Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Price Ranges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Price Reference</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">System Installation Costs</h3>
              <div className="space-y-3">
                {priceRanges['System Installation'].map((item) => (
                  <div key={item.type} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.type}</span>
                      <span className="text-green-600 font-semibold">${item.avg.toLocaleString()} avg</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        style={{
                          left: `${(item.low / 12000) * 100}%`,
                          width: `${((item.high - item.low) / 12000) * 100}%`
                        }}
                      />
                      <div 
                        className="absolute h-2 w-2 bg-green-700 rounded-full -mt-0"
                        style={{
                          left: `${(item.avg / 12000) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>${item.low.toLocaleString()}</span>
                      <span>${item.high.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Repair Costs</h3>
              <div className="space-y-3">
                {priceRanges['Common Repairs'].map((item) => (
                  <div key={item.type} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.type}</span>
                      <span className="text-blue-600 font-semibold">${item.avg.toLocaleString()} avg</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div 
                        className="absolute h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{
                          left: `${(item.low / 3000) * 100}%`,
                          width: `${((item.high - item.low) / 3000) * 100}%`
                        }}
                      />
                      <div 
                        className="absolute h-2 w-2 bg-blue-700 rounded-full"
                        style={{
                          left: `${(item.avg / 3000) * 100}%`
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>${item.low.toLocaleString()}</span>
                      <span>${item.high.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Detailed Cost Guides</h2>
          <div className="space-y-12">
            {Object.entries(costCategories).map(([category, data]) => (
              <div key={category}>
                <div className="flex items-center mb-6">
                  {data.icon}
                  <div className="ml-3">
                    <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                    <p className="text-gray-600">{data.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.guides.map((guide) => (
                    <Card key={guide.title} className="hover:shadow-lg transition-shadow">
                      <div className="p-5">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          <Link href={guide.href} className="hover:text-green-600">
                            {guide.title}
                          </Link>
                        </h4>
                        <div className="text-2xl font-bold text-green-600 mb-3">
                          {'priceRange' in guide ? guide.priceRange : 
                           'monthlyRange' in guide ? guide.monthlyRange :
                           'amount' in guide ? guide.amount :
                           'savingsRange' in guide ? guide.savingsRange :
                           'options' in guide ? guide.options?.[0] : ''}
                        </div>
                        
                        {'factors' in guide && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-500">Price Factors:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {guide.factors.map((factor, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {factor}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {'commonRepairs' in guide && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-500">Common Issues:</span>
                            <div className="text-sm text-gray-600 mt-1">
                              {guide.commonRepairs.join(' • ')}
                            </div>
                          </div>
                        )}
                        
                        {'includes' in guide && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-500">Includes:</span>
                            <div className="text-sm text-gray-600 mt-1">
                              {guide.includes.slice(0, 2).join(' • ')}
                            </div>
                          </div>
                        )}
                        
                        {'savings' in guide && guide.savings && (
                          <div className="text-sm font-medium text-emerald-600 mb-2">
                            💰 {guide.savings}
                          </div>
                        )}
                        
                        {'avgCost' in guide && guide.avgCost && (
                          <div className="text-sm text-gray-600 mb-2">
                            Average: <span className="font-semibold">{guide.avgCost}</span>
                          </div>
                        )}
                        
                        {'consideration' in guide && guide.consideration && (
                          <div className="text-xs text-gray-500 italic mb-2">
                            💡 {guide.consideration}
                          </div>
                        )}
                        
                        {'tool' in guide && guide.tool && (
                          <div className="text-sm font-medium text-blue-600 mb-2">
                            🔧 {guide.tool}
                          </div>
                        )}
                        
                        <Link
                          href={guide.href}
                          className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium mt-2"
                        >
                          View Details
                          <ChevronRight className="ml-1 w-3 h-3" />
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money Saving Tips */}
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">💰 Money-Saving Tips</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Smart strategies to reduce your HVAC costs by 20-40%
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {moneySavingTips.map((tip, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Interactive Cost Calculators</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/energy-costs/ac-operating-cost-calculator" className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">AC Cost Calculator</h3>
              <p className="text-sm text-gray-600">Monthly cooling costs</p>
            </Link>
            <Link href="/energy-costs/heating-cost-calculator" className="bg-orange-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Calculator className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Heating Calculator</h3>
              <p className="text-sm text-gray-600">Compare fuel costs</p>
            </Link>
            <Link href="/financing/loan-calculator" className="bg-green-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Finance Calculator</h3>
              <p className="text-sm text-gray-600">Monthly payments</p>
            </Link>
            <Link href="/energy-costs/roi-calculator" className="bg-purple-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">ROI Calculator</h3>
              <p className="text-sm text-gray-600">Upgrade payback</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Estimate CTA */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Accurate Pricing for Your Project</h2>
          <p className="text-xl text-green-100 mb-8">
            Compare quotes from qualified contractors and save up to 40%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quotes"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Get Free Quotes
            </Link>
            <Link
              href="/financing/hvac-financing-options"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors border border-green-500"
            >
              Explore Financing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}