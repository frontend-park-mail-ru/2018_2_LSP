export class MenuComponent {
    constructor({part, name = '', value = ''} = {}){
        this._part = part;
        this._name = name;
        this._value = value;
    }

    render() {
        this._renderMenuComponent();
    }

    _renderMenuComponent() {    
        const div = document.createElement('div');
        const link = document.createElement('a');
        link.href = this._name;
        link.dataset.href = this._name;
        link.textContent = this._value;
      
        div.appendChild(link);
        this._part.appendChild(div);
    }
}
