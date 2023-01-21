export default {
    state: {
        /* All Orders , I used these static data for show because I haven't written order section and client side. */
        orderDetails: [
            { orderCode: 'AAA77881', productName: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", count: 3, categoryName: "women's clothing", customerName: 'John', customerEmail: 'John@gmail.com', customerPhone: '093344555', customerAddress: 'Mandalay', total: 220000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'AAA77881', productName: "Mens Cotton Jacket", count: 2, categoryName: "men's clothing", customerName: 'John', customerEmail: 'John@gmail.com', customerPhone: '093344555', customerAddress: 'Mandalay', total: 62000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', productName: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", count: 1, categoryName: "electronics", customerName: 'James', customerEmail: 'James@gmail.com', customerPhone: '093344556', customerAddress: 'Yangon', total: 200000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', productName: "Mens Casual Slim Fit", count: 2, categoryName: "men's clothing", customerName: 'James', customerEmail: 'James@gmail.com', customerPhone: '093344556', customerAddress: 'Yangon', total: 20000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', productName: "Mens Casual Slim Fit", count: 3, categoryName: "men's clothing", customerName: 'Augustine', customerEmail: 'Augustine@gmail.com', customerPhone: '093344557', customerAddress: 'Hakha', total: 22000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', productName: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", count: 4, categoryName: "electronics", customerName: 'Augustine', customerEmail: 'Augustine@gmail.com', customerPhone: '093344557', customerAddress: 'Hakha', total: 80000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', productName: "Mens Cotton Jacket", count: 5, categoryName: "men's clothing", customerName: 'David', customerEmail: 'David@gmail.com', customerPhone: '093344558', customerAddress: 'Kalaw', total: 123000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', productName: "Rain Jacket Women Windbreaker Striped Climbing Raincoats", count: 6, categoryName: "women's clothing", customerName: 'David', customerEmail: 'David@gmail.com', customerPhone: '093344558', customerAddress: 'Kalaw', total: 35000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', productName: "Solid Gold Petite Micropave ", count: 7, categoryName: "jewelery", customerName: 'Micheal', customerEmail: 'Micheal@gmail.com', customerPhone: '093344559', customerAddress: 'Yangon', total: 200000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', productName: "Smart Watch", count: 8, categoryName: "watch and accessories", customerName: 'Micheal', customerEmail: 'Micheal@gmail.com', customerPhone: '093344559', customerAddress: 'Yangon', total: 54000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', productName: "Sun Cream", count: 9, categoryName: "beauty and health", customerName: 'Aung Aung', customerEmail: 'AungAung@gmail.com', customerPhone: '093344550', customerAddress: 'Yangon', total: 100000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', productName: "Solid Gold Petite Micropave", count: 10, categoryName: "jewelery", customerName: 'Aung Aung', customerEmail: 'AungAung@gmail.com', customerPhone: '093344550', customerAddress: 'Yangon', total: 80000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
        ],

        /* All Orders Summary , I used these static data for show because I haven't written order section and client side. */
        orders: [
            { orderCode: 'AAA77881', customerName: 'John', total: 43000, status: "pending", orderTime: "Dec 30, 2022 - 12:00 AM" },
            { orderCode: 'BBB77882', customerName: 'James', total: 30000, status: "pending", orderTime: "Nov 30, 2022 - 12:00 AM" },
            { orderCode: 'CCC77883', customerName: 'Augustine', total: 54000, status: "invoiced", orderTime: "Oct 30, 2022 - 12:00 AM" },
            { orderCode: 'DDD77884', customerName: 'David', total: 178000, status: "paid", orderTime: "Sep 30, 2022 - 12:00 AM" },
            { orderCode: 'FFF77885', customerName: 'Micheal', total: 134000, status: "delivered", orderTime: "Aug 30, 2022 - 12:00 AM" },
            { orderCode: 'EEW77886', customerName: 'Aung Aung', total: 8250000, status: "rejected", orderTime: "Jul 30, 2022 - 12:00 AM" },
        ],

        /* Start And End Point To Make Paginated Orders Data */
        orderPaginationPoints: {
            start: 0,
            end: 5,
        },

        /* Thes three status use for show or hide component and paginator to be responsive for every size of screen */
        infoStatus: true,

        listStatus: true,

        orderPaginatorStatus: false,

    },
    getters: {
        /* Get All Order Details Data */
        getOrderDetails: state => state.orderDetails,

        /* Get All Order Summary Data */
        getOrders: state => state.orders,

        /* Get Paginator Point For Orders Summary Data */
        getOrderPaginationPoints: state => state.orderPaginationPoints,

        /* Not to Change Current Order Paginated Data, When Change Other Route */
        getOrderCurrentPage: state => {
            return state.orderPaginationPoints.end / (state.orderPaginationPoints.end - state.orderPaginationPoints.start);
        },

        /* Start And End Point To Make Paginated Customer Data */
        getInfoStatus: state => state.infoStatus,

        getListStatus: state => state.listStatus,

        getOrderPaginatorStatus: state => state.orderPaginatorStatus,

    },
    mutations: {
        /* Set Start Point And End Point To Slice Order Summary Data For Pagination */
        setOrderPaginationPoints: (state, points) => {
            state.orderPaginationPoints.start = points.start;
            state.orderPaginationPoints.end = points.end;
        },

        /* Change Status To Show Or Hide Components By Using Paginator Button When Screen Size Is Small */
        showAndHideSection: (state, number) => {
            state.infoStatus = false;
            state.listStatus = false;
            if (number === 1) {
                state.infoStatus = true;
                state.listStatus = false;
            } else {
                state.infoStatus = false;
                state.listStatus = true;
            }
        },

        /* Change Status to Show Or Hide Components And Paginator When Screen Size Is Small */
        showAndHideSectionWithScreenWidth: (state, width) => {
            if (width > 730) {
                state.infoStatus = true;
                state.listStatus = true;
                state.orderPaginatorStatus = false;
            }
            if (width <= 730) {
                state.infoStatus = true;
                state.listStatus = false;
                state.orderPaginatorStatus = true;
            }
        },

        /* Add Changed New Status To Old Order Data Status */
        changeStatus: (state, newStatusData) => {
            state.orders.forEach(order => {
                if (order.orderCode === newStatusData.orderCode) {
                    order.status = newStatusData.newStatus;
                }
            })

            state.orderDetails.forEach(order => {
                if (order.orderCode === newStatusData.orderCode) {
                    order.status = newStatusData.newStatus;
                }
            })
        }

    },
    actions: {
        /* Start Point And End Point To Slice Order Data For Pagination */
        orderPaginator: ({ commit }, page) => {
            let start = (page.currentPage - 1) * page.perPage;
            let end = start + page.perPage;
            let points = {
                start: start,
                end: end
            }
            commit("setOrderPaginationPoints", points);
        },

        /* Show Or Hide Components By Using Paginator Button When Screen Size Is Small */
        changeSectionOfOrderList: ({ commit }, number) => {
            commit("showAndHideSection", number);
        },

        /* Show Or Hide Components And Paginator When Screen Size Is Small */
        changeWithScreenWidth: ({ commit }) => {
            commit("showAndHideSectionWithScreenWidth", window.innerWidth);
        },

        /* Change Order Status */
        changeNewOrderStatus: ({ commit }, newStatusData) => {
            commit("changeStatus", newStatusData);
        }

    }
}