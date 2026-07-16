# Metadata Template Bugs

## Confirmed live bugs (from ground-truth `.next/server/app/*.html`)

### Bug 1 — Every article emits GENERIC `twitter:title` and `twitter:description`

- **Scope**: 373/373 built pages (all articles + all static pages that don't override)
- **Live emitted values (verbatim from `ac-not-cooling.html`)**:
  - `twitter:title: HVAC Base — Data-Driven HVAC Guides & Calculators`
  - `twitter:description: Expert HVAC guides with interactive calculators and unbiased recommendations.`
- **Every article page has these SAME two strings** as its Twitter card content.

### Bug 2 — Every page emits `twitter:image: /og-image.svg`

- SVG format. Twitter/X, Facebook, Slack, LinkedIn, Discord, WhatsApp — most previewers reject SVG for OG image. Every share preview will fail with "image could not be loaded" or a blank preview card.

### Bug 3 — 366 pages emit EMPTY `og:image`

- Only 7 pages have `<meta property="og:image">` at all: index, about, contact, disclaimer, editorial-policy, privacy, terms — and even those show `/og-image.svg` (also broken; see Bug 2).
- The 353 articles + 6 hub pages emit nothing for `og:image`. Facebook/LinkedIn crawlers get no image URL at all — they fall back to first `<img>` in body, but the body has no images (see `assets.md`).

## Root cause — traced in code

### The article template

`app/[slug]/page.tsx:21-38`:

```tsx
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
      canonical: `https://www.hvacbase.org/${article.meta.slug}`,
    },
  };
}
```

The returned object sets:
- `title` (article title)
- `description` (article description)
- `openGraph`: only title, description, type, publishedTime, modifiedTime — **no `images` array**
- `alternates.canonical`
- **No `twitter` object at all**

### The sitewide default

`app/layout.tsx:16-37`:

```tsx
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://www.hvacbase.org',
  siteName: 'HVAC Base',
  title: 'HVAC Base — Your Comprehensive HVAC Knowledge Resource',
  description: 'Expert HVAC guides with 355 articles, 9 interactive calculators, ...',
  images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: '...' }],
},
twitter: {
  card: 'summary_large_image',
  title: 'HVAC Base — Data-Driven HVAC Guides & Calculators',
  description: 'Expert HVAC guides with interactive calculators and unbiased recommendations.',
  images: ['/og-image.svg'],
},
```

### How Next.js metadata merges

Next merges partial `Metadata` objects. When the article template returns `openGraph: { title, description, type, publishedTime, modifiedTime }`, Next replaces (not merges deeply) the layout's `openGraph` for those specific keys. Since the article's `openGraph` does not include `images`, the merged output DOES include `images` from the layout — HOWEVER, Next-14's actual behavior for `openGraph` is deep-merge with array replacement. In practice the emitted HTML shows `og:image` blank for articles, which suggests the merge is dropping the array. Empirical result on 366 pages: `og:image` missing entirely.

For `twitter`, since the article template returns no `twitter` object, the layout's `twitter` block is inherited whole. That's why every article shows the same generic Twitter title/description.

### `openGraph.images` per-article

Nothing sets it. Not layout (SVG default). Not article template (no images key). Not any MDX frontmatter (no `featuredImage` piped to `openGraph.images`). Not any component.

Even `featuredImage` frontmatter fields exist in `content.ts` `ArticleMeta` interface (line 25), but nothing consumes them in the article template's metadata generation.

## Fix summary (log only — do not apply in Phase 0)

1. Article template: add `twitter: { card: 'summary_large_image', title: article.meta.title, description: article.meta.description, images: [ogImageUrl] }` to `generateMetadata`.
2. Article template: add `openGraph.images` to `generateMetadata` with a per-article OG image URL.
3. Provide OG image URL — either:
   - Use `article.meta.featuredImage` if set (and add the actual files under `public/images/`)
   - Or generate dynamic OG images via `app/api/og/[slug]/route.tsx` (Next 14 supports this)
4. Convert `public/og-image.svg` to `public/og-image.png` (1200×630 PNG) and update layout defaults.
5. Static pages that inherit the layout Twitter fields should each set their own — see `metadata.md` for the 13 pages without canonical (same set will benefit from `twitter` overrides).

## Any per-page `openGraph.images` override with PNG/JPG anywhere?

Grep: `grep -rn "openGraph.*images\[" app/ components/` returns nothing. Grep for `featuredImage:` in MDX frontmatter yields 4 references (all pointing to files that don't exist in `public/images/`). No page currently emits a PNG or JPG for OG image.
