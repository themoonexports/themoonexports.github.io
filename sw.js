/**
 * Service Worker for The Moon Exports Website
 * Basic caching strategy for improved performance
 */

const CACHE_NAME = 'themoonexports-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/bootstrap.min.css',
    '/css/one.css',
    '/js/bootstrap.min.js',
    '/js/auto-year-update.js',
    '/js/lazysizes.min.js',
    '/favicon.ico'
];

// Install event - cache essential resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});