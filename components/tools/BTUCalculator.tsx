// Consolidation shim: the sophisticated BTU calculator lives in
// /workspace/components/calculators/BTUCalculator.tsx (built on the shared
// _shared.tsx primitives, wired to the Calculate/Reset UX pattern). This file
// re-exports it so any code that imports './tools/BTUCalculator' — or the
// package-level `@/components` alias in /workspace/components/index.ts — gets
// the modern implementation. The prior legacy hand-rolled UI here has been
// removed; the placeholder inline BTU component in /workspace/lib/mdx-components.tsx
// has been removed too. There is now exactly one BTU implementation on the site.
export { default } from '../calculators/BTUCalculator';
