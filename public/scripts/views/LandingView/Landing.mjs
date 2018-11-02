import BaseView from '../BaseView/BaseView.mjs';

export default class Landing extends BaseView {
    constructor() {
        const landingViewContent = landingView({"headerType": "landing", "title": "Пираты"});
        super(landingViewContent);
    }
}