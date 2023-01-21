import { createStore } from 'vuex'
import Products from './modules/product'
import Customers from "./modules/customer"
import Auth from "./modules/auth"
import Categories from "./modules/category"
import Overview from './modules/overview'
import Orders from "./modules/order"

export default createStore({
    state: {
        toggleStatus: false,
    },
    getters: {
        /* Status to Change Side Nav Bar Width */
        getToggleStatus: state => state.toggleStatus,
    },
    mutations: {
        setToggleStatus: (state, changeStatus) => state.toggleStatus = changeStatus,
    },
    actions: {
        /* Side Nav Bar Width Change Toggle with Screen Size */
        toggle: (context, status) => {
            let changeStatus;
            if (window.innerWidth > 991 || window.innerWidth <= 400) {
                changeStatus = !status;
            } else {
                changeStatus = true;
            }
            context.commit('setToggleStatus', changeStatus);

        },
    },
    modules: { Products, Customers, Auth, Categories, Overview, Orders }
})