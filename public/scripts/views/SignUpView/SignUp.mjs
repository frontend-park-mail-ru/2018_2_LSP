import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import Form from '../../blocks/Form/Form.mjs';
import Users from '../../services/users.mjs';
import Errors from '../../services/errors.mjs';
import Router from '../../modules/Router.mjs';

export default class SignUp extends BaseView {
	constructor() {
		super('Регистрация');
	}

	render() {
		this._renderSignUpPage();
	}

	_renderSignUpPage() {
		const errorLine = new Block('p', ['page-content__error-line'], {'hidden': true});

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
		form.submit(data => {	// добавляем по нажатию кнопки событие
			// проверка на валидность вводимых данных
			if (data['username'].length < 4 || data['username'].length > 25) {
				errorLine.setText(Errors.getErrorString('username'));
				errorLine.show();
				return;
			}
			if (data['email'].search('^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+.)+[a-z]{2,8}$') === -1) {
				errorLine.setText(Errors.getErrorString('email'));
				errorLine.show();
				return;
			}
			if (data['password'] !== data['password_repeat']) {
				errorLine.setText(Errors.getErrorString('passwords'));
				errorLine.show();
				return;
			}

			Users.register((err, response) => {	// регистрация пользователя
				if (!err) {
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