import { Button } from '../Button/Button.mjs';
import { Block } from '../Block/Block.mjs';

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
        const headerBlock = new Block('nav');
        const signUpButton = new Button(links['Регистрация'], 'Регистрация', headerBlock);
        signUpButton.render();

        const signInButton = new Button(links['Вход'], 'Вход', headerBlock);
        signInButton.render();      

        application.append(headerBlock.getElement());
    }

    _renderOnMenu() {
        
    }

    _renderBackToLanding() {
        const headerBlock = new Block('nav', ['backButton'], {});
        const landingLink = new Button('landing','Назад', headerBlock);
        landingLink.render();    

        application.append(headerBlock.getElement());
    }

    _renderBackToMenu() {
        const headerBlock = new Block('nav', ['backButton'], {});
        const landingLink = new Button('menu','Назад в меню', headerBlock);
        landingLink.render();    

        application.append(headerBlock.getElement());
    }
}