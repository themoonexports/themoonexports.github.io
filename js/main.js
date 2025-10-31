/**
 * Main Application Entry Point
 * The Moon Exports - Initializes all modules
 * 
 * @author The Moon Exports
 * @version 2.0.0
 * @license MIT
 */

(function() {
    'use strict';

    // Use utilities
    const { domReady, updateCopyright, updatePlaceholders } = window.TheMoonExports.Utils;

    /**
     * Initialize all application modules
     */
    function initApp() {
        console.log('The Moon Exports - Initializing...');

        // Update copyright years and date placeholders
        updateCopyright();
        updatePlaceholders();

        // Initialize navigation (already auto-initializes)
        // Navigation module handles dropdowns automatically

        // Initialize forms if present
        if (window.TheMoonExports.Forms) {
            window.TheMoonExports.Forms.initNewsletterForm();
            window.TheMoonExports.Forms.initContactForm();
        }

        // Initialize component loader if present
        // Components module auto-initializes and loads headers/footers

        console.log('The Moon Exports - Ready!');
    }

    // Initialize when DOM is ready
    domReady(initApp);

    // Export init function for manual initialization if needed
    window.TheMoonExports = window.TheMoonExports || {};
    window.TheMoonExports.init = initApp;

})();
