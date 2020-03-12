export default class History {
    constructor(router) {
        this.router = router;
        this.current = '';
    }

    transitionTo(raw, onComplete, onError) {
        const route = this.router.match(raw);
        this.confirmTransition(route, () => {
            this.pushState(route)
        })
    }

    confirmTransition(route, onComplete, onError) {

    }

    pushState() {

    }
}
