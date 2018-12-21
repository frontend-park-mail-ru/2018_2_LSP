/*global global*/
const CACHE_KEY = new Date().toISOString(); // версия кэша

const cacheUrls = [...global.serviceWorkerOption.assets.map( asset => '.' + asset), '/index.html'];	// кэшируемые файлы

self.addEventListener('install', event => {
	event.waitUntil(
		global.caches
			.open(CACHE_KEY)  // открываем кэш
			.then(cache => {
				return cache.addAll(cacheUrls); // записываем url
			})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(   // собственно получение нужного ресурса
		global.caches.match(event.request) // ищем запрошенные данные
			.then(function(cacheedResponse) {
				return cacheedResponse || fetch(event.request).then(function(response) {
					const cloning = response.clone();
					global.caches.open(CACHE_KEY).then(function(cache) {    // если получили новые данные - кэшируем
						cache.put(event.request, cloning);
					});
					return response;
				});
			})
			.catch(function() {
				return global.caches.match('/index.html');
			})
	);
});