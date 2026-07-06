// firebase-messaging-sw.js
// Этот файл ДОЛЖЕН лежать в корне сайта (рядом с index.html)
// GitHub Pages: загрузите его в корень репозитория

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC7MBMb7ZgbhyIQecie43Ba_hPpsyWwN5U",
  authDomain: "kalyani-c0eca.firebaseapp.com",
  projectId: "kalyani-c0eca",
  storageBucket: "kalyani-c0eca.firebasestorage.app",
  messagingSenderId: "67000182671",
  appId: "1:67000182671:web:59f76ce416c88308ee4dfa"
});

const messaging = firebase.messaging();

// Показывает уведомление когда приложение свёрнуто или закрыто
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🌿 FORTOONA', {
    body: body || 'Новый заказ!',
    icon: icon || 'favicon.ico',
    badge: 'favicon.ico',
    tag: 'fortoona-order',
    renotify: true,
    data: payload.data || {},
  });
});

// Клик по уведомлению — открывает сайт
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(self.registration.scope);
    })
  );
});
