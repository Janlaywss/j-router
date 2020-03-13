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
                <div>
                    <router-link to={{ name: 'Home' }}>去Home</router-link>
                    &nbsp;
                    |
                    &nbsp;
                    <router-link to={{ name: 'about' }}>去about</router-link>
                </div>
                <div style="margin-top: 10px">
                    <router-view />
                </div>
            </div>
        )
    }
}).$mount('#app');
