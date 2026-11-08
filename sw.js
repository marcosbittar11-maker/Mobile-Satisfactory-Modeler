/* Factory Flow v0.4.23 · cache offline do PWA */
const CACHE_NAME = 'factory-flow-pwa-v0.4.23-drop-placement-1';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k.startsWith('factory-flow-pwa-') && k !== CACHE_NAME)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin ||
      !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;

  if (request.mode === 'navigate') {
    // Online: versões novas; offline: cópia completa da última instalação.
    event.respondWith(fetch(request).then(response => {
        // Só a entrada principal pode atualizar a cópia offline do aplicativo.
      // Um redirecionamento da antiga URL teste-tela.html não pode substituir index.html.
      const appPath = new URL('./', self.registration.scope).pathname;
      const indexPath = new URL('./index.html', self.registration.scope).pathname;
      if (response.ok && (url.pathname === appPath || url.pathname === indexPath)) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(c => c.put('./index.html', copy)));
      }
      return response;
    }).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match('./index.html') || await cache.match('./');
    }));
    return;
  }
  event.respondWith(caches.match(request).then(hit => hit || fetch(request).then(response => {
    if (response.ok && response.type === 'basic') {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE_NAME).then(c => c.put(request, copy)));
    }
    return response;
  })));
});
