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
        const previousPath = window.location.pathname;
        let {View, view, param} = this.routes[path];

        if(path == '') {
            this.open('/');
            return;
        }

        application.innerHTML = '';

        if (previousPath == '/profile' && path == '/profile') {
            window.history.go(-1);
            return;
        }

        if (window.location.pathname != path) {
            window.history.pushState(null,'',path);
        }  
        
        view = new View(param);            
        view.render();
        this.routes[path] = {View, view, param};
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
            
            if(event.target.innerText == "Назад") {
                window.history.back();
            } else {
                this.open(event.target.pathname);
            }            
        });

        //вперед, назад в браузере
        window.addEventListener('popstate', event => {
			const currentPath = window.location.pathname;
			this.open(currentPath);
        });
        
        const currentPath = window.location.pathname;
        this.open(currentPath);        
    }
}