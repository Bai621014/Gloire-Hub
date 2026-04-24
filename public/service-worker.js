// GloireHub Service Worker - Alerte Prophétique 19h
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '🙏🏿 Heure de la Parole';
  const body = data.body || "C'est l'heure d'écouter la parole de vie. Jésus est le chemin, la vérité et la vie. Laisse le mal et reçois la vie éternelle au nom de Jésus Christ.";
  
  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'parole-19h',
    renotify: true,
    requireInteraction: true,
    data: { url: '/tv?channel=loveworld' }
  });
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/tv'));
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker Royaume activé');
});
