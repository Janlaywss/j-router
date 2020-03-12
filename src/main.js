import HashHistory from './history/hash'
import Html5History from './history/html5'
import CreateMatcher from './create-matcher'

import { install } from './install'

class JRouter {
    constructor({ mode, routes }) {
        // 设置路由类型
        this.mode = mode || 'history';
        this.apps = [];
        this.history = mode === 'history' ? new Html5History(this) : new HashHistory(this);
        this.matcher = new CreateMatcher(routes);
    }

    init(app) {
        this.apps.push(app);
        this.app = app;
        const history = this.history;

        if (history instanceof Html5History) {
            history.transitionTo(history.getCurrentPath())
        }
    }

    match(raw) {
        return this.matcher.match(raw)
    }
}

JRouter.install = install;

export default JRouter
