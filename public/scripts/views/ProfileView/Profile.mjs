import BaseView from '../BaseView/BaseView.mjs';
import Users from '../../services/users.mjs';
import Router from '../../modules/Router.mjs';
import profileFields from '../ProfileView/profileFields.pug';
import './Profile.scss';
import Button from '../../blocks/Button/Button.mjs';

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
			const userParams = {
				'username': profileData.username,
				'email': profileData.email,
				'name' : profileData.firstname,
				'surname' : profileData.lastname
			}; 

			const fieldsNames = ['Логин', 'Почта', 'Имя', 'Фамилия'];
			const fields = profileFields({'games': profileData.totalgames, 'score': profileData.totalscore,
										'userParams': userParams, 'fieldsNames': fieldsNames});
			this.pageContent.insertAdjacentHTML('beforeend', fields);

			const saveButton = new Button('profile', 'Сохранить', ['basic-button']);
			this.pageContent.appendChild(saveButton.getElement());

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