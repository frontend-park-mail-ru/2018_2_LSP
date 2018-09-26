export class Header {
    constructor ({type = ''} = {}) {
        this._type = type;
    }

    render() {
        switch (this._type) {
            case 'landing':
                this._renderOnLanding();
                return;
            case 'menu':
                this._renderOnMenu();
                return;
            case 'backToLanding':
                this._renderBackToLanding();
                return;
            case 'backToMenu':
                this._renderBackToMenu();
                return;        
        }
    }

    _renderOnLanding() {
        const links = {
            'Вход': 'signin',
            'Регистрация': 'signup' 
        }
        
        const headerBlock = document.createElement('nav');
        
        const signinLink = document.createElement('a');
        signinLink.href = links['Вход'];
        signinLink.dataset.href = links['Вход'];
        signinLink.textContent = 'Вход';
        headerBlock.appendChild(signinLink);
    
        const signupLink = document.createElement('a');
        signupLink.href = links['Регистрация'];
        signupLink.dataset.href = links['Регистрация'];
        signupLink.textContent = 'Регистрация';
        headerBlock.appendChild(signupLink);
    
        application.appendChild(headerBlock);
    }

    _renderBackToLanding() {
        const headerBlock = document.createElement('nav');
        
        const landingLink = document.createElement('a');
        landingLink.href = landingLink.dataset.href = 'landing';
        landingLink.textContent = 'Назад';

        headerBlock.appendChild(landingLink);
        application.appendChild(headerBlock);
    }

    _renderBackToMenu() {
        const headerBlock = document.createElement('nav');

        const menuLink = document.createElement('a');
        menuLink.href = menuLink.dataset.href = 'menu';
        menuLink.textContent = 'Назад в меню';

        headerBlock.appendChild(menuLink);
        application.appendChild(headerBlock);
    }
}