import RouterView from './components/router-view'
import RouterLink from './components/router-link'
import KeepAlive from './components/keep-alive'

/*
* install方法：
* 在Vue.use()调用时，会执行install方法
* 这也是 使用Vue.use() 必须定义的
* 方便在Vue实例上直接挂载属性或操作
* */
export function install(Vue) {
    Vue.mixin({
        beforeCreate() {
            // 在所有的组件中注入 beforeCreate
            // 如果有 this.$options.router，代表是根组件/路由根组件
            if (this.$options.router) {
                this._routerRoot = this;
                // 定义_router 方法，属性值是options传入的router实例
                this._router = this.$options.router;
                // 调用init方法，进行初始化
                this._router.init(this);
                // 监听_route方法。当路由更新时会通知使用_route的地方
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // 如果不是根组件，就把父组件的_routerRoot引用过来
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
            }

            // 定义this.$router属性
            Object.defineProperty(this, '$router', {
                get() {
                    return this._routerRoot._router
                }
            });
            // 定义this.$route属性
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
