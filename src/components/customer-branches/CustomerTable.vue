<template>
    <div class="branchTable">

        <table>
            <tr style="background-color: teal;">
                <th class="photo" style="color: #fff;">Photo</th>
                <th class="name" style="color: #fff;">Name</th>
                <th class="email" style="color: #fff;">Email</th>
                <th class="address" style="color: #fff;">Address</th>
                <th class="date" style="color: #fff;">Joined Date</th>
                <th class="control btns" style="color: #fff;"></th>
            </tr>
            <tr v-for="(customer,index) in paginatedCustomers" :key="index">
                <td class="photo" >
                    <img :src="customer.image" alt="">
                </td>
                <td class="name" >{{ customer.name }}</td>
                <td class="email" >{{ customer.email }}</td>
                <td class="phone" >{{ customer.phone }}</td>
                <td class="date" >{{ customer.createdAt }}</td>
                <td class="control btns" >
                    <button @click="showModalOne(customer.id)" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="$emit('detail', 'customer', customer.id)" title="details"><i class="fa-solid fa-info"></i></button>
                    <button @click="showModalTwo(customer.id)" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        </table>
        <div class="paginator">
            <Paginator v-show="getCustomers.length>perPage" @customerPageChanged="onCustomerPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getCustomers.length/4) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import Paginator from "../data-paginators/CustomerPaginator.vue";
    import { mapGetters } from "vuex";
    export default {
        name: "ProductTable",
        data () {
            return {
                currentPage: 1,
                perPage: 4,
                maxVisibleButton: 4,
            }
        },
        components: { Paginator },
        computed: {
            ...mapGetters([ "getCustomers", "paginatedCustomers", "getCustomerCurrentPage" ]),
        },
        methods: {
            showModalOne (id) {
               this.$emit("showModal", "addAdmin", id); 
            },
            showModalTwo(id){
                this.$emit("showModal", "deleteAcc", id)
            },
            onCustomerPageChange(currentPage){
                this.currentPage = currentPage;
                let page = {
                    currentPage: this.currentPage,
                    perPage: this.perPage
                }

                this.$store.dispatch("customerPaginator", page)
            }
        },
        mounted () {
            this.currentPage = this.getCustomerCurrentPage;
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
        bottom: 20px;
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
    .photo{
        width: 10%;
        object-fit: contain;
        text-align: center;
    }
    .photo img{
        width: 50%;
    }

    .name{
        width: 20%;
    }
    .email{
        width: 20%;
    }
    .phone{
        width: 20%;
    }
    .date{
        width: 15%;
    }

    .control{
        width: 15%;
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
    .updated{
        width: 15%;
    }

    /* make it responsive */
    @media (max-width: 991px) {
        .date, .email{
            display: none;
        }
    }
 </style>
 