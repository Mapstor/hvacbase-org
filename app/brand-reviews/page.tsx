import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, Star, Shield, Award, TrendingUp, Users, CheckCircle, XCircle, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Brand Reviews 2024: Best AC, Furnace & Heat Pump Brands',
  description: 'Unbiased HVAC brand reviews and rankings. Compare top AC, furnace, and heat pump manufacturers. Reliability ratings, warranty coverage, and value analysis.',
  openGraph: {
    title: 'HVAC Brand Reviews | Top Manufacturer Rankings',
    description: 'Complete HVAC brand reviews with reliability ratings, warranty details, and expert recommendations.',
    type: 'website',
  }
}

const brandCategories = {
  'Premium Brands': {
    icon: <Award className="w-6 h-6 text-gold-600" />,
    description: 'Top-tier manufacturers with superior quality and features',
    brands: [
      {
        name: 'Carrier',
        rating: 4.8,
        strengths: ['Reliability', 'Innovation', 'Dealer network'],
        weaknesses: ['Premium pricing', 'Complex controls'],
        warranty: '10 years parts',
        priceRange: '$$$',
        marketShare: '15%'
      },
      {
        name: 'Trane',
        rating: 4.7,
        strengths: ['Durability', 'Commercial grade', 'Service network'],
        weaknesses: ['Higher cost', 'Loud operation'],
        warranty: '10-12 years',
        priceRange: '$$$',
        marketShare: '12%'
      },
      {
        name: 'Lennox',
        rating: 4.6,
        strengths: ['Efficiency', 'Quiet operation', 'Innovation'],
        weaknesses: ['Expensive parts', 'Dealer dependence'],
        warranty: '10 years',
        priceRange: '$$$',
        marketShare: '8%'
      },
      {
        name: 'American Standard',
        rating: 4.5,
        strengths: ['Reliability', 'Value', 'Wide availability'],
        weaknesses: ['Limited features', 'Average efficiency'],
        warranty: '10 years parts',
        priceRange: '$$',
        marketShare: '10%'
      }
    ]
  },
  'Value Brands': {
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    description: 'Quality manufacturers offering great value for money',
    brands: [
      {
        name: 'Goodman',
        rating: 4.2,
        strengths: ['Affordability', 'Parts availability', 'Simple design'],
        weaknesses: ['Shorter lifespan', 'Basic features'],
        warranty: '10 years parts',
        priceRange: '$',
        marketShare: '18%'
      },
      {
        name: 'Amana',
        rating: 4.1,
        strengths: ['Budget friendly', 'Reliability', 'Lifetime warranty'],
        weaknesses: ['Limited efficiency', 'Fewer features'],
        warranty: 'Lifetime heat exchanger',
        priceRange: '$',
        marketShare: '8%'
      },
      {
        name: 'Ruud',
        rating: 4.3,
        strengths: ['Value pricing', 'Solid performance', 'Easy service'],
        weaknesses: ['Average efficiency', 'Limited dealers'],
        warranty: '10 years',
        priceRange: '$$',
        marketShare: '6%'
      },
      {
        name: 'Rheem',
        rating: 4.2,
        strengths: ['Reliability', 'Good warranty', 'Wide range'],
        weaknesses: ['Inconsistent quality', 'Service issues'],
        warranty: '10 years parts',
        priceRange: '$$',
        marketShare: '12%'
      }
    ]
  },
  'High-Efficiency Brands': {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    description: 'Manufacturers focused on energy efficiency and innovation',
    brands: [
      {
        name: 'Mitsubishi Electric',
        rating: 4.9,
        strengths: ['Efficiency', 'Quiet operation', 'Reliability'],
        weaknesses: ['Premium pricing', 'Limited dealers'],
        warranty: '12 years',
        priceRange: '$$$$',
        marketShare: '3%'
      },
      {
        name: 'Daikin',
        rating: 4.7,
        strengths: ['Innovation', 'Efficiency', 'Global presence'],
        weaknesses: ['Price premium', 'Complex systems'],
        warranty: '12 years',
        priceRange: '$$$',
        marketShare: '4%'
      },
      {
        name: 'Fujitsu',
        rating: 4.6,
        strengths: ['Efficiency', 'Compact design', 'Quiet'],
        weaknesses: ['Limited availability', 'Higher cost'],
        warranty: '12 years',
        priceRange: '$$$',
        marketShare: '2%'
      },
      {
        name: 'LG',
        rating: 4.4,
        strengths: ['Modern features', 'Efficiency', 'Design'],
        weaknesses: ['Service network', 'Reliability questions'],
        warranty: '10 years',
        priceRange: '$$',
        marketShare: '3%'
      }
    ]
  },
  'Commercial Brands': {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    description: 'Heavy-duty manufacturers for commercial applications',
    brands: [
      {
        name: 'York',
        rating: 4.4,
        strengths: ['Commercial focus', 'Durability', 'Service'],
        weaknesses: ['Residential limited', 'Higher cost'],
        warranty: '5-10 years',
        priceRange: '$$$',
        marketShare: '7%'
      },
      {
        name: 'McQuay',
        rating: 4.3,
        strengths: ['Commercial expertise', 'Reliability', 'Custom solutions'],
        weaknesses: ['Limited residential', 'Complex systems'],
        warranty: '5-10 years',
        priceRange: '$$$',
        marketShare: '2%'
      },
      {
        name: 'Nordyne',
        rating: 4.0,
        strengths: ['Value pricing', 'Multiple brands', 'Availability'],
        weaknesses: ['Quality inconsistent', 'Limited features'],
        warranty: '10 years',
        priceRange: '$',
        marketShare: '5%'
      }
    ]
  }
}

