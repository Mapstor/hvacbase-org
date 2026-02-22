# HVAC Base — Content Style Guide & Production Brief

## Brand Voice

### Tone
- **Authoritative but approachable** — like an experienced HVAC technician explaining to a homeowner
- **Data-first** — lead with numbers, specs, and facts before opinions
- **Direct** — no filler, no fluff, get to the answer fast
- **Helpful** — always answer the search intent in the first 100 words
- **Honest** — acknowledge trade-offs, don't oversell

### Writing Style
- Short paragraphs (2-4 sentences max)
- Active voice preferred
- Second person ("you") when addressing the reader
- First person plural ("we") sparingly for editorial voice
- Conversational but professional — no slang, no jargon without explanation
- Use contractions naturally (don't, can't, you'll)

### Sentence Structure
- Vary sentence length: mix short punchy sentences with longer explanatory ones
- Lead paragraphs with the most important information
- Use transitional phrases between sections

---

## Article Structure Template

Every article follows this structure (adapt per content type):

```
---
FRONTMATTER (see below)
---

## Opening Hook (2-3 sentences)
Answer the core question immediately. Give the reader the key number/answer.

<TableOfContents />

## [Main Section 1]
Core content with data, examples, charts.

<Callout type="example">
  Real-world example showing how this works in practice
</Callout>

## [Main Section 2]
Continue with depth, tables, comparisons.

<ComparisonTable ... />

## [Calculator/Tool Section] (if applicable)
<BTUCalculator /> or <SEERCalculator /> etc.

### Worked Examples
Show 2-3 specific examples of using the calculator with different inputs.

## [Section 3-5 as needed]

## Key Takeaways
<Callout type="takeaway">
  3-5 bullet summary of the most important points
</Callout>

<FAQ items={[...]} />

<SourcesBox sources={[...]} />

<RelatedArticles articles={[...]} />
```

---

## Frontmatter Schema

Every MDX file starts with this frontmatter:

```yaml
---
slug: "air-conditioner-btu-calculator"
title: "Air Conditioner BTU Calculator: What Size AC Do You Need?"
description: "Use our interactive BTU calculator to find the perfect AC size for your room. Accounts for climate zone, insulation, sun exposure, and more."
cluster: "AC Sizing & Selection"
role: "pillar"            # pillar | hub | spoke
priority: "P1"            # P1 | P2 | P3
contentType: "Interactive Calculator"
datePublished: "2025-02-01"
dateModified: "2025-02-01"
author: "HVAC Base Team"
tableOfContents: true
faqSchema: true
relatedArticles:
  - "ac-tonnage-calculator"
  - "mini-split-sizing-calculator"
  - "how-many-btu-per-square-foot"
externalLinks:
  - text: "ENERGY STAR Room AC Sizing"
    url: "https://www.energystar.gov/products/room_air_conditioners"
  - text: "ACCA Manual J"
    url: "https://www.acca.org/standards/manualj"
featuredImage: "/images/btu-calculator-hero.webp"
featuredImageAlt: "Air conditioner BTU calculator interface"
---
```

---

## Content Types & Requirements

### Interactive Calculator (19 articles)
- Full React calculator component with 4+ input fields
- **3 worked examples** with different scenarios (small room, medium, large)
- Explanation of the formula/methodology
- Comparison chart of common results
- FAQ with 5+ questions
- 2,000+ words of supporting content around the tool

### Comparison (112 articles)
- Use `<ComparisonTable>` with sortable columns
- **Specs-driven** — no subjective "best" without data backing
- Include: price range, key specs, efficiency rating, noise level, warranty
- **Winner callouts** for specific categories (best value, best efficiency, etc.)
- Real-world example for each recommended product
- 2,000+ words

### Guide (97 articles)
- Answer the title question in the first paragraph
- Use `<Callout type="example">` for every major concept
- Include relevant data tables
- Link to related calculators
- FAQ with 5-8 questions
- External links to manufacturer specs, DOE data, ENERGY STAR
- 2,000+ words

### Mega Guide / Pillar (19 articles)
- 3,000-5,000 words
- Comprehensive table of contents
- Links to ALL spoke articles in the cluster
- Multiple comparison tables
- At least 1 interactive tool
- 8-12 FAQ questions
- 5+ external authority links

### Troubleshooting (17 articles)
- Problem → Cause → Fix structure
- Use `<Callout type="warning">` for safety issues
- Step-by-step with numbered instructions
- "When to call a pro" section
- Estimated DIY cost vs. pro cost
- FAQ with symptom-based questions

### Cost Guide (10 articles)
- Price ranges with clear qualifiers (low/mid/high)
- Regional pricing differences
- What affects the price (list 5-8 factors)
- Real examples: "For a 2,000 sq ft home in Texas..."
- DIY vs professional cost comparison
- ROI/payback calculation when applicable

---

## SEO Requirements (Every Article)

### Title Tag
- Include primary keyword near the front
- Add a parenthetical modifier: (Calculator), (2025 Guide), (Chart), (+Examples)
- Under 60 characters

### Meta Description
- Include primary keyword
- Include a call-to-action or value proposition
- 150-160 characters

### First Paragraph (Critical for AI Visibility)
- **Answer the core question in the first 2 sentences**
- Include the primary keyword
- This paragraph gets pulled into AI overviews and featured snippets

### Headings
- H2 for main sections (include secondary keywords)
- H3 for subsections
- Use question-format headings when they match search queries

### Internal Links
- Every article links to 3-5 related articles in the same cluster
- Link to the cluster's pillar page
- Link to relevant calculators
- Use descriptive anchor text (not "click here")

### External Links
- 2-5 authority links per article
- Preferred sources: ENERGY STAR, DOE, EPA, ACCA, AHRI, manufacturer specs
- Opens in new tab, rel="noopener noreferrer"

### Schema Markup
- Article schema on every page (automatic via component)
- FAQ schema on every page with FAQ section
- HowTo schema on troubleshooting/how-to pages
- BreadcrumbList on every page (automatic)

---

## Available Components

Import these in any MDX article:

```jsx
import TableOfContents from '@/components/ui/TableOfContents'
import FAQ from '@/components/ui/FAQ'
import ComparisonTable from '@/components/ui/ComparisonTable'
import Callout from '@/components/ui/Callout'
import RelatedArticles from '@/components/ui/RelatedArticles'
import SourceLink, { SourcesBox } from '@/components/ui/SourceLink'
import BTUCalculator from '@/components/tools/BTUCalculator'
import SEERCalculator from '@/components/tools/SEERCalculator'
import CalcWrapper from '@/components/tools/CalcWrapper'
```

### Callout Types
- `tip` — Green, "Pro Tip"
- `warning` — Red, "Warning"
- `takeaway` — Amber, "Key Takeaway"
- `info` — Blue, "Good to Know"
- `example` — Purple, "Real-World Example"
- `important` — Orange, "Important"

### ComparisonTable Props
```jsx
<ComparisonTable
  headers={['Model', 'BTU', 'SEER2', 'Noise (dB)', 'Price']}
  rows={[
    { Model: 'Mitsubishi MSZ-FH12', BTU: '12,000', 'SEER2': 33.1, 'Noise (dB)': 19, Price: '$1,800' },
  ]}
  highlightBest={[
    { column: 'SEER2', direction: 'high' },
    { column: 'Noise (dB)', direction: 'low' },
  ]}
  caption="Mini split comparison based on manufacturer specs"
/>
```

---

## Batch Production Instructions

For future conversations, paste this at the start:

> "I'm continuing work on hvacbase.org. Here's the style guide: [link to this doc].
> Available components: TableOfContents, FAQ, ComparisonTable, Callout, SourcesBox,
> BTUCalculator, SEERCalculator, CalcWrapper, RelatedArticles.
> Please write all articles for the [CLUSTER NAME] cluster.
> Each article should be a complete MDX file with frontmatter, 2000+ words,
> tables, examples, FAQ, and source links."

---

## Quality Checklist (Before Publishing)

- [ ] Title answers the search query
- [ ] First paragraph gives the definitive answer
- [ ] Table of contents included
- [ ] At least 2 data tables or charts
- [ ] At least 2 real-world examples
- [ ] FAQ section with 5+ questions
- [ ] 3-5 internal links to related articles
- [ ] 2-5 external authority links
- [ ] All Callout components used appropriately
- [ ] Schema markup present (Article + FAQ + Breadcrumb)
- [ ] Meta description under 160 chars
- [ ] Total word count 2,000+
