import {parseRouteMap} from './create-route-map'
import {extend} from "./utils/misc";
import {createRoute} from './utils/route'

const {compile, match} = require('path-to-regexp');

export default class CreateMatcher {
    constructor(routes) {
        const {pathList, pathMap, nameMap} = parseRouteMap(routes);
        // path数组 ['/', '/about']
        this.pathList = pathList;
        // 以name为key的对象
        this.nameMap = nameMap;
        // 以path为key的对象
        this.pathMap = pathMap;
    }

    match(raw) {
        // 标准化我们要匹配的路由地址/对象
        const location = normalizePath(raw);
        const {name, path} = location;
        if (name) {
            // 如果有name属性，那我们去路由名称映射表寻找相应的路由记录
            const record = this.nameMap[name];
            if (!record) {
                // 如果没找到，那就返回空路由记录
                return createRoute(null, location)
            }
            // 将用户传入的参数和path路径，用 path-to-regexp 转换成真实路径。
            // 例如：/about/:id + params: {id:1} = /about/1
            location.path = compile(record.path)(location.params);
            //创建路由记录
            return createRoute(record, location)
        } else {
            // 如果里面包含path
            for (let i = 0; i < this.pathList.length; i++) {
                // 循环地址数组，然后去地址映射表找到相应的路由记录
                const currentPath = this.pathList[i];
                const record = this.pathMap[currentPath];
                // 如果当前遍历的路由记录正则，匹配要匹配的路径
                if (record.regex.test(path)) {
                    // 将链接内的参数解构出来
                    // /about/1 - /about/:id = { id: 1 }
                    location.params = match(record.path, { decode: decodeURIComponent })(path).params;
                    //创建路由记录
                    return createRoute(record, location)
                }
            }
        }
    }
}

function normalizePath(raw) {
    let next = typeof raw === 'string' ? {path: raw} : raw;
    if (next._normalized) {
        return next
    } else if (next.name) {
        next = extend({}, raw);
        const params = next.params;
        if (params && typeof params === 'object') {
            next.params = extend({}, params)
        }
        return next
    }

    return {
        _normalized: true,
        ...next
    }
}
