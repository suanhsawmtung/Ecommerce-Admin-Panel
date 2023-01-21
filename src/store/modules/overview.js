import axios from "axios";
export default {
    state: {
        /* All Status Use To Show Or Hide Boxes  */
        boxStatus: true,
        saleHistoryStatus: true,
        topCategoryStatus: true,
        topSaleItemStatus: true,
        overviewPaginatorStatus: true,

        /* Top Sale Items Data */
        dataForTopSaleItem: [],
    },
    getters: {
        /* Get All Status To Show Or Hide Boxes When Screen Size is Small */
        boxStatus: state => state.boxStatus,
        saleHistory: state => state.saleHistoryStatus,
        topCategory: state => state.topCategoryStatus,
        topSaleItem: state => state.topSaleItemStatus,
        paginatorStatus: state => state.overviewPaginatorStatus,

        /* Get Top Sale Items Data */
        getDataForTopSaleItem: state => state.dataForTopSaleItem,
    },
    mutations: {
        /* Show Or Hide Components By Using Paginator Button When Screen Size Is Small */
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
        /* Change Paginator Status To Show Or Hide */
        setPaginatorStatus: (state, changeStatus) => {
            state.overviewPaginatorStatus = changeStatus;
        },
        /* Reset Status To Go Back To Original Situation Of Overview Boxes */
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
        /* Set Top Sale Items */
        setOverviewData: (state, data) => {
            state.dataForTopSaleItem = data;
        }
    },
    actions: {
        /* Paginator Button Action To Show Or Hide Components When Screen Size Is Small */
        overviewStatus: ({ commit }, number) => {
            commit("changeOverviewStatus", number);
        },
        /* Auto Show Or Hide Paginator According to Screen Size */
        showPaginator: ({ commit }) => {
            let changeStatus;
            if (window.innerWidth < 1330) {
                changeStatus = true;
            } else {
                changeStatus = false;
            }
            commit("setPaginatorStatus", changeStatus);
        },
        /* Go Back To Original Situation Of Overview Boxes */
        resetBoxes: ({ commit }) => {
            commit("resetOveviewBoxes", window.innerWidth);
        },
        /* Get Data From Fake Store Api To Show Top Sale Items */
        overviewData: async({ commit }) => {
            let { data } = await axios.get("https://fakestoreapi.com/products");
            commit("setOverviewData", data);
        }
    }
}