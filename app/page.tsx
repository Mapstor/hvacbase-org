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
      {/* Enhanced Hero Section with Branding */}
      <section className="bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <Thermometer className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    HVAC<span className="text-brand-300">Base</span>
                  </h1>
                  <p className="text-sm text-brand-200">Your Trusted HVAC Resource Since 2024</p>
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 leading-tight">
                Professional HVAC Calculators, Sizing Guides & Unbiased Equipment Reviews
              </h2>
              
              <p className="text-lg text-brand-100 mb-6">
                Make informed HVAC decisions with our {totalArticles}+ expert guides, ACCA Manual J calculators, 
                and real-world efficiency data. No affiliate links, no bias — just accurate information.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <Link href="/air-conditioner-btu-calculator" className="bg-white text-brand-700 px-6 py-3 rounded-lg font-semibold hover:bg-brand-50 transition-colors inline-flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  BTU Calculator
                </Link>
                <Link href="/seer2-savings-calculator" className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Savings Calculator
                </Link>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-white">{totalArticles}+</div>
                  <div className="text-sm text-brand-200">Expert Guides</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-brand-200">Calculators</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">2026</div>
                  <div className="text-sm text-brand-200">Updated</div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-semibold text-xl mb-4">Quick Access Tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/ac-tonnage-calculator" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                    <Gauge className="w-6 h-6 mb-2" />
                    <div className="text-sm font-medium">Tonnage Calculator</div>
                  </Link>
                  <Link href="/heat-pump-size-calculator" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                    <Activity className="w-6 h-6 mb-2" />
                    <div className="text-sm font-medium">Heat Pump Sizing</div>
                  </Link>
                  <Link href="/furnace-sizing-calculator" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                    <Flame className="w-6 h-6 mb-2" />
                    <div className="text-sm font-medium">Furnace Sizing</div>
                  </Link>
                  <Link href="/mini-split-sizing-calculator" className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                    <Zap className="w-6 h-6 mb-2" />
                    <div className="text-sm font-medium">Mini Split Size</div>
                  </Link>
                </div>
              </div>
            </div>
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
              Professional HVAC Calculators & Sizing Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Size your HVAC equipment correctly with our ACCA Manual J based calculators. Avoid oversizing, 
              reduce energy costs, and ensure optimal comfort with professional-grade sizing tools.
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
                  Complete Troubleshooting
                </Link>
                <Link href="/ac-installation-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Installation Costs 2026
                </Link>
                <Link href="/ac-maintenance-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Maintenance Checklist
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Mini Splits</h4>
                <Link href="/what-is-a-mini-split" className="block text-gray-600 hover:text-brand-600 py-1">
                  Complete Mini Split Guide
                </Link>
                <Link href="/best-mini-split-ac-units" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Mini Splits 2026
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
                <Link href="/best-window-air-conditioners" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Window ACs 2026
                </Link>
                <Link href="/quietest-window-acs" className="block text-gray-600 hover:text-brand-600 py-1">
                  Quietest Models (42 dB)
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
                <Link href="/best-portable-air-conditioners" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Portable ACs
                </Link>
                <Link href="/quietest-portable-acs" className="block text-gray-600 hover:text-brand-600 py-1">
                  Quiet Models (48 dB)
                </Link>
                <Link href="/portable-ac-electricity-usage" className="block text-gray-600 hover:text-brand-600 py-1">
                  Energy Usage Guide
                </Link>
                <Link href="/portable-vs-window-ac" className="block text-gray-600 hover:text-brand-600 py-1">
                  Portable vs Window
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
                <Link href="/furnace-replacement-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Replacement Costs
                </Link>
                <Link href="/furnace-maintenance" className="block text-gray-600 hover:text-brand-600 py-1">
                  Annual Maintenance
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Heat Pumps</h4>
                <Link href="/what-is-a-heat-pump" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pump Explained
                </Link>
                <Link href="/best-cold-climate-heat-pumps" className="block text-gray-600 hover:text-brand-600 py-1">
                  Cold Climate Models
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
                <Link href="/best-space-heaters" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Space Heaters
                </Link>
                <Link href="/baseboard-heater-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Baseboard Heating
                </Link>
                <Link href="/radiant-floor-heating-pros-cons" className="block text-gray-600 hover:text-brand-600 py-1">
                  Radiant Floor Heat
                </Link>
                <Link href="/infrared-heaters-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Infrared Heaters
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Comparisons</h4>
                <Link href="/gas-vs-electric-heating-cost" className="block text-gray-600 hover:text-brand-600 py-1">
                  Gas vs Electric Cost
                </Link>
                <Link href="/boiler-vs-furnace" className="block text-gray-600 hover:text-brand-600 py-1">
                  Boiler vs Furnace
                </Link>
                <Link href="/heat-pump-vs-mini-split" className="block text-gray-600 hover:text-brand-600 py-1">
                  Heat Pump vs Mini Split
                </Link>
                <Link href="/heating-cost-calculator" className="block text-gray-600 hover:text-brand-600 py-1">
                  Cost Calculator
                </Link>
              </div>
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
                <Link href="/14-seer-vs-16-seer" className="block text-gray-600 hover:text-brand-600 py-1">
                  14 vs 16 SEER2
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
                <Link href="/80-vs-95-afue-furnace" className="block text-gray-600 hover:text-brand-600 py-1">
                  80% vs 95% AFUE
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
                <Link href="/state-hvac-rebates" className="block text-gray-600 hover:text-brand-600 py-1">
                  State Rebates Map
                </Link>
                <Link href="/utility-rebates-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Utility Programs
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Saving Tips</h4>
                <Link href="/hvac-energy-saving-tips" className="block text-gray-600 hover:text-brand-600 py-1">
                  25 Energy Tips
                </Link>
                <Link href="/programmable-thermostat-settings" className="block text-gray-600 hover:text-brand-600 py-1">
                  Optimal Settings
                </Link>
                <Link href="/insulation-r-value-chart" className="block text-gray-600 hover:text-brand-600 py-1">
                  Insulation R-Values
                </Link>
                <Link href="/duct-sealing-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Duct Sealing DIY
                </Link>
              </div>
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
                <Link href="/best-air-purifiers" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Air Purifiers
                </Link>
                <Link href="/hepa-filter-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  HEPA Filter Guide
                </Link>
                <Link href="/hvac-uv-light" className="block text-gray-600 hover:text-brand-600 py-1">
                  UV Light Systems
                </Link>
                <Link href="/activated-carbon-filters" className="block text-gray-600 hover:text-brand-600 py-1">
                  Carbon Filters
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Humidity Control</h4>
                <Link href="/best-dehumidifiers" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best Dehumidifiers
                </Link>
                <Link href="/best-whole-house-humidifiers" className="block text-gray-600 hover:text-brand-600 py-1">
                  Whole House Units
                </Link>
                <Link href="/ideal-humidity-levels" className="block text-gray-600 hover:text-brand-600 py-1">
                  Ideal Humidity 30-50%
                </Link>
                <Link href="/humidity-control-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Control Strategies
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Air Filters</h4>
                <Link href="/merv-rating-chart" className="block text-gray-600 hover:text-brand-600 py-1">
                  MERV Rating Chart
                </Link>
                <Link href="/best-hvac-air-filters" className="block text-gray-600 hover:text-brand-600 py-1">
                  Best HVAC Filters
                </Link>
                <Link href="/furnace-filter-direction" className="block text-gray-600 hover:text-brand-600 py-1">
                  Filter Direction Guide
                </Link>
                <Link href="/how-often-change-filter" className="block text-gray-600 hover:text-brand-600 py-1">
                  Change Frequency
                </Link>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Testing & VOCs</h4>
                <Link href="/indoor-air-quality-testing" className="block text-gray-600 hover:text-brand-600 py-1">
                  IAQ Testing Guide
                </Link>
                <Link href="/vocs-in-home" className="block text-gray-600 hover:text-brand-600 py-1">
                  VOC Sources & Risks
                </Link>
                <Link href="/radon-testing-guide" className="block text-gray-600 hover:text-brand-600 py-1">
                  Radon Testing
                </Link>
                <Link href="/mold-prevention" className="block text-gray-600 hover:text-brand-600 py-1">
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
                <Link href="/heat-pump-size-guide" className="flex justify-between group">
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
                <Link href="/ac-installation-cost" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC install cost?</span>
                  <span className="text-green-600 font-medium">$3,500-$7,500</span>
                </Link>
                <Link href="/furnace-replacement-cost" className="flex justify-between group">
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
                <Link href="/heat-pump-not-heating" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Heat pump issues?</span>
                  <span className="text-blue-600 font-medium">Diagnose →</span>
                </Link>
                <Link href="/ac-freezing-up" className="flex justify-between group">
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
                <Link href="/how-much-does-ac-cost-to-run" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC running cost?</span>
                  <span className="text-green-600 font-medium">$0.06-0.88/hr</span>
                </Link>
                <Link href="/furnace-electricity-usage" className="flex justify-between group">
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
                <Link href="/how-often-change-filter" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Filter frequency?</span>
                  <span className="text-green-600 font-medium">1-3 months</span>
                </Link>
                <Link href="/ac-tune-up-checklist" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">AC tune-up?</span>
                  <span className="text-blue-600 font-medium">Annual →</span>
                </Link>
                <Link href="/furnace-maintenance" className="flex justify-between group">
                  <span className="text-gray-600 group-hover:text-brand-600">Furnace service?</span>
                  <span className="text-blue-600 font-medium">Fall prep →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Comparison Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            HVAC Brand Comparisons & Reviews
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Premium Brands</h3>
              <div className="space-y-2">
                <Link href="/carrier-vs-trane" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Carrier vs Trane
                </Link>
                <Link href="/lennox-vs-american-standard" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Lennox vs American Standard
                </Link>
                <Link href="/bryant-vs-york" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Bryant vs York
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Value Brands</h3>
              <div className="space-y-2">
                <Link href="/goodman-vs-rheem" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Goodman vs Rheem
                </Link>
                <Link href="/coleman-vs-payne" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Coleman vs Payne
                </Link>
                <Link href="/ruud-vs-amana" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Ruud vs Amana
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Mini Split Brands</h3>
              <div className="space-y-2">
                <Link href="/mitsubishi-vs-daikin" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Mitsubishi vs Daikin
                </Link>
                <Link href="/lg-vs-fujitsu" className="block text-gray-600 hover:text-brand-600 text-sm">
                  LG vs Fujitsu
                </Link>
                <Link href="/mrcool-diy-mini-split-review" className="block text-gray-600 hover:text-brand-600 text-sm">
                  MrCool DIY Review
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Heat Pump Brands</h3>
              <div className="space-y-2">
                <Link href="/bosch-heat-pump-review" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Bosch Heat Pumps
                </Link>
                <Link href="/trane-xv20i-review" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Trane XV20i Review
                </Link>
                <Link href="/carrier-infinity-review" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Carrier Infinity Series
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
              Optimize comfort and efficiency with smart thermostats, zoning systems, and advanced controls. 
              Save 20-30% on energy costs with proper automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Settings className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Thermostats</h3>
              <p className="text-gray-600 mb-4">
                Wi-Fi enabled thermostats with learning algorithms, remote control, and energy reports.
              </p>
              <div className="space-y-2">
                <Link href="/best-smart-thermostats" className="block text-brand-600 hover:text-brand-700 font-medium">
                  Best Smart Thermostats 2026 →
                </Link>
                <Link href="/nest-vs-ecobee-vs-honeywell" className="block text-gray-600 hover:text-brand-600">
                  Nest vs Ecobee vs Honeywell
                </Link>
                <Link href="/smart-thermostat-savings" className="block text-gray-600 hover:text-brand-600">
                  Actual Savings Analysis
                </Link>
                <Link href="/best-thermostat-for-heat-pump" className="block text-gray-600 hover:text-brand-600">
                  Heat Pump Compatible Models
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Home className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zoning Systems</h3>
              <p className="text-gray-600 mb-4">
                Control temperature independently in different areas for maximum comfort and efficiency.
              </p>
              <div className="space-y-2">
                <Link href="/hvac-zoning-system-guide" className="block text-brand-600 hover:text-brand-700 font-medium">
                  Complete Zoning Guide →
                </Link>
                <Link href="/zoning-dampers-explained" className="block text-gray-600 hover:text-brand-600">
                  How Dampers Work
                </Link>
                <Link href="/multi-zone-mini-split-guide" className="block text-gray-600 hover:text-brand-600">
                  Multi-Zone Mini Splits
                </Link>
                <Link href="/zoning-system-cost" className="block text-gray-600 hover:text-brand-600">
                  Installation Costs
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <Activity className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Variable Speed Tech</h3>
              <p className="text-gray-600 mb-4">
                Inverter and variable speed systems adjust output for optimal efficiency and comfort.
              </p>
              <div className="space-y-2">
                <Link href="/variable-speed-vs-single-stage" className="block text-brand-600 hover:text-brand-700 font-medium">
                  Variable vs Single Stage →
                </Link>
                <Link href="/inverter-ac-technology" className="block text-gray-600 hover:text-brand-600">
                  Inverter AC Explained
                </Link>
                <Link href="/ecm-motor-benefits" className="block text-gray-600 hover:text-brand-600">
                  ECM Motor Benefits
                </Link>
                <Link href="/modulating-furnace-guide" className="block text-gray-600 hover:text-brand-600">
                  Modulating Furnaces
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
                <FileText className="w-5 h-5 text-brand-600" />
                Buying Guides
              </h3>
              <div className="space-y-2">
                <Link href="/hvac-buying-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Complete HVAC Buying Guide
                </Link>
                <Link href="/questions-to-ask-hvac-contractor" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Questions for Contractors
                </Link>
                <Link href="/hvac-warranty-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Warranty Comparison
                </Link>
                <Link href="/hvac-financing-options" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Financing Options
                </Link>
              </div>
            </div>
            
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
                <Link href="/thermostat-wiring-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Thermostat Wiring
                </Link>
                <Link href="/duct-sealing-diy" className="block text-gray-600 hover:text-brand-600 text-sm">
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
                <Link href="/hvac-troubleshooting-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Master Troubleshooting
                </Link>
                <Link href="/thermostat-not-working" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Thermostat Issues
                </Link>
                <Link href="/hvac-noises-explained" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Strange Noises Guide
                </Link>
                <Link href="/short-cycling-causes" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Short Cycling Fixes
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-600" />
                Cost Guides
              </h3>
              <div className="space-y-2">
                <Link href="/hvac-cost-guide" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Complete Cost Guide
                </Link>
                <Link href="/hvac-repair-costs" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Common Repair Costs
                </Link>
                <Link href="/emergency-hvac-costs" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Emergency Service Rates
                </Link>
                <Link href="/hvac-service-contract-cost" className="block text-gray-600 hover:text-brand-600 text-sm">
                  Service Contracts
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
              Why HVAC Professionals & Homeowners Trust HVACBase
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide accurate, unbiased HVAC information based on manufacturer data, 
              industry standards, and real-world testing — no affiliate links or sponsored content.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="text-center">
              <div className="bg-brand-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-brand-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data-Driven Content</h3>
              <p className="text-sm text-gray-600">
                Every guide backed by AHRI certifications, DOE data, and ACCA Manual J calculations
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Unbiased</h3>
              <p className="text-sm text-gray-600">
                No affiliate commissions, no sponsored content, no brand partnerships — just facts
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
              <h3 className="font-semibold text-gray-900 mb-2">Always Current</h3>
              <p className="text-sm text-gray-600">
                Updated weekly with 2026 efficiency standards, tax credits, and equipment releases
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

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HVAC Base",
            "url": "https://hvacbase.org",
            "description": "Professional HVAC calculators, sizing guides, and unbiased equipment reviews. 340+ expert guides based on ACCA Manual J calculations and real manufacturer data.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://hvacbase.org/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "HVAC Base",
              "logo": {
                "@type": "ImageObject",
                "url": "https://hvacbase.org/logo.png"
              },
              "sameAs": [
                "https://hvacbase.org"
              ]
            }
          })
        }}
      />
    </div>
  );
}