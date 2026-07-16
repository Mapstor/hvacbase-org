# Assets — Performance / Static-Asset Inventory

## Full `public/` file tree

```
public/
├── BingSiteAuth.xml
├── authors/
│   ├── marko-visic.jpg
│   └── marko-visic-large.jpg
├── favicon.svg
├── google12f8c2f9c03913a3.html
├── og-image.svg
├── robots.txt
├── site.webmanifest
└── sitemap.xml
```

No `public/images/` directory. No `public/data/` directory. Nothing else.

## Referenced but MISSING assets

Every one of these is referenced from source but not present in `public/`:

| Asset | Source refs |
|---|---|
| `/apple-touch-icon.png` | `app/layout.tsx:44` (metadata icons.apple), `app/layout.tsx:69` (head link tag) |
| `/favicon.ico` | `app/layout.tsx:41` (metadata icons.icon), `app/layout.tsx:68` (head link) |
| `/images/logo.png` | `lib/schema.ts:5` — used as `Article.image` fallback AND `Article.publisher.logo.url` on every one of 353 article schemas |
| `/images/heat-pump-vs-mini-split-comparison.jpg` | `content/heat-pumps/heat-pump-vs-mini-split.mdx:13` (featuredImage) |
| `/images/hvac-allergen-control-guide.jpg` | `content/air-quality/allergen-control-guide.mdx:13` (featuredImage) |
| `/images/insulation-r-value-guide.jpg` | `content/insulation/insulation-r-value-guide.mdx:13` (featuredImage) |
| `/images/uv-light-hvac-systems.jpg` | `content/air-quality/uv-light-hvac-systems.mdx:13` (featuredImage) |

### Impact

- **Article schema `image` and `publisher.logo`**: Both point to `/images/logo.png` which does not exist. Every article's schema fails asset validation → Article/Publisher rich-result eligibility likely denied sitewide.
- **`apple-touch-icon.png`**: 180x180 icon missing. Browsers ignore silently, but iOS home-screen icon fallback goes to favicon.
- **`favicon.ico`**: The `.ico` fallback is missing (favicon.svg is present). Older browsers get 404 on favicon.ico. Not a ranking issue but a broken-network log.
- **4 article `featuredImage` refs**: These 4 articles will emit `og:image` pointing to files that 404. But since the article template doesn't override `openGraph.images` anyway (it doesn't set `openGraph.images` — see `meta_bugs.md`), the featuredImage frontmatter is currently ignored. So these are dormant bugs; they'll surface once the template starts using featuredImage.

## OG image format status

- **Layout default `og:image`: `/og-image.svg`** — SVG format.
- **Layout default `twitter:image`: `/og-image.svg`**.
- **Every article page emits `twitter:image: /og-image.svg`** (373/373 built pages).
- **Every article page emits empty `og:image`** because `app/[slug]/page.tsx` overrides `openGraph` without setting `images` (Next.js merges partial objects; the images key is dropped).
- **7 static pages emit `og:image: /og-image.svg`** (home, about, contact, disclaimer, editorial-policy, privacy, terms).

**Renderer compatibility**: Facebook, Twitter/X, LinkedIn, Slack, Discord, WhatsApp — all either reject or unreliably render SVG as OG image. Recommended format is PNG or JPG at 1200×630 with under 8MB. The site has zero PNG/JPG OG images anywhere.

## Zero inline images across content/

Total inline images across 355 MDX articles: **0** (confirmed via regex on `!\[.*?\]\(`, `<img\b`, `<Image\b`).

Consequence:
- No product images on brand reviews
- No wiring diagrams on electrical how-to
- No SEER-vs-SEER2 comparison charts on ratings articles
- No thermal-imaging or airflow diagrams on troubleshooting articles
- No original data visualizations anywhere
- All `og:image` fallbacks would fail even if the template was fixed to consume `featuredImage` — because no article ships a real featuredImage file

This directly violates the `portfolio-page-quality` skill's "original data visualization" bar. The site's content is 100% prose + tables + FAQ blocks.

## `<Image>` components — usage

Grep for `<Image` in components: used in `AuthorBox.tsx` (author avatar) and `about/page.tsx` (large author photo). Both provide `width` and `height` per Next requirements.

No content-side `<Image>` usage at all.

## Oversized files

Not applicable — the only images in the repo are the two author JPGs. Their file sizes (spot check):

- `/authors/marko-visic.jpg` — small (author avatar; reasonable)
- `/authors/marko-visic-large.jpg` — used on about page only; presumed reasonable

No videos, no oversized static content.

## Perf-related recommendations (Phase 0 log only, no action here)

1. Add `public/logo.png` (1×1 PNG or actual logo at 200×200 or 512×512) — schema.ts references this on every page
2. Add `public/favicon.ico` (32x32 icon)
3. Add `public/apple-touch-icon.png` (180x180)
4. Add real `public/og-image.png` (1200x630 branded) and switch layout defaults from `.svg` to `.png`
5. Consider per-article `featuredImage` OG image generation (dynamic OG API route)
6. Add at least hero images to top-priority articles (~20 pillar/hub pages) as a first content-density wave
