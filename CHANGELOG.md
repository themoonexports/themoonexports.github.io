# Changelog

All notable changes to The Moon Exports website will be documented in this file.

## [Unreleased] - 2024-07-05

### Added
- **CONTRIBUTING.md** - Comprehensive developer guidelines and coding standards
- **.editorconfig** - Consistent code formatting configuration across editors
- **CHANGELOG.md** - This changelog file to track project improvements
- **Documentation headers** in all custom CSS and JavaScript files
- **Organized assets directory** structure (`assets/css/`, `assets/js/`, `assets/fonts/`)

### Changed
- **File naming conventions** - Migrated to consistent kebab-case naming
  - `one.css` → `custom.css` (site-wide custom styles)
  - `w.css` → `theme.css` (theme and visual styling)
- **Directory naming** - Improved clarity and consistency
  - `de/` → `german/` (German language version)
  - `instago/` → `instagram-tools/` (Instagram tools section)
  - `Buffalo Horn Plates filtered_files/` → `buffalo-horn-plates-assets/`
- **README.md** - Enhanced with comprehensive project structure and development guidelines
- **CSS organization** - Added meaningful comments and documentation headers
- **JavaScript documentation** - Added JSDoc-style headers to application files

### Improved
- **Project structure** - Logical organization of files and directories
- **Code maintainability** - Consistent naming and documentation standards
- **Developer experience** - Clear guidelines and automated formatting
- **File organization** - Reduced clutter and improved navigation

### Technical Details

#### File Structure Improvements
```
Before:                          After:
├── de/                         ├── german/
├── instago/                    ├── instagram-tools/
├── Buffalo Horn Plates...      ├── buffalo-horn-plates-assets/
├── css/                        ├── assets/css/ (shared)
│   ├── one.css                │   ├── custom.css
│   └── w.css                  │   └── theme.css
└── duplicated Bootstrap files  └── css/ (page-specific)
```

#### Naming Convention Standardization
- **Files**: All use kebab-case (e.g., `buffalo-horn-plates.html`)
- **Directories**: Descriptive kebab-case names
- **CSS Classes**: kebab-case naming pattern
- **JavaScript**: camelCase for variables, JSDoc for functions

#### Documentation Enhancements
- Added comprehensive CONTRIBUTING.md with coding standards
- Enhanced README.md with development workflows
- Added meaningful comments to all custom CSS and JS files
- Created .editorconfig for consistent formatting

### Benefits
- **Easier onboarding** for new developers
- **Reduced technical debt** through consistent conventions
- **Improved maintainability** with clear documentation
- **Better organization** making files easier to locate and understand

---

## Previous Versions

Prior to this changelog, changes were not systematically documented. This represents the first major maintainability improvement initiative for the project.