import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, Clock, CheckCircle, AlertCircle, Wrench, BookOpen, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC How-To Guides: DIY Maintenance, Repairs & Installation Tips',
  description: 'Step-by-step HVAC how-to guides for homeowners. Learn DIY maintenance, simple repairs, troubleshooting, and when to call professionals. Save money with expert tutorials.',
  openGraph: {
    title: 'HVAC How-To Guides | DIY Maintenance & Repair Tutorials',
    description: 'Professional HVAC how-to guides with step-by-step instructions for maintenance, repairs, and troubleshooting.',
    type: 'website',
  }
}

const howToCategories = {
  'Basic Maintenance': {
    icon: '🔧',
    description: 'Essential maintenance tasks every homeowner should know',
    difficulty: 'Beginner',
    guides: [
      {
        title: 'How to Change Your HVAC Filter',
        href: '/maintenance/how-to-change-hvac-filter',
        time: '5 min',
        difficulty: 'Easy',
        savings: 'Save $50-100/year',
        preview: 'Step-by-step guide to changing air filters for better air quality and efficiency'
      },
      {
        title: 'How to Clean AC Coils',
        href: '/maintenance/how-to-clean-ac-coils',
        time: '30 min',
        difficulty: 'Medium',
        savings: 'Save $100-200/year',
        preview: 'Safely clean your AC coils to improve cooling efficiency'
      },
      {
        title: 'How to Clean Air Vents and Registers',
        href: '/maintenance/how-to-clean-air-vents',
        time: '45 min',
        difficulty: 'Easy',
        savings: 'Improve airflow',
        preview: 'Remove dust and debris from vents for better air circulation'
      },
      {
        title: 'How to Test Your Thermostat',
        href: '/thermostats/how-to-test-thermostat',
        time: '15 min',
        difficulty: 'Easy',
        savings: 'Diagnose issues',
        preview: 'Simple tests to check if your thermostat is working properly'
      }
    ]
  },
  'Thermostat Installation': {
    icon: '📱',
    description: 'Install and program thermostats for optimal comfort and savings',
    difficulty: 'Intermediate',
    guides: [
      {
        title: 'How to Install a Smart Thermostat',
        href: '/thermostats/how-to-install-smart-thermostat',
        time: '60 min',
        difficulty: 'Medium',
        savings: 'Save 20% on energy',
        preview: 'Complete installation guide for Nest, Ecobee, and other smart thermostats'
      },
      {
        title: 'How to Wire a Thermostat (C-Wire Guide)',
        href: '/thermostats/how-to-wire-thermostat',
        time: '45 min',
        difficulty: 'Advanced',
        savings: 'Enable smart features',
        preview: 'Understanding thermostat wiring and adding a C-wire'
      },
      {
        title: 'How to Program Your Thermostat',
        href: '/thermostats/how-to-program-thermostat',
        time: '20 min',
        difficulty: 'Easy',
        savings: 'Save 10% on bills',
        preview: 'Optimize temperature schedules for comfort and efficiency'
      },
      {
        title: 'How to Calibrate Your Thermostat',
        href: '/thermostats/how-to-calibrate-thermostat',
        time: '15 min',
        difficulty: 'Easy',
        savings: 'Improve accuracy',
        preview: 'Ensure your thermostat reads the correct temperature'
      }
    ]
  },
  'Troubleshooting': {
    icon: '🔍',
    description: 'Diagnose and fix common HVAC problems yourself',
    difficulty: 'Varies',
    guides: [
      {
        title: 'How to Fix AC Not Cooling',
        href: '/air-conditioners/ac-not-cooling',
        time: '30 min',
        difficulty: 'Medium',
        savings: 'Save $150-300',
        preview: 'Troubleshoot and fix common cooling problems'
      },
      {
        title: 'How to Fix Furnace Not Heating',
        href: '/furnaces-heating/furnace-not-heating',
        time: '45 min',
        difficulty: 'Medium',
        savings: 'Save $150-400',
        preview: 'Step-by-step furnace troubleshooting guide'
      },
      {
        title: 'How to Fix Frozen AC Unit',
        href: '/air-conditioners/how-to-fix-frozen-ac',
        time: '2-4 hours',
        difficulty: 'Medium',
        savings: 'Save $200-500',
        preview: 'Safely thaw and prevent AC freezing issues'
      },
      {
        title: 'How to Stop HVAC Noises',
        href: '/troubleshooting/how-to-fix-hvac-noises',
        time: '30 min',
        difficulty: 'Easy-Medium',
        savings: 'Save $100-300',
        preview: 'Identify and fix common HVAC noise problems'
      }
    ]
  },
  'Energy Savings': {
    icon: '⚡',
    description: 'Reduce energy costs with these efficiency improvements',
    difficulty: 'Beginner',
    guides: [
      {
        title: 'How to Seal Air Ducts',
        href: '/ductwork/how-to-seal-air-ducts',
        time: '2-3 hours',
        difficulty: 'Medium',
        savings: 'Save 20% on energy',
        preview: 'Seal duct leaks to prevent energy waste'
      },
      {
        title: 'How to Insulate HVAC Lines',
        href: '/insulation/how-to-insulate-hvac-lines',
        time: '1 hour',
        difficulty: 'Easy',
        savings: 'Save 5-10% energy',
        preview: 'Properly insulate refrigerant and duct lines'
      },
      {
        title: 'How to Zone Your HVAC System',
        href: '/zoning/how-to-zone-hvac',
        time: '4-6 hours',
        difficulty: 'Advanced',
        savings: 'Save 30% on bills',
        preview: 'Create heating and cooling zones for efficiency'
      },
      {
        title: 'How to Optimize Airflow',
        href: '/airflow/how-to-optimize-airflow',
        time: '1 hour',
        difficulty: 'Easy',
        savings: 'Save 10-15%',
        preview: 'Balance airflow for even temperatures'
      }
    ]
  },
  'Seasonal Preparation': {
    icon: '🍂',
    description: 'Prepare your HVAC system for seasonal changes',
    difficulty: 'Beginner',
    guides: [
      {
        title: 'How to Winterize Your AC',
        href: '/maintenance/how-to-winterize-ac',
        time: '45 min',
        difficulty: 'Easy',
        savings: 'Prevent damage',
        preview: 'Protect your AC unit during winter months'
      },
      {
        title: 'How to Prepare Furnace for Winter',
        href: '/furnaces-heating/prepare-furnace-for-winter',
        time: '1 hour',
        difficulty: 'Easy',
        savings: 'Ensure reliability',
        preview: 'Get your furnace ready for heating season'
      },
      {
        title: 'How to Start Up AC for Summer',
        href: '/air-conditioners/ac-summer-startup',
        time: '30 min',
        difficulty: 'Easy',
        savings: 'Prevent breakdowns',
        preview: 'Safely start your AC after winter'
      },
      {
        title: 'How to Maintain Heat Pump Year-Round',
        href: '/heat-pumps/year-round-maintenance',
        time: '30 min/season',
        difficulty: 'Easy',
        savings: 'Extend lifespan',
        preview: 'Seasonal maintenance for heat pump systems'
      }
    ]
  },
  'Advanced DIY': {
    icon: '⚡',
    description: 'More complex projects for experienced DIYers',
    difficulty: 'Advanced',
    guides: [
      {
        title: 'How to Install a Mini Split',
        href: '/mini-split-air-conditioners/diy-mini-split-installation',
        time: '6-8 hours',
        difficulty: 'Advanced',
        savings: 'Save $1,500-3,000',
        preview: 'Complete mini split installation guide (where legal)'
      },
      {
        title: 'How to Replace Capacitor',
        href: '/repairs/how-to-replace-capacitor',
        time: '30 min',
        difficulty: 'Advanced',
        savings: 'Save $150-350',
        preview: 'Safely replace AC or furnace capacitors'
      },
      {
        title: 'How to Install UV Light System',
        href: '/air-quality/install-uv-light',
        time: '2-3 hours',
        difficulty: 'Advanced',
        savings: 'Save $200-400',
        preview: 'Add UV purification to your HVAC system'
      },
      {
        title: 'How to Add Humidifier to Furnace',
        href: '/humidifiers/install-whole-house-humidifier',
        time: '3-4 hours',
        difficulty: 'Advanced',
        savings: 'Save $300-500',
        preview: 'Install whole-house humidification system'
      }
    ]
  }
}

