import BaseView from '../BaseView/BaseView.mjs';
import Block from '../../blocks/Block/Block.mjs';
import './RulesView.scss';
import rulesView from '../RulesView/rulesView.pug';

export default class RulesView extends BaseView {
	constructor(){
		super('Правила');
	}

	render() {
		const rules = rulesView();
		this.pageContent.insertAdjacentHTML('beforeend', rules);
	}
}
