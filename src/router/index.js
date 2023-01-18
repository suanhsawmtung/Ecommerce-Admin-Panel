import { createRouter, createWebHistory } from 'vue-router'
import OverviewPage from '../views/OverviewPage.vue'

const routes = [{
        path: '/',
        name: 'auth',
        component: () =>
            import ('../views/AuthPage.vue')
    },
    {
        path: '/overview',
        name: 'overview',
        component: OverviewPage
    },
    {
        path: '/category',
        name: 'category',
        component: () =>
            import ('../views/CategoryPage.vue')
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
        path: '/order',
        name: 'order',
        component: () =>
            import ('../views/OrderPage.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () =>
            import ('../views/SettingPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to) => {
    if (localStorage.length === 0 && to.name !== 'auth') {
        return { name: 'auth' }
    }
})

export default router