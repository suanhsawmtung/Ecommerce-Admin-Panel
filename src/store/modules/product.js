import axios from "axios";


export default {
    state: {
        products: [],
        categories: [],
        productPaginationPoints: {
            start: 0,
            end: 4,
        }
    },

    getters: {
        getProducts: state => state.products,
        paginatedProducts: state => state.products.slice(state.productPaginationPoints.start, state.productPaginationPoints.end),
        getCategories: state => state.categories,
        getTopSellerItems: state => state.products.filter(product => {
            return product.rating.rate > 4.6;
        }),
        getProductCurrentPage: state => {
            return state.productPaginationPoints.end / (state.productPaginationPoints.end - state.productPaginationPoints.start);
        }
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
        removeProduct: (state, removeId) => {
            state.products = state.products.filter(product => {
                return product.id != removeId;
            })
        },
        setProductPaginationPoints: (state, points) => {
            state.productPaginationPoints.start = points.start;
            state.productPaginationPoints.end = points.end;
        }
    },

    actions: {
        allProducts: async({ commit }) => {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            commit('setProducts', data);
        },
        deleteProduct: async({ commit }, removeId) => {
            await axios.delete(`https://fakestoreapi.com/products/${removeId}`);
            commit('removeProduct', removeId);
        },
        productPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + 4;
            let points = {
                start: start,
                end: end
            }
            commit("setProductPaginationPoints", points);
        }
    },
}