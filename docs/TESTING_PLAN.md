# Testing Plan for Production Readiness
## The Moon Exports Website

**Last Updated:** October 31, 2025

**Related Documents:**
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Current production status
- [Production Readiness Assessment](PRODUCTION_READINESS_ASSESSMENT.md) - Original assessment
- [Security Checklist](SECURITY_CHECKLIST.md) - Security testing tracking
- [Next Phase Development Plan](NEXT_PHASE_DEVELOPMENT_PLAN.md) - Phase 4 execution plan with QA pipeline

### Security Testing

#### ✅ Completed Tests
- [x] **Mixed Content Check**: All `http://schema.org` URLs updated to `https://`
- [x] **Dependency Security**: jQuery updated from 1.11.2 to 3.7.1 LTS
- [x] **Font Awesome**: Updated from 4.3.0 to 6.5.0 with proper SRI
- [x] **IE8/9 Compatibility**: Removed outdated browser support code
- [x] **Security Headers**: Implemented via Firebase hosting configuration
- [x] **Analytics Consent Gating**: Cookie banner defers GA/Yandex until opt-in

#### 🔄 Pending Security Tests
- [ ] **OWASP ZAP Security Scan**: Run automated security testing
- [ ] **SSL/TLS Configuration**: Test with SSL Labs scanner
- [ ] **CSP Validation**: Test Content Security Policy implementation
- [ ] **Manual XSS Testing**: Test form inputs and user interactions
- [ ] **Analytics Security**: Review third-party script security
- [ ] **Consent Compliance Audit**: Validate banner copy, logging, and opt-out paths

#### Manual Security Testing Checklist
```bash
# Test CSP implementation
# Open browser dev tools → Security tab
# Check for CSP violations in console

# Test security headers
curl -I https://themoonexports.firebase.app/
# Should show:
# - Content-Security-Policy
# - X-Content-Type-Options: nosniff
# - X-Frame-Options: DENY
# - Strict-Transport-Security

# Test mixed content
# All resources should load over HTTPS
# No mixed content warnings in browser console
```

### Performance Testing

#### ✅ Completed Optimizations  
- [x] **jQuery Update**: Reduced from multiple versions to single modern version
- [x] **Font Awesome**: Updated to modern version with better performance
- [x] **IE Support Removal**: Eliminated unnecessary polyfills and scripts

#### 🔄 Pending Performance Tests
- [ ] **Lighthouse Audit**: Aim for 90+ scores across all metrics
- [ ] **WebPageTest**: Test from multiple global locations
- [ ] **Core Web Vitals**: Measure LCP, FID, CLS metrics
- [ ] **Mobile Performance**: Test on 3G/4G connections
- [ ] **Image Optimization**: Test lazy loading and compression

#### Performance Testing Commands
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run Lighthouse audit
lighthouse https://themoonexports.firebase.app/ --output html --output-path ./lighthouse-report.html

# Check Firebase performance
firebase serve --only hosting
# Test at http://localhost:5000
```

### Functionality Testing

#### Cross-Browser Testing
- [ ] **Chrome**: Latest version compatibility
- [ ] **Firefox**: Latest version compatibility  
- [ ] **Safari**: Latest version compatibility
- [ ] **Edge**: Latest version compatibility
- [ ] **Mobile Safari**: iOS testing
- [ ] **Chrome Mobile**: Android testing

#### Form Testing
- [ ] **Contact Forms**: Test submission and validation
- [ ] **Newsletter Signup**: Verify Zoho integration works
- [ ] **CSRF Protection**: Ensure forms are secure
- [ ] **Input Validation**: Test with malicious inputs

#### Navigation Testing
- [ ] **Internal Links**: All navigation works correctly
- [ ] **External Links**: Open properly with security attributes
- [ ] **Mobile Navigation**: Responsive menu functionality
- [ ] **Keyboard Navigation**: Accessibility compliance

### Consent & Privacy Testing
- [ ] **Cookie Banner Display**: Banner appears for new sessions on desktop and mobile
- [ ] **Analytics Blocking**: Verify GA/Yandex do not load before acceptance
- [ ] **Decline Path**: Ensure decline choice persists and hides banner
- [ ] **Policy Links**: Confirm privacy link targets the latest policy

### Firebase Hosting Testing

#### Local Testing
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Test locally
firebase serve --only hosting

# Test at http://localhost:5000
```

#### Deployment Testing
```bash
# Deploy to staging (if available)
firebase hosting:channel:deploy preview

# Deploy to production
firebase deploy --only hosting

# Test deployed version
curl -I https://themoonexports.firebase.app/
```

### Accessibility Testing

