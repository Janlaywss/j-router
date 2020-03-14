import {parseRouteMap} from './create-route-map'
import {extend} from "./utils/misc";
import {createRoute} from './utils/route'

const {compile, match} = require('path-to-regexp');

export default class CreateMatcher {
    constructor(routes) {
        const {pathList, pathMap, nameMap} = parseRouteMap(routes);
        this.pathList = pathList;
        this.nameMap = nameMap;
        this.pathMap = pathMap;
    }

    match(raw) {
        const location = normalizePath(raw);
        const {name, path} = location;
        if (name) {
            const record = this.nameMap[name];
            if (!record) {
                return createRoute(null, location)
            }
            location.path = compile(record.path)(location.params);
            return createRoute(record, location)
        } else {
            for (let i = 0; i < this.pathList.length; i++) {
                const currentPath = this.pathList[i];
                const record = this.pathMap[currentPath];
                if (record.regex.test(path)) {
                    location.params = match(record.path, { decode: decodeURIComponent })(path).params;
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
