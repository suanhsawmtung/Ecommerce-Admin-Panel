import axios from "axios";

export default {
    state: {
        customers: [],
        admins: [],
        myProfileData: [],
        customerPaginationPoints: {
            start: 0,
            end: 5
        }
    },
    getters: {
        getCustomers: state => state.customers.reverse(),
        getAdmins: state => state.admins.reverse(),
        getMyProfileData: state => state.myProfileData,
        paginatedCustomers: state => state.customers.slice(state.customerPaginationPoints.start, state.customerPaginationPoints.end),
        getCustomerCurrentPage: state => {
            return state.customerPaginationPoints.end / (state.customerPaginationPoints.end - state.customerPaginationPoints.start);
        }
    },
    mutations: {
        setCustomers: (state, data) => {
            // for (let i = 0; i < data.lenght; i++) {
            //     data[i].image = 'http://localhost:8000/storage/' + data[i].image;
            // }
            state.customers = data.filter(user => {
                return user.role === "customer";
            });
            state.admins = data.filter(user => {
                return user.role === "admin";
            });
            state.myProfileData = data.filter(user => {
                return user.id === 1;
            });
        },
        removeUser: (state, removeId) => {
            state.customers = state.customers.filter(customer => {
                return customer.id !== removeId;
            });
        },
        setCustomerPaginationPoints: (state, points) => {
            state.customerPaginationPoints.start = points.start;
            state.customerPaginationPoints.end = points.end;
        },
        updateUserData: (state, updateUserData) => {
            state.customers.forEach(user => {
                if (user.id === updateUserData.id) {
                    user = updateUserData;
                }
            });
        },
        addChangedRole: (state, updatedUser) => {
            if (updatedUser.role === "admin") {
                state.admins.push(updatedUser);
                state.customers = state.customers.filter(user => {
                    return user.id !== updatedUser.id;
                })
            } else {
                state.customers.push(updatedUser);
                state.admins = state.admins.filter(user => {
                    return user.id !== updatedUser.id;
                })
            }
        }
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
    }
}