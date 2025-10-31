/**
 * Form Handler Module
 * The Moon Exports - Form validation and submission handling
 * 
 * @author The Moon Exports
 * @version 2.0.0
 * @license MIT
 */

(function() {
    'use strict';

    /**
     * @typedef {Object} FormConfig
     * @property {string} successMessage - Success message to display
     * @property {string} errorMessage - Error message to display
     * @property {boolean} resetOnSuccess - Reset form after successful submission
     * @property {Function} onSuccess - Success callback
     * @property {Function} onError - Error callback
     */

    /**
     * Form validator and handler
     */
    class FormHandler {
        /**
         * @param {HTMLFormElement} form - The form element
         * @param {FormConfig} config - Configuration options
         */
        constructor(form, config = {}) {
            this.form = form;
            this.config = {
                successMessage: 'Thank you! Your submission was successful.',
                errorMessage: 'Sorry, there was an error. Please try again.',
                resetOnSuccess: true,
                ...config
            };
            
            this.init();
        }

        /**
         * Initialize form handler
         */
        init() {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Add real-time validation
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }

        /**
         * Handle form submission
         * @param {Event} e - Submit event
         */
        async handleSubmit(e) {
            e.preventDefault();

            // Validate all fields
            if (!this.validateForm()) {
                return;
            }

            const formData = new FormData(this.form);
            const submitButton = this.form.querySelector('[type="submit"]');
            
            // Disable submit button
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
            }

            try {
                const response = await fetch(this.form.action, {
                    method: this.form.method || 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.handleSuccess();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                this.handleError(error);
            } finally {
                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = submitButton.dataset.originalText;
                }
            }
        }

        /**
         * Validate entire form
         * @returns {boolean} True if form is valid
         */
        validateForm() {
            let isValid = true;
            const inputs = this.form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        /**
         * Validate individual field
         * @param {HTMLElement} field - Input field to validate
         * @returns {boolean} True if field is valid
         */
        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            let isValid = true;
            let errorMessage = '';

            // Required field validation
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                errorMessage = 'This field is required';
            } else if (type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (type === 'url' && value) {
                try {
                    new URL(value);
                } catch {
                    isValid = false;
                    errorMessage = 'Please enter a valid URL';
                }
            } else if (type === 'tel' && value) {
                const phoneRegex = /^[\d\s\-+()]+$/;
                if (!phoneRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
            } else if (field.hasAttribute('minlength')) {
                const minLength = parseInt(field.getAttribute('minlength'));
                if (value.length < minLength) {
                    isValid = false;
                    errorMessage = `Minimum ${minLength} characters required`;
                }
            } else if (field.hasAttribute('maxlength')) {
                const maxLength = parseInt(field.getAttribute('maxlength'));
                if (value.length > maxLength) {
                    isValid = false;
                    errorMessage = `Maximum ${maxLength} characters allowed`;
                }
            } else if (field.hasAttribute('pattern') && value) {
                const pattern = new RegExp(field.getAttribute('pattern'));
                if (!pattern.test(value)) {
                    isValid = false;
                    errorMessage = field.getAttribute('title') || 'Invalid format';
                }
            }

            if (isValid) {
                this.clearFieldError(field);
            } else {
                this.showFieldError(field, errorMessage);
            }

            return isValid;
        }

        /**
         * Show field error
         * @param {HTMLElement} field - Input field
         * @param {string} message - Error message
         */
        showFieldError(field, message) {
            field.classList.add('error');
            field.setAttribute('aria-invalid', 'true');

            // Remove existing error message
            this.clearFieldError(field);

            // Create error message element
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.setAttribute('role', 'alert');

            // Insert after field
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }

        /**
         * Clear field error
         * @param {HTMLElement} field - Input field
         */
        clearFieldError(field) {
            field.classList.remove('error');
            field.removeAttribute('aria-invalid');

            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
        }

        /**
         * Handle successful submission
         */
        handleSuccess() {
            this.showMessage(this.config.successMessage, 'success');

            if (this.config.resetOnSuccess) {
                this.form.reset();
            }

            if (this.config.onSuccess) {
                this.config.onSuccess();
            }
        }

        /**
         * Handle submission error
         * @param {Error} error - Error object
         */
        handleError(error) {
            console.error('Form submission error:', error);
            this.showMessage(this.config.errorMessage, 'error');

            if (this.config.onError) {
                this.config.onError(error);
            }
        }

        /**
         * Show message to user
         * @param {string} message - Message text
         * @param {string} type - Message type ('success' or 'error')
         */
        showMessage(message, type = 'info') {
            // Remove existing messages
            const existingMessage = this.form.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create message element
            const messageElement = document.createElement('div');
            messageElement.className = `form-message form-message-${type}`;
            messageElement.textContent = message;
            messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');

            // Insert at top of form
            this.form.insertBefore(messageElement, this.form.firstChild);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }

    /**
     * Newsletter form handler
     * @param {string} formSelector - CSS selector for newsletter form
     */
    function initNewsletterForm(formSelector = '#newsletter-form') {
        const form = document.querySelector(formSelector);
        if (!form) {
            return;
        }

        new FormHandler(form, {
            successMessage: 'Thank you for subscribing to our newsletter!',
            errorMessage: 'Sorry, we couldn\'t process your subscription. Please try again.',
            resetOnSuccess: true
        });
    }

    /**
     * Contact form handler
     * @param {string} formSelector - CSS selector for contact form
     */
    function initContactForm(formSelector = '#contact-form') {
        const form = document.querySelector(formSelector);
        if (!form) {
            return;
        }

        new FormHandler(form, {
            successMessage: 'Thank you for your message! We\'ll get back to you soon.',
            errorMessage: 'Sorry, we couldn\'t send your message. Please try again or email us directly.',
            resetOnSuccess: true
        });
    }

    // Export to global scope
    window.TheMoonExports = window.TheMoonExports || {};
    window.TheMoonExports.Forms = {
        FormHandler,
        initNewsletterForm,
        initContactForm
    };

})();
