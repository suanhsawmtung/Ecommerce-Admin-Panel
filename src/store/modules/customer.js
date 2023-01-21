import axios from "axios";

export default {
    state: {
        allUsers: [],

        customers: [],

        admins: [],

        myProfileData: [],
        /* Start And End Point To Make Paginated Customer Data */
        customerPaginationPoints: {
            start: 0,
            end: 4
        },

        /* Start And End Point To Make Paginated Admin Data */
        adminPaginationPoints: {
            start: 0,
            end: 4
        }
    },
    getters: {
        /* Get All Users Data */
        getAllUsers: state => state.allUsers,

        /* Get All Customers */
        getCustomers: state => state.customers,

        /* Get All Admin */
        getAdmins: state => state.admins,

        /* Get My Account Profile Data */
        getMyProfileData: state => state.myProfileData[0],

        /* Paginated Customers Data */
        paginatedCustomers: state => state.customers.slice(state.customerPaginationPoints.start, state.customerPaginationPoints.end),

        /* Paginated Admins Data */
        paginatedAdmins: state => state.admins.slice(state.adminPaginationPoints.start, state.adminPaginationPoints.end),

        /* Not to Change Current Customer Paginated Data, When Change Other Route */
        getCustomerCurrentPage: state => {
            return state.customerPaginationPoints.end / (state.customerPaginationPoints.end - state.customerPaginationPoints.start);
        },

        /* Not to Change Current Admin Paginated Data, When Change Other Route */
        getAdminCurrentPage: state => {
            return state.adminPaginationPoints.end / (state.adminPaginationPoints.end - state.adminPaginationPoints.start);
        }
    },
    mutations: {
        /* Set All User Data , Customer, Admin, MyProfileData */
        setCustomers: (state, data) => {
            state.allUsers = data;
            data.forEach(user => {
                if (user.role === "customer") {
                    state.customers.unshift(user);
                }
            });
            data.forEach(user => {
                if (user.role === "admin") {
                    state.admins.unshift(user);
                }
            });
            state.myProfileData = data.filter(user => {
                return user.email === localStorage.getItem("EMAIL");
            });
        },

        /* Set All User Data , Customer, Admin, MyProfileData */
        removeUser: (state, removeId) => {
            state.customers = state.customers.filter(customer => {
                return customer.id !== removeId;
            });
        },

        /* Update Or Change My Profile Data */
        updateUserData: (state, updateUserData) => {
            state.allUsers.forEach(user => {
                if (user.id === updateUserData.id) {
                    user = updateUserData;
                }
            });
            state.admins.forEach(admin => {
                if (admin.id === updateUserData.id) {
                    admin = updateUserData;
                }
            });
            state.myProfileData = [updateUserData];
        },

        /* Add New Updated User Data To All User Data After Change Role*/
        addChangedRole: (state, updatedUser) => {
            if (updatedUser.role === "admin") {
                state.admins.unshift(updatedUser);
                state.customers = state.customers.filter(user => {
                    return user.id !== updatedUser.id;
                })
            } else {
                state.customers.unshift(updatedUser);
                state.admins = state.admins.filter(user => {
                    return user.id !== updatedUser.id;
                })
            }
        },

        /*  Set Start Point And End Point To Slice Customer Data For Pagination */
        setCustomerPaginationPoints: (state, points) => {
            state.customerPaginationPoints.start = points.start;
            state.customerPaginationPoints.end = points.end;
        },

        /*  Set Start Point And End Point To Slice Admin Data For Pagination */
        setAdminPaginationPoints: (state, points) => {
            state.adminPaginationPoints.start = points.start;
            state.adminPaginationPoints.end = points.end;
        },

    },

    actions: {
        /* Get All Customers Data */
        allCustomers: async({ commit }) => {
            let { data } = await axios.get("http://localhost:8000/api/user/getAllUsers");
            commit("setCustomers", data);
        },

        /* Delete Customer Account */
        deleteUser: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/user/deleteUser/${removeId}`);
            commit("removeUser", removeId);
        },

        /* Update My Account Data */
        updateUser: async({ commit }, updateUserData) => {
            let { data } = await axios.post(`http://localhost:8000/api/user/updateUser/${updateUserData.id}`, updateUserData);
            commit("updateUserData", data);
        },

        /* Change User Account Role Admin to User Or User To Admin As An Admin */
        changeUserRole: async({ commit }, newRoleData) => {
            let { data } = await axios.post(`http://localhost:8000/api/user/changeRole/${newRoleData.id}`, newRoleData);
            commit("addChangedRole", data);
        },

        /* Start Point And End Point To Slice Customer Data For Pagination */
        customerPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }

            commit("setCustomerPaginationPoints", points);
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
        }

    }
}