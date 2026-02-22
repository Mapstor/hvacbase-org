import Link from 'next/link';
import { AlertTriangle, Shield, XOctagon, Info, Users, Wrench, DollarSign, Heart, Scale, BookOpen, ExternalLink } from 'lucide-react';

export default function Disclaimer() {
  const lastUpdated = 'February 12, 2026';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-red-700 to-orange-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Disclaimer</h1>
          </div>
          <p className="text-orange-200">
            Last Updated: {lastUpdated}
          </p>
          <p className="text-orange-100 mt-4">
            Important information about the limitations of our content and services. Please read carefully before using HVACBase.org.
          </p>
        </div>
      </section>

      {/* Critical Notice */}
      <section className="py-8 bg-red-50 border-b border-red-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg p-6 border-2 border-red-300">
            <div className="flex items-start gap-3">
              <XOctagon className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-red-900 mb-2">CRITICAL SAFETY NOTICE</h2>
                <p className="text-gray-700 mb-3">
                  <strong>HVAC systems involve serious safety risks including:</strong>
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Electrical hazards:</strong> High voltage that can cause electrocution or death</li>
                  <li>• <strong>Gas leaks:</strong> Natural gas and propane can cause explosions or carbon monoxide poisoning</li>
                  <li>• <strong>Refrigerant exposure:</strong> Can cause frostbite, suffocation, or environmental damage</li>
                  <li>• <strong>Structural damage:</strong> Improper installation can damage your home</li>
                  <li>• <strong>Fire hazards:</strong> Incorrect wiring or gas connections can cause fires</li>
                </ul>
                <div className="bg-red-100 rounded p-4 mt-4">
                  <p className="font-bold text-red-900">
                    ALWAYS hire licensed HVAC professionals for installation, repair, and maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          {/* General Disclaimer */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">General Disclaimer</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                The information provided on HVACBase.org is for <strong>general informational and educational purposes only</strong>. 
                While we strive for accuracy, we make no representations or warranties of any kind, express or implied, about the 
                completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related 
                graphics contained on this website.
              </p>
              
              <div className="bg-white rounded p-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Key Points:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Content is for educational purposes only</li>
                  <li>✓ Not a substitute for professional advice</li>
                  <li>✓ Information may contain errors or be outdated</li>
                  <li>✓ Local codes and requirements vary significantly</li>
                  <li>✓ Every home and situation is unique</li>
                </ul>
              </div>
            </div>
          </div>

          {/* No Professional Relationship */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">No Professional Relationship</h2>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                Using HVACBase.org does NOT create a professional relationship of any kind.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">We Are NOT:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>❌ Licensed HVAC contractors</li>
                    <li>❌ Professional engineers</li>
                    <li>❌ Building inspectors</li>
                    <li>❌ Energy auditors</li>
                    <li>❌ Legal advisors</li>
                    <li>❌ Your personal consultants</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">We Do NOT Provide:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>❌ System design services</li>
                    <li>❌ Load calculations</li>
                    <li>❌ Permit assistance</li>
                    <li>❌ Code compliance verification</li>
                    <li>❌ Installation instructions</li>
                    <li>❌ Troubleshooting support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Disclaimers */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Calculator & Tool Disclaimers</h2>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Our calculators and tools provide <strong>estimates and general guidance only</strong>. Actual requirements depend on numerous factors that online calculators cannot fully account for.
              </p>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Calculator Type</th>
                      <th className="text-left p-3">Limitations</th>
                      <th className="text-left p-3">Professional Alternative</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="p-3 font-medium">BTU/Sizing</td>
                      <td className="p-3">Cannot account for all heat load factors</td>
                      <td className="p-3">Manual J calculation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Energy Savings</td>
                      <td className="p-3">Based on averages, not your specific usage</td>
                      <td className="p-3">Energy audit</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 font-medium">Cost Estimates</td>
                      <td className="p-3">Regional variations, doesn't include all factors</td>
                      <td className="p-3">Contractor quotes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Efficiency Comparisons</td>
                      <td className="p-3">Laboratory conditions, not real-world</td>
                      <td className="p-3">Field testing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-yellow-100 rounded p-4 mt-4">
                <p className="text-sm text-gray-800">
                  <strong>Important:</strong> Always have a licensed HVAC professional perform proper load calculations 
                  and system design. Incorrect sizing can lead to comfort problems, high energy bills, and premature equipment failure.
                </p>
              </div>
            </div>
          </div>

          {/* Financial Disclaimer */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Financial & Cost Disclaimers</h2>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cost Estimates</h3>
                  <p className="text-gray-700 mb-2">
                    All cost information is based on national or regional averages and may not reflect your local market.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Prices vary by location (50-200% variation)</li>
                    <li>• Labor costs differ significantly by region</li>
                    <li>• Material costs fluctuate with market conditions</li>
                    <li>• Additional work may be required (electrical, ductwork, permits)</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Energy Savings Claims</h3>
                  <p className="text-gray-700 mb-2">
                    Energy savings estimates are based on ideal conditions and average usage patterns.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Actual savings depend on usage habits</li>
                    <li>• Utility rates vary and change over time</li>
                    <li>• Weather patterns affect consumption</li>
                    <li>• System maintenance impacts efficiency</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Tax Credits & Rebates</h3>
                  <p className="text-gray-700 mb-2">
                    Tax and rebate information is subject to change without notice.
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Consult a tax professional for advice</li>
                    <li>• Verify current program requirements</li>
                    <li>• Eligibility requirements may vary</li>
                    <li>• Programs may end or change suddenly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Medical & Health Disclaimer */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Health & Safety Disclaimers</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                HVAC systems directly impact indoor air quality and can affect health, especially for sensitive individuals.
              </p>
              
              <div className="bg-white rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Health Considerations We Cannot Address:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>Allergies & Asthma:</strong> Consult medical professionals for air quality needs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>Carbon Monoxide:</strong> Install CO detectors and have systems professionally inspected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>Mold & Moisture:</strong> Requires professional assessment and remediation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>Refrigerant Exposure:</strong> Can cause serious health effects - call professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <span><strong>Indoor Air Quality:</strong> Complex issue requiring professional testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Compliance */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Legal & Regulatory Compliance</h2>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                You are responsible for compliance with all applicable laws, codes, and regulations.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Building Codes & Permits</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Local codes override any information on this site</li>
                    <li>• Permit requirements vary by jurisdiction</li>
                    <li>• Professional installation often legally required</li>
                    <li>• DIY work may void insurance or violate codes</li>
                    <li>• Inspections may be required</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Environmental Regulations</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• EPA regulations on refrigerant handling</li>
                    <li>• Certification required for refrigerant work</li>
                    <li>• Disposal regulations for old equipment</li>
                    <li>• Energy efficiency minimums by region</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* External Links */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">External Links & References</h2>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                HVACBase.org contains links to external websites for reference and additional information.
              </p>
              
              <div className="bg-white rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">External Link Disclaimer:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• We do not control external content</li>
                  <li>• Links do not imply endorsement</li>
                  <li>• External sites have their own terms and privacy policies</li>
                  <li>• We are not responsible for external content accuracy</li>
                  <li>• Manufacturer specs and prices change frequently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-gray-900 font-bold mb-4">
                IN NO EVENT SHALL HVACBASE.ORG BE LIABLE FOR:
              </p>
              
              <div className="space-y-3 text-gray-700">
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Direct or Indirect Damages Including:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Property damage from HVAC system failures</li>
                    <li>• Personal injury from DIY attempts</li>
                    <li>• Financial losses from incorrect sizing or selection</li>
                    <li>• Increased energy costs from improper installation</li>
                    <li>• Comfort issues or system performance problems</li>
                    <li>• Code violations or permit issues</li>
                    <li>• Environmental damage or regulatory fines</li>
                    <li>• Loss of warranty coverage</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-100 rounded p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Use of this website and its content is entirely at your own risk.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Advice Notice */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Always Seek Professional Advice</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4 font-semibold">
                For all HVAC decisions, installations, and repairs, consult with:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Licensed Professionals:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ HVAC contractors (NATE certified preferred)</li>
                    <li>✓ Mechanical engineers for system design</li>
                    <li>✓ Electrical contractors for power work</li>
                    <li>✓ Plumbers for gas line work</li>
                    <li>✓ Energy auditors for efficiency analysis</li>
                    <li>✓ Indoor air quality specialists</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Official Resources:</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Local building departments</li>
                    <li>✓ Utility companies for rebates</li>
                    <li>✓ EPA for environmental regulations</li>
                    <li>✓ ENERGY STAR for efficiency standards</li>
                    <li>✓ Manufacturer specifications</li>
                    <li>✓ State licensing boards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Questions About This Disclaimer?</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about this disclaimer or concerns about content accuracy:
              </p>
              <div className="space-y-2 text-gray-700">
                <p>Email: <a href="mailto:legal@hvacbase.org" className="text-brand-600 hover:text-brand-700">legal@hvacbase.org</a></p>
                <p>Response Time: 2-3 business days</p>
              </div>
              
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <Link href="/terms" className="bg-white rounded p-4 hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-900">Terms of Service</h4>
                  <p className="text-sm text-gray-600 mt-1">Our complete terms and conditions</p>
                </Link>
                <Link href="/privacy" className="bg-white rounded p-4 hover:bg-gray-100 transition-colors">
                  <h4 className="font-medium text-gray-900">Privacy Policy</h4>
                  <p className="text-sm text-gray-600 mt-1">How we handle your information</p>
                </Link>
              </div>
            </div>
          </div>

          {/* Final Notice */}
          <div className="mt-8 bg-red-100 rounded-lg p-6 border-2 border-red-300">
            <p className="text-center text-red-900 font-bold text-lg">
              BY USING THIS WEBSITE, YOU ACKNOWLEDGE THAT YOU HAVE READ, 
              UNDERSTOOD, AND AGREE TO THIS DISCLAIMER IN ITS ENTIRETY.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}