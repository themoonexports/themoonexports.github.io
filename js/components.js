/**
 * The Moon Exports - Component Loader
 * Loads header and footer components dynamically
 * Usage: Include this script in your HTML pages and call loadComponents()
 */

function loadComponent(elementId, filePath, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID '${elementId}' not found`);
        if (callback) callback(false);
        return;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            element.innerHTML = html;
            console.log(`Component loaded: ${filePath}`);
            if (callback) callback(true);
        })
        .catch(error => {
            console.error(`Error loading component ${filePath}:`, error);
            if (callback) callback(false);
        });
}

function loadComponents(language = 'en') {
    const basePath = language === 'en' ? 'includes/' : `${language}/includes/`;
    
    // Load header
    loadComponent('header-placeholder', `${basePath}header.html`);
    
    // Load footer
    loadComponent('footer-placeholder', `${basePath}footer.html`);
}

// Auto-detect language from URL and load components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    let language = 'en';
    
    if (path.includes('/de/')) {
        language = 'de';
    } else if (path.includes('/fr/')) {
        language = 'fr';
    }
    
    loadComponents(language);
});