const popularGuides = [
  {
    title: 'Complete AC Maintenance Checklist',
    description: 'Everything you need to do to keep your AC running efficiently',
    href: '/air-conditioners/ac-troubleshooting-guide',
    stats: { views: '125K', rating: 4.9, time: '30 min' },
    badge: 'Most Popular'
  },
  {
    title: 'Smart Thermostat Installation Guide',
    description: 'Step-by-step instructions for installing any smart thermostat',
    href: '/thermostats/how-to-install-smart-thermostat',
    stats: { views: '89K', rating: 4.8, time: '60 min' },
    badge: 'Trending'
  },
  {
    title: 'Fix Your AC in 10 Steps',
    description: 'Troubleshoot and repair common AC problems yourself',
    href: '/air-conditioners/ac-not-cooling',
    stats: { views: '156K', rating: 4.9, time: '45 min' },
    badge: 'Top Rated'
  }
]

const safetyTips = [
  'Always turn off power at the breaker before working on HVAC equipment',
  'Never attempt refrigerant repairs - requires EPA certification',
  'Use proper safety equipment including gloves and eye protection',
  'When in doubt, call a licensed HVAC professional',
  'Check local codes - some repairs require professional licensing'
]

export default function HowToPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC How-To Guides
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Step-by-step tutorials for DIY maintenance, repairs, and improvements to save money and extend equipment life
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-sm text-green-100">DIY Guides</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">$500+</div>
                <div className="text-sm text-green-100">Average Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <div className="text-2xl font-bold">30 min</div>
                <div className="text-sm text-green-100">Average Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Warning */}
      <section className="bg-yellow-50 border-y border-yellow-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Important Safety Information</h2>
              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                {safetyTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Most Popular How-To Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularGuides.map((guide) => (
              <Card key={guide.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      {guide.badge}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {guide.stats.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>👁️ {guide.stats.views} views</span>
                    <span>⭐ {guide.stats.rating}/5.0</span>
                  </div>
                  <Link
                    href={guide.href}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                  >
                    View Guide
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
            {Object.entries(howToCategories).map(([category, data]) => (
              <div key={category}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{data.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                      <p className="text-gray-600">{data.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    data.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    data.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    data.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {data.difficulty}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.guides.map((guide) => (
                    <Card key={guide.title} className="hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            guide.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                            guide.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-red-50 text-red-700'
                          }`}>
                            {guide.difficulty}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {guide.time}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          <Link href={guide.href} className="hover:text-green-600">
                            {guide.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {guide.preview}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-600">
                            💰 {guide.savings}
                          </span>
                          <Link
                            href={guide.href}
                            className="inline-flex items-center text-green-600 hover:text-green-700 text-sm"
                          >
                            Learn How
                            <ChevronRight className="ml-1 w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Tools & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Wrench className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Tools List</h3>
              <p className="text-gray-600 mb-4">Complete list of tools needed for DIY HVAC maintenance and repairs</p>
              <Link href="/tools/essential-hvac-tools" className="text-green-600 hover:text-green-700 font-medium">
                View Tool Guide →
              </Link>
            </Card>
            <Card className="p-6">
              <Video className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">Watch step-by-step video guides for visual learners</p>
              <Link href="/videos/hvac-tutorials" className="text-green-600 hover:text-green-700 font-medium">
                Watch Videos →
              </Link>
            </Card>
            <Card className="p-6">
              <BookOpen className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance Schedule</h3>
              <p className="text-gray-600 mb-4">Printable annual maintenance calendar and checklists</p>
              <Link href="/maintenance/annual-schedule" className="text-green-600 hover:text-green-700 font-medium">
                Get Schedule →
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* When to Call a Pro */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Call a Professional</h2>
            <p className="text-gray-600 mb-6">
              While many HVAC tasks can be done yourself, these situations require professional expertise:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">Refrigerant leaks or recharging</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">Gas line repairs or connections</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">Major electrical work</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">Heat exchanger issues</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">System won't start after troubleshooting</span>
              </div>
              <div className="bg-white rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-red-600 inline mr-2" />
                <span className="text-gray-800">Warranty-covered repairs</span>
              </div>
            </div>
            <Link
              href="/installation/choosing-hvac-contractor"
              className="inline-flex items-center mt-6 text-green-600 hover:text-green-700 font-medium"
            >
              How to Choose a Contractor
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Saving with DIY Maintenance</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of homeowners who save money with our step-by-step guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/maintenance/how-to-change-hvac-filter"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Start with Filter Changes
            </Link>
            <Link
              href="/troubleshooting/common-hvac-problems"
              className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors border border-green-500"
            >
              Troubleshooting Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}