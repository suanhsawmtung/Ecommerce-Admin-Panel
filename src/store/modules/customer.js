import axios from "axios";

export default {
    state: {
        customers: [],
        customerPaginationPoints: {
            start: 0,
            end: 5
        }
    },
    getters: {
        getCustomers: state => state.customers,
        getAdmins: state => state.customers.filter(user => {
            return user.age < 22;
        }),
        getMyProfileData: state => state.customers.filter(user => {
            return user.password === "GyLnCB8gNIp";
        }),
        paginatedCustomers: state => state.customers.slice(state.customerPaginationPoints.start, state.customerPaginationPoints.end),
        getCustomerCurrentPage: state => {
            return state.customerPaginationPoints.end / (state.customerPaginationPoints.end - state.customerPaginationPoints.start);
        }
    },
    mutations: {
        setCustomers: (state, data) => state.customers = data,
        setCustomerPaginationPoints: (state, points) => {
            state.customerPaginationPoints.start = points.start;
            state.customerPaginationPoints.end = points.end;
        }
    },
    actions: {
        allCustomers: async({ commit }) => {
            let { data: { users } } = await axios.get("https://dummyjson.com/users");
            commit("setCustomers", users);
        },
        customerPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }

            commit("setCustomerPaginationPoints", points);
        }
    }
}