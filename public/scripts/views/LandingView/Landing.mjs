import BaseView from '../BaseView/BaseView.mjs';

export default class Landing extends BaseView {
    constructor() {
        const landingViewContent = landingView({'headerType': 'landing', 'navClass': 'navigation_right', 'title': 'Пираты'});
        super(landingViewContent);
    }
}