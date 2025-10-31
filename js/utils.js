/**
 * Utility Functions
 * The Moon Exports - Common utility functions
 * 
 * @author The Moon Exports
 * @version 2.0.0
 * @license MIT
 */

(function() {
    'use strict';

    /**
     * DOM Ready helper
     * @param {Function} callback - Function to execute when DOM is ready
     */
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Trigger on leading edge
     * @returns {Function} Debounced function
     */
    function debounce(func, wait = 250, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    /**
     * Throttle function calls
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    function throttle(func, limit = 250) {
        let inThrottle;
        return function(...args) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Get current year
     * @returns {number} Current year
     */
    function getCurrentYear() {
        return new Date().getFullYear();
    }

    /**
     * Format date for legal documents
     * @param {Date} date - Date to format (defaults to today)
     * @param {string} locale - Locale string (defaults to 'en-US')
     * @returns {string} Formatted date string
     */
    function formatLegalDate(date = new Date(), locale = 'en-US') {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString(locale, options);
    }

    /**
     * Update copyright year in elements
     * @param {string} selector - CSS selector for copyright elements
     * @param {string} company - Company name (defaults to 'THEMOONEXPORTS.COM')
     */
    function updateCopyright(selector = '.copyright', company = 'THEMOONEXPORTS.COM') {
        const year = getCurrentYear();
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            // Preserve any existing content structure
            const text = element.textContent || element.innerText;
            if (text.toLowerCase().includes('copyright')) {
                element.innerHTML = `COPYRIGHT © ${year} ${company}`;
            }
        });
    }

    /**
     * Update placeholder dates in content
     * Replaces {{CURRENT_YEAR}} and {{CURRENT_DATE}} placeholders
     */
    function updatePlaceholders() {
        const year = getCurrentYear();
        const date = formatLegalDate();
        
        // Get all text nodes containing placeholders
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const nodesToUpdate = [];
        let node = walker.nextNode();

        while (node) {
            if (node.nodeValue.includes('{{CURRENT_YEAR}}') || 
                node.nodeValue.includes('{{CURRENT_DATE}}')) {
                nodesToUpdate.push(node);
            }
            node = walker.nextNode();
        }

        // Update the nodes
        nodesToUpdate.forEach(node => {
            node.nodeValue = node.nodeValue
                .replace(/\{\{CURRENT_YEAR\}\}/g, year)
                .replace(/\{\{CURRENT_DATE\}\}/g, date);
        });
    }

    /**
     * Lazy load images with intersection observer
     * @param {string} selector - CSS selector for lazy images
     */
    function lazyLoadImages(selector = 'img[data-src]') {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazyload');
                        img.classList.add('lazyloaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll(selector).forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll(selector).forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    /**
     * Smooth scroll to element
     * @param {string|HTMLElement} target - Target element or selector
     * @param {number} offset - Offset from top in pixels
     */
    function smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
        
        if (!element) {
            return;
        }

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Element to check
     * @param {number} offset - Offset in pixels
     * @returns {boolean} True if element is in viewport
     */
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }

    /**
     * Load external script dynamically
     * @param {string} src - Script URL
     * @param {Function} callback - Success callback
     * @param {Function} errorCallback - Error callback
     * @returns {Promise<void>}
     */
    function loadScript(src, callback, errorCallback) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => {
                if (callback) {
                    callback();
                }
                resolve();
            };
            
            script.onerror = (error) => {
                console.warn('Failed to load script:', src);
                if (errorCallback) {
                    errorCallback(error);
                }
                reject(error);
            };
            
            document.head.appendChild(script);
        });
    }

    /**
     * Get query parameter from URL
     * @param {string} name - Parameter name
     * @returns {string|null} Parameter value or null
     */
    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    /**
     * Set query parameter in URL without reload
     * @param {string} name - Parameter name
     * @param {string} value - Parameter value
     */
    function setQueryParam(name, value) {
        const url = new URL(window.location);
        url.searchParams.set(name, value);
        window.history.pushState({}, '', url);
    }

    /**
     * Detect touch device
     * @returns {boolean} True if touch device
     */
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }

    /**
     * Get viewport width
     * @returns {number} Viewport width in pixels
     */
    function getViewportWidth() {
        return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    }

    /**
     * Get viewport height
     * @returns {number} Viewport height in pixels
     */
    function getViewportHeight() {
        return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    }

    /**
     * Simple event emitter for pub/sub pattern
     */
    class EventEmitter {
        constructor() {
            this.events = {};
        }

        /**
         * Subscribe to event
         * @param {string} event - Event name
         * @param {Function} callback - Event handler
         */
        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        }

        /**
         * Unsubscribe from event
         * @param {string} event - Event name
         * @param {Function} callback - Event handler to remove
         */
        off(event, callback) {
            if (!this.events[event]) {
                return;
            }
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }

        /**
         * Emit event
         * @param {string} event - Event name
         * @param {*} data - Event data
         */
        emit(event, data) {
            if (!this.events[event]) {
                return;
            }
            this.events[event].forEach(callback => callback(data));
        }
    }

    // Export to global scope
    window.TheMoonExports = window.TheMoonExports || {};
    window.TheMoonExports.Utils = {
        domReady,
        debounce,
        throttle,
        getCurrentYear,
        formatLegalDate,
        updateCopyright,
        updatePlaceholders,
        lazyLoadImages,
        smoothScrollTo,
        isInViewport,
        loadScript,
        getQueryParam,
        setQueryParam,
        isTouchDevice,
        getViewportWidth,
        getViewportHeight,
        EventEmitter
    };

})();
