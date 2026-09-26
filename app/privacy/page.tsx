import Link from 'next/link';
import { Shield, Database, Cookie, Scale, Globe, Clock, UserCheck, FileText, Mail } from 'lucide-react';
import type { Metadata } from 'next';
import CookieSettingsButton from '@/components/CookieSettingsButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | HVACBase',
  description:
    'How HVACBase handles data: Google Analytics (consent-based in the EEA/UK/Switzerland), hosting logs, cookies, legal bases, processors, retention, and your GDPR rights.',
  alternates: { canonical: 'https://www.hvacbase.org/privacy' },
  openGraph: {
    title: 'Privacy Policy | HVACBase',
    description: 'How HVACBase handles data and your privacy rights.',
    url: 'https://www.hvacbase.org/privacy',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Base | Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | HVACBase',
    description: 'How HVACBase handles data and your privacy rights.',
    images: ['/opengraph-image'],
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = 'September 26, 2026';

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-gray-700 to-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-300">Last updated: {lastUpdated}</p>
          <p className="text-gray-200 mt-4">
            This policy explains, in plain language, what data HVACBase collects and why. The site is
            informational: it publishes HVAC guides and calculators. It shows no advertising and has no affiliate links.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Controller */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Data controller</h2>
          </div>
          <p className="text-gray-700">
            HVACBase is published by <strong>Moving Data Systems d.o.o.</strong>, Smolnik 62, 2342 Ruše, Slovenia.
            For any privacy question or request, email{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">info@hvacbase.org</a>.
          </p>
        </section>

        {/* What we collect */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">What we collect</h2>
          </div>
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li>
              <strong>Google Analytics (GA4) usage data:</strong> pages viewed, device and browser type, approximate
              location (derived from IP, not stored as a precise address), and the referring site. In the EEA, the UK
              and Switzerland this is collected <strong>only after you consent</strong> via the cookie banner. Elsewhere
              it is collected by default; you can opt out any time through <strong>Cookie settings</strong> in the footer.
            </li>
            <li>
              <strong>Hosting logs:</strong> our host keeps standard server logs (such as IP address and request time)
              for security and reliable operation.
            </li>
            <li>
              <strong>Anything you email us:</strong> if you contact info@hvacbase.org, we receive whatever you send and
              use it only to reply.
            </li>
          </ul>
          <p className="text-gray-700 mt-3">
            The calculators run in your browser; we do not store the numbers you type in.
          </p>
        </section>

        {/* Cookies */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
          </div>
          <ul className="space-y-3 text-gray-700 list-disc pl-5">
            <li>
              <strong>Google Analytics cookies</strong> (<code>_ga</code> and <code>_ga_&lt;container&gt;</code>): set in
              the EEA, the UK and Switzerland <strong>only after consent</strong>, and by default in other regions.
            </li>
            <li>
              <strong>Consent-choice cookies</strong> (<code>hvac_consent</code> and <code>hvac_region</code>): remember
              your analytics choice and whether the banner applies to your region.
            </li>
          </ul>
          <p className="text-gray-700 mt-3">
            There are <strong>no advertising cookies</strong> and no advertising networks on this site.
          </p>
        </section>

        {/* Legal basis */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Legal basis (GDPR)</h2>
          </div>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li><strong>Consent</strong> for analytics in the EEA, the UK and Switzerland.</li>
            <li><strong>Legitimate interest</strong> for security and operational server logs.</li>
          </ul>
        </section>

        {/* Processors & transfers */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Processors and international transfers</h2>
          </div>
          <p className="text-gray-700">
            We use <strong>Google</strong> (Analytics) and <strong>Vercel</strong> (hosting). These providers may process
            data in the United States. Such transfers rely on appropriate safeguards, such as the EU-U.S. Data Privacy
            Framework or the European Commission&apos;s standard contractual clauses.
          </p>
        </section>

        {/* Retention */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Retention</h2>
          </div>
          <p className="text-gray-700">
            Google Analytics data is kept for the retention period set in our Google Analytics account. Server logs are
            retained by our host for the period needed for security and operations.
          </p>
        </section>

        {/* Rights */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your rights</h2>
          </div>
          <p className="text-gray-700 mb-3">Under the GDPR you have the right to:</p>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>access the personal data we hold about you;</li>
            <li>have inaccurate data corrected (rectification);</li>
            <li>have your data erased;</li>
            <li>restrict or object to processing;</li>
            <li>data portability;</li>
            <li>withdraw analytics consent at any time, via <strong>Cookie settings</strong> in the footer.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            To exercise any right, email{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">info@hvacbase.org</a>. You also
            have the right to complain to the Information Commissioner of the Republic of Slovenia
            (Informacijski pooblaščenec).
          </p>
        </section>

        {/* Changes */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Changes to this policy</h2>
          </div>
          <p className="text-gray-700">
            If this changes, we will update this page and its date. The site does not currently show advertising; this
            policy will be updated before any advertising is introduced.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl font-bold text-gray-900">Contact</h2>
          </div>
          <p className="text-gray-700">
            Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia. Email{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">info@hvacbase.org</a>. You can
            review or change your analytics choice any time with{' '}
            <span className="text-brand-600"><CookieSettingsButton /></span>.
          </p>
        </section>
      </div>
    </div>
  );
}
