import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Search, BookOpen, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Dictionary: Complete Glossary of Terms & Definitions',
  description: 'Comprehensive HVAC dictionary with 500+ terms, acronyms, and technical definitions. Learn heating, cooling, and ventilation terminology explained in simple language.',
  openGraph: {
    title: 'HVAC Dictionary | Complete Glossary of Terms',
    description: 'Master HVAC terminology with our comprehensive dictionary. 500+ terms explained clearly.',
    type: 'website',
  }
}

const hvacTerms = {
  'A': [
    {
      term: 'AFUE',
      definition: 'Annual Fuel Utilization Efficiency - A measurement of furnace heating efficiency. Higher AFUE ratings indicate more efficient furnaces.',
      relatedTerms: ['SEER', 'HSPF', 'Energy Efficiency']
    },
    {
      term: 'Air Handler',
      definition: 'The indoor unit of a split HVAC system that contains the blower, evaporator coil, and sometimes heating elements.',
      relatedTerms: ['Blower', 'Evaporator Coil', 'Split System']
    },
    {
      term: 'AHRI',
      definition: 'Air-Conditioning, Heating, and Refrigeration Institute - Organization that certifies HVAC equipment performance.',
      relatedTerms: ['ENERGY STAR', 'Certification']
    },
    {
      term: 'ACH',
      definition: 'Air Changes per Hour - The number of times the total air volume in a space is replaced in one hour.',
      relatedTerms: ['Ventilation', 'IAQ', 'CFM']
    },
    {
      term: 'Accumulator',
      definition: 'A device that prevents liquid refrigerant from entering the compressor in heat pump systems.',
      relatedTerms: ['Heat Pump', 'Refrigerant', 'Compressor']
    }
  ],
  'B': [
    {
      term: 'BTU',
      definition: 'British Thermal Unit - The amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit.',
      relatedTerms: ['Tonnage', 'Capacity', 'Heat Load']
    },
    {
      term: 'Blower',
      definition: 'The fan component that circulates air through the ductwork and living spaces.',
      relatedTerms: ['Air Handler', 'CFM', 'Static Pressure']
    },
    {
      term: 'Boiler',
      definition: 'A heating system that heats water or produces steam for distribution through radiators or radiant floor systems.',
      relatedTerms: ['Furnace', 'Radiant Heat', 'Hydronic']
    }
  ],
  'C': [
    {
      term: 'CFM',
      definition: 'Cubic Feet per Minute - A measurement of airflow volume.',
      relatedTerms: ['Airflow', 'Static Pressure', 'Ductwork']
    },
    {
      term: 'Compressor',
      definition: 'The component that pressurizes refrigerant and circulates it through the system.',
      relatedTerms: ['Condenser', 'Evaporator', 'Refrigerant']
    },
    {
      term: 'Condenser',
      definition: 'The outdoor unit component where refrigerant releases heat and condenses from vapor to liquid.',
      relatedTerms: ['Evaporator', 'Refrigerant Cycle', 'Heat Pump']
    },
    {
      term: 'COP',
      definition: 'Coefficient of Performance - The ratio of heating or cooling output to energy input.',
      relatedTerms: ['EER', 'SEER', 'Efficiency']
    },
    {
      term: 'Capacitor',
      definition: 'An electrical component that stores energy and helps motors start and run efficiently.',
      relatedTerms: ['Start Capacitor', 'Run Capacitor', 'Motor']
    }
  ],
  'D': [
    {
      term: 'Damper',
      definition: 'A movable plate in ductwork that regulates airflow to different zones or rooms.',
      relatedTerms: ['Zone Control', 'Ductwork', 'Airflow']
    },
    {
      term: 'Delta T',
      definition: 'The temperature difference between supply and return air, indicating system performance.',
      relatedTerms: ['Temperature Split', 'Efficiency', 'Diagnostics']
    },
    {
      term: 'Ductwork',
      definition: 'The system of metal or flexible tubes that distributes conditioned air throughout a building.',
      relatedTerms: ['Plenum', 'Register', 'Return Air']
    },
    {
      term: 'Defrost Cycle',
      definition: 'The process where a heat pump reverses operation to melt ice from outdoor coils.',
      relatedTerms: ['Heat Pump', 'Reversing Valve', 'Ice Buildup']
    }
  ],
  'E': [
    {
      term: 'EER',
      definition: 'Energy Efficiency Ratio - Cooling efficiency rating at a specific outdoor temperature (95°F).',
      relatedTerms: ['SEER', 'COP', 'Energy Efficiency']
    },
    {
      term: 'Evaporator Coil',
      definition: 'The indoor coil where refrigerant absorbs heat and evaporates from liquid to vapor.',
      relatedTerms: ['Condenser Coil', 'Refrigerant', 'Air Handler']
    },
    {
      term: 'ENERGY STAR',
      definition: 'EPA program certifying energy-efficient products that meet strict efficiency guidelines.',
      relatedTerms: ['Efficiency', 'Rebates', 'Certification']
    },
    {
      term: 'ECM',
      definition: 'Electronically Commutated Motor - A variable-speed motor that adjusts airflow for optimal efficiency.',
      relatedTerms: ['Variable Speed', 'Blower Motor', 'Efficiency']
    }
  ],
  'F': [
    {
      term: 'Furnace',
      definition: 'A heating system that burns fuel or uses electricity to heat air for distribution.',
      relatedTerms: ['AFUE', 'Heat Exchanger', 'Boiler']
    },
    {
      term: 'Filter',
      definition: 'A device that removes particles from air passing through the HVAC system.',
      relatedTerms: ['MERV', 'HEPA', 'Air Quality']
    },
    {
      term: 'Freon',
      definition: 'A brand name for refrigerants, commonly R-22 (being phased out) or R-410A.',
      relatedTerms: ['Refrigerant', 'R-410A', 'R-22']
    },
    {
      term: 'Flue',
      definition: 'The vent pipe that exhausts combustion gases from furnaces and boilers.',
      relatedTerms: ['Venting', 'Combustion', 'Safety']
    }
  ],
  'G': [
    {
      term: 'Geothermal',
      definition: 'A heat pump system that uses ground temperature for heating and cooling.',
      relatedTerms: ['Ground Source', 'Heat Pump', 'COP']
    },
    {
      term: 'Grille',
      definition: 'A decorative cover for supply or return air openings.',
      relatedTerms: ['Register', 'Diffuser', 'Vent']
    }
  ],
  'H': [
    {
      term: 'HSPF',
      definition: 'Heating Seasonal Performance Factor - Measures heat pump heating efficiency.',
      relatedTerms: ['SEER', 'Heat Pump', 'Efficiency']
    },
    {
      term: 'Heat Pump',
      definition: 'A system that provides both heating and cooling by reversing the refrigeration cycle.',
      relatedTerms: ['Reversing Valve', 'HSPF', 'SEER']
    },
    {
      term: 'Heat Exchanger',
      definition: 'Component in furnaces that transfers heat from combustion to air without mixing gases.',
      relatedTerms: ['Furnace', 'Combustion', 'Efficiency']
    },
    {
      term: 'HEPA',
      definition: 'High-Efficiency Particulate Air - Filter that removes 99.97% of particles 0.3 microns or larger.',
      relatedTerms: ['Filter', 'MERV', 'Air Quality']
    },
    {
      term: 'Humidistat',
      definition: 'A device that measures and controls humidity levels.',
      relatedTerms: ['Humidity', 'Thermostat', 'IAQ']
    },
    {
      term: 'HVAC',
      definition: 'Heating, Ventilation, and Air Conditioning - The technology of indoor environmental comfort.',
      relatedTerms: ['Climate Control', 'Comfort', 'System']
    }
  ],
  'I': [
    {
      term: 'IAQ',
      definition: 'Indoor Air Quality - The quality of air within and around buildings.',
      relatedTerms: ['Ventilation', 'Filtration', 'Humidity']
    },
    {
      term: 'Inverter',
      definition: 'Technology that varies compressor speed for improved efficiency and comfort.',
      relatedTerms: ['Variable Speed', 'Mini Split', 'Efficiency']
    }
  ],
  'L': [
    {
      term: 'Load Calculation',
      definition: 'Manual J calculation to determine proper HVAC system size for a building.',
      relatedTerms: ['Manual J', 'Sizing', 'BTU']
    },
    {
      term: 'Latent Heat',
      definition: 'Heat energy required to change water from liquid to vapor (humidity removal).',
      relatedTerms: ['Sensible Heat', 'Humidity', 'Cooling']
    },
    {
      term: 'Line Set',
      definition: 'Copper tubes connecting indoor and outdoor units containing refrigerant.',
      relatedTerms: ['Refrigerant Lines', 'Split System', 'Installation']
    }
  ],
  'M': [
    {
      term: 'MERV',
      definition: 'Minimum Efficiency Reporting Value - Rating system for air filter effectiveness (1-20).',
      relatedTerms: ['Filter', 'HEPA', 'Air Quality']
    },
    {
      term: 'Mini Split',
      definition: 'Ductless heating and cooling system with individual room control.',
      relatedTerms: ['Ductless', 'Zone Control', 'Inverter']
    },
    {
      term: 'Modulating',
      definition: 'Equipment that adjusts output in small increments for precise comfort control.',
      relatedTerms: ['Variable Speed', 'Two-Stage', 'Efficiency']
    },
    {
      term: 'Manual J',
      definition: 'Industry standard calculation method for residential HVAC sizing.',
      relatedTerms: ['Load Calculation', 'Sizing', 'ACCA']
    }
  ],
  'N': [
    {
      term: 'NATE',
      definition: 'North American Technician Excellence - Certification program for HVAC technicians.',
      relatedTerms: ['Certification', 'Technician', 'Training']
    }
  ],
  'P': [
    {
      term: 'Plenum',
      definition: 'Large duct section attached to air handler where smaller ducts branch off.',
      relatedTerms: ['Ductwork', 'Air Handler', 'Distribution']
    },
    {
      term: 'PSI',
      definition: 'Pounds per Square Inch - Pressure measurement for refrigerant and gas.',
      relatedTerms: ['Pressure', 'Refrigerant', 'Gauge']
    },
    {
      term: 'Programmable Thermostat',
      definition: 'Thermostat that automatically adjusts temperature based on preset schedules.',
      relatedTerms: ['Smart Thermostat', 'Controls', 'Energy Savings']
    }
  ],
  'R': [
    {
      term: 'R-Value',
      definition: 'Thermal resistance rating of insulation materials.',
      relatedTerms: ['Insulation', 'U-Value', 'Energy Efficiency']
    },
    {
      term: 'Refrigerant',
      definition: 'Chemical compound that absorbs and releases heat in the refrigeration cycle.',
      relatedTerms: ['R-410A', 'R-22', 'Freon']
    },
    {
      term: 'Return Air',
      definition: 'Air drawn back to the HVAC system for reconditioning.',
      relatedTerms: ['Supply Air', 'Ductwork', 'Airflow']
    },
    {
      term: 'Reversing Valve',
      definition: 'Component in heat pumps that reverses refrigerant flow for heating/cooling modes.',
      relatedTerms: ['Heat Pump', 'Defrost', 'Four-Way Valve']
    }
  ],
  'S': [
    {
      term: 'SEER',
      definition: 'Seasonal Energy Efficiency Ratio - Cooling efficiency rating over an entire season.',
      relatedTerms: ['SEER2', 'EER', 'Efficiency']
    },
    {
      term: 'SEER2',
      definition: 'Updated SEER rating with new 2023 testing standards for more accurate real-world performance.',
      relatedTerms: ['SEER', 'Efficiency', 'Standards']
    },
    {
      term: 'Static Pressure',
      definition: 'Resistance to airflow in ductwork, measured in inches of water column.',
      relatedTerms: ['Airflow', 'Ductwork', 'CFM']
    },
    {
      term: 'Subcooling',
      definition: 'Temperature difference between liquid refrigerant and its saturation temperature.',
      relatedTerms: ['Superheat', 'Refrigerant', 'Diagnostics']
    },
    {
      term: 'Superheat',
      definition: 'Temperature increase of refrigerant vapor above its boiling point.',
      relatedTerms: ['Subcooling', 'Refrigerant', 'TXV']
    },
    {
      term: 'Split System',
      definition: 'HVAC system with separate indoor and outdoor units.',
      relatedTerms: ['Package Unit', 'Air Handler', 'Condenser']
    }
  ],
  'T': [
    {
      term: 'Thermostat',
      definition: 'Control device that maintains desired temperature by controlling HVAC operation.',
      relatedTerms: ['Temperature Control', 'Smart Thermostat', 'Setpoint']
    },
    {
      term: 'Tonnage',
      definition: 'Cooling capacity measurement - one ton equals 12,000 BTU/hour.',
      relatedTerms: ['BTU', 'Capacity', 'Sizing']
    },
    {
      term: 'TXV',
      definition: 'Thermostatic Expansion Valve - Regulates refrigerant flow to evaporator coil.',
      relatedTerms: ['Metering Device', 'Refrigerant', 'Evaporator']
    },
    {
      term: 'Two-Stage',
      definition: 'Equipment with two operating levels for better efficiency and comfort.',
      relatedTerms: ['Single-Stage', 'Variable Speed', 'Modulating']
    }
  ],
  'U': [
    {
      term: 'U-Value',
      definition: 'Thermal transmittance - inverse of R-value, lower is better for insulation.',
      relatedTerms: ['R-Value', 'Insulation', 'Heat Transfer']
    }
  ],
  'V': [
    {
      term: 'Variable Speed',
      definition: 'Motor or compressor that adjusts speed based on demand for optimal efficiency.',
      relatedTerms: ['ECM', 'Inverter', 'Modulating']
    },
    {
      term: 'VRF',
      definition: 'Variable Refrigerant Flow - Commercial system with precise zone control.',
      relatedTerms: ['VRV', 'Zone Control', 'Commercial']
    },
    {
      term: 'Ventilation',
      definition: 'Process of exchanging indoor air with outdoor air for improved air quality.',
      relatedTerms: ['IAQ', 'Fresh Air', 'Exhaust']
    }
  ],
  'Z': [
    {
      term: 'Zone Control',
      definition: 'System allowing different areas to be heated/cooled independently.',
      relatedTerms: ['Damper', 'Mini Split', 'Thermostat']
    },
    {
      term: 'Zoning',
      definition: 'Dividing a building into areas with independent temperature control.',
      relatedTerms: ['Zone Control', 'Dampers', 'Multiple Thermostats']
    }
  ]
}

