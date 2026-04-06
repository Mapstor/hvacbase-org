#!/bin/bash

echo "=== HVAC Base Internal Link Scanner ==="
echo "Scanning for all internal links in the project..."
echo

# Create a comprehensive report file
REPORT_FILE="/tmp/hvac_link_scan_report.txt"
BROKEN_LINKS_FILE="/tmp/broken_links_report.txt"

echo "=== HVAC BASE INTERNAL LINK SCAN REPORT ===" > $REPORT_FILE
echo "Generated: $(date)" >> $REPORT_FILE
echo >> $REPORT_FILE

echo "=== BROKEN INTERNAL LINKS REPORT ===" > $BROKEN_LINKS_FILE
echo "Generated: $(date)" >> $BROKEN_LINKS_FILE
echo >> $BROKEN_LINKS_FILE

# Function to extract internal links from a file
extract_links() {
    local file="$1"
    echo "--- Scanning: $file ---" >> $REPORT_FILE
    
    # Find all href attributes with internal links
    grep -n 'href=["\'][^"'\'']*["\']' "$file" | while read -r line; do
        line_num=$(echo "$line" | cut -d: -f1)
        content=$(echo "$line" | cut -d: -f2-)
        
        # Extract the href value
        href=$(echo "$content" | grep -o 'href="[^"]*"' | head -1 | sed 's/href="//;s/"//')
        if [ -z "$href" ]; then
            href=$(echo "$content" | grep -o "href='[^']*'" | head -1 | sed "s/href='//;s/'//")
        fi
        
        # Filter for internal links (relative, starts with /, or same domain)
        if [[ "$href" =~ ^/ ]] || [[ "$href" =~ ^[a-zA-Z0-9\-]+ ]] && [[ ! "$href" =~ ^https?:// ]] && [[ ! "$href" =~ ^mailto: ]] && [[ ! "$href" =~ ^tel: ]]; then
            echo "Line $line_num: $href" >> $REPORT_FILE
            
            # Check if this is a potential broken link (starts with /)
            if [[ "$href" =~ ^/ ]]; then
                # Clean up the path for checking
                clean_path=$(echo "$href" | sed 's/#.*//' | sed 's/\?.*//')
                echo "POTENTIAL BROKEN: $file:$line_num -> $clean_path" >> $BROKEN_LINKS_FILE
            fi
        fi
    done
    echo >> $REPORT_FILE
}

# Scan all relevant files
find . -path "./node_modules" -prune -o -path "./.next" -prune -o -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.mdx" \) -print | while read -r file; do
    if [[ "$file" =~ (app|components|content)/ ]]; then
        extract_links "$file"
    fi
done

echo "=== ACTUAL PAGES AND ROUTES ===" >> $REPORT_FILE
echo >> $REPORT_FILE

# List all actual Next.js pages
echo "Next.js Pages:" >> $REPORT_FILE
find app -name "page.tsx" -o -name "page.ts" -o -name "page.jsx" -o -name "page.js" | sort >> $REPORT_FILE
echo >> $REPORT_FILE

# List all MDX content files (which become available via [slug] route)
echo "MDX Content Files (available via /[slug] route):" >> $REPORT_FILE
find content -name "*.mdx" | sed 's|content/||' | sed 's|\.mdx$||' | sort >> $REPORT_FILE
echo >> $REPORT_FILE

echo "Scan complete! Reports saved to:"
echo "Full report: $REPORT_FILE"
echo "Broken links: $BROKEN_LINKS_FILE"
echo
echo "To view the reports:"
echo "cat $REPORT_FILE"
echo "cat $BROKEN_LINKS_FILE"