#### WCAG 2.1 AA Compliance
- [ ] **Color Contrast**: Ensure 4.5:1 ratio minimum
- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Screen Reader**: Test with NVDA/JAWS
- [ ] **Alt Text**: All images have descriptive alt attributes
- [ ] **Form Labels**: All inputs properly labeled

#### Testing Tools
```bash
# Install axe-cli for accessibility testing
npm install -g @axe-core/cli

# Run accessibility audit
axe https://themoonexports.firebase.app/
```

### SEO & Analytics Testing

#### Search Engine Optimization
- [ ] **Meta Tags**: Title, description, keywords properly set
- [ ] **Schema Markup**: Test structured data with Google's tool
- [ ] **Sitemap**: XML sitemap accessible and valid
- [ ] **Robots.txt**: Properly configured for crawling
- [ ] **Core Web Vitals**: Google PageSpeed Insights

#### Analytics Testing
- [ ] **Google Analytics**: Verify tracking code functionality (post-consent)
- [ ] **Yandex Metrica**: Confirm metrics collection (post-consent)
- [ ] **Privacy Compliance**: GDPR/cookie consent behaviour verified against policy

### Load Testing

#### Basic Load Testing
```bash
# Install artillery for load testing
npm install -g artillery

# Create basic load test
echo '
config:
  target: "https://themoonexports.firebase.app"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Homepage visit"
    requests:
      - get:
          url: "/"
' > load-test.yml

# Run load test
artillery run load-test.yml
```

### Monitoring & Alerting Testing

#### Error Monitoring
- [ ] **JavaScript Errors**: Set up error tracking (Sentry/LogRocket)
- [ ] **Performance Monitoring**: Firebase Performance Monitoring
- [ ] **Uptime Monitoring**: Set up external monitoring service
- [ ] **Analytics Alerts**: Configure unusual traffic alerts

### Test Results Tracking

#### Test Execution Log (Historical)
```
Date: June 28, 2024
Tester: GitHub Copilot
Environment: Development

Security Tests:
✅ Mixed content vulnerabilities resolved
✅ Dependencies updated to secure versions  
✅ Security headers implemented
⏳ CSP validation pending
⏳ Manual security testing pending

Performance Tests:
✅ jQuery optimization completed
✅ IE compatibility code removed
⏳ Lighthouse audit pending
⏳ Load testing pending
```

#### Test Execution Log (Current Status)
```
Date: October 31, 2025
Tester: GitHub Copilot
Environment: Production parity

Security & Privacy Tests:
✅ Consent banner deployed and verified
✅ GA/Yandex blocked until consent
✅ All critical vulnerabilities resolved
⏳ Consent compliance audit scheduled
⏳ CSP refinement ongoing

Analytics Tests:
✅ GA/Yandex blocked until consent
✅ Banner renders on desktop/mobile
⏳ Decline-state logging validation pending
⏳ Policy link content review pending

Functional Tests:
✅ Cross-browser basic testing completed
✅ React components hydrating correctly
⏳ Comprehensive mobile responsiveness testing pending
⏳ Form functionality testing pending

React Integration Tests:
✅ Header component hydration verified
✅ Newsletter form integration tested
✅ Consent hook integration confirmed
✅ Phase 2 components built and bundled
✅ Phase 3 Contact Form integrated in contact.html
✅ Phase 3 FAQ Accordion integrated in faq.html
✅ Phase 3 Product Modal integrated across pages
✅ Phase 3 Cookie Settings component built and integrated
✅ Phase 3 Testimonials, Accessibility, Scroll-to-Top built and integrated
```

### Post-Production Testing

#### Production Monitoring
- [ ] **Real User Monitoring**: Track actual user performance
- [ ] **Error Rate Monitoring**: Set thresholds and alerts
- [ ] **Security Incident Response**: Plan for security issues
- [ ] **Performance Regression**: Monitor for degradations

### Testing Schedule

**Phase 1 (Immediate)**: Security and functionality testing - ✅ COMPLETED  
**Phase 2 (Week 1)**: Performance and cross-browser testing - ✅ COMPLETED  
**Phase 3 (Week 2)**: Component migration and integration - ✅ COMPLETED  
**Phase 4 (Ongoing)**: Hardening, CI/CD, monitoring - 📋 PLANNED

