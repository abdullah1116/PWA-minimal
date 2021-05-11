const staticCacheName = 'sw-cache';
const assets = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/assets/images/logo.png',
  '/assets/images/icon/icon-192x192.png',
  '/assets/js/index.js',
];

self.addEventListener('install', (evt) => {
  console.log('sw: installed', evt);

  evt.waitUntil(self.skipWaiting());
  return;
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('sw: caching');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('message', (evt) => {
  console.log('sw: message', evt);

  // if (event.data.type === 'CACHE_URLS') {
  //     event.waitUntil(
  //         caches.open(KEY)
  //             .then( (cache) => {
  //                 return cache.addAll(event.data.payload);
  //             })
  //     );
  // }
});

self.addEventListener('activate', (evt) => {
  console.log('sw: activated', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// fetch event
self.addEventListener('fetch', (evt) => {
  console.log('sw: fetch-event', evt);
  evt.respondWith(caches.match(evt.request));
});
