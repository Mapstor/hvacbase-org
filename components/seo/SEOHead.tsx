import { ArticleMeta } from '@/lib/content';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface SEOHeadProps {
  meta: ArticleMeta;
  additionalSchema?: object[];
}

export default function SEOHead({ meta, additionalSchema = [] }: SEOHeadProps) {
  const url = `https://www.hvacbase.org/${meta.slug}/`;
  
  // Map cluster names to actual route paths
  const getClusterPath = (cluster: string) => {
    const clusterMapping: Record<string, { name: string; path: string }> = {
      'ac-sizing-selection': { name: 'Air Conditioning', path: '/air-conditioning' },
      'energy-efficiency-ratings': { name: 'Energy Efficiency', path: '/energy-efficiency' },
      'air-conditioners': { name: 'Air Conditioning', path: '/air-conditioning' },
      'furnaces-heating': { name: 'Heating', path: '/heating' },
      'heat-pumps': { name: 'Heat Pumps', path: '/heat-pumps' },
      'indoor-air-quality': { name: 'Air Quality', path: '/air-quality' },
    };
    
    return clusterMapping[cluster] || { name: cluster, path: `/${cluster.toLowerCase().replace(/\s+/g, '-')}` };
  };
  
  const clusterInfo = getClusterPath(meta.cluster);
  const articleSchema = generateArticleSchema(meta);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: clusterInfo.name, url: clusterInfo.path },
    { name: meta.title, url: `/${meta.slug}/` },
  ]);

  const allSchemas = [articleSchema, breadcrumbSchema, ...additionalSchema];

  return (
    <>
      <title>{meta.title} | HVAC Base</title>
      <meta name="description" content={meta.description} />
      <meta name="author" content="Marko Visic" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="HVAC Base" />
      {meta.featuredImage && (
        <meta property="og:image" content={`https://www.hvacbase.org${meta.featuredImage}`} />
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
