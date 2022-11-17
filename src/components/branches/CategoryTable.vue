<template>
    <div  class="categoryTable">
        <div class="btn-box">
            <button @click="showBranches('table')" v-show="!tableStatus"><i class="fa-solid fa-arrow-left"></i></button>
            <button @click="showBranches('categoryProduct')" v-show="tableStatus">Create New Product</button>
        </div>
        <div class="table-box">
            <table v-show="tableStatus">
                <tr style="background-color: teal;">
                    <th class="category" style="color: #fff;">Category</th>
                    <th class="product " style="color: #fff;">Products</th>
                    <th class="control" style="color: #fff;"></th>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
                <tr>
                    <td class="category" >Category</td>
                    <td class="product pd" >Products</td>
                    <td class="control crl" >
                        <button @click="showBranches('detail')" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
       name : 'CategoryTable', 
        data () {
            return {
                tableStatus: true,
                categoryProductStatus: false,
            }
        },
       methods: {
            showBranches (status) {
                this.tableStatus = false;
                this.categoryProductStatus = false;

                if(status == "table"){
                    this.tableStatus = true;
                    return;
                }
                if(status == "categoryProduct"){
                    this.categoryProductStatus = true;
                    return;
                }
            },
        }
       
    }
</script>

<style scoped>
    .categoryTable{
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
    .table-box{
        width: 100%;
        columns : 2;
    }
    table{
        width : 100%;
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
    .category{
        width: 50%;
    }
    .product{
        width: 25%;
    }
    .pd{
        text-align: center;
    }
    .control{
        width : 25%;
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

    /* make it response */
    @media (max-width: 768px) {
        .btn-box{
            padding: 7px 4px;
        }
        .btn-box button{
            padding: 6px 10px;
            font-size: 0.7rem;
        }
        .table-box{
            columns : 1;
        }
        table tr th{
            font-size: 0.8rem;
            padding: 10px 5px;
        }
        table tr td {
            font-size: 0.8rem;
            padding: 8px 5px;
        }
    }
    @media (max-width: 650px) {
        .btn-box button{
            padding: 5px 8px;
            font-size: 0.6rem;
        }
        table tr th{
            font-size: 0.6rem;
            padding: 8px 5px;
        }
        table tr td {
            font-size: 0.6rem;
            padding: 8px 5px;
        }
    }
</style>
