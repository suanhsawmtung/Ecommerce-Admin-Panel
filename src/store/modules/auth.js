import axios from "axios";


export default {
    state: {
        token: null,

        error: null
    },
    getters: {
        getToken: state => state.token,

        /* Error Message */
        getError: state => state.error,
    },
    mutations: {
        /* Set State Data And LocalStorage Data */
        setMyData: (state, data) => {
            if (data.message) {
                state.error = data.message;
                return;
            }
            state.token = data.user.token;
            localStorage.setItem("TOKEN", data.user.token);
            localStorage.setItem("ID", data.user.id);
            state.error = null;
        },

        /* Clear State Data And LocalStorage Data After Logout */
        cleanMyData: state => {
            state.myData = null;
            state.token = null;
            localStorage.clear();
        },

    },
    actions: {
        /* Register New Account */
        register: async({ commit }, userData) => {
            let { data } = await axios.post('https://nooneuse.shop/api/auth/admin/register', userData);
            commit("setMyData", data);
        },

        /* Login Account */
        login: async({ commit }, userData) => {
            let { data } = await axios.post('https://nooneuse.shop/api/auth/login', userData);
            commit("setMyData", data);
        },

        /* Logout Account */
        logout: async({ commit }) => {
            await axios.get('https://nooneuse.shop/api/auth/logout');
            commit('cleanMyData');
        },
    }
}