import RouterView from './components/router-view'
import RouterLink from './components/router-link'
import KeepAlive from './components/keep-alive'

export function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this);
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
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
            });

            Vue.component('router-view', RouterView);
            Vue.component('router-link', RouterLink);
            Vue.component('keep-alive-janlay', KeepAlive);
        }
    })
}
