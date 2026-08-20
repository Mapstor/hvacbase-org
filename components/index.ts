// UI Components
export { default as TableOfContents } from './ui/TableOfContents';
export { default as FAQ } from './ui/FAQ';
export { default as ComparisonTable } from './ui/ComparisonTable';
export { default as Callout } from './ui/Callout';
export { default as SourcesBox } from './ui/SourceLink';
export { default as RelatedArticles } from './ui/RelatedArticles';

// Tools/Calculators
// CalcWrapper is the type-dispatching wrapper from calculators/ (routes
// <CalcWrapper type="btu" />, <CalcWrapper type="seer2" /> etc. to the modern
// calculator components). BTUCalculator resolves to the modern implementation
// via the tools/BTUCalculator re-export shim. SEERCalculator remains legacy
// (still directly wired to 11 MDX embeds) but now has a Reset button.
export { default as CalcWrapper } from './calculators/CalcWrapper';
export { default as SEERCalculator } from './tools/SEERCalculator';
export { default as BTUCalculator } from './tools/BTUCalculator';