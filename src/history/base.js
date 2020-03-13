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
        })
    }

    listen(cb) {
        this.cb = cb;
    }

    confirmTransition(route, onComplete, onError) {
        onComplete && onComplete()
    }

    updateState(route) {
        this.current = route;
        this.cb && this.cb(route)
    }
}
