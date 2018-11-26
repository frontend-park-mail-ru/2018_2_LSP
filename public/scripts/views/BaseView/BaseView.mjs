import header from '../../blocks/PageParts/header.pug';
import footer from '../../blocks/PageParts/footer.pug';
import iframe from '../../blocks/PageParts/iframe.pug';
import baseView from '../BaseView/baseView.pug';
import baseContent from '../BaseView/baseContent.pug';

export default class BaseView {
	constructor (title) {
		this.title = title;
		this.mainSection = document.getElementsByClassName('main-section')[0];

		if (this.mainSection) {
			const backButton = document.getElementsByClassName('basic-button_back');
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

			const pageFooter = footer();
			application.insertAdjacentHTML('beforeend', pageFooter);

			const callFrameButton = document.getElementById('callFrameButton');
			callFrameButton.onclick = function() {
				const iframe = document.getElementsByTagName('iframe');
				if(iframe[0].hidden) {
					iframe[0].hidden = false;
				} else {
					iframe[0].hidden = true;
				}
			};
			
			const footerTag = document.getElementsByTagName('footer');
			const iframeChat = iframe();
			footerTag[0].insertAdjacentHTML('beforeend', iframeChat);
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