import Link from 'next/link';
import { 
  Calculator, TrendingUp, Award, Shield, BookOpen, Star,
  Thermometer, Zap, Home, Wrench, DollarSign, ArrowRight,
  CheckCircle, Clock, Users, BarChart3, Search, Settings,
  AlertCircle, Info, Lightbulb, Target, Gauge, Snowflake,
  Sun, Wind, Droplets, Filter, CreditCard, FileText,
  Building, Factory, ChevronRight, Activity, Battery, Flame
} from 'lucide-react';
import { getAllArticles } from '@/lib/content';
import { Metadata } from 'next';
import ScaleDiagram from '@/components/diagrams/ScaleDiagram';
import RefrigerationCycle from '@/components/diagrams/RefrigerationCycle';
import EfficiencyCurve from '@/components/diagrams/EfficiencyCurve';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.hvacbase.org/',
  },
};

// Get article counts and popular articles
async function getHomePageData() {
  try {
    const articles = await getAllArticles();
    const counts: { [key: string]: number } = {};
    
    // Filter out the categories we don't want to show
    const excludedCategories = [
      'window-air-conditioners',
      'air-purifier-brands', 
      'air-purifiers-air-quality',
      'batteries-solar',
      'dehumidifiers-humidity',
      'ductwork-ventilation',
      'fireplaces-stoves',
      'electrical-wiring',
      'energy-costs',
      'seer-comparisons',
      'energy-efficiency-ratings'
    ];
    
    articles.forEach(article => {
      if (article?.meta?.slug) {
        const category = article.meta.cluster || 'uncategorized';
        if (!excludedCategories.includes(category)) {
          counts[category] = (counts[category] || 0) + 1;
        }
      }
    });
    
    return {
      totalArticles: articles.length,
      categoryCounts: counts,
      articles: articles
    };
  } catch (error) {
    console.error('Error getting homepage data:', error);
    return { totalArticles: 0, categoryCounts: {}, articles: [] };
  }
}

