<template>
    <div>
        <div class="orderParent">
            <div class="customerData" v-show="getInfoStatus">
                <header>
                    <h1>{{ orders[0].orderCode }}</h1>
                    <select class="inputField"  @change="changeOrderStatus(orders[0].orderCode,newOrderStatus)" v-model="newOrderStatus">
                        <option class="opt" value="pending" >Pending</option>
                        <option class="opt" value="invoiced"  >Invoiced</option>
                        <option class="opt" value="paid" >Paid</option>
                        <option class="opt" value="delivered" >Delivered</option>
                        <option class="opt" value="rejected"  >Rejected</option>
                    </select>
                </header>
                <ul>
                    <li>Customer - {{ orders[0].customerName }}</li>
                    <li>Email - {{ orders[0].customerEmail }}</li>
                    <li>Phone - {{ orders[0].customerPhone }}</li>
                    <li>Address - {{ orders[0].customerAddress }}</li>
                    <li>Order Date - {{ orders[0].orderTime }}</li>
                    <li>Delivery Fee - {{ delivery }}Ks</li>
                    <li>Subtotal - {{ totalPrice+delivery }} Ks</li>
                </ul>
            </div>
            <div class="orderList" v-show="getListStatus">
                <table>
                    <tr style="background-color: teal;">
                        <th class="product" style="color: #fff;">Product</th>
                        <th class="count" style="color: #fff;">Count</th>
                        <th class="total" style="color: #fff;">Total</th>
                    </tr>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td class="product" >{{ order.productName }}</td>
                        <td class="count" >{{ order.count }}</td>
                        <td class="total" >{{ order.total }}  Ks</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="footer">
            <button @click="$emit('backToOrderPage')"><i class="fa-solid fa-arrow-left-long"></i></button>
            <Paginator v-show="getOrderPaginatorStatus"></Paginator>
        </div>
    </div>
</template>

<script>
    import Paginator from "../data-paginators/OrderListPaginator.vue";
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "OrderList",
        data () {
            return {
                delivery: 2000,
                newOrderStatus: ""
            }
        },
        props: ["orders", "totalPrice"],
        components: { Paginator },
        computed: {
            ...mapGetters(["getInfoStatus", "getListStatus", "getOrderPaginatorStatus"]),
        },
        methods: {
            ...mapActions(["changeWithScreenWidth"]),
            changeOrderStatus(code, status){
                this.$emit("showModal", code, status);
            }
        },
        mounted () {
            this.changeWithScreenWidth();
            window.addEventListener("resize", this.changeWithScreenWidth);
        },
        updated () {
            this.newOrderStatus = this.orders[0].status
        }
    }
</script>

<style scoped>
    .orderParent{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    /* product detail data */
    .customerData{
        height: 100%;
    }
    ul, header{
        margin: 10px auto;
        padding: 0;
        max-width: 600px;
    }
    ul{
        height: 50%;
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ul li{
        list-style-type: none;
        background: #b3e0dc;
        padding: 16px;
        margin: 16px 0;
        border-radius: 4px;
    }
    ul li h3{
        margin: 0 0 10px; 
        text-transform: capitalize;
    }
    header h1{
        text-transform : uppercase;
        color: teal;
    }
    ul li .btn-box button{
        margin: 0 10px 0 0;
        padding: 8px;
        border: none;
        border-radius: 2px;
        background: #4fb9af;
        transition: 0.2s;
    }
    ul li .btn-box button:active{
        transform: scale(0.9);
    }
    header .inputField{
        padding: 5px 8px;
        color: teal;
        font-size: 0.8rem;
        border-radius: 5px;
        border: 2px solid teal;
    }
    header .inputField .opt{
        color: teal;
        font-size: 0.8rem;
    }

    /* product detail data */


    /* product mini table */
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

    .product{
        width: 50%;
        text-align: center;
    }
    .count{
        width: 20%;
        text-align: end;
    }
    .total{
        width: 30%;
        text-align: center;
    }
    .footer{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 40px;
        right: 30px;
    }
    .footer button{
        width: 30px;
        height: 30px;
        padding: 5px;
        border: 1px solid #4fb9af;
        color: teal;
        background: #fff;
        margin: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .footer button:hover{
        background: #b3e0dc;
    }
    /* product mini table */

     /* make it response */
     @media (max-width: 750px) {
        ul, header{
            max-width: 450px;
        }
    }
    @media (max-width: 730px) {
        .orderParent{
            text-align: center;
            grid-template-columns: 1fr ;
        }
    }

    @media (max-width: 600px) {
        ul, header{
            max-width: 400px;
        }
        header h1{
            font-size: 1.5rem;
        }
    }
    @media (max-width: 510px) {
        ul, header{
            max-width: 300px;
        }
    }
</style>
