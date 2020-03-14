function getFirstChildVNode(slot) {
    for (let i = 0; i < slot.length; i++) {
        const child = slot[i];
        if (child && child.componentOptions || child.isComment && child.asyncFactory) {
            return child
        }
    }
}

export default {
    abstract: true,
    name: 'keep-alive-janlay',
    created() {
        this.cache = Object.create(null);
    },
    render() {
        const slot = this.$slots.default;
        const vnode = getFirstChildVNode(slot);
        const key = vnode.key || vnode.componentOptions.Ctor.cid + `${vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : ''}`;
        const {cache} = this;

        const componentOptions = vnode && vnode.componentOptions

        if (componentOptions) {
            if (cache[key]) {
                vnode.componentInstance = cache[key].componentInstance
            } else {
                cache[key] = vnode;
            }
            vnode.data.keepAlive = true
        }
        return vnode || slot
    }
}
