import { ArticleMeta } from '@/lib/content';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface RelatedArticlesProps {
  articles: ArticleMeta[];
  title?: string;
}

export default function RelatedArticles({
  articles,
  title = 'Related Articles',
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="my-10 bg-gray-50 rounded-xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BookOpen size={20} />
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/${a.slug}/`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900 group-hover:text-brand-600 text-sm leading-tight">
                {a.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{a.contentType} • {a.readingTime}</p>
            </div>
            <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-500 flex-shrink-0 ml-2" />
          </Link>
        ))}
      </div>
    </section>
  );
}
