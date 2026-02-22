import Link from 'next/link';
import { Wind, Calculator, TrendingUp, Shield, DollarSign, ArrowRight, Droplets } from 'lucide-react';
import { getAllArticles } from '@/lib/content';

// Air quality related clusters
const airQualityClusters = [
  'air-quality',
  'indoor-air-quality',
  'air-purifier-reviews',
  'dehumidifiers',
  'mold-prevention'
];

async function getAirQualityArticles() {
  const articles = await getAllArticles();
  return articles.filter(article => 
    airQualityClusters.includes(article.meta.cluster)
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
  'air-quality': {
    title: 'General Air Quality',
    description: 'Air quality testing, improvement strategies, and general IAQ guides',
    icon: Wind
  },
  'indoor-air-quality': {
    title: 'Indoor Air Quality',
    description: 'Indoor air quality monitors, testing, and improvement solutions',
    icon: Shield
  },
  'air-purifier-reviews': {
    title: 'Air Purifier Reviews',
    description: 'Best air purifiers, HEPA filters, and air cleaning device reviews',
    icon: Wind
  },
  'dehumidifiers': {
    title: 'Dehumidifiers',
    description: 'Whole-house and portable dehumidifiers for humidity control',
    icon: Droplets
  },
  'mold-prevention': {
    title: 'Mold Prevention',
    description: 'Mold prevention, detection, and remediation guides',
    icon: Shield
  }
};

export default async function AirQualityHub() {
  const articles = await getAirQualityArticles();
  const categories = organizeArticles(articles);
  const totalArticles = articles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Indoor Air Quality Guides & Reviews
            </h1>
            <p className="text-lg text-purple-100 mb-4">
              {totalArticles} expert guides covering air purifiers, dehumidifiers, air quality testing, mold prevention, and IAQ solutions
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Wind className="w-4 h-4" />
                <span>HEPA & CADR ratings</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Allergen removal</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4" />
                <span>Humidity control</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Popular Guides & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/best-air-purifiers" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <Wind className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-purple-600">Best Air Purifiers</h3>
              <p className="text-sm text-gray-600">Top-rated models</p>
            </Link>
            <Link href="/what-size-dehumidifier-do-i-need" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <Calculator className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-purple-600">Dehumidifier Sizing</h3>
              <p className="text-sm text-gray-600">Size calculator</p>
            </Link>
            <Link href="/indoor-air-quality-testing" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <Shield className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-purple-600">IAQ Testing</h3>
              <p className="text-sm text-gray-600">Test your air</p>
            </Link>
            <Link href="/merv-rating-chart" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-purple-600">MERV Ratings</h3>
              <p className="text-sm text-gray-600">Filter efficiency</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Key IAQ Facts */}
      <section className="py-8 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-6">Indoor Air Quality Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">EPA Finding</h3>
              <div className="text-2xl font-bold text-purple-600 mb-1">2-5x</div>
              <p className="text-sm text-gray-600">Indoor air more polluted than outdoor</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Time Indoors</h3>
              <div className="text-2xl font-bold text-purple-600 mb-1">90%</div>
              <p className="text-sm text-gray-600">Of our time spent indoors</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">Humidity Range</h3>
              <div className="text-2xl font-bold text-purple-600 mb-1">30-50%</div>
              <p className="text-sm text-gray-600">Ideal indoor humidity level</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-2">HEPA Standard</h3>
              <div className="text-2xl font-bold text-purple-600 mb-1">99.97%</div>
              <p className="text-sm text-gray-600">Particles 0.3 microns removed</p>
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
              const info = categoryInfo[cluster] || { title: cluster, description: '', icon: Wind };
              const Icon = info.icon;
              
              return (
                <div key={cluster} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Icon className="w-6 h-6 text-purple-600" />
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
                        className="p-3 border border-gray-100 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-purple-600 text-sm mb-1">
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
                    <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full capitalize">
                      {article.meta.role}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
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