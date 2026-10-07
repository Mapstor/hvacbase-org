#!/usr/bin/env node
/**
 * scripts/social-proof.mjs — shared "social proof / invented stat" detector.
 *
 * Fabricated engagement numbers (2.3M+ users, 125K views, 4.9/5 ratings),
 * "trusted by" / "join N" badges, inflated inventory counts ("200+ guides",
 * "500+ terms"), and testimonials are a classic reviewer rejection trigger and
 * violate the verified-or-omitted standard. Real counts must be computed from
 * data at build time, not hardcoded with a "+".
 *
 * Used by BOTH content-audit.mjs (MDX bodies + app/ + components/) and
 * static-routes.mjs (built HTML of the 18 static routes), and enforced by the
 * deploy gate (audit.mjs) so a social-proof claim fails the build.
 *
 * Patterns (step 7): numbers with K/M/+ next to users/views/readers/homeowners/
 * downloads/visitors; "4.9/5"-style ratings or stars; "trusted by"; "join N";
 * "N+ guides/calculators/terms/..."; testimonials.
 */

// Each: { cls, re }. `re` is matched globally. Kept deliberately tight so a
// sourced figure (e.g. "863 kWh", "16 SEER", "40 states") does not false-flag.
export const SOCIAL_PROOF_PATTERNS = [
  // "2.3M+ users", "125K views", "890K readers" (number + K/M/B unit + audience noun)
  { cls: 'social-proof-usage', re: /\b\d[\d.,]*\s*[KMB]\+?\s*(?:users|views|reads?|readers|homeowners|downloads|visitors|customers|subscribers|members|installs|searches)\b/gi },
  // audience noun followed closely by a K/M/B number ("users: 2.3M+")
  { cls: 'social-proof-usage', re: /\b(?:users|views|readers|homeowners|downloads|visitors|customers|subscribers|members)\b[^.\n]{0,14}\b\d[\d.,]*\s*[KMB]\+/gi },
  // "4.9/5", "4.9 / 5.0" style star ratings (decimal required, so "2/5" fractions don't flag)
  { cls: 'social-proof-rating', re: /\b[0-5]\.\d\s*\/\s*5(?:\.0)?\b/g },
  { cls: 'social-proof-rating', re: /\b[1-5](?:\.\d)?[\s-]*stars?\b/gi },
  { cls: 'social-proof-rating', re: /\b[0-5](?:\.\d)?\s*out of\s*5\b/gi },
  { cls: 'social-proof-trusted', re: /\btrusted by\b/gi },
  { cls: 'social-proof-join', re: /\bjoin\s+[\d,]+\+?\b/gi },
  // inflated inventory counts: "200+ guides", "500+ terms", "9+ calculators"
  { cls: 'social-proof-count-claim', re: /\b\d[\d,]*\+\s*(?:guides|calculators|tools|terms|acronyms|articles|reviews)\b/gi },
  { cls: 'social-proof-testimonial', re: /\btestimonials?\b/gi },
];

/** Return [{ cls, match }] for every social-proof hit in `text`. */
export function scanSocialProof(text) {
  const hits = [];
  if (!text) return hits;
  for (const { cls, re } of SOCIAL_PROOF_PATTERNS) {
    const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    let m;
    while ((m = r.exec(text)) !== null) {
      hits.push({ cls, match: m[0].replace(/\s+/g, ' ').trim().slice(0, 60) });
      if (m.index === r.lastIndex) r.lastIndex++; // guard against zero-width
    }
  }
  return hits;
}
