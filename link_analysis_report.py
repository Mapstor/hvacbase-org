#!/usr/bin/env python3

import os
import re
import glob
from pathlib import Path

def get_all_mdx_slugs():
    """Get all MDX files and their slugs"""
    mdx_slugs = {}
    for mdx_file in glob.glob("content/**/*.mdx", recursive=True):
        full_slug = mdx_file.replace("content/", "").replace(".mdx", "")
        filename = os.path.basename(full_slug)
        mdx_slugs[filename] = full_slug
    return mdx_slugs

def main():
    print("=== COMPREHENSIVE LINK ANALYSIS REPORT ===\n")
    
    # Get all MDX slugs
    mdx_slugs = get_all_mdx_slugs()
    
    # Common broken links from the previous analysis
    broken_links = [
        "/air-conditioner-btu-calculator",
        "/ac-tonnage-calculator", 
        "/seer2-savings-calculator",
        "/heat-pump-size-calculator",
        "/furnace-sizing-calculator",
        "/mini-split-sizing-calculator",
        "/water-heater-sizing-calculator",
        "/what-size-generator-do-i-need",
        "/kwh-cost-calculator",
        "/seer2-rating-explained",
        "/afue-rating-explained",
        "/hspf2-rating-explained",
        "/coefficient-of-performance",
        "/merv-rating-chart",
        "/best-mini-split-ac-units",
        "/what-is-a-mini-split",
        "/mini-split-installation-cost",
        "/mini-split-vs-central-air",
        "/furnace-guide",
        "/furnace-blowing-cold-air",
        "/what-is-a-heat-pump",
        "/best-cold-climate-heat-pumps",
        "/furnace-vs-heat-pump",
        "/heat-pump-tax-credits-2026",
        "/gas-vs-electric-heating-cost",
        "/best-air-purifiers",
        "/best-dehumidifiers",
        "/hvac-maintenance-checklist",
        "/how-often-change-filter",
        "/furnace-filter-direction"
    ]
    
    print("LINK ANALYSIS RESULTS:")
    print("=" * 80)
    
    fixable_links = []
    truly_broken = []
    
    for broken_link in broken_links:
        clean_link = broken_link.lstrip('/')
        found_match = False
        
        # Check if there's a matching filename in MDX
        if clean_link in mdx_slugs:
            fixable_links.append({
                'broken': broken_link,
                'correct': f"/{mdx_slugs[clean_link]}"
            })
            found_match = True
        else:
            # Check for partial matches
            partial_matches = []
            for filename, full_slug in mdx_slugs.items():
                if clean_link in filename or filename in clean_link:
                    partial_matches.append(f"/{full_slug}")
            
            if partial_matches:
                fixable_links.append({
                    'broken': broken_link,
                    'correct': partial_matches[0] if len(partial_matches) == 1 else partial_matches
                })
                found_match = True
        
        if not found_match:
            truly_broken.append(broken_link)
    
    print(f"\n✅ FIXABLE LINKS ({len(fixable_links)} found):")
    print("-" * 50)
    for link in fixable_links:
        print(f"❌ {link['broken']}")
        if isinstance(link['correct'], list):
            print(f"   Possible matches:")
            for match in link['correct']:
                print(f"   ✅ {match}")
        else:
            print(f"   ✅ {link['correct']}")
        print()
    
    if truly_broken:
        print(f"\n🔴 TRULY BROKEN LINKS ({len(truly_broken)} found):")
        print("-" * 50)
        for link in truly_broken:
            print(f"❌ {link}")
        print()
    
    # Summary
    print(f"\n📊 SUMMARY:")
    print("-" * 30)
    print(f"Total broken links analyzed: {len(broken_links)}")
    print(f"Fixable with correct paths: {len(fixable_links)}")
    print(f"Truly broken (no content): {len(truly_broken)}")
    print(f"Total MDX content files: {len(mdx_slugs)}")
    
    # Show most common link patterns that need fixing
    print(f"\n🔧 MOST URGENT FIXES NEEDED:")
    print("-" * 40)
    
    priority_fixes = [
        ("/air-conditioner-btu-calculator", "/ac-sizing-selection/air-conditioner-btu-calculator"),
        ("/ac-tonnage-calculator", "/ac-sizing-selection/ac-tonnage-calculator"),
        ("/seer2-savings-calculator", "/energy-efficiency-ratings/seer2-savings-calculator"),
        ("/heat-pump-size-calculator", "/ac-sizing-selection/heat-pump-size-calculator"),
        ("/furnace-sizing-calculator", "/ac-sizing-selection/furnace-sizing-calculator"),
        ("/mini-split-sizing-calculator", "/ac-sizing-selection/mini-split-sizing-calculator"),
        ("/water-heater-sizing-calculator", "/ac-sizing-selection/water-heater-sizing-calculator"),
        ("/what-size-generator-do-i-need", "/ac-sizing-selection/what-size-generator-do-i-need"),
    ]
    
    for broken, correct in priority_fixes:
        # Verify the correct path exists
        correct_file = f"content{correct}.mdx"
        if os.path.exists(correct_file):
            print(f"HIGH PRIORITY: {broken} → {correct}")
    
    print(f"\n💡 RECOMMENDATIONS:")
    print("-" * 20)
    print("1. Update all calculator links to use full category paths")
    print("2. Update efficiency rating links to use correct category paths") 
    print("3. Consider creating redirects for common short URLs")
    print("4. Update Footer.tsx with correct paths")
    print("5. Update homepage (app/page.tsx) with correct paths")

if __name__ == "__main__":
    main()