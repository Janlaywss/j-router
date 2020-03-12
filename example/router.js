import JRouter from 'j-router/main.js'
import Vue from 'vue'

Vue.use(JRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
    },
    {
        path: '/about',
        name: 'about',
    }
]

const router = new JRouter({
    mode: 'history',
    routes
})

export default router
