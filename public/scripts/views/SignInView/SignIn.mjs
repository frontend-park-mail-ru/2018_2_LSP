import BaseView from '../BaseView/BaseView.mjs';

import { Block } from '../../blocks/Block/Block.mjs';
import { Form } from '../../blocks/Form/Form.mjs';
import { Users } from '../../services/users.mjs';


export default class SignIn extends BaseView {
    constructor(router) {
        const view = baseView({'headerType': 'back','navClass': 'navigation_left', 'title': 'Вход'});
        super(view);
        this.router = router
    }

    render() {
        this._renderSignInPage();
    }

    _renderSignInPage() {
        const errorLine = new Block('p',['errorLine'],{'hidden': true});

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
                    value: 'Войти',
                    href: 'menu',
                    "data-href": 'menu'
                }
            }
        ];

        const form = new Form(inputs);
        form.submit(data => {	//добавляем по нажатию кнопки событие
            Users.auth((err, response) => {	//авторизации пользователя
                console.log(err, response);
                if (!err) {
                    this.router.open('/profile');
                } else {
                    const errorLine = document.getElementsByClassName('errorLine')[0];
                    errorLine.textContent = errorHandler(response.Message);
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
        'User not found': 'Пользователь не найден',
		'Wrong password': 'Не верно указана почта и/или пароль',
		'invalid': 'Невалидные данные',
		'user': 'Пользователь уже существует',
		'default': 'Ошибка... Попробуйте ввести данные еще раз',
        'passwords': 'Ошибка в повторном вводе пароля',
	};
	return errors[error];
}