import JRouter from 'j-router/main.js'
import Vue from 'vue'
import Index from './index'
import About from './about'

Vue.use(JRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
]

const router = new JRouter({
    mode: 'hash',
    routes
})

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    console.log(to, from);
});

export default router
