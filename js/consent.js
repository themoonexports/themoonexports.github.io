(function () {
    'use strict';

    var namespace = window.TheMoonExports = window.TheMoonExports || {};
    namespace.Consent = namespace.Consent || {};

    var STORAGE_KEY = 'tme_cookie_consent_v1';
    var consentState = null;
    var readyCallbacks = [];

    function readStoredConsent() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                return null;
            }
            return JSON.parse(stored);
        } catch (error) {
            console.warn('Consent storage read failed:', error);
            return null;
        }
    }

    function persistConsent(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.warn('Consent storage write failed:', error);
        }
    }

    function notifyReady(state) {
        readyCallbacks.forEach(function (callback) {
            try {
                callback(state);
            } catch (error) {
                console.error('Consent callback failed:', error);
            }
        });
        readyCallbacks = [];
    }

    function hideBanner(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    function buildBanner() {
        var container = document.createElement('div');
        container.className = 'cookie-banner';
        container.setAttribute('role', 'dialog');
        container.setAttribute('aria-live', 'polite');
        container.innerHTML = '' +
            '<div class="cookie-banner__inner">' +
            '  <p class="cookie-banner__message">We use cookies to personalise content and analyse traffic. You can accept analytics cookies or keep only essential ones.</p>' +
            '  <div class="cookie-banner__actions">' +
            '    <button type="button" class="cookie-banner__btn js-cookie-accept">Accept Analytics</button>' +
            '    <button type="button" class="cookie-banner__btn cookie-banner__btn--secondary js-cookie-decline">Decline</button>' +
            '    <a class="cookie-banner__link" href="legal/privacy.html">Privacy Policy</a>' +
            '  </div>' +
            '</div>';

        var acceptBtn = container.querySelector('.js-cookie-accept');
        var declineBtn = container.querySelector('.js-cookie-decline');

        acceptBtn.addEventListener('click', function () {
            consentState = { analytics: true, timestamp: Date.now() };
            persistConsent(consentState);
            hideBanner(container);
            notifyReady(consentState);
        });

        declineBtn.addEventListener('click', function () {
            consentState = { analytics: false, timestamp: Date.now() };
            persistConsent(consentState);
            hideBanner(container);
            notifyReady(consentState);
        });

        document.body.appendChild(container);
    }

    function init() {
        consentState = readStoredConsent();
        if (consentState) {
            notifyReady(consentState);
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', buildBanner, { once: true });
        } else {
            buildBanner();
        }
    }

    namespace.Consent.onReady = function (callback) {
        if (typeof callback !== 'function') {
            return;
        }
        if (consentState !== null) {
            callback(consentState);
            return;
        }
        readyCallbacks.push(callback);
    };

    init();
}());
