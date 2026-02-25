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

// Serve from cache if the network is down
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
