import { Metadata } from 'next'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ChevronRight, Shield, Award, TrendingUp, Users, CheckCircle, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'HVAC Brand Reviews 2026: Best AC, Furnace & Heat Pump Brands',
  description: 'HVAC brand reviews based on manufacturer-published warranty terms, AHRI-certified efficiency data, and dealer network coverage. Strengths, weaknesses, and warranty details for the top AC, furnace, and heat pump manufacturers.',
  alternates: { canonical: 'https://www.hvacbase.org/brand-reviews' },
  openGraph: {
    title: 'HVAC Brand Reviews | Top Manufacturer Rankings',
    description: 'HVAC brand reviews based on manufacturer warranty terms, AHRI-certified efficiency data, and dealer network coverage.',
    url: 'https://www.hvacbase.org/brand-reviews',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Brand Reviews' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Brand Reviews | Top Manufacturer Rankings',
    description: 'HVAC brand reviews based on manufacturer warranty terms and AHRI-certified data.',
    images: ['/opengraph-image'],
  },
}

// Brand categories listed in alphabetical order within each category. No
// numeric brand ratings — we do not run a contractor survey or own bench
// equipment, so any "4.7/5 stars" precision would be fabricated. The
// qualitative pros/cons + verifiable warranty terms below are the honest
// substance.
// Per-brand `href` points to the best-of article that covers that brand. Where
// no such article exists (McQuay, Nordyne), href is null → tile renders without
// a link (queued to CONTENT_CREATE_QUEUE.md pending real single-brand review).
const brandCategories = {
  'Premium Brands': {
    icon: <Award className="w-6 h-6 text-gold-600" />,
    description: 'Top-tier manufacturers with broad dealer networks, premium warranty coverage, and the highest-efficiency model lines.',
    brands: [
      {
        name: 'American Standard',
        href: null,
        strengths: ['Reliability', 'Value', 'Wide availability'],
        weaknesses: ['Limited features', 'Average efficiency'],
        warranty: '10 years parts',
        priceRange: '$$'
      },
      {
        name: 'Carrier',
        href: null,
        strengths: ['Reliability', 'Innovation', 'Dealer network'],
        weaknesses: ['Premium pricing', 'Complex controls'],
        warranty: '10 years parts',
        priceRange: '$$$'
      },
      {
        name: 'Lennox',
        href: null,
        strengths: ['Efficiency', 'Quiet operation', 'Innovation'],
        weaknesses: ['Expensive parts', 'Dealer dependence'],
        warranty: '10 years',
        priceRange: '$$$'
      },
      {
        name: 'Trane',
        href: null,
        strengths: ['Durability', 'Commercial grade', 'Service network'],
        weaknesses: ['Higher cost', 'Loud operation'],
        warranty: '10-12 years',
        priceRange: '$$$'
      }
    ]
  },
  'Value Brands': {
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    description: 'Manufacturers offering competitive warranty terms and parts availability at lower price points.',
    brands: [
      {
        name: 'Amana',
        href: null,
        strengths: ['Budget friendly', 'Reliability', 'Lifetime warranty'],
        weaknesses: ['Limited efficiency', 'Fewer features'],
        warranty: 'Lifetime heat exchanger',
        priceRange: '$'
      },
      {
        name: 'Goodman',
        href: null,
        strengths: ['Affordability', 'Parts availability', 'Simple design'],
        weaknesses: ['Shorter lifespan', 'Basic features'],
        warranty: '10 years parts',
        priceRange: '$'
      },
      {
        name: 'Rheem',
        href: null,
        strengths: ['Reliability', 'Good warranty', 'Wide range'],
        weaknesses: ['Inconsistent quality', 'Service issues'],
        warranty: '10 years parts',
        priceRange: '$$'
      },
      {
        name: 'Ruud',
        href: null,
        strengths: ['Value pricing', 'Solid performance', 'Easy service'],
        weaknesses: ['Average efficiency', 'Limited dealers'],
        warranty: '10 years',
        priceRange: '$$'
      }
    ]
  },
  'High-Efficiency Brands': {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    description: 'Manufacturers focused on highest-efficiency model lines, ductless mini splits, and low-GWP refrigerant transition.',
    brands: [
      {
        name: 'Daikin',
        href: '/mini-split-brands-ranked',
        strengths: ['Innovation', 'Efficiency', 'Global presence'],
        weaknesses: ['Price premium', 'Complex systems'],
        warranty: '12 years',
        priceRange: '$$$'
      },
      {
        name: 'Fujitsu',
        href: '/mini-split-brands-ranked',
        strengths: ['Efficiency', 'Compact design', 'Quiet'],
        weaknesses: ['Limited availability', 'Higher cost'],
        warranty: '12 years',
        priceRange: '$$$'
      },
      {
        name: 'LG',
        href: '/mini-split-brands-ranked',
        strengths: ['Modern features', 'Efficiency', 'Design'],
        weaknesses: ['Service network', 'Reliability questions'],
        warranty: '10 years',
        priceRange: '$$'
      },
      {
        name: 'Mitsubishi Electric',
        href: '/mini-split-brands-ranked',
        strengths: ['Efficiency', 'Quiet operation', 'Reliability'],
        weaknesses: ['Premium pricing', 'Limited dealers'],
        warranty: '12 years',
        priceRange: '$$$$'
      }
    ]
  },
  'Commercial Brands': {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    description: 'Manufacturers with a commercial / heavy-duty focus; residential lines exist but are not the primary specialty.',
    brands: [
      {
        name: 'McQuay',
        href: null,
        strengths: ['Commercial expertise', 'Reliability', 'Custom solutions'],
        weaknesses: ['Limited residential', 'Complex systems'],
        warranty: '5-10 years',
        priceRange: '$$$'
      },
      {
        name: 'Nordyne',
        href: null,
        strengths: ['Value pricing', 'Multiple brands', 'Availability'],
        weaknesses: ['Quality inconsistent', 'Limited features'],
        warranty: '10 years',
        priceRange: '$'
      },
      {
        name: 'York',
        href: null,
        strengths: ['Commercial focus', 'Durability', 'Service'],
        weaknesses: ['Residential limited', 'Higher cost'],
        warranty: '5-10 years',
        priceRange: '$$$'
      }
    ]
  }
}

