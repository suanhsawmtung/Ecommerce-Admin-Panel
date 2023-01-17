<template>
    <div class="productTable">
        <table>
            <thead>
                <tr style="background-color: teal;">
                    <th class="photo pt" style="color: #fff;">Photo</th>
                    <th class="name" style="color: #fff;">Name</th>
                    <th class="category" style="color: #fff;">Category</th>
                    <th class="price" style="color: #fff;">Price</th>
                    <th class="view" style="color: #fff;">View_count</th>
                    <th class="rate" style="color: #fff;">Rate</th>
                    <th class="updated" style="color: #fff;">Latest_update</th>
                    <th class="control btns" style="color: #fff;"></th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(product,index) in paginatedProducts" :key="index">
                    <td class="photo" ><img :src="product.image" alt=""></td>
                    <td class="name" >{{product.title}}</td>
                    <td class="category" >{{product.category_title}}</td>
                    <td class="price p" >{{product.price}}</td>
                    <td class="view vc" >{{product.count}}</td>
                    <td class="rate re" >{{product.rate}}</td>
                    <td class="updated" >{{ product.updatedAt }}</td>
                    <td class="control btns" >
                        <button @click="showProductUpdatePage('productUpdate', product.id)" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button @click="$emit('deleteProduct', product.id)" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                        <button @click="showProductBranch('productDetail', product.id)" title="info"><i class="fa-solid fa-info"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="paginator">
            <Paginator v-show="getProducts.length>perPage" @productPageChanged="onProductPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getProducts.length/perPage) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
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
                currentPage: 1,
                perPage: 4,
                maxVisibleButton: 3,
            }
        },
        components: { Paginator },
        computed: {
            ...mapGetters("Products", ["getProducts", "paginatedProducts", "getProductCurrentPage"]),
        },
        methods: {
            ...mapActions("Products", ["productPaginator"]),
            showProductBranch (status, id) {
               this.$emit("showProductBranch", status, id); 
            },
            onProductPageChange(currentPage){
                this.currentPage = currentPage;
                let page = {
                    currentPage: this.currentPage,
                    perPage: this.perPage
                }
                this.productPaginator(page);
            },
            async showProductUpdatePage(status, id){
                let { data } = await axios.get(`http://localhost:8000/api/product/getProductDataForUpdate/${id}`);
                this.$emit("productUpdate", data);
            }
        },
        mounted () {
            this.currentPage=this.getProductCurrentPage;
        }
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
    }
    .category{
        width: 14%;
    }
    .price{
        width: 13%;
    }
    .p{
        text-align: right;
    }
    .view{
        width: 8%;
    }
    .vc{
        text-align: right;
    }
    .rate{
        width: 5%;
    }
    .re{
        text-align: right;
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

    /* make it responsive */
    @media (max-width: 991px) {
        .view, .rate, .category{
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
 </style>
 