const commonAcronyms = [
  { acronym: 'ACCA', meaning: 'Air Conditioning Contractors of America' },
  { acronym: 'AHRI', meaning: 'Air-Conditioning, Heating, and Refrigeration Institute' },
  { acronym: 'ASHRAE', meaning: 'American Society of Heating, Refrigerating and Air-Conditioning Engineers' },
  { acronym: 'BTU', meaning: 'British Thermal Unit' },
  { acronym: 'CFM', meaning: 'Cubic Feet per Minute' },
  { acronym: 'COP', meaning: 'Coefficient of Performance' },
  { acronym: 'DOE', meaning: 'Department of Energy' },
  { acronym: 'ECM', meaning: 'Electronically Commutated Motor' },
  { acronym: 'EER', meaning: 'Energy Efficiency Ratio' },
  { acronym: 'EPA', meaning: 'Environmental Protection Agency' },
  { acronym: 'ERV', meaning: 'Energy Recovery Ventilator' },
  { acronym: 'HEPA', meaning: 'High-Efficiency Particulate Air' },
  { acronym: 'HRV', meaning: 'Heat Recovery Ventilator' },
  { acronym: 'HSPF', meaning: 'Heating Seasonal Performance Factor' },
  { acronym: 'HVAC', meaning: 'Heating, Ventilation, and Air Conditioning' },
  { acronym: 'IAQ', meaning: 'Indoor Air Quality' },
  { acronym: 'MERV', meaning: 'Minimum Efficiency Reporting Value' },
  { acronym: 'NATE', meaning: 'North American Technician Excellence' },
  { acronym: 'OAT', meaning: 'Outdoor Air Temperature' },
  { acronym: 'PSC', meaning: 'Permanent Split Capacitor' },
  { acronym: 'SEER', meaning: 'Seasonal Energy Efficiency Ratio' },
  { acronym: 'TXV', meaning: 'Thermostatic Expansion Valve' },
  { acronym: 'UV', meaning: 'Ultraviolet' },
  { acronym: 'VAV', meaning: 'Variable Air Volume' },
  { acronym: 'VFD', meaning: 'Variable Frequency Drive' },
  { acronym: 'VRF', meaning: 'Variable Refrigerant Flow' }
]

