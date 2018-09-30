import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Button } from '/scripts/blocks/Button/Button.mjs';
import { Block } from '/scripts/blocks/block.js';

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
    
        const landingSection = Block.Create('section', ['centerSection'], {'dataset.sectionName': 'landing'});
        const logo = Block.Create('h2');
        logo.setText('Шакал');

        const landingInner = Block.Create('div', [], {id:'landingInner'});

        const playButton = new Button(links['Играть'], 'Играть', landingInner, ['landingButtons']);
        playButton.render();

        const rulesButton = new Button(links['Правила'], 'Правила', landingInner, ['landingButtons']);
        rulesButton.render();

        landingSection.append(logo);
        landingSection.append(landingInner);
        application.append(landingSection.getEl());
    }
    
}