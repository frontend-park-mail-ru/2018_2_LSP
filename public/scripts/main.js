import Landing from './views/LandingView/Landing.mjs';
import Menu from './views/MenuView/Menu.mjs';
import RulesView from './views/RulesView/RulesView.mjs';
import Profile from './views/ProfileView/Profile.mjs';
import SignIn from './views/SignInView/SignIn.mjs';
import SignUp from './views/SignUpView/SignUp.mjs';
import Leaders from './views/LeadersView/Leaders.mjs';
import Router from './modules/Router.mjs';
import GameView from './views/GameView/GameView.mjs';
import Socket from './modules/websocket.mjs';
import bus from '/scripts/modules/eventBus.mjs';
import { Users } from '/scripts/services/users.mjs';

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

const router = new Router();
router.addPath('/', Landing);
router.addPath('/signin', SignIn, router);
router.addPath('/signup', SignUp, router);
router.addPath('/rules', RulesView,{type: 'back'});
router.addPath('/menu', Menu);
router.addPath('/leaders', Leaders);
router.addPath('/profile', Profile, {profile: '', router: router});
router.addPath('/singleplayer', GameView, {mapSide: 5}); //n x n, нечетные
router.start();

bus.on("user:logged-in", user => {         
    const menuHeader = header({"headerType": "loggedIn"});
    const navigationPart = document.getElementsByTagName("nav");
    navigationPart[0].innerHTML = "";
    navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);
})

// if (Users.isLoggedIn()) {
//     bus.emit("user:logged-in");
// }