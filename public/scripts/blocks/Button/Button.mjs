import { Block } from '../block.js';

export class Button {
    constructor (link = '', text = '', appendTo = '', classes = ['basicButton']) {
        this._link = link;
        this._text = text;
        this._appendTo = appendTo;
        this._classes = classes;
    }

    render() {
        this._createButton();
    }

    _createButton() {
        const env = Block.Create('div',[], {});

        const button = Block.Create('a', this._classes, {'href': this._link});
        button.getEl().dataset.href = this._link;
        button.setText(this._text);

        env.append(button);
        this._appendTo.append(env);
        //application.appendChild(env.getEl());
    }
}