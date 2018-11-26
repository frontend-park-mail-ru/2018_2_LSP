import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';

export default class ChatsView extends BaseView {
	constructor(){
		super('Чаты');
	}

	render() {
		const popUpIframe = document.getElementById('popUpIframe');
		if(!popUpIframe.hidden) {
			popUpIframe.hidden = true;
		}

		const frame = new Block('iframe', [], {'src': '/chatsframe'});
		this.pageContent.appendChild(frame.getElement());
	}
}