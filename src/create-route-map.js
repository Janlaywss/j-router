import { pathToRegexp } from 'path-to-regexp'

export function parseRouteMap(routes) {
    const pathList = [];
    const nameMap = Object.create(null);
    const pathMap = Object.create(null);
    routes.forEach(route => {
        addRouteRecord(pathList, nameMap, pathMap, route)
    });

    return {pathMap, pathList, nameMap}
}

function addRouteRecord(pathList, nameMap, pathMap, route) {
    const {path, name} = route;
    const normalizedPath = normalizePath(path);
    const record = {
        path: normalizedPath,
        regex: pathToRegexp(path),
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
