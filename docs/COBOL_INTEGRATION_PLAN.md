# COBOL Integration Plan — Feasibility Assessment
## The Moon Exports — Backend Processing Evaluation

**Created:** February 2026
**Status:** 📋 Proposal — Awaiting stakeholder review

**Related Documents:**
- [Next Phase Development Plan](NEXT_PHASE_DEVELOPMENT_PLAN.md) — Current roadmap
- [Phase 4 Implementation](PHASE_4_IMPLEMENTATION.md) — Active workstream checklists
- [../react-refactoring.md](../react-refactoring.md) — React migration roadmap
- [Security Checklist](SECURITY_CHECKLIST.md) — Security remediation tracking

---

## 0. Context

**Core question in one sentence:**

> Can COBOL add value to The Moon Exports project, and if so, where does it fit in the current architecture of static HTML/CSS served via GitHub Pages with progressive React/TypeScript hydration?

---

## 1. Current Architecture Summary

| Layer | Technology | Role |
|-------|-----------|------|
| **Hosting** | GitHub Pages | Static file serving |
| **Markup** | HTML5 / Bootstrap 3 | Crawlable, multilingual pages (EN/DE/FR) |
| **Styling** | CSS / Bootstrap | Responsive layout |
| **Client JS** | Vanilla JS + React/TypeScript | Progressive enhancement, hydration |
| **Forms** | Zoho (external POST) | Contact / newsletter submission |
| **Analytics** | Consent-gated scripts | Privacy-compliant tracking |
| **Backend** | None (static site) | No server-side processing |

---

## 2. COBOL Feasibility Analysis

### 2.1 What COBOL Is

COBOL (Common Business-Oriented Language) is a compiled language designed in 1959 for business data processing. It excels at:
- High-volume batch processing of structured records
- Fixed-point decimal arithmetic (financial calculations)
- Mainframe and enterprise environments (IBM z/OS, MicroFocus, GnuCOBOL)

### 2.2 Where COBOL Does Not Fit

| Constraint | Impact |
|-----------|--------|
| **GitHub Pages is static-only** | No server-side execution — COBOL programs cannot run on the hosting platform |
| **No backend exists** | The site has no application server, API layer, or database to integrate with |
| **Client-side stack is JS/TS** | Browsers cannot execute COBOL natively |
| **Team expertise** | Current stack is HTML/CSS/JS/React — COBOL would require new tooling and skills |
| **Deployment pipeline** | GitHub Pages deploys static files only; no CI step compiles or runs COBOL |

### 2.3 Potential Use Cases (If a Backend Were Added)

If the project were to add a server-side component in the future, COBOL could theoretically handle:

| Use Case | COBOL Suitability | Simpler Alternative |
|----------|-------------------|---------------------|
| Order/invoice batch processing | ✅ Strong (decimal arithmetic) | Node.js / Python with decimal libraries |
| Product catalog data transformation | ⚠️ Possible but over-engineered | Node.js scripts (already in stack) |
| Currency conversion calculations | ✅ Strong (fixed-point math) | JS `Intl.NumberFormat` or server-side Node.js |
| Report generation | ✅ Traditional COBOL strength | Modern reporting tools (PDF libs, etc.) |

---

## 3. Recommended Path Forward

### 3.1 Immediate (No COBOL Needed)

The current static architecture does not require or support server-side processing. All identified Phase 4 goals (security hardening, legacy cleanup, i18n parity, observability) can be completed with the existing HTML/CSS/JS/React stack.

### 3.2 If Server-Side Processing Becomes Necessary

Should the project evolve to need backend processing (e.g., order management, inventory), the recommended evaluation order is:

1. **Serverless functions** (Cloudflare Workers, Netlify Functions, AWS Lambda) — zero-infrastructure, JS/TS compatible
2. **Node.js API** — leverages existing team skills and toolchain
3. **GnuCOBOL microservice** — only if there is a specific requirement for COBOL's strengths (high-volume batch financial processing) that cannot be met by alternatives above

### 3.3 GnuCOBOL Integration Architecture (Reference)

If COBOL is chosen for a specific backend task, the integration pattern would be:

```
┌─────────────────┐     HTTPS/JSON      ┌──────────────────┐
│  GitHub Pages   │ ──────────────────▶  │  API Gateway     │
│  (Static Site)  │                      │  (Node.js/Express)│
│  React + HTML   │ ◀──────────────────  │                  │
└─────────────────┘                      └────────┬─────────┘
                                                  │
                                         ┌────────▼─────────┐
                                         │  GnuCOBOL        │
                                         │  Batch Processor  │
                                         │  (compiled .so)   │
                                         └──────────────────┘
```

- **Static site** calls an external API endpoint via `fetch()`
- **API Gateway** (Node.js) receives requests and invokes compiled COBOL modules
- **GnuCOBOL** programs are compiled to shared libraries (`.so`) and called via Node.js FFI or subprocess
- All analytics/API calls must remain behind `TheMoonExports.Consent.onReady()` gating

### 3.4 Prerequisites for COBOL Adoption

| Prerequisite | Status |
|-------------|--------|
| Identify a specific business process requiring COBOL | ❌ Not identified |
| Set up GnuCOBOL compilation in CI | ❌ Not started |
| Create API layer for static-to-backend communication | ❌ Not started |
| Provision hosting for backend service | ❌ Not started |
| Team COBOL training or hiring | ❌ Not started |

---

## 4. Decision

**Recommendation:** Do not adopt COBOL at this time. The current static architecture and JS/React toolchain cover all identified requirements. Revisit this plan if a specific backend batch-processing need arises that justifies COBOL's strengths over modern alternatives.

**Next review:** When backend processing is added to the project roadmap.
