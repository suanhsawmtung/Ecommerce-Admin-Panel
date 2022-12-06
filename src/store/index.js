import { createStore } from 'vuex'
import Products from './modules/product'

export default createStore({
    state: {
        toggleStatus: false,
    },
    getters: {
        getToggleStatus: state => state.toggleStatus,
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
    modules: { Products }
})