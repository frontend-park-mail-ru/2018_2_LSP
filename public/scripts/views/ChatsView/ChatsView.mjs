import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';

export default class ChatsView extends BaseView {
	constructor(){
		super('Чаты');
	}

	render() {
		const p = new Block('p');
		p.setText('Скоро появятся!');
		this.pageContent.appendChild(p.getElement());
	}
}