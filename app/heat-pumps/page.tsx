import Link from 'next/link';
import { Zap, Calculator, TrendingUp, Wrench, DollarSign, ArrowRight, Activity } from 'lucide-react';
import { getAllArticles } from '@/lib/content';

// Heat pump related clusters
const heatPumpClusters = [
  'heat-pumps'
];

async function getHeatPumpArticles() {
  const articles = await getAllArticles();
  return articles.filter(article => 
    heatPumpClusters.includes(article.meta.cluster)
  );
}

// Organize articles by topic
function organizeArticles(articles: any[]) {
  const topics = {
    'Buying Guides': [] as any[],
    'Installation & Costs': [] as any[],
    'Efficiency & Performance': [] as any[],
    'Tax Credits & Rebates': [] as any[],
    'Comparisons': [] as any[],
    'Troubleshooting': [] as any[],
    'General': [] as any[]
  };
  
  articles.forEach(article => {
    const title = article.meta.title.toLowerCase();
    if (title.includes('best') || title.includes('buying') || title.includes('guide')) {
      topics['Buying Guides'].push(article);
    } else if (title.includes('cost') || title.includes('install') || title.includes('price')) {
      topics['Installation & Costs'].push(article);
    } else if (title.includes('tax') || title.includes('credit') || title.includes('rebate')) {
      topics['Tax Credits & Rebates'].push(article);
    } else if (title.includes('vs') || title.includes('compared') || title.includes('comparison')) {
      topics['Comparisons'].push(article);
    } else if (title.includes('efficiency') || title.includes('seer') || title.includes('hspf') || title.includes('electricity')) {
      topics['Efficiency & Performance'].push(article);
    } else if (title.includes('problems') || title.includes('troubleshoot') || title.includes('not working')) {
      topics['Troubleshooting'].push(article);
    } else {
      topics['General'].push(article);
    }
  });
  
  // Remove empty categories
  Object.keys(topics).forEach(key => {
    if (topics[key as keyof typeof topics].length === 0) {
      delete topics[key as keyof typeof topics];
    }
  });
  
  return topics;
}

// Topic metadata
const topicInfo = {
  'Buying Guides': {
    description: 'Best heat pump recommendations and buying guides',
    icon: Activity
  },
  'Installation & Costs': {
    description: 'Installation costs, quotes, and pricing analysis',
    icon: DollarSign
  },
  'Efficiency & Performance': {
    description: 'Energy efficiency ratings, electricity usage, and performance',
    icon: TrendingUp
  },
  'Tax Credits & Rebates': {
    description: 'Federal tax credits, rebates, and incentive programs',
    icon: Calculator
  },
  'Comparisons': {
    description: 'Heat pump vs furnace, gas vs electric comparisons',
    icon: Wrench
  },
  'Troubleshooting': {
    description: 'Common problems and troubleshooting guides',
    icon: Wrench
  },
  'General': {
    description: 'General heat pump information and guides',
    icon: Zap
  }
};

export default async function HeatPumpsHub() {
  const articles = await getHeatPumpArticles();
  const topics = organizeArticles(articles);
  const totalArticles = articles.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Heat Pump Guides & Calculators
            </h1>
            <p className="text-lg text-green-100 mb-4">
              {totalArticles} expert guides covering air-source, ground-source, sizing, efficiency, costs, and tax credits
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calculator className="w-4 h-4" />
                <span>Sizing calculators</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>HSPF2 ratings</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>Tax credits up to $2,000</span>
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
            <Link href="/heat-pump-size-calculator" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <Calculator className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-green-600">Heat Pump Sizing</h3>
              <p className="text-sm text-gray-600">BTU calculation</p>
            </Link>
            <Link href="/heat-pump-running-cost-calculator" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <DollarSign className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-green-600">Running Cost</h3>
              <p className="text-sm text-gray-600">Monthly costs</p>
            </Link>
            <Link href="/furnace-vs-heat-pump" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <Wrench className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-green-600">vs Furnace</h3>
              <p className="text-sm text-gray-600">Cost comparison</p>
            </Link>
            <Link href="/heat-pump-tax-credits-2026" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
              <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900 group-hover:text-green-600">Tax Credits</h3>
              <p className="text-sm text-gray-600">Up to $2,000 back</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Topics */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
          
          <div className="grid gap-8">
            {Object.entries(topics).map(([topic, topicArticles]) => {
              const info = topicInfo[topic] || { description: '', icon: Zap };
              const Icon = info.icon;
              
              return (
                <div key={topic} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{topic}</h3>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {topicArticles.length} guides
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {topicArticles.map((article) => (
                      <Link
                        key={article.meta.slug}
                        href={`/${article.meta.slug}`}
                        className="p-3 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-green-600 text-sm mb-1">
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
                    <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full capitalize">
                      {article.meta.role}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 mb-2">
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