#!/bin/bash

# Production Readiness Build Script for The Moon Exports
# This script performs basic checks and validations

echo "🔍 Running Production Readiness Checks..."
echo "=========================================="

# Check for HTTP URLs in HTML files
echo "1. Checking for insecure HTTP URLs..."
HTTP_COUNT=$(grep -r "http://" --include="*.html" . | grep -v "http://www.w3.org" | grep -v "http://ogp.me" | wc -l)
if [ $HTTP_COUNT -gt 0 ]; then
    echo "⚠️  Found $HTTP_COUNT potential insecure HTTP URLs:"
    grep -r "http://" --include="*.html" . | grep -v "http://www.w3.org" | grep -v "http://ogp.me" | head -5
else
    echo "✅ No insecure HTTP URLs found"
fi

# Check Firebase configuration
echo ""
echo "2. Validating Firebase configuration..."
if [ -f "firebase.json" ]; then
    echo "✅ Firebase configuration exists"
    if grep -q "Content-Security-Policy" firebase.json; then
        echo "✅ Security headers configured"
    else
        echo "❌ Security headers missing"
    fi
else
    echo "❌ Firebase configuration missing"
fi

# Check for package.json
echo ""
echo "3. Checking dependency management..."
if [ -f "package.json" ]; then
    echo "✅ Package.json exists"
else
    echo "❌ Package.json missing"
fi

# Check for outdated jQuery versions
echo ""
echo "4. Checking for outdated dependencies..."
JQUERY_OLD=$(grep -r "jquery/1\." --include="*.html" . | wc -l)
if [ $JQUERY_OLD -gt 0 ]; then
    echo "⚠️  Found $JQUERY_OLD files using outdated jQuery 1.x"
    echo "    Recommendation: Update to jQuery 3.7.x"
else
    echo "✅ No outdated jQuery versions detected"
fi

# Check Bootstrap version
BOOTSTRAP_OLD=$(grep -r "bootstrap.*3\." --include="*.html" . | wc -l)
if [ $BOOTSTRAP_OLD -gt 0 ]; then
    echo "⚠️  Found files using outdated Bootstrap 3.x"
    echo "    Recommendation: Update to Bootstrap 5.3.x"
else
    echo "✅ Bootstrap version check passed"
fi

# Check for inline scripts (potential CSP issues)
echo ""
echo "5. Checking for inline scripts (CSP compliance)..."
INLINE_SCRIPTS=$(grep -r "<script>" --include="*.html" . | grep -v "application/ld+json" | wc -l)
if [ $INLINE_SCRIPTS -gt 0 ]; then
    echo "⚠️  Found $INLINE_SCRIPTS inline scripts that may need CSP nonces"
else
    echo "✅ No problematic inline scripts found"
fi

# Summary
echo ""
echo "=========================================="
echo "📊 Production Readiness Summary:"
echo "  Security Headers: $([ -f firebase.json ] && grep -q "Content-Security-Policy" firebase.json && echo "✅ Configured" || echo "❌ Missing")"
echo "  HTTPS URLs: $([ $HTTP_COUNT -eq 0 ] && echo "✅ All secure" || echo "⚠️  $HTTP_COUNT issues")"
echo "  Dependencies: $([ $JQUERY_OLD -eq 0 ] && echo "✅ Modern" || echo "⚠️  Outdated")"
echo "  Package Mgmt: $([ -f package.json ] && echo "✅ Present" || echo "❌ Missing")"

echo ""
echo "Next steps:"
echo "  1. Review PRODUCTION_READINESS_ASSESSMENT.md for detailed analysis"
echo "  2. Follow SECURITY_CHECKLIST.md for systematic improvements"
echo "  3. Run 'firebase serve' to test locally"
echo "  4. Run 'npm audit' when dependencies are added"

echo ""
echo "🏁 Production readiness check complete!"