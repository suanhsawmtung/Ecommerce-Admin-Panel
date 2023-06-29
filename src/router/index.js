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
        path: '/user',
        name: 'user',
        component: () =>
            import ('../views/UserPage.vue')
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
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => 
            import ('../views/404Page.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    if (!localStorage.getItem("TOKEN") && to.name !== 'auth') {
        router.push({ name: 'auth' });
    }
})

export default router