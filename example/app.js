import Vue from 'vue'
import router from "./router";
import Index from './index'

new Vue({
    router,
    components: {
        Index
    },
    render() {
        return (
            <div>
                <Index />
            </div>
        )
    }
}).$mount('#app');
