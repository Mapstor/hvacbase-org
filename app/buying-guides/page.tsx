import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, Star, TrendingUp, DollarSign, Shield, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Buying Guides: Expert Equipment Selection & Recommendations',
  description: 'Complete HVAC buying guides for air conditioners, furnaces, heat pumps, and more. Professional recommendations, pricing analysis, and brand comparisons to help you choose the right system.',
  openGraph: {
    title: 'HVAC Buying Guides | Equipment Selection & Brand Reviews',
    description: 'Expert HVAC buying guides with detailed reviews, pricing, and recommendations for all heating and cooling equipment.',
    type: 'website',
  }
}

const buyingGuides = {
  'Air Conditioning': {
    icon: '❄️',
    description: 'Complete guides for selecting central AC, mini splits, and portable units',
    guides: [
      {
        title: 'Best Central Air Conditioners 2024',
        href: '/air-conditioners/best-central-air-conditioners',
        readTime: '12 min',
        highlights: ['Top 10 brands reviewed', 'SEER2 ratings explained', 'Cost analysis']
      },
      {
        title: 'Mini Split Buying Guide',
        href: '/mini-split-air-conditioners/mini-split-buying-guide',
        readTime: '15 min',
        highlights: ['Single vs multi-zone', 'Installation costs', 'Best brands']
      },
      {
        title: 'Window AC Selection Guide',
        href: '/air-conditioners/best-window-air-conditioners',
        readTime: '10 min',
        highlights: ['Room size calculator', 'Energy efficiency', 'Quiet models']
      },
      {
        title: 'Portable AC Buyer\'s Guide',
        href: '/air-conditioners/best-portable-air-conditioners',
        readTime: '11 min',
        highlights: ['Single vs dual hose', 'BTU requirements', 'Top picks']
      }
    ]
  },
  'Heating Systems': {
    icon: '🔥',
    description: 'Comprehensive guides for furnaces, boilers, heat pumps, and space heaters',
    guides: [
      {
        title: 'Best Gas Furnaces 2024',
        href: '/furnaces-heating/best-gas-furnaces',
        readTime: '14 min',
        highlights: ['AFUE ratings', 'Single vs two-stage', 'Brand comparison']
      },
      {
        title: 'Heat Pump Buying Guide',
        href: '/heat-pumps/heat-pump-buying-guide',
        readTime: '16 min',
        highlights: ['Cold climate models', 'Dual fuel systems', 'Efficiency ratings']
      },
      {
        title: 'Boiler Selection Guide',
        href: '/furnaces-heating/best-boilers',
        readTime: '13 min',
        highlights: ['Combi vs system boilers', 'Efficiency standards', 'Sizing guide']
      },
      {
        title: 'Space Heater Buyer\'s Guide',
        href: '/space-heaters/best-space-heaters',
        readTime: '9 min',
        highlights: ['Safety features', 'Energy efficiency', 'Room coverage']
      }
    ]
  },
  'Air Quality Equipment': {
    icon: '💨',
    description: 'Selection guides for air purifiers, humidifiers, and filtration systems',
    guides: [
      {
        title: 'Best Whole House Air Purifiers',
        href: '/air-quality/best-whole-house-air-purifiers',
        readTime: '12 min',
        highlights: ['HEPA vs UV systems', 'Installation costs', 'Maintenance']
      },
      {
        title: 'Dehumidifier Buying Guide',
        href: '/dehumidifiers/best-whole-house-dehumidifiers',
        readTime: '11 min',
        highlights: ['Capacity sizing', 'Energy efficiency', 'Drainage options']
      },
      {
        title: 'Humidifier Selection Guide',
        href: '/humidifiers/best-whole-house-humidifiers',
        readTime: '10 min',
        highlights: ['Bypass vs fan-powered', 'Maintenance requirements', 'Controls']
      },
      {
        title: 'UV Light System Guide',
        href: '/air-quality/uv-light-hvac-systems',
        readTime: '15 min',
        highlights: ['Coil vs air sterilization', 'Effectiveness data', 'Safety']
      }
    ]
  },
  'Smart Thermostats': {
    icon: '📱',
    description: 'Reviews and comparisons of smart and programmable thermostats',
    guides: [
      {
        title: 'Best Smart Thermostats 2024',
        href: '/thermostats/best-smart-thermostats',
        readTime: '13 min',
        highlights: ['Feature comparison', 'Compatibility guide', 'Energy savings']
      },
      {
        title: 'Nest vs Ecobee Comparison',
        href: '/thermostats/nest-vs-ecobee',
        readTime: '10 min',
        highlights: ['Feature breakdown', 'Installation process', 'Smart home integration']
      },
      {
        title: 'Programmable Thermostat Guide',
        href: '/thermostats/best-programmable-thermostats',
        readTime: '8 min',
        highlights: ['7-day programming', 'WiFi features', 'Budget options']
      },
      {
        title: 'Zoning System Controllers',
        href: '/thermostats/zone-control-systems',
        readTime: '11 min',
        highlights: ['Multi-zone control', 'Damper systems', 'Cost analysis']
      }
    ]
  },
  'Brand Comparisons': {
    icon: '⚖️',
    description: 'Head-to-head brand comparisons and reliability ratings',
    guides: [
      {
        title: 'Carrier vs Trane: Complete Comparison',
        href: '/brand-reviews/carrier-vs-trane',
        readTime: '14 min',
        highlights: ['Product lines', 'Warranty comparison', 'Dealer networks']
      },
      {
        title: 'Lennox vs Goodman Analysis',
        href: '/brand-reviews/lennox-vs-goodman',
        readTime: '12 min',
        highlights: ['Price vs quality', 'Efficiency ratings', 'Parts availability']
      },
      {
        title: 'HVAC Brand Reliability Rankings',
        href: '/brand-reviews/hvac-reliability-rankings',
        readTime: '15 min',
        highlights: ['Consumer Reports data', 'Repair frequency', 'Customer satisfaction']
      },
      {
        title: 'Budget HVAC Brand Guide',
        href: '/brand-reviews/best-budget-hvac-brands',
        readTime: '11 min',
        highlights: ['Value brands', 'Warranty coverage', 'Long-term costs']
      }
    ]
  },
  'Installation & Costs': {
    icon: '💰',
    description: 'Detailed cost breakdowns and installation considerations',
    guides: [
      {
        title: 'HVAC Installation Cost Guide',
        href: '/installation/hvac-installation-costs',
        readTime: '16 min',
        highlights: ['National averages', 'Cost factors', 'Financing options']
      },
      {
        title: 'DIY vs Professional Installation',
        href: '/installation/diy-vs-professional',
        readTime: '10 min',
        highlights: ['Legal requirements', 'Safety considerations', 'Warranty impacts']
      },
      {
        title: 'HVAC Financing Options',
        href: '/installation/hvac-financing-guide',
        readTime: '9 min',
        highlights: ['Loan types', 'Interest rates', 'Rebate programs']
      },
      {
        title: 'Contractor Selection Guide',
        href: '/installation/choosing-hvac-contractor',
        readTime: '12 min',
        highlights: ['Certification requirements', 'Red flags', 'Contract tips']
      }
    ]
  }
}

