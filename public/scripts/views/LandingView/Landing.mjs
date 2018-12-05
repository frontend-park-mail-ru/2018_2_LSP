import BaseView from '../BaseView/BaseView.mjs';
import Button from '../../blocks/Button/Button.mjs';
import './Landing.scss';
import Trigger from '../../blocks/Trigger/Trigger.mjs';

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

		const trig = new Trigger('ch')
		this.pageContent.appendChild(trig.getElement());
	}
}