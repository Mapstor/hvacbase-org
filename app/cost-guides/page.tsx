import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, DollarSign, TrendingUp, Calculator, PiggyBank, CreditCard, FileText, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Cost Guide 2026: Installation, Repair & Maintenance Pricing',
  description: 'HVAC cost guide covering installation, repairs, maintenance, and operating costs. Learn what drives each price, how to read a quote, and where the real savings are.',
  alternates: { canonical: 'https://www.hvacbase.org/cost-guides' },
  openGraph: {
    title: 'HVAC Cost Guide | Installation & Repair Pricing',
    description: 'Guides to HVAC installation, repair, maintenance, and operating costs, with the factors that drive each price.',
    url: 'https://www.hvacbase.org/cost-guides',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Cost Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Cost Guide | Installation & Repair Pricing',
    description: 'Guides to HVAC installation, repair, maintenance, and operating costs.',
    images: ['/opengraph-image'],
  },
}

// Hub cards describe each guide and link to it. Specific prices live in the
// linked articles (labeled estimates there), not on this hub — so no dollar
// figures appear in the card data or the prose below.
const costCategories = {
  'Installation Costs': {
    icon: <Home className="w-6 h-6 text-blue-600" />,
    description: 'Complete system installation pricing and factors',
    prose: `Installation is where the widest price spread lives, and most of it has nothing to do with the equipment itself. Ductwork condition, electrical upgrades, permit costs, and whether the crew works in an easy basement or a cramped attic often matter more than the unit. Insist on an itemized quote that separates equipment, labor, permits, and any modifications, so you can see what you are paying for.`,
    guides: [
      {
        title: 'Central AC Installation Cost',
        href: '/central-ac-cost-to-install',
        factors: ['System size', 'SEER rating', 'Ductwork', 'Labor'],
        savings: 'Off-season pricing often available'
      },
      {
        title: 'Furnace Installation Cost',
        href: '/furnace-installation-cost',
        factors: ['Fuel type', 'AFUE rating', 'Venting', 'Permits'],
        savings: 'Federal, state, and utility rebates vary by location'
      },
      {
        title: 'Mini Split Installation Cost',
        href: '/mini-split-installation-cost',
        factors: ['Zones', 'BTUs', 'Line sets', 'Electrical'],
        savings: 'Significant labor savings for DIY-eligible installs'
      },
      {
        title: 'Ductwork Installation Cost',
        href: '/hvac-ductwork-guide',
        factors: ['Home size', 'Accessibility', 'Materials', 'Insulation'],
        savings: 'Reduces air leakage and improves comfort'
      }
    ]
  },
  'Repair Costs': {
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    description: 'Common repair pricing and diagnostic fees',
    prose: `The real question with a repair is not "how much", it is whether you are fixing the system or feeding a unit you will replace soon. A common rule: if the repair approaches half the price of a new system and the unit is past two-thirds of its expected life, replacement usually wins. Get the specific failed part named and priced before agreeing to anything larger, and watch for a minor fix that turns into a "replace the whole thing" pitch.`,
    guides: [
      {
        title: 'Emergency Repair Pricing',
        href: '/hvac-maintenance-cost',
        commonRepairs: ['After hours', 'Weekend rates', 'Holiday pricing', 'Rush service']
      }
    ]
  },
  'Maintenance Costs': {
    icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
    description: 'Annual service contracts and tune-up pricing',
    prose: `Maintenance is the cheapest money you will spend on HVAC, and skipping it is how the expensive problems start. One professional tune-up a year, spring for AC and fall for heating, plus filter changes you do yourself, covers most of the benefit. Be wary of plans that bundle vague "priority service" and "discounts" into visits you do not need.`,
    guides: [
      {
        title: 'Annual Maintenance Cost',
        href: '/hvac-maintenance-cost',
        includes: ['Spring AC tune-up', 'Fall heating check', 'Filter changes', 'Priority service'],
        savings: 'Catches issues before they become failures'
      },
      {
        title: 'Service Contract Comparison',
        href: '/hvac-maintenance-cost',
        includes: ['Basic vs premium', 'Coverage details', 'Exclusions', 'Value analysis'],
        savings: 'Discounted repair pricing for members'
      }
    ]
  },
  'Replacement Costs': {
    icon: <Calculator className="w-6 h-6 text-orange-600" />,
    description: 'Component replacement and upgrade pricing',
    prose: `Replacing a system is the biggest HVAC decision you will make, and timing changes the math. Planning for the shoulder seasons, rather than an emergency swap mid-heat-wave, routinely lowers the price on the same equipment. Insist on a Manual J load calculation rather than a rule-of-thumb size, because an oversized system short-cycles, controls humidity poorly, and wears out faster.`,
    guides: [
      {
        title: 'Heat Exchanger Replacement',
        href: '/cracked-heat-exchanger',
        factors: ['Material', 'Warranty', 'Labor', 'Permits'],
        consideration: 'Often better to replace furnace'
      },
      {
        title: 'Blower Motor Replacement',
        href: '/furnace-installation-cost',
        factors: ['Type', 'ECM vs PSC', 'Horsepower', 'Speed'],
        consideration: 'Upgrade to variable speed'
      },
      {
        title: 'Thermostat Replacement Cost',
        href: '/smart-thermostat-savings',
        factors: ['Smart features', 'Wiring', 'Zoning', 'Installation'],
        consideration: 'Smart features enable easier scheduling'
      }
    ]
  },
  'Operating Costs': {
    icon: <PiggyBank className="w-6 h-6 text-cyan-600" />,
    description: 'Monthly and annual energy cost calculators',
    prose: `Operating cost is driven by three things you can influence: your equipment's efficiency rating, your local energy price, and how well your home holds conditioned air. Efficiency upgrades have real but diminishing returns, so the cheapest kWh is the one you do not use. Seal duct leaks, add attic insulation, and use a programmable thermostat before assuming you need higher-efficiency equipment.`,
    guides: [
      {
        title: 'AC Operating Cost Calculator',
        href: '/kwh-cost-calculator',
        factors: ['SEER rating', 'Runtime', 'Electric rates', 'Home size'],
        tool: 'Interactive calculator'
      },
      {
        title: 'Heating Cost Comparison',
        href: '/heating-cost-calculator',
        factors: ['Fuel type', 'Efficiency', 'Climate', 'Insulation'],
        tool: 'Compare all fuel types'
      },
      {
        title: 'Heat Pump vs Gas Cost',
        href: '/furnace-vs-heat-pump',
        factors: ['Electric vs gas rates', 'COP', 'Climate zone', 'Usage'],
        tool: 'Regional comparison'
      },
      {
        title: 'Energy Savings Calculator',
        href: '/seer2-comparison-calculator',
        factors: ['Current system', 'New efficiency', 'Usage patterns', 'Rates'],
        tool: 'ROI calculator'
      }
    ]
  },
  'Financing & Incentives': {
    icon: <CreditCard className="w-6 h-6 text-indigo-600" />,
    description: 'Payment options, rebates, and tax credits',
    prose: `Financing an HVAC system is sometimes the right move and sometimes an expensive habit dressed up as convenience. Utility, state, and federal programs offer real money, so check what yours offer before you sign anything. Always separate "what system do I need" from "how do I pay for it", and know the actual APR and total cost, not just the monthly figure.`,
    guides: [
      {
        title: 'Utility Rebates by State',
        href: '/hvac-rebates-by-state',
        programs: ['Equipment rebates', 'Efficiency upgrades', 'Smart thermostats', 'Tune-ups'],
        finder: 'State-by-state database'
      }
    ]
  }
}

