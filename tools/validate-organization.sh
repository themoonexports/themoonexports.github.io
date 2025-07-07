#!/bin/bash
# Organization Validation Script
# Usage: ./tools/validate-organization.sh

echo "✅ The Moon Exports - Directory Organization Validator"
echo "=================================================="

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📁 Validating directory structure from: $(pwd)"
echo ""

# Define expected structure
declare -A EXPECTED_DIRS=(
    ["docs"]="Documentation and guides"
    ["tools"]="Development scripts"
    ["data"]="Data files and exports"
    ["backup"]="Archived and backup files"
    ["temp"]="Temporary development files"
    ["css"]="Stylesheets"
    ["js"]="JavaScript files"
    ["images"]="Media assets"
    ["fonts"]="Web fonts"
    ["de"]="German localization"
    ["legal"]="Legal pages"
)

declare -A CRITICAL_FILES=(
    ["index.html"]="Main landing page"
    ["about.html"]="Company information"
    ["products.html"]="Product catalog"
    ["contact.html"]="Contact form"
    ["sitemap.xml"]="SEO sitemap"
    ["robots.txt"]="Search engine directives"
    ["firebase.json"]="Hosting configuration"
    ["package.json"]="Dependencies"
    ["README.md"]="Project overview"
    [".gitignore"]="Git ignore rules"
)

# Check critical directories
echo "🗂️  Checking organizational directories..."
for dir in "${!EXPECTED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/ - ${EXPECTED_DIRS[$dir]}"
    else
        echo "❌ Missing: $dir/ - ${EXPECTED_DIRS[$dir]}"
    fi
done

echo ""

# Check critical files
echo "📄 Checking critical files..."
for file in "${!CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - ${CRITICAL_FILES[$file]}"
    else
        echo "❌ Missing: $file - ${CRITICAL_FILES[$file]}"
    fi
done

echo ""

# Check for clutter in root
echo "🧹 Checking for clutter in root directory..."
CLUTTER_FOUND=false

# Check for common clutter patterns
for pattern in "*.backup" "*.bak" "*.old" "*.tmp" "*~" "*.csv"; do
    if ls $pattern 1> /dev/null 2>&1; then
        echo "⚠️  Found clutter: $pattern files in root"
        CLUTTER_FOUND=true
    fi
done

# Check for misplaced documentation
for doc in *README* *CHANGELOG* *TODO* *GUIDE* *MANUAL*; do
    if [ -f "$doc" ] && [ "$doc" != "README.md" ]; then
        echo "⚠️  Consider moving to docs/: $doc"
        CLUTTER_FOUND=true
    fi
done

# Check for data files in root
for data in *.csv *.json *.xml; do
    if [ -f "$data" ] && [[ ! "$data" =~ ^(sitemap\.xml|BingSiteAuth\.xml|robots\.txt|firebase\.json|package.*\.json|database\.rules\.json)$ ]]; then
        echo "⚠️  Consider moving to data/: $data"
        CLUTTER_FOUND=true
    fi
done

if [ "$CLUTTER_FOUND" = false ]; then
    echo "✅ Root directory is clean!"
fi

echo ""

# Count files by directory
echo "📊 Directory file counts:"
for dir in */ .[^.]*/; do
    if [ -d "$dir" ] && [ "$dir" != ".git/" ]; then
        count=$(find "$dir" -type f | wc -l | tr -d ' ')
        echo "  $dir $count files"
    fi
done

# Count root files
root_files=$(find . -maxdepth 1 -type f | wc -l | tr -d ' ')
echo "  (root): $root_files files"

echo ""

# Git status check
if command -v git >/dev/null 2>&1 && [ -d .git ]; then
    echo "📋 Git repository status:"
    
    # Check for untracked files
    untracked=$(git ls-files --others --exclude-standard)
    if [ -n "$untracked" ]; then
        echo "📝 Untracked files found:"
        echo "$untracked" | head -10
        if [ $(echo "$untracked" | wc -l) -gt 10 ]; then
            echo "  ... and $(($(echo "$untracked" | wc -l) - 10)) more"
        fi
    else
        echo "✅ No untracked files"
    fi
    
    # Check for staged changes
    if ! git diff-index --quiet --cached HEAD --; then
        echo "📝 Staged changes detected"
    else
        echo "✅ No staged changes"
    fi
    
    # Check for unstaged changes  
    if ! git diff-index --quiet HEAD --; then
        echo "📝 Unstaged changes detected"
    else
        echo "✅ No unstaged changes"
    fi
fi

echo ""
echo "🎯 Organization validation complete!"
echo ""
echo "💡 Tips:"
echo "   - Run './tools/organize-cleanup.sh' to fix common organization issues"
echo "   - See 'docs/DIRECTORY_STRUCTURE.md' for detailed organization guidelines"
echo "   - Keep production files in root, development files in organized subdirectories"
