const CACHE_NAME = 'app-cache-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other critical CSS/JS/image files here
];

// Install event: caches the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// Fetch event: serves cached files if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file if found, otherwise fetch from the network
      return response || fetch(event.request);
    })
  );
});
