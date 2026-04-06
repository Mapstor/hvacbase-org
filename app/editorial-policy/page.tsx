import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Shield, Users, CheckCircle, Eye, BookOpen, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Editorial Policy - HVAC Base: Our Standards for Quality & Accuracy',
  description: 'Learn about HVAC Base editorial policy, review process, and commitment to providing accurate, unbiased HVAC information. Our standards for quality content.',
  openGraph: {
    title: 'Editorial Policy | HVAC Base Quality Standards',
    description: 'Our commitment to accurate, unbiased HVAC information and quality content standards.',
    type: 'website',
  }
}

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Editorial Policy
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Our commitment to providing accurate, unbiased, and helpful HVAC information
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              HVAC Base exists to help homeowners make informed decisions about their heating, ventilation, and air conditioning systems. We provide comprehensive, accurate, and unbiased information to save money, improve comfort, and maintain safe, efficient HVAC systems.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Core Editorial Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Accuracy First</h3>
              </div>
              <p className="text-gray-600">
                All technical information is fact-checked by HVAC professionals and verified against industry standards from ASHRAE, ACCA, and EPA guidelines.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">100% Unbiased</h3>
              </div>
              <p className="text-gray-600">
                We accept no payment for reviews or recommendations. All content is based on performance data, user feedback, and independent analysis.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Eye className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Transparency</h3>
              </div>
              <p className="text-gray-600">
                We clearly disclose our methodology, sources, and any potential conflicts of interest. Our review process is open and accountable.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">User-Focused</h3>
              </div>
              <p className="text-gray-600">
                Every article is written from the homeowner's perspective, focusing on practical value, cost savings, and safety considerations.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Comprehensive Coverage</h3>
              </div>
              <p className="text-gray-600">
                We provide complete information including pros, cons, costs, and alternatives to help readers make fully informed decisions.
              </p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Safety Priority</h3>
              </div>
              <p className="text-gray-600">
                Safety information is prominently featured and regularly updated to reflect current best practices and code requirements.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Editorial Standards</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Research and Fact-Checking</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Primary Sources:</strong> We cite official sources including EPA, DOE, ASHRAE, ACCA, and manufacturer specifications
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Professional Review:</strong> All technical content is reviewed by licensed HVAC professionals with 10+ years experience
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Data Verification:</strong> Performance claims are verified against AHRI certification databases and independent testing
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Regular Updates:</strong> Content is reviewed annually and updated when standards change or new information becomes available
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Content Creation Process</h3>
              <div className="bg-blue-50 rounded-lg p-6">
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">1</span>
                    <div>
                      <strong>Topic Research:</strong> Identify user needs through search data, customer questions, and industry trends
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">2</span>
                    <div>
                      <strong>Expert Consultation:</strong> Consult with HVAC professionals to ensure technical accuracy
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">3</span>
                    <div>
                      <strong>Content Creation:</strong> Write comprehensive content focusing on practical value and clear explanations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">4</span>
                    <div>
                      <strong>Technical Review:</strong> Independent fact-checking by qualified HVAC professionals
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">5</span>
                    <div>
                      <strong>Editorial Review:</strong> Check for clarity, completeness, and adherence to editorial standards
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-semibold text-sm mr-3 mt-1">6</span>
                    <div>
                      <strong>Publication & Monitoring:</strong> Publish and monitor for user feedback and accuracy
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Independence and Conflicts of Interest</h3>
              <div className="bg-green-50 rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>No Paid Reviews:</strong> We do not accept payment for positive reviews or product recommendations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Editorial Independence:</strong> Content decisions are made based solely on reader value and accuracy
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Clear Disclosures:</strong> Any potential conflicts of interest are clearly disclosed to readers
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong>Affiliate Links:</strong> When present, affiliate links are clearly marked and do not influence our recommendations
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Team */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Expert Review Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Reviewers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Licensed HVAC contractors with 10+ years experience</li>
                <li>• NATE-certified technicians</li>
                <li>• Mechanical engineers with HVAC specialization</li>
                <li>• Energy efficiency specialists</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Editorial Team</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Professional technical writers</li>
                <li>• Home improvement specialists</li>
                <li>• Safety and code compliance experts</li>
                <li>• Consumer advocacy professionals</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Corrections and Updates */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Corrections and Updates</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              We are committed to maintaining accurate information. When errors are identified or information becomes outdated, we take immediate action to correct and update our content.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Correction Process:</h3>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>• <strong>Immediate correction</strong> of factual errors upon identification</li>
              <li>• <strong>Clear notation</strong> of significant updates with dates</li>
              <li>• <strong>Transparency</strong> about changes that affect recommendations</li>
              <li>• <strong>User notification</strong> for major corrections when possible</li>
            </ul>
            
            <p className="text-gray-700">
              <strong>Report an Error:</strong> If you identify inaccurate information, please contact us at{' '}
              <Link href="mailto:editorial@hvacbase.org" className="text-blue-600 hover:text-blue-700">
                editorial@hvacbase.org
              </Link>{' '}
              with details and supporting documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Content Standards */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Content Quality Standards</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Accuracy</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• All technical specifications verified against manufacturer data</li>
                <li>• Energy efficiency ratings confirmed through AHRI database</li>
                <li>• Safety information aligned with current codes and standards</li>
                <li>• Installation requirements verified with local code authorities</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practical Value</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Focus on actionable information homeowners can use</li>
                <li>• Clear explanation of costs, benefits, and trade-offs</li>
                <li>• Step-by-step guidance for appropriate DIY tasks</li>
                <li>• Clear warnings about tasks requiring professional help</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility and Clarity</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Technical terms explained in plain language</li>
                <li>• Complex concepts broken down into digestible sections</li>
                <li>• Visual aids and examples to clarify difficult concepts</li>
                <li>• Mobile-friendly formatting for all devices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback and Contact */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Reader Feedback</h2>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Your feedback helps us improve our content and maintain the highest standards. We welcome:
            </p>
            
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• Corrections or clarifications on technical information</li>
              <li>• Suggestions for new topics or content gaps</li>
              <li>• Feedback on content clarity and usefulness</li>
              <li>• Real-world experiences with products or procedures we've covered</li>
            </ul>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Our Editorial Team</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>General Editorial:</strong> <Link href="mailto:editorial@hvacbase.org" className="text-blue-600 hover:text-blue-700">editorial@hvacbase.org</Link></p>
                <p><strong>Technical Questions:</strong> <Link href="mailto:technical@hvacbase.org" className="text-blue-600 hover:text-blue-700">technical@hvacbase.org</Link></p>
                <p><strong>Error Reports:</strong> <Link href="mailto:corrections@hvacbase.org" className="text-blue-600 hover:text-blue-700">corrections@hvacbase.org</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-6 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-600">
            This editorial policy was last updated on March 15, 2024. We review and update our policies annually or as needed to reflect changes in industry standards and best practices.
          </p>
        </div>
      </section>
    </div>
  )
}