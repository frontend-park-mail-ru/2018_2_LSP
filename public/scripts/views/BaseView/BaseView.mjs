export default class BaseView {
    constructor (el) {
        this.el = el;
        this.mainSection = document.getElementById("mainSection");
        //application.insertAdjacentHTML('beforeend', el);

        if (this.mainSection) {
            const backButton = document.getElementsByClassName('basicButton_back');
            backButton[0].hidden = false;
            this.mainSection.insertAdjacentHTML('beforeend', el);
        } else {
            application.insertAdjacentHTML('beforeend', el);
            const menuHeader = header({"headerType": 'notLoggedIn'});
            const navigationPart = document.getElementsByTagName("nav");
            navigationPart[0].innerHTML = "";
            navigationPart[0].insertAdjacentHTML('beforeend', menuHeader);
        }
        this.pageContent = document.getElementById('content');
    }

    hide() {        
        document.getElementById("application").hidden = true;
    }

    show() {     
        document.getElementById("application").hidden = false;
        this.render();
    }

    get active() {
		return !this.el.hidden;
	}

    render() {
    }    
}