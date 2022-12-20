import { createStore } from 'vuex'
import Products from './modules/product'
import Customers from "./modules/customer"

export default createStore({
    state: {
        toggleStatus: false,
    },
    getters: {
        getToggleStatus: state => state.toggleStatus,
        getPaginatorStatus: state => state.paginatorStatus,
    },
    mutations: {
        setToggleStatus: (state, changeStatus) => state.toggleStatus = changeStatus,
    },
    actions: {
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
    modules: { Products, Customers }
})