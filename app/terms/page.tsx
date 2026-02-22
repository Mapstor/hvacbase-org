import Link from 'next/link';
import { FileText, AlertTriangle, Scale, Shield, Ban, Globe, Users, CheckCircle, XCircle, Info } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = 'February 12, 2026';
  const effectiveDate = 'January 1, 2026';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-blue-200">
            Last Updated: {lastUpdated} | Effective Date: {effectiveDate}
          </p>
          <p className="text-blue-100 mt-4">
            By using HVACBase.org, you agree to these terms. Please read them carefully.
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Quick Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-900 mb-1">✅ Free to Use</p>
                <p className="text-gray-600">All content and calculators are free</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">📚 Educational Only</p>
                <p className="text-gray-600">Not professional HVAC advice</p>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">🔒 Your Content</p>
                <p className="text-gray-600">You retain rights to your submissions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          {/* 1. Acceptance of Terms */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            </div>
            
            <div className="bg-white rounded-lg p-6 border">
              <p className="text-gray-700 mb-4">
                By accessing or using HVACBase.org ("Website", "Service", "we", "us", or "our"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you may not use our Service.
              </p>
              <div className="bg-gray-50 rounded p-4 mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Who Can Use Our Service</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• You must be at least 13 years old</li>
                  <li>• You must have the legal capacity to enter into contracts</li>
                  <li>• You must not be prohibited from using the Service under applicable law</li>
                  <li>• You must provide accurate information when using our calculators</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Use License & Restrictions */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Use License & Intellectual Property</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Permitted Uses
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ View and read all content for personal, non-commercial use</li>
                  <li>✓ Use calculators and tools for your HVAC planning</li>
                  <li>✓ Share links to our content on social media</li>
                  <li>✓ Print articles for personal reference</li>
                  <li>✓ Quote portions with proper attribution</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-red-600" />
                  Prohibited Uses
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ Republishing entire articles without permission</li>
                  <li>✗ Using content for commercial purposes without license</li>
                  <li>✗ Scraping or automated data collection</li>
                  <li>✗ Removing copyright notices or attribution</li>
                  <li>✗ Creating derivative works without permission</li>
                  <li>✗ Misrepresenting content as your own</li>
                </ul>
              </div>

              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Copyright & Ownership</h3>
                <p className="text-gray-700 mb-3">
                  All content on HVACBase.org, including text, graphics, logos, images, calculators, and software, is the property of HVACBase.org or its content suppliers and is protected by international copyright laws.
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Content Type</th>
                      <th className="text-left py-2">Owner</th>
                      <th className="text-left py-2">Usage Rights</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-2">Articles & Guides</td>
                      <td className="py-2">HVACBase.org</td>
                      <td className="py-2">Personal use only</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Calculators & Tools</td>
                      <td className="py-2">HVACBase.org</td>
                      <td className="py-2">Free use, no resale</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">User Comments</td>
                      <td className="py-2">User (licensed to us)</td>
                      <td className="py-2">Perpetual license granted</td>
                    </tr>
                    <tr>
                      <td className="py-2">Third-party Content</td>
                      <td className="py-2">Original owners</td>
                      <td className="py-2">As specified by owner</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3. Disclaimers */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Disclaimers & Limitations</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">IMPORTANT DISCLAIMERS</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Educational Purpose Only</h4>
                  <p className="text-gray-700 text-sm">
                    HVACBase.org provides general information and educational content about HVAC systems. 
                    This information is NOT a substitute for professional HVAC consultation, inspection, or service.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">No Professional Advice</h4>
                  <p className="text-gray-700 text-sm">
                    We do not provide professional HVAC, engineering, architectural, or legal advice. 
                    Always consult licensed professionals for system design, installation, and repairs.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Calculator Accuracy</h4>
                  <p className="text-gray-700 text-sm">
                    Our calculators provide estimates based on general principles and user inputs. 
                    Actual requirements may vary significantly. Professional load calculations (Manual J) 
                    should be performed for accurate sizing.
                  </p>
                </div>
                
                <div className="bg-white rounded p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">"AS IS" Basis</h4>
                  <p className="text-gray-700 text-sm">
                    Content is provided "AS IS" without warranties of any kind, either express or implied, 
                    including but not limited to warranties of merchantability, fitness for a particular purpose, 
                    or non-infringement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Liability Limitations */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Limitation of Liability</h2>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>HVACBase.org shall not be liable for any indirect, incidental, special, consequential, or punitive damages</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>We are not liable for damages resulting from use or inability to use our Service</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>We are not responsible for errors, omissions, or inaccuracies in content</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Total liability shall not exceed $100 or amount paid to us (if any)</span>
                </li>
              </ul>
              
              <div className="bg-white rounded p-4 mt-4">
                <p className="text-sm text-gray-700">
                  <strong>Specific Exclusions:</strong> We are not liable for HVAC system damage, 
                  improper installations, energy cost variations, equipment failures, personal injury, 
                  property damage, or any losses from reliance on our content.
                </p>
              </div>
            </div>
          </div>

          {/* 5. User Responsibilities */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. User Responsibilities</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">You Agree To:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Provide accurate information in calculators</li>
                  <li>✓ Use content for lawful purposes only</li>
                  <li>✓ Respect intellectual property rights</li>
                  <li>✓ Verify information with professionals</li>
                  <li>✓ Follow local building codes and regulations</li>
                  <li>✓ Not attempt to hack or disrupt the Service</li>
                </ul>
              </div>
              
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">You Will NOT:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✗ Use automated tools to scrape content</li>
                  <li>✗ Attempt unauthorized access to systems</li>
                  <li>✗ Post spam or malicious content</li>
                  <li>✗ Impersonate others or misrepresent affiliation</li>
                  <li>✗ Violate any applicable laws or regulations</li>
                  <li>✗ Interfere with others' use of the Service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. Indemnification */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Indemnification</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-gray-700">
                You agree to defend, indemnify, and hold harmless HVACBase.org, its officers, directors, 
                employees, agents, and affiliates from any claims, damages, losses, liabilities, costs, 
                and expenses (including attorney fees) arising from:
              </p>
              <ul className="mt-4 space-y-2 text-gray-700">
                <li>• Your use or misuse of the Service</li>
                <li>• Your violation of these Terms</li>
                <li>• Your violation of any third-party rights</li>
                <li>• Content you submit, post, or transmit through the Service</li>
                <li>• Your reliance on information without professional verification</li>
              </ul>
            </div>
          </div>

          {/* 7. External Links */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-900">7. External Links & Third-Party Content</h2>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Our Service may contain links to third-party websites or services that are not owned or controlled by HVACBase.org.
              </p>
              
              <div className="bg-white rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">We Are Not Responsible For:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Content, privacy policies, or practices of third-party sites</li>
                  <li>• Products or services offered by external sites</li>
                  <li>• Accuracy or reliability of third-party information</li>
                  <li>• Damages from interaction with third parties</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                <strong>Note:</strong> Links to manufacturers, government agencies, and industry organizations 
                are provided for reference only and do not constitute endorsement.
              </p>
            </div>
          </div>

          {/* 8. Changes to Terms */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">8. Modifications to Terms</h2>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes become effective immediately upon posting.
              </p>
              
              <div className="bg-white rounded p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Notification Process:</h3>
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    <tr className="border-b">
                      <td className="py-2 font-medium">Minor Changes</td>
                      <td className="py-2">Updated silently with new date</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Material Changes</td>
                      <td className="py-2">30-day notice on homepage</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Your Option</td>
                      <td className="py-2">Stop using Service if you disagree</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 9. Termination */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold text-gray-900">9. Termination</h2>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">We May Terminate If:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• You violate these Terms</li>
                    <li>• You abuse the Service</li>
                    <li>• Required by law</li>
                    <li>• Service is discontinued</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Effects of Termination:</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Access immediately revoked</li>
                    <li>• License to use content ends</li>
                    <li>• Surviving provisions remain</li>
                    <li>• No refunds provided</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 10. Governing Law */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">10. Governing Law & Disputes</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Governing Law</h3>
                  <p className="text-gray-700">
                    These Terms are governed by the laws of the United States and the State of Delaware, 
                    without regard to conflict of law principles.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dispute Resolution</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>First attempt: Good faith negotiation via email</li>
                    <li>If unresolved: Binding arbitration under AAA rules</li>
                    <li>Location: Delaware or mutually agreed location</li>
                    <li>Small claims court allowed for qualifying disputes</li>
                  </ol>
                </div>
                
                <div className="bg-white rounded p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Class Action Waiver:</strong> You agree to resolve disputes individually 
                    and waive the right to participate in class actions, class arbitrations, or representative actions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 11. Contact Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">11. Contact Information</h2>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Questions About These Terms?</h3>
              <div className="space-y-2 text-gray-700">
                <p>Email: <a href="mailto:legal@hvacbase.org" className="text-brand-600 hover:text-brand-700">legal@hvacbase.org</a></p>
                <p>Website: <Link href="/" className="text-brand-600 hover:text-brand-700">hvacbase.org</Link></p>
                <p>Response Time: 2-3 business days</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <h4 className="font-medium text-gray-900 mb-2">For Other Inquiries:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• General questions: <a href="mailto:info@hvacbase.org" className="text-brand-600">info@hvacbase.org</a></li>
                  <li>• Privacy concerns: <a href="mailto:privacy@hvacbase.org" className="text-brand-600">privacy@hvacbase.org</a></li>
                  <li>• Content licensing: <a href="mailto:licensing@hvacbase.org" className="text-brand-600">licensing@hvacbase.org</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Additional Legal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/privacy" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-medium text-gray-900 mb-1">Privacy Policy</h4>
                <p className="text-sm text-gray-600">How we collect and use your information</p>
              </Link>
              <Link href="/disclaimer" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-medium text-gray-900 mb-1">Disclaimer</h4>
                <p className="text-sm text-gray-600">Important limitations on our content</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}