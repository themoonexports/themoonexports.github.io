#!/bin/bash
# Auto Year Update Implementation Script
# Updates all HTML files to include auto-updating copyright years

echo "🗓️ The Moon Exports - Auto Year Update Implementation"
echo "=============================================="

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📁 Working in: $(pwd)"
echo ""

# List of main HTML files to update (excluding legal/ directory for now)
HTML_FILES=(
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
    "404.html"
    "404.shtml"
)

echo "🔄 Updating copyright notices in HTML files..."

for file in "${HTML_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        
        # Create backup
        cp "$file" "$file.backup"
        
        # Update copyright notice
        sed -i '' 's/COPYRIGHT © THEMOONEXPORTS\.COM/COPYRIGHT © {{CURRENT_YEAR}} THEMOONEXPORTS.COM/g' "$file"
        
        # Check if auto-year-update.js is already included
        if ! grep -q "auto-year-update.js" "$file"; then
            # Add the script before the closing body tag
            sed -i '' 's|</body>|<script src="js/auto-year-update.js"></script>\
</body>|' "$file"
            echo "  ✅ Added auto-year-update.js script"
        else
            echo "  ℹ️  Script already included"
        fi
        
        echo "  ✅ Updated copyright notice"
    else
        echo "  ⚠️  File not found: $file"
    fi
done

echo ""
echo "🔄 Updating legal documents..."

# Update privacy policy effective date
if [ -f "legal/privacy.html" ]; then
    echo "Processing: legal/privacy.html"
    cp "legal/privacy.html" "legal/privacy.html.backup"
    
    # Add the script if not present
    if ! grep -q "auto-year-update.js" "legal/privacy.html"; then
        sed -i '' 's|</body>|<script src="../js/auto-year-update.js"></script>\
</body>|' "legal/privacy.html"
        echo "  ✅ Added auto-year-update.js script to privacy.html"
    fi
fi

# Update terms and conditions
if [ -f "legal/terms.html" ]; then
    echo "Processing: legal/terms.html"
    cp "legal/terms.html" "legal/terms.html.backup"
    
    # Add effective date if not present
    if ! grep -q "Effective date:" "legal/terms.html"; then
        # Add effective date after the h1 title
        sed -i '' 's|<h1>Terms and Conditions</h1>|<h1>Terms and Conditions</h1>\
<p>Effective date: {{CURRENT_DATE}}</p>|' "legal/terms.html"
        echo "  ✅ Added effective date to terms.html"
    fi
    
    # Add the script if not present
    if ! grep -q "auto-year-update.js" "legal/terms.html"; then
        sed -i '' 's|</body>|<script src="../js/auto-year-update.js"></script>\
</body>|' "legal/terms.html"
        echo "  ✅ Added auto-year-update.js script to terms.html"
    fi
fi

# Update imprint
if [ -f "legal/imprint.html" ]; then
    echo "Processing: legal/imprint.html"
    cp "legal/imprint.html" "legal/imprint.html.backup"
    
    # Add the script if not present
    if ! grep -q "auto-year-update.js" "legal/imprint.html"; then
        sed -i '' 's|</body>|<script src="../js/auto-year-update.js"></script>\
</body>|' "legal/imprint.html"
        echo "  ✅ Added auto-year-update.js script to imprint.html"
    fi
fi

echo ""
echo "🗓️ Current year will be: $(date +%Y)"
echo "📅 Current date will be: $(date +'%B %d, %Y')"

echo ""
echo "✨ Auto year update implementation complete!"
echo ""
echo "💡 Features implemented:"
echo "   ✅ Automatic copyright year updating"
echo "   ✅ Dynamic effective dates in legal documents" 
echo "   ✅ Placeholder system for manual dates"
echo "   ✅ JavaScript-based real-time updates"
echo ""
echo "🔧 To test:"
echo "   1. Open any page in a browser"
echo "   2. Check that copyright shows current year"
echo "   3. Check legal documents show current dates"
echo ""
echo "📋 Backup files created with .backup extension"
echo "🗑️  To remove backups: rm *.backup legal/*.backup"
