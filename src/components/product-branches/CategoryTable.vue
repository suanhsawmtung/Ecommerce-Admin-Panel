<template>
    <div  class="categoryTable">
        <div class="table-box" >
            <table>
                <tr v-for="(category, index) in getCategories" :key="index">
                    <td class="category" >{{ category }}</td>
                    <td class="control crl" >
                        <button @click="showPopover(index)" title="more"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                        <div class="popover" v-show="(popoverStatus == index)">
                            <span>Show {{category}} products</span>
                            <span @click="showModal('editCategory', index)">Edit Category</span>
                            <span @click="showModal('deleteCategory', index)">Delete Category</span>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
       name : 'CategoryTable', 
       props : [ "createCategoryStatus" ],
       data () {
        return {
            popoverStatus: null,
            categories: [],
        }
       },
       computed: {
            ...mapGetters(["getCategories"]),
       },
       methods: {
            showModal (status, index) {
                this.$emit("modal",status, index);
                this.popoverStatus = null;
            },
            showPopover (index){
                if(this.popoverStatus==index){
                    this.popoverStatus = null;
                    return;
                }
                this.popoverStatus = index;
            },
       },
    }
</script>

<style scoped>
    .categoryTable{
        width: 100%;       
    }
    .modal{
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.7);
        position : absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-inner{
        width: 400px;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 2px 1px 6px 0px #000;
        display: flex;
        flex-direction: column;
        background: #fff;
    }
    .modal-inner .closeBtn{
        align-self: flex-end;
        border : none;
        background: none;
        font-size: 1rem;
        color: #000;
    }
    .modal-inner .closeBtn:hover{
        color: #4fb9af;
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
        columns: 1;
    }
    table{
        width : 100%;
    }
    table tr{
        width: 100%;
    }
    table tr:nth-child(odd){
        background: #b3e0dc;
    }
    table tr:hover{
        background: #4fb9af;
    }
    table tr td {
        padding: 10px 7px;
    }
    .category{
        width: 95%;
        font-size: 1.3rem;
    }
    .control{
        width : 5%;
        text-align: center;
        position: relative;
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
    .popover{
        position: absolute;
        top: -20px;
        left: -200px;
        width: 200px;
        padding: 5px;
        background: #fff;
        box-shadow: 0 0 0 0.1px #000;
        border: 0;
        display: flex;
        flex-direction: column;
    }
    .popover span{
        color: #000;
        font-size: 0.8rem;
        margin: 5px 0;
        cursor: pointer;
        text-decoration: underline;
        text-align: start;
    }
    .popover span:hover{
        text-decoration: none;
    }

    /* make it response */
    @media (max-width: 768px) {
        .modal-inner{
            width: 300px;
            padding: 8px;
            border-radius: 8px;
        }
        .btn-box{
            padding: 7px 4px;
        }
        .btn-box button{
            padding: 6px 10px;
            font-size: 0.7rem;
        }
        table tr td {
            font-size: 0.9rem;
            padding: 8px 5px;
        }
    }
    @media (max-width: 650px) {
        .modal-inner{
            width: 200px;
            padding: 8px;
            border-radius: 6px;
        }
        .btn-box button{
            padding: 5px 8px;
            font-size: 0.6rem;
        }
        .table-box{
            columns: 1;
        }
    }
</style>
