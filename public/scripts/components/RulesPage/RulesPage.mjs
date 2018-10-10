import { Header } from '/scripts/blocks/Header/Header.mjs';
import { Block } from '/scripts/blocks/Block/Block.mjs';

export class RulesPage {
    constructor({type = ''} = {}){
        this._type = type;
    }

    render() {
        this._renderRules();
    }

    _renderRules() {
        if (this._type == 'fromLanding') {
            const header = new Header({type: 'backToLanding'});
            header.render();
        } else if (this._type == 'fromMenu') {
            const header = new Header({type: 'backToMenu'});
            header.render();
        }

        const rulesSection = new Block('section', ['centerSection'], {'dataset.sectionName': 'rules'});
        const rulesTitle = new Block('h2');
        rulesTitle.setText('Правила');

        const rulesInner = new Block('div', [], {id:'rulesInner'});

        const pTag = new Block('p');
        pTag.setText('Подробное описание правил игры...')
        rulesInner.append(pTag);

        rulesSection.append(rulesTitle);
        rulesSection.append(rulesInner);
        application.append(rulesSection.getElement());
    }
}
