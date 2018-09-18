'use strict';

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

// function makeInputField(fieldName, form, type, placeholder) {
//     let p = document.createElement("p");
//     p.textContent = fieldName;
//     form.appendChild(p);

//     let field = document.createElement("input");
//     field.setAttribute("type", type);
//     field.setAttribute("placeholder", placeholder);
//     field.classList.add("inputs");
//     form.appendChild(field);
//     form.appendChild(document.createElement('br'));
// }

//функции элементов возврата
function backToLandingPage() {
    const landingLink = document.createElement('a');
    landingLink.href = landingLink.dataset.href = 'landing';
    landingLink.textContent = 'Назад';
    return landingLink;
}

function backToMenuPage() {
    const menuLink = document.createElement('a');
    menuLink.href = menuLink.dataset.href = 'menu';
    menuLink.textContent = 'Назад в меню';
    return menuLink;
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
	const links = {
		'Играть': 'menu',
		'Правила': 'rules',
		'Вход': 'signin',
		'Регистрация': 'signup' 
	}

    const landingSection = document.createElement('section');
    landingSection.dataset.sectionName = 'landing';
	
    const headerBlock = document.createElement('nav');
	
	const signinLink = document.createElement('a');
	signinLink.href = links['Вход'];
	signinLink.dataset.href = links['Вход'];
	signinLink.textContent = 'Вход';
	headerBlock.appendChild(signinLink);

	const signupLink = document.createElement('a');
	signupLink.href = links['Регистрация'];
	signupLink.dataset.href = links['Регистрация'];
	signupLink.textContent = 'Регистрация';
	headerBlock.appendChild(signupLink);

    const logo = document.createElement('h2');
    logo.textContent = "Шакал";

	const landingInner = document.createElement('div');

	const playDiv = document.createElement('div');
	const playLink = document.createElement('a');
	playLink.href = links['Играть'];
	playLink.dataset.href = links['Играть'];
	playLink.textContent = 'Играть';
	playDiv.appendChild(playLink);
	landingInner.appendChild(playDiv);

	const rulesDiv = document.createElement('div');
	const rulesLink = document.createElement('a');
	rulesLink.href = links['Правила'];
	rulesLink.dataset.href = links['Правила'];
	rulesLink.textContent = 'Правила';
	rulesDiv.appendChild(rulesLink);
	landingInner.appendChild(rulesDiv);

	landingSection.appendChild(logo);
    landingSection.appendChild(landingInner);
    application.appendChild(headerBlock);
	application.appendChild(landingSection);
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
    
    const headerBlock = document.createElement('nav');
    headerBlock.appendChild(backToLandingPage());

	const signinSection = document.createElement('section');
	signinSection.dataset.sectionName = 'signin';

	const signinTitle = document.createElement('h2');
    signinTitle.textContent = "Вход";

	const form = document.createElement('form');

	inputs.forEach((input) => {
		const pTag = document.createElement('p');
		const inputTag = document.createElement('input');
		
		inputTag.name = input.name;
		inputTag.type = input.type;
		inputTag.placeholder = input.placeholder;

		pTag.appendChild(inputTag);
		form.appendChild(pTag);
	});

	//signinSection.appendChild(createMenuLink());

	form.addEventListener('submit', function(event) {
		event.preventDefault();

		const email = form.elements['email'].value;
		const password = form.elements['password'].value;

		// ajax(function (xhr) {
		// 	root.innerHTML = '';
		// 	createProfile();
		// }, 'POST', '/login', {
		// 	email: email,
		// 	password: password
		// });
    });
	signinSection.appendChild(signinTitle);
    signinSection.appendChild(form);
    application.appendChild(headerBlock);
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
    
    const headerBlock = document.createElement('nav');
    headerBlock.appendChild(backToLandingPage());

	const signupSection = document.createElement('section');
	signupSection.dataset.sectionName = 'signup';

	const signupTitle = document.createElement('h2');
	signupTitle.textContent = 'Регистрация';

	const form = document.createElement('form');

	inputs.forEach((input) => {
		const pTag = document.createElement('p');
		const inputTag = document.createElement('input');
		
		inputTag.name = input.name;
		inputTag.type = input.type;
		inputTag.placeholder = input.placeholder;

		pTag.appendChild(inputTag);
		form.appendChild(pTag);
	});

	
	//signupSection.appendChild(createMenuLink());

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

		// ajax(function (xhr) {
		// 	root.innerHTML = '';
		// 	createProfile();
		// }, 'POST', '/signup', {
		// 	email: email,
		// 	age: age,
		// 	password: password
		// });
    });
	signupSection.appendChild(signupTitle);
    signupSection.appendChild(form);
    application.appendChild(headerBlock);
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
        const itemDiv = document.createElement('div');
		const itemLink = document.createElement('a');
		itemLink.href = item[0];
		itemLink.dataset.href = item[0];
		itemLink.textContent = item[1];
        itemDiv.appendChild(itemLink);
		menuInner.appendChild(itemDiv);
    });
    menuSection.appendChild(menuTitle);
    menuSection.appendChild(menuInner);
    application.appendChild(menuSection);
}

