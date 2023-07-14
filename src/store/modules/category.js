import axios from "axios";


export default {
    namespaced: true,
    state: {
        /* All Categories */
        categories: null,

        simpleCategories: null,

        /* Start And End Point To Make Paginated Category Data */
        categoryPaginationPoints: {
            start: 0,
            end: 3,
        }, 

    },

    getters: {
        /* Get All Categories */
        getCategories: state => state.categories,

        getSimpleCategories: state => state.simpleCategories,

        /* Paginated Categories Data */
        paginatedCategories: state => state.categories.slice(state.categoryPaginationPoints.start, state.categoryPaginationPoints.end),

        /* Not to Change Current Paginated Data, When Change Other Route */
        getCategoryCurrentPage: state => {
            return state.categoryPaginationPoints.end / (state.categoryPaginationPoints.end - state.categoryPaginationPoints.start);
        },

    },

    mutations: {
        /* Set All Category Data */
        setCategories: (state, categories) => state.categories = categories.reverse(),

        /* Set Taken Category Data */
        setTakenCategories: (state, categories) => state.simpleCategories = categories,

        /* Set Start Point And End Point To Slice Category Data For Pagination */
        setCategoryPaginationPoints: (state, points) => {
            state.categoryPaginationPoints.start = points.start;
            state.categoryPaginationPoints.end = points.end;
        },

        /* Remove Deleted Category Data For Client Side */
        removeCategory: (state, removeId) => {
            state.categories = state.categories.filter(category => {
                return category.id !== removeId;
            })
        },

        /* Add New Category Data For Client Side */
        addNewCategory: (state, newCategory) => state.categories.unshift(newCategory),

        /* Add Updated Category Data For Client Side */
        updatedCategory: (state, updatedCategory) => {
            state.categories.forEach(category => {
                if (category.id === updatedCategory.id) {
                    category.title = updatedCategory.title;
                }
            });
        },

    },

    actions: {
        /* Get All Categories Data */
        allCategories: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/admin/category/getAllCategories");
            commit('setCategories', data);
        },

        /* Delete Category When NO Products Exist */
        deleteCategory: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/admin/category/deleteCategory/${removeId}`);
            commit("removeCategory", removeId);
        },

        /* Create New Category */
        createCategory: async({ commit }, newCategory) => {
            let { data } = await axios.post("http://localhost:8000/api/admin/category/createCategory", newCategory);
            commit("addNewCategory", data);
        },

        /* Update Category Data */
        updateCategory: async({ commit }, newCategory) => {
            let { data } = await axios.post(`http://localhost:8000/api/admin/category/updateCategory/${newCategory.id}`, newCategory);
            commit("updatedCategory", data);
        },

        /* Take Id And Title Of All Categories */
        takeCategories: async({ commit }) => {
            const { data } = await axios.get("http://localhost:8000/api/admin/category/takeCategories");
            commit("setTakenCategories", data);
        },

        /* Search Category */
        searchCategory: async({commit}, searchKey) => {
            const { data } = await axios.get(`http://localhost:8000/api/admin/category/getAllCategories/${searchKey}`);
            commit("setCategories", data);
        },

        /* Start Point And End Point To Slice Category Data For Pagination */
        categoryPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setCategoryPaginationPoints", points);
        },

    }
}