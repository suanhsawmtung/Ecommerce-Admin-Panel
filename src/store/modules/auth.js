import axios from "axios";


export default {
    state: {
        myData: null,

        token: null,

        error: null
    },
    getters: {
        getMyData: state => state.myData,

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
            state.myData = data.user;
            state.token = data.token;
            localStorage.setItem("TOKEN", data.token);
            localStorage.setItem("EMAIL", data.user.email);
            state.error = null;
        },

        /* Clear State Data And LocalStorage Data After Logout */
        cleanMyData: state => {
            state.myData = {};
            state.token = null;
            localStorage.clear();
        },

    },
    actions: {
        /* Register New Account */
        register: async({ commit }, userData) => {
            let { data } = await axios.post('http://localhost:8000/api/auth/register', userData);
            commit("setMyData", data);
        },

        /* Login Account */
        login: async({ commit }, userData) => {
            let { data } = await axios.post('http://localhost:8000/api/auth/login', userData);
            commit("setMyData", data);
        },

        /* Logout Account */
        logout: async({ commit }) => {
            await axios.post('http://localhost:8000/api/auth/logout');
            commit('cleanMyData');
        }
    }
}