import { parseRouteMap } from './create-route-map'

export default class CreateMatcher {
    constructor(routes) {
        this.routes = routes;
        this.nameMap = parseRouteMap('name', routes);
        this.pathMap = parseRouteMap('path', routes);
    }

    match(raw) {
        if (typeof raw === 'object') {
            if (raw.name) {
                return this.nameMap[raw.name]
            }

            if (raw.path) {
                return this.pathMap[raw.path]
            }
        } else if (typeof raw === 'string') {
            return this.pathMap[raw]
        }
    }
}
