  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
  });
  
  self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');

    event.waitUntil(
      caches.open('v2').then((cache) => {
        return cache.addAll([
          '/index.html',
          '/script.js',
          '/manifest.json',
          '/language.js',
        ]);
      })
    );
  });
  
  // 오래된 캐시 삭제
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => cacheName !== 'v2').map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  });
  