import RouterView from './components/router-view'

export function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this);
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                this._routerRoot = this.$parent._routerRoot
            }

            Object.defineProperty(this, '$router', {
                get() {
                    return this._routerRoot._router
                }
            });
            Object.defineProperty(this, '$route', {
                get() {
                    return this._routerRoot._route
                }
            })

            Vue.component('router-view', RouterView)
        }
    })
}
