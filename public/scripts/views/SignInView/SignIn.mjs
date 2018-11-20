import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Form from '../../blocks/Form/Form.mjs';
import Users from '../../services/users.mjs';
import Errors from '../../services/errors.mjs';
import Bus from '../../modules/eventBus.mjs';
import Router from '../../modules/Router.mjs';
import baseView from '../BaseView/baseView.pug';

export default class SignIn extends BaseView {
	constructor() {
		const view = baseView({'title': 'Вход'});
		super(view);
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
					type: 'text',
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
					'data-href': 'menu'
				}
			}
		];

		const form = new Form(inputs);
		form.submit(data => {	// добавляем по нажатию кнопки событие
			// проверка на валидность вводимых данных
			if (data['email'].search('^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,8}$') === -1) {
				errorLine.setText(Errors.getErrorString('email'));
				errorLine.show();
				return;
			}

			Users.auth((err, response) => {	//авторизации пользователя
				if (!err) {
					Bus.emit('user:logged-in');
					Router.open('/menu');                    
				} else {
					errorLine.setText(Errors.getErrorString(response.error));
					errorLine.show();
				}
			}, data);	// используем данные введенные в форму
		});
        
		this.pageContent.appendChild(errorLine.getElement());
		this.pageContent.appendChild(form.getElement());
	}
}