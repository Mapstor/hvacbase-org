import Link from 'next/link';
import { Thermometer, Calculator, BookOpen, Wrench, TrendingUp, Shield, Award, Mail } from 'lucide-react';

const CATEGORY_ROUTES: Record<string, string> = {
  'Calculators & Tools': '/calculators',
  'Air Conditioning': '/air-conditioning',
  'Heating Systems': '/heating',
  'Energy Efficiency': '/energy-efficiency',
  'Indoor Air Quality': '/air-quality',
  'Resources': '/articles',
};

const footerLinks = {
  'Calculators & Tools': [
    { label: 'AC BTU Calculator', href: '/air-conditioner-btu-calculator' },
    { label: 'AC Tonnage Calculator', href: '/ac-tonnage-calculator' },
    { label: 'SEER2 Savings Calculator', href: '/seer2-savings-calculator' },
    { label: 'Mini Split Size Calculator', href: '/mini-split-sizing-calculator' },
    { label: 'Furnace Size Calculator', href: '/furnace-sizing-calculator' },
    { label: 'Heat Pump Size Calculator', href: '/heat-pump-size-calculator' },
    { label: 'Water Heater Size Calculator', href: '/water-heater-sizing-calculator' },
    { label: 'Generator Size Calculator', href: '/what-size-generator-do-i-need' },
    { label: 'kWh Cost Calculator', href: '/kwh-cost-calculator' },
    { label: 'Wire Gauge Calculator', href: '/wire-gauge-chart' },
  ],
  'Air Conditioning': [
    { label: 'Mini Split Guide', href: '/what-is-a-mini-split' },
    { label: 'Best Mini Splits', href: '/best-mini-split-ac-units' },
    { label: 'Window AC Units', href: '/window-air-conditioners' },
    { label: 'Portable AC Guide', href: '/portable-air-conditioners' },
    { label: 'AC Troubleshooting', href: '/ac-troubleshooting-guide' },
    { label: 'AC Not Cooling', href: '/ac-not-cooling' },
    { label: 'Portable vs Window AC', href: '/portable-vs-window-ac' },
    { label: 'AC Maintenance', href: '/hvac-maintenance-checklist' },
    { label: 'Mini Split vs Central', href: '/mini-split-vs-central-air' },
    { label: 'AC Running Costs', href: '/how-much-does-mini-split-cost-to-run' },
  ],
  'Heating Systems': [
    { label: 'Furnace Guide', href: '/furnace-guide' },
    { label: 'Heat Pump Guide', href: '/heat-pump-guide' },
    { label: 'Space Heaters', href: '/space-heater-guide' },
    { label: 'Gas vs Electric', href: '/gas-vs-electric-heating-cost' },
    { label: 'Radiant Heating', href: '/radiant-floor-heating-pros-cons' },
    { label: 'Boiler vs Furnace', href: '/boiler-vs-furnace' },
    { label: 'Heat Pump vs Mini Split', href: '/heat-pump-vs-mini-split' },
    { label: 'Furnace Maintenance', href: '/furnace-maintenance' },
    { label: 'Heating Cost Calculator', href: '/heating-cost-calculator' },
    { label: 'Heat Pump vs Furnace', href: '/furnace-vs-heat-pump' },
  ],
  'Energy Efficiency': [
    { label: 'SEER2 Explained', href: '/seer2-rating-explained' },
    { label: 'AFUE Rating', href: '/afue-rating-explained' },
    { label: 'HSPF2 Rating', href: '/hspf-rating-explained' },
    { label: 'EER2 Rating', href: '/eer-rating-explained' },
    { label: 'COP Explained', href: '/heat-pump-cop-explained' },
    { label: 'MERV Ratings', href: '/merv-rating-chart' },
    { label: 'Tax Credits', href: '/seer-rating-tax-credits' },
    { label: 'Insulation R-Value Guide', href: '/insulation-r-value-guide' },
    { label: 'Energy Saving Tips', href: '/hvac-energy-saving-tips' },
    { label: 'Smart Thermostats', href: '/best-smart-thermostats' },
  ],
  'Indoor Air Quality': [
    { label: 'Air Purifiers', href: '/best-air-purifiers' },
    { label: 'Dehumidifiers', href: '/dehumidifier-guide' },
    { label: 'Humidifiers', href: '/best-humidifiers-for-large-rooms' },
    { label: 'Best HVAC Air Filters', href: '/best-hvac-air-filters' },
    { label: 'UV Light HVAC Systems', href: '/uv-light-hvac-systems' },
    { label: 'Allergen Control Guide', href: '/allergen-control-guide' },
    { label: 'Air Quality Testing', href: '/indoor-air-quality-testing' },
    { label: 'Mold Prevention', href: '/mold-prevention-guide' },
    { label: 'VOCs Guide', href: '/voc-in-home-sources' },
    { label: 'Ventilation Guide', href: '/whole-house-ventilation-systems' },
  ],
  'Resources': [
    { label: 'All Articles', href: '/articles' },
    { label: 'Buying Guides', href: '/buying-guides' },
    { label: 'How-To Guides', href: '/how-to' },
    { label: 'Troubleshooting', href: '/troubleshooting' },
    { label: 'HVAC Dictionary', href: '/hvac-dictionary' },
    { label: 'Cost Guides', href: '/cost-guides' },
    { label: 'Brand Reviews', href: '/brand-reviews' },
    { label: 'Editorial Policy', href: '/editorial-policy' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Trust Signals Bar */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-brand-400 mb-2" />
              <div className="text-white font-semibold">355 Guides</div>
              <div className="text-xs text-gray-400">Expert-Written Content</div>
            </div>
            <div className="flex flex-col items-center">
              <Calculator className="h-8 w-8 text-brand-400 mb-2" />
              <div className="text-white font-semibold">9 Calculators</div>
              <div className="text-xs text-gray-400">Free HVAC Tools</div>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-brand-400 mb-2" />
              <div className="text-white font-semibold">Editorially Independent</div>
              <div className="text-xs text-gray-400">No Affiliate Links</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className={category === 'Calculators & Tools' ? 'col-span-2 md:col-span-1' : ''}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                {category === 'Calculators & Tools' && <Calculator size={14} />}
                {category === 'Air Conditioning' && <Thermometer size={14} />}
                {category === 'Heating Systems' && <Wrench size={14} />}
                {category === 'Energy Efficiency' && <TrendingUp size={14} />}
                {category === 'Indoor Air Quality' && <Shield size={14} />}
                {category === 'Resources' && <BookOpen size={14} />}
                {category}
              </h3>
              <ul className="space-y-2">
                {links.slice(0, 8).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {links.length > 8 && (
                  <li>
                    <Link
                      href={CATEGORY_ROUTES[category] || '/articles'}
                      className="text-sm text-brand-400 hover:text-brand-300 transition-colors block font-medium"
                    >
                      View All →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-brand-600 p-1.5 rounded">
                  <Thermometer size={18} className="text-white" />
                </div>
                <span className="font-bold text-xl text-white">
                  HVAC<span className="text-brand-400">Base</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <span className="text-gray-600">|</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
            
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} HVAC Base. All rights reserved.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              <strong className="text-gray-400">Disclaimer:</strong> HVAC Base provides general information only. Always consult licensed HVAC professionals for system installation, repairs, and safety concerns. 
              Content is for educational purposes and should not replace professional advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
