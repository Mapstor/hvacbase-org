import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDir = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  role: 'pillar' | 'hub' | 'spoke';
  priority: 'P1' | 'P2' | 'P3';
  contentType: string;
  datePublished: string;
  dateModified?: string;
  dateUpdated?: string;
  author?: string;
  readingTime: string;
  tableOfContents?: boolean;
  faqSchema?: boolean;
  relatedArticles?: string[];
  externalLinks?: { text: string; url: string }[];
  featuredImage?: string;
  featuredImageAlt?: string;
}

export interface Article {
  meta: ArticleMeta;
  content: string;
  rawContent: string;
}

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getArticleBySlug(slug: string): Article | null {
  const files = getAllMdxFiles(contentDir);
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      // Remove import statements and first H1 from content
      let cleanContent = content
        .replace(/^import\s+{[^}]+}\s+from\s+['"][^'"]+['"]\s*\n*/gm, '')
        .replace(/^#\s+.+$/m, ''); // Remove first H1
      
      const stats = readingTime(cleanContent);
      return {
        meta: {
          ...data,
          dateModified: data.dateModified || data.dateUpdated || data.datePublished,
          readingTime: stats.text,
        } as ArticleMeta,
        content: cleanContent,
        rawContent: raw,
      };
    }
  }
  return null;
}

export function getAllArticles(): Article[] {
  const files = getAllMdxFiles(contentDir);
  return files.map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    
    // Remove import statements and first H1 from content
    let cleanContent = content
      .replace(/^import\s+{[^}]+}\s+from\s+['"][^'"]+['"]\s*\n*/gm, '')
      .replace(/^#\s+.+$/m, ''); // Remove first H1
    
    const stats = readingTime(cleanContent);
    return {
      meta: {
        ...data,
        dateModified: data.dateModified || data.dateUpdated || data.datePublished,
        readingTime: stats.text,
      } as ArticleMeta,
      content: cleanContent,
      rawContent: raw,
    };
  });
}

export function getArticlesByCluster(cluster: string): Article[] {
  return getAllArticles().filter((a) => a.meta.cluster === cluster);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.meta.slug);
}

export function getRelatedArticles(slug: string, limit = 5): ArticleMeta[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  const all = getAllArticles();
  const sameCluster = all
    .filter((a) => a.meta.cluster === article.meta.cluster && a.meta.slug !== slug)
    .sort((a, b) => {
      const prio = { P1: 0, P2: 1, P3: 2 };
      return (prio[a.meta.priority] || 2) - (prio[b.meta.priority] || 2);
    });
  return sameCluster.slice(0, limit).map((a) => a.meta);
}
