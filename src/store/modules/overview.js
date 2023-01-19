import axios from "axios";
export default {
    state: {
        boxStatus: true,
        saleHistoryStatus: true,
        topCategoryStatus: true,
        topSaleItemStatus: true,
        overviewPaginatorStatus: true,
        currentOverviewPage: 1,
        dataForTopSaleItem: [],
    },
    getters: {
        boxStatus: state => state.boxStatus,
        saleHistory: state => state.saleHistoryStatus,
        topCategory: state => state.topCategoryStatus,
        topSaleItem: state => state.topSaleItemStatus,
        paginatorStatus: state => state.overviewPaginatorStatus,
        overviewCurrentPage: state => state.currentOverviewPage,
        getDataForTopSaleItem: state => state.dataForTopSaleItem,
    },
    mutations: {
        changeOverviewStatus: (state, number) => {
            state.boxStatus = false;
            state.saleHistoryStatus = false;
            state.topCategoryStatus = false;
            state.topSaleItemStatus = false;
            state.currentOverviewPage = number;

            if (number === 1) {
                state.boxStatus = true;
                return;
            }
            if (number === 2) {
                state.topSaleItemStatus = true;
                return;
            }
            if (number === 3) {
                state.topCategoryStatus = true;
                return;
            }
            if (number === 4) {
                state.saleHistoryStatus = true;
                return;
            }
        },
        setPaginatorStatus: (state, changeStatus) => {
            state.overviewPaginatorStatus = changeStatus;
        },
        resetOveviewBoxes: (state, width) => {
            if (width > 1330) {
                state.boxStatus = true;
                state.saleHistoryStatus = true;
                state.topCategoryStatus = true;
                state.topSaleItemStatus = true;
            }
            if (width < 1330) {
                state.boxStatus = true;
                state.saleHistoryStatus = false;
                state.topCategoryStatus = true;
                state.topSaleItemStatus = true;
            }
            if (width < 820) {
                state.boxStatus = false;
                state.saleHistoryStatus = true;
                state.topCategoryStatus = false;
                state.topSaleItemStatus = false;
            }
            if (width < 515) {
                state.boxStatus = true;
                state.saleHistoryStatus = true;
                state.topCategoryStatus = false;
                state.topSaleItemStatus = false;
            }
            if (width < 475) {
                state.boxStatus = true;
                state.saleHistoryStatus = false;
                state.topCategoryStatus = false;
                state.topSaleItemStatus = false;
            }
        },
        setOverviewData: (state, data) => {
            state.dataForTopSaleItem = data;
        }
    },
    actions: {
        overviewStatus: ({ commit }, number) => {
            commit("changeOverviewStatus", number);
        },
        showPaginator: ({ commit }) => {
            let changeStatus;
            if (window.innerWidth < 1330) {
                changeStatus = true;
            } else {
                changeStatus = false;
            }
            commit("setPaginatorStatus", changeStatus);
        },
        resetBoxes: ({ commit }) => {
            commit("resetOveviewBoxes", window.innerWidth);
        },
        overviewData: async({ commit }) => {
            let { data } = await axios.get("https://fakestoreapi.com/products");
            commit("setOverviewData", data);
        }
    }
}