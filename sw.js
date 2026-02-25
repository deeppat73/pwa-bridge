const CACHE_NAME = 'bridge-v1';
const ASSETS = ['./',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'];

// Cache files on install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    // 1. Check if the request is going to localhost or 127.0.0.1
    if (event.request.url.includes('localhost') || event.request.url.includes('127.0.0.1')) {
        // Return nothing, which tells the browser to handle the request 
        // normally OUTSIDE of the Service Worker's sandbox.
        // Otherwise, It causes "The FetchEvent for "http://localhost:62034/sign" resulted in a network error response"
        // on chromium based browsers
        return; 
    }

    // 2. Otherwise, handle with standard caching logic
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
