import axios from "axios";


export default {
    namespaced: true,
    state: {
        products: [],
        categories: [],
        productPaginationPoints: {
            start: 0,
            end: 4,
        }
    },

    getters: {
        getProducts: state => state.products.reverse(),
        paginatedProducts: state => state.products.slice(state.productPaginationPoints.start, state.productPaginationPoints.end),
        getCategories: state => state.categories.reverse(),
        getProductCurrentPage: state => {
            return state.productPaginationPoints.end / (state.productPaginationPoints.end - state.productPaginationPoints.start);
        },
    },

    mutations: {
        setProducts: (state, products) => state.products = products,
        setCategories: (state, categories) => state.categories = categories,
        removeProduct: (state, removeId) => {
            state.products = state.products.filter(product => {
                return product.id != removeId;
            })
        },
        setProductPaginationPoints: (state, points) => {
            state.productPaginationPoints.start = points.start;
            state.productPaginationPoints.end = points.end;
        },
        removeCategory: (state, removeId) => {
            state.categories = state.categories.filter(category => {
                return category.id !== removeId;
            })
        },
        addNewProduct: (state, newProduct) => {
            newProduct.image = "http://localhost:8000/storage/" + newProduct.image;
            state.products.push(newProduct);
        },
        addNewCategory: (state, newCategory) => state.categories.push(newCategory),
        updatedCategory: (state, updatedCategory) => {
            state.categories.forEach(category => {
                if (category.id === updatedCategory.id) {
                    category.title = updatedCategory.title;
                }
            });

            state.products.forEach(product => {
                if (product.category_id === updatedCategory.id) {
                    product.category_title = updatedCategory.title;
                }
            })
        },
    },

    actions: {
        allProducts: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/product/getAllProducts");
            commit('setProducts', data);
        },
        allCategories: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/product/getAllCategories");
            commit('setCategories', data);
        },
        deleteProduct: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/product/deleteProduct/${removeId}`);
            commit('removeProduct', removeId);
        },
        deleteCategory: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/product/deleteCategory/${removeId}`);
            commit("removeCategory", removeId);
        },
        createProduct: async({ commit }, newProduct) => {
            let { data } = await axios.post("http://localhost:8000/api/product/createProduct", newProduct);
            commit("addNewProduct", data);
        },
        createCategory: async({ commit }, newCategory) => {
            let { data } = await axios.post("http://localhost:8000/api/product/createCategory", newCategory);
            commit("addNewCategory", data);
        },
        updateCategory: async({ commit }, newCategory) => {
            let { data } = await axios.post(`
            http: //localhost:8000/api/product/updateCategory/${newCategory.id}`, newCategory);
            commit("updatedCategory", data);
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
    }
}