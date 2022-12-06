import axios from "axios";


export default {
    state: {
        products: [],
        categories: [],
    },

    getters: {
        getProducts: state => state.products,
        getCategories: state => state.categories,
    },

    mutations: {
        setProducts: (state, data) => {
            state.products = data;
            data.forEach(product => {
                if (state.categories.includes(product.category)) {
                    return;
                }
                state.categories.unshift(product.category);
            });

        },
    },
    actions: {
        allProducts: async({ commit }) => {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            commit('setProducts', data);
        }
    },
}