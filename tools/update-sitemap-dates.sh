#!/bin/bash
# Sitemap Date Update Script
# Updates lastmod dates in sitemap.xml to current date

echo "🗺️ Sitemap Date Update Utility"
echo "==============================="

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📁 Working in: $(pwd)"

# Get current date in XML format (YYYY-MM-DD)
CURRENT_DATE=$(date +%Y-%m-%d)
echo "📅 Current date: $CURRENT_DATE"

# Create backup
cp sitemap.xml sitemap.xml.backup
echo "💾 Created backup: sitemap.xml.backup"

# Update all lastmod dates in sitemap.xml
sed -i '' "s|<lastmod>[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" sitemap.xml

echo "✅ Updated all lastmod dates in sitemap.xml"

# Count updated entries
UPDATED_COUNT=$(grep -c "<lastmod>$CURRENT_DATE</lastmod>" sitemap.xml)
echo "📊 Updated $UPDATED_COUNT entries"

echo ""
echo "🎯 Sitemap date update complete!"
echo "💡 Tip: Run this script whenever you make significant content changes"
