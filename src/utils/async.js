/*
*
* quene: 队列
* fn: 队列迭代器
* cb: 队列执行完后的回调函数
*
* */
export function runQueue(queue, fn, cb) {
    const step = index => {
        // 如果当前要执行的index 大于队列长度（越界）
        if (index >= queue.length) {
            // 回调
            cb()
        } else {
            // 如果队列中有
            if (queue[index]) {
                // 传入当前的要执行的函数和下一个要执行的函数
                fn(queue[index], ()=>{
                    step(index + 1)
                })
            } else {
                // 否则，走下一步
                step(index + 1)
            }
        }
    };
    // 从数组下标 0 开始
    step(0)
}
