import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Router from '../../modules/Router.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './Profile.scss';
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
			const profileDiv = new Block('div', ['profile']);
			const div = new Block('div');
			const avatar = new Block('img', ['avatar']);
			if (profileData.avatar) {
				avatar.getElement().src = 'https://jackal.online/avatars/' + profileData.avatar;
			} else {
				avatar.getElement().src = '../../img/avatar.png';
			}
			
			div.append(avatar);
			
			const errorLine = new Block('p', ['page-content__error-line'], {'hidden': true});

			const gamesNum = new Block('p');
			gamesNum.setText('Игр: ' + profileData.totalgames);
			div.append(gamesNum);

			const score = new Block('p');
			score.setText('Счет: ' + profileData.totalscore);
			div.append(score);			

			profileDiv.append(div);

			const inputs = [
				{
					classes: ['basic-form__input', 'basic-form__input_avatar'],
					attributes: {
						name: 'avatar',
						type: 'file',
						id: 'avatar-select'
					}
				},
				{	
					fieldName: 'Логин',
					classes: [],
					attributes: {
						name: 'username',
						type: 'text',
						value: profileData.username,
						readOnly: true,
					}
				},
				{
					fieldName: 'Почта',					
					classes: [],
					attributes: {
						name: 'email',
						type: 'text',
						value: profileData.email,
						readOnly: true,
					}
				},
				{
					fieldName: 'Имя',
					classes: [],
					attributes: {
						name: 'firstname',
						type: 'text',
						value: profileData.firstname
					}
				},
				{
					fieldName: 'Фамилия',
					classes: [],
					attributes: {
						name: 'lastname',
						type: 'text',
						value: profileData.lastname
					}
				},
				{
					fieldName: 'Пароль',
					classes: [],
					attributes: {
						name: 'oldpassword',
						type: 'password',
						placeholder: 'Старый пароль'
					}
				},
				{
					fieldName: 'Новый пароль',
					classes: [],
					attributes: {
						name: 'password',
						type: 'password',
						placeholder: 'Новый пароль'
					}
				},
				{
					classes: ['basic-button', 'basic-button_form'],
					attributes: {
						name: 'submit',
						type: 'submit',
						value: 'Сохранить'
					}
				}
			];
	
			const form = new Form(inputs);
			
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

				const avatarSelect = document.getElementById('avatar-select');				
				const avatar = avatarSelect.files[0];
	
				if (!avatar.type.match('image.*')) {
					errorLine.setText(Errors.getErrorString('avatarImg'));
					errorLine.show();
					return;
				}
				delete data['avatar'];

				const callback = (err, response) => {
					if (!err) {
						errorLine.hide();
						alert('Данные успешно обновлены.');
						Router.open('/profile');
					} else if (err) {
						errorLine.setText(Errors.getErrorString(response.error));
						errorLine.show();
					}
				};

				Users.updateInfo((err, response) => { //обновить данные
					if (!err) {						
						if (avatar) {
							const avatarData = new FormData();
							avatarData.append('file', avatar, avatar.name);
							Users.setAvatar(callback, profileData.id, avatarData);							
						} else {
							errorLine.hide();
							alert('Данные успешно обновлены.');
						}
					} else {
						errorLine.setText(Errors.getErrorString(response.error));
						errorLine.show();
					}
				}, profileData.id, data);	// используем данные введенные в форму
			});
			profileDiv.append(errorLine);
			profileDiv.append(form);
			this.pageContent.appendChild(profileDiv.getElement());	
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