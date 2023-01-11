import axios from "axios";


export default {
    namespaced: true,
    state: {
        categories: [],
        categoryPaginationPoints: {
            start: 0,
            end: 3,
        }
    },

    getters: {
        getCategories: state => state.categories.reverse(),
        paginatedCategories: state => state.categories.slice(state.categoryPaginationPoints.start, state.categoryPaginationPoints.end),
        getCategoryCurrentPage: state => {
            return state.categoryPaginationPoints.end / (state.categoryPaginationPoints.end - state.categoryPaginationPoints.start);
        },
    },

    mutations: {
        setCategories: (state, categories) => state.categories = categories,
        setCategoryPaginationPoints: (state, points) => {
            state.categoryPaginationPoints.start = points.start;
            state.categoryPaginationPoints.end = points.end;
        },
        removeCategory: (state, removeId) => {
            state.categories = state.categories.filter(category => {
                return category.id !== removeId;
            })
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
        allCategories: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/product/getAllCategories");
            commit('setCategories', data);
        },
        deleteCategory: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/product/deleteCategory/${removeId}`);
            commit("removeCategory", removeId);
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
        categoryPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setCategoryPaginationPoints", points);
        }
    }
}