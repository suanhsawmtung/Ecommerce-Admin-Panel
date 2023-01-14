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
        setProducts: (state, products) => {
            products.forEach(product => {
                product.image = 'http://localhost:8000/storage/' + product.image;
            })
            state.products = products.reverse();
        },
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
            state.products.unshift(newProduct);
        },
        updateOldProduct: (state, updatedProduct) => {
            updatedProduct.image = "http://localhost:8000/storage/" + updatedProduct.image;
            state.products = state.products.filter(product => {
                return product.id !== updatedProduct.id
            });
            state.products.unshift(updatedProduct);
        }
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
        },
        updateProduct: async({ commit }, updateData) => {
            try {
                let { data } = await axios.post(`http://localhost:8000/api/product/updateProduct/${updateData.id}`, updateData);
                commit("updateOldProduct", data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}