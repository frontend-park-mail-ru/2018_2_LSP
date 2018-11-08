import BaseView from '../BaseView/BaseView.mjs';

import { Users } from '/scripts/services/users.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';

export default class Profile extends BaseView {
    constructor({profile, router}){
        const view = baseView({'headerType': 'back','navClass': 'navigation_left', 'title': 'Профиль'});
        super(view);
        this._profile = profile;
        this.router = router;
    }

    render() {
        this._renderProfile(this._profile);
    }

    _renderProfile(profileData) {
        if (profileData) {
            const userParams = {
                'Логин': profileData.username,
                'Почта': profileData.email,
                'Имя' : profileData.firstname,
                'Фамилия' : profileData.lastname,
                'Сыграно игр': profileData.gamecount,
                'Счет': profileData.rating
            }; 
            Object.entries(userParams).forEach((param) => {
                const pParam = new Block('p');
                pParam.setText(param[0] + ': ' + param[1]);
                this.pageContent.appendChild(pParam.getElement());
            });
        } else {
            const callback = (err, response) => {
                console.log(err, response);
                if (!err) {
                    this._profile = response;
	                this.render();
                } else {
                    this.router.open('/signin');
                }
            };
            Users.profile(callback);
        }
    }
}