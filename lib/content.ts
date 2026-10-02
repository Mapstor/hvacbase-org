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
  faqData?: { question: string; answer: string }[];
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
    // Skip directories/files whose name starts with underscore.
    // Convention: _archived-product-pages/ holds MDX kept in-repo for history
    // but excluded from routes, sitemap, and audit.
    if (entry.name.startsWith('_')) continue;
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
      // Extract FAQ data from content if present
      let faqData: { question: string; answer: string }[] | undefined;
      const faqMatch = content.match(/export\s+const\s+faqData\s*=\s*\[([\s\S]*?)\]/);
      if (faqMatch) {
        try {
          const faqContent = faqMatch[1];
          // Match { question: "..." | '...', answer: "..." | '...' } — allows
          // apostrophes inside double-quoted strings and vice versa, and
          // multi-line answer/question bodies (character class matches \n).
          const faqItems = faqContent.match(/\{\s*question:\s*(?:"[^"]+"|'[^']+')\s*,\s*answer:\s*(?:"[^"]+"|'[^']+')\s*\}/g);
          if (faqItems) {
            faqData = faqItems.map(item => {
              const qMatch = item.match(/question:\s*(?:"([^"]+)"|'([^']+)')/);
              const aMatch = item.match(/answer:\s*(?:"([^"]+)"|'([^']+)')/);
              return {
                question: qMatch ? (qMatch[1] || qMatch[2] || '') : '',
                answer: aMatch ? (aMatch[1] || aMatch[2] || '') : ''
              };
            });
          }
        } catch (e) {
          // If parsing fails, we'll skip FAQ data
        }
      }
      
      // Remove import statements and first H1 from content
      let cleanContent = content
        .replace(/^import\s+{[^}]+}\s+from\s+['"][^'"]+['"]\s*\n*/gm, '')
        .replace(/^export\s+const\s+faqData\s*=\s*\[[\s\S]*?\]\n*/gm, '')
        .replace(/^#\s+.+$/m, ''); // Remove first H1
      
      const stats = readingTime(cleanContent);
      return {
        meta: {
          ...data,
          dateModified: data.dateModified || data.dateUpdated || data.datePublished,
          readingTime: stats.text,
          faqData: faqData,
        } as ArticleMeta,
        content: cleanContent,
        rawContent: raw,
      };
    }
  }
  return null;
}

function stripFaqMd(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // markdown link -> its text
    .replace(/[*_`#>]/g, '')                  // bold/italic/code/heading/quote marks
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Pull Q&A pairs out of a markdown "## Frequently asked questions" section so the
 * article page can emit FAQPage JSON-LD. Questions are bold-only lines
 * (`**...?**`) or H3-H6 headings ending in "?"; the answer is the text up to the
 * next question, the next "## " section, or a JSX component block. Pages that use
 * the <FAQ> component (which emits its own FAQPage) have no such markdown heading,
 * so this returns [] for them and nothing is double-emitted.
 */
export function extractFaqFromMarkdown(content: string): { question: string; answer: string }[] {
  const m = content.match(/^##\s+Frequently asked questions\s*$/im);
  if (!m || m.index === undefined) return [];
  let section = content.slice(m.index + m[0].length);
  const end = section.match(/^##\s+|^<[A-Z]/m);
  if (end && end.index !== undefined) section = section.slice(0, end.index);

  const items: { question: string; answer: string }[] = [];
  let question: string | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (question) {
      const answer = stripFaqMd(buf.join(' '));
      if (answer) items.push({ question, answer });
    }
    buf = [];
  };
  for (const line of section.split('\n')) {
    const t = line.trim();
    const mb = t.match(/^\*\*(.+?\?)\*\*$/);
    const mh = t.match(/^#{3,6}\s+(.+\?)\s*$/);
    if (mb || mh) {
      flush();
      question = (mb ? mb[1] : mh![1]).trim();
    } else if (question) {
      buf.push(t);
    }
  }
  flush();
  return items;
}

export function getAllArticles(): Article[] {
  const files = getAllMdxFiles(contentDir);
  return files
    .map((file) => {
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
    })
    // Guard: skip MDX files without a slug in frontmatter. Prevents /undefined
    // links, sitemap poisoning, and RSC serialization failures downstream. Any
    // MDX without a slug is either a WIP orphan or a broken frontmatter block
    // that needs manual repair.
    .filter((a) => typeof a.meta.slug === 'string' && a.meta.slug.length > 0);
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
