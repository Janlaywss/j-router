import HashHistory from './history/hash'
import Html5History from './history/html5'
import CreateMatcher from './create-matcher'

import {install} from './install'

class JRouter {
    constructor({mode, routes}) {
        // 设置路由类型
        this.mode = mode || 'history';
        // router多实例化
        this.apps = [];
        // 路由模式
        this.history = mode === 'history' ? new Html5History(this) : new HashHistory(this);
        // 路由匹配类。用来匹配路由使用/创建路由映射表
        this.matcher = new CreateMatcher(routes);
        // beforeEach 函数数组集合
        this.beforeHook = [];
        // afterHook 函数数组集合
        this.afterHook = []
    }

    init(app) {
        // 初始化push一个新的实例
        this.apps.push(app);
        // 设置当前激活的vue实例
        this.app = app;
        const history = this.history;

        // 如果是history模式
        if (history instanceof Html5History) {
            // 路由跳转。跳转目标路径是当前页面路径
            history.transitionTo(history.getCurrentPath())
        }

        /*
        * 在history类中增加回调函数
        * 当我们路由跳转时（updateRoute），会执行这个回调函数。
        * 回调函数会循环一遍实例数组
        * 接着，将每个根实例的_route 对象重置为最新的route对象
        * 触发Vue.util.defineReactive方法
        * 引起router-view进行视图渲染
        * */
        history.listen((route) => {
            this.apps.forEach(app => {
                app._route = route;
            })
        })
    }

    /*
    * 匹配函数
    * 传入一个要跳转的路由路径/对象
    * */
    match(raw) {
        return this.matcher.match(raw)
    }

    push(route) {
        this.history.push(route)
    }

    beforeEach(hook) {
        this.beforeHook.push(hook)
    }

    afterEach(hook) {
        this.afterHook.push(hook)
    }
}

// 将install方法挂在JRouter类上，方便Vue.use()执行
JRouter.install = install;

export default JRouter
