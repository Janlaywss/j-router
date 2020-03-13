export default {
    props: {
        to: {}
    },
    render(h) {

        const handleClick = (e) => {
            e.stopPropagation();
            const to = this.$props.to;
            this.$router.push(to)
        };

        return <a onClick={handleClick}>{this.$slots.default}</a>
    }
}
