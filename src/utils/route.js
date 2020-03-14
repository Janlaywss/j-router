export function createRoute(record, location) {
    // Object.freeze() 冻结对象。冻结后对象不可被修改
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
