import {Block} from '../Block/Block.mjs';

export default class Form extends Block {
    constructor(fields = []) {
        const form = document.createElement('form');
        super(form);
        this.form = form;
        fields.forEach(field => {
            const fieldElement = Block.Create('p');
            fieldElement.append(Block.Create('input', field.classes, field.attributes));
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
            for (let element in elements) {
                formdata[elements[element].name] = elements[element].value;
            }
            callback(formdata);
        }.bind(this));
    }
}