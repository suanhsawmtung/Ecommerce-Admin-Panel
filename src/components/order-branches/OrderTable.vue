<template>
    <div class="branchTable">
        <table>
            <tr style="background-color: teal;">
                <th class="code" style="color: #fff;">Code</th>
                <th class="status" style="color: #fff;">Status</th>
                <th class="customer" style="color: #fff;">Customer</th>
                <th class="total" style="color: #fff;">Total</th>
                <th class="date" style="color: #fff;">Ordered Date</th>
                <th class="control btns" style="color: #fff;"></th>
            </tr>
            <tr v-for="(order, index) in paginatedOrders" :key="index">
                <td class="code" >{{ order.orderCode }}</td>
                <td class="status" >{{ order.status }}</td>
                <td class="customer" >{{ order.customerName }}</td>
                <td class="total" >{{ order.total }} Ks</td>
                <td class="date" >{{ order.orderTime }}</td>
                <td class="control btns" >
                    <button @click="$emit('detail', order.orderCode)" title="info"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
        </table>
        <div class="paginator">
            <Paginator v-show="getOrders.length>perPage" @orderPageChanged="onOrderPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getOrders.length/5) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import Paginator from "../data-paginators/OrderPaginator.vue";
    import { mapGetters } from "vuex";
    export default {
        name: "OrderTable",
        data () {
            return {
                currentPage: 1,
                perPage: 5,
                maxVisibleButton: 4,
                allOrderData: []
            }
        },
        props: ["orderStatus"],
        components: { Paginator },
        computed: {
            ...mapGetters([ "getOrders", "getOrderCurrentPage", "getOrderPaginationPoints" ]),
            paginatedOrders(){
                return this.allOrderData.slice(this.getOrderPaginationPoints.start, this.getOrderPaginationPoints.end);
            },
            filterOrders(){
                if (this.orderStatus === "") {
                    return this.getOrders;
                } else {
                    return this.getOrders.filter(order => order.status === this.orderStatus);
                }
            }
        },
        methods: {
            onOrderPageChange(currentPage){
                this.currentPage = currentPage;
                let page = {
                    currentPage: this.currentPage,
                    perPage: this.perPage
                }

                this.$store.dispatch("orderPaginator", page)
            },
        },
        mounted () {
            this.currentPage = this.getOrderCurrentPage;
            this.allOrderData = this.filterOrders;
        },
        updated () {
            this.allOrderData = this.filterOrders;
        }
    }
 </script>
 
 <style scoped>
    .branchTable{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .branchTable .paginator{
        width: 100%;
        position: absolute;
        bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    table{
        width : 100%;
        border-collapse: collapse;
    }
    table tr{
        width: 100%;
    }
    table tr:nth-child(odd):not(:first-child){
        background: #b3e0dc;
    }
    table tr:not(:first-child):hover{
        background: #4fb9af;
    }
    table tr th{
        padding: 14px 7px;
    }
    table tr td {
        padding: 10px 7px;
    }

    .code{
        width: 20%;
        text-align: center;
    }
    .status{
        width: 10%;
        text-align: end;
    }
    .customer{
        width: 20%;
        text-align: end;
    }
    .total{
        width: 20%;
        text-align: end;
    }
    .date{
        width: 20%;
        text-align: center;
    }

    .control{
        width: 10%;
        text-align: center;
    }
    .control button{
        width: 22px;
        height: 22px;
        line-height: 22px;
        border-radius: 50%;
        margin-right: 6px;
        border: 1px solid #4fb9af;
        background: #fff;
        color: teal;
        transition: 0.5s;
    }
    .control button:hover{
        transform: scale(1.3);
    }

    /* make it responsive */
    @media (max-width: 786px) {
        .date, .customer{
            display: none;
        }
    }
    @media (max-width: 480px) {
        .total{
            display: none;
        }
    }
 </style>
 