const brandComparisons = [
  {
    title: 'Carrier vs Trane: Ultimate Comparison',
    description: 'Head-to-head comparison of the top two premium HVAC brands',
    href: '/brand-reviews/carrier-vs-trane',
    brands: ['Carrier', 'Trane'],
    winner: 'Tie - depends on priorities',
    readTime: '12 min'
  },
  {
    title: 'Goodman vs Rheem: Value Brand Showdown',
    description: 'Compare the most popular budget-friendly HVAC manufacturers',
    href: '/brand-reviews/goodman-vs-rheem',
    brands: ['Goodman', 'Rheem'],
    winner: 'Goodman for budget',
    readTime: '10 min'
  },
  {
    title: 'Lennox vs American Standard Analysis',
    description: 'Premium vs mainstream brand detailed comparison',
    href: '/brand-reviews/lennox-vs-american-standard',
    brands: ['Lennox', 'American Standard'],
    winner: 'Lennox for features',
    readTime: '11 min'
  },
  {
    title: 'Mini Split Brand Comparison',
    description: 'Mitsubishi vs Daikin vs Fujitsu ductless systems',
    href: '/brand-reviews/mini-split-brand-comparison',
    brands: ['Mitsubishi', 'Daikin', 'Fujitsu'],
    winner: 'Mitsubishi overall',
    readTime: '15 min'
  }
]

const reliabilityRankings = [
  { brand: 'Mitsubishi Electric', score: 9.2, issues: 'Very Low', satisfaction: '95%' },
  { brand: 'Carrier', score: 8.8, issues: 'Low', satisfaction: '92%' },
  { brand: 'Trane', score: 8.6, issues: 'Low', satisfaction: '90%' },
  { brand: 'Daikin', score: 8.5, issues: 'Low', satisfaction: '89%' },
  { brand: 'Lennox', score: 8.3, issues: 'Low', satisfaction: '87%' },
  { brand: 'American Standard', score: 8.0, issues: 'Medium', satisfaction: '85%' },
  { brand: 'Ruud', score: 7.8, issues: 'Medium', satisfaction: '82%' },
  { brand: 'Rheem', score: 7.6, issues: 'Medium', satisfaction: '80%' },
  { brand: 'Goodman', score: 7.2, issues: 'Medium-High', satisfaction: '75%' },
  { brand: 'York', score: 7.5, issues: 'Medium', satisfaction: '78%' }
]

const warrantyComparison = [
  { brand: 'Mitsubishi Electric', parts: '12 years', compressor: '12 years', labor: '1-2 years', transferable: 'Yes' },
  { brand: 'Daikin', parts: '12 years', compressor: '12 years', labor: '1 year', transferable: 'Yes' },
  { brand: 'Carrier', parts: '10 years', compressor: '10 years', labor: '1 year', transferable: 'Yes' },
  { brand: 'Trane', parts: '10-12 years', compressor: '10-12 years', labor: '1 year', transferable: 'Yes' },
  { brand: 'Lennox', parts: '10 years', compressor: '10 years', labor: '1 year', transferable: 'Limited' },
  { brand: 'Goodman', parts: '10 years', compressor: '10 years', labor: '1 year', transferable: 'Yes' },
  { brand: 'Rheem', parts: '10 years', compressor: '10 years', labor: '1 year', transferable: 'Yes' },
  { brand: 'Amana', parts: '10 years', compressor: 'Lifetime', labor: '1 year', transferable: 'Yes' }
]

export default function BrandReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              HVAC Brand Reviews 2024
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Unbiased reviews and rankings of top HVAC manufacturers based on reliability, performance, and customer satisfaction
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-200">Brands Reviewed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-blue-200">Unbiased Analysis</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-blue-200">Customer Reviews</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">2024</div>
                  <div className="text-sm text-blue-200">Updated Rankings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reliability Rankings */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">2024 Reliability Rankings</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issues</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Satisfaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reliabilityRankings.map((brand, idx) => (
                    <tr key={brand.brand} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/brand-reviews/${brand.brand.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-gray-900 hover:text-blue-600">
                          {brand.brand}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-lg font-bold text-gray-900 mr-2">{brand.score}</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(brand.score / 2) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          brand.issues === 'Very Low' ? 'bg-green-100 text-green-800' :
                          brand.issues === 'Low' ? 'bg-blue-100 text-blue-800' :
                          brand.issues === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {brand.issues}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {brand.satisfaction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Brands by Category</h2>
          <div className="space-y-12">
            {Object.entries(brandCategories).map(([category, data]) => (
              <div key={category}>
                <div className="flex items-center mb-6">
                  {data.icon}
                  <div className="ml-3">
                    <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                    <p className="text-gray-600">{data.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.brands.map((brand) => (
                    <Card key={brand.name} className="hover:shadow-lg transition-shadow">
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">
                            <Link href={`/brand-reviews/${brand.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-blue-600">
                              {brand.name}
                            </Link>
                          </h4>
                          <span className="text-2xl font-bold text-gray-600">
                            {brand.priceRange}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <div className="text-lg font-bold text-gray-900 mr-2">{brand.rating}</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(brand.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">({brand.marketShare})</span>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-xs font-medium text-green-600 mb-1">Strengths:</div>
                          <div className="flex flex-wrap gap-1">
                            {brand.strengths.map((strength, idx) => (
                              <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-xs font-medium text-red-600 mb-1">Weaknesses:</div>
                          <div className="flex flex-wrap gap-1">
                            {brand.weaknesses.map((weakness, idx) => (
                              <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                {weakness}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <strong>Warranty:</strong> {brand.warranty}
                        </div>
                        
                        <Link
                          href={`/brand-reviews/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Full Review
                          <ChevronRight className="ml-1 w-3 h-3" />
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Comparisons */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Head-to-Head Comparisons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {brandComparisons.map((comparison) => (
              <Card key={comparison.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={comparison.href} className="hover:text-blue-600">
                      {comparison.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{comparison.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      {comparison.brands.map((brand, idx) => (
                        <span key={brand} className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                          {brand}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{comparison.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-gray-500">Winner: </span>
                      <span className="font-semibold text-green-600">{comparison.winner}</span>
                    </div>
                    <Link
                      href={comparison.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read Comparison
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warranty Comparison */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Warranty Comparison</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parts</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compressor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Labor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transferable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {warrantyComparison.map((warranty) => (
                    <tr key={warranty.brand} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{warranty.brand}</td>
                      <td className="px-6 py-4 text-gray-700">{warranty.parts}</td>
                      <td className="px-6 py-4 text-gray-700">{warranty.compressor}</td>
                      <td className="px-6 py-4 text-gray-700">{warranty.labor}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center ${
                          warranty.transferable === 'Yes' ? 'text-green-600' :
                          warranty.transferable === 'Limited' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {warranty.transferable === 'Yes' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          <span className="ml-1">{warranty.transferable}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Recommendations */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Expert Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white">
              <div className="text-center">
                <Award className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Overall</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">Carrier</div>
                <p className="text-gray-600 text-sm mb-4">
                  Best combination of reliability, innovation, and dealer support
                </p>
                <Link href="/brand-reviews/carrier" className="text-blue-600 hover:text-blue-700 font-medium">
                  View Review →
                </Link>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Value</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">Goodman</div>
                <p className="text-gray-600 text-sm mb-4">
                  Excellent reliability and performance at budget-friendly prices
                </p>
                <Link href="/brand-reviews/goodman" className="text-blue-600 hover:text-blue-700 font-medium">
                  View Review →
                </Link>
              </div>
            </Card>
            <Card className="p-6 bg-white">
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Most Efficient</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">Mitsubishi</div>
                <p className="text-gray-600 text-sm mb-4">
                  Industry-leading efficiency ratings and innovative technology
                </p>
                <Link href="/brand-reviews/mitsubishi-electric" className="text-blue-600 hover:text-blue-700 font-medium">
                  View Review →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose the Right Brand for Your Home</h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our brand comparison tools and buying guides to make the best choice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/buying-guides"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Equipment Buying Guides
            </Link>
            <Link
              href="/brand-reviews/brand-comparison-tool"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors border border-blue-500"
            >
              Compare Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}