# hvacbase.org

Data-driven HVAC guides, calculators, and comparisons.

## Tech Stack
- **Next.js 14** (App Router)
- **React 18** (Interactive tools)
- **Tailwind CSS** (Styling)
- **MDX** (Content)
- **Vercel** (Hosting)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/              # Next.js pages & layouts
├── components/
│   ├── layout/       # Header, Footer, ArticleLayout
│   ├── seo/          # SEO Head, schema generators
│   ├── tools/        # Calculators (BTU, SEER, etc.)
│   └── ui/           # TOC, FAQ, Callout, ComparisonTable
├── content/          # MDX articles organized by cluster
├── docs/             # Style guide, component index
├── lib/              # Content loader, schema generators
├── public/           # Static assets
└── styles/           # Global CSS
```

## Content Production
See `docs/STYLE_GUIDE.md` for writing guidelines and `docs/COMPONENTS.md` for available components.

## Deploy
Connected to Vercel. Push to `main` to deploy.
