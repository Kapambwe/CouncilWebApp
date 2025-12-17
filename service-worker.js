// Council Web App - Service Worker for Progressive Web App
// Provides offline capabilities, caching, and background sync

const CACHE_NAME = 'council-app-v1.0.0';
const RUNTIME_CACHE = 'council-app-runtime';
const OFFLINE_URL = '/offline.html';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/app.css',
    '/lib/bootstrap/dist/css/bootstrap.min.css',
    '/favicon.png',
    '/icon-192.png',
    '/manifest.json',
    '/offline.html',
    '/_framework/blazor.webassembly.js'
];

// Cache strategies
const CACHE_STRATEGIES = {
    CACHE_FIRST: 'cache-first',
    NETWORK_FIRST: 'network-first',
    STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
    NETWORK_ONLY: 'network-only',
    CACHE_ONLY: 'cache-only'
};

// Install event - precache essential assets
self.addEventListener('install', event => {
    console.log('[ServiceWorker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[ServiceWorker] Precaching app shell');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map(cacheName => {
                            console.log('[ServiceWorker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip chrome extensions and other protocols
    if (!request.url.startsWith('http')) {
        return;
    }

    // Determine caching strategy based on request type
    let strategy = getCachingStrategy(request);

    switch (strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
            event.respondWith(cacheFirst(request));
            break;
        case CACHE_STRATEGIES.NETWORK_FIRST:
            event.respondWith(networkFirst(request));
            break;
        case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
            event.respondWith(staleWhileRevalidate(request));
            break;
        case CACHE_STRATEGIES.NETWORK_ONLY:
            event.respondWith(fetch(request));
            break;
        case CACHE_STRATEGIES.CACHE_ONLY:
            event.respondWith(caches.match(request));
            break;
        default:
            event.respondWith(networkFirst(request));
    }
});

// Push notification event
self.addEventListener('push', event => {
    console.log('[ServiceWorker] Push received:', event);

    let notificationData = {
        title: 'Council App Notification',
        body: 'You have a new notification',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: 'council-notification',
        requireInteraction: false
    };

    if (event.data) {
        try {
            const data = event.data.json();
            notificationData = {
                title: data.title || notificationData.title,
                body: data.body || notificationData.body,
                icon: data.icon || notificationData.icon,
                badge: data.badge || notificationData.badge,
                tag: data.tag || notificationData.tag,
                requireInteraction: data.requireInteraction || false,
                data: data.data || {}
            };
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }

    event.waitUntil(
        self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon,
            badge: notificationData.badge,
            tag: notificationData.tag,
            requireInteraction: notificationData.requireInteraction,
            data: notificationData.data,
            actions: [
                {
                    action: 'view',
                    title: 'View'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        })
    );
});

// Notification click event
self.addEventListener('notificationclick', event => {
    console.log('[ServiceWorker] Notification click:', event);

    event.notification.close();

    if (event.action === 'view') {
        const urlToOpen = event.notification.data?.url || '/';
        
        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true })
                .then(windowClients => {
                    // Check if there's already a window open
                    for (let client of windowClients) {
                        if (client.url === urlToOpen && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // Open new window if none found
                    if (clients.openWindow) {
                        return clients.openWindow(urlToOpen);
                    }
                })
        );
    }
});

// Background sync event for offline operations
self.addEventListener('sync', event => {
    console.log('[ServiceWorker] Background sync:', event);

    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

// Message event for communication with client
self.addEventListener('message', event => {
    console.log('[ServiceWorker] Message received:', event);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(RUNTIME_CACHE)
                .then(cache => cache.addAll(event.data.urls))
        );
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});

// Helper: Determine caching strategy based on request
function getCachingStrategy(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Static assets - cache first
    if (pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
        return CACHE_STRATEGIES.CACHE_FIRST;
    }

    // Framework files - cache first
    if (pathname.startsWith('/_framework/')) {
        return CACHE_STRATEGIES.CACHE_FIRST;
    }

    // Content libraries - cache first
    if (pathname.startsWith('/_content/')) {
        return CACHE_STRATEGIES.CACHE_FIRST;
    }

    // API calls - network first with fallback
    if (pathname.startsWith('/api/')) {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }

    // HTML pages - network first with offline fallback
    if (pathname.endsWith('/') || pathname.endsWith('.html')) {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }

    // Default: network first
    return CACHE_STRATEGIES.NETWORK_FIRST;
}

// Cache First Strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('[ServiceWorker] Fetch failed for cache-first:', error);
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
    }
}

// Network First Strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[ServiceWorker] Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }

        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            const offlineResponse = await caches.match(OFFLINE_URL);
            if (offlineResponse) {
                return offlineResponse;
            }
        }

        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
    }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then(async networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(RUNTIME_CACHE);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
}

// Background sync function
async function syncData() {
    console.log('[ServiceWorker] Syncing data...');
    
    try {
        // Get pending operations from IndexedDB or cache
        // This would be implemented based on your specific needs
        
        // Example: Sync form submissions, offline changes, etc.
        const cache = await caches.open(RUNTIME_CACHE);
        const requests = await cache.keys();
        
        // Process pending requests
        for (const request of requests) {
            if (request.url.includes('/api/') && request.method !== 'GET') {
                try {
                    await fetch(request);
                    await cache.delete(request);
                } catch (error) {
                    console.error('[ServiceWorker] Failed to sync request:', error);
                }
            }
        }
        
        console.log('[ServiceWorker] Data sync complete');
        return Promise.resolve();
    } catch (error) {
        console.error('[ServiceWorker] Data sync failed:', error);
        return Promise.reject(error);
    }
}

console.log('[ServiceWorker] Loaded');
