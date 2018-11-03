const CACHE_KEY = 'cache-v1'; //название кэша

const cacheUrls = [ //кэшируемые файлы
    '/',
    '/index.html',
    '/scripts/main.js',

    '/scripts/blocks/Block/Block.mjs',
    '/scripts/blocks/Button/Button.css',
    '/scripts/blocks/Button/Button.mjs',
    '/scripts/blocks/Form/Forum.css',
    '/scripts/blocks/Form/Forum.mjs',
    '/scripts/blocks/Header/Header.css',
    '/scripts/blocks/Header/header.pug',
    '/scripts/blocks/Paginator/Paginarot.mjs',
    '/scripts/blocks/Table/Table.css',
    '/scripts/blocks/Table/Table.mjs',

    '/scripts/views/BaseView/baseView.js',
    '/scripts/views/BaseView/baseView.mjs',
    '/scripts/views/BaseView/baseView.pug',
    '/scripts/views/LandingView/Landing.css',
    '/scripts/views/LandingView/Landing.mjs',
    '/scripts/views/LandingView/landingView.js',
    '/scripts/views/LandingView/landingView.pug',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',
    // '/scripts/views/View/View',


    
    // UsersService.js',
    // '/scripts/main.js',
    // '/scripts/Router.js',
    // '/scripts/MenuView.js',
    // '/scripts/BaseView.js',
    // '/scripts/bus.js',
    // '/scripts/ScoreboardView.js',

    '/styles/style.css',
];

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_KEY).then(function(cache) {  //открываем кэш
            return cache.addAll(cacheUrls); //записываем url
        })
    );
});

this.addEventListener('fetch', event => {
    event.respodWith(   //собственно получение нужного ресурса
        caches.match(event.request).then(function(cacheedResponse) {    //ищем запрошенные данные
            return cacheedResponse || fetch(event.request).then(function(response) {
                caches.open(CACHE_KEY).then(function(cache) {    //если получили новые данные - кэшируем
                    cache.put(event.request, response.clone());
                });
                return response;
            });
        }).catch(function() {
            return caches.match('404.html');
        })
    );
});