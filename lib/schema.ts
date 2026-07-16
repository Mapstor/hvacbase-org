import { ArticleMeta } from './content';

const SITE_URL = 'https://www.hvacbase.org';
const SITE_NAME = 'HVAC Base';
const LOGO_URL = `${SITE_URL}/logo.png`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Real author/owner. Single named author across the site.
export const AUTHOR_NAME = 'Marko Visic';
export const AUTHOR_URL = `${SITE_URL}/about`;
export const AUTHOR_IMAGE = `${SITE_URL}/authors/marko-visic.jpg`;
export const AUTHOR_JOB_TITLE = 'Founder & Author';
export const AUTHOR_DESCRIPTION =
  'Physicist (BSc, University of Ljubljana) specializing in thermodynamics and heat transfer; founder of HVACBase, a physics-first HVAC education site sourced from manufacturer and AHRI-certified specifications.';
export const AUTHOR_ALUMNI = 'Faculty of Mathematics and Physics, University of Ljubljana';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/marko-visic/';

// Real publishing entity.
export const PUBLISHER_NAME = 'Moving Data Systems d.o.o.';
export const PUBLISHER_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Smolnik 62',
  postalCode: '2342',
  addressLocality: 'Ruše',
  addressCountry: 'SI',
};

/**
 * Person JSON-LD node for the real author. Used as Article.author across
 * the site and emitted in full on the About page (with @id so other nodes
 * can reference it).
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${AUTHOR_URL}#marko-visic`,
    name: AUTHOR_NAME,
    url: AUTHOR_URL,
    image: AUTHOR_IMAGE,
    jobTitle: AUTHOR_JOB_TITLE,
    description: AUTHOR_DESCRIPTION,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: AUTHOR_ALUMNI,
    },
    knowsAbout: [
      'HVAC systems',
      'Thermodynamics',
      'Heat transfer',
      'Heat pumps',
      'Air conditioning',
      'Building insulation',
      'Airflow',
    ],
    worksFor: {
      '@type': 'Organization',
      name: PUBLISHER_NAME,
      address: PUBLISHER_ADDRESS,
    },
    sameAs: [AUTHOR_LINKEDIN],
  };
}

export function generateArticleSchema(meta: ArticleMeta) {
  // Calculate word count from reading time (assuming ~200 words per minute)
  const wordCount = meta.readingTime ? parseInt(meta.readingTime) * 200 : 1000;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: `${SITE_URL}/${meta.slug}/opengraph-image`,
    author: {
      '@type': 'Person',
      '@id': `${AUTHOR_URL}#marko-visic`,
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
      image: AUTHOR_IMAGE,
      sameAs: [AUTHOR_LINKEDIN],
    },
    publisher: { '@id': ORGANIZATION_ID },
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${meta.slug}`,
    },
    articleSection: meta.cluster,
    keywords: meta.cluster.replace(/-/g, ' ') + ', hvac, ' + (meta.contentType || ''),
    wordCount: wordCount,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.prose p:first-of-type', 'h1', 'h2']
    }
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: { '@type': 'ImageObject', url: `${SITE_URL}${step.image}` },
      }),
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: PUBLISHER_NAME,
    legalName: PUBLISHER_NAME,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: LOGO_URL, width: 512, height: 512 },
    address: PUBLISHER_ADDRESS,
  };
}
