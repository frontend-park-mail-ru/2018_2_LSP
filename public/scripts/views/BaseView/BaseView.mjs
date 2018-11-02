export default class BaseView {
    constructor (el) {
        this.el = el;
        application.insertAdjacentHTML('beforeend', el);
        this.pageContent = document.getElementById("content") 
    }

    hide() {
        this.el.hidden = true;
    }

    show() {
        this.el.hidden = false;
        this.render();
    }

    render() {

    }    
}