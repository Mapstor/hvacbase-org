import { Metadata } from 'next';
import { Building2, Users, Target, BookOpen, Award, TrendingUp, Lightbulb, Globe, Shield, Heart, Microscope, GraduationCap, BarChart, Clock, CheckCircle, Star, Zap, Database, HandshakeIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | HVACBase.org - Your Trusted HVAC Knowledge Resource',
  description: 'Learn about HVACBase.org, the comprehensive HVAC knowledge base helping homeowners and professionals make informed decisions about heating, ventilation, and air conditioning systems.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About HVACBase.org
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for everything related to heating, ventilation, and air conditioning systems
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">
            HVACBase.org exists to democratize HVAC knowledge and empower homeowners, property managers, and HVAC professionals with accurate, up-to-date, and comprehensive information about heating, ventilation, and air conditioning systems. We believe that informed decisions lead to better comfort, lower energy costs, and longer-lasting equipment.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Our mission is to bridge the knowledge gap between HVAC professionals and consumers by providing clear, unbiased, and technically accurate information that helps everyone make smart decisions about their HVAC systems, whether they're choosing a new system, maintaining existing equipment, or troubleshooting problems.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We strive to be the most trusted source of HVAC information on the internet by combining technical expertise with accessible explanations, practical tools with theoretical knowledge, and comprehensive coverage with easy navigation. Every piece of content we create is designed to answer real questions and solve real problems that people face with their heating and cooling systems.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              HVACBase.org was born from a simple observation: while HVAC systems are essential to modern life, most people know very little about them. This knowledge gap often leads to poor decisions, unnecessary expenses, and reduced comfort. We saw homeowners struggling to understand contractor quotes, property managers dealing with inefficient systems, and even new HVAC technicians looking for reliable educational resources.
            </p>
            <p>
              We realized that while technical information existed, it was scattered across manufacturer websites, trade publications, and forums – often written in jargon that was impenetrable to non-professionals. There was no single, comprehensive resource that served everyone from curious homeowners to seasoned professionals.
            </p>
            <p>
              That's why we created HVACBase.org – to be the definitive online resource for HVAC knowledge. We assembled a team of HVAC experts, technical writers, and web developers to build a platform that combines deep technical knowledge with clear, accessible presentation. Our goal was ambitious: create a resource that could answer any HVAC question, from "What size AC do I need?" to "How do variable refrigerant flow systems work?"
            </p>
            <p>
              Today, with over 339 comprehensive articles, 15+ interactive calculators, and thousands of daily visitors, HVACBase.org has become the go-to resource for anyone seeking reliable HVAC information. We continue to grow and improve, adding new content, updating existing articles, and developing new tools to serve our community better.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">What Makes Us Different</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-brand-600" />
                Complete Independence
              </h4>
              <p className="text-gray-700 mb-6">
                We have no financial relationships with HVAC manufacturers, distributors, or contractors. We don't accept sponsored content, paid placements, or affiliate commissions. This independence allows us to provide truly unbiased information and recommendations based solely on technical merit and value to consumers.
              </p>

              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-brand-600" />
                Depth and Breadth
              </h4>
              <p className="text-gray-700 mb-6">
                We cover everything from basic concepts to advanced technical topics. Whether you need to understand what a BTU is or want to dive into the thermodynamics of refrigeration cycles, we have content at every level. Our interconnected articles allow readers to start anywhere and explore as deeply as they want.
              </p>

              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-600" />
                Data-Driven Approach
              </h4>
              <p className="text-gray-700">
                We don't just share opinions – we provide data. Our recommendations are based on energy efficiency ratings, performance metrics, reliability statistics, and cost analyses. Our calculators use industry-standard formulas and regional data to provide accurate, personalized results.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-600" />
                Always Current
              </h4>
              <p className="text-gray-700 mb-6">
                The HVAC industry evolves constantly with new technologies, efficiency standards, and regulations. We continuously update our content to reflect these changes. Every article shows its publication and last update date, so you always know you're getting current information.
              </p>

              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5 text-brand-600" />
                User-Focused Design
              </h4>
              <p className="text-gray-700 mb-6">
                We organize our content based on how people actually look for information. Our navigation, search functionality, and content structure are designed to help you find answers quickly. We use clear headings, summaries, and visual aids to make complex information digestible.
              </p>

              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-600" />
                Practical Tools
              </h4>
              <p className="text-gray-700">
                Beyond articles, we provide interactive calculators and tools that help you apply knowledge to your specific situation. Calculate BTU requirements, compare energy costs, size equipment properly, and estimate savings – all with tools based on industry standards and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-brand-600" />
              <h3 className="text-2xl font-bold text-gray-900">Comprehensive Guides</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Our extensive library includes over 300 in-depth articles covering every aspect of HVAC systems. From basic concepts like understanding BTUs and SEER ratings to advanced topics like zoning systems and smart thermostats, we provide the information you need at every level of expertise.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>System selection and sizing guides</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Energy efficiency ratings explained</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Maintenance and troubleshooting tips</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Cost comparisons and ROI analyses</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Installation best practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Indoor air quality solutions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-brand-600" />
              <h3 className="text-2xl font-bold text-gray-900">Interactive Tools</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Beyond articles, we provide powerful interactive calculators and tools that help you make data-driven decisions. Our tools are based on industry standards and best practices, ensuring accurate results you can trust.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>BTU and tonnage calculators</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Energy savings estimators</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>SEER2 comparison tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>System sizing calculators</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Operating cost analyzers</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-600 mr-2">•</span>
                <span>Payback period calculators</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Who We Serve Section - Expanded */}
        <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Who We Serve</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Home className="w-5 h-5 text-brand-600" />
                Homeowners
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Whether you're buying your first AC system, upgrading to a more efficient model, or trying to understand your energy bills, we provide the knowledge you need to make confident decisions and communicate effectively with contractors.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• System selection guidance</li>
                <li>• Maintenance schedules</li>
                <li>• Troubleshooting help</li>
                <li>• Energy saving tips</li>
                <li>• Contractor evaluation</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-600" />
                HVAC Professionals
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                From apprentices learning the trade to experienced technicians staying current with new technologies, our technical resources, calculation tools, and industry updates serve as a valuable reference for professionals at all levels.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Technical specifications</li>
                <li>• Sizing calculations</li>
                <li>• Code requirements</li>
                <li>• New technology guides</li>
                <li>• Customer education resources</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-600" />
                Property Managers
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Managing multiple properties requires understanding HVAC systems at scale. We help property managers optimize maintenance schedules, evaluate contractor proposals, and make cost-effective decisions for their portfolios.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bulk system management</li>
                <li>• Preventive maintenance</li>
                <li>• Energy optimization</li>
                <li>• Tenant comfort solutions</li>
                <li>• Budget planning tools</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-600" />
                Students & Educators
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                HVAC students and instructors use our resources for learning and teaching. Our clear explanations, visual aids, and practical examples make complex concepts accessible for educational purposes.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Fundamental concepts</li>
                <li>• System diagrams</li>
                <li>• Calculation methods</li>
                <li>• Industry standards</li>
                <li>• Career guidance</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-600" />
                Business Owners
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Commercial property owners and business operators need reliable HVAC information to maintain comfortable, efficient environments for employees and customers while managing operational costs.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Commercial system guides</li>
                <li>• Energy management</li>
                <li>• Compliance requirements</li>
                <li>• ROI calculations</li>
                <li>• Vendor evaluation</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HandshakeIcon className="w-5 h-5 text-brand-600" />
                Real Estate Professionals
              </h4>
              <p className="text-gray-700 text-sm mb-3">
                Real estate agents and home inspectors use our resources to understand HVAC systems, evaluate their condition, and communicate effectively with clients about heating and cooling considerations.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• System evaluation guides</li>
                <li>• Age and condition assessment</li>
                <li>• Efficiency comparisons</li>
                <li>• Replacement cost estimates</li>
                <li>• Value impact analysis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Accuracy</h4>
              <p className="text-gray-600 text-sm">
                Every fact we publish is verified against industry standards and authoritative sources. We cite our references and correct errors promptly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Accessibility</h4>
              <p className="text-gray-600 text-sm">
                Complex technical information should be understandable to everyone. We write clearly, define terms, and use visuals to enhance comprehension.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Integrity</h4>
              <p className="text-gray-600 text-sm">
                We maintain complete editorial independence. Our recommendations are based on merit, not financial relationships or promotional considerations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                We continuously improve our content and tools, embracing new technologies and methodologies to serve our users better.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Community</h4>
              <p className="text-gray-600 text-sm">
                We listen to our users, incorporate feedback, and create content that addresses real needs and questions from our community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-brand-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                We strive for the highest quality in everything we do, from research and writing to tool development and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Why Trust Us Section - Expanded */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-brand-400" />
            <h2 className="text-3xl font-bold">Why Trust HVACBase.org</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-brand-300 mb-3">Unbiased Information</h4>
              <p className="text-gray-300 mb-6">
                We're not affiliated with any HVAC manufacturer, distributor, or contractor. Our content is created independently to serve your best interests, not to promote specific brands or products. We present facts and let you make the decisions.
              </p>

              <h4 className="font-bold text-brand-300 mb-3">Technical Accuracy</h4>
              <p className="text-gray-300 mb-6">
                Our content is researched thoroughly and based on industry standards from organizations like AHRI, ENERGY STAR, and the Department of Energy. We cite our sources and update our content regularly to reflect the latest regulations and technologies.
              </p>

              <h4 className="font-bold text-brand-300 mb-3">Comprehensive Coverage</h4>
              <p className="text-gray-300">
                From basic homeowner questions to advanced technical topics, we cover the full spectrum of HVAC knowledge. Our content is organized logically and interconnected, making it easy to start with basics and dive deeper as needed.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-300 mb-3">Practical Focus</h4>
              <p className="text-gray-300 mb-6">
                We don't just explain concepts – we show you how to apply them. Every article includes practical tips, real-world examples, and actionable advice you can use immediately to improve comfort, save money, or solve problems.
              </p>

              <h4 className="font-bold text-brand-300 mb-3">Transparent Methodology</h4>
              <p className="text-gray-300 mb-6">
                We explain our research methods, calculation formulas, and assumptions. When we make recommendations, we show you the data and reasoning behind them. You can verify our work and understand exactly how we reach our conclusions.
              </p>

              <h4 className="font-bold text-brand-300 mb-3">Continuous Improvement</h4>
              <p className="text-gray-300">
                We actively seek feedback and continuously refine our content. When new information becomes available or standards change, we update our articles. We're committed to maintaining the most accurate and current HVAC resource available.
              </p>
            </div>
          </div>
        </div>

        {/* Content Categories - Expanded */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Content Library</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">System Types & Selection</h4>
              <p className="text-gray-600 text-sm mb-2">
                Detailed guides on central AC, heat pumps, furnaces, mini-splits, and more. Learn which system fits your needs and budget.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Central air conditioning systems</li>
                <li>• Heat pump technologies</li>
                <li>• Furnace types and features</li>
                <li>• Mini-split systems</li>
                <li>• Hybrid heating solutions</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Energy Efficiency</h4>
              <p className="text-gray-600 text-sm mb-2">
                Understanding SEER2, HSPF2, AFUE ratings and how they impact your energy bills and environmental footprint.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Efficiency rating systems</li>
                <li>• Energy saving strategies</li>
                <li>• Smart thermostat guides</li>
                <li>• Insulation and sealing</li>
                <li>• Renewable energy integration</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Sizing & Calculation</h4>
              <p className="text-gray-600 text-sm mb-2">
                Learn how to properly size HVAC equipment and use our calculators to determine your exact needs.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Manual J calculations</li>
                <li>• BTU requirements</li>
                <li>• Tonnage sizing</li>
                <li>• Ductwork design</li>
                <li>• Load calculations</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Maintenance & Repair</h4>
              <p className="text-gray-600 text-sm mb-2">
                DIY maintenance tips, troubleshooting guides, and advice on when to call a professional.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Seasonal maintenance checklists</li>
                <li>• Common problem diagnosis</li>
                <li>• Filter selection and replacement</li>
                <li>• Component cleaning guides</li>
                <li>• Professional service timing</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Indoor Air Quality</h4>
              <p className="text-gray-600 text-sm mb-2">
                Information on filters, purifiers, humidifiers, and ventilation systems for healthier indoor air.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Air filtration systems</li>
                <li>• Humidity control</li>
                <li>• Ventilation strategies</li>
                <li>• Allergen reduction</li>
                <li>• VOC management</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Smart Home Integration</h4>
              <p className="text-gray-600 text-sm mb-2">
                Guides on smart thermostats, zoning systems, and home automation for optimal comfort and efficiency.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Smart thermostat selection</li>
                <li>• Zoning system design</li>
                <li>• Home automation integration</li>
                <li>• Remote monitoring</li>
                <li>• Energy usage analytics</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Cost & Financial Planning</h4>
              <p className="text-gray-600 text-sm mb-2">
                Installation costs, operating expenses, financing options, and ROI calculations for HVAC investments.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Installation cost guides</li>
                <li>• Operating cost calculators</li>
                <li>• Financing options</li>
                <li>• Tax credits and rebates</li>
                <li>• ROI analysis tools</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Troubleshooting Guides</h4>
              <p className="text-gray-600 text-sm mb-2">
                Step-by-step diagnosis and solutions for common HVAC problems and system failures.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• No cooling/heating diagnosis</li>
                <li>• Strange noise identification</li>
                <li>• Airflow problems</li>
                <li>• Thermostat issues</li>
                <li>• Emergency procedures</li>
              </ul>
            </div>
            <div className="border-l-4 border-brand-600 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Professional Resources</h4>
              <p className="text-gray-600 text-sm mb-2">
                Contractor selection, quote evaluation, and working effectively with HVAC professionals.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Contractor vetting guides</li>
                <li>• Quote comparison tools</li>
                <li>• Service agreement evaluation</li>
                <li>• Warranty understanding</li>
                <li>• Communication tips</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Approach Section - Expanded */}
        <div className="bg-gradient-to-r from-blue-900 to-brand-900 text-white rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-brand-400" />
            <h2 className="text-3xl font-bold">Our Approach to Content Creation</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-brand-300 mb-2">Research-First Methodology</h4>
              <p className="text-gray-300">
                Every article begins with thorough research. We consult manufacturer specifications, industry standards, scientific studies, and expert opinions. We verify facts across multiple sources and only publish information we can confidently stand behind.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-300 mb-2">Layered Information Architecture</h4>
              <p className="text-gray-300">
                We structure content in layers – quick answers for those in a hurry, detailed explanations for those who want to understand, and deep technical information for professionals. This approach serves all users regardless of their knowledge level or time constraints.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-300 mb-2">Visual Learning Support</h4>
              <p className="text-gray-300">
                Complex concepts are illustrated with diagrams, charts, and infographics. We believe visual aids enhance understanding and retention, making technical information more accessible to visual learners.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-300 mb-2">Real-World Application</h4>
              <p className="text-gray-300">
                Theory without practice is incomplete. We include real-world examples, case studies, and practical scenarios that show how concepts apply to actual situations homeowners and professionals face.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-brand-300 mb-2">Continuous Quality Improvement</h4>
              <p className="text-gray-300">
                We monitor user feedback, industry developments, and content performance to continuously improve our resources. Regular audits ensure accuracy, relevance, and completeness across all our content.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BarChart className="w-8 h-8 text-brand-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">339+</p>
              <p className="text-gray-600">Comprehensive Articles</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">15+</p>
              <p className="text-gray-600">Interactive Calculators</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">1000s</p>
              <p className="text-gray-600">Daily Visitors</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-brand-600 mb-2">50+</p>
              <p className="text-gray-600">Topics Covered</p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-700">
            <p>
              Every day, thousands of people turn to HVACBase.org for reliable information that helps them make better decisions about their heating and cooling systems. From homeowners saving money on energy bills to technicians solving complex problems, our impact is measured in real improvements to comfort, efficiency, and understanding.
            </p>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Looking Forward</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p>
              The HVAC industry is evolving rapidly with advances in energy efficiency, smart technology, and environmental consciousness. HVACBase.org is committed to staying at the forefront of these changes, continuously expanding our content and tools to address emerging technologies and trends.
            </p>
            <p>
              We're developing new interactive features, expanding our calculator suite, and creating more video content to complement our written guides. We're also exploring partnerships with educational institutions to support HVAC education and career development.
            </p>
            <p>
              Our vision is to become the most comprehensive and trusted HVAC resource globally, helping millions of people make informed decisions that improve comfort, reduce energy consumption, and contribute to a more sustainable future. We're building a platform that serves not just today's needs but anticipates tomorrow's challenges.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a homeowner, professional, student, or simply curious about HVAC systems, HVACBase.org is here to support your journey. Explore our resources, use our tools, and join thousands of others who trust us for reliable HVAC information.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors">
              Explore Our Resources
            </a>
            <a href="/contact" className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add missing imports
import { Home, Wrench, Building, Briefcase } from 'lucide-react';