const moneySavingTips = [
  'Get 3+ quotes for major work, installer pricing varies widely',
  'Schedule installation in the off-season for lower pricing',
  'Regular maintenance catches most issues before they cause a failure',
  'Upgrade during replacement for better efficiency ROI',
  'Check federal, state, and utility rebates before purchasing.',
  'Separate the equipment decision from how you pay for it'
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
              HVAC Cost Guide 2026
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Guides to installation, repair, maintenance, and operating costs, with the factors that drive each price
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/heating-cost-calculator"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                💰 Cost Calculator
              </Link>
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
                <div className="flex items-center mb-4">
                  {data.icon}
                  <div className="ml-3">
                    <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                    <p className="text-gray-600">{data.description}</p>
                  </div>
                </div>
                {'prose' in data && data.prose && (
                  <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6 max-w-4xl">
                    <p className="text-gray-700 leading-relaxed">{data.prose}</p>
                  </div>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.guides.map((guide) => (
                    <Card key={guide.title} className="hover:shadow-lg transition-shadow">
                      <div className="p-5">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          <Link href={guide.href} className="hover:text-green-600">
                            {guide.title}
                          </Link>
                        </h4>

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

                        {'programs' in guide && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-gray-500">Programs:</span>
                            <div className="text-sm text-gray-600 mt-1">
                              {guide.programs.slice(0, 2).join(' • ')}
                            </div>
                          </div>
                        )}

                        {'savings' in guide && guide.savings && (
                          <div className="text-sm font-medium text-emerald-600 mb-2">
                            💰 {guide.savings}
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

                        {'finder' in guide && guide.finder && (
                          <div className="text-sm font-medium text-blue-600 mb-2">
                            🔧 {guide.finder}
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
              Smart strategies to reduce your HVAC costs
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
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/kwh-cost-calculator" className="bg-blue-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">AC Cost Calculator</h3>
              <p className="text-sm text-gray-600">Monthly cooling costs</p>
            </Link>
            <Link href="/heating-cost-calculator" className="bg-orange-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Calculator className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Heating Calculator</h3>
              <p className="text-sm text-gray-600">Compare fuel costs</p>
            </Link>
            <Link href="/seer2-comparison-calculator" className="bg-purple-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">SEER Upgrade Worth It?</h3>
              <p className="text-sm text-gray-600">Efficiency payback analysis</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Free Estimate CTA */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Accurate Pricing for Your Project</h2>
          <p className="text-xl text-green-100 mb-8">
            Compare quotes from qualified contractors and save on installation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/heating-cost-calculator"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Estimate Your Heating Cost
            </Link>
            <span className="text-gray-600">
              Contact contractors for financing options
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
