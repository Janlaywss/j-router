function getFirstChildVNode(slot) {
    for (let i = 0; i < slot.length; i++) {
        const child = slot[i];
        // isComment： 是否是注释节点
        // asyncFactory：是否是异步组件
        if (child && child.componentOptions || child.isComment && child.asyncFactory) {
            return child
        }
    }
}

export default {
    // 抽象组件。可以控制子组件
    abstract: true,
    name: 'keep-alive-janlay',
    created() {
        this.cache = Object.create(null);
    },
    render() {
        const slot = this.$slots.default;
        // 获取第一个child
        const vnode = getFirstChildVNode(slot);
        // key要唯一。可能存在多个实例，所以要加cid
        const key = vnode.key || vnode.componentOptions.Ctor.cid + `${vnode.componentOptions.tag ? `::${vnode.componentOptions.tag}` : ''}`;
        const {cache} = this;

        const componentOptions = vnode && vnode.componentOptions;

        // 如果有componentOptions
        if (componentOptions) {
            if (cache[key]) {
                // 把当前vnode的componentInstance 修改为缓存里的componentInstance
                vnode.componentInstance = cache[key].componentInstance
            } else {
                // 存在缓存里
                cache[key] = vnode;
            }
            // 为缓存组件打上标志
            vnode.data.keepAlive = true
        }
        return vnode || slot
    }
}
