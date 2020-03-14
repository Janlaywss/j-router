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
        path: '/about/:id',
        name: 'about',
        component: About
    }
]

const router = new JRouter({
    mode: 'history',
    routes
})

export default router
