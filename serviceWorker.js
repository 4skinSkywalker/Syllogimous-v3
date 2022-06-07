const version = "syllogimous-v3"
const assets = [
    "/",
    "/index.html",
    "/styles.css",
    "/main.js"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(version).then(cache => {
            cache.addAll(assets)
        })
    )
    console.log(`${version} installed successfully!`);
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.open(version)
            .then(cache => cache.match(fetchEvent.request))
            .then(response => response || fetch(fetchEvent.request))
    )
});

self.addEventListener("activate", event => {
    caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
            if (cacheName !== version) {
                caches.delete(cacheName);
            }
        });
    });
});