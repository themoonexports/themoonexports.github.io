#!/bin/bash
# File Organization Maintenance Script
# Usage: ./tools/organize-cleanup.sh

echo "🧹 The Moon Exports - File Organization Cleanup"
echo "=============================================="

# Navigate to project root
cd "$(dirname "$0")/.."

echo "📁 Current directory: $(pwd)"
echo ""

# Function to move files with confirmation
move_with_confirm() {
    local file="$1"
    local dest_dir="$2"
    local description="$3"
    
    if [ -f "$file" ] || [ -d "$file" ]; then
        echo "Found: $file ($description)"
        read -p "Move to $dest_dir? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mkdir -p "$dest_dir"
            mv "$file" "$dest_dir/"
            echo "✅ Moved $file to $dest_dir/"
        else
            echo "⏭️  Skipped $file"
        fi
        echo ""
    fi
}

# Check for common clutter files
echo "🔍 Scanning for files that should be organized..."
echo ""

# Backup files
move_with_confirm "*.backup" "backup" "backup files"
move_with_confirm "*.bak" "backup" "backup files"
move_with_confirm "*.old" "backup" "old files"
move_with_confirm "*~" "backup" "temporary backup files"

# Temporary files
move_with_confirm "*.tmp" "temp" "temporary files"
move_with_confirm "placeholder.*" "temp" "placeholder files"

# Data files
move_with_confirm "*.csv" "data" "data export files"
move_with_confirm "*.json" "data" "data files (excluding config)"
move_with_confirm "*.xml" "data" "data XML files (excluding SEO)"

# Personal files
move_with_confirm "*.vcf" "backup" "contact files"

# Documentation that might be misplaced
move_with_confirm "*README*" "docs" "additional readme files"
move_with_confirm "*CHANGELOG*" "docs" "changelog files"
move_with_confirm "*TODO*" "docs" "todo files"

# Check for empty directories
echo "🗂️  Checking for empty directories..."
find . -type d -empty -not -path "./.git/*" -not -path "./node_modules/*" | while read -r dir; do
    if [ "$dir" != "." ]; then
        echo "Empty directory found: $dir"
        read -p "Remove empty directory $dir? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            rmdir "$dir"
            echo "✅ Removed empty directory: $dir"
        fi
    fi
done

echo ""
echo "✨ Organization cleanup complete!"
echo ""
echo "📋 Current root directory structure:"
ls -la | grep -E '^d|^-.*\.(html|xml|txt|json|ico)$' | head -20

echo ""
echo "💡 Tip: Run 'git status' to see what changes were made"
echo "💡 Don't forget to update .gitignore if needed"
