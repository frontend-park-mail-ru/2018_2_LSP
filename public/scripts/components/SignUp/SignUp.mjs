import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';
import Form from '/scripts/blocks/Form/Form.mjs';
import { Menu } from '../Menu/Menu.mjs';
import Users from '/scripts/services/users.js';


export class SignUp {
    constructor(){
    }

    render() {
        this._renderSignUpPage();
    }

    _renderSignUpPage() {
        const header = new Header({type: 'backToLanding'})
        header.render();

        const signUpSection  = Block.Create('section', ['centerSection'], {'dataset.sectionName': 'signup'});
        const  signUpTitle = Block.Create('h2');
        signUpTitle.setText('Регистрация');

        const errorLine = Block.Create('p',['errorLine'],{'hidden': true});

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

        const form = new Form(inputs);
        form.submit(function(data) {	//добавляем по нажатию кнопки событие
            if (data['password'] !== data['password_repeat']) {
                const errorLine = document.getElementsByClassName('errorLine')[0];
                errorLine.textContent = errorHandler('passwords')
                errorLine.hidden = false;
                return;
            }
            Users.register(function(err, response) {	//регистрация пользователя
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    //createMenuPage();
                    const mainMenu = new Menu();
	                mainMenu.render();
                } else {
                    const errorLine = document.getElementsByClassName('errorLine')[0];
                    errorLine.textContent = errorHandler(response.error)
                    errorLine.hidden = false;
                }
            }, data);	//используем данные введенные в форму
        });

        signUpSection.append(signUpTitle);
        signUpSection.append(errorLine);
        signUpSection.append(form);
        application.append(signUpSection.getElement());
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