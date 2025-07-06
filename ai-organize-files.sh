#!/bin/bash

# AI Agent File Organization Script
# The Moon Exports Website - Automated File Categorization and Cleanup
# This script helps AI agents prioritize files and reduce repository clutter

echo "🤖 AI Agent File Organization Tool"
echo "=================================="
echo "Analyzing repository structure and providing AI-friendly file categorization..."

# Create analysis output
ANALYSIS_FILE="/tmp/ai-file-analysis.txt"
echo "AI Agent File Analysis Report - $(date)" > $ANALYSIS_FILE
echo "=======================================" >> $ANALYSIS_FILE

# Function to categorize files by priority
categorize_files() {
    echo "" >> $ANALYSIS_FILE
    echo "📋 FILE CATEGORIZATION BY PRIORITY" >> $ANALYSIS_FILE
    echo "=================================" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "🔴 CRITICAL PRODUCTION FILES (Immediate attention required):" >> $ANALYSIS_FILE
    echo "-----------------------------------------------------------" >> $ANALYSIS_FILE
    for file in index.html about.html products.html contact.html sitemap.xml robots.txt firebase.json .htaccess 404.html CNAME; do
        if [ -f "$file" ]; then
            echo "✅ $file" >> $ANALYSIS_FILE
        else
            echo "❌ MISSING: $file" >> $ANALYSIS_FILE
        fi
    done
    
    echo "" >> $ANALYSIS_FILE
    echo "🟠 HIGH PRIORITY CONTENT FILES:" >> $ANALYSIS_FILE
    echo "------------------------------" >> $ANALYSIS_FILE
    for file in horn-crafts.html wooden-crafts.html resin.html buffalo-horn-plates.html buffalo-horn-bowls.html horn-decor.html; do
        if [ -f "$file" ]; then
            echo "✅ $file" >> $ANALYSIS_FILE
        else
            echo "❌ MISSING: $file" >> $ANALYSIS_FILE
        fi
    done
    
    echo "" >> $ANALYSIS_FILE
    echo "🟡 MEDIUM PRIORITY DOCUMENTATION:" >> $ANALYSIS_FILE
    echo "--------------------------------" >> $ANALYSIS_FILE
    for file in README.md PRODUCTION_READINESS_SUMMARY.md TESTING_PLAN.md SEO_INFRASTRUCTURE.md .aicontext; do
        if [ -f "$file" ]; then
            echo "✅ $file" >> $ANALYSIS_FILE
        else
            echo "❌ MISSING: $file" >> $ANALYSIS_FILE
        fi
    done
    
    echo "" >> $ANALYSIS_FILE
    echo "🟢 LOW PRIORITY / CLEANUP CANDIDATES:" >> $ANALYSIS_FILE
    echo "-----------------------------------" >> $ANALYSIS_FILE
    for file in *.backup *.tmp *.old placeholder.gif "Buffalo Horn Plates filtered_files" fruugo.csv Kamran-Khan.vcf; do
        if [ -f "$file" ] || [ -d "$file" ]; then
            echo "⚠️  CLEANUP: $file" >> $ANALYSIS_FILE
        fi
    done
}

# Function to analyze file types and suggest organization
analyze_file_types() {
    echo "" >> $ANALYSIS_FILE
    echo "📊 FILE TYPE ANALYSIS" >> $ANALYSIS_FILE
    echo "====================" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "HTML Files ($(find . -name "*.html" | wc -l) total):" >> $ANALYSIS_FILE
    find . -name "*.html" | sort >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "Documentation Files ($(find . -name "*.md" | wc -l) total):" >> $ANALYSIS_FILE
    find . -name "*.md" | sort >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "Configuration Files:" >> $ANALYSIS_FILE
    for file in package.json firebase.json .htaccess robots.txt sitemap.xml; do
        if [ -f "$file" ]; then
            echo "✅ $file" >> $ANALYSIS_FILE
        fi
    done
    
    echo "" >> $ANALYSIS_FILE
    echo "Script Files:" >> $ANALYSIS_FILE
    find . -name "*.sh" -o -name "*.js" | sort >> $ANALYSIS_FILE
}

# Function to provide task-specific file recommendations
task_recommendations() {
    echo "" >> $ANALYSIS_FILE
    echo "🎯 TASK-SPECIFIC FILE RECOMMENDATIONS" >> $ANALYSIS_FILE
    echo "====================================" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "For SEO Enhancement Tasks, focus on:" >> $ANALYSIS_FILE
    echo "• sitemap.xml (PRIMARY)" >> $ANALYSIS_FILE
    echo "• robots.txt" >> $ANALYSIS_FILE
    echo "• index.html (meta tags)" >> $ANALYSIS_FILE
    echo "• All product pages (schema markup)" >> $ANALYSIS_FILE
    echo "• SEO_INFRASTRUCTURE.md (documentation)" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "For Performance Optimization, focus on:" >> $ANALYSIS_FILE
    echo "• css/ directory" >> $ANALYSIS_FILE
    echo "• js/ directory" >> $ANALYSIS_FILE
    echo "• images/ directory" >> $ANALYSIS_FILE
    echo "• firebase.json (caching headers)" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "For Content Management, focus on:" >> $ANALYSIS_FILE
    echo "• Product pages (horn-crafts.html, wooden-crafts.html, etc.)" >> $ANALYSIS_FILE
    echo "• about.html" >> $ANALYSIS_FILE
    echo "• contact.html" >> $ANALYSIS_FILE
    echo "• images/ directory" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "For Security Enhancement, focus on:" >> $ANALYSIS_FILE
    echo "• firebase.json (security headers)" >> $ANALYSIS_FILE
    echo "• package.json (dependencies)" >> $ANALYSIS_FILE
    echo "• All HTML pages (CSP compliance)" >> $ANALYSIS_FILE
    echo "• SECURITY_CHECKLIST.md" >> $ANALYSIS_FILE
}

