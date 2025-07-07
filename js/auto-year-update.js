/**
 /**
 * Auto Year Update Utility
 * Automatically updates copyright years and effective dates
 * The Moon Exports Website
 */

(function() {
    'use strict';
    
    /**
     * Get current year
     */
    function getCurrentYear() {
        return new Date().getFullYear();
    }
    
    /**
     * Format current date for legal documents
     */
    function getCurrentDate() {
        const date = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    /**
     * Update copyright notices
     */
    function updateCopyrightYears() {
        const currentYear = getCurrentYear();
        
        // Update all copyright notices
        const copyrightElements = document.querySelectorAll('.copyright span, .copyright');
        copyrightElements.forEach(function(element) {
            if (element.textContent.includes('COPYRIGHT ©')) {
                element.innerHTML = 'COPYRIGHT © ' + currentYear + ' THEMOONEXPORTS.COM';
            }
        });
        
        // Update any span with copyright text
        const spans = document.querySelectorAll('span');
        spans.forEach(function(span) {
            if (span.textContent.includes('COPYRIGHT © THEMOONEXPORTS.COM')) {
                span.innerHTML = 'COPYRIGHT © ' + currentYear + ' THEMOONEXPORTS.COM';
            }
        });
    }
    
    /**
     * Update effective dates in legal documents
     */
    function updateEffectiveDates() {
        const currentDate = getCurrentDate();
        
        // Look for effective date paragraphs
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(function(p) {
            if (p.textContent.includes('Effective date:')) {
                p.innerHTML = 'Effective date: ' + currentDate;
            }
        });
        
        // Look for "Last updated" text
        const elements = document.querySelectorAll('*');
        elements.forEach(function(element) {
            if (element.textContent && element.textContent.includes('Last updated:')) {
                element.innerHTML = element.innerHTML.replace(
                    /Last updated:.*$/i, 
                    'Last updated: ' + currentDate
                );
            }
        });
    }
    
    /**
     * Add dynamic year placeholders for manual insertion
     */
    function addYearPlaceholders() {
        // Replace {{CURRENT_YEAR}} placeholders
        const allElements = document.querySelectorAll('*');
        allElements.forEach(function(element) {
            if (element.innerHTML && element.innerHTML.includes('{{CURRENT_YEAR}}')) {
                element.innerHTML = element.innerHTML.replace(/\{\{CURRENT_YEAR\}\}/g, getCurrentYear());
            }
        });
        
        // Replace {{CURRENT_DATE}} placeholders
        allElements.forEach(function(element) {
            if (element.innerHTML && element.innerHTML.includes('{{CURRENT_DATE}}')) {
                element.innerHTML = element.innerHTML.replace(/\{\{CURRENT_DATE\}\}/g, getCurrentDate());
            }
        });
    }
    
    /**
     * Initialize auto-update functionality
     */
    function init() {
        // Run immediately when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                updateCopyrightYears();
                updateEffectiveDates();
                addYearPlaceholders();
            });
        } else {
            // DOM is already ready
            updateCopyrightYears();
            updateEffectiveDates();
            addYearPlaceholders();
        }
    }
    
    // Public API
    window.AutoYearUpdate = {
        init: init,
        updateCopyrightYears: updateCopyrightYears,
        updateEffectiveDates: updateEffectiveDates,
        getCurrentYear: getCurrentYear,
        getCurrentDate: getCurrentDate
    };
    
    // Auto-initialize
    init();
    
})();
