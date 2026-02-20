/**
 * Navigation Module
 * The Moon Exports - Modern ES6+ Navigation Handler
 * Handles dropdown menus with keyboard navigation, touch support, and accessibility
 * 
 * @author The Moon Exports
 * @version 2.0.0
 * @license MIT
 */

(function() {
    'use strict';

    /**
     * @typedef {Object} DropdownConfig
     * @property {string} selector - CSS selector for dropdown containers
     * @property {boolean} closeOnClickOutside - Close dropdown when clicking outside
     * @property {boolean} closeOnEscape - Close dropdown on ESC key
     * @property {boolean} hoverEnabled - Enable hover functionality for desktop
     * @property {number} hoverDelay - Delay before closing on mouse leave (ms)
     */

    /**
     * Default configuration
     * @type {DropdownConfig}
     */
    const DEFAULT_CONFIG = {
        selector: '.navbar-nav .dropdown',
        closeOnClickOutside: true,
        closeOnEscape: true,
        hoverEnabled: true,
        hoverDelay: 200
    };

    /**
     * Navigation Dropdown Manager
     * Manages all dropdown menus in the navigation
     */
    class NavigationManager {
        /**
         * @param {DropdownConfig} config - Configuration object
         */
        constructor(config = {}) {
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.dropdowns = [];
            this.activeDropdown = null;
            this.hoverTimeout = null;
            
            this.init();
        }

        /**
         * Initialize the navigation manager
         */
        init() {
            // Find all dropdown elements
            const dropdownElements = document.querySelectorAll(this.config.selector);
            
            if (dropdownElements.length === 0) {
                console.warn('NavigationManager: No dropdown elements found');
                return;
            }

            // Create dropdown instances
            dropdownElements.forEach(element => {
                const dropdown = new Dropdown(element, this);
                this.dropdowns.push(dropdown);
            });

            // Setup global event listeners
            this.setupGlobalListeners();

            console.log(`NavigationManager: Initialized ${this.dropdowns.length} dropdown(s)`);
        }

        /**
         * Setup global event listeners
         */
        setupGlobalListeners() {
            // Close on outside click
            if (this.config.closeOnClickOutside) {
                document.addEventListener('click', (e) => {
                    if (!e.target.closest(this.config.selector)) {
                        this.closeAll();
                    }
                });
            }

            // Close on ESC key
            if (this.config.closeOnEscape) {
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.activeDropdown) {
                        this.activeDropdown.close();
                        this.activeDropdown.toggle.focus();
                    }
                });
            }
        }

        /**
         * Close all dropdowns
         */
        closeAll() {
            this.dropdowns.forEach(dropdown => dropdown.close());
            this.activeDropdown = null;
        }

        /**
         * Set the currently active dropdown
         * @param {Dropdown} dropdown - The dropdown to set as active
         */
        setActive(dropdown) {
            if (this.activeDropdown && this.activeDropdown !== dropdown) {
                this.activeDropdown.close();
            }
            this.activeDropdown = dropdown;
        }
    }

    /**
     * Individual Dropdown Controller
     */
    class Dropdown {
        /**
         * @param {HTMLElement} element - The dropdown container element
         * @param {NavigationManager} manager - Reference to the navigation manager
         */
        constructor(element, manager) {
            this.element = element;
            this.manager = manager;
            this.toggle = element.querySelector('.dropdown-toggle');
            this.menu = element.querySelector('.dropdown-menu');
            this.isOpen = false;
            this.hoverTimeout = null;

            if (!this.toggle || !this.menu) {
                console.warn('Dropdown: Missing toggle or menu element', element);
                return;
            }

            this.setupEventListeners();
        }

        /**
         * Setup event listeners for this dropdown
         */
        setupEventListeners() {
            // Click/touch toggle
            this.toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            // Keyboard navigation
            this.toggle.addEventListener('keydown', (e) => {
                this.handleKeyboard(e);
            });

            // Hover support for desktop (pointer: fine)
            if (this.manager.config.hoverEnabled && window.matchMedia('(pointer: fine)').matches) {
                this.element.addEventListener('mouseenter', () => {
                    clearTimeout(this.hoverTimeout);
                    this.open();
                });

                this.element.addEventListener('mouseleave', () => {
                    this.hoverTimeout = setTimeout(() => {
                        this.close();
                    }, this.manager.config.hoverDelay);
                });
            }

            // Focus trap within menu
            this.setupFocusTrap();
        }

        /**
         * Handle keyboard navigation
         * @param {KeyboardEvent} e - Keyboard event
         */
        handleKeyboard(e) {
            switch (e.key) {
            case 'Enter':
            case ' ': // Space
                e.preventDefault();
                this.toggle();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                }
                this.focusFirstItem();
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (!this.isOpen) {
                    this.open();
                }
                this.focusLastItem();
                break;
            }
        }

        /**
         * Setup focus trap for accessibility
         */
        setupFocusTrap() {
            const menuItems = this.menu.querySelectorAll('a[role="menuitem"]');
            
            menuItems.forEach((item, index) => {
                item.addEventListener('keydown', (e) => {
                    switch (e.key) {
                    case 'ArrowDown': {
                        e.preventDefault();
                        const nextIndex = (index + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;
                    }
                    case 'ArrowUp': {
                        e.preventDefault();
                        const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
                        menuItems[prevIndex].focus();
                        break;
                    }
                    case 'Home':
                        e.preventDefault();
                        menuItems[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        menuItems[menuItems.length - 1].focus();
                        break;
                    case 'Tab':
                        // Allow natural tab navigation but close dropdown
                        this.close();
                        break;
                    }
                });
            });
        }

        /**
         * Toggle dropdown open/closed
         */
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        /**
         * Open the dropdown
         */
        open() {
            if (this.isOpen) {
                return;
            }

            this.isOpen = true;
            this.element.classList.add('open');
            this.menu.style.display = 'block';
            this.toggle.setAttribute('aria-expanded', 'true');

            // Make menu items reachable by keyboard when open
            this.menu.querySelectorAll('a[role="menuitem"]').forEach(item => {
                item.removeAttribute('tabindex');
            });
            
            this.manager.setActive(this);
        }

        /**
         * Close the dropdown
         */
        close() {
            if (!this.isOpen) {
                return;
            }

            this.isOpen = false;
            this.element.classList.remove('open');
            this.menu.style.display = 'none';
            this.toggle.setAttribute('aria-expanded', 'false');

            // Remove menu items from tab order when closed
            this.menu.querySelectorAll('a[role="menuitem"]').forEach(item => {
                item.setAttribute('tabindex', '-1');
            });
            
            if (this.manager.activeDropdown === this) {
                this.manager.activeDropdown = null;
            }
        }

        /**
         * Focus the first menu item
         */
        focusFirstItem() {
            const firstItem = this.menu.querySelector('a[role="menuitem"]');
            if (firstItem) {
                firstItem.focus();
            }
        }

        /**
         * Focus the last menu item
         */
        focusLastItem() {
            const items = this.menu.querySelectorAll('a[role="menuitem"]');
            if (items.length > 0) {
                items[items.length - 1].focus();
            }
        }
    }

    /**
     * Initialize navigation when DOM is ready
     * @param {DropdownConfig} config - Optional configuration override
     * @returns {NavigationManager} The navigation manager instance
     */
    function initNavigation(config) {
        if (document.readyState === 'loading') {
            return new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', () => {
                    resolve(new NavigationManager(config));
                });
            });
        }
        return new NavigationManager(config);
    }

    // Export to global scope
    window.TheMoonExports = window.TheMoonExports || {};
    window.TheMoonExports.Navigation = {
        init: initNavigation,
        NavigationManager,
        Dropdown
    };

    // Auto-initialize with default config
    initNavigation();

})();
