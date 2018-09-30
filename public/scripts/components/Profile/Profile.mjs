import { Header } from '/scripts/blocks/Header/Header.mjs';
import Users from '/scripts/services/users.js';
import { Block } from '/scripts/blocks/block.js';

export class Profile {
    constructor(profile){
        this._profile = profile;
    }

    render() {
        this._renderProfile(this._profile);
    }

    _renderProfile(data) {
        const header = new Header({type: 'backToMenu'})
        header.render();

        const profileSection  = Block.Create('section', ['centerSection'], {'dataset.sectionName': 'profile'});
        const profileTitle = Block.Create('h2');
        profileTitle.setText('Профиль');

        const profileInner = Block.Create('div', [], {id:'profileInner'});
        
        profileSection.append(profileTitle);
        profileSection.append(profileInner);

        if (data) {
            const userParams = {
                'Логин': data.login,
                'Почта': data.email,
                'Сыграно игр': data.gamecount,
                'Счет': data.score
            }; 
            Object.entries(userParams).forEach((param) => {
                const pParam = Block.Create('p');
                pParam.setText(param[0] + ': ' + param[1]);
                profileInner.append(pParam);
            });
        } else {
            const callback = function(err, response) {
                console.log(err, response);
                if (err === null) {
                    application.innerHTML = '';
                    //createProfilePage(response);
                    const profilePage = new Profile(response);
	                profilePage.render();
                } else {
                    alert('Unauthorized');
                    application.innerHTML = '';
                    //createSigninPage();
                }
            };
            Users.profile(callback);
        }
        application.append(profileSection.getEl());
        }
}