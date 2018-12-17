'use strict';

console.log("Service worker registered");

var staticCacheName = 'restaurant-v1';

const cachePaths = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
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