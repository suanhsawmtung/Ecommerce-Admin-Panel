<template>
    <div class="ProductTable">
        <table>
            <tr style="background-color: teal;">
                <th style="width: 15%;color: #fff;">Photo</th>
                <th style="width: 15%;color: #fff;">Name</th>
                <th style="width: 14%;color: #fff;">Category</th>
                <th style="width: 8%;color: #fff;">Price</th>
                <th style="width: 8%;color: #fff;">View_count</th>
                <th style="width: 5%;color: #fff;">React</th>
                <th style="width: 5%;color: #fff;">Review</th>
                <th style="width: 15%;color: #fff;">Created_at</th>
                <th style="width: 15%;color: #fff;">Latest_update</th>
            </tr>
            <tr>
                <td style="width: 15%;">Photo</td>
                <td style="width: 15%;">Name</td>
                <td style="width: 14%;">Category</td>
                <td style="width: 8%;">Price</td>
                <td style="width: 8%;">View_count</td>
                <td style="width: 5%;">React</td>
                <td style="width: 5%;">Review</td>
                <td style="width: 15%;">Created_at</td>
                <td style="width: 15%;">Latest_update</td>
            </tr>
            <tr>
                <td style="width: 15%;">Photo</td>
                <td style="width: 15%;">Name</td>
                <td style="width: 14%;">Category</td>
                <td style="width: 8%;">Price</td>
                <td style="width: 8%;">View_count</td>
                <td style="width: 5%;">React</td>
                <td style="width: 5%;">Review</td>
                <td style="width: 15%;">Created_at</td>
                <td style="width: 15%;">Latest_update</td>
            </tr>
            <tr>
                <td style="width: 15%;">Photo</td>
                <td style="width: 15%;">Name</td>
                <td style="width: 14%;">Category</td>
                <td style="width: 8%;">Price</td>
                <td style="width: 8%;">View_count</td>
                <td style="width: 5%;">React</td>
                <td style="width: 5%;">Review</td>
                <td style="width: 15%;">Created_at</td>
                <td style="width: 15%;">Latest_update</td>
            </tr>
            <tr>
                <td style="width: 15%;">Photo</td>
                <td style="width: 15%;">Name</td>
                <td style="width: 14%;">Category</td>
                <td style="width: 8%;">Price</td>
                <td style="width: 8%;">View_count</td>
                <td style="width: 5%;">React</td>
                <td style="width: 5%;">Review</td>
                <td style="width: 15%;">Created_at</td>
                <td style="width: 15%;">Latest_update</td>
            </tr>
        </table>
    </div>
 </template>
 
 <script>
    export default {
        name : "ProductTable"
    }
 </script>
 
 <style scoped>
    .productTable{
        width: 100%;
    }
    table{
        width : 100%;
    }
    table tr{
        width: 100%;
        border-bottom: 5px solid black;
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
 </style>
 