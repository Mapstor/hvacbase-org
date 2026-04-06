# HVAC Base Internal Link Analysis Report

Generated: April 6, 2026

## Executive Summary

I performed a comprehensive scan of all internal links in your HVAC Base Next.js project and identified **163 potentially broken internal links** across 14 files. However, the good news is that **most of these are actually "fixable" links** - the content exists but is being referenced with incorrect paths.

## Project Structure Analysis

### Valid Routes Found
- **Static Next.js Pages**: 13 routes
  - `/` (homepage)
  - `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`
  - `/air-conditioning`, `/heating`, `/heat-pumps`, `/energy-efficiency`, `/air-quality`, `/articles`
  - `/[slug]` (dynamic route for MDX content)

- **MDX Content Files**: 340 files accessible via `/[slug]` route
  - Located in `content/**/*.mdx`
  - Organized by categories (e.g., `ac-sizing-selection/`, `energy-efficiency-ratings/`, etc.)

## Broken Links Analysis

### Summary Statistics
- **Total broken links found**: 163
- **Fixable with correct paths**: 90%+ 
- **Truly broken (no content exists)**: <10%
- **Files with broken links**: 14

### Most Critical Issues

#### 1. Calculator Links (High Priority)
These are the most frequently referenced broken links across multiple pages:

| Broken Link | Correct Path | Status |
|-------------|-------------|---------|
| `/air-conditioner-btu-calculator` | `/ac-sizing-selection/air-conditioner-btu-calculator` | ✅ FIXABLE |
| `/ac-tonnage-calculator` | `/ac-sizing-selection/ac-tonnage-calculator` | ✅ FIXABLE |
| `/seer2-savings-calculator` | `/energy-efficiency-ratings/seer2-savings-calculator` | ✅ FIXABLE |
| `/heat-pump-size-calculator` | `/ac-sizing-selection/heat-pump-size-calculator` | ✅ FIXABLE |
| `/furnace-sizing-calculator` | `/ac-sizing-selection/furnace-sizing-calculator` | ✅ FIXABLE |
| `/mini-split-sizing-calculator` | `/ac-sizing-selection/mini-split-sizing-calculator` | ✅ FIXABLE |
| `/water-heater-sizing-calculator` | `/ac-sizing-selection/water-heater-sizing-calculator` | ✅ FIXABLE |
| `/what-size-generator-do-i-need` | `/ac-sizing-selection/what-size-generator-do-i-need` | ✅ FIXABLE |

#### 2. Energy Efficiency Rating Links
| Broken Link | Correct Path | Status |
|-------------|-------------|---------|
| `/seer2-rating-explained` | `/energy-efficiency-ratings/seer2-rating-explained` | ✅ FIXABLE |
| `/afue-rating-explained` | `/energy-efficiency-ratings/afue-rating-explained` | ✅ FIXABLE |
| `/hspf2-rating-explained` | `/energy-efficiency-ratings/hspf2-rating-explained` | ✅ FIXABLE |
| `/merv-rating-chart` | `/energy-efficiency-ratings/merv-rating-chart` | ✅ FIXABLE |

#### 3. Equipment Guide Links
| Broken Link | Correct Path | Status |
|-------------|-------------|---------|
| `/what-is-a-mini-split` | `/mini-split-air-conditioners/what-is-a-mini-split` | ✅ FIXABLE |
| `/best-mini-split-ac-units` | `/mini-split-air-conditioners/best-mini-split-ac-units` | ✅ FIXABLE |
| `/furnace-guide` | `/furnaces-heating/furnace-guide` | ✅ FIXABLE |
| `/best-air-purifiers` | `/air-quality/best-air-purifiers` | ✅ FIXABLE |

## Files Requiring Updates

### Primary Issues by File:

1. **app/page.tsx** (Homepage) - 149 broken links
   - Multiple calculator links
   - Equipment guide links
   - Category hub links
   
2. **components/layout/Footer.tsx** - Multiple broken links in footer navigation
   - Calculator section links
   - Equipment category links

3. **Category pages** (air-conditioning, heating, etc.) - 4 broken links each
   - Calculator shortcuts
   - Related content links

## Truly Broken Links (Content Missing)

Only a few links point to content that doesn't actually exist:

- `/what-is-a-heat-pump` - No MDX file found
- `/best-dehumidifiers` - No MDX file found  
- `/how-often-change-filter` - No MDX file found

## Root Cause Analysis

The main issue is **inconsistent link referencing patterns**:

1. **Short URLs vs Full Category Paths**: Links are using short URLs (`/calculator-name`) but MDX files are organized in category folders (`/category/calculator-name`)

2. **Missing URL Structure Documentation**: The project appears to have evolved from a simpler flat structure to a hierarchical one, but links weren't updated consistently

## Impact Assessment

### User Experience Impact
- **High**: Broken calculator links affect core functionality
- **Medium**: Navigation issues in footer and category pages
- **Low**: Some reference links in content

### SEO Impact
- **High**: Internal linking structure is critical for SEO
- **Medium**: 404 errors hurt search engine crawling

## Recommended Actions

### Immediate Fixes (High Priority)
1. **Update Footer component** (`components/layout/Footer.tsx`)
   - Fix all calculator links to use correct category paths
   - Update equipment guide links

2. **Update Homepage** (`app/page.tsx`)
   - Fix all calculator CTAs and references
   - Update category hub sections

3. **Update Category Pages**
   - Fix calculator shortcut links
   - Update cross-references

### Medium Priority
1. **Content audit** for truly missing files
   - Create missing heat pump guide
   - Create missing dehumidifier guide
   - Create filter maintenance guide

### Long-term Improvements
1. **Consider URL redirects** for common short URLs
2. **Implement link validation** in build process
3. **Create style guide** for internal linking patterns

## Implementation Strategy

### Phase 1: Critical Path Fixes
- Focus on most-referenced broken links first
- Update Footer.tsx and app/page.tsx
- Test calculator functionality

### Phase 2: Comprehensive Updates  
- Update all category pages
- Fix remaining broken links
- Add missing content files

### Phase 3: Prevention
- Add automated link checking to CI/CD
- Document internal linking guidelines
- Create redirect strategy for legacy URLs

## Conclusion

While 163 broken links sounds alarming, **the vast majority are easily fixable** by updating the link paths to match the actual MDX file locations. The content exists - it's just being referenced incorrectly. 

This is a common issue when transitioning from a flat URL structure to a hierarchical one. With systematic updates to the key template files (Footer, Homepage, and category pages), you can resolve 90%+ of these issues quickly.

The project has excellent content coverage with 340 MDX articles - it just needs the internal navigation structure to be aligned with the actual file organization.