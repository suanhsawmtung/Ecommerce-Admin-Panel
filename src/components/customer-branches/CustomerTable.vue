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
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="email" >Email</td>
                <td class="address " >Address</td>
                <td class="date" >Joined Date</td>
                <td class="control btns" >
                    <button @click="showModalOne()" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="showModalTwo()" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="email" >Email</td>
                <td class="address " >Address</td>
                <td class="date" >Joined Date</td>
                <td class="control btns" >
                    <button @click="showModalOne()" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="showModalTwo()" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="email" >Email</td>
                <td class="address " >Address</td>
                <td class="date" >Joined Date</td>
                <td class="control btns" >
                    <button @click="showModalOne()" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="showModalTwo()" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
            <tr>
                <td class="photo" >Photo</td>
                <td class="name" >Name</td>
                <td class="email" >Email</td>
                <td class="address " >Address</td>
                <td class="date" >Joined Date</td>
                <td class="control btns" >
                    <button @click="showModalOne()" title="add to admin list"><i class="fa-regular fa-plus"></i></button>
                    <button @click="showModalTwo()" title="delete"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        </table>
    </div>
 </template>
 
 <script>
    export default {
        name: "ProductTable",

        methods: {
            showModalOne () {
               this.$emit("showModal", "addAdmin"); 
            },
            showModalTwo(){
                this.$emit("showModal", "deleteAcc")
            }
        }
    }
 </script>
 
 <style scoped>
    .branchTable{
        width: 100%;
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
        width: 20%;
    }
    .email{
        width: 20%;
    }
    .address{
        width: 15%;
    }
    .date{
        width: 15%;
    }

    .control{
        width: 15%;
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
        .date, .email{
            display: none;
        }
    }
 </style>
 