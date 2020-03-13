export default {
    render(h) {
        const current = this.$route.path
        const view = this.$router.matcher.pathMap[current]
        return h(view.component)
    }
}
