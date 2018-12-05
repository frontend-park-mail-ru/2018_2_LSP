import BaseView from '../BaseView/BaseView.mjs';
import Button from '../../blocks/Button/Button.mjs';
import './MenuView.scss';

export default class Menu extends BaseView {
	constructor(){
		super('Меню');
	}

	render() {
		const items = {
			room: 'Мультиплеер',
			singleplayer: 'Одиночная игра',
			leaders: 'Лидеры',
			rules: 'Правила',
			chats: 'Чаты'
		};

		Object.entries(items).forEach((item) => {
			const element = new Button(item[0], item[1], ['basic-button', 'page-content__menu-button']);
			this.pageContent.appendChild(element.getElement());
		});
	}
}