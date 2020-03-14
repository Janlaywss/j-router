export function createRoute(record, location) {
    return Object.freeze({
        path: location.path || '/',
        name: location.name || (record && record.name),
        params: location.params || {},
        matched: record ? record : []
    })
}

export const START = createRoute(null, {
    path: '/'
});
