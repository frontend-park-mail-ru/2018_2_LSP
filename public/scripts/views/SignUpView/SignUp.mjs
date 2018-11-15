import BaseView from '../BaseView/BaseView.mjs';

import { Block } from '../../blocks/Block/Block.mjs';
import { Form } from '../../blocks/Form/Form.mjs';
import { Users } from '../../services/users.mjs';


export default class SignUp extends BaseView {
    constructor(router) {
        const view = baseView({'title': 'Регистрация'});
        super(view);
        this.router = router;
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
                if (!err) {
                    this.router.open('/menu');
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