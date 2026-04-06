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
        href: '/air-conditioners/ac-not-cooling',
        symptoms: ['Warm air from vents', 'No temperature change', 'Running but not cooling'],
        commonCauses: ['Dirty filter', 'Low refrigerant', 'Frozen coils'],
        difficulty: 'Easy to Medium',
        avgCost: '$0-500'
      },
      {
        title: 'AC Freezing Up',
        href: '/air-conditioners/ac-freezing-up',
        symptoms: ['Ice on coils', 'Reduced airflow', 'Water leaks'],
        commonCauses: ['Airflow restriction', 'Low refrigerant', 'Dirty coils'],
        difficulty: 'Medium',
        avgCost: '$100-800'
      },
      {
        title: 'AC Short Cycling',
        href: '/air-conditioners/ac-short-cycling',
        symptoms: ['Frequent on/off', 'Never reaches temperature', 'High bills'],
        commonCauses: ['Oversized unit', 'Thermostat issues', 'Refrigerant leak'],
        difficulty: 'Medium to Hard',
        avgCost: '$150-1500'
      },
      {
        title: 'AC Won\'t Turn On',
        href: '/air-conditioners/ac-wont-turn-on',
        symptoms: ['No response', 'No fan operation', 'Dead system'],
        commonCauses: ['Power issues', 'Capacitor failure', 'Control board'],
        difficulty: 'Easy to Hard',
        avgCost: '$50-1200'
      }
    ]
  },
  'Heating Problems': {
    icon: <ThermometerSun className="w-6 h-6 text-orange-500" />,
    description: 'Furnace and heat pump heating issues',
    problems: [
      {
        title: 'Furnace Not Heating',
        href: '/furnaces-heating/furnace-not-heating',
        symptoms: ['No heat', 'Cold air', 'Won\'t ignite'],
        commonCauses: ['Pilot light out', 'Ignitor failure', 'Gas valve issues'],
        difficulty: 'Easy to Hard',
        avgCost: '$50-1000'
      },
      {
        title: 'Furnace Short Cycling',
        href: '/furnaces-heating/furnace-short-cycling',
        symptoms: ['Frequent on/off', 'Overheating', 'Poor heating'],
        commonCauses: ['Dirty filter', 'Thermostat placement', 'Oversized furnace'],
        difficulty: 'Easy to Medium',
        avgCost: '$0-500'
      },
      {
        title: 'Heat Pump Not Heating',
        href: '/heat-pumps/heat-pump-not-heating',
        symptoms: ['Cool air in heat mode', 'Constantly running', 'Ice buildup'],
        commonCauses: ['Defrost issues', 'Reversing valve', 'Low refrigerant'],
        difficulty: 'Medium to Hard',
        avgCost: '$200-1500'
      },
      {
        title: 'Uneven Heating',
        href: '/heating/uneven-heating',
        symptoms: ['Cold rooms', 'Hot spots', 'Temperature variance'],
        commonCauses: ['Duct issues', 'Insulation gaps', 'System sizing'],
        difficulty: 'Medium',
        avgCost: '$100-2000'
      }
    ]
  },
  'Noise Problems': {
    icon: <Volume2 className="w-6 h-6 text-purple-500" />,
    description: 'Unusual sounds from HVAC equipment',
    problems: [
      {
        title: 'Banging or Clanking',
        href: '/troubleshooting/banging-noises',
        symptoms: ['Loud bangs', 'Metal sounds', 'Startup noises'],
        commonCauses: ['Loose parts', 'Expanding ducts', 'Compressor issues'],
        difficulty: 'Easy to Hard',
        avgCost: '$50-800'
      },
      {
        title: 'Squealing or Screeching',
        href: '/troubleshooting/squealing-noises',
        symptoms: ['High-pitched sounds', 'Belt noise', 'Bearing sounds'],
        commonCauses: ['Belt issues', 'Motor bearings', 'Fan problems'],
        difficulty: 'Medium',
        avgCost: '$100-500'
      },
      {
        title: 'Clicking or Ticking',
        href: '/troubleshooting/clicking-noises',
        symptoms: ['Repetitive clicks', 'Relay sounds', 'Ignition clicking'],
        commonCauses: ['Relay problems', 'Ignitor issues', 'Control board'],
        difficulty: 'Medium to Hard',
        avgCost: '$150-600'
      },
      {
        title: 'Humming or Buzzing',
        href: '/troubleshooting/humming-noises',
        symptoms: ['Constant hum', 'Electrical buzz', 'Vibration sounds'],
        commonCauses: ['Electrical issues', 'Loose wiring', 'Capacitor problems'],
        difficulty: 'Easy to Medium',
        avgCost: '$75-400'
      }
    ]
  },
  'Water & Moisture Issues': {
    icon: <Droplets className="w-6 h-6 text-cyan-500" />,
    description: 'Leaks, condensation, and drainage problems',
    problems: [
      {
        title: 'AC Water Leak',
        href: '/air-conditioners/ac-water-leak',
        symptoms: ['Water around unit', 'Ceiling stains', 'Pooling water'],
        commonCauses: ['Clogged drain', 'Frozen coils', 'Damaged pan'],
        difficulty: 'Easy to Medium',
        avgCost: '$75-500'
      },
      {
        title: 'High Indoor Humidity',
        href: '/air-quality/high-humidity',
        symptoms: ['Muggy feeling', 'Condensation', 'Mold growth'],
        commonCauses: ['Oversized AC', 'Poor ventilation', 'System issues'],
        difficulty: 'Medium',
        avgCost: '$200-2000'
      },
      {
        title: 'Furnace Leaking Water',
        href: '/furnaces-heating/furnace-water-leak',
        symptoms: ['Puddles near furnace', 'Rust spots', 'Water damage'],
        commonCauses: ['Condensate issues', 'Humidifier leak', 'Heat exchanger'],
        difficulty: 'Medium to Hard',
        avgCost: '$100-3000'
      },
      {
        title: 'Frozen Condensate Line',
        href: '/troubleshooting/frozen-condensate',
        symptoms: ['No heat', 'Error codes', 'Gurgling sounds'],
        commonCauses: ['Cold weather', 'Poor insulation', 'Improper pitch'],
        difficulty: 'Easy to Medium',
        avgCost: '$0-300'
      }
    ]
  },
  'Electrical & Control Issues': {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    description: 'Power, thermostat, and control problems',
    problems: [
      {
        title: 'Thermostat Not Working',
        href: '/thermostats/thermostat-troubleshooting',
        symptoms: ['Blank screen', 'Wrong temperature', 'No response'],
        commonCauses: ['Dead batteries', 'Wiring issues', 'Calibration'],
        difficulty: 'Easy',
        avgCost: '$0-300'
      },
      {
        title: 'Frequent Breaker Trips',
        href: '/electrical/breaker-tripping',
        symptoms: ['Power loss', 'Repeated trips', 'Electrical smell'],
        commonCauses: ['Short circuit', 'Overload', 'Compressor issues'],
        difficulty: 'Hard',
        avgCost: '$200-1500'
      },
      {
        title: 'System Won\'t Turn Off',
        href: '/troubleshooting/wont-turn-off',
        symptoms: ['Constant running', 'Won\'t cycle off', 'Frozen thermostat'],
        commonCauses: ['Thermostat stuck', 'Relay failure', 'Control board'],
        difficulty: 'Medium',
        avgCost: '$100-600'
      },
      {
        title: 'Intermittent Operation',
        href: '/troubleshooting/intermittent-operation',
        symptoms: ['Random shutoffs', 'Sporadic operation', 'Inconsistent cooling'],
        commonCauses: ['Loose connections', 'Failing components', 'Power issues'],
        difficulty: 'Medium to Hard',
        avgCost: '$150-800'
      }
    ]
  },
  'Airflow Problems': {
    icon: <Wind className="w-6 h-6 text-green-500" />,
    description: 'Poor airflow, pressure, and ventilation issues',
    problems: [
      {
        title: 'Weak Airflow',
        href: '/airflow/weak-airflow',
        symptoms: ['Low air pressure', 'Poor circulation', 'Slow cooling'],
        commonCauses: ['Dirty filter', 'Duct leaks', 'Blower issues'],
        difficulty: 'Easy to Medium',
        avgCost: '$20-800'
      },
      {
        title: 'No Air From Vents',
        href: '/airflow/no-air-from-vents',
        symptoms: ['No airflow', 'System running', 'Silent vents'],
        commonCauses: ['Blower failure', 'Duct blockage', 'Damper closed'],
        difficulty: 'Medium',
        avgCost: '$100-1200'
      },
      {
        title: 'Hot/Cold Spots',
        href: '/airflow/hot-cold-spots',
        symptoms: ['Uneven temperatures', 'Room differences', 'Comfort issues'],
        commonCauses: ['Duct design', 'Insulation', 'System balance'],
        difficulty: 'Medium to Hard',
        avgCost: '$200-3000'
      },
      {
        title: 'Dusty or Smelly Air',
        href: '/air-quality/dusty-smelly-air',
        symptoms: ['Dust from vents', 'Musty odor', 'Poor air quality'],
        commonCauses: ['Dirty ducts', 'Mold growth', 'Filter issues'],
        difficulty: 'Easy to Hard',
        avgCost: '$50-1500'
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
    href: '/tools/diagnostic-checklist',
    icon: '📋'
  },
  {
    name: 'Error Code Database',
    description: 'Look up error codes for all major HVAC brands',
    href: '/tools/error-codes',
    icon: '🔍'
  },
  {
    name: 'Troubleshooting Flowchart',
    description: 'Visual guide to finding the root cause',
    href: '/tools/troubleshooting-flowchart',
    icon: '🗺️'
  },
  {
    name: 'Cost Estimator',
    description: 'Estimate repair costs for common problems',
    href: '/tools/repair-cost-estimator',
    icon: '💰'
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
                href="/air-conditioners/ac-troubleshooting-guide"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                AC Troubleshooting
              </Link>
              <Link
                href="/furnaces-heating/furnace-troubleshooting"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors px-6 py-3 rounded-lg font-semibold"
              >
                Furnace Problems
              </Link>
              <Link
                href="/heat-pumps/heat-pump-troubleshooting"
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

      {/* Common Causes Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Most Common HVAC Problems</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top AC Problems</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>1. Dirty filter</span>
                  <span className="text-gray-600">35%</span>
                </li>
                <li className="flex justify-between">
                  <span>2. Refrigerant issues</span>
                  <span className="text-gray-600">22%</span>
                </li>
                <li className="flex justify-between">
                  <span>3. Capacitor failure</span>
                  <span className="text-gray-600">18%</span>
                </li>
                <li className="flex justify-between">
                  <span>4. Thermostat problems</span>
                  <span className="text-gray-600">15%</span>
                </li>
                <li className="flex justify-between">
                  <span>5. Drainage clogs</span>
                  <span className="text-gray-600">10%</span>
                </li>
              </ol>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Top Heating Problems</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>1. Ignition issues</span>
                  <span className="text-gray-600">28%</span>
                </li>
                <li className="flex justify-between">
                  <span>2. Dirty filter</span>
                  <span className="text-gray-600">25%</span>
                </li>
                <li className="flex justify-between">
                  <span>3. Thermostat malfunction</span>
                  <span className="text-gray-600">20%</span>
                </li>
                <li className="flex justify-between">
                  <span>4. Pilot light problems</span>
                  <span className="text-gray-600">15%</span>
                </li>
                <li className="flex justify-between">
                  <span>5. Blower issues</span>
                  <span className="text-gray-600">12%</span>
                </li>
              </ol>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">DIY Fix Success Rate</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Filter replacement</span>
                  <span className="text-green-600 font-semibold">95%</span>
                </li>
                <li className="flex justify-between">
                  <span>Thermostat issues</span>
                  <span className="text-green-600 font-semibold">75%</span>
                </li>
                <li className="flex justify-between">
                  <span>Breaker/power</span>
                  <span className="text-yellow-600 font-semibold">60%</span>
                </li>
                <li className="flex justify-between">
                  <span>Drainage clogs</span>
                  <span className="text-yellow-600 font-semibold">50%</span>
                </li>
                <li className="flex justify-between">
                  <span>Refrigerant issues</span>
                  <span className="text-red-600 font-semibold">0% (Pro only)</span>
                </li>
              </ol>
            </div>
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
              href="/air-conditioners/ac-troubleshooting-guide"
              className="bg-white text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Complete AC Guide
            </Link>
            <Link
              href="/installation/choosing-hvac-contractor"
              className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors border border-red-500"
            >
              Find a Professional
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}