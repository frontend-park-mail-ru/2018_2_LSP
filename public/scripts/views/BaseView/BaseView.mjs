import header from '../../blocks/PageParts/header.pug';
import Block from '../../blocks/Block/Block.mjs';
import iframe from '../../blocks/PageParts/iframe.pug';
import baseView from '../BaseView/baseView.pug';
import baseContent from '../BaseView/baseContent.pug';
import Trigger from '../../blocks/Trigger/Trigger.mjs';

export default class BaseView {
	constructor (title) {
		this.title = title;
		this.mainSection = document.getElementsByClassName('main-section')[0];

		if (this.mainSection) {
			const backButton = document.getElementsByClassName('header__left-item');
			backButton[0].hidden = false;
			const contentView = baseContent({'title': title});
			this.mainSection.insertAdjacentHTML('beforeend', contentView);
		} else {
			const contentView = baseView({'title': title});
			const application = document.getElementById('application');
			application.insertAdjacentHTML('beforeend', contentView);

			const menuHeader = header({'headerType': 'notLoggedIn'});
			const navigationPart = document.getElementsByTagName('nav');
			navigationPart[0].innerHTML = '';
			navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);

			const footer = new Block('footer',['page-footer']);
			application.appendChild(footer.getElement());
		}
		
		this.pageContent = document.getElementById('content');
	}

	hide() {        
		document.getElementById('application').hidden = true;
	}

	show() {     
		document.getElementById('application').hidden = false;
		this.render();
	}

	get active() {
		return !this.title.hidden;
	}

	render() {
	}    
}