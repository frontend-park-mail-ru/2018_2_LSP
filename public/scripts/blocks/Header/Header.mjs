import { Button } from '../Button/Button.mjs';
import { Block } from '../block.js';

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
        const headerBlock = Block.Create('nav');
        const signUpButton = new Button(links['Регистрация'], 'Регистрация', headerBlock);
        signUpButton.render();

        const signInButton = new Button(links['Вход'], 'Вход', headerBlock);
        signInButton.render();      

        application.append(headerBlock.getEl());
    }

    _renderOnMenu() {
        
    }

    _renderBackToLanding() {
        const headerBlock = Block.Create('nav', ['backButton'], {});
        const landingLink = new Button('landing','Назад', headerBlock);
        landingLink.render();    

        application.append(headerBlock.getEl());
    }

    _renderBackToMenu() {
        const headerBlock = Block.Create('nav', ['backButton'], {});
        const landingLink = new Button('menu','Назад в меню', headerBlock);
        landingLink.render();    

        application.append(headerBlock.getEl());
    }
}