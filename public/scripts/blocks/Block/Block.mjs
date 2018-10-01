export class Block {
    constructor(element) {
        this.element = element;
    }

    static Create(tag = 'div', classes = [], attributes = {}) {
        const element = document.createElement(tag);
        classes.forEach(function(oneClass) {
            element.classList.add(oneClass);
        });

        for (let attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
        return new Block(element);
    }

    getElement() {
        return this.element;
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
        this.element.appendChild(block.element);
    }

    event(type, callback) {
        this.element.addEventListener(type, callback);
        return function() {
            this.element.removeAttribute(type, callback);
        }.bind(this);
    }
}