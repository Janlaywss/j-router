import History from './base'
import {pushState} from "../utils/push-state";

export default class HashHistory extends History {
    constructor(router) {
        super(router)
    }

    setupEventLister() {
        window.addEventListener('popstate', () => {
            console.log(window.location.hash);
        })
    }
    push(raw) {
        this.transitionTo(raw, (route) => {
            pushState(route.path)
        })
    }
}
