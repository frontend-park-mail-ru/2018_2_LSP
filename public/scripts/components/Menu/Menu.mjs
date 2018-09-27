import { Header } from '../Header/Header.mjs';
import { MenuComponent } from '../MenuComponent/MenuComponent.mjs';

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
        
        const menuSection = document.createElement('section');
        menuSection.dataset.sectionName = 'menu';
    
        const menuTitle = document.createElement('h2');
        menuTitle.textContent = "Меню";
    
        const menuInner = document.createElement('div');
    
        Object.entries(items).forEach((item) => {
            const element = new MenuComponent({part: menuInner, name : item[0], value: item[1]});
            element.render();
        });
        menuSection.appendChild(menuTitle);
        menuSection.appendChild(menuInner);
        application.appendChild(menuSection);
    }
}