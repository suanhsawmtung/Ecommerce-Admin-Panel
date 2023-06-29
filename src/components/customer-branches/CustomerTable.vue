<template>
    <div class="branchTable">

        <table v-if="getCustomers && getCustomers.length!==0">
            <tr style="background-color: teal;">
                <th class="name" style="color: #fff;">Name</th>
                <th class="email" style="color: #fff;">Email</th>
                <th class="phone" style="color: #fff;">Phone</th>
                <th class="date" style="color: #fff;">Joined Date</th>
                <th class="control btns" style="color: #fff;"></th>
            </tr>
            <tr v-for="(customer,index) in getCustomers" :key="index">
                <td class="name" >{{ customer.name }}</td>
                <td class="email" >{{ customer.email }}</td>
                <td class="phone" >{{ customer.phone }}</td>
                <td class="date" >-</td>
                <td class="control btns" >
                    <button @click="$emit('showModal', 'role', customer.id)" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="$emit('showModal', 'detail', customer.id)" title="details"><i class="fa-solid fa-info"></i></button>
                    <button @click="$emit('showModal', 'delete', customer.id)" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        </table>
        <div class="noData" v-else-if="getCustomers && getCustomers.length===0">
            <h1>There is no customer here.</h1>
        </div>
        <div class="noData" v-else>
            <h1>Loading</h1>
        </div>
        <div class="paginator">
            <Paginator :maxVisibleButton="maxVisibleButton" ></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import Paginator from "../data-paginators/CustomerPaginator.vue";
    import { mapGetters } from "vuex";
    export default {
        name: "CustomerTable",
        data () {
            return {
                maxVisibleButton: 3,
            }
        },
        components: { Paginator },
        computed: {
            ...mapGetters([ "getCustomers" ]),
        },
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

    .name{
        width: 20%;
        text-align: center;
    }
    .email{
        width: 20%;
        text-align: center;
    }
    .phone{
        width: 20%;
        text-align: center;
    }
    .date{
        width: 20%;
        text-align: center;
    }

    .control{
        width: 20%;
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
    .noData{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .noData h1{
        color: teal;
    }

    /* make it responsive */
    @media (max-width: 991px) {
        .date, .email{
            display: none;
        }
    }
    @media (max-width: 485px) {
        .noData h1{
            font-size: 1.5rem;
        }
    }
 </style>
 