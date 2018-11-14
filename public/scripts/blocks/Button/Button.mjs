import Block from '../Block/Block.mjs';

export default class Button {
    constructor (link = '', text = '', appendTo = '', classes = ['basicButton']) {
        this._link = link;
        this._text = text;
        this._appendTo = appendTo;
        this._classes = classes;
    }

    render() {
        this._createLink();
    }

    _createLink() {
        const env = new Block('div',[], {});

        const button = new Block('a', this._classes, {'href': this._link});
        button.getElement().dataset.href = this._link;
        button.setText(this._text);

        env.append(button);
        this._appendTo.appendChild(env.getElement());
    }
}