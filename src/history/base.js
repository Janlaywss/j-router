import {runQueue} from '../utils/async'

export default class History {
    constructor(router) {
        this.router = router;
        this.current = '';
    }

    transitionTo(raw, onComplete, onError) {
        // 获得匹配的路由记录
        const route = this.router.match(raw);
        // 路由确认函数
        this.confirmTransition(route, () => {
            // 更新当前的路由记录
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
        // 构造一个队列
        const queue = [].concat(
            this.router.beforeHook
        );

        const current = this.current;

        const abort = () => {
            onError && onError()
        };

        // 队列迭代器
        const iterator = (hook, next) => {
            hook(route, current, (to) => {
                // to: next里的参数
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
        // 缓存current，更改current后prev就成跳转前路由了
        const prev = this.current;
        // 更新当前访问的路由记录
        this.current = route;
        // 调用回调函数，触发修改_route属性
        this.cb && this.cb(route);
        // 调用afterEach守卫
        this.router.afterHook && this.router.afterHook.forEach(cb => cb(route, prev))
    }
}
