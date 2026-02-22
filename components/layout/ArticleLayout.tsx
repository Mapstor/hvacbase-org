import { ReactNode } from 'react';
import { ArticleMeta } from '@/lib/content';
import { Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: ReactNode;
}

export default function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  const clusterSlug = meta.cluster.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <Link href={`/${clusterSlug}/`} className="hover:text-brand-600">{meta.cluster}</Link>
        <span>/</span>
        <span className="text-gray-700 truncate max-w-xs">{meta.title}</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {meta.contentType}
          </span>
          {meta.role === 'pillar' && (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Complete Guide
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {meta.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          {meta.description}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <User size={14} />
            {meta.author || 'HVAC Base Team'}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            Updated {meta.dateModified ? new Date(meta.dateModified).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric'
            }) : 'Recently'}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {meta.readingTime}
          </span>
        </div>
      </header>

      {/* Article content */}
      <article className="prose max-w-none">
        {children}
      </article>
    </div>
  );
}
