import { ArticleMeta } from '@/lib/content';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface SEOHeadProps {
  meta: ArticleMeta;
  additionalSchema?: object[];
}

export default function SEOHead({ meta, additionalSchema = [] }: SEOHeadProps) {
  const url = `https://hvacbase.org/${meta.slug}/`;
  const articleSchema = generateArticleSchema(meta);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: meta.cluster, url: `/${meta.cluster.toLowerCase().replace(/\s+/g, '-')}/` },
    { name: meta.title, url: `/${meta.slug}/` },
  ]);

  const allSchemas = [articleSchema, breadcrumbSchema, ...additionalSchema];

  return (
    <>
      <title>{meta.title} | HVAC Base</title>
      <meta name="description" content={meta.description} />
      <meta name="author" content={meta.author || 'HVAC Base Editorial Team'} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="HVAC Base" />
      {meta.featuredImage && (
        <meta property="og:image" content={`https://hvacbase.org${meta.featuredImage}`} />
      )}
      <meta property="article:published_time" content={meta.datePublished} />
      <meta property="article:modified_time" content={meta.dateModified} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />

      {/* Schema markup */}
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
