const staticCacheName = 'sw-cache-1';
const assets = [
  '/',
  'index.html',
  'favicon.ico',
  'manifest.json',
  'assets/images/logo.png',
  'assets/images/icon/icon-192x192.png',
  'assets/js/index.js',
];

self.addEventListener('install', (evt) => {
  console.log('sw: installed', evt);
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('sw: caching');
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (evt) => {
  console.log('sw: activated', evt);
  evt.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== staticCacheName)
            .map((key) => caches.delete(key))
        )
      )
  );
});

// fetch event
self.addEventListener('fetch', (evt) => {
  console.log('sw: fetch-event', evt);
  evt.respondWith(caches.match(evt.request));
});
