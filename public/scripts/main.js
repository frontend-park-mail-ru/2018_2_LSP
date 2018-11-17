import Landing from './views/LandingView/Landing.mjs';
import Menu from './views/MenuView/Menu.mjs';
import RulesView from './views/RulesView/RulesView.mjs';
import Profile from './views/ProfileView/Profile.mjs';
import SignIn from './views/SignInView/SignIn.mjs';
import SignUp from './views/SignUpView/SignUp.mjs';
import Leaders from './views/LeadersView/Leaders.mjs';
import router from './modules/Router.mjs';
import GameView from './views/GameView/GameView.mjs';
import Logout from './views/Logout.mjs';
import Socket from './modules/websocket.mjs';
import Bus from '/scripts/modules/eventBus.mjs';
import Users from '/scripts/services/users.mjs';

// авторизация service-worker
// if ("serviceWorker" in navigator) {
// 	navigator.serviceWorker.register('ServiceWorcker.js')
// 		.then(function(registration) {
// 			console.log('Service worker registration OK:', registration);
// 		})
// 		.catch(function(error) {
// 			console.log('Service worker registration FAIL:', error);
// 		});
// }

//const router = new Router();
router.addPath('/', Landing);
router.addPath('/signin', SignIn, router);
router.addPath('/signup', SignUp, router);
router.addPath('/rules', RulesView,{type: 'back'});
router.addPath('/menu', Menu);
router.addPath('/leaders', Leaders);
router.addPath('/profile', Profile, {profile: ''});
router.addPath('/singleplayer', GameView, {mapSide: 5}); // n x n, нечетные
router.addPath('/logout', Logout);
router.start();

Bus.on('user:logged-in', user => {         
    const menuHeader = header({'headerType': 'loggedIn'});
    const navigationPart = document.getElementsByTagName('nav');
    navigationPart[0].innerHTML = '';
    navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);

    if(window.location.pathname == '/') {
        const backButton = document.getElementsByClassName('basicButton_back');
        backButton[0].hidden = true;
    }
})

if (document.cookie) {
    Bus.emit('user:logged-in');
}

Bus.on('user:logged-out', user => {         
    const menuHeader = header({'headerType': 'notLoggedIn'});
    const navigationPart = document.getElementsByTagName('nav');
    navigationPart[0].innerHTML = '';
    navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);

    if(window.location.pathname == '/') {
        const backButton = document.getElementsByClassName('basicButton_back');
        backButton[0].hidden = true;
    }
    
    Users.logout((err, response) => {
        if (err) {
            errorLine.setText(Errors.getErrorString(response.error));
            errorLine.show();
        }
    });
})