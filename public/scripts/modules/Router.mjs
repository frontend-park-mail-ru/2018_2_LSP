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
		
		if (this.routes[path] == null) {
			return;
		} 
		let {View, view, param} = this.routes[path];

		const mainSection = document.getElementsByClassName('main-section');
		if (mainSection.length != 0) {
			mainSection[0].innerHTML = '';
		}
        
		const gameSection = document.getElementsByClassName('game');
		if (gameSection.length != 0) {
			gameSection[0].innerHTML = '';
		}    

		if (window.location.pathname != path) {
			window.history.pushState(null,'',path);
		}

		view = new View(param);            
		view.render();
		this.routes[path] = {View, view, param};
	}

	start() {
		const application = document.getElementById('application');
		application.addEventListener('click', event => {
			if (!(event.target instanceof HTMLAnchorElement)) {
				return;
			}
			event.preventDefault();
            
			if(event.target.innerText == 'Назад') {
				window.history.back();
			} else {
				this.open(event.target.pathname);
			}            
		});

		//вперед, назад в браузере
		window.addEventListener('popstate', () => {
			const currentPath = window.location.pathname;
			if(currentPath.includes('leaders/')) {
				this.open('/leaders');
			} else {
				this.open(currentPath);
			}
		});
        
		const currentPath = window.location.pathname;
		this.open(currentPath);        
	}

	go(path) {
		window.history.replaceState({}, '', path);
	}
}

export default new Router();