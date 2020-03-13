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
                <router-view />
            </div>
        )
    }
}).$mount('#app');
