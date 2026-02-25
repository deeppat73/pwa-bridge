const CACHE_NAME = 'bridge-v1';
const ASSETS = ['./',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'];


self.addEventListener('install', (event) => {
    // Force the waiting service worker to become the active service worker immediately
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Ensure that the service worker takes control of all pages in its scope immediately
    event.waitUntil(clients.claim());
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

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
