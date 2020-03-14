import { pathToRegexp } from 'path-to-regexp'

export function parseRouteMap(routes) {
    const pathList = [];
    // Object.create(null); 创建一个不含任何原型链属性的纯净对象
    const nameMap = Object.create(null);
    const pathMap = Object.create(null);
    routes.forEach(route => {
        // 添加路由记录
        addRouteRecord(pathList, nameMap, pathMap, route)
    });

    return {pathMap, pathList, nameMap}
}

function addRouteRecord(pathList, nameMap, pathMap, route) {
    const {path, name} = route;
    // 把对象记录中的path标准化
    const normalizedPath = normalizePath(path);
    // 补全属性
    const record = {
        path: normalizedPath,
        regex: pathToRegexp(path), //获得path的正则表达式
        components: route.components || {default: route.component},
        name,
        beforeEnter: route.beforeEnter,
        props: {}
    };

    if (!pathMap[record.path]) {
        pathMap[record.path] = record;
        pathList.push(record.path)
    }

    if (name) {
        nameMap[name] = record
    }
}

function normalizePath(path) {
    if (path[0] === '/') {
        return path
    }
    return `/${path}`.replace(/\/\//g, '/')
}
