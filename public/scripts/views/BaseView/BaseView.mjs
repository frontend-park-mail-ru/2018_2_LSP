export default class BaseView {
    constructor (el) {
        this.el = el;
        application.insertAdjacentHTML('beforeend', el);
        this.pageContent = document.getElementById("content");
    }

    hide() {        
        document.getElementById("application").hidden = true;
        //this.el.hidden = true;
    }

    show() {
        //this.el.hidden = false;        
        document.getElementById("application").hidden = false;
        this.render();
    }

    get active() {
		return !this.el.hidden;
	}

    render() {
    }    
}