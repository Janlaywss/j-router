export default {
    render(h) {
        const current = this.$route.path;
        const view = this.$router.matcher.pathMap[current];
        if (!view) {
            return h()
        }
        return h(view.component)
    }
}
