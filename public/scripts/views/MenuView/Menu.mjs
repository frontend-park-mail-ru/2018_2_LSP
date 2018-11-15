import BaseView from '../BaseView/BaseView.mjs';
import { Button } from '../../blocks/Button/Button.mjs';
import { Users } from '../../services/users.mjs';
import bus from '/scripts/modules/eventBus.mjs';

export default class Menu extends BaseView {
    constructor(){
        // let headerType = "";
        // if (Users.isLoggedIn()) {
        //     headerType = "menu";
        // } else {
        //     headerType = "landing";
        // }

        const view = baseView({"title": "Меню"});
        super(view);
    }

    render() {
        const items = {
            multiplayer: 'Мультиплеер',
            singleplayer: 'Одиночная игра',
            leaders: 'Лидеры',
            rules: 'Правила',
            //profile: 'Профиль'
        };

        Object.entries(items).forEach((item) => {
            const element = new Button(item[0], item[1], this.pageContent);
            element.render();
        });
    }
}