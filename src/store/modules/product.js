import axios from "axios";


export default {
    state: {
        products: [],
        categories: [],
    },

    getters: {
        getProducts: state => state.products,
        getCategories: state => state.categories,
        getTopSellerItems: state => state.products.filter(product => {
            return product.rating.rate > 4.6;
        }),
    },

    mutations: {
        setProducts: (state, data) => {
            state.products = data;
            data.forEach(product => {
                if (state.categories.includes(product.category)) {
                    return;
                }
                state.categories.push(product.category);
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