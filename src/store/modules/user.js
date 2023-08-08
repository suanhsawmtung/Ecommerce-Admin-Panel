import axios from "axios";

export default {
    state: {
        customers: {},

        admins: [],

        myData: null,

        /* Start And End Point To Make Paginated Admin Data */
        adminPaginationPoints: {
            start: 0,
            end: 4
        }
    },
    getters: {
        /* Get All Customers */
        getCustomers: state => state.customers.data,

        /* Get All Admin */
        getAdmins: state => state.admins,

        /* Get My Profile Data */
        getMyData: state => state.myData,

        /* Paginated Admins Data */
        paginatedAdmins: state => state.admins.slice(state.adminPaginationPoints.start, state.adminPaginationPoints.end),

        /* Not to Change Current Admin Paginated Data, When Change Other Route */
        getAdminCurrentPage: state => {
            return state.adminPaginationPoints.end / (state.adminPaginationPoints.end - state.adminPaginationPoints.start);
        },

        /* Get Customer Paginated Datas */
        getCustomerLinks: state =>  state.customers.links,
        getCustomerFirstPageUrl: state => state.customers.first_page_url,
        getCustomerLastPageUrl: state => state.customers.last_page_url,
        getCustomerCurrentPage: state => state.customers.current_page,
        getCustomerLastPage: state => state.customers.last_page,
        getCustomerPerPage: state => state.customers.per_page,
        getTotalCustomer: state => state.customers.total,
        getCustomerPreviousPageUrl: state => state.customers.prev_page_url,
        getCustomerNextPageUrl: state => state.customers.next_page_url,
    },
    mutations: {
        /* Set All Admin Data */
        setAdmins: (state, data) => state.admins = data,

        /* Set All Customer Data */
        setCustomers: (state, data) => state.customers = data,

        /* Set All User Data , Customer, Admin, MyProfileData */
        removeUser: (state, removeId) => {
            state.customers.data = state.customers.data.filter(customer => {
                return customer.id !== removeId;
            });
        },

        /* Update Or Change My Profile Data */
        updateUserData: (state, updateUserData) => {
            state.myProfileData = updateUserData;
        },

        /* Add New Updated User Data To All User Data After Change Role*/
        addChangedRole: (state, updatedUser) => {
            if (updatedUser.role === "admin") {
                state.admins.unshift(updatedUser);
                state.customers.data = state.customers.data.filter(user => {
                    return user.id !== updatedUser.id;
                })
            } else {
                state.customers.data.unshift(updatedUser);
                state.admins = state.admins.filter(user => {
                    return user.id !== updatedUser.id;
                })
            }
        },

        /*  Set Start Point And End Point To Slice Admin Data For Pagination */
        setAdminPaginationPoints: (state, points) => {
            state.adminPaginationPoints.start = points.start;
            state.adminPaginationPoints.end = points.end;
        },

        /* Set My Profile Data */
        setMyProfile: (state, data) => state.myData = data,

    },

    actions: {
        /* Get All User Data */
        allAdmins: async({ commit }) => {
            let { data } = await axios.get("https://nooneuse.shop/api/admin/user/getAllAdmins");
            commit("setAdmins", data);
        },

        /* Get Paginated Customer Data */
        allCustomers: async({commit}, url) => {
            let URL = url? url : "https://nooneuse.shop/api/admin/user/getAllCustomers";
            let { data } = await axios.get(URL);
            commit("setCustomers", data);
        },

        /* Delete Customer Account */
        deleteUser: async({ commit }, removeId) => {
            await axios.delete(`https://nooneuse.shop/api/admin/user/deleteUser/${removeId}`);
            commit("removeUser", removeId);
        },

        /* Update My Account Data */
        updateUser: async({ commit }, updateUserData) => {
            let { data } = await axios.post(`https://nooneuse.shop/api/admin/user/updateUser/${updateUserData.id}`, updateUserData);
            commit("updateUserData", data);
        },

        /* Change User Account Role Admin to User Or User To Admin As An Admin */
        changeUserRole: async({ commit }, newRoleData) => {
            let { data } = await axios.post('https://nooneuse.shop/api/admin/user/changeRole', newRoleData);
            commit("addChangedRole", data);
        },

        /* Search Users */
        searchUser: async({ commit }, searchKey) => {
            const { data } = await axios.get(`https://nooneuse.shop/api/admin/user/getAllCustomers/${searchKey}`);
            data.data = await data.data.filter(customer => customer.role === 'customer');
            commit("setCustomers", data);
        },

        /* Start Point And End Point To Slice Admin Data For Pagination */
        adminPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }

            commit("setAdminPaginationPoints", points);
        },

        /* Get My Profile Data */
        myProfile: async({commit}) => {
            let { data } = await axios.get('https://nooneuse.shop/api/admin/user/getMyProfile/'+localStorage.getItem('ID'));
            commit('setMyProfile', data);
        },

    }
}