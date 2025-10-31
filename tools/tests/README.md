# Test & Diagnostic Pages

This directory contains non-production HTML pages used for diagnostics, verification, and regression testing.

## Files
- `comprehensive-validation.html` – Full site feature validation
- `diagnostic-icons.html` – Font/icon rendering checks
- `test-dropdown-carets.html` – Navbar caret behavior
- `test-social-icons.html` – Social media icon rendering
- `quick-fix-test.html` – Rapid iterative UI check
- `final-test.html` – Pre-deployment confirmation
- `test-auto-year.html` – Auto year/date replacement engine

## Usage
Open via local server:
```
python3 -m http.server 8000
# then visit http://localhost:8000/tools/tests/quick-fix-test.html
```

## Production Policy
These files are excluded from navigation and not to be linked publicly.

## Next.js Migration Note
Equivalent pages can later live under `/dev/` and be wrapped in a guard (`NODE_ENV === 'development'`).
