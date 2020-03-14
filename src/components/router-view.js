export default {
    functional: true,
    render(h, {parent}) {
        const current = parent.$route.path;
        const view = parent.$router.matcher.pathMap[current];
        if (!view) {
            return h()
        }
        return h(view.component)
    }
}