const featuredGuides = [
  {
    title: 'Ultimate AC Buying Guide 2024',
    description: 'Everything you need to know about selecting the perfect air conditioning system for your home',
    href: '/air-conditioners/ultimate-buying-guide',
    badge: 'Most Popular',
    stats: { readTime: '18 min', updated: 'March 2024' }
  },
  {
    title: 'Heat Pump vs Furnace: Which is Right for You?',
    description: 'Comprehensive comparison to help you choose between heat pumps and traditional furnaces',
    href: '/heat-pumps/heat-pump-vs-furnace',
    badge: 'Editor\'s Choice',
    stats: { readTime: '15 min', updated: 'March 2024' }
  },
  {
    title: 'Smart Thermostat ROI Calculator',
    description: 'Calculate exactly how much you can save with a smart thermostat upgrade',
    href: '/thermostats/smart-thermostat-roi-calculator',
    badge: 'Interactive Tool',
    stats: { readTime: '5 min', updated: 'March 2024' }
  }
]

const quickLinks = [
  { title: 'Size Calculator', href: '/ac-sizing-selection/air-conditioner-btu-calculator', icon: '📐' },
  { title: 'Energy Savings', href: '/energy-efficiency/hvac-energy-saving-tips', icon: '⚡' },
  { title: 'Maintenance Guide', href: '/furnaces-heating/furnace-maintenance', icon: '🔧' },
  { title: 'Troubleshooting', href: '/air-conditioners/ac-troubleshooting-guide', icon: '🛠️' }
]

export default function BuyingGuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC Buying Guides
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Expert equipment reviews, brand comparisons, and professional recommendations to help you make the right choice
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Products Reviewed</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Unbiased Reviews</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2024</div>
              <div className="text-sm text-gray-600">Updated Guides</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Expert</div>
              <div className="text-sm text-gray-600">HVAC Professionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Buying Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <Card key={guide.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {guide.badge}
                    </span>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>📖 {guide.stats.readTime}</span>
                    <span>Updated {guide.stats.updated}</span>
                  </div>
                  <Link
                    href={guide.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read Guide
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {Object.entries(buyingGuides).map(([category, data]) => (
              <div key={category}>
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3">{data.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                    <p className="text-gray-600">{data.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.guides.map((guide) => (
                    <Card key={guide.title} className="hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          <Link href={guide.href} className="hover:text-blue-600">
                            {guide.title}
                          </Link>
                        </h3>
                        <div className="text-sm text-gray-500 mb-3">
                          📖 {guide.readTime} read
                        </div>
                        <ul className="space-y-1">
                          {guide.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-blue-500 mr-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={guide.href}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mt-3"
                        >
                          Read More
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

      {/* Shopping Tips Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Smart Shopping Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                  Best Time to Buy
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Fall & Spring: Off-season discounts up to 20%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    End of month: Sales quotas drive better deals
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Multiple quotes: Save 10-15% through competition
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 text-blue-600 mr-2" />
                  What to Look For
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Energy Star certification for rebates
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    10+ year warranty on major components
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    Licensed contractor with insurance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personalized Recommendations?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our interactive tools to find the perfect HVAC system for your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ac-sizing-selection/air-conditioner-btu-calculator"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Size My System
            </Link>
            <Link
              href="/energy-costs/heating-cost-calculator"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
            >
              Calculate Savings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}