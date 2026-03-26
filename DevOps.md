# DevOps Audit — The Moon Exports

**Audit Date:** March 2026  
**Auditor Role:** Senior DevOps Engineer  
**Repository:** themoonexports/themoonexports.github.io  
**Hosting:** GitHub Pages (CNAME → www.themoonexports.com)

---

## Issues Identified

### 1 · Missing Security Headers (HSTS & CSP)

| Field | Detail |
|-------|--------|
| **Severity** | 🔴 High |
| **Status** | ✅ Fixed |
| **File** | `.htaccess` |

`.htaccess` lacked `Strict-Transport-Security` and `Content-Security-Policy`
headers even though `docs/PRODUCTION_READINESS_SUMMARY.md` and
`docs/SECURITY_CHECKLIST.md` claimed they were deployed. Both headers have now
been added to `.htaccess`.

---

### 2 · Dead Legacy JS in Locale Directories

| Field | Detail |
|-------|--------|
| **Severity** | 🟡 Medium |
| **Status** | ✅ Fixed |
| **Files** | `de/js/npm.js`, `de/js/application.js`, `fr/js/npm.js`, `fr/js/application.js`, `instago/js/npm.js`, `instago/js/application.js` |

These files are Bootstrap-era scaffolding leftovers with zero callers (no HTML
page loads them). The CI `validate` job already blocked the same files in the
root `js/` directory but missed the locale copies. Files deleted and CI
extended.

---

### 3 · Missing Locale CSS Asset (crafts-ui.css)

| Field | Detail |
|-------|--------|
| **Severity** | 🟡 Medium |
| **Status** | ✅ Fixed |
| **Files** | `de/css/crafts-ui.css`, `fr/css/crafts-ui.css` |

`de/index.html` and `fr/index.html` both contain
`<link href="css/crafts-ui.css" rel="stylesheet">` (locale-relative path), but
the file only existed under the root `css/` directory. Copies placed into
`de/css/` and `fr/css/`.

---

### 4 · CI Validation Gap — Locale Dead-File Check

| Field | Detail |
|-------|--------|
| **Severity** | 🟡 Medium |
| **Status** | ✅ Fixed |
| **File** | `.github/workflows/ci.yml` |

The `validate` job's "Check dead legacy JS files removed" step only inspected
`js/` — it did not check `de/js/`, `fr/js/`, or `instago/js/`. Extended the
loop to cover all locale directories.

---

### 5 · Root Build Script Is a No-Op

| Field | Detail |
|-------|--------|
| **Severity** | 🟠 High |
| **Status** | ✅ Fixed |
| **File** | `package.json` |

`npm run build` was `echo 'Static site - no build process required'`. The
Firebase deploy workflows (`firebase-hosting-merge.yml`,
`firebase-hosting-pull-request.yml`) run `npm ci && npm run build`, so they
were deploying without rebuilding React bundles. Updated to
`cd react && npm install && npm run build` so deployments always ship fresh
bundles.

---

### 6 · Documentation Claims vs Reality

| Field | Detail |
|-------|--------|
| **Severity** | 🟡 Medium |
| **Status** | ✅ Fixed |
| **Files** | `docs/PRODUCTION_READINESS_SUMMARY.md`, `docs/SECURITY_CHECKLIST.md` |

Several completed-checkbox items claimed CSP, HSTS, and Firebase security
headers were live. CSP and HSTS are now actually deployed in `.htaccess`;
documentation notes updated to reflect the implementation location (`.htaccess`,
not Firebase).

---

### 7 · Locale CSS Parity Not Enforced in CI

| Field | Detail |
|-------|--------|
| **Severity** | 🟢 Low |
| **Status** | ✅ Fixed |
| **File** | `.github/workflows/ci.yml` |

Added a CI step to verify that every CSS file referenced with a locale-relative
path in `de/index.html` and `fr/index.html` actually exists. This prevents
future regressions like the missing `crafts-ui.css`.

---

## Summary

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Missing HSTS & CSP headers | 🔴 High | ✅ Fixed |
| 2 | Dead legacy JS in locale dirs | 🟡 Medium | ✅ Fixed |
| 3 | Missing locale crafts-ui.css | 🟡 Medium | ✅ Fixed |
| 4 | CI gap — locale dead-file check | 🟡 Medium | ✅ Fixed |
| 5 | No-op root build script | 🟠 High | ✅ Fixed |
| 6 | Doc claims vs reality | 🟡 Medium | ✅ Fixed |
| 7 | Locale CSS parity not in CI | 🟢 Low | ✅ Fixed |
