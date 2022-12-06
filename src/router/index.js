import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from '../views/OverviewPage.vue'

const routes = [{
        path: '/',
        name: 'overview',
        component: OverviewPage
    },
    {
        path: '/product',
        name: 'product',
        component: () =>
            import ('../views/ProductPage.vue')
    },
    {
        path: '/customer',
        name: 'customer',
        component: () =>
            import ('../views/CustomerPage.vue')
    },
    {
        path: '/message',
        name: 'message',
        component: () =>
            import ('../views/MessagePage.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () =>
            import ('../views/SettingPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router