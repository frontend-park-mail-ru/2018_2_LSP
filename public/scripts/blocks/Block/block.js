export default class Block {
    constructor(element) {
        this.element = element;
    }

    static Create(tag = 'div', classes = [], attributes = {}) {
        const element = document.createElement(tag);
        for (let oneClass in classes) {
            element.classList.add(oneClass);
        }
        for (let attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
        return new Block(element);
    }

    hide() {
        this.element.setAttribute('hidden', true);
    }

    show() {
        this.element.removeAttribute('hidden', true);
    }

    setText(text = '') {
        this.element.textContent = text;
    }

    append(block) {
        //в цикле добавлять сразу несколько элементов
        this.element.appendChild(block.element);
    }

    event(type, callback) {
        this.element.addEventListener(type, callback);
        return function() {
            this.element.removeAttribute(type, callback);
        }.bind(this);
    }
}