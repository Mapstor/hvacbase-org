'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Thermometer, Zap, Wind, Flame, Droplets } from 'lucide-react';

const navItems = [
  { label: 'Air Conditioning', href: '/air-conditioning/', icon: Wind },
  { label: 'Heating', href: '/heating/', icon: Flame },
  { label: 'Heat Pumps', href: '/heat-pumps/', icon: Thermometer },
  { label: 'Energy Efficiency', href: '/energy-efficiency/', icon: Zap },
  { label: 'Air Quality', href: '/air-quality/', icon: Droplets },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <Thermometer size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 group-hover:text-brand-600 transition-colors">
              HVAC<span className="text-brand-600">Base</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
