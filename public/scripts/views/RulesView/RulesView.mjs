import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';

export default class RulesView extends BaseView {
	constructor(){
		super('Правила');
	}

	render() {
		const pTag = new Block('p');
		pTag.setText('Подробное описание правил игры...');
		this.pageContent.appendChild(pTag.getElement());
	}
}
