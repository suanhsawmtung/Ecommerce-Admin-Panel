<template>
    <div>
        <div class="pagination">

            <div class="page-btn">
                <button @click="onClickPage(1)" >1</button>
            </div>

            <div class="page-btn">
                <button @click="onClickPage(2)" >2</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderListPaginator",
        methods: {
            onClickPage(number){
                this.$store.dispatch("changeSectionOfOrderList", number);
            },
        },
    }
</script>

<style scoped>
    .pagination{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 8px auto;
    }
    .pagination button, .pagination .page-btn button{
        width: 30px;
        height: 30px;
        padding: 5px;
        border: 1px solid #4fb9af;
        color: teal;
        background: #fff;
        margin: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pagination button:hover, 
    .pagination .page-btn button:hover{
        background: #b3e0dc;
    }
    .pagination button:active, 
    .pagination .page-btn button:active{
        color: #fff;
    }
    .pagination .page-btn button{
        margin: 0 5px;
    }
    .active{
        font-size: 1.5rem;
    }

     /* now, make it responese */
     @media (max-width: 786px) {
        .pagination button, .pagination .page-btn button{
            width: 15px;
            height: 15px;
            padding: 12px;
            margin: 0 10px;
        }
        .pagination .page-btn button{
            margin: 0 5px;
        }
    }

</style>

