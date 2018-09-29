import Block from '../Block/block.js'

export default class Form extends Block {
    constructor(fields = []) {
        const form = document.createElement('form');
        super(form);
        this.form = form;
        fields.forEach(field => {
            const fieldElement = Block.Create('input', field.classes, field.attributes);
            this.append(fieldElement);
        });
    }

    /**
     * Навешиваем событие сразу с данными из формы
     * @param {*} callback 
     */
    submit(callback) {
        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formdata = {};
            const elements = this.form.elements;
            for (const element in elements) {
                formdata[element] = elements[element].value;
            }
            callback(formdata);
        }.bind(this));
    }
}