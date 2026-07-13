import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, AlertTriangle, ThermometerSun, Snowflake, Volume2, Droplets, Zap, Wind, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Troubleshooting Guide: Fix Common Problems & Save Money',
  description: 'Complete HVAC troubleshooting guide for homeowners. Diagnose and fix common AC, furnace, and heat pump problems. Step-by-step solutions and when to call professionals.',
  openGraph: {
    title: 'HVAC Troubleshooting Guide | Fix Common Problems',
    description: 'Expert troubleshooting guides for all HVAC problems. Step-by-step diagnosis and repair instructions.',
    type: 'website',
  }
}

const troubleshootingCategories = {
  'Cooling Problems': {
    icon: <Snowflake className="w-6 h-6 text-blue-500" />,
    description: 'AC not cooling, freezing, or cycling issues',
    problems: [
      {
        title: 'AC Not Cooling',
        href: '/ac-not-cooling',
        symptoms: ['Warm air from vents', 'No temperature change', 'Running but not cooling'],
        commonCauses: ['Dirty filter', 'Low refrigerant', 'Frozen coils'],
        difficulty: 'Easy to Medium',
        avgCost: '$0-500'
      }
    ]
  },
  'Water & Moisture Issues': {
    icon: <Droplets className="w-6 h-6 text-cyan-500" />,
    description: 'Leaks, condensation, and drainage problems',
    problems: [
      {
        title: 'Furnace Leaking Water',
        href: '/furnace-leaking-water',
        symptoms: ['Puddles near furnace', 'Rust spots', 'Water damage'],
        commonCauses: ['Condensate issues', 'Humidifier leak', 'Heat exchanger'],
        difficulty: 'Medium to Hard',
        avgCost: '$100-3000'
      }
    ]
  },
  'Heating Problems': {
    icon: <ThermometerSun className="w-6 h-6 text-orange-500" />,
    description: 'Furnace, ignition, and no-heat issues',
    problems: [
      {
        title: 'Furnace Flame Sensor',
        href: '/furnace-flame-sensor',
        symptoms: ['Burner lights then shuts off in 3-10 seconds', 'Lockout after failed ignition attempts', 'Flame failure error code'],
        commonCauses: ['Carbon buildup on sensor rod', 'Oxidation coating', 'Sensor position drift'],
        difficulty: 'Easy',
        avgCost: '$0-200'
      }
    ]
  },
  'Electrical & Control Issues': {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    description: 'Power, thermostat, and control problems',
    problems: [
      {
        title: 'Thermostat Heat On But No Heat',
        href: '/thermostat-heat-on-but-no-heat',
        symptoms: ['Thermostat shows heating but house stays cold', 'Blower runs but no warm air', 'Furnace short-cycles or locks out'],
        commonCauses: ['Wrong thermostat settings', 'Tripped breaker or dead batteries', 'Dirty flame sensor or clogged filter'],
        difficulty: 'Easy to Medium',
        avgCost: '$0-600'
      }
    ]
  }
}

const emergencyProblems = [
  {
    title: 'Gas Smell',
    severity: 'EMERGENCY',
    action: 'Leave immediately, call gas company from outside',
    icon: '🚨'
  },
  {
    title: 'Electrical Burning Smell',
    severity: 'URGENT',
    action: 'Turn off system at breaker, call technician immediately',
    icon: '⚠️'
  },
  {
    title: 'Carbon Monoxide Alarm',
    severity: 'EMERGENCY',
    action: 'Evacuate, call 911, do not re-enter',
    icon: '🚨'
  },
  {
    title: 'Major Water Leak',
    severity: 'URGENT',
    action: 'Turn off system and water, call technician',
    icon: '⚠️'
  }
]

const diagnosticTools = [
  {
    name: 'System Diagnostic Checklist',
    description: 'Step-by-step guide to diagnose any HVAC problem',
    href: '/hvac-maintenance-checklist',
    icon: '📋'
  }
]

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC Troubleshooting Center
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
              Diagnose and fix common HVAC problems with our comprehensive troubleshooting guides
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/ac-troubleshooting-guide"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                AC Troubleshooting
              </Link>
              <Link
                href="/furnace-blowing-cold-air"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Furnace Problems
              </Link>
              <Link
                href="/heat-pump-guide"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Heat Pump Issues
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Problems Alert */}
      <section className="bg-red-50 border-y border-red-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Emergency Situations - Act Immediately
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyProblems.map((problem) => (
              <div key={problem.title} className="bg-white rounded-lg p-4 border border-red-300">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{problem.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-900">{problem.title}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded mt-1 mb-2 ${
                      problem.severity === 'EMERGENCY' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {problem.severity}
                    </span>
                    <p className="text-sm text-gray-700">{problem.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic Tools */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Diagnostic Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diagnosticTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="text-3xl mb-3">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
                <div className="mt-3 text-red-600 font-medium text-sm flex items-center">
                  Use Tool <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Troubleshooting by Problem Type</h2>
          <div className="space-y-12">
            {Object.entries(troubleshootingCategories).map(([category, data]) => (
              <div key={category}>
                <div className="flex items-center mb-6">
                  {data.icon}
                  <div className="ml-3">
                    <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                    <p className="text-gray-600">{data.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.problems.map((problem) => (
                    <Card key={problem.title} className="hover:shadow-lg transition-shadow">
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          <Link href={problem.href} className="hover:text-red-600">
                            {problem.title}
                          </Link>
                        </h4>
                        
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-500 mb-1">Common Symptoms:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {problem.symptoms.map((symptom, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-red-400 mr-1">•</span>
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span className={`px-2 py-1 rounded ${
                            problem.difficulty.includes('Easy') ? 'bg-green-100 text-green-700' :
                            problem.difficulty.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {problem.difficulty}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {problem.avgCost}
                          </span>
                        </div>

                        <Link
                          href={problem.href}
                          className="inline-flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Troubleshoot
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

      {/* When to Call a Pro */}
      <section className="py-12 bg-gradient-to-r from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">When to Call a Professional</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-green-600">Try DIY First:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Filter replacements and cleaning
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Thermostat troubleshooting
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Circuit breaker resets
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic drainage clearing
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Simple pilot light relighting
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-red-600">Call a Pro Immediately:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Gas leaks or gas smell
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Electrical burning smell
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Refrigerant handling
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Heat exchanger issues
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Major electrical repairs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-red-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Problem?</h2>
          <p className="text-xl text-red-100 mb-8">
            Use our comprehensive diagnostic guide or get expert help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ac-troubleshooting-guide"
              className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Complete AC Guide
            </Link>
            <span className="text-gray-600">
              Research contractors in your area
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}