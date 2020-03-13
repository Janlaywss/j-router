export function pushState(path) {
    window.history.pushState({}, '', path)
}
