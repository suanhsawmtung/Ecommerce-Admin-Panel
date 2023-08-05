<template>
    <div class="productTable">
        <div class="noData" v-if="!getProducts">
            <h1>Loading</h1>
        </div>
        <table v-if="getProducts && getProducts.length!==0">
            <thead>
                <tr style="background-color: teal;">
                    <th class="photo pt" style="color: #fff;">Photo</th>
                    <th class="name" style="color: #fff;">Name</th>
                    <th class="category" style="color: #fff;">Category</th>
                    <th class="price" style="color: #fff;">Price</th>
                    <th class="view" style="color: #fff;">Rate</th>
                    <th class="rate" style="color: #fff;">Count</th>
                    <th class="updated" style="color: #fff;">Latest_update</th>
                    <th class="control btns" style="color: #fff;"></th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(product,index) in getProducts" :key="index">
                    <td class="photo" ><img :src="product.image" alt=""></td>
                    <td class="name" >{{product.title}}</td>
                    <td class="category" >{{product.category_title}}</td>
                    <td class="price p" >{{product.price}} Ks</td>
                    <td class="view vc" >-</td>
                    <td class="count re" >{{product.count}}</td>
                    <td class="updated" >{{ product.createdAt }}</td>
                    <td class="control btns" >
                        <button @click="showProductUpdatePage(product.id)" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button @click="$emit('deleteProduct', product.id)" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                        <button @click="showProductDetailPage(product.id)" title="info"><i class="fa-solid fa-info"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="noData" v-else>
            <h1>There is no product here.</h1>
        </div>
        <div class="paginator">
            <Paginator :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import axios from "axios";
    import { mapGetters, mapActions } from "vuex";
    import Paginator from "../data-paginators/ProductPaginator.vue";
    export default {
        name: "ProductTable",
        data () {
            return {
                maxVisibleButton: 3,
            }
        },
        components: { Paginator },
        computed: {
            ...mapGetters("Products", ["getProducts", "paginatedProducts", "getProductCurrentPage", "getPerPage"]),
        },
        methods: {
            ...mapActions("Products", ["productPaginator"]),
            showProductDetailPage(id) {
               this.$emit("productDetail", id); 
            },
            async showProductUpdatePage(id){
                let { data } = await axios.get(`http://165.22.48.33/api/admin/product/getProductDataForUpdate/${id}`);
                this.$emit("productUpdate", data);
            }
        },
    }
 </script>
 
 <style scoped>
    .productTable{
        width: 100%;
        height: 90%;
        position: relative;
    }
    .productTable .paginator{
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
    table tbody tr:nth-child(even){
        background: #b3e0dc;
    }
    table tbody tr:hover{
        background: #4fb9af;
    }
    table thead tr th{
        padding: 14px 7px;
    }
    table tr td {
        padding: 10px 7px;
    }
    .photo{
        width: 5%;
        height: 75px;
        text-align: center;
    }
    .pt{
        height: 50px
    }
    .photo img{
        max-height: 100%;
    }

    .name{
        width: 25%;
        text-align: center;
    }
    .category{
        width: 14%;
        text-align: center;
    }
    .price{
        width: 13%;
    }
    .p{
        text-align: center;
    }
    .view{
        width: 8%;
    }
    .vc{
        text-align: center;
    }
    .count{
        width: 5%;
    }
    .re{
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
    .updated{
        width: 20%;
        text-align: end;
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
        .view, .count, .category{
            display : none;
        }
       .photo{
            width : 20%;
       }
       .name{
            width : 20%;
       }
       .category{
            width : 20%;
       }
       .price{
        width: 20%;
       }
    }
    @media (max-width : 768px) {
        .photo{
            width : 25%;
            font-size: 0.8rem;
        }
        .name{
            width : 25%;
            font-size: 0.8rem;
        }
        .category{
            width : 25%;
            font-size: 0.8rem;
        }
        .price{
            width: 10%;
            font-size: 0.8rem;
        }
        .updated{
            width : 15%;
            font-size: 0.8rem;
        }
        table tr th{
            padding: 10px 7px;
        }
        table tr td {
            padding: 8px 6px;
        }
    }
    @media (max-width : 650px) {
       .price,
       .updated{
            display: none;
       }
       .photo{
            width : 35%;
        }
        .name{
            width : 35%;
            text-align: center;
        }
        .control{
            width: 30%;
            font-size: 0.6rem;
            text-align: center;
        }
        table tr th{
            padding: 8px 5px;
        }
        table tr td {
            padding: 6px 4px;
        }
    }
    @media (max-width: 485px) {
        .noData h1{
            font-size: 1.5rem;
        }
    }
 </style>
 