<template>
    <div class="branchTable">
        <table>
            <tr style="background-color: teal;">
                <th class="name" style="color: #fff;">Name</th>
                <th class="email" style="color: #fff;">Email</th>
                <th class="phone" style="color: #fff;">Phone</th>
                <th class="date" style="color: #fff;">Joined Date</th>
                <th class="control btns" style="color: #fff;"></th>
            </tr>
            <tr v-for="(admin, index) in paginatedAdmins" :key="index">
                <td class="name" >{{ admin.name }}</td>
                <td class="email" >{{ admin.email }}</td>
                <td class="phone" >{{ admin.phone }}</td>
                <td class="date" >-</td>
                <td class="control btns" >
                    <button @click="$emit('showModal', 'role', admin.id)" title="Remove from admin List"><i class="fa-solid fa-minus"></i></button>
                    <button @click="$emit('showModal', 'detail', admin.id)" title="details"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
        </table>
        <div class="paginator">
            <Paginator v-show="getAdmins.length>perPage" @adminPageChanged="onAdminPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getAdmins.length/4) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import Paginator from "../data-paginators/AdminPaginator.vue";
    import { mapGetters } from "vuex";
    export default {
        name: "AdminTable",
        data () {
            return {
                currentPage: 1,
                perPage: 4,
                maxVisibleButton: 4,
            }
        },
        components: { Paginator },
        computed: {
            ...mapGetters([ "getAdmins", "paginatedAdmins", "getAdminCurrentPage" ]),
        },
        methods: {
            onAdminPageChange(currentPage){
                this.currentPage = currentPage;
                let page = {
                    currentPage: this.currentPage,
                    perPage: this.perPage
                }

                this.$store.dispatch("adminPaginator", page)
            }
        },
        mounted () {
            this.currentPage = this.getAdminCurrentPage;
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
        /* background: red; */
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
        .date{
            display: none;
        }
    }
    @media (max-width: 480px) {
        .phone{
            display: none;
        }
    }
 </style>
 