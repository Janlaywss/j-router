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
                    <router-link to={{name: 'Home'}}>去Home</router-link>
                    &nbsp;
                    |
                    &nbsp;
                    <router-link to={{name: 'about', params: {id: 111}}}>去about</router-link>
                </div>
                <div style="margin-top: 10px">
                    <keep-alive-janlay>
                        <router-view />
                    </keep-alive-janlay>
                </div>
            </div>
        )
    }
}).$mount('#app');
