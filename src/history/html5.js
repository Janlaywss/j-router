import History from './base'

export default class HtmlHistory extends History {
    constructor(router) {
        super(router)
    }

    getCurrentPath() {
        return window.location.pathname + window.location.search + window.location.hash
    }
}
