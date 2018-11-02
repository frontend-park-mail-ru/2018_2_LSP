import BaseView from '../BaseView/BaseView.mjs';

import { Block } from '/scripts/blocks/Block/Block.mjs';
import { Form } from '/scripts/blocks/Form/Form.mjs';
import Menu from '../MenuView/Menu.mjs';
import { Users } from '/scripts/services/users.mjs';


export default class SignUp extends BaseView {
    constructor() {
        const view = baseView({"headerType": "backToLanding","navClass": "backButton", "title": "Регистрация"});
        super(view);
    }

    render() {
        this._renderSignUpPage();
    }

    _renderSignUpPage() {
        const errorLine = new Block('p',['errorLine'],{'hidden': true});

        const inputs = [
            {
                classes: [],
                attributes: {
                    name: 'username',
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

        const form = new Form(inputs);
        form.submit(data => {	//добавляем по нажатию кнопки событие
            if (data['password'] !== data['password_repeat']) {
                const errorLine = document.getElementsByClassName('errorLine')[0];
                errorLine.textContent = errorHandler('passwords')
                errorLine.hidden = false;
                return;
            }
            Users.register((err, response) => {	//регистрация пользователя
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    const mainMenu = new Menu();
	                mainMenu.render();
                } else {
                    const errorLine = document.getElementsByClassName('errorLine')[0];
                    errorLine.textContent = errorHandler(response.error)
                    errorLine.hidden = false;
                }
            }, data);	//используем данные введенные в форму
        });

        this.pageContent.appendChild(errorLine.getElement());
        this.pageContent.appendChild(form.getElement());
    }
}


function errorHandler(error) {
	const errors = {
		'incorrect': 'Не верно указана почта и/или пароль',
		'invalid': 'Невалидные данные',
		'user': 'Пользователь уже существует',
		'default': 'Ошибка... Попробуйте ввести данные еще раз',
		'passwords': 'Ошибка в повторном вводе пароля'
	};
	return errors[error];
}