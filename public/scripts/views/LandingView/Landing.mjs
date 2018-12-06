import BaseView from '../BaseView/BaseView.mjs';
import Button from '../../blocks/Button/Button.mjs';
import './Landing.scss';

export default class Landing extends BaseView{
	constructor() {
		super('Пираты');

		const backButton = document.getElementsByClassName('basic-button_back');
		backButton[0].hidden = true;
	}

	render() {
		const element1 = new Button('menu', 'Играть', ['page-content__landing-button', 'basic-button']);
		this.pageContent.appendChild(element1.getElement());

		const element2 = new Button('rules', 'Правила', ['page-content__landing-button', 'basic-button']);
		this.pageContent.appendChild(element2.getElement());
	}
}