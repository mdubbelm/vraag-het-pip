/**
 * Service Worker voor Vraag het Pip
 * Caching voor offline gebruik
 */

const CACHE_VERSION = '1.1.0';
const CACHE_NAME = `pip-cache-v${CACHE_VERSION}`;

// Bestanden om te cachen
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/app.html',
    '/css/style.css',
    '/js/login.js',
    '/js/app.js',
    '/js/data.js',
    '/manifest.json',
    // Icons
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    // Pip foto's
    '/images/pip/pip-kerst-1.jpg',
    '/images/pip/pip-kerst-2.jpg',
    '/images/pip/pip-kerst-trui.jpg',
    '/images/pip/pip-verjaardag.jpg',
    '/images/pip/pip-werk-1.jpg',
    '/images/pip/pip-werk-2.jpg',
    '/images/pip/pip-slaapt-1.jpg',
    '/images/pip/pip-slaapt-2.jpg',
    '/images/pip/pip-slaapt-3.jpg',
    '/images/pip/pip-relax-bank.jpg',
    '/images/pip/pip-bed.jpg',
    '/images/pip/pip-denkt.jpg',
    '/images/pip/pip-knuffel-arm.jpg',
    '/images/pip/pip-polaroid.jpg',
    '/images/pip/pip-alert.jpg',
    '/images/pip/pip-closeup.jpg',
    '/images/pip/pip-zit.jpg',
    '/images/pip/pip-schoen.jpg',
    '/images/pip/pip-speels.jpg',
    '/images/pip/pip-speels-1.jpg',
    '/images/pip/pip-auto.jpg',
    '/images/pip/pip-puppy.jpg',
    '/images/pip/pip-hoodie.jpg',
    '/images/pip/pip-thuis.jpg'
];

// Install - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate - cleanup oude caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - cache first, then network
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
                // Cache hit
                return cachedResponse;
            }

            // Cache miss - fetch from network
            return fetch(request)
                .then(response => {
                    // Don't cache non-successful responses
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    // Clone response
                    const responseToCache = response.clone();

                    // Cache images and other assets
                    if (request.url.includes('/images/') || request.url.includes('/icons/')) {
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, responseToCache);
                        });
                    }

                    return response;
                })
                .catch(() => {
                    // Network failed - show offline page for navigation
                    if (request.mode === 'navigate') {
                        return caches.match('/index.html');
                    }
                });
        })
    );
});
