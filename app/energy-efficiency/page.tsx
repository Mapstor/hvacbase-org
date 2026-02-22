import Link from 'next/link';
import { Zap, Calculator, TrendingUp, Award, DollarSign, ArrowRight, BarChart3 } from 'lucide-react';
import { getAllArticles } from '@/lib/content';

// Energy efficiency related clusters
const energyEfficiencyClusters = [
  'energy-efficiency-ratings',
  'tax-credits-rebates',
  'energy-costs',
  'smart-thermostats'
];

async function getEnergyEfficiencyArticles() {
  const articles = await getAllArticles();
  return articles.filter(article => 
    energyEfficiencyClusters.includes(article.meta.cluster)
  );
}

// Organize articles by category
function organizeArticles(articles: any[]) {
  const categories: { [key: string]: any[] } = {};
  
  articles.forEach(article => {
    const cluster = article.meta.cluster;
    if (!categories[cluster]) {
      categories[cluster] = [];
    }
    categories[cluster].push(article);
  });
  
  return categories;
}

// Category metadata
const categoryInfo = {
  'energy-efficiency-ratings': {
    title: 'Energy Efficiency Ratings',
    description: 'SEER2, AFUE, HSPF2, EER2 ratings and efficiency standards explained',
    icon: TrendingUp
  },
  'tax-credits-rebates': {
    title: 'Tax Credits & Rebates',
    description: 'Federal tax credits, state rebates, and utility incentive programs',
    icon: DollarSign
  },
  'energy-costs': {
    title: 'Energy Costs & Savings',
    description: 'Electricity costs by state and energy consumption analysis',
    icon: BarChart3
  },
  'smart-thermostats': {
    title: 'Smart Thermostats',
    description: 'Programmable and smart thermostat guides for energy savings',
    icon: Zap
  }
};

export default async function EnergyEfficiencyHub() {
  const articles = await getEnergyEfficiencyArticles();
  const categories = organizeArticles(articles);
  const totalArticles = articles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-yellow-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Energy Efficiency Guides & Calculators
            </h1>
            <p className="text-lg text-yellow-100 mb-4">
              {totalArticles} expert guides covering SEER2, AFUE, HSPF2 ratings, tax credits, energy costs, and savings calculators
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>2026 standards</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>Tax credits up to $2,000</span>
              </div>
              <div className="flex items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span>Savings calculators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Popular Tools & Calculators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/seer2-savings-calculator" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <Calculator className="w-6 h-6 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-yellow-600">SEER2 Savings</h3>
              <p className="text-sm text-gray-600">Energy cost savings</p>
            </Link>
            <Link href="/seer2-rating-explained" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <TrendingUp className="w-6 h-6 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-yellow-600">SEER2 Guide</h3>
              <p className="text-sm text-gray-600">Efficiency ratings</p>
            </Link>
            <Link href="/afue-rating-explained" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <Award className="w-6 h-6 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-yellow-600">AFUE Ratings</h3>
              <p className="text-sm text-gray-600">Furnace efficiency</p>
            </Link>
            <Link href="/hvac-tax-credits-2026" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
              <DollarSign className="w-6 h-6 text-yellow-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-yellow-600">Tax Credits 2026</h3>
              <p className="text-sm text-gray-600">Federal incentives</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Efficiency Standards */}
      <section className="py-8 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">2026 Efficiency Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">SEER2 Minimums</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-1">14.3</div>
              <p className="text-sm text-gray-600">Southeast & Southwest regions</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">HSPF2 Minimums</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-1">7.5</div>
              <p className="text-sm text-gray-600">Heat pump heating efficiency</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">AFUE Minimums</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-1">80%</div>
              <p className="text-sm text-gray-600">Gas furnace efficiency</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">EER2 Minimums</h3>
              <div className="text-2xl font-bold text-yellow-600 mb-1">11.7</div>
              <p className="text-sm text-gray-600">Peak cooling efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          
          <div className="grid gap-8">
            {Object.entries(categories).map(([cluster, clusterArticles]) => {
              const info = categoryInfo[cluster as keyof typeof categoryInfo] || { title: cluster, description: '', icon: Zap };
              const Icon = info.icon;
              
              return (
                <div key={cluster} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <Icon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {clusterArticles.length} guides
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {clusterArticles.map((article) => (
                      <Link
                        key={article.meta.slug}
                        href={`/${article.meta.slug}`}
                        className="p-3 border border-gray-100 rounded-lg hover:border-yellow-200 hover:bg-yellow-50 transition-colors group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-yellow-600 text-sm mb-1">
                          {article.meta.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {article.meta.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Most Popular This Month</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(article => ['pillar', 'hub'].includes(article.meta.role))
              .slice(0, 6)
              .map((article) => (
                <Link
                  key={article.meta.slug}
                  href={`/${article.meta.slug}`}
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full capitalize">
                      {article.meta.role}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 mb-2">
                    {article.meta.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.meta.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {article.meta.readingTime}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}