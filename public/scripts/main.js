'use strict';

import { 
	LandingMenuContent ,
} from './components/LandingContent/LandingContent.mjs';

import { 
	Header,
} from './components/Header/Header.mjs';

import Users from './services/users.js';


//import someValue from './components/Board/Board.mjs';
//console.log('someValue', someValue);

//обращение к ajax с помощью данного модуля (get / post)
//const AJAX = window.AjaxModule;

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

//вспомогательные функции создания блоков
function makeInputField(input) {
    const p = document.createElement('p');
	const field = document.createElement('input');
	// field.required = true;	//отправка пустого поля запрещена
    
    field.name = input.name;
    field.type = input.type;
    field.placeholder = input.placeholder;

    p.appendChild(field);
    return p;
}

function makeMenuItem(item) {
    const div = document.createElement('div');
    const link = document.createElement('a');

    link.href = item[0];
    link.dataset.href = item[0];
    link.textContent = item[1];

    div.appendChild(link);
    return div;
}

function errorHandler(error) {
	const errors = {
		'incorrect': 'Не верно указана почта и/или пароль',
		'invalid': 'Невалидные данные',
		'user': 'Пользователь уже существует',
		'default': 'Ошибка... Попробуйте ввести данные еще раз'
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
	rules: createRulesPage,
    profile: createProfilePage
};

function createLandingPage() {

	const header = new Header({type: 'landing'})
	header.render();

	const landingMenu = new LandingMenuContent({});
	landingMenu.render();
}

function createSigninPage() {
	const inputs = [
		{
			name: 'email',
			type: 'email',
			placeholder: 'Почта'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Пароль'
		},
		{
			name: 'submit',
			type: 'submit'
		}
    ];
	
	const header = new Header({type: 'backToLanding'})
	header.render();

	const signinSection = document.createElement('section');
	signinSection.dataset.sectionName = 'signin';

	const signinTitle = document.createElement('h2');
    signinTitle.textContent = "Вход";

	const errorLine = document.createElement('p');
	errorLine.classList.add('errorLine');
	errorLine.hidden = true

	const form = document.createElement('form');

	inputs.forEach((input) => {
		form.appendChild(makeInputField(input));
	});

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const email = form.elements['email'].value;
		const password = form.elements['password'].value;
		const callback = function(err, response) {
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createMenuPage();
			} else {
				const errorLine = document.getElementsByClassName('errorLine')[0];
				errorLine.textContent = errorHandler(response.error)
				errorLine.hidden = false;
			}
		};
		Users.auth(callback, email, password);
	});
	
	signinSection.appendChild(signinTitle);
	signinSection.appendChild(errorLine);
    signinSection.appendChild(form);
	application.appendChild(signinSection);
}

function createSignupPage() {
	const inputs = [
		{
			name: 'login',
			type: 'text',
			placeholder: 'Логин'
		},
		{
			name: 'email',
			type: 'email',
			placeholder: 'Почта'
		},
		{
			name: 'password',
			type: 'password',
			placeholder: 'Пароль'
		},
		{
			name: 'password_repeat',
			type: 'password',
			placeholder: 'Повторите пароль'
		},
		{
			name: 'submit',
			type: 'submit'
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

	const form = document.createElement('form');

	inputs.forEach((input) => {
		form.appendChild(makeInputField(input));
	});

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const login = form.elements['login'].value;
		const email = form.elements['email'].value;
		const password = form.elements['password'].value;
		const password_repeat = form.elements['password_repeat'].value;

		if (password !== password_repeat) {
			alert('Пароли не совпадают');
			return;
		}

		const callback = function(err, response) {
			console.log(err, response);
			if (err === null) {
				application.innerHTML = '';
				createProfilePage(response);
			} else {
				const errorLine = document.getElementsByClassName('errorLine')[0];
				errorLine.textContent = errorHandler(response.error)
				errorLine.hidden = false;
			}
		}
		Users.register(callback, login, email, password);
	});
	signupSection.appendChild(signupTitle);
	signupSection.appendChild(errorLine);
    signupSection.appendChild(form);
	application.appendChild(signupSection);
}

function createMenuPage() {
    const items = {
		multiplayer: 'Мультиплеер',
		singleplayer: 'Одиночная игра',
		leaders: 'Лидеры',
        rules: 'Правила',
        profile: 'Профиль'
    };
    
    const menuSection = document.createElement('section');
    menuSection.dataset.sectionName = 'menu';

    const menuTitle = document.createElement('h2');
    menuTitle.textContent = "Меню";

    const menuInner = document.createElement('div');

    Object.entries(items).forEach((item) => {
		menuInner.appendChild(makeMenuItem(item));
    });
    menuSection.appendChild(menuTitle);
    menuSection.appendChild(menuInner);
    application.appendChild(menuSection);
}

function createLeadersPage(users) {
	const header = new Header({type: 'backToMenu'})
	header.render();

	const leadersSection = document.createElement('section');
	leadersSection.dataset.sectionName = 'leaders';

	const leadersTitle = document.createElement('h2');
    leadersTitle.textContent = "Лидеры";

    const leadersInner = document.createElement('div');

	if (users) {
		//BOARD COMPONENT!!!
		//board.data = user;
		//console.log(board.data)
		//==================

		const table = document.createElement('table');
		const thead = document.createElement('thead');
		//%%%%%%%%%%%%%%
		thead.innerHTML = `
		<tr>
			<td>Логин</td>
			<td>Почта</td>
            <td>Сыграно игр</td>
            <td>Рейтинг</td>
        </tr>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		users.forEach((user) => {
			//нужно написать ф-цию генерации таблицы
			const login = user.login;
			const email = user.email;
			const gamecount = user.gamecount;
			const score = user.score;

			const tr = document.createElement('tr');

			const tdLogin = document.createElement('td');
			const tdEmail = document.createElement('td');
			const tdGameCount = document.createElement('td');
			const tdScore = document.createElement('td');

			tdLogin.textContent = login;
			tdEmail.textContent = email;
			tdGameCount.textContent = gamecount;
			tdScore.textContent = score;

			tr.appendChild(tdLogin);
			tr.appendChild(tdEmail);
			tr.appendChild(tdGameCount);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			leadersInner.appendChild(table);
		});
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

function createRulesPage() {
    const header = new Header({type: 'backToLanding'})
	header.render();

	const rulesSection = document.createElement('section');
	rulesSection.dataset.sectionName = 'rules';
	
	const rulesTitle = document.createElement('h2');
	rulesTitle.textContent = "Правила";
	
	const rulesInner = document.createElement('div');
	
	const pTag = document.createElement('p');
	pTag.textContent = 'Подробное описание правил игры...';
	rulesInner.appendChild(pTag);

	rulesSection.appendChild(rulesTitle);
    rulesSection.appendChild(rulesInner);
	application.appendChild(rulesSection);
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