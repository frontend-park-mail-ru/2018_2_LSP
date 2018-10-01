'use strict';

import { Landing } from './components/Landing/Landing.mjs';
import { Menu } from './components/Menu/Menu.mjs';
import { RulesPage } from './components/RulesPage/RulesPage.mjs';
import { Profile } from './components/Profile/Profile.mjs';
import { SignIn } from './components/SignIn/SignIn.mjs';
import { SignUp } from './components/SignUp/SignUp.mjs';
import { Leaders } from './components/Leaders/Leaders.mjs';


const application = document.getElementById('application');

//роутинг по страницам
application.addEventListener('click', function(event) {
	if (!(event.target instanceof HTMLAnchorElement)) {
		return;
	}
	event.preventDefault();

	application.innerHTML = '';
	pages[event.target.dataset.href]();
});

createLandingPage();

//функции создания страниц
const pages = {
	landing: createLandingPage,
	signin: createSigninPage,
	signup: createSignupPage,
	menu: createMenuPage,
	leaders: createLeadersPage,
	//rules: createRulesPage,
	rulesLanding: createRulesFromLanding,
	rulesMenu: createRulesFromMenu,
	profile: createProfilePage
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
	const rulesPage = new RulesPage({type: 'fromLanding'});
	rulesPage.render();
}

function createRulesFromMenu() {
	const rulesPage = new RulesPage({type: 'fromMenu'});
	rulesPage.render();
}

function createProfilePage(profile) {
	const profilePage = new Profile(profile);
	profilePage.render();
}