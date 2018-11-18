import Block from '../Block/Block.mjs';
import Button from '../Button/Button.mjs';

export default class Paginator extends Block {
	constructor(callback, classes) {
		super('div');
		this._currentPage = 0;

		const aright = new Button('right', '>', classes);
        this.append(aright);

        // this.pageView = new Block('span');
        // this.pageView.setText(this._currentPage);
        // this.append(this.pageView);

        const aleft = new Button('left', '<', classes);
        this.append(aleft);


        aright.event('click', () => {
			this._currentPage += 1;
			callback(this._currentPage);
		});
	}
}
