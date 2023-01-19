import axios from "axios";

export default {
    state: {
        allUsers: [],
        customers: [],
        admins: [],
        myProfileData: [],
        customerPaginationPoints: {
            start: 0,
            end: 4
        },
        adminPaginationPoints: {
            start: 0,
            end: 4
        }
    },
    getters: {
        getAllUsers: state => state.allUsers,
        getCustomers: state => state.customers,
        getAdmins: state => state.admins,
        getMyProfileData: state => state.myProfileData[0],
        paginatedCustomers: state => state.customers.slice(state.customerPaginationPoints.start, state.customerPaginationPoints.end),
        paginatedAdmins: state => state.admins.slice(state.adminPaginationPoints.start, state.adminPaginationPoints.end),
        getCustomerCurrentPage: state => {
            return state.customerPaginationPoints.end / (state.customerPaginationPoints.end - state.customerPaginationPoints.start);
        },
        getAdminCurrentPage: state => {
            return state.adminPaginationPoints.end / (state.adminPaginationPoints.end - state.adminPaginationPoints.start);
        }
    },
    mutations: {
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
        removeUser: (state, removeId) => {
            state.customers = state.customers.filter(customer => {
                return customer.id !== removeId;
            });
        },
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
        setCustomerPaginationPoints: (state, points) => {
            state.customerPaginationPoints.start = points.start;
            state.customerPaginationPoints.end = points.end;
        },
        setAdminPaginationPoints: (state, points) => {
            state.adminPaginationPoints.start = points.start;
            state.adminPaginationPoints.end = points.end;
        },
    },

    actions: {
        allCustomers: async({ commit }) => {
            let { data } = await axios.get("http://localhost:8000/api/user/getAllUsers");
            commit("setCustomers", data);
        },
        deleteUser: async({ commit }, removeId) => {
            await axios.delete(`http://localhost:8000/api/user/deleteUser/${removeId}`);
            commit("removeUser", removeId);
        },
        updateUser: async({ commit }, updateUserData) => {
            let { data } = await axios.post(`http://localhost:8000/api/user/updateUser/${updateUserData.id}`, updateUserData);
            commit("updateUserData", data);
        },
        changeUserRole: async({ commit }, newRoleData) => {
            let { data } = await axios.post(`http://localhost:8000/api/user/changeRole/${newRoleData.id}`, newRoleData);
            commit("addChangedRole", data);
        },
        customerPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }

            commit("setCustomerPaginationPoints", points);
        },
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