import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Button } from '/scripts/blocks/Button/Button.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';

export class Menu {
    constructor({type = ''} = {}){
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
            rulesMenu: 'Правила',
            profile: 'Профиль'
        };
        
        const header = new Header({type: 'menu'})
        header.render();

        const menuSection = new Block('section', ['centerSection'], {'dataset.sectionName': 'menu'});
        const menuTitle = new Block('h2');
        menuTitle.setText('Меню');

        const menuInner = new Block('div');
        Object.entries(items).forEach((item) => {
            const element = new Button(item[0], item[1], menuInner);
            element.render();
        });

        menuSection.append(menuTitle);
        menuSection.append(menuInner);
        application.append(menuSection.getElement());
    }
}