export default function HVACDictionaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-indigo-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC Dictionary
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Complete glossary of heating, cooling, and ventilation terms explained in simple language
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-200 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for a term..."
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Terms Defined</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-600">Acronyms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">A-Z</div>
              <div className="text-sm text-gray-600">Complete Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">2024</div>
              <div className="text-sm text-gray-600">Updated Terms</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="py-6 bg-gray-50 sticky top-0 z-10 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(hvacTerms).map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors font-semibold"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Terms by Letter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {Object.entries(hvacTerms).map(([letter, terms]) => (
              <div key={letter} id={`letter-${letter}`}>
                <h2 className="text-3xl font-bold text-indigo-600 mb-6 pb-2 border-b-2 border-indigo-200">
                  {letter}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {terms.map((item) => (
                    <Card key={item.term} className="p-6 hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.term}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {item.definition}
                      </p>
                      {item.relatedTerms && (
                        <div className="pt-3 border-t">
                          <span className="text-sm text-gray-500 font-medium">Related: </span>
                          <div className="inline-flex flex-wrap gap-2 mt-1">
                            {item.relatedTerms.map((related, idx) => (
                              <span
                                key={idx}
                                className="text-sm text-indigo-600 hover:text-indigo-700 cursor-pointer"
                              >
                                {related}
                                {idx < item.relatedTerms.length - 1 && ','}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Acronyms */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common HVAC Acronyms</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {commonAcronyms.map((item) => (
              <div key={item.acronym} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                <div className="font-bold text-indigo-600 text-lg mb-1">{item.acronym}</div>
                <div className="text-sm text-gray-600">{item.meaning}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Equipment Terms</h3>
              <p className="text-gray-600 mb-4">
                Furnaces, air conditioners, heat pumps, boilers, and system components
              </p>
              <Link href="/hvac-dictionary/equipment" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View Equipment Terms
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Terms</h3>
              <p className="text-gray-600 mb-4">
                Efficiency ratings, measurements, refrigeration cycle, and diagnostics
              </p>
              <Link href="/hvac-dictionary/technical" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View Technical Terms
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Indoor Air Quality</h3>
              <p className="text-gray-600 mb-4">
                Filtration, humidity, ventilation, and air purification terminology
              </p>
              <Link href="/hvac-dictionary/air-quality" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                View IAQ Terms
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-12 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Keep Learning</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Understanding HVAC terminology helps you make better decisions about your home comfort systems
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/buying-guides" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🛒</div>
              <div className="font-semibold text-gray-900">Buying Guides</div>
              <div className="text-sm text-gray-600 mt-1">Equipment selection help</div>
            </Link>
            <Link href="/how-to" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🔧</div>
              <div className="font-semibold text-gray-900">How-To Guides</div>
              <div className="text-sm text-gray-600 mt-1">DIY maintenance tips</div>
            </Link>
            <Link href="/troubleshooting" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-semibold text-gray-900">Troubleshooting</div>
              <div className="text-sm text-gray-600 mt-1">Fix common problems</div>
            </Link>
            <Link href="/energy-efficiency" className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-gray-900">Energy Savings</div>
              <div className="text-sm text-gray-600 mt-1">Efficiency tips</div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Question About HVAC Terms?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Explore our comprehensive guides to learn more about your HVAC system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/air-conditioners/ultimate-buying-guide"
              className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              AC Buying Guide
            </Link>
            <Link
              href="/furnaces-heating/furnace-maintenance"
              className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors border border-indigo-500"
            >
              Maintenance Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}