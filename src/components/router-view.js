export default {
    functional: true,
    render(h, {parent}) {
        const matched = parent.$route.matched;
        if (!matched) {
            return h()
        }
        return h(matched.components.default)
    }
}
