# Directory Structure - The Moon Exports Website

## Overview
This document describes the organized directory structure for The Moon Exports website project.

## Root Directory (Production Critical Files)
```
/
├── index.html              # Main landing page - PRIMARY ENTRY POINT
├── about.html              # Company information
├── products.html           # Product catalog
├── contact.html            # Contact form
├── faq.html               # Frequently asked questions
├── 404.html / 404.shtml   # Error pages
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── BingSiteAuth.xml       # Bing verification
├── favicon.ico            # Site icon
├── CNAME                  # Domain configuration
├── firebase.json          # Hosting configuration
├── .htaccess             # Server configuration
├── database.rules.json    # Firebase rules
├── package.json          # Dependencies
├── package-lock.json     # Dependency lock
└── LICENSE               # License file
```

## Product Pages (Root Level)
```
├── horn-crafts.html           # Buffalo horn products
├── wooden-crafts.html         # Wood handicrafts
├── resin.html                 # Resin products
├── buffalo-horn-plates.html   # Specific category
├── buffalo-horn-bowls.html    # Specific category
└── horn-decor.html           # Decorative items
```

## Content Directories
```
├── css/                   # Stylesheets
│   ├── bootstrap.min.css  # Framework styles
│   ├── one.css           # Custom styles
│   └── ...
├── js/                    # JavaScript files
│   ├── bootstrap.min.js   # Framework scripts
│   └── custom scripts
├── images/                # Media assets
│   ├── product photos
│   └── logos and branding
├── fonts/                 # Web fonts
├── de/                    # German localization
└── legal/                 # Legal pages
```

## Organizational Directories
```
├── docs/                  # Documentation
│   ├── PRODUCTION_READINESS_ASSESSMENT.md
│   ├── SECURITY_CHECKLIST.md
│   ├── SEO_INFRASTRUCTURE.md
│   ├── TESTING_PLAN.md
│   └── AI_CONTEXT_SUMMARY.md
├── tools/                 # Development scripts
│   ├── check-production-readiness.sh
│   └── ai-organize-files.sh
├── data/                  # Data files and exports
│   └── fruugo.csv
├── backup/                # Backup and archived files
│   ├── Buffalo Horn Plates filtered_files/
│   ├── Kamran-Khan.vcf
│   └── about-horn-plates.htm
└── temp/                  # Temporary development files
    └── placeholder.gif
```

## Hidden/Config Directories
```
├── .git/                  # Git repository
├── .github/               # GitHub configuration
├── .vscode/               # VS Code settings
├── .idx/                  # IDX environment
├── .firebaserc           # Firebase project config
├── .gitignore            # Git ignore rules
└── .aicontext            # AI agent guidance
```

## File Organization Rules

### Production Critical (Keep in Root)
- All HTML pages served directly to users
- Configuration files (firebase.json, .htaccess, etc.)
- SEO files (sitemap.xml, robots.txt, etc.)
- Domain and hosting files (CNAME, etc.)

### Documentation (docs/)
- Development guides and assessments
- Testing plans and security checklists
- AI context and organization guides

### Development Tools (tools/)
- Build and validation scripts
- Development automation
- Testing utilities

### Data Files (data/)
- CSV exports and data files
- Analytics exports
- Backup data (not user-facing)

### Backup Files (backup/)
- Old file versions
- Personal files (VCF contacts, etc.)
- Temporary extracted data
- Archived content

### Temporary Files (temp/)
- Development placeholders
- Build artifacts
- Temporary assets

## Benefits of This Organization

1. **Clean Root Directory**: Only production-critical files visible
2. **Logical Grouping**: Related files grouped by purpose
3. **AI Agent Friendly**: Clear separation makes AI navigation easier
4. **Maintainable**: Easy to find and update specific file types
5. **Deployment Ready**: Production files clearly separated from development

## Maintenance Guidelines

1. **New Documentation**: Add to `docs/` directory
2. **New Scripts**: Add to `tools/` directory  
3. **Data Exports**: Place in `data/` directory
4. **Old Files**: Move to `backup/` before deletion
5. **Temporary Work**: Use `temp/` directory

## Git Ignore Strategy

The `.gitignore` file is configured to:
- Ignore `temp/` and `backup/` directories
- Exclude personal files (*.vcf)
- Skip temporary files (*.tmp, *.backup, *.old)
- Prevent accidental commit of sensitive data

This structure maintains all dependencies while providing a clean, organized workspace for both human developers and AI agents.
