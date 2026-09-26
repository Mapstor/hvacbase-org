import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | HVACBase',
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: '/calculators', label: 'HVAC Calculators' },
  { href: '/articles', label: 'All Guides' },
  { href: '/air-conditioner-btu-calculator', label: 'AC BTU Calculator' },
  { href: '/ac-not-cooling', label: 'AC Not Cooling' },
  { href: '/furnace-guide', label: 'Furnace Guide' },
  { href: '/heat-pump-guide', label: 'Heat Pump Guide' },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl font-bold text-brand-600 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">This page doesn&apos;t exist or has moved</h1>
        <p className="text-gray-600 mb-8">
          The page you were looking for isn&apos;t here. Try one of these instead:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block bg-white border border-gray-200 rounded-lg px-4 py-3 text-brand-700 font-medium hover:border-brand-300 hover:shadow-sm transition-all"
            >
              {l.label} →
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
