import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Router from '../../modules/Router.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './Profile.scss';
import Button from '../../blocks/Button/Button.mjs';
import Form from '../../blocks/Form/Form.mjs';
import Errors from '../../services/errors.mjs';

export default class Profile extends BaseView {
	constructor({profile}) {
		super('Профиль');
		this._profile = profile;
	}

	render() {
		this._renderProfile(this._profile);
	}

	_renderProfile(profileData) {
		if (profileData) {

			const errorLine = new Block('p', ['page-content__error-line'], {'hidden': true});
			const gamesNum = new Block('p');
			gamesNum.setText('Игр: ' + profileData.totalgames);
			this.pageContent.appendChild(gamesNum.getElement());

			const score = new Block('p');
			score.setText('Счет: ' + profileData.totalscore);
			this.pageContent.appendChild(score.getElement());

			const inputs = [
				{	
					fieldName: 'Логин: ',
					classes: [],
					attributes: {
						name: 'username',
						type: 'text',
						value: profileData.username,
						required: 'required'
					}
				},
				{
					fieldName: 'Почта: ',
					classes: [],
					attributes: {
						name: 'email',
						type: 'text',
						value: profileData.email,
						required: 'required'
					}
				},
				{
					fieldName: 'Имя: ',
					classes: [],
					attributes: {
						name: 'firstname',
						type: 'text',
						value: profileData.firstname
					}
				},
				{
					fieldName: 'Фамилия: ',
					classes: [],
					attributes: {
						name: 'lastname',
						type: 'text',
						value: profileData.lastname
					}
				},
				{
					fieldName: 'Пароль:',
					classes: [],
					attributes: {
						name: 'oldpassword',
						type: 'password',
						placeholder: 'Старый пароль'
					}
				},
				{
					fieldName: 'Новый пароль: ',
					classes: [],
					attributes: {
						name: 'password',
						type: 'password',
						placeholder: 'Новый пароль'
					}
				},
				{
					classes: ['basic-button'],
					attributes: {
						name: 'submit',
						type: 'submit',
						value: 'Сохранить'
					}
				}
			];
	
			const form = new Form(inputs);
			const tmpData = {
				"firstname": "mememe"
			};

			form.submit(data => {	// добавляем по нажатию кнопки событие
				// проверка на валидность вводимых данных
				if (data['firstname'].length < 4 || data['firstname'].length > 25) {
					errorLine.setText(Errors.getErrorString('symbols'));
					errorLine.show();
					return;
				}
				if (data['lastname'].length < 4 || data['lastname'].length > 25) {
					errorLine.setText(Errors.getErrorString('symbols'));
					errorLine.show();
					return;
				}		
	
				Users.updateInfo((err, response) => {	//обновить данные
					if (!err) {
						Router.open('/profile');
					} else {
						errorLine.setText(Errors.getErrorString(response.error));
						errorLine.show();
					}
				}, profileData.id, data);	// используем данные введенные в форму
			});
	
			this.pageContent.appendChild(errorLine.getElement());
			this.pageContent.appendChild(form.getElement());

		} else {
			const callback = (err, response) => {
				if (!err) {
					this._profile = response;
					this.render();
				} else {
					Router.open('/signin');
				}
			};
			Users.profile(callback);
		}
	}
}