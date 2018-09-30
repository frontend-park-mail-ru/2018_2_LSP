'use strict';

import { Landing } from './components/Landing/Landing.mjs';
import { Header } from './blocks/Header/Header.mjs';
import { Menu } from './components/Menu/Menu.mjs';
import { RulesPage } from './components/RulesPage/RulesPage.mjs';
import { Profile } from './components/Profile/Profile.mjs';
import { SignIn } from './components/SignIn/SignIn.mjs';
import { SignUp } from './components/SignUp/SignUp.mjs';

import Users from './services/users.js';
import Table from './blocks/Table/Table.mjs';
import Form from './blocks/Form/Form.mjs';

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
	const header = new Header({type: 'backToMenu'})
	header.render();

	const leadersSection = document.createElement('section');
	leadersSection.dataset.sectionName = 'leaders';

	const leadersTitle = document.createElement('h2');
    leadersTitle.textContent = "Лидеры";

	const leadersInner = document.createElement('div');
	
	const items = ['Логин', 'Почта', 'Сыграно', 'Рейтинг'];
	const leaderBoard = new Table(items);

	if (users) {
		leaderBoard.update(users);
		leadersInner.appendChild(leaderBoard.getElement());
	} else {
		const em = document.createElement('em');
		em.textContent = 'Еще никто не установил рекорд. Вы можете быть первыми;)';
		leadersInner.appendChild(em);

		const callback = function(err, response) {
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createLeadersPage(response);
			} else {
				alert(response.error);
			}
		}
		Users.leaders(callback);
    }
    leadersSection.appendChild(leadersTitle);
    leadersSection.appendChild(leadersInner);
   // application.appendChild(headerBlock);
	application.appendChild(leadersSection);
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