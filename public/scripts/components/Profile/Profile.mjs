import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Users } from '/scripts/services/users.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';
import { SignIn } from '../SignIn/SignIn.mjs';

export class Profile {
    constructor(profile){
        this._profile = profile;
    }

    render() {
        this._renderProfile(this._profile);
    }

    _renderProfile(profileData) {
        const header = new Header({type: 'backToMenu'})
        header.render();

        const profileSection  = new Block('section', ['centerSection'], {'dataset.sectionName': 'profile'});
        const profileTitle = new Block('h2');
        profileTitle.setText('Профиль');

        const profileInner = new Block('div', [], {id:'profileInner'});

        profileSection.append(profileTitle);
        profileSection.append(profileInner);

        if (profileData) {
            const userParams = {
                'Логин': profileData.username,
                'Почта': profileData.email,
                'Сыграно игр': profileData.gamecount,
                'Счет': profileData.score
            }; 
            Object.entries(userParams).forEach((param) => {
                const pParam = new Block('p');
                pParam.setText(param[0] + ': ' + param[1]);
                profileInner.append(pParam);
            });
        } else {
            const callback = (err, response) => {
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    const profilePage = new Profile(response);
	                profilePage.render();
                } else {
                    application.innerHTML = '';
                    const signInPage = new SignIn();
                    signInPage.render();
                }
            };
            Users.profile(callback);
        }
        application.append(profileSection.getElement());
    }
}