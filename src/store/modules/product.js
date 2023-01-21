import axios from "axios";


export default {
    namespaced: true,
    state: {
        /* All Products */
        products: [],

        /* Start And End Point To Make Paginated Product Data */
        productPaginationPoints: {
            start: 0,
            end: 4,
        },

    },

    getters: {
        /* Get All Products Data */
        getProducts: state => state.products,

        /* Paginated Products Data */
        paginatedProducts: state => state.products.slice(state.productPaginationPoints.start, state.productPaginationPoints.end),

        /*  Not to Change Current Products Paginated Data, When Change Other Route */
        getProductCurrentPage: state => {
            return state.productPaginationPoints.end / (state.productPaginationPoints.end - state.productPaginationPoints.start);
        },

    },

    mutations: {
        /* Set All Products Data */
        setProducts: (state, products) => {
            products.forEach(product => {
                product.image = 'http://localhost:8000/storage/' + product.image;
            })
            state.products = products.reverse();
        },

        /* Remove Deleted Products Data From State */
        removeProduct: (state, removeId) => {
            state.products = state.products.filter(product => {
                return product.id != removeId;
            })
        },

        /* Change Start And End Points Of Product Paginator */
        setProductPaginationPoints: (state, points) => {
            state.productPaginationPoints.start = points.start;
            state.productPaginationPoints.end = points.end;
        },

        /* Add New Product Data To State */
        addNewProduct: (state, newProduct) => {
            newProduct.image = "http://localhost:8000/storage/" + newProduct.image;
            state.products.unshift(newProduct);
        },

        /* Add Updated Product Data To State */
        updateOldProduct: (state, updatedProduct) => {
            updatedProduct.image = "http://localhost:8000/storage/" + updatedProduct.image;
            state.products = state.products.filter(product => {
                return product.id !== updatedProduct.id
            });
            state.products.unshift(updatedProduct);
        }

    },

    actions: {
        /* Get All Products Data */
        allProducts: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/product/getAllProducts");
            commit('setProducts', data);
        },

        /* Delete Product  */
        deleteProduct: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/product/deleteProduct/${removeId}`);
            commit('removeProduct', removeId);
        },

        /* Create New Product */
        createProduct: async({ commit }, newProduct) => {
            let { data } = await axios.post("http://localhost:8000/api/product/createProduct", newProduct);
            commit("addNewProduct", data);
        },

        /* Update Product */
        updateProduct: async({ commit }, updateData) => {
            try {
                let { data } = await axios.post(`http://localhost:8000/api/product/updateProduct/${updateData.id}`, updateData);
                commit("updateOldProduct", data);
            } catch (error) {
                console.log(error);
            }
        },

        /* Change Category Title Of Product */
        changeCategoryTitleOfProduct: ({ commit }, allProducts) => {
            commit("setProducts", allProducts);
        },

        /* Start Point And End Point To Slice Product Data For Pagination */
        productPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setProductPaginationPoints", points);
        },


    }
}