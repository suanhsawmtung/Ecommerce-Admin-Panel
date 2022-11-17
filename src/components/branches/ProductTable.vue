<template>
    <div class="productTable">
        <div class="btn-box">
            <button @click="showBranches('table')" v-show="!tableStatus"><i class="fa-solid fa-arrow-left"></i></button>
            <button @click="showBranches('create')" v-show="tableStatus">Create New Product</button>
            <button @click="showBranches('update')" v-show="detailStatus">Edit Product</button>
        </div>
        <CreateProduct v-show="createStatus"></CreateProduct>
        <ProductDetail v-show="detailStatus"></ProductDetail>
        <table v-show="tableStatus">
            <tr style="background-color: teal;">
                <th class="photo" style="color: #fff;">Photo</th>
                <th class="name" style="color: #fff;">Name</th>
                <th class="category" style="color: #fff;">Category</th>
                <th class="price" style="color: #fff;">Price</th>
                <th class="view" style="color: #fff;">View_count</th>
                <th class="react" style="color: #fff;">React</th>
                <th class="review" style="color: #fff;">Review</th>
                <th class="updated" style="color: #fff;">Latest_update</th>
                <th class="control btns" style="color: #fff;"></th>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="category" >Category</td>
                <td class="price p" >Price</td>
                <td class="view vc" >View_count</td>
                <td class="react re" >React</td>
                <td class="review rv" >Review</td>
                <td class="updated" >Latest_update</td>
                <td class="control btns" >
                    <button @click="showBranches('update')" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    <button @click="showBranches('detail')" title="info"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="category" >Category</td>
                <td class="price p" >Price</td>
                <td class="view vc" >View_count</td>
                <td class="react re" >React</td>
                <td class="review rv" >Review</td>
                <td class="updated" >Latest_update</td>
                <td class="control btns" >
                    <button @click="showBranches('update')" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    <button @click="showBranches('detail')" title="info"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="category" >Category</td>
                <td class="price p" >Price</td>
                <td class="view vc" >View_count</td>
                <td class="react re" >React</td>
                <td class="review rv" >Review</td>
                <td class="updated" >Latest_update</td>
                <td class="control btns" >
                    <button @click="showBranches('update')" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    <button @click="showBranches('detail')" title="info"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="category" >Category</td>
                <td class="price p" >Price</td>
                <td class="view vc" >View_count</td>
                <td class="react re" >React</td>
                <td class="review rv" >Review</td>
                <td class="updated" >Latest_update</td>
                <td class="control btns" >
                    <button @click="showBranches('update')" title="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    <button @click="showBranches('detail')" title="info"><i class="fa-solid fa-info"></i></button>
                </td>
            </tr>
        </table>
    </div>
 </template>
 
 <script>
    import CreateProduct from "../doubleBranches/CreateProduct.vue";
    import ProductDetail from "../doubleBranches/ProductDetail.vue";
    export default {
        name: "ProductTable",
        data () {
            return {
                tableStatus: true,
                createStatus: false,
                detailStatus: false,
                updateStatus: false,
            }
        },
        components : { CreateProduct, ProductDetail },
        methods: {
            showBranches (status) {
                this.tableStatus = false;
                this.createStatus = false;
                this.detailStatus = false;
                this.updateStatus = false;

                if(status == "table"){
                    this.tableStatus = true;
                    return;
                }
                if(status == "create"){
                    this.createStatus = true;
                    return;
                }
                if(status == "detail"){
                    this.detailStatus = true;
                    return;
                }
                if(status == "update"){
                    this.updateStatus = true;
                    return;
                }
            },
        }
    }
 </script>
 
 <style scoped>
    .productTable{
        width: 100%;
    }
    .btn-box{
        width: 100%;
        padding: 10px 5px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .btn-box button{
        padding: 8px 15px;
        color: #fff;
        background: teal;
        font-size: 0.8rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        transition: 0.5s;
    }
    .btn-box button:active{
        transform: scale(0.93);
        background: #4fb9af;
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
        width: 15%;
    }

    .name{
        width: 15%;
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
    .updated{
        width: 15%;
    }

    /* make it responsive */
    @media (max-width: 991px) {
        .view, .review, .react, .control{
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
        .btn-box{
            padding: 7px 4px;
        }
        .btn-box button{
            padding: 6px 10px;
            font-size: 0.7rem;
        }
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
        .btn-box button{
            padding: 5px 8px;
            font-size: 0.6rem;
        }
       .category,
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
 