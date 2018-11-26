import Landing from './views/LandingView/Landing.mjs';
import Menu from './views/MenuView/Menu.mjs';
import RulesView from './views/RulesView/RulesView.mjs';
import Profile from './views/ProfileView/Profile.mjs';
import SignIn from './views/SignInView/SignIn.mjs';
import SignUp from './views/SignUpView/SignUp.mjs';
import Leaders from './views/LeadersView/Leaders.mjs';
import Router from './modules/Router.mjs';
import GameView from './views/GameView/GameView.mjs';
import Logout from './views/Logout.mjs';
import Bus from './modules/eventBus.mjs';
import Users from './services/users.mjs';
import header from './blocks/Header/header.pug';
import '../img/favicon.ico';
import '../styles/base.scss';
import '../build/style.css';

// авторизация service-worker
if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {	
	navigator.serviceWorker.register('sw.js');
}

Router.addPath('/', Landing);
Router.addPath('/signin', SignIn);
Router.addPath('/signup', SignUp);
Router.addPath('/rules', RulesView, {type: 'back'});
Router.addPath('/menu', Menu);
Router.addPath('/leaders', Leaders, {page: 0});
Router.addPath('/profile', Profile, {profile: ''});
Router.addPath('/singleplayer', GameView, {mapSide: 5}); // n x n, нечетные
Router.addPath('/logout', Logout);
Router.start();

Bus.on('user:logged-in', () => {         
	const menuHeader = header({'headerType': 'loggedIn'});
	const navigationPart = document.getElementsByTagName('nav');
	navigationPart[0].innerHTML = '';
	navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);

	if(window.location.pathname == '/') {
		const backButton = document.getElementsByClassName('basicButton_back');
		backButton[0].hidden = true;
	}
});

if (document.cookie) {
	Bus.emit('user:logged-in');
}

Bus.on('user:logged-out', () => {         
	const menuHeader = header({'headerType': 'notLoggedIn'});
	const navigationPart = document.getElementsByTagName('nav');
	navigationPart[0].innerHTML = '';
	navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);

	if(window.location.pathname === '/') {
		const backButton = document.getElementsByClassName('basicButton_back');
		backButton[0].hidden = true;
	}
    
	Users.logout((err, response) => {
		if (err) {
			alert(response.error);
		}
	});
});
