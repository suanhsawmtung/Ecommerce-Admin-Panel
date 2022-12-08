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
                    <th class="react" style="color: #fff;">React</th>
                    <th class="review" style="color: #fff;">Review</th>
                    <th class="updated" style="color: #fff;">Latest_update</th>
                    <th class="control btns" style="color: #fff;"></th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(product,index) in products" :key="index">
                    <td class="photo" ><img :src="product.image" alt=""></td>
                    <td class="name" >{{product.title}}</td>
                    <td class="category" >{{product.category}}</td>
                    <td class="price p" >{{product.price}}</td>
                    <td class="view vc" >{{product.count}}</td>
                    <td class="react re" >{{product.rate}}</td>
                    <td class="review rv" > .</td>
                    <td class="updated" >.</td>
                    <td class="control btns" >
                        <button @click="showChosenProductBranch('productUpdate', product.id)" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button @click="$emit('toggle', 'deleteProduct', product.id)" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                        <button @click="showChosenProductBranch('productDetail', product.id)" title="info"><i class="fa-solid fa-info"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
 </template>
 
 <script>
    import { mapGetters } from "vuex";
    export default {
        name: "ProductsOfEachCategory",
        data () {
            return {
                products: [],
            }
        },
        props: [ "category" ],
        computed: {
            ...mapGetters(["getProducts"]),
        },
        methods: {
            showChosenProductBranch (status, id) {
               this.$emit("showChosenProductBranch", status, id); 
            },
            showProducts(category){
                this.products = this.getProducts.filter(product => {
                    return product.category === category;
                });
            }
        },
        updated () {
            this.showProducts(this.category);
        }
    }
 </script>
 
 <style scoped>
    .productTable{
        width: 100%;
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
    .react{
        width: 5%;
    }
    .re{
        text-align: right;
    }
    .review{
        width: 5%;
    }
    .rv{
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
        width: 15%;
    }

    /* make it responsive */
    @media (max-width: 991px) {
        .view, .review, .react, .category{
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
       .updated{
            width : 20%;
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
            font-size: 0.6rem;
        }
        .name{
            width : 35%;
            font-size: 0.6rem;
            text-align: center;
        }
        .price{
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
 