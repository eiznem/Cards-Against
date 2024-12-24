self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('black-cards-cache').then((cache) => {
            return cache.addAll([
                './index.html',
                './manifest.json',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Cards_Against_Humanity_logo.png/512px-Cards_Against_Humanity_logo.png'
            ]);
        })
    );
    console.log('Service Worker installed.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
