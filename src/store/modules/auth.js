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
        getError: state => state.error,
    },
    mutations: {
        setMyData: (state, data) => {
            if (data.message) {
                state.error = data.message;
                return;
            }
            state.myData = data.user;
            state.token = data.token;
            sessionStorage.setItem("TOKEN", data.token);
            sessionStorage.setItem("EMAIL", data.user.email);
            state.error = null;
        },
        cleanMyData: state => {
            state.myData = {};
            state.token = null;
            sessionStorage.clear();
        },
    },
    actions: {
        register: async({ commit }, userData) => {
            let { data } = await axios.post('http://localhost:8000/api/auth/register', userData);
            commit("setMyData", data);
        },
        login: async({ commit }, userData) => {
            let { data } = await axios.post('http://localhost:8000/api/auth/login', userData);
            commit("setMyData", data);
        },
        logout: async({ commit }) => {
            await axios.post('http://localhost:8000/api/auth/logout');
            commit('cleanMyData');
        }
    }
}