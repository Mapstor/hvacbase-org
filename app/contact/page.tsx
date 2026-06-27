import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { AUTHOR_LINKEDIN } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact HVACBase',
  description:
    'Contact HVACBase: email info@hvacbase.org. Published by Moving Data Systems d.o.o., Smolnik 62, 2342 Ruše, Slovenia. Author/owner: Marko Visic, BSc Physics.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Contact HVACBase
        </h1>

        <div className="prose prose-lg max-w-none text-gray-800">
          <p>
            For questions, corrections, or feedback, email{' '}
            <a href="mailto:info@hvacbase.org" className="text-brand-600 hover:underline">
              info@hvacbase.org
            </a>
            . One inbox, monitored personally.
          </p>

          <h2>Publisher</h2>
          <p>
            HVACBase is published by <strong>Moving Data Systems d.o.o.</strong>
            <br />
            Smolnik 62
            <br />
            2342 Ruše
            <br />
            Slovenia
          </p>

          <h2>Author / owner</h2>
          <p>
            <strong>Marko Visic, BSc Physics</strong> — Faculty of Mathematics and
            Physics, University of Ljubljana. ·{' '}
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

          <h2>What to include in your email</h2>
          <ul>
            <li>A clear subject line describing the inquiry.</li>
            <li>The specific article or calculator URL if referencing site content.</li>
            <li>For corrections: the page, the value you believe is wrong, and a link to the primary source (AHRI Directory, ENERGY STAR, manufacturer spec sheet) where possible.</li>
          </ul>

          <h2>What HVACBase is not</h2>
          <p>
            HVACBase is an independent education site. We don&apos;t provide HVAC
            installation, repair, or emergency service. We don&apos;t recommend
            specific local contractors. Marko is a physicist, not a licensed HVAC
            contractor — nothing on the site is a substitute for a licensed
            professional for installation, sizing sign-off, repair, or safety work.
          </p>
        </div>

        <div className="mt-10">
          <a
            href="mailto:info@hvacbase.org"
            className="inline-flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email info@hvacbase.org
          </a>
        </div>
      </div>
    </div>
  );
}
