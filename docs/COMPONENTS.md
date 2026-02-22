# HVAC Base — Component Index

Quick reference for all available components when writing articles.

## UI Components

| Component | Path | Usage |
|-----------|------|-------|
| `TableOfContents` | `@/components/ui/TableOfContents` | Auto-generated TOC from H2/H3 headings |
| `FAQ` | `@/components/ui/FAQ` | Accordion FAQ with built-in schema markup |
| `ComparisonTable` | `@/components/ui/ComparisonTable` | Sortable table with best-value highlighting |
| `Callout` | `@/components/ui/Callout` | Tip/warning/example/info/takeaway/important boxes |
| `RelatedArticles` | `@/components/ui/RelatedArticles` | Grid of related article links |
| `SourceLink` | `@/components/ui/SourceLink` | External link with authority indicator |
| `SourcesBox` | `@/components/ui/SourceLink` | References section at article end |

## Tool Components

| Component | Path | Usage |
|-----------|------|-------|
| `BTUCalculator` | `@/components/tools/BTUCalculator` | Room AC sizing calculator |
| `SEERCalculator` | `@/components/tools/SEERCalculator` | Compare SEER ratings + payback |
| `CalcWrapper` | `@/components/tools/CalcWrapper` | Generic wrapper for custom calculators |

## Layout Components

| Component | Path | Usage |
|-----------|------|-------|
| `Header` | `@/components/layout/Header` | Site header (auto-included) |
| `Footer` | `@/components/layout/Footer` | Site footer (auto-included) |
| `ArticleLayout` | `@/components/layout/ArticleLayout` | Article page wrapper with breadcrumbs, meta |

## SEO Components

| Component | Path | Usage |
|-----------|------|-------|
| `SEOHead` | `@/components/seo/SEOHead` | Meta tags + schema (auto per page) |

## Components Needed (To Build)

- [ ] `ElectricHeaterCostCalc` — Running cost calculator for space heaters
- [ ] `MiniSplitSizer` — Multi-zone sizing tool
- [ ] `WireGaugeSelector` — NEC code wire gauge lookup
- [ ] `FurnaceSizer` — Furnace BTU sizing calculator
- [ ] `InsulationRValueLookup` — R-value reference by material
- [ ] `HeatPumpROICalc` — Heat pump payback calculator
- [ ] `DehumidifierSizer` — Dehumidifier pint sizing tool
- [ ] `EnergyBillCalc` — Monthly energy cost estimator
- [ ] `SEERMap` — Interactive US map showing minimum SEER by state
