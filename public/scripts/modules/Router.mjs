class Router {
	constructor() {
		this.routes = {};
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
		//const previousPath = window.location.pathname;
		let pathParts = {first: '', name: '', page: ''};
		const pathPartsArr = path.split('/');

		if(path == '') {
			this.open('/');
			return;
		}

		pathParts.name = '/' + pathPartsArr[1];

		if (pathPartsArr.length == 3) {
			pathParts.page = pathPartsArr[2];
		}

		//let {View, view, param} = this.routes[pathParts.name];		
		if (this.routes[path] == null) {
			return;
		} 
		let {View, view, param} = this.routes[path];

		const mainSection = document.getElementsByClassName('mainSection');
		if (mainSection.length != 0) {
			mainSection[0].innerHTML = '';
		}
        
		const gameSection = document.getElementsByClassName('gameSection');
		if (gameSection.length != 0) {
			gameSection[0].innerHTML = '';
		}    

		if (window.location.pathname != path) {
			window.history.pushState(null,'',path);
		}

		view = new View(param);            
		view.render();
		//this.routes[pathParts.name] = {View, view, param};
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
            
			if(event.target.innerText == 'Назад') {
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

	go(path) {
		window.history.replaceState({}, '', path);
	}
}

export default new Router();