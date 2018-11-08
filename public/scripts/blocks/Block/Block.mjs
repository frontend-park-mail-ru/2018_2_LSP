export class Block {
    constructor(tag = 'div', classes = [], attributes = {}) {
        this.element = document.createElement(tag);
        classes.forEach(oneClass => {
            this.element.classList.add(oneClass);
        });

        for (let attribute in attributes) {
            this.element.setAttribute(attribute, attributes[attribute]);
        }
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

    clear() {
        this.element.innerHTML = '';
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