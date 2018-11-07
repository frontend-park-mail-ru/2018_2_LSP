const CACHE_KEY = 'cache-v1'; // название кэша

const cacheUrls = [ // кэшируемые файлы
    '/',
    '/index.html',
    '/scripts/main.js',

    '/scripts/blocks/Block/Block.mjs',
    '/scripts/blocks/Button/Button.css',
    '/scripts/blocks/Button/Button.mjs',
    '/scripts/blocks/Form/Form.css',
    '/scripts/blocks/Form/Form.mjs',
    '/scripts/blocks/Header/Header.css',
    '/scripts/blocks/Header/header.pug',
    '/scripts/blocks/Paginator/Paginator.mjs',
    '/scripts/blocks/Table/Table.css',
    '/scripts/blocks/Table/Table.mjs',

    '/scripts/modules/eventBus.mjs',
    '/scripts/modules/http.mjs',
    '/scripts/modules/websocket.mjs',

    '/scripts/services/users.mjs',

    '/scripts/views/BaseView/baseView.js',
    '/scripts/views/BaseView/BaseView.mjs',
    '/scripts/views/BaseView/baseView.pug',
    '/scripts/views/LandingView/Landing.css',
    '/scripts/views/LandingView/Landing.mjs',
    '/scripts/views/LandingView/landingView.js',
    '/scripts/views/LandingView/landingView.pug',
    '/scripts/views/LeadersView/Leaders.css',
    '/scripts/views/LeadersView/Leaders.mjs',
    '/scripts/views/MenuView/Menu.css',
    '/scripts/views/MenuView/Menu.mjs',
    '/scripts/views/ProfileView/Profile.css',
    '/scripts/views/ProfileView/Profile.mjs',
    '/scripts/views/RulesView/RulesView.css',
    '/scripts/views/RulesView/RulesView.mjs',
    '/scripts/views/SignInView/SignIn.css',
    '/scripts/views/SignInView/SignIn.mjs',
    '/scripts/views/SignUpView/SignUp.css',
    '/scripts/views/SignUpView/SignUp.mjs',

    '/styles/style.css',
];

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_KEY)  // открываем кэш
            .then(function(cache) {
                return cache.addAll(cacheUrls); // записываем url
            })
    );
});

this.addEventListener('fetch', event => {
    event.respondWith(   // собственно получение нужного ресурса
        caches.match(event.request) // ищем запрошенные данные
            .then(function(cacheedResponse) {
                return cacheedResponse || fetch(event.request).then(function(response) {
                    cloning = response.clone();
                    caches.open(CACHE_KEY).then(function(cache) {    // если получили новые данные - кэшируем
                        cache.put(event.request, cloning);
                    });
                    return response;
                });
            })
            .catch(function() {
                return caches.match('index.html');
            })
    );
});