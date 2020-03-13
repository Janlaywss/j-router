import History from './base'
import {pushState} from '../utils/push-state'

export default class HtmlHistory extends History {
    constructor(router) {
        super(router)
    }

    getCurrentPath() {
        return window.location.pathname + window.location.search + window.location.hash
    }

    push(raw) {
        this.transitionTo(raw, (route) => {
            console.log(route);
            pushState(route.name)
        })
    }
}
