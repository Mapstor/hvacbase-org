import Link from 'next/link';
import { Search, Filter, BookOpen, Clock, TrendingUp, Tag, ChevronRight, Grid, List, ArrowUpDown } from 'lucide-react';
import { getAllArticles } from '@/lib/content';

// Organize articles by cluster/category
function organizeArticles(articles: any[]) {
  const byCluster: { [key: string]: any[] } = {};
  const byRole: { [key: string]: any[] } = {};
  
  articles.forEach(article => {
    // By cluster
    const cluster = article.meta.cluster || 'uncategorized';
    if (!byCluster[cluster]) {
      byCluster[cluster] = [];
    }
    byCluster[cluster].push(article);
    
    // By role
    const role = article.meta.role || 'standard';
    if (!byRole[role]) {
      byRole[role] = [];
    }
    byRole[role].push(article);
  });
  
  return { byCluster, byRole };
}

// Category display names and descriptions
const categoryInfo: { [key: string]: { name: string; description: string; color: string } } = {
  'air-conditioners': { name: 'Air Conditioners', description: 'Central AC, window units, and cooling guides', color: 'blue' },
  'mini-split-air-conditioners': { name: 'Mini Split Systems', description: 'Ductless AC systems and multi-zone guides', color: 'cyan' },
  'portable-air-conditioners': { name: 'Portable ACs', description: 'Portable and temporary cooling solutions', color: 'sky' },
  'ac-sizing-selection': { name: 'AC Sizing & Selection', description: 'BTU calculators and sizing guides', color: 'indigo' },
  'heat-pumps': { name: 'Heat Pumps', description: 'Air and ground source heat pump guides', color: 'green' },
  'furnaces-heating': { name: 'Furnaces & Heating', description: 'Gas, electric, and oil heating systems', color: 'orange' },
  'space-heaters': { name: 'Space Heaters', description: 'Portable and zone heating solutions', color: 'red' },
  'water-heaters': { name: 'Water Heaters', description: 'Tank and tankless water heating', color: 'amber' },
  'tankless-water-heaters': { name: 'Tankless Water Heaters', description: 'On-demand water heating systems', color: 'yellow' },
  'energy-efficiency-ratings': { name: 'Energy Efficiency', description: 'SEER, AFUE, HSPF ratings explained', color: 'lime' },
  'air-quality': { name: 'Air Quality', description: 'Indoor air quality and ventilation', color: 'purple' },
  'indoor-air-quality': { name: 'Indoor Air Quality', description: 'Air monitoring and improvement', color: 'violet' },
  'air-purifier-reviews': { name: 'Air Purifiers', description: 'Air purifier reviews and guides', color: 'fuchsia' },
  'dehumidifiers': { name: 'Dehumidifiers', description: 'Humidity control solutions', color: 'pink' },
  'evaporative-coolers': { name: 'Evaporative Coolers', description: 'Swamp coolers and desert cooling', color: 'teal' },
  'smart-thermostats': { name: 'Smart Thermostats', description: 'Programmable and smart controls', color: 'emerald' },
  'hvac-maintenance': { name: 'HVAC Maintenance', description: 'Maintenance tips and schedules', color: 'gray' },
  'hvac-brands': { name: 'HVAC Brands', description: 'Brand comparisons and reviews', color: 'slate' },
  'tax-credits-rebates': { name: 'Tax Credits & Rebates', description: 'Incentives and savings programs', color: 'rose' },
  'ductwork': { name: 'Ductwork', description: 'Duct design and maintenance', color: 'stone' },
  'electrical': { name: 'Electrical', description: 'Wiring and electrical requirements', color: 'zinc' },
  'refrigerants': { name: 'Refrigerants', description: 'Refrigerant types and regulations', color: 'neutral' },
  'generators': { name: 'Generators', description: 'Backup power solutions', color: 'amber' },
  'battery-backup': { name: 'Battery Backup', description: 'Energy storage systems', color: 'cyan' },
  'mold-prevention': { name: 'Mold Prevention', description: 'Moisture and mold control', color: 'red' },
  'hvac-noise': { name: 'HVAC Noise', description: 'Noise reduction and sound levels', color: 'blue' },
  'electric-fireplaces': { name: 'Electric Fireplaces', description: 'Electric heating alternatives', color: 'orange' },
  'energy-costs': { name: 'Energy Costs', description: 'Cost analysis and savings', color: 'green' },
  'hvac-costs-by-state': { name: 'HVAC Costs by State', description: 'Regional pricing guides', color: 'purple' }
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  const { byCluster, byRole } = organizeArticles(articles);
  const totalArticles = articles.length;
  
  // Get featured articles (pillars and hubs)
  const featuredArticles = articles.filter(a => ['pillar', 'hub'].includes(a.meta.role)).slice(0, 6);
  
  // Sort articles by date for recent section
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.meta.dateModified || b.meta.datePublished).getTime() - 
                     new Date(a.meta.dateModified || a.meta.datePublished).getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-brand-300" />
            <h1 className="text-3xl md:text-4xl font-bold">All HVAC Articles & Guides</h1>
          </div>
          <p className="text-brand-100 text-lg">
            Browse our complete library of {totalArticles} expert HVAC guides, calculators, and resources
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-600">{totalArticles}</div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Object.keys(byCluster).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{byRole['pillar']?.length || 0}</div>
              <div className="text-sm text-gray-600">Pillar Guides</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{byRole['hub']?.length || 0}</div>
              <div className="text-sm text-gray-600">Hub Pages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">45+</div>
              <div className="text-sm text-gray-600">Calculators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link href="#categories" className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow">
              <Grid className="w-8 h-8 text-brand-600 mb-3" />
              <h2 className="text-xl font-semibold mb-2">Browse by Category</h2>
              <p className="text-gray-600 text-sm">Explore articles organized by HVAC system type</p>
            </Link>
            <Link href="#featured" className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow">
              <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
              <h2 className="text-xl font-semibold mb-2">Featured Guides</h2>
              <p className="text-gray-600 text-sm">Our most comprehensive pillar content</p>
            </Link>
            <Link href="#recent" className="bg-white rounded-lg p-6 border hover:shadow-md transition-shadow">
              <Clock className="w-8 h-8 text-blue-600 mb-3" />
              <h2 className="text-xl font-semibold mb-2">Recently Updated</h2>
              <p className="text-gray-600 text-sm">Latest articles and fresh content</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="featured" className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Featured Comprehensive Guides
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.meta.slug}
                href={`/${article.meta.slug}`}
                className="bg-white rounded-lg p-6 border hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs px-2 py-1 bg-brand-50 text-brand-700 rounded-full font-medium uppercase">
                    {article.meta.role}
                  </span>
                  <span className="text-xs text-gray-500">{article.meta.readingTime}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 mb-2">
                  {article.meta.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {article.meta.description}
                </p>
                <div className="flex items-center text-brand-600 text-sm font-medium">
                  Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Grid className="w-6 h-6 text-green-600" />
            Browse Articles by Category
          </h2>
          
          <div className="grid gap-8">
            {Object.entries(byCluster)
              .sort((a, b) => b[1].length - a[1].length)
              .map(([cluster, clusterArticles]) => {
                const info = categoryInfo[cluster as keyof typeof categoryInfo] || { 
                  name: cluster.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
                  description: '',
                  color: 'gray'
                };
                
                return (
                  <div key={cluster} className="bg-white rounded-lg border overflow-hidden">
                    <div className={`bg-gradient-to-r from-${info.color}-50 to-${info.color}-100 p-6 border-b`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{info.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                            {clusterArticles.length} articles
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {clusterArticles.slice(0, 9).map((article) => (
                          <Link
                            key={article.meta.slug}
                            href={`/${article.meta.slug}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <span className="text-sm text-gray-700 group-hover:text-brand-600 line-clamp-1">
                              {article.meta.title}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 flex-shrink-0 ml-2" />
                          </Link>
                        ))}
                      </div>
                      
                      {clusterArticles.length > 9 && (
                        <div className="mt-4 pt-4 border-t">
                          <details className="group">
                            <summary className="cursor-pointer text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center">
                              Show {clusterArticles.length - 9} more articles
                              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-open:rotate-90" />
                            </summary>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                              {clusterArticles.slice(9).map((article) => (
                                <Link
                                  key={article.meta.slug}
                                  href={`/${article.meta.slug}`}
                                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                >
                                  <span className="text-sm text-gray-700 group-hover:text-brand-600 line-clamp-1">
                                    {article.meta.title}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 flex-shrink-0 ml-2" />
                                </Link>
                              ))}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Recently Updated */}
      <section id="recent" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            Recently Updated Articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentArticles.map((article) => {
              const date = new Date(article.meta.dateModified || article.meta.datePublished);
              const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });
              
              return (
                <Link
                  key={article.meta.slug}
                  href={`/${article.meta.slug}`}
                  className="bg-white rounded-lg p-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">{formattedDate}</span>
                    <Tag className="w-3 h-3 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-brand-600 text-sm line-clamp-2 mb-2">
                    {article.meta.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {article.meta.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Popular Topics & Tools</h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'BTU Calculator', href: '/air-conditioner-btu-calculator', color: 'blue' },
              { label: 'SEER2 Ratings', href: '/seer2-rating-explained', color: 'green' },
              { label: 'Heat Pump Guide', href: '/what-is-a-heat-pump', color: 'purple' },
              { label: 'Mini Splits', href: '/mini-split-air-conditioners', color: 'cyan' },
              { label: 'Furnace Sizing', href: '/furnace-sizing-calculator', color: 'orange' },
              { label: 'Tax Credits', href: '/hvac-tax-credits-2026', color: 'red' },
              { label: 'Air Purifiers', href: '/best-air-purifiers', color: 'indigo' },
              { label: 'Energy Costs', href: '/electricity-cost-by-state', color: 'yellow' },
              { label: 'Maintenance', href: '/hvac-maintenance-checklist', color: 'gray' },
              { label: 'Troubleshooting', href: '/ac-troubleshooting-guide', color: 'pink' }
            ].map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className={`px-4 py-2 bg-${topic.color}-50 hover:bg-${topic.color}-100 text-${topic.color}-700 rounded-full text-sm font-medium transition-colors`}
              >
                {topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}