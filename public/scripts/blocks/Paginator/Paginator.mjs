import Block from '../Block/Block.mjs';
import Button from '../Button/Button.mjs';
import Bus from '../../modules/eventBus.mjs';
import Users from '../../services/users.mjs';

export default class Paginator extends Block {
	constructor(callback) {
		super('div');
		this._currentPage = 0;

		const aright = new Button('', '>');
        this.append(aright);

        // this.pageView = new Block('div');
        // this.pageView.setText(this._currentPage);
        // this.append(this.pageView);

        const aleft = new Button('', '<');
        this.append(aleft);


        aright.event('click', () => {
			this._currentPage += 1;
			callback(this._currentPage);
		});
	}
}
