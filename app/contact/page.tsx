import { Metadata } from 'next';
import { Mail, Globe, MessageSquare, Clock, HelpCircle, BookOpen, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | HVACBase.org',
  description: 'Get in touch with HVACBase.org for questions, suggestions, or feedback about our HVAC knowledge base and resources.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact HVACBase.org
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help with your HVAC questions and continuously improve our resources based on your feedback
          </p>
        </div>

        {/* Main Contact Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-brand-100 p-3 rounded-lg">
                <Mail className="w-8 h-8 text-brand-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Email Us</h2>
                <p className="text-gray-600">Primary contact method</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:text-brand-700 text-lg font-medium">
                  info@hvacbase.org
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  For general questions, feedback, and suggestions
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Content Submissions</h3>
                <a href="mailto:content@hvacbase.org" className="text-brand-600 hover:text-brand-700 text-lg font-medium">
                  content@hvacbase.org
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  For article suggestions and content contributions
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
                <a href="mailto:support@hvacbase.org" className="text-brand-600 hover:text-brand-700 text-lg font-medium">
                  support@hvacbase.org
                </a>
                <p className="text-gray-600 text-sm mt-1">
                  For website issues and calculator problems
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Website Information</h2>
                <p className="text-gray-600">Our online presence</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Domain</h3>
                <p className="text-lg text-gray-700">hvacbase.org</p>
                <p className="text-gray-600 text-sm mt-1">
                  Your trusted HVAC knowledge resource since 2024
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Content Updates</h3>
                <p className="text-gray-700">
                  Our content is continuously updated to reflect the latest HVAC technologies, regulations, and best practices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-700">
                  We typically respond to inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Can Help With */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Can Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3 inline-block">
                <HelpCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">HVAC Questions</h3>
              <p className="text-gray-600 text-sm">
                Get clarification on any HVAC topic covered in our articles
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3 inline-block">
                <BookOpen className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Content Requests</h3>
              <p className="text-gray-600 text-sm">
                Suggest new topics or areas you'd like us to cover
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3 inline-block">
                <FileText className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Corrections</h3>
              <p className="text-gray-600 text-sm">
                Report any errors or outdated information you find
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-4 mb-3 inline-block">
                <Users className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Partnerships</h3>
              <p className="text-gray-600 text-sm">
                Explore collaboration opportunities with HVACBase.org
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you provide HVAC installation or repair services?</h3>
              <p className="text-gray-700">
                No, HVACBase.org is an educational resource only. We provide information to help you understand HVAC systems and make informed decisions, but we don't offer installation, repair, or maintenance services. We recommend working with licensed HVAC professionals in your area for hands-on work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can you recommend specific HVAC contractors in my area?</h3>
              <p className="text-gray-700">
                We don't provide contractor recommendations to maintain our independence and avoid conflicts of interest. However, our guides on selecting and working with HVAC contractors can help you find and evaluate qualified professionals in your area.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is your content free to use?</h3>
              <p className="text-gray-700">
                Yes, all content on HVACBase.org is completely free to access. Our mission is to democratize HVAC knowledge and help everyone make better decisions about their heating and cooling systems. We believe quality information should be accessible to all.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How often is your content updated?</h3>
              <p className="text-gray-700">
                We continuously review and update our content to ensure accuracy. Major updates happen when there are changes to efficiency standards, building codes, or significant technological advances. Each article shows its last update date for transparency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I contribute content to HVACBase.org?</h3>
              <p className="text-gray-700">
                We welcome contributions from HVAC professionals and knowledgeable enthusiasts. If you have expertise to share, please contact us at content@hvacbase.org with your topic ideas and relevant experience. All contributions are reviewed for accuracy and quality.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Alternative */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="w-12 h-12 text-brand-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Quick Response Guaranteed</h2>
            <p className="text-gray-300 mb-6">
              When you email us, you're not sending a message into the void. Our team reviews every inquiry and responds promptly. Whether you have a technical question, found an error, or want to suggest improvements, we value your input and will get back to you.
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-brand-300 mb-3">What to Include in Your Email</h3>
              <ul className="text-left text-gray-300 space-y-2 max-w-xl mx-auto">
                <li className="flex items-start">
                  <span className="text-brand-400 mr-2">•</span>
                  <span>Clear subject line describing your inquiry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-400 mr-2">•</span>
                  <span>Specific article or calculator if referencing our content</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-400 mr-2">•</span>
                  <span>Your location (if relevant for climate-specific questions)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-400 mr-2">•</span>
                  <span>Any relevant details about your HVAC system or situation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Educational Purpose:</strong> HVACBase.org provides educational content only. Always consult with licensed HVAC professionals for system installation, repairs, or specific recommendations for your situation.
            </p>
            <p>
              <strong>No Emergency Services:</strong> We cannot provide emergency HVAC assistance. If you have an urgent heating or cooling issue, contact a local HVAC service provider immediately.
            </p>
            <p>
              <strong>Medical Disclaimer:</strong> While we cover indoor air quality topics, we don't provide medical advice. Consult healthcare professionals for health-related concerns.
            </p>
            <p>
              <strong>Privacy:</strong> We respect your privacy and never share your contact information with third parties. Emails are used solely for responding to your inquiries.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We Value Your Feedback
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Your questions, suggestions, and feedback help us improve HVACBase.org for everyone. Don't hesitate to reach out – we're here to help you navigate the world of HVAC with confidence.
          </p>
          <a 
            href="mailto:info@hvacbase.org" 
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email Us Today
          </a>
        </div>
      </div>
    </div>
  );
}