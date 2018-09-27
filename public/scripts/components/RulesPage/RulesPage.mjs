import { Header } from '../Header/Header.mjs';

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

        const rulesSection = document.createElement('section');
        rulesSection.dataset.sectionName = 'rules';
        
        const rulesTitle = document.createElement('h2');
        rulesTitle.textContent = "Правила";
        
        const rulesInner = document.createElement('div');
        
        const pTag = document.createElement('p');
        pTag.textContent = 'Подробное описание правил игры...';
        rulesInner.appendChild(pTag);

        rulesSection.appendChild(rulesTitle);
        rulesSection.appendChild(rulesInner);
        application.appendChild(rulesSection);
    }
}
