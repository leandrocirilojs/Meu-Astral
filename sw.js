const CACHE_NAME = 'oraculo-astral-v3';
const ASSETS = [
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install: cache apenas assets estáticos (NÃO o index.html)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.map(url => new Request(url, { mode: 'no-cors' })));
    }).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: apaga TODOS os caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch:
// - index.html → sempre rede (nunca cache) para pegar atualizações
// - API Mistral → sempre rede
// - outros → cache first
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Sempre rede para API e fontes
  if (url.hostname.includes('mistral.ai') || url.hostname.includes('googleapis.com')) {
    return event.respondWith(fetch(event.request).catch(() => new Response('')));
  }

  // Sempre rede para index.html — garante atualizações imediatas
  if (url.pathname === '/' || url.pathname.endsWith('index.html')) {
    return event.respondWith(
      fetch(event.request).then(response => {
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => caches.match('/index.html'))
    );
  }

  // Cache first para ícones e manifest
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => new Response(''));
    })
  );
});
