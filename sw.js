'use strict';

console.log("Service worker registered");

var staticCacheName = 'restaurant-v1';

const cachePaths = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/data/restaurants.json'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(cachePaths);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(resp) {
                                const copyResp = resp.clone();
                                caches.open(staticCacheName).then(function(cache){
                                    cache.put(event.request, copyResp);
                                }).catch(function(error) {
                                    console.log(error);
                                })
                                return resp;
                            });
        })
    );
});