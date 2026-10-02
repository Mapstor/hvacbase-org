#!/usr/bin/env python3
"""Detect Key Takeaways that echo the frontmatter description."""

import re
import os
import sys
from pathlib import Path

CONTENT_ROOT = "/workspace/content"

STOPWORDS = set("""
a an the and or but if of for to in on at with without by from as is are was were be been being
do does did doing have has had having i you he she it we they me him her us them my your his its our their this that these those
than then so such can could should would may might will shall must not no nor about into over under between
about across against among around before behind below beneath beside beyond during except inside near off onto outside past
through throughout toward towards upon within also very more most much many some any all both each few other own same
you'll your we'll they'll it's don't won't can't isn't aren't wasn't weren't
what which who whom whose why how when where here there when
including includes include includes based use uses used using
""".split())

def extract_frontmatter_description(text):
    # Match ---\n...\n---
    m = re.match(r'---\n(.*?)\n---', text, re.DOTALL)
    if not m:
        return None
    fm = m.group(1)
    # Look for description: "..." possibly multi-line
    dm = re.search(r'^description:\s*(.+?)(?=\n\S|\Z)', fm, re.MULTILINE | re.DOTALL)
    if not dm:
        return None
    val = dm.group(1).strip()
    # Strip surrounding quotes
    if val.startswith('"') and val.endswith('"'):
        val = val[1:-1]
    elif val.startswith("'") and val.endswith("'"):
        val = val[1:-1]
    return val

def extract_first_takeaway(text):
    """Find <Callout type="takeaway"> ... ## Key Takeaways ... first bullet."""
    # Look for Callout type="takeaway" (with optional whitespace/quote variants)
    # then a numbered/bulleted list first item
    m = re.search(r'<Callout\s+type=["\']takeaway["\']\s*>(.*?)</Callout>', text, re.DOTALL | re.IGNORECASE)
    if not m:
        # Try alternative: Key Takeaways section without Callout
        m2 = re.search(r'##\s+Key Takeaways\s*\n(.*?)(?=\n##\s|\n</Callout>|\Z)', text, re.DOTALL)
        if not m2:
            return None
        block = m2.group(1)
    else:
        block = m.group(1)
        # If contains "## Key Takeaways" or "**Key Takeaways**", take content after
        km = re.search(r'(?:##\s+Key Takeaways|\*\*Key Takeaways\*\*)\s*\n(.*)', block, re.DOTALL)
        if km:
            block = km.group(1)

    # Find first list item: pattern like "1. ..." or "- ..." or "* ..."
    for line in block.split('\n'):
        line = line.strip()
        if not line:
            continue
        # Numbered: "1. **...**: rest"
        m1 = re.match(r'^(?:\d+\.|[-*])\s+(.*)', line)
        if m1:
            return m1.group(1).strip()
    return None

def normalize(s):
    """Lowercase, strip markdown bold, strip punctuation, split words."""
    if not s:
        return []
    # Remove markdown links [text](url) -> text
    s = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', s)
    # Strip ** and * and _
    s = re.sub(r'[*_`]', '', s)
    # Lower
    s = s.lower()
    # Replace punctuation with space
    s = re.sub(r"[^\w\s'-]", ' ', s)
    # Split
    words = s.split()
    # Filter stopwords and short words
    substantive = [w for w in words if w not in STOPWORDS and len(w) > 2]
    return substantive

def main():
    files = sorted(Path(CONTENT_ROOT).rglob('*.mdx'))
    flagged = []
    checked = 0
    no_takeaway = 0
    no_desc = 0
    for fp in files:
        try:
            text = fp.read_text(encoding='utf-8')
        except Exception as e:
            print(f"ERROR reading {fp}: {e}", file=sys.stderr)
            continue

        desc = extract_frontmatter_description(text)
        takeaway = extract_first_takeaway(text)

        if not desc:
            no_desc += 1
            continue
        if not takeaway:
            no_takeaway += 1
            continue

        checked += 1

        desc_words = normalize(desc)
        take_words = normalize(takeaway)

        if not desc_words or not take_words:
            continue

        desc_set = set(desc_words)
        take_set = set(take_words)
        shared = desc_set & take_set
        shorter_len = min(len(desc_set), len(take_set))
        if shorter_len == 0:
            continue
        overlap_pct = len(shared) / shorter_len

        # Also compute line number of first takeaway
        # find line number of the first item after Key Takeaways heading/label
        line_num = None
        lines = text.split('\n')
        for i, line in enumerate(lines, 1):
            if re.search(r'(##\s+Key Takeaways|\*\*Key Takeaways\*\*|Key Takeaways)', line):
                # scan forward
                for j in range(i, len(lines)):
                    if re.match(r'^\s*(?:\d+\.|[-*])\s+', lines[j]):
                        line_num = j + 1
                        break
                if line_num:
                    break

        if overlap_pct > 0.60 and len(shared) >= 5:
            flagged.append({
                'file': str(fp),
                'line': line_num or 0,
                'desc': desc,
                'takeaway': takeaway,
                'shared': sorted(shared),
                'overlap_pct': overlap_pct,
                'desc_words_n': len(desc_set),
                'take_words_n': len(take_set),
            })

    print(f"\nSTATS: checked={checked}, no_desc={no_desc}, no_takeaway={no_takeaway}, flagged={len(flagged)}\n")
    for f in flagged:
        print("=" * 80)
        print(f"FILE: {f['file']}")
        print(f"LINE: {f['line']}")
        print(f"OVERLAP: {f['overlap_pct']*100:.1f}%  shared={len(f['shared'])}  desc_n={f['desc_words_n']}  take_n={f['take_words_n']}")
        print(f"DESC:     {f['desc']}")
        print(f"TAKEAWAY: {f['takeaway']}")
        print(f"SHARED:   {f['shared']}")

if __name__ == '__main__':
    main()
