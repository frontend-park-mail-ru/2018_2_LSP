import BaseView from '../BaseView/BaseView.mjs';
import { Button } from '../../blocks/Button/Button.mjs';

export default class Menu extends BaseView {
    constructor({type = ''} = {}){
        const view = baseView({"headerType": type, "title": "Меню"});
        super(view);
        this._type = type;
    }

    render() {
        this._renderMenu();
    }

    _renderMenu() {
        const items = {
            multiplayer: 'Мультиплеер',
            singleplayer: 'Одиночная игра',
            leaders: 'Лидеры',
            rules: 'Правила',
            profile: 'Профиль'
        };

        Object.entries(items).forEach((item) => {
            const element = new Button(item[0], item[1], this.pageContent);
            element.render();
        });
    }
}