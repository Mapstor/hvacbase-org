import { Metadata } from 'next';
import Image from 'next/image';
import { generatePersonSchema, AUTHOR_LINKEDIN } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About HVACBase',
  description:
    'HVACBase is written by Marko Visic, a physicist (BSc, University of Ljubljana) specializing in thermodynamics and heat transfer. The site explains HVAC from first principles, using manufacturer documentation and AHRI-certified specifications. Published by Moving Data Systems d.o.o., Slovenia.',
  alternates: { canonical: 'https://www.hvacbase.org/about' },
  openGraph: {
    title: 'About HVACBase',
    description: 'HVACBase is written by Marko Visic, a physicist specializing in thermodynamics and heat transfer. Published by Moving Data Systems d.o.o.',
    url: 'https://www.hvacbase.org/about',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'About HVAC Base' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About HVACBase',
    description: 'HVACBase is written by Marko Visic, a physicist specializing in thermodynamics and heat transfer.',
    images: ['/opengraph-image'],
  },
};

export default function AboutPage() {
  const personSchema = generatePersonSchema();

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          About HVACBase
        </h1>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
          <Image
            src="/authors/marko-visic-large.jpg"
            alt="Marko Visic, founder of HVACBase"
            width={160}
            height={160}
            className="rounded-full flex-shrink-0"
            priority
          />
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">
              Founder &amp; author
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Marko Visic, BSc Physics
            </h2>
            <p className="text-gray-600">
              Faculty of Mathematics and Physics, University of Ljubljana
            </p>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            HVACBase is written by <strong>Marko Visic</strong>, a physicist (BSc,
            Faculty of Mathematics and Physics, University of Ljubljana). While studying
            thermodynamics, he became interested in heat-transfer applications — the
            equations that explain how heat pumps, air conditioners, insulation, and
            airflow behave in a real home. HVACBase grew out of that interest: a site
            that starts from the physics of heat transfer and connects it to practical
            HVAC decisions, backed by primary-sourced specifications.
          </p>

          <h2>Why this site exists</h2>
          <p>
            Most HVAC information online tells you <em>which</em> unit to buy. HVACBase
            tries to explain <em>why</em> — the thermodynamics underneath the spec
            sheet — so you can reason about your own home: your climate, your heating
            load, your cooling load. The goal is to help any homeowner understand how
            HVAC works and which system actually fits their situation, and to give
            people enough well-sourced grounding to understand the systems they
            already own.
          </p>

          <h2>How we source</h2>
          <p>
            Every specification on this site comes from manufacturer documentation,
            the <strong>AHRI Directory</strong>, or <strong>ENERGY STAR</strong>. Where
            a number can&apos;t be verified against a primary source, it isn&apos;t
            published. We don&apos;t run a testing lab and we don&apos;t claim to —
            our value is clear explanation of verified data, not invented measurements.
          </p>

          <h2>What this site is not</h2>
          <p>
            HVACBase is an independent education site. Marko is a physicist,{' '}
            <strong>not a licensed HVAC contractor</strong> — nothing here is a
            substitute for a licensed professional for installation, sizing sign-off,
            repair, or safety work. Always have equipment installed and verified by a
            qualified contractor.
          </p>

          <h2>Publisher</h2>
          <p>
            HVACBase is published by <strong>Moving Data Systems d.o.o.</strong>,
            Smolnik 62, 2342 Ruše, Slovenia. Contact:{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">
              info@hvacbase.org
            </a>{' '}
            ·{' '}
            <a
              href={AUTHOR_LINKEDIN}
              target="_blank"
              rel="me noopener"
              className="text-brand-600 hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
