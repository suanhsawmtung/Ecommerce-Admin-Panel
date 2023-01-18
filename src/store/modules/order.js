export default {
    state: {
        orders: [
            { orderCode: 'AAA77881', product_id: 1, count: 3, category_id: 1, customer_id: 'John', total: 32000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'AAA77881', product_id: 2, count: 2, category_id: 2, customer_id: 'John', total: 12000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', product_id: 3, count: 1, category_id: 3, customer_id: 'James', total: 10000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', product_id: 4, count: 2, category_id: 4, customer_id: 'James', total: 20000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', product_id: 5, count: 3, category_id: 5, customer_id: 'Augustine', total: 32000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', product_id: 6, count: 4, category_id: 6, customer_id: 'Augustine', total: 22000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', product_id: 7, count: 5, category_id: 7, customer_id: 'David', total: 123000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', product_id: 8, count: 6, category_id: 8, customer_id: 'David', total: 55000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', product_id: 9, count: 7, category_id: 9, customer_id: 'Micheal', total: 100000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', product_id: 10, count: 8, category_id: 10, customer_id: 'Micheal', total: 34000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', product_id: 11, count: 9, category_id: 11, customer_id: 'Aung Aung', total: 55000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', product_id: 12, count: 10, category_id: 12, customer_id: 'Aung Aung', total: 780000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
        ],
        orderData: [
            { orderCode: 'AAA77881', product_id: 1, count: 3, category_id: 1, customer_id: 'John', total: 43000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', product_id: 3, count: 1, category_id: 3, customer_id: 'James', total: 30000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', product_id: 5, count: 3, category_id: 5, customer_id: 'Augustine', total: 54000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', product_id: 7, count: 5, category_id: 7, customer_id: 'David', total: 178000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', product_id: 9, count: 7, category_id: 9, customer_id: 'Micheal', total: 134000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', product_id: 11, count: 9, category_id: 11, customer_id: 'Aung Aung', total: 8250000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
        ],
        orderDataClone: [
            { orderCode: 'AAA77881', product_id: 1, count: 3, category_id: 1, customer_id: 'John', total: 43000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', product_id: 3, count: 1, category_id: 3, customer_id: 'James', total: 30000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', product_id: 5, count: 3, category_id: 5, customer_id: 'Augustine', total: 54000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', product_id: 7, count: 5, category_id: 7, customer_id: 'David', total: 178000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', product_id: 9, count: 7, category_id: 9, customer_id: 'Micheal', total: 134000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', product_id: 11, count: 9, category_id: 11, customer_id: 'Aung Aung', total: 8250000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
        ],
        orderPaginationPoints: {
            start: 0,
            end: 5,
        },
    },
    getters: {
        getOrders: state => state.orderDataClone,
        paginatedOrders: state => state.orderDataClone.slice(state.orderPaginationPoints.start, state.orderPaginationPoints.end),
        getOrderCurrentPage: state => {
            return state.orderPaginationPoints.end / (state.orderPaginationPoints.end - state.orderPaginationPoints.start);
        },
    },
    mutations: {
        setOrderPaginationPoints: (state, points) => {
            state.orderPaginationPoints.start = points.start;
            state.orderPaginationPoints.end = points.end;
        },
        resetOrders: (state, status) => {
            if (status === "") {
                state.orderDataClone = state.orderData;
            } else {
                state.orderDataClone = state.orderData.filter(order => order.status === status);
            }
        }
    },
    actions: {
        orderPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setOrderPaginationPoints", points);
        },
        filterOrder: ({ commit }, status) => {
            commit("resetOrders", status);
        }
    }
}