export default async function HomePage() {
  const { totalArticles, categoryCounts } = await getHomePageData();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero — problem-first entry points */}
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Thermometer className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              HVAC<span className="text-brand-300">Base</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-semibold mb-4 leading-tight max-w-4xl">
            What size AC do I need? Why won&apos;t my furnace start? Is a heat pump worth it?
          </h1>

          <p className="text-lg text-brand-100 mb-8 max-w-3xl">
            Free HVAC calculators, sizing guides, and troubleshooting help — with the reasoning shown, not just a recommendation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl">
            <Link href="/air-conditioner-btu-calculator" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors">
              <Calculator className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="text-xs text-brand-200">What size AC?</div>
                <div className="font-semibold">BTU Calculator</div>
              </div>
            </Link>
            <Link href="/ac-not-cooling" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="text-xs text-brand-200">AC not cooling?</div>
                <div className="font-semibold">12 Causes &amp; Fixes</div>
              </div>
            </Link>
            <Link href="/heat-pump-guide" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors">
              <Activity className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="text-xs text-brand-200">Heat pump worth it?</div>
                <div className="font-semibold">Heat Pump Guide</div>
              </div>
            </Link>
            <Link href="/central-ac-cost-to-install" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 flex items-center gap-3 transition-colors">
              <DollarSign className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="text-xs text-brand-200">Install costs?</div>
                <div className="font-semibold">Central AC Install</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-gray-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>EPA & DOE Data Sources</span>
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4 text-blue-600" />
              <span>AHRI Certified Equipment</span>
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>ACCA Manual J Based</span>
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-brand-600" />
              <span>No Affiliate Links</span>
            </span>
          </div>
        </div>
      </section>

      {/* Primary Calculator Section */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              HVAC Calculators & Sizing Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Size your HVAC equipment correctly with our ACCA Manual J based calculators. Avoid oversizing,
              reduce energy costs, and ensure optimal comfort with ACCA Manual J based sizing tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/air-conditioner-btu-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-6 h-6 text-blue-700" />
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AC BTU Calculator</h3>
              <p className="text-gray-600 mb-4">Calculate exact cooling capacity for any room size. Factors in climate zone, insulation, windows, and heat sources.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">ACCA Manual J Based</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/ac-tonnage-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Gauge className="w-6 h-6 text-green-700" />
                </div>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">Professional</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AC Tonnage Calculator</h3>
              <p className="text-gray-600 mb-4">Convert BTUs to tons and size central AC systems. Includes ductwork considerations and SEER ratings.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">1-5 Ton Systems</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/seer2-savings-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-200 transition-colors">
                  <DollarSign className="w-6 h-6 text-emerald-700" />
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">Save Money</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">SEER2 Savings Calculator</h3>
              <p className="text-gray-600 mb-4">Compare energy costs between different SEER2 ratings. Calculate ROI and payback period for upgrades.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">2026 Standards</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/heat-pump-size-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Activity className="w-6 h-6 text-purple-700" />
                </div>
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium">Dual Mode</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Heat Pump Size Calculator</h3>
              <p className="text-gray-600 mb-4">Size heat pumps for both heating and cooling. Includes cold climate considerations and backup heat.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Heating & Cooling</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/furnace-sizing-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Flame className="w-6 h-6 text-orange-700" />
                </div>
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full font-medium">Gas & Electric</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Furnace Sizing Calculator</h3>
              <p className="text-gray-600 mb-4">Calculate furnace BTU requirements. Factors in home size, insulation, climate zone, and heat loss.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">40K-120K BTU</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/mini-split-sizing-calculator" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-cyan-100 p-3 rounded-lg group-hover:bg-cyan-200 transition-colors">
                  <Zap className="w-6 h-6 text-cyan-700" />
                </div>
                <span className="text-xs bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-medium">Multi-Zone</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mini Split Sizing</h3>
              <p className="text-gray-600 mb-4">Size ductless mini splits for single or multi-zone applications. Includes line set calculations.</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">1-5 Zones</span>
                <ArrowRight className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              All calculators updated for 2026 efficiency standards and include regional climate adjustments
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link href="/water-heater-sizing-calculator" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Water Heater Calculator →
              </Link>
              <Link href="/what-size-generator-do-i-need" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Generator Sizing →
              </Link>
              <Link href="/kwh-cost-calculator" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Energy Cost Calculator →
              </Link>
            </div>
          </div>

          {/* SVG 1 — Sizing scale */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="text-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900">How much AC do you actually need?</h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto mt-2">
                Room size drives the BTU/hr your AC needs, at roughly 20 BTU per square foot as a starting point. Oversizing feels safe but causes short-cycling — the unit cools the air fast, shuts off, and never runs long enough to strip humidity, leaving a cold clammy room.
              </p>
            </div>
            <ScaleDiagram
              title="Room size → AC capacity (starting-point BTU/hr)"
              desc="Four room-size bands mapped to typical AC capacity in BTU per hour: 100-300 sq ft needs about 5,000 to 8,000 BTU/hr, 300-550 sq ft needs 9,000 to 12,000 BTU/hr, 550-1,000 sq ft needs 14,000 to 18,000 BTU/hr, and 1,000-2,000 sq ft needs 24,000 to 36,000 BTU/hr (equivalent to 2 to 3 tons of central AC). These are starting-point figures based on the roughly 20 BTU per square foot rule; final sizing should use a Manual J load calculation that accounts for insulation, windows, and climate."
              tiers={[
                { range: '100–300 sq ft', label: '5,000–8,000 BTU/hr', description: 'Bedroom, small office, den' },
                { range: '300–550 sq ft', label: '9,000–12,000 BTU/hr', description: 'Living room, primary bedroom' },
                { range: '550–1,000 sq ft', label: '14,000–18,000 BTU/hr', description: 'Open floor plan, studio, small home' },
                { range: '1,000–2,000 sq ft', label: '24,000–36,000 BTU/hr', description: '2–3 tons central AC, multi-room whole floor' },
              ]}
              axisLabel="~20 BTU per sq ft baseline · Manual J refines by climate, insulation, windows, and heat sources"
              caption="Rule-of-thumb sizing bands. Use the BTU Calculator above for a Manual J-based figure that reflects your climate zone and home."
            />
            <div className="text-center mt-4">
              <Link href="/air-conditioner-btu-calculator" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Run the BTU Calculator with your actual numbers →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Guide Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Complete HVAC System Guides & Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you're replacing equipment, troubleshooting problems, or comparing options, 
              our comprehensive guides provide the technical details and real-world insights you need.
            </p>
          </div>

          {/* Air Conditioning Hub */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Snowflake className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Air Conditioning Systems</h3>
              </div>
              <Link href="/air-conditioning" className="text-brand-600 hover:text-brand-700 font-medium">
                View All AC Guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Central AC</h4>
                <Link href="/ac-not-cooling" className="block text-gray-600 hover:text-brand-600 py-1">
                  AC Not Cooling: 12 Fixes
                </Link>
                <Link href="/ac-troubleshooting-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Complete Troubleshooting Guide
                </Link>
                <Link href="/central-ac-cost-to-install" className="block text-gray-600 hover:text-brand-600 py-1">
                  Installation Costs 2026
                </Link>
                <Link href="/hvac-maintenance-checklist" className="block text-gray-600 hover:text-brand-600 py-1">
                  Maintenance Checklist
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Mini Splits</h4>
                <Link href="/what-is-a-mini-split" className="block text-gray-600 hover:text-brand-600 py-1">
                  Complete Mini Split Guide
                </Link>
                <Link href="/mini-split-sizing-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Mini Split Sizing Calculator
                </Link>
                <Link href="/mini-split-installation-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Installation Pricing
                </Link>
                <Link href="/mini-split-vs-central-air" className="block text-gray-600 hover:text-brand-600 py-1">
                  Mini Split vs Central
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Window Units</h4>
                <Link href="/air-conditioner-btu-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Window AC BTU Sizing
                </Link>
                <Link href="/quietest-window-acs" className="block text-gray-600 hover:text-brand-600 py-1">
                  Quietest Window ACs
                </Link>
                <Link href="/low-profile-window-acs" className="block text-gray-600 hover:text-brand-600 py-1">
                  Low Profile Options
                </Link>
                <Link href="/smallest-window-acs" className="block text-gray-600 hover:text-brand-600 py-1">
                  Compact 5000 BTU Units
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Portable AC</h4>
                <Link href="/air-conditioner-btu-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Portable AC Sizing
                </Link>
                <Link href="/quietest-portable-air-conditioners" className="block text-gray-600 hover:text-brand-600 py-1">
                  Quiet Portable Models
                </Link>
                <Link href="/portable-ac-electricity-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Energy Usage Guide
                </Link>
                <Link href="/portable-vs-window-ac" className="block text-gray-600 hover:text-brand-600 py-1">
                  Portable vs Window AC
                </Link>
              </div>
            </div>
          </div>

          {/* Heating Systems Hub */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Heating Systems</h3>
              </div>
              <Link href="/heating" className="text-brand-600 hover:text-brand-700 font-medium">
                View All Heating Guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Furnaces</h4>
                <Link href="/furnace-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Complete Furnace Guide
                </Link>
                <Link href="/furnace-blowing-cold-air" className="block text-gray-600 hover:text-brand-600 py-1">
                  Blowing Cold Air Fix
                </Link>
                <Link href="/furnace-installation-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Replacement Costs
                </Link>
                <Link href="/furnace-maintenance" className="block text-gray-600 hover:text-brand-600 py-1">
                  Annual Maintenance Guide
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Heat Pumps</h4>
                <Link href="/heat-pump-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pump Explained
                </Link>
                <Link href="/heat-pump-in-cold-weather" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pumps in Cold Weather
                </Link>
                <Link href="/furnace-vs-heat-pump" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pump vs Furnace
                </Link>
                <Link href="/heat-pump-tax-credits-2026" className="block text-gray-600 hover:text-brand-600 py-1">
                  2026 Tax Credits
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Alternative Heat</h4>
                <Link href="/space-heater-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Space Heaters
                </Link>
                <Link href="/heating-cost-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Baseboard Heating Cost
                </Link>
                <Link href="/radiant-floor-heating-pros-cons" className="block text-gray-600 hover:text-brand-600 py-1">
                  Radiant Floor Heating Guide
                </Link>
                <Link href="/gas-vs-electric-heating-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Electric vs Gas Heating
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Comparisons</h4>
                <Link href="/gas-vs-electric-heating-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Gas vs Electric Cost
                </Link>
                <Link href="/boiler-vs-furnace" className="block text-gray-600 hover:text-brand-600 py-1">
                  Boiler vs Furnace Guide
                </Link>
                <Link href="/mini-split-air-conditioners" className="block text-gray-600 hover:text-brand-600 py-1">
                  Mini Split Systems Guide
                </Link>
                <Link href="/heating-cost-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heating Cost Calculator
                </Link>
              </div>
            </div>
          </div>

          {/* SVG 2 — How a heat pump moves heat */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="text-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900">How a heat pump moves heat</h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto mt-2">
                A heat pump doesn&apos;t generate heat — it moves it. The same closed refrigerant loop pulls heat from outdoor air (even cold air still has usable heat) and releases it indoors. Run the loop backwards in summer, and it moves indoor heat out. That&apos;s why a heat pump can deliver 2–4 kWh of heat for every 1 kWh of electricity it consumes.
              </p>
            </div>
            <RefrigerationCycle caption="The same cycle drives central AC, mini splits, and heat pumps — reversing the flow direction switches between cooling and heating." />
            <div className="text-center mt-2">
              <Link href="/heat-pump-guide" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Read the full heat pump guide →
              </Link>
            </div>
          </div>

          {/* Energy Efficiency Hub */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Energy Efficiency & Ratings</h3>
              </div>
              <Link href="/energy-efficiency" className="text-brand-600 hover:text-brand-700 font-medium">
                View All Efficiency Guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Cooling Ratings</h4>
                <Link href="/seer2-rating-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  SEER2 Rating Guide
                </Link>
                <Link href="/eer2-rating-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  EER2 Explained
                </Link>
                <Link href="/ceer-rating-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  CEER for Window ACs
                </Link>
                <Link href="/seer2-comparison-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Compare SEER2 Ratings
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Heating Ratings</h4>
                <Link href="/afue-rating-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  AFUE Rating Guide
                </Link>
                <Link href="/hspf2-rating-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  HSPF2 Explained
                </Link>
                <Link href="/coefficient-of-performance" className="block text-gray-600 hover:text-brand-600 py-1">
                  COP Coefficient
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Tax Credits</h4>
                <Link href="/seer-rating-tax-credits" className="block text-gray-600 hover:text-brand-600 py-1">
                  Federal Tax Credits
                </Link>
                <Link href="/heat-pump-tax-credits-2026" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pump Credits
                </Link>
                <Link href="/hvac-rebates-by-state" className="block text-gray-600 hover:text-brand-600 py-1">
                  State Rebates Map
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Saving Tips</h4>
                <Link href="/hvac-energy-saving-tips" className="block text-gray-600 hover:text-brand-600 py-1">
                  25 Energy Saving Tips
                </Link>
                <Link href="/thermostat-temperature-winter" className="block text-gray-600 hover:text-brand-600 py-1">
                  Winter Thermostat Setpoints
                </Link>
                <Link href="/insulation-r-value-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Insulation R-Value Guide
                </Link>
                <Link href="/duct-leakage-testing" className="block text-gray-600 hover:text-brand-600 py-1">
                  Duct Sealing DIY
                </Link>
              </div>
            </div>
          </div>

          {/* SVG 3 — SEER2 vs annual cooling cost with diminishing returns */}
          <div className="mb-12 max-w-5xl mx-auto">
            <div className="text-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900">What efficiency actually saves</h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto mt-2">
                Higher SEER2 lowers annual cooling cost — but with diminishing returns. Going from the 13.4 SEER2 minimum to 16 saves more per point than going from 18 to 22. The chart uses a 3-ton AC with about 1,500 cooling hours a year at $0.17/kWh; run the SEER2 calculator to plug in your rates.
              </p>
            </div>
            <EfficiencyCurve
              title="SEER2 rating vs annual cooling cost (3-ton AC, ~1,500 cooling hrs, $0.17/kWh)"
              desc="Line plot showing that annual cooling cost falls sharply as SEER2 increases from 13.4 to 16, then flattens as SEER2 rises further to 22. At SEER2 13.4 (2026 US minimum), the modeled annual cost is about $685; at 15 it's $612; at 16 it's $574; at 18 it's $510; at 20 it's $459; at 22 it's $417. The largest per-point savings come at the low end — the 13.4 to 16 jump saves about $111/year, while the 18 to 22 jump saves about $93/year despite covering twice as many SEER2 points. Model assumptions: 3-ton (36,000 BTU/hr) central AC, 1,500 equivalent full-load cooling hours per year (mid-Atlantic climate), electricity at $0.17 per kWh."
              xLabel="SEER2 Rating"
              yLabel="Annual Cooling Cost"
              yUnit="$"
              data={[
                { x: 13.4, y: 685 },
                { x: 15, y: 612 },
                { x: 16, y: 574 },
                { x: 18, y: 510 },
                { x: 20, y: 459 },
                { x: 22, y: 417 },
              ]}
              caption="Diminishing returns are real: the 13.4→16 jump saves ~$111/yr, but 18→22 only saves ~$93/yr despite covering twice as many SEER2 points."
            />
            <div className="text-center mt-2">
              <Link href="/seer2-savings-calculator" className="text-brand-600 hover:text-brand-700 font-medium text-sm">
                Model your own rates and hours in the SEER2 savings calculator →
              </Link>
            </div>
          </div>

          {/* Indoor Air Quality Hub */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Wind className="w-6 h-6 text-purple-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">Indoor Air Quality</h3>
              </div>
              <Link href="/air-quality" className="text-brand-600 hover:text-brand-700 font-medium">
                View All Air Quality Guides →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Air Purification</h4>
                <Link href="/air-purifier-sizing-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Air Purifier Sizing
                </Link>
                <Link href="/hepa-filter-explained" className="block text-gray-600 hover:text-brand-600 py-1">
                  HEPA Filter Guide
                </Link>
                <Link href="/uv-light-hvac-systems" className="block text-gray-600 hover:text-brand-600 py-1">
                  UV Light HVAC Systems
                </Link>
                <Link href="/air-purifier-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  How Air Purifiers Work
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Humidity Control</h4>
                <Link href="/dehumidifier-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Dehumidifier Guide
                </Link>
                <Link href="/what-size-dehumidifier-do-i-need" className="block text-gray-600 hover:text-brand-600 py-1">
                  Dehumidifier Sizing
                </Link>
                <Link href="/ideal-indoor-humidity-level" className="block text-gray-600 hover:text-brand-600 py-1">
                  Ideal Indoor Humidity
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Air Filters</h4>
                <Link href="/merv-rating-chart" className="block text-gray-600 hover:text-brand-600 py-1">
                  MERV Rating Chart
                </Link>
                <Link href="/furnace-filter-direction" className="block text-gray-600 hover:text-brand-600 py-1">
                  Filter Direction Guide
                </Link>
                <Link href="/how-often-change-hvac-filter" className="block text-gray-600 hover:text-brand-600 py-1">
                  Change Frequency
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Testing & VOCs</h4>
                <Link href="/indoor-air-quality-testing" className="block text-gray-600 hover:text-brand-600 py-1">
                  Indoor Air Quality Testing (IAQ, VOCs, Radon)
                </Link>
                <Link href="/mold-prevention-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Mold Prevention
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick HVAC Answers & Common Questions
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-600" />
                Sizing Questions
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/ac-size-for-1500-sq-ft" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC for 1500 sq ft?</span>
                  <span className="text-green-600 font-medium">2.5-3 tons</span>
                </Link>
                <Link href="/ac-size-for-2000-sq-ft" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC for 2000 sq ft?</span>
                  <span className="text-green-600 font-medium">3-3.5 tons</span>
                </Link>
                <Link href="/ac-size-for-2500-sq-ft" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC for 2500 sq ft?</span>
                  <span className="text-green-600 font-medium">4-5 tons</span>
                </Link>
                <Link href="/heat-pump-size-calculator" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Heat pump sizing?</span>
                  <span className="text-green-600 font-medium">600 sq ft/ton</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-600" />
                Cost Questions
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/central-ac-cost-to-install" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC install cost?</span>
                  <span className="text-green-600 font-medium">$3,500-$7,500</span>
                </Link>
                <Link href="/furnace-installation-cost" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Furnace replacement?</span>
                  <span className="text-green-600 font-medium">$2,500-$6,500</span>
                </Link>
                <Link href="/mini-split-installation-cost" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Mini split install?</span>
                  <span className="text-green-600 font-medium">$2,000-$5,000</span>
                </Link>
                <Link href="/heat-pump-cost-to-install" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Heat pump cost?</span>
                  <span className="text-green-600 font-medium">$4,000-$8,000</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-600" />
                Efficiency Questions
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/seer2-rating-explained" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Good SEER2 rating?</span>
                  <span className="text-green-600 font-medium">16-18 SEER2</span>
                </Link>
                <Link href="/afue-rating-explained" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Good AFUE rating?</span>
                  <span className="text-green-600 font-medium">90-95% AFUE</span>
                </Link>
                <Link href="/hspf2-rating-explained" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Good HSPF2?</span>
                  <span className="text-green-600 font-medium">8.5+ HSPF2</span>
                </Link>
                <Link href="/merv-rating-chart" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Best MERV rating?</span>
                  <span className="text-green-600 font-medium">MERV 11-13</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-600" />
                Troubleshooting
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/ac-not-cooling" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC not cooling?</span>
                  <span className="text-blue-600 font-medium">12 fixes →</span>
                </Link>
                <Link href="/furnace-blowing-cold-air" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Furnace cold air?</span>
                  <span className="text-blue-600 font-medium">8 causes →</span>
                </Link>
                <Link href="/heat-pump-guide" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Heat pump issues?</span>
                  <span className="text-blue-600 font-medium">Diagnose →</span>
                </Link>
                <Link href="/ac-troubleshooting-guide" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC freezing up?</span>
                  <span className="text-blue-600 font-medium">5 causes →</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Battery className="w-5 h-5 text-brand-600" />
                Energy Usage
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/mini-split-electricity-usage" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Mini split watts?</span>
                  <span className="text-green-600 font-medium">500-1500W</span>
                </Link>
                <Link href="/furnace-guide" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Furnace watts?</span>
                  <span className="text-green-600 font-medium">300-800W</span>
                </Link>
                <Link href="/heat-pump-electricity-usage" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Heat pump kWh?</span>
                  <span className="text-green-600 font-medium">2-5 kW/hr</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-600" />
                Maintenance
              </h3>
              <div className="space-y-2 text-sm">
                <Link href="/hvac-maintenance-checklist" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">HVAC checklist</span>
                  <span className="text-blue-600 font-medium">21 tasks →</span>
                </Link>
                <Link href="/how-often-change-hvac-filter" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Filter frequency?</span>
                  <span className="text-green-600 font-medium">1-3 months</span>
                </Link>
                <Link href="/hvac-maintenance-checklist" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC tune-up?</span>
                  <span className="text-blue-600 font-medium">Annual →</span>
                </Link>
                <Link href="/furnace-maintenance" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Furnace service?</span>
                  <span className="text-blue-600 font-medium">Maintenance guide →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Home & Technology */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Smart HVAC Technology & Controls
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Optimize comfort and efficiency with smart thermostats and zoning systems for precise climate control.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Settings className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Thermostats</h3>
              <p className="text-gray-600 mb-4">
                What smart thermostats actually save, and when a $30 programmable does the same job — with the payback math shown.
              </p>
              <div className="space-y-2">
                <Link href="/programmable-vs-smart-thermostat" className="block text-brand-600 hover:text-brand-700 font-medium">
                  Programmable vs Smart Thermostat →
                </Link>
                <Link href="/smart-thermostat-savings" className="block text-gray-600 hover:text-brand-600">
                  Do Smart Thermostats Actually Save?
                </Link>
                <Link href="/thermostat-temperature-winter" className="block text-gray-600 hover:text-brand-600">
                  Winter Thermostat Setpoints
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Home className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zoning &amp; Multi-Zone Systems</h3>
              <p className="text-gray-600 mb-4">
                Whether zoning is worth the added cost for your home, how many zones make sense, and how to size a multi-zone mini split.
              </p>
              <div className="space-y-2">
                <Link href="/how-many-mini-splits-do-i-need" className="block text-brand-600 hover:text-brand-700 font-medium">
                  Multi-Zone Planning Guide →
                </Link>
                <Link href="/mini-split-sizing-calculator" className="block text-gray-600 hover:text-brand-600">
                  Multi-Zone Sizing Calculator
                </Link>
                <Link href="/mini-split-air-conditioners" className="block text-gray-600 hover:text-brand-600">
                  Mini Split Systems Explained
                </Link>
                <Link href="/mini-split-installation-cost" className="block text-gray-600 hover:text-brand-600">
                  Installation Costs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            HVAC Resources & Tools
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-brand-600" />
                DIY Guides
              </h3>
              <div className="space-y-2">
                <Link href="/hvac-maintenance-checklist" className="block text-gray-600 hover:text-brand-600 text-sm">
                  DIY Maintenance Tasks
                </Link>
                <Link href="/how-to-clean-ac-coils" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Clean AC Coils Yourself
                </Link>
                <Link href="/programmable-vs-smart-thermostat" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Thermostat Basics
                </Link>
                <Link href="/duct-leakage-testing" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Seal Ducts DIY
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brand-600" />
                Troubleshooting
              </h3>
              <div className="space-y-2">
                <Link href="/ac-troubleshooting-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Master Troubleshooting
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-600" />
                Cost Guides
              </h3>
              <div className="space-y-2">
                <Link href="/hvac-maintenance-cost" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Common Repair Costs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust HVACBase Section */}
      <section className="py-12 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How We Source Our Content
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide HVAC information based on manufacturer data,
              industry standards, and AHRI-certified efficiency ratings — no affiliate links or paid product placements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="text-center">
              <div className="bg-brand-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-brand-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data-Driven Content</h3>
              <p className="text-sm text-gray-600">
                Guides reference AHRI certifications, DOE data, and ACCA Manual J methods where applicable
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Award className="w-8 h-8 text-blue-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industry Standards</h3>
              <p className="text-sm text-gray-600">
                Following ASHRAE, ACCA, EPA, and ENERGY STAR guidelines in all recommendations
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reviewed and Updated Regularly</h3>
              <p className="text-sm text-gray-600">
                Content is refreshed as standards, tax law, and equipment specifications change
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Editorial Standards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Research Process</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Verify all specifications against AHRI Directory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Cross-reference EPA ENERGY STAR databases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Use ACCA Manual J for all sizing calculations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Include regional climate zone variations</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Independence Commitment</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No affiliate links or referral fees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>No manufacturer sponsorships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Equal coverage of all major brands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transparent about limitations and assumptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start With Our Most Popular Calculator
          </h2>
          <p className="text-xl text-brand-100 mb-8">
            Size your AC correctly and avoid the #1 HVAC mistake: oversizing. 
            Our calculator uses ACCA Manual J methodology for accurate results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/air-conditioner-btu-calculator" 
              className="bg-white text-brand-700 px-8 py-4 rounded-lg font-semibold hover:bg-brand-50 transition-colors inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate BTU Requirements
            </Link>
            <Link 
              href="/articles" 
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Browse All {totalArticles} Guides
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}