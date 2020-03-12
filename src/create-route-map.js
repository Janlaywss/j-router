export function parseRouteMap(key, routes) {
    const map = {};
    routes.forEach(item => {
        if (item[key]) {
            map[item[key]] = item
        }
    });
    return map
}
