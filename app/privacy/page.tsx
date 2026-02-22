import Link from 'next/link';
import { Shield, Lock, Eye, Database, Mail, Globe, FileText, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = 'February 12, 2026';
  const effectiveDate = 'January 1, 2026';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-300">
            Last Updated: {lastUpdated} | Effective Date: {effectiveDate}
          </p>
          <p className="text-gray-200 mt-4">
            Your privacy is important to us. This policy explains how HVACBase.org collects, uses, and protects your information.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <div className="grid md:grid-cols-2 gap-2">
            <a href="#information-collected" className="text-brand-600 hover:text-brand-700">1. Information We Collect</a>
            <a href="#how-we-use" className="text-brand-600 hover:text-brand-700">2. How We Use Your Information</a>
            <a href="#data-sharing" className="text-brand-600 hover:text-brand-700">3. Information Sharing</a>
            <a href="#cookies" className="text-brand-600 hover:text-brand-700">4. Cookies & Tracking</a>
            <a href="#data-security" className="text-brand-600 hover:text-brand-700">5. Data Security</a>
            <a href="#your-rights" className="text-brand-600 hover:text-brand-700">6. Your Rights</a>
            <a href="#children" className="text-brand-600 hover:text-brand-700">7. Children's Privacy</a>
            <a href="#changes" className="text-brand-600 hover:text-brand-700">8. Policy Changes</a>
            <a href="#contact" className="text-brand-600 hover:text-brand-700">9. Contact Information</a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          {/* 1. Information We Collect */}
          <div id="information-collected">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Information You Provide Directly</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span><strong>Calculator Data:</strong> Information entered into our BTU, sizing, and efficiency calculators (room dimensions, climate zone, insulation type)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span><strong>Contact Forms:</strong> Name, email address, and messages when you contact us</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span><strong>Comments:</strong> Information provided when commenting on articles (if feature enabled)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Information Collected Automatically</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Examples</th>
                      <th className="text-left py-2">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    <tr className="border-b">
                      <td className="py-2">Device Information</td>
                      <td className="py-2">Browser type, OS, screen size</td>
                      <td className="py-2">Site optimization</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Usage Data</td>
                      <td className="py-2">Pages visited, time on site</td>
                      <td className="py-2">Content improvement</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Location Data</td>
                      <td className="py-2">Country, state (IP-based)</td>
                      <td className="py-2">Regional content</td>
                    </tr>
                    <tr>
                      <td className="py-2">Referral Data</td>
                      <td className="py-2">How you found us</td>
                      <td className="py-2">Marketing analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 2. How We Use Information */}
          <div id="how-we-use">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Primary Uses</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Provide calculator results and recommendations</li>
                  <li>• Respond to your inquiries and support requests</li>
                  <li>• Improve our content and tools based on usage</li>
                  <li>• Customize content for your climate zone</li>
                  <li>• Send requested information or updates</li>
                </ul>
              </div>
              
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">We Do NOT</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>❌ Sell your personal information</li>
                  <li>❌ Share data with HVAC contractors without consent</li>
                  <li>❌ Use your data for unrelated marketing</li>
                  <li>❌ Create user profiles for advertising</li>
                  <li>❌ Store calculator inputs beyond session</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Data Sharing */}
          <div id="data-sharing">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Information Sharing & Disclosure</h2>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Limited Sharing Policy</h3>
                  <p className="text-gray-700 mb-4">
                    We share your information only in these specific circumstances:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Service Providers:</strong> Analytics (Google Analytics), hosting (Vercel/AWS), email services</li>
                    <li><strong>Legal Requirements:</strong> When required by law, subpoena, or court order</li>
                    <li><strong>Safety:</strong> To protect rights, property, or safety of HVACBase, users, or public</li>
                    <li><strong>Business Transfers:</strong> In connection with merger, acquisition, or asset sale</li>
                    <li><strong>With Consent:</strong> When you explicitly agree to sharing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Cookies */}
          <div id="cookies">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Cookies & Tracking Technologies</h2>
            </div>
            
            <div className="space-y-4">
              <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">Cookie Type</th>
                    <th className="text-left p-3">Purpose</th>
                    <th className="text-left p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-3 font-medium">Essential</td>
                    <td className="p-3">Site functionality, calculator state</td>
                    <td className="p-3">Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Analytics</td>
                    <td className="p-3">Google Analytics for usage patterns</td>
                    <td className="p-3">2 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium">Preferences</td>
                    <td className="p-3">Climate zone, unit preferences</td>
                    <td className="p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Performance</td>
                    <td className="p-3">Site speed and error tracking</td>
                    <td className="p-3">30 days</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Managing Cookies:</strong> You can control cookies through browser settings. 
                  Disabling cookies may limit calculator functionality. We honor "Do Not Track" signals.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Data Security */}
          <div id="data-security">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
            </div>
            
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Security Measures</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <ul className="space-y-2">
                  <li>✓ SSL/TLS encryption for all data transmission</li>
                  <li>✓ Regular security audits and updates</li>
                  <li>✓ Limited access to personal information</li>
                  <li>✓ Secure hosting infrastructure</li>
                </ul>
                <ul className="space-y-2">
                  <li>✓ No storage of sensitive financial data</li>
                  <li>✓ Regular backups and disaster recovery</li>
                  <li>✓ Compliance with industry standards</li>
                  <li>✓ Incident response procedures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. Your Rights */}
          <div id="your-rights">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Your Rights & Choices</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-5">
                <h3 className="font-semibold text-gray-900 mb-3">You Have the Right To:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Access:</strong> Request a copy of information we have about you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Correction:</strong> Update or correct inaccurate information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Deletion:</strong> Request deletion of your personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Opt-Out:</strong> Unsubscribe from communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Portability:</strong> Receive your data in a structured format</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>California Residents:</strong> Additional rights under CCPA including right to know, 
                  delete, opt-out of sale (we don't sell data), and non-discrimination.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Children's Privacy */}
          <div id="children">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">7. Children's Privacy</h2>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-6">
              <p className="text-gray-700">
                HVACBase.org is not directed to children under 13. We do not knowingly collect personal 
                information from children under 13. If you believe we have collected information from a 
                child under 13, please contact us immediately at privacy@hvacbase.org for deletion.
              </p>
            </div>
          </div>

          {/* 8. Changes */}
          <div id="changes">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">8. Changes to This Policy</h2>
            </div>
            
            <div className="bg-white border rounded-lg p-5">
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically. Changes will be posted on this page with an 
                updated "Last Updated" date. For material changes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• We'll post a prominent notice on the homepage</li>
                <li>• The new policy will take effect 30 days after posting</li>
                <li>• Continued use constitutes acceptance of changes</li>
              </ul>
            </div>
          </div>

          {/* 9. Contact */}
          <div id="contact">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">9. Contact Information</h2>
            </div>
            
            <div className="bg-brand-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Questions or Concerns?</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-brand-600" />
                  Email: <a href="mailto:privacy@hvacbase.org" className="text-brand-600 hover:text-brand-700">privacy@hvacbase.org</a>
                </p>
                <p className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-brand-600" />
                  Website: <Link href="/" className="text-brand-600 hover:text-brand-700">hvacbase.org</Link>
                </p>
                <p className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-600" />
                  Response Time: Within 48 business hours
                </p>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Additional Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/terms" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-medium text-gray-900 mb-1">Terms of Service</h4>
                <p className="text-sm text-gray-600">Our terms and conditions of use</p>
              </Link>
              <Link href="/disclaimer" className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <h4 className="font-medium text-gray-900 mb-1">Disclaimer</h4>
                <p className="text-sm text-gray-600">Important information about our content</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}