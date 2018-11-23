const CACHE_KEY = 'cache-v1'; // версия кэша


// console.log(...global.serviceWorkerOption.assets.map(asset => '/' + asset))

// console.log(global.serviceWorkerOption);

// const { assets } = global.serviceWorkerOption;
// // console.log(assets);

// let cacheUrls = [...assets, '/build'];
// // console.log(cacheUrls);

// cacheUrls = cacheUrls.map(path => {
// 	return new URL(path, global.location).toString();
// });
// console.log(cacheUrls);


const cacheUrls = [ // кэшируемые файлы
	...global.serviceWorkerOption.assets.map( asset => '.' + asset),
// 	'/',
	// '/build/bundle.js.map',
	// '/favicon.ico',
// 	'/about',
// 	'/profile'

	'/',
	// '/index.html',
	// '/build/bundle.js.map',
	// '/build/style.js.map',
	// '/build/sw.js.map',
    
	// '/img/ships/blue.png',
	// '/img/ships/green.png',
	// '/img/ships/red.png',
	// '/img/ships/yellow.png',

	// '/img/base.png',
	// '/img/empty.png',
	// '/img/gold.png',
	// '/img/grass.png',
	// '/img/plant.png',
	// '/img/unopened.png',
	// '/img/water.png',

	// '/scripts/main.js',

	// '/scripts/game/Boat.mjs',
	// '/scripts/game/Card.mjs',
	// '/scripts/game/Game.mjs',
	// '/scripts/game/gameBus.mjs',
	// '/scripts/game/Map.mjs',
	// '/scripts/game/MapBuilder.mjs',
	// '/scripts/game/Player.mjs',

	// '/scripts/blocks/Block/Block.mjs',
	// '/scripts/blocks/Button/Button.css',
	// '/scripts/blocks/Button/Button.mjs',
	// '/scripts/blocks/Form/Form.css',
	// '/scripts/blocks/Form/Form.mjs',
	// '/scripts/blocks/Header/Header.css',
	// '/scripts/blocks/Header/header.pug',
	// '/scripts/blocks/Paginator/Paginator.mjs',
	// '/scripts/blocks/Table/Table.css',
	// '/scripts/blocks/Table/Table.mjs',

	// '/scripts/modules/eventBus.mjs',
	// '/scripts/modules/http.mjs',
	// '/scripts/modules/websocket.mjs',
	// '/scripts/modeles/Router.mjs',
	// '/scripts/modeles/jwt-decoder.mjs',

	// '/scripts/services/users.mjs',

	// '/scripts/views/BaseView/baseView.js',
	// '/scripts/views/BaseView/BaseView.mjs',
	// '/scripts/views/BaseView/baseView.pug',
	// '/scripts/views/LandingView/Landing.css',
	// '/scripts/views/LandingView/Landing.mjs',
	// '/scripts/views/LandingView/landingView.js',
	// '/scripts/views/LandingView/landingView.pug',
	// '/scripts/views/LeadersView/Leaders.css',
	// '/scripts/views/LeadersView/Leaders.mjs',
	// '/scripts/views/MenuView/Menu.css',
	// '/scripts/views/MenuView/Menu.mjs',
	// '/scripts/views/ProfileView/Profile.css',
	// '/scripts/views/ProfileView/Profile.mjs',
	// '/scripts/views/RulesView/RulesView.css',
	// '/scripts/views/RulesView/RulesView.mjs',
	// '/scripts/views/SignInView/SignIn.css',
	// '/scripts/views/SignInView/SignIn.mjs',
	// '/scripts/views/SignUpView/SignUp.css',
	// '/scripts/views/SignUpView/SignUp.mjs',
	// '/scripts/views/GameView/gameMap.js',
	// '/scripts/views/GameView/gameMap.pug',
	// '/scripts/views/GameView/GameView.mjs',

	// '/styles/style.css',
];

self.addEventListener('install', event => {
	console.log(cacheUrls);
	event.waitUntil(
		global.caches
			.open(CACHE_KEY)  // открываем кэш
			.then(cache => {
				return cache.addAll(cacheUrls); // записываем url
			})
	);
});

// self.addEventListener('activate', event => {
// 	event.waitUntil(
// 		global.caches.keys()
// 			.then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if (cacheName.indexOf(CACHE_KEY) === 0) {
//                         return null
//                     }

//                     return global.caches.delete(cacheName)
//                 })
//             )
//         })
//     )
// });

self.addEventListener('fetch', event => {
	console.log('kkk', event.response);
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
				return global.caches.match('index.html');
			})
	);
});