import { Metadata } from 'next';
import { AUTHOR_LINKEDIN } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy — HVACBase',
  description:
    'How HVACBase sources specifications (AHRI Directory, ENERGY STAR, manufacturer documentation), the verified-or-omitted rule, what we do not do (no testing lab, no first-person measurements, no affiliate links), and the corrections process.',
  alternates: { canonical: 'https://www.hvacbase.org/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy — HVACBase',
    description: 'How HVACBase sources specifications, the verified-or-omitted rule, and the corrections process.',
    url: 'https://www.hvacbase.org/editorial-policy',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'HVAC Base — Editorial Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Policy — HVACBase',
    description: 'How HVACBase sources specifications, the verified-or-omitted rule, and the corrections process.',
    images: ['/opengraph-image'],
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Editorial Policy
        </h1>

        <div className="prose prose-lg max-w-none text-gray-800">
          <h2>Who writes HVACBase</h2>
          <p>
            HVACBase is researched and written by <strong>Marko Visic, BSc Physics</strong>{' '}
            (Faculty of Mathematics and Physics, University of Ljubljana). He is the
            site&apos;s sole author and editor. He is a physicist specializing in
            thermodynamics and heat transfer — <strong>not a licensed HVAC contractor</strong> —
            and the site reflects that: clear, physics-grounded explanation built on
            verified manufacturer and certification data.
          </p>

          <h2>How we source specifications</h2>
          <p>
            All efficiency ratings and technical specifications are taken from primary
            sources: the <strong>AHRI Directory</strong> (ahridirectory.org),{' '}
            <strong>ENERGY STAR</strong>, and manufacturer documentation. Where relevant
            we cite the AHRI Certified Reference Number.{' '}
            <strong>
              If a figure cannot be verified against a primary source, we do not publish it.
            </strong>{' '}
            When we lack the certified data to make a claim, we say so plainly rather
            than estimate.
          </p>

          <h2>What we don&apos;t do</h2>
          <p>
            We do not run a testing laboratory, and we never claim first-hand testing
            or measurements we didn&apos;t perform. We do not accept payment for reviews
            or rankings, and the site carries <strong>no affiliate links</strong> —
            recommendations are based only on verified specifications and the
            underlying physics.
          </p>

          <p>
            The site may display third-party programmatic advertisements. When such
            advertisements appear, they are served by ad networks and placed by those
            networks, not by us. Advertising does not influence what we cover, how we
            rank products, or which specifications we cite. Data processing associated
            with advertising is described in the{' '}
            <a href="/privacy" className="text-brand-600 hover:underline">
              privacy policy
            </a>
            .
          </p>

          <h2>Corrections</h2>
          <p>
            Specifications change as manufacturers update equipment and as standards
            evolve (for example, the SEER → SEER2 transition). If you find an error,
            email{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">
              info@hvacbase.org
            </a>{' '}
            and we&apos;ll verify against the primary source and correct it.
          </p>

          <p className="text-sm text-gray-500 mt-12">
            <em>Last updated: June 26, 2026.</em> · Author:{' '}
            <a
              href={AUTHOR_LINKEDIN}
              target="_blank"
              rel="me noopener"
              className="text-brand-600 hover:underline"
            >
              Marko Visic on LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
