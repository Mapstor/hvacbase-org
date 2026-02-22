import Link from 'next/link';
import { Thermometer, Calculator, TrendingUp, Wrench, DollarSign, ArrowRight } from 'lucide-react';
import { getAllArticles } from '@/lib/content';

// Air conditioning related clusters
const airConditioningClusters = [
  'air-conditioners',
  'mini-split-air-conditioners', 
  'portable-air-conditioners',
  'ac-sizing-selection',
  'evaporative-coolers'
];

async function getAirConditioningArticles() {
  const articles = await getAllArticles();
  return articles.filter(article => 
    airConditioningClusters.includes(article.meta.cluster)
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
  'air-conditioners': {
    title: 'Central Air Conditioning',
    description: 'Whole-home cooling systems, window units, and ductwork guides',
    icon: Thermometer
  },
  'mini-split-air-conditioners': {
    title: 'Mini Split Systems',
    description: 'Ductless AC systems, multi-zone setups, and installation guides',
    icon: TrendingUp
  },
  'portable-air-conditioners': {
    title: 'Portable Air Conditioners',
    description: 'Portable and window AC units for targeted cooling',
    icon: Wrench
  },
  'ac-sizing-selection': {
    title: 'AC Sizing & Selection',
    description: 'BTU calculators and sizing guides for proper AC selection',
    icon: Calculator
  },
  'evaporative-coolers': {
    title: 'Evaporative Coolers',
    description: 'Swamp coolers and evaporative cooling systems',
    icon: DollarSign
  }
};

export default async function AirConditioningHub() {
  const articles = await getAirConditioningArticles();
  const categories = organizeArticles(articles);
  const totalArticles = articles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Air Conditioning Guides & Calculators
            </h1>
            <p className="text-lg text-blue-100 mb-4">
              {totalArticles} expert guides covering central AC, mini splits, portable units, sizing calculators, and more
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span>BTU calculators</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>Efficiency guides</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>Cost analysis</span>
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
            <Link href="/air-conditioner-btu-calculator" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <Calculator className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">BTU Calculator</h3>
              <p className="text-sm text-gray-600">Size your AC correctly</p>
            </Link>
            <Link href="/ac-tonnage-calculator" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Tonnage Calculator</h3>
              <p className="text-sm text-gray-600">Convert BTU to tons</p>
            </Link>
            <Link href="/mini-split-sizing-calculator" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <Thermometer className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">Mini Split Sizing</h3>
              <p className="text-sm text-gray-600">Multi-zone calculator</p>
            </Link>
            <Link href="/seer2-rating-explained" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600">SEER2 Guide</h3>
              <p className="text-sm text-gray-600">Efficiency ratings</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          
          <div className="grid gap-8">
            {Object.entries(categories).map(([cluster, clusterArticles]) => {
              const info = categoryInfo[cluster] || { title: cluster, description: '', icon: Thermometer };
              const Icon = info.icon;
              
              return (
                <div key={cluster} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
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
                        className="p-3 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm mb-1">
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
                    <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full capitalize">
                      {article.meta.role}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
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