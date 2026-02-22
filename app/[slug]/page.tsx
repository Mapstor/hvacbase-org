import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getArticleBySlug, getAllSlugs, getRelatedArticles } from '@/lib/content';
import ArticleLayout from '@/components/layout/ArticleLayout';
import RelatedArticles from '@/components/ui/RelatedArticles';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schema';
import { mdxComponents } from '@/lib/mdx-components';
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

  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      type: 'article',
      publishedTime: article.meta.datePublished,
      modifiedTime: article.meta.dateModified || article.meta.datePublished,
    },
    alternates: {
      canonical: `https://hvacbase.org/${article.meta.slug}/`,
    },
  };
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 4);
  const schemas = [
    generateArticleSchema(article.meta),
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: article.meta.cluster, url: `/${article.meta.cluster.toLowerCase().replace(/\s+/g, '-')}/` },
      { name: article.meta.title, url: `/${article.meta.slug}/` },
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