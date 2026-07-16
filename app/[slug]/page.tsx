import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllSlugs, getRelatedArticles } from '@/lib/content';
import ArticleLayout from '@/components/layout/ArticleLayout';
import RelatedArticles from '@/components/ui/RelatedArticles';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { mdxComponents } from '@/lib/mdx-components';
import { getClusterRoute, getClusterDisplayName } from '@/lib/cluster-mapping';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = `https://www.hvacbase.org/${article.meta.slug}`;
  const ogImage = `${url}/opengraph-image`;

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: 'article',
      publishedTime: article.meta.datePublished,
      modifiedTime: article.meta.dateModified || article.meta.datePublished,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta.title,
      description: article.meta.description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 4);
  const clusterRoute = getClusterRoute(article.meta.cluster);
  const clusterName = getClusterDisplayName(article.meta.cluster);
  const schemas = [
    generateArticleSchema(article.meta),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: clusterName, url: `/${clusterRoute}` },
      { name: article.meta.title, url: `/${article.meta.slug}` },
    ]),
  ];

  return (
    <>
      <head>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <ArticleLayout meta={article.meta}>
        <div className="prose prose-lg max-w-none">
          <MDXRemote 
            source={article.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={{...mdxComponents, RelatedArticles: () => <RelatedArticles articles={related} />}}
          />
        </div>
      </ArticleLayout>
    </>
  );
}