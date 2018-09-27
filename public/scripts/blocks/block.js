export default class Block {
    constructor(element) {
        this.element = element;
    }

    hide() {
        this.element.setAttribute('hidden', true);
    }

    show() {
        this.element.removeAttribute('hidden', true);
    }

    setText(text) {
        this.element.textContent = text;
    }

    append(block) {
        //в цикле добавлять сразу несколько элементов
        this.element.appendChild(block.element);
    }
}