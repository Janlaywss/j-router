import {runQueue} from '../utils/async'

export default class History {
    constructor(router) {
        this.router = router;
        this.current = '';
    }

    transitionTo(raw, onComplete, onError) {
        const route = this.router.match(raw);
        this.confirmTransition(route, () => {
            this.updateState(route);
            onComplete && onComplete(route)
        }, () => {
            onError && onError()
        })
    }

    listen(cb) {
        this.cb = cb;
    }

    confirmTransition(route, onComplete, onError) {
        const queue = [].concat(
            this.router.beforeHook
        );

        const current = this.current;

        const abort = () => {
            onError && onError()
        };

        const iterator = (hook, next) => {
            hook(route, current, (to) => {
                if (to === false) {
                    abort()
                } else if (typeof to === 'object' && typeof to === 'string') {
                    abort();
                    this.push(to)
                } else {
                    next()
                }
            })
        };

        runQueue(queue, iterator, () => {
            onComplete && onComplete()
        })
    }

    updateState(route) {
        const prev = this.current;
        this.current = route;
        this.cb && this.cb(route);
        this.router.afterHook && this.router.afterHook.forEach(cb => cb(route, prev))
    }
}
