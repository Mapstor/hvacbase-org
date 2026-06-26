import Image from 'next/image';
import Link from 'next/link';
import {
  AUTHOR_NAME,
  AUTHOR_IMAGE,
  AUTHOR_LINKEDIN,
} from '@/lib/schema';

const AUTHOR_BYLINE = `${AUTHOR_NAME}, BSc Physics`;
const AUTHOR_PHOTO_ALT = `${AUTHOR_NAME}, founder of HVACBase`;
const AUTHOR_PHOTO_SRC = '/authors/marko-visic.jpg';
const AUTHOR_BIO =
  'Marko Visic holds a BSc in Physics from the Faculty of Mathematics and Physics, University of Ljubljana, where he focused on thermodynamics and heat transfer — the physics behind how heat pumps, air conditioners, insulation, and airflow actually work. He founded HVACBase to explain HVAC from first principles, using manufacturer documentation and AHRI-certified specifications.';

interface AuthorBoxProps {
  variant?: 'inline' | 'card';
}

/**
 * Single author component for the real owner (Marko Visic).
 * - `variant="inline"`: compact byline used in the article header (photo + name + LinkedIn icon).
 * - `variant="card"` (default): full author card used in the article footer
 *   (photo + byline + bio + "More about the author" + LinkedIn link).
 *
 * The bio text and links are sourced from the locked Gate-3 identity copy.
 * Do not edit the bio in this file directly; update GATE3_IDENTITY_LOCKED.md
 * and propagate from there.
 */
export default function AuthorBox({ variant = 'card' }: AuthorBoxProps) {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-2">
        <Image
          src={AUTHOR_PHOTO_SRC}
          alt={AUTHOR_PHOTO_ALT}
          width={28}
          height={28}
          className="rounded-full"
        />
        <Link href="/about" className="font-medium text-gray-700 hover:text-brand-600">
          {AUTHOR_BYLINE}
        </Link>
        <a
          href={AUTHOR_LINKEDIN}
          target="_blank"
          rel="me noopener"
          className="text-gray-400 hover:text-brand-600"
          aria-label={`${AUTHOR_NAME} on LinkedIn`}
        >
          LinkedIn
        </a>
      </span>
    );
  }

  return (
    <aside
      className="mt-12 border-t border-gray-200 pt-8"
      aria-label={`About the author: ${AUTHOR_NAME}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <Image
          src={AUTHOR_PHOTO_SRC}
          alt={AUTHOR_PHOTO_ALT}
          width={96}
          height={96}
          className="rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">About the author</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{AUTHOR_BYLINE}</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{AUTHOR_BIO}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/about" className="text-brand-600 font-medium hover:underline">
              More about the author →
            </Link>
            <a
              href={AUTHOR_LINKEDIN}
              target="_blank"
              rel="me noopener"
              className="text-brand-600 font-medium hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
