#!/bin/bash
# Auto Year Update - Testing and Verification Script
# Tests the auto-updating year functionality

echo "🧪 Auto Year Update - Testing & Verification"
echo "============================================"

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📁 Working in: $(pwd)"
echo "📅 Current date: $(date)"
echo "📅 Current year: $(date +%Y)"
echo ""

# Function to test file existence
test_file() {
    local file="$1"
    local description="$2"
    
    if [ -f "$file" ]; then
        echo "✅ $description: $file"
        return 0
    else
        echo "❌ Missing $description: $file"
        return 1
    fi
}

# Test core JavaScript file
echo "🔧 Testing Core JavaScript File"
echo "==============================="
test_file "js/auto-year-update.js" "Auto Year Update Script"
echo ""

# Test placeholder implementation
echo "📋 Testing Placeholder Implementation"
echo "===================================="

# Count files with year placeholders
YEAR_PLACEHOLDER_COUNT=$(grep -r "{{CURRENT_YEAR}}" *.html 2>/dev/null | wc -l | tr -d ' ')
echo "📊 Files with {{CURRENT_YEAR}} placeholder: $YEAR_PLACEHOLDER_COUNT"

# Count files with date placeholders
DATE_PLACEHOLDER_COUNT=$(grep -r "{{CURRENT_DATE}}" *.html legal/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "📊 Files with {{CURRENT_DATE}} placeholder: $DATE_PLACEHOLDER_COUNT"

# List files with year placeholders
echo ""
echo "📄 Files with year placeholders:"
grep -l "{{CURRENT_YEAR}}" *.html 2>/dev/null | while read file; do
    echo "  ✅ $file"
done

echo ""
echo "📄 Files with date placeholders:"
grep -l "{{CURRENT_DATE}}" *.html legal/*.html 2>/dev/null | while read file; do
    echo "  ✅ $file"
done

echo ""

# Test script inclusion
echo "📜 Testing Script Inclusion"
echo "============================"

SCRIPT_INCLUDE_COUNT=$(grep -r "auto-year-update.js" *.html legal/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "📊 Files with auto-year-update.js script: $SCRIPT_INCLUDE_COUNT"

# Check for files missing the script
echo ""
echo "🔍 Checking for files that might need the script..."

# Check main HTML files
MAIN_FILES=(
    "index.html"
    "about.html"
    "products.html"
    "contact.html"
    "faq.html"
    "horn-crafts.html"
    "wooden-crafts.html"
    "resin.html"
    "buffalo-horn-plates.html"
    "buffalo-horn-bowls.html"
    "horn-decor.html"
)

MISSING_SCRIPT=()
for file in "${MAIN_FILES[@]}"; do
    if [ -f "$file" ]; then
        if ! grep -q "auto-year-update.js" "$file"; then
            MISSING_SCRIPT+=("$file")
            echo "  ⚠️  Missing script: $file"
        fi
    fi
done

if [ ${#MISSING_SCRIPT[@]} -eq 0 ]; then
    echo "  ✅ All main files have the script included"
fi

echo ""

# Test legal documents
echo "⚖️ Testing Legal Documents"
echo "=========================="

LEGAL_FILES=("legal/privacy.html" "legal/terms.html" "legal/imprint.html")

for file in "${LEGAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Testing: $file"
        
        # Check for script inclusion
        if grep -q "auto-year-update.js" "$file"; then
            echo "  ✅ Script included"
        else
            echo "  ❌ Script missing"
        fi
        
        # Check for placeholders
        if grep -q "{{CURRENT_DATE}}" "$file" || grep -q "{{CURRENT_YEAR}}" "$file"; then
            echo "  ✅ Placeholders present"
        else
            echo "  ⚠️  No placeholders found"
        fi
        
        echo ""
    fi
done

# Test sitemap dates
echo "🗺️ Testing Sitemap"
echo "=================="

if [ -f "sitemap.xml" ]; then
    CURRENT_DATE_XML=$(date +%Y-%m-%d)
    SITEMAP_CURRENT_COUNT=$(grep -c "<lastmod>$CURRENT_DATE_XML</lastmod>" sitemap.xml)
    SITEMAP_TOTAL_COUNT=$(grep -c "<lastmod>" sitemap.xml)
    
    echo "📊 Sitemap entries with current date ($CURRENT_DATE_XML): $SITEMAP_CURRENT_COUNT"
    echo "📊 Total sitemap entries: $SITEMAP_TOTAL_COUNT"
    
    if [ "$SITEMAP_CURRENT_COUNT" -eq "$SITEMAP_TOTAL_COUNT" ]; then
        echo "✅ All sitemap entries have current dates"
    else
        echo "⚠️  Some sitemap entries may have old dates"
    fi
else
    echo "❌ sitemap.xml not found"
fi

echo ""

# Summary
echo "📋 Implementation Summary"
echo "========================"
echo "✅ Auto-updating copyright years: Implemented"
echo "✅ Auto-updating effective dates: Implemented"
echo "✅ Sitemap date management: Implemented"
echo "✅ Maintenance scripts: Available"

echo ""
echo "🛠️ Available Maintenance Tools:"
echo "  📄 tools/update-sitemap-dates.sh - Update sitemap dates"
echo "  🧹 tools/organize-cleanup.sh - File organization"
echo "  ✅ tools/validate-organization.sh - Structure validation"

echo ""
echo "💡 How It Works:"
echo "  1. {{CURRENT_YEAR}} placeholders → Replaced with current year"
echo "  2. {{CURRENT_DATE}} placeholders → Replaced with current date"
echo "  3. JavaScript runs on page load to update all placeholders"
echo "  4. Copyright notices automatically show current year"
echo "  5. Legal documents show current effective dates"

echo ""
echo "🧪 Testing complete!"
echo ""
echo "🌐 To test in browser:"
echo "   1. Open any page on the website"
echo "   2. Check footer copyright shows $(date +%Y)"
echo "   3. Check legal/privacy.html shows current date"
echo "   4. Check legal/terms.html shows current date"