function createLeadersPage(users) {
    const headerBlock = document.createElement('nav');
    headerBlock.appendChild(backToMenuPage());

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
            <td>Рейтинг</td>
            <td>Количество игр</td>
        </tr>
		`;
		const tbody = document.createElement('tbody');

		table.appendChild(thead);
		table.appendChild(tbody);
		table.border = 1;
		table.cellSpacing = table.cellPadding = 0;

		users.forEach((user) => {
			const email = user.email;
			const age = user.age;
			const score = user.score;

			const tr = document.createElement('tr');
			const tdEmail = document.createElement('td');
			const tdAge = document.createElement('td');
			const tdScore = document.createElement('td');

			tdEmail.textContent = email;
			tdAge.textContent = age;
			tdScore.textContent = score;

			tr.appendChild(tdEmail);
			tr.appendChild(tdAge);
			tr.appendChild(tdScore);

			tbody.appendChild(tr);

			leadersInner.appendChild(table);
		});
	} else {
		const em = document.createElement('em');
		em.textContent = 'Еще никто не установил рекорд. Вы можете быть первыми;)';
		leadersInner.appendChild(em);

		// ajax(function (xhr) {
		// 	const users = JSON.parse(xhr.responseText);
		// 	root.innerHTML = '';
		// 	createLeaderboard(users);
		// }, 'GET', '/users');
    }
    leadersSection.appendChild(leadersTitle);
    leadersSection.appendChild(leadersInner);
    application.appendChild(headerBlock);
	application.appendChild(leadersSection);
}

function createRulesPage() {
    const headerBlock = document.createElement('nav');
    headerBlock.appendChild(backToMenuPage());

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
    application.appendChild(headerBlock);
	application.appendChild(rulesSection);
}

function createProfilePage(profile) {
    const headerBlock = document.createElement('nav');
    headerBlock.appendChild(backToMenuPage());

	const profileSection = document.createElement('section');
	profileSection.dataset.sectionName = 'profile';

    const profileTitle = document.createElement('h2');
    profileTitle.textContent = "Профиль";

    const profileInner = document.createElement('div');

	if (profile) {
        const userParams = {
            'Логин': profile.login,
            'Почта': profile.email,
            'Счет': profile.age
        } 
		Object.entries(userParams).forEach((param) => {
			const pParam = document.createElement('p');
			pParam.textContent = param[0] + ': ' + param[1];
			profileInner.appendChild(pParam);
		});
	} else {
		// ajax(function (xhr) {
		// 	if (!xhr.responseText) {
		// 		alert('Unauthorized');
		// 		root.innerHTML = '';
		// 		createMenu();
		// 		return;
		// 	}

		// 	const user = JSON.parse(xhr.responseText);
		// 	root.innerHTML = '';
		// 	createProfile(user);
		// }, 'GET', '/me');
    }
	profileSection.appendChild(profileTitle);
    profileSection.appendChild(profileInner);
    application.appendChild(headerBlock);
    application.appendChild(profileSection);
}
