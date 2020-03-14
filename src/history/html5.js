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
            // 进行链接修改跳转
            pushState(route.path)
        })
    }
}
