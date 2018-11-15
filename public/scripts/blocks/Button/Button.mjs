import Block from '../Block/Block.mjs';

/**
 * Класс кнопки (наследуется от Block)
 * @module Button
 */
export default class Button {
    /**
     * Создать новую кнопку
     * @param {string} link адрес ссылки
     * @param {string} text текст кнопки
     * @param {string} appendTo 
     * @param {Array} classes 
     */
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