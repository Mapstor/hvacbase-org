#!/usr/bin/env python3

import os
import re
import glob
from pathlib import Path

def get_all_routes():
    """Get all valid routes in the app"""
    routes = set()
    
    # Add static Next.js pages
    for page_file in glob.glob("app/**/page.tsx", recursive=True):
        route = page_file.replace("app/", "").replace("/page.tsx", "")
        if route == "page.tsx":  # Root page
            routes.add("/")
        else:
            routes.add(f"/{route}")
    
    # Add MDX content files (available via [slug] route)
    for mdx_file in glob.glob("content/**/*.mdx", recursive=True):
        slug = mdx_file.replace("content/", "").replace(".mdx", "")
        routes.add(f"/{slug}")
    
    return routes

def extract_internal_links(file_path):
    """Extract internal links from a file"""
    links = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find all href attributes
        href_matches = re.finditer(r'href=["\'](.*?)["\']', content)
        
        for match in href_matches:
            href = match.group(1)
            line_num = content[:match.start()].count('\n') + 1
            
            # Filter for internal links
            if (href.startswith('/') and 
                not href.startswith('//') and 
                not href.startswith('/api') and
                'mailto:' not in href and 
                'tel:' not in href and
                '.xml' not in href and
                '.ico' not in href and
                '.png' not in href and
                '.svg' not in href):
                
                # Clean up the link (remove query params and anchors)
                clean_href = href.split('?')[0].split('#')[0]
                links.append((line_num, href, clean_href))
                
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return links

def main():
    print("=== HVAC Base Internal Link Analysis ===\n")
    
    # Get all valid routes
    print("Getting all valid routes...")
    valid_routes = get_all_routes()
    print(f"Found {len(valid_routes)} valid routes\n")
    
    # Collect all internal links
    all_links = {}
    broken_links = []
    
    # Scan app files
    app_files = glob.glob("app/**/*.tsx", recursive=True)
    component_files = glob.glob("components/**/*.tsx", recursive=True)
    
    all_files = app_files + component_files
    
    print("Scanning files for internal links...")
    for file_path in all_files:
        if 'node_modules' in file_path or '.next' in file_path:
            continue
            
        links = extract_internal_links(file_path)
        if links:
            all_links[file_path] = links
            
            # Check for broken links
            for line_num, original_href, clean_href in links:
                if clean_href not in valid_routes:
                    # Special cases - some links might be valid but not in our route list
                    if (clean_href == '/sitemap.xml' or 
                        clean_href.startswith('/api/') or
                        clean_href.startswith('/_next/') or
                        clean_href in ['/favicon.ico', '/robots.txt']):
                        continue
                    
                    broken_links.append({
                        'file': file_path,
                        'line': line_num,
                        'original_href': original_href,
                        'clean_href': clean_href
                    })
    
    # Generate report
    print(f"\n=== REPORT ===")
    print(f"Total files scanned: {len(all_files)}")
    print(f"Files with internal links: {len(all_links)}")
    print(f"Total valid routes: {len(valid_routes)}")
    print(f"Potential broken links found: {len(broken_links)}")
    
    if broken_links:
        print(f"\n=== BROKEN INTERNAL LINKS ===")
        for link in broken_links:
            print(f"{link['file']}:{link['line']} -> {link['original_href']}")
            print(f"  Clean path: {link['clean_href']}")
            print(f"  Status: BROKEN (route does not exist)")
            print()
    else:
        print(f"\n✅ No broken internal links found!")
    
    # Show some valid routes for reference
    print(f"\n=== SAMPLE VALID ROUTES ===")
    sorted_routes = sorted(list(valid_routes))
    for route in sorted_routes[:20]:  # Show first 20
        print(f"  {route}")
    if len(sorted_routes) > 20:
        print(f"  ... and {len(sorted_routes) - 20} more")
    
    # Summary by source
    print(f"\n=== LINKS BY SOURCE FILE ===")
    for file_path, links in all_links.items():
        print(f"{file_path}: {len(links)} internal links")

if __name__ == "__main__":
    main()