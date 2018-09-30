'use strict';

import { Landing } from './components/Landing/Landing.mjs';
import { Header } from './blocks/Header/Header.mjs';
import { Menu } from './components/Menu/Menu.mjs';
import { RulesPage } from './components/RulesPage/RulesPage.mjs';
//import { Block } from './blocks/block.js';

import Users from './services/users.js';
import Table from './blocks/Table/table.js';
import Form from './blocks/Form/form.js';

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

function errorHandler(error) {
	const errors = {
		'incorrect': 'Не верно указана почта и/или пароль',
		'invalid': 'Невалидные данные',
		'user': 'Пользователь уже существует',
		'default': 'Ошибка... Попробуйте ввести данные еще раз',
		'passwords': 'Необходимо, чтобы пароли различались'
	};
	return errors[error];

	// switch (error) {
	// 	case 'email':
	// 		return 'Не указана почта';
	// 	case 'password':
	// 		return 'Не указан пароль';
	// 	case 'incorrect':
	// 		return 'Не верно указана почта и/или пароль';
	// 	default:
	// 		return 'Ошибка... Попробуйте ввести данные еще раз';
	// }
}

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
	const header = new Header({type: 'backToLanding'})
	header.render();

	const signinSection = document.createElement('section');
	signinSection.dataset.sectionName = 'signin';

	const signinTitle = document.createElement('h2');
    signinTitle.textContent = "Вход";

	const errorLine = document.createElement('p');
	errorLine.classList.add('errorLine');
	errorLine.hidden = true

	//const form = document.createElement('form');

	const inputs = [
		{
			classes: [],
			attributes: {
				name: 'email',
				type: 'email',
				placeholder: 'Почта',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'password',
				type: 'password',
				placeholder: 'Пароль',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'submit',
				type: 'submit',
				value: 'Войти'
			}
		}
    ];

	const form = new Form(inputs);
	form.submit(function(data) {	//добавляем по нажатию кнопки событие
		Users.auth(function(err, response) {	//авторизации пользователя
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createMenuPage();
			} else {
				const errorLine = document.getElementsByClassName('errorLine')[0];
				errorLine.textContent = errorHandler(response.error)
				errorLine.hidden = false;
			}
		}, data);	//используем данные введенные в форму
	});
	
	signinSection.appendChild(signinTitle);
	signinSection.appendChild(errorLine);
    signinSection.appendChild(form.getElement());
	application.appendChild(signinSection);
}

function createSignupPage() {
	const inputs = [
		{
			classes: [],
			attributes: {
				name: 'login',
				type: 'text',
				placeholder: 'Логин',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'email',
				type: 'email',
				placeholder: 'Почта',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'password',
				type: 'password',
				placeholder: 'Пароль',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'password_repeat',
				type: 'password',
				placeholder: 'Повторите пароль',
				required: 'required'
			}
		},
		{
			classes: [],
			attributes: {
				name: 'submit',
				type: 'submit',
				value: 'Зарегистрироваться'
			}
		}
	];
    
	const header = new Header({type: 'backToLanding'})
	header.render();

	const signupSection = document.createElement('section');
	signupSection.dataset.sectionName = 'signup';

	const signupTitle = document.createElement('h2');
	signupTitle.textContent = 'Регистрация';

	const errorLine = document.createElement('p');
	errorLine.classList.add('errorLine');
	errorLine.hidden = true

	const form = new Form(inputs);
	form.submit(function(data) {	//добавляем по нажатию кнопки событие
		if (data[2] !== data[3]) {
			const errorLine = document.getElementsByClassName('errorLine')[0];
			errorLine.textContent = errorHandler('passwords')
			errorLine.hidden = false;
			return;
		}
		Users.register(function(err, response) {	//регистрации пользователя
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createMenuPage();
			} else {
				const errorLine = document.getElementsByClassName('errorLine')[0];
				errorLine.textContent = errorHandler(response.error)
				errorLine.hidden = false;
			}
		}, data);	//используем данные введенные в форму
	});

	signupSection.appendChild(signupTitle);
	signupSection.appendChild(errorLine);
    signupSection.appendChild(form.getElement());
	application.appendChild(signupSection);
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
    const header = new Header({type: 'backToMenu'})
	header.render();

	const profileSection = document.createElement('section');
	profileSection.dataset.sectionName = 'profile';

    const profileTitle = document.createElement('h2');
    profileTitle.textContent = "Профиль";

	const profileInner = document.createElement('div');
	
	profileSection.appendChild(profileTitle);
    profileSection.appendChild(profileInner);

	if (profile) {
        const userParams = {
            'Логин': profile.login,
			'Почта': profile.email,
			'Сыграно игр': profile.gamecount,
            'Счет': profile.score
        }; 
		Object.entries(userParams).forEach((param) => {
			const pParam = document.createElement('p');
			pParam.textContent = param[0] + ': ' + param[1];
			profileInner.appendChild(pParam);
		});
	} else {
		const callback = function(err, response) {
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createProfilePage(response);
			} else {
				alert('Unauthorized');
				application.innerHTML = '';
				createSigninPage();
			}
		};
		Users.profile(callback);
    }
    application.appendChild(profileSection);
}