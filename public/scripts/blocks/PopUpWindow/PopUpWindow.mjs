import popUpWindow from './popUpWindow.pug';
import './PopUpWindow.scss';

/**
 * Класс всплывающего окна
 * @module PopUpWindow
 */
export default class PopUpWindow {
	/**
     * Создать всплывающее окно
     * @param {string} windowText текст окна
     */
	constructor (windowText = '') {
		const infoWindow = popUpWindow({'text': windowText});		
		application.insertAdjacentHTML('beforeend', infoWindow);

		const cross = document.getElementsByClassName('popup__close');
		cross[0].onclick = function(event) {
			event.preventDefault();
			const popup1 = document.getElementById('popup1');
			application.removeChild(popup1);
		};
	}
}