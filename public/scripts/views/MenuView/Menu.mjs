import BaseView from '../BaseView/BaseView.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './MenuView.scss';

export default class Menu extends BaseView {
	constructor(){
		super('Меню');
	}

	render() {
		const items = {
			multiplayer: 'Мультиплеер',
			singleplayer: 'Одиночная игра',
			leaders: 'Лидеры',
			rules: 'Правила',
			chats: 'Чаты'
		};

		const menuDiv = new Block('div', ['menu']);

		Object.entries(items).forEach((item) => {
			const element = new Button(item[0], item[1], ['page-content__menu-button', item[0]]);			
			menuDiv.append(element);
		});

		this.pageContent.appendChild(menuDiv.getElement());
	}
}