# Function to suggest cleanup actions
suggest_cleanup() {
    echo "" >> $ANALYSIS_FILE
    echo "🧹 CLEANUP SUGGESTIONS" >> $ANALYSIS_FILE
    echo "=====================" >> $ANALYSIS_FILE
    
    echo "" >> $ANALYSIS_FILE
    echo "Files that can be safely moved or removed:" >> $ANALYSIS_FILE
    
    # Check for backup files
    if find . -name "*.backup" -o -name "*.bak" | head -1 | read; then
        echo "• Backup files: Move to /backup directory or remove if no longer needed" >> $ANALYSIS_FILE
        find . -name "*.backup" -o -name "*.bak" | head -5 >> $ANALYSIS_FILE
    fi
    
    # Check for temporary files
    if find . -name "*.tmp" -o -name "*~" | head -1 | read; then
        echo "• Temporary files: Add to .gitignore or remove" >> $ANALYSIS_FILE
        find . -name "*.tmp" -o -name "*~" | head -5 >> $ANALYSIS_FILE
    fi
    
    # Check for data files that should be organized
    if [ -f "fruugo.csv" ]; then
        echo "• fruugo.csv: Move to /data directory" >> $ANALYSIS_FILE
    fi
    
    if [ -f "Kamran-Khan.vcf" ]; then
        echo "• Kamran-Khan.vcf: Move to /personal directory or remove from repository" >> $ANALYSIS_FILE
    fi
    
    if [ -d "Buffalo Horn Plates filtered_files" ]; then
        echo "• 'Buffalo Horn Plates filtered_files': Organize into proper directory structure" >> $ANALYSIS_FILE
    fi
}

# Function to create .gitignore suggestions
suggest_gitignore() {
    echo "" >> $ANALYSIS_FILE
    echo "📝 .GITIGNORE ENHANCEMENT SUGGESTIONS" >> $ANALYSIS_FILE
    echo "====================================" >> $ANALYSIS_FILE
    echo "" >> $ANALYSIS_FILE
    echo "Add these patterns to .gitignore to prevent future clutter:" >> $ANALYSIS_FILE
    echo "" >> $ANALYSIS_FILE
    echo "# Temporary files" >> $ANALYSIS_FILE
    echo "*.tmp" >> $ANALYSIS_FILE
    echo "*.backup" >> $ANALYSIS_FILE
    echo "*.bak" >> $ANALYSIS_FILE
    echo "*~" >> $ANALYSIS_FILE
    echo "" >> $ANALYSIS_FILE
    echo "# Personal files" >> $ANALYSIS_FILE
    echo "*.vcf" >> $ANALYSIS_FILE
    echo "/personal/" >> $ANALYSIS_FILE
    echo "" >> $ANALYSIS_FILE
    echo "# Data exports" >> $ANALYSIS_FILE
    echo "*.csv" >> $ANALYSIS_FILE
    echo "/data/" >> $ANALYSIS_FILE
    echo "" >> $ANALYSIS_FILE
    echo "# AI analysis output" >> $ANALYSIS_FILE
    echo "/tmp/ai-*.txt" >> $ANALYSIS_FILE
}

# Main execution
echo "📁 Analyzing file structure..."
categorize_files

echo "🔍 Analyzing file types..."
analyze_file_types

echo "🎯 Generating task-specific recommendations..."
task_recommendations

echo "🧹 Identifying cleanup opportunities..."
suggest_cleanup

echo "📝 Creating .gitignore suggestions..."
suggest_gitignore

# Display summary to console
echo ""
echo "✅ Analysis complete! Key findings:"
echo "================================="

# Count files by category
CRITICAL_COUNT=$(find . -maxdepth 1 -name "index.html" -o -name "about.html" -o -name "products.html" -o -name "contact.html" -o -name "sitemap.xml" -o -name "robots.txt" -o -name "firebase.json" | wc -l)
HTML_COUNT=$(find . -name "*.html" | wc -l)
DOC_COUNT=$(find . -name "*.md" | wc -l)
TOTAL_ROOT_FILES=$(find . -maxdepth 1 -type f | wc -l)

echo "📊 File Statistics:"
echo "  • Total files in root: $TOTAL_ROOT_FILES"
echo "  • Critical production files: $CRITICAL_COUNT/7"
echo "  • HTML pages: $HTML_COUNT"
echo "  • Documentation files: $DOC_COUNT"

echo ""
echo "📋 For AI Agents:"
echo "  • Read .aicontext file first for project understanding"
echo "  • Focus on task-specific priority files (see analysis)"
echo "  • Ignore temporary/backup files unless specifically needed"
echo "  • Use SEO_INFRASTRUCTURE.md for SEO-related tasks"

echo ""
echo "📄 Full analysis report saved to: $ANALYSIS_FILE"
echo "   Use: cat $ANALYSIS_FILE | less  to view complete report"

# Create quick reference for current directory
echo ""
echo "🚀 Quick Reference - Current Priority Files:"
echo "============================================"
echo "CRITICAL: index.html, sitemap.xml, firebase.json"
echo "HIGH: product pages (horn-crafts.html, wooden-crafts.html, etc.)"
echo "MEDIUM: documentation (README.md, .aicontext)"
echo "LOW: temporary/backup files (cleanup candidates)"

echo ""
echo "Done! Use this analysis to prioritize your work effectively."