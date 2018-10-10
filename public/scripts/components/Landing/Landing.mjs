import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Button } from '/scripts/blocks/Button/Button.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';

export class Landing {
    constructor ({docBody = document.body, type = 'dom'} = {}) {
        this._docBody = docBody;
        this._type = type;
    }

    render() {
        this._renderDOM();
        return;
    }

    _renderDOM() {
        const links = {
            'Играть': 'menu',
            'Правила': 'rulesLanding',
            'Вход': 'signin',
            'Регистрация': 'signup' 
        }
        const header = new Header({type: 'landing'})
        header.render();
    
        const landingSection = new Block('section', ['centerSection'], {'dataset.sectionName': 'landing'});
        const logo = new Block('h2');
        logo.setText('Шакал');

        const landingInner = new Block('div', [], {id:'landingInner'});

        const playButton = new Button(links['Играть'], 'Играть', landingInner, ['landingButtons']);
        playButton.render();

        const rulesButton = new Button(links['Правила'], 'Правила', landingInner, ['landingButtons']);
        rulesButton.render();

        landingSection.append(logo);
        landingSection.append(landingInner);
        application.append(landingSection.getElement());
    }
    
}