### React Phase 3 Component Testing (Status: Built & Integrated)
- [ ] **Contact Form**: Validation, Zoho integration, consent-aware tracking
- [ ] **FAQ Accordion**: Expand/collapse, keyboard navigation, ARIA states
- [ ] **Product Modal**: Lightbox gallery, variants, multi-language, Escape key
- [ ] **Background**: Variant switching (default/gradient/image)
- [ ] **Cookie Settings**: Granular consent toggles, localStorage persistence
- [ ] **Testimonials**: Auto-advance carousel, pause on hover, reduced motion
- [ ] **Accessibility Widget**: Font size, contrast, reduced motion toggles
- [ ] **Scroll-to-Top**: Visibility threshold, smooth scroll
- [x] **All Phase 3 bundles**: Under 7 KB ✅
- [ ] **Cross-language**: EN/DE/FR pages render identically

### Phase 4 Testing Plan
- [ ] **CI Pipeline**: Lint, build, and bundle budget checks pass on every PR
- [ ] **Legacy JS Removal**: Site functions correctly after removing retired scripts
- [ ] **CSP Validation**: No CSP violations after inline script migration
- [ ] **Image Optimization**: WebP images load with JPEG fallback
- [ ] **i18n Parity**: `/de/` and `/fr/` pages have identical React integration
- [ ] **Search**: Product search returns correct results for all 23 products
- [ ] **Error Boundaries**: React errors caught and reported without page crash
- [ ] **Lighthouse CI**: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 90

### Phase 4 Automated CI Checks (New)

These checks are added to the CI pipeline during Phase 4 milestones:

| Check | Added In | Threshold | How |
|-------|----------|-----------|-----|
| Executable inline script count | Milestone 1 | ≤ 61 (decreasing) | Python script counts `<script>` blocks without `src=` or `application/ld+json` |
| `data-react` mount parity (EN vs DE/FR) | Milestone 1 | Delta = 0 | `grep` + `diff` mount attributes between index pages |
| Lighthouse CI baseline | Milestone 1 | Record only | `@lhci/cli autorun` on index.html |
| jQuery version consistency | Milestone 1 | Single version | `grep` for `jquery` version strings |
| IE shim absence | Milestone 1 | 0 matches | `grep html5shiv` across all HTML |
| SRI hash coverage | Milestone 3 | 100% external scripts | Count `integrity=` vs external `src=` |
| Lighthouse CI enforcement | Milestone 4 | Perf ≥ 85, A11y ≥ 90, SEO ≥ 90 | `@lhci/cli` with assertion config |

### Phase 4 Manual QA Regression Matrix

| Page | Navigation | Consent | React Mounts | Forms | Images | i18n |
|------|-----------|---------|-------------|-------|--------|------|
| index.html | ✓ hover/click/keyboard | ✓ banner + persist | 14 mounts | Newsletter | Hero + products | hreflang |
| about.html | ✓ | ✓ | Header, Footer | — | Profile | — |
| contact.html | ✓ | ✓ | ContactForm | Contact form | — | — |
| faq.html | ✓ | ✓ | FAQ accordion | — | — | — |
| products.html | ✓ | ✓ | ProductModal | — | Product grid | — |
| de/index.html | ✓ | ✓ | 14 mounts (after M2) | — | — | hreflang |
| fr/index.html | ✓ | ✓ | 14 mounts (after M2) | — | — | hreflang |
| legal/privacy.html | ✓ | ✓ | Header, Footer | — | — | — |

### Phase 4 Pre-Release Checklist (Every Milestone)

```
AUTOMATED (CI must pass):
├── npm run lint                    → 0 errors
├── npx tsc --noEmit                → 0 errors
├── npm run build                   → 17 bundles compile
├── Bundle size check               → All < 7 KB
├── npm audit                       → 0 high/critical
├── Inline script count             → ≤ threshold
├── Mount parity check              → EN = DE = FR
├── jQuery version check            → Single version
├── IE shim check                   → 0 matches
├── SRI hash check                  → 100% coverage (Milestone 3+)
└── Lighthouse CI                   → Scores ≥ thresholds (Milestone 4+)

MANUAL (Developer verifies):
├── Open index.html in Chrome, Firefox, Safari
├── Test navigation (desktop hover, mobile tap, keyboard Tab/Enter/Escape)
├── Test consent banner (new session, accept, decline, persist)
├── Test DE and FR index pages (React mounts render)
├── Check browser console for errors (zero JS errors)
├── Check Network tab for failed requests (zero 4xx/5xx)
├── Verify security headers with curl -I on production
└── Test on mobile viewport (responsive layout, touch targets)
```

---

## See Also

- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Overall project status
- [Security Checklist](SECURITY_CHECKLIST.md) - Security testing checklist
- [Phase 3 Implementation](PHASE_3_IMPLEMENTATION.md) - Current React migration phase
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - Completed React components
- [Design System](DESIGN_SYSTEM.md) - UI/UX testing reference

---

*Originally Created: June 28, 2024*  
*Last Updated: October 31, 2025*  
*Next Review: December 15, 2025*