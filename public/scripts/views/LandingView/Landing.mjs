import BaseView from '../BaseView/BaseView.mjs';
import Button from '../../blocks/Button/Button.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './Landing.scss';

export default class Landing extends BaseView{
	constructor() {
		super();

		const backButton = document.getElementsByClassName('header__left-item');
		backButton[0].hidden = true;
	}

	render() {
		const pirateImg = new Block('img', ['page-content__landing-img'], {'src' : '../../img/pirate_final.png'});
		this.pageContent.appendChild(pirateImg.getElement());
		
		const landingTitle = new Block('h2', ['page-content__landing-title']);
		landingTitle.setText('Pirates');
		this.pageContent.appendChild(landingTitle.getElement());

		const element1 = new Button('menu', 'Играть', ['page-content__landing-button', 'basic-button']);
		const div1 = new Block('div');
		div1.append(element1);
		this.pageContent.appendChild(div1.getElement());

		const element2 = new Button('rules', 'Правила', ['page-content__landing-button', 'basic-button']);
		const div2 = new Block('div');
		div2.append(element2);
		this.pageContent.appendChild(div2.getElement());
	}
}