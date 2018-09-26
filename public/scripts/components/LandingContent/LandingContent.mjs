export class LandingMenuContent {
    constructor ({docBody = document.body, type = 'dom'} = {}) {
        this._docBody = docBody;
        this._type = type;
    }
    // get data() {
    //     this._data
    // }

    // set data(data = []) {
    //     this._data = data;
    // }

    render() {
        // if(!this._data) {
        //     return
        // }
        this._renderDOM();
        return;
    }

    _renderDOM() {
        const links = {
            'Играть': 'menu',
            'Правила': 'rules',
            'Вход': 'signin',
            'Регистрация': 'signup' 
        }
    
        const landingSection = document.createElement('section');
        landingSection.dataset.sectionName = 'landing';
    
        const logo = document.createElement('h2');
        logo.textContent = "Шакал";
    
        const landingInner = document.createElement('div');
    
        const playDiv = document.createElement('div');
        const playLink = document.createElement('a');
        playLink.href = links['Играть'];
        playLink.dataset.href = links['Играть'];
        playLink.textContent = 'Играть';
        playDiv.appendChild(playLink);
        landingInner.appendChild(playDiv);
    
        const rulesDiv = document.createElement('div');
        const rulesLink = document.createElement('a');
        rulesLink.href = links['Правила'];
        rulesLink.dataset.href = links['Правила'];
        rulesLink.textContent = 'Правила';
        rulesDiv.appendChild(rulesLink);
        landingInner.appendChild(rulesDiv);
    
        landingSection.appendChild(logo);
        landingSection.appendChild(landingInner);
        application.appendChild(landingSection);
    }
    
}