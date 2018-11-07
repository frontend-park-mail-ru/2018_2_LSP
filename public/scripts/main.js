'use strict';

import Landing from './views/LandingView/Landing.mjs';
import Menu from './views/MenuView/Menu.mjs';
import RulesView from './views/RulesView/RulesView.mjs';
import Profile from './views/ProfileView/Profile.mjs';
import SignIn from './views/SignInView/SignIn.mjs';
import SignUp from './views/SignUpView/SignUp.mjs';
import Leaders from './views/LeadersView/Leaders.mjs';
import Socket from './modules/websocket.mjs';


// авторизация service-worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(function(registration) {
			console.log('Service worker registration OK:', registration);
		})
		.catch(function(error) {
			console.log('Service worker registration FAIL:', error);
		});
}

const application = document.getElementById('application');

// роутинг по страницам
application.addEventListener('click', event => {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}
	event.preventDefault();

	application.innerHTML = '';
	if (pages[event.target.dataset.href] != null) {
		pages[event.target.dataset.href]();
	}
});

createLandingPage();

// функции создания страниц
const pages = {
	landing: createLandingPage,
	signin: createSigninPage,
	signup: createSignupPage,
	menu: createMenuPage,
	leaders: createLeadersPage,
	rulesLanding: createRulesFromLanding,
	rulesMenu: createRulesFromMenu,
	profile: createProfilePage,
};

function createLandingPage() {
	const landingMenu = new Landing({});
	landingMenu.render();
}

function createSigninPage() {
	const signInPage = new SignIn({});
	signInPage.render();
}

function createSignupPage() {
	const signUpPage = new SignUp({});
	signUpPage.render();
}

function createMenuPage() {
	const mainMenu = new Menu();
	mainMenu.render();
}

function createLeadersPage(users) {
	const leadersPage = new Leaders(users);
	leadersPage.render();
}

function createRulesFromLanding() {
	const rulesPage = new RulesView({type: 'backToLanding'});
	rulesPage.render();
}

function createRulesFromMenu() {
	const rulesPage = new RulesView({type: 'backToMenu'});
	rulesPage.render();
}

function createProfilePage(profile) {
	const profilePage = new Profile(profile);
	profilePage.render();
}