import axios from "axios";


export default {
    namespaced: true,
    state: {
        products: [],
        productPaginationPoints: {
            start: 0,
            end: 4,
        },
    },

    getters: {
        getProducts: state => state.products,
        paginatedProducts: state => state.products.slice(state.productPaginationPoints.start, state.productPaginationPoints.end),
        getProductCurrentPage: state => {
            return state.productPaginationPoints.end / (state.productPaginationPoints.end - state.productPaginationPoints.start);
        },
    },

    mutations: {
        setProducts: (state, products) => state.products = products.reverse(),
        removeProduct: (state, removeId) => {
            state.products = state.products.filter(product => {
                return product.id != removeId;
            })
        },
        setProductPaginationPoints: (state, points) => {
            state.productPaginationPoints.start = points.start;
            state.productPaginationPoints.end = points.end;
        },
        addNewProduct: (state, newProduct) => {
            newProduct.image = "http://localhost:8000/storage/" + newProduct.image;
            state.products.push(newProduct);
        },
    },

    actions: {
        allProducts: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/product/getAllProducts");
            commit('setProducts', data);
        },
        deleteProduct: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/product/deleteProduct/${removeId}`);
            commit('removeProduct', removeId);
        },
        createProduct: async({ commit }, newProduct) => {
            let { data } = await axios.post("http://localhost:8000/api/product/createProduct", newProduct);
            commit("addNewProduct", data);
        },
        productPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setProductPaginationPoints", points);
        },
        changeCategoryTitleOfProduct: ({ commit }, allProducts) => {
            commit("setProducts", allProducts);
        }
    }
}