const brandComparisons = [
  {
    title: 'Mini Split Brand Comparison',
    description: 'Mitsubishi vs Daikin vs Fujitsu ductless systems',
    href: '/mini-split-brands-ranked',
    brands: ['Mitsubishi', 'Daikin', 'Fujitsu'],
    winner: 'Mitsubishi overall',
    readTime: '15 min'
  }
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
              HVAC Brand Reviews 2026
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              HVAC brand reviews based on manufacturer-published warranty terms, AHRI-certified efficiency data, and dealer network coverage. Brands are listed alphabetically within each category — we do not assign numeric star ratings.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Brands by Category</h2>
          <p className="text-gray-600 mb-8">
            Brands within each category are listed alphabetically. Strengths, weaknesses, and warranty terms are the load-bearing comparisons — there is no numeric scoring.
          </p>
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
                            {brand.href ? (
                              <Link href={brand.href} className="hover:text-blue-600">
                                {brand.name}
                              </Link>
                            ) : (
                              <span>{brand.name}</span>
                            )}
                          </h4>
                          <span className="text-2xl font-bold text-gray-600">
                            {brand.priceRange}
                          </span>
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

                        {brand.href && (
                          <Link
                            href={brand.href}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Read More
                            <ChevronRight className="ml-1 w-3 h-3" />
                          </Link>
                        )}
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
                      {comparison.brands.map((brand) => (
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Warranty Comparison</h2>
          <p className="text-gray-600 mb-8">
            Warranty terms below come from each manufacturer's published warranty documents. Coverage may require online registration within 60–90 days of installation.
          </p>
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

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose the Right Brand for Your Home</h2>
          <p className="text-xl text-blue-100 mb-8">
            Use our brand comparison tools and buying guides to make the best choice
          </p>
          <div className="flex justify-center">
            <Link
              href="/buying-guides"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Equipment Buying Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
