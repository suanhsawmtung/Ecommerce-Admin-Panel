<template>
    <div>

        <!-- Pagination -->
        <div class="pagination">

            <!-- Go To The Original Condition -->
            <button type="button" title="First Page" @click="onClickPreviousPage()" >
                <i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Go To The Number 1 Page -->
            <div class="page-btn" >
                <button @click="onClickPage(1)" >1</button>
            </div>

            <!-- Go To The Number 2 Page -->
            <div class="page-btn" >
                <button @click="onClickPage(2)"  >2</button>
            </div>

            <!-- Go To The Number 3 Page -->
            <div class="page-btn" >
                <button @click="onClickPage(3)" >3</button>
            </div>

            <!-- Go To The Number 4 Page -->
            <div class="page-btn" >
                <button @click="onClickPage(4)"  >4</button>
            </div>
            
        </div>
        <!-- Pagination End -->

    </div>
</template>

<script>
    export default {
        name: "OverviewPaginator",
        methods: {

            /* Go To The Page That Represent Button */
            onClickPage(page){
                this.$store.dispatch("overviewStatus", page);
            },

            /* Go To The Original Condition Function */
            onClickPreviousPage(){
                this.$store.dispatch("resetBoxes");
            }

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
