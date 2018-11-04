export default class Router {
    constructor() {
        this.routes = {}
    }
    
    addPath(path, View, param) {
        this.routes[path] = {
            View: View,
            view: null,
            param: param,
        };
        return this;
    }

    open(path) {
        const previousRoute = this.routes[window.location.pathname];
        let {View, view, param} = this.routes[path];

        if(path == '') {
            this.open('/')
            return;
        }

        if (previousRoute.view) {
            application.innerHTML = '';
        }

        if (window.location.pathname != path) {
            window.history.pushState(null,'',path);
        }  

        if (!view) {
            view = new View(param);   
            this.routes[path] = {View, view, param};
            view.render();
        } else {
            application.innerHTML = view.el;
            const pageContent = document.getElementById('content');
            pageContent.innerHTML = view.pageContent.innerHTML;
        }
    }

    start() {
        application.addEventListener('click', event => {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }
            event.preventDefault();

            console.log({
				pathname: event.target.pathname
			});
            this.open(event.target.pathname);
        });
        const currentPath = window.location.pathname;
		this.open(currentPath);
    }
}