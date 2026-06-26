import { ArticleMeta } from './content';

const SITE_URL = 'https://www.hvacbase.org';
const SITE_NAME = 'HVAC Base';
// {{TODO-IDENTITY}} — placeholder until real Person author is wired in
// next gate. Schema falls back to the publisher Organization so Article
// validation still passes.
const AUTHOR_NAME = SITE_NAME;
const LOGO_URL = `${SITE_URL}/images/logo.png`;

export function generateArticleSchema(meta: ArticleMeta) {
  // Calculate word count from reading time (assuming ~200 words per minute)
  const wordCount = meta.readingTime ? parseInt(meta.readingTime) * 200 : 1000;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: meta.featuredImage ? `${SITE_URL}${meta.featuredImage}` : LOGO_URL,
    author: {
      '@type': 'Organization',
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: LOGO_URL },
    },
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
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
