<template>
    <div>
        
        <!-- Pagination -->
        <div class="pagination">
            
            <!-- Go To The First Page -->
            <button type="button" title="First Page" @click="onClickFirstPage()" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Go To The Previous Page -->
            <button type="button" title="Previous" @click="onClickPreviousPage()" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Click Buttons To Direct Page -->
            <div class="page-btn" v-for="(page, index) in pages" :key="index">
                <button @click="onClickPage(page.number)" :disabled="page.isDisable" :class="{ 'active' : isPageActive(page.number) }" >{{page.number}}</button>
            </div>

            <!-- Go To The Next Page -->
            <button type="button" title="Next" @click="onClickNextPage()" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

            <!-- Go To The Last Page -->
            <button type="button" title="Last Page" @click="onClickLastPage()" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i>
            </button>
            
        </div>
        <!-- Pagination End -->

    </div>
</template>

<script>
    export default {
        name: "AdminPaginator",
        props: {

            currentPage: {          /* Current Page */
                type: Number,
                required: true
            },

            totalPages: {           /* Total Page Count */
                type: Number,
                required: true,
            },

            perPage: {              /* Number Of Data Show In A Single Page */
                type: Number,
                required: true,
            },

            maxVisibleButton: {      /* Number Of Buttons That Show In Paginator */
                type: Number,
                required: true,
            },
        },
        computed: {

            /* To Check Current Page Is In First Page */
            isInFirstPage () {return this.currentPage===1;},

            /* To Check Current Page Is In Last Page */
            isInLastPage () {return this.currentPage === this.totalPages},

            /* Number Of Start Button That Show In Group Of Paginator Buttons */
            startPage () {
                if(this.currentPage === 1) return 1
                if(this.currentPage === this.totalPages) return this.totalPages-1
                return this.currentPage-1
            },

            /* Number Of End Button That Show In Group Of Paginator Buttons */
            endPage(){
                return Math.min(this.startPage + this.maxVisibleButton - 1, this.totalPages);
            },

            /* Represented Numbers Of Each Buttons That Show In Paginator */
            pages () {
                let range = [];
                for(let i = this.startPage; i <= this.endPage; i++){
                    range.push({
                        number: i,
                        isDisable : i === this.currentPage
                    });
                }
                return range;
            }

        },
        methods: {

            /* Go To The First Page */
            onClickFirstPage () {
                this.$emit("adminPageChanged", 1);
            },

            /* Go To The Last Page */
            onClickLastPage () {
                this.$emit("adminPageChanged", this.totalPages);
            },

            /* Go To The Previous Page */
            onClickPreviousPage(){
                this.$emit("adminPageChanged", this.currentPage-1);
            },

            /* Go To The Next Page */
            onClickNextPage(){
                this.$emit("adminPageChanged", this.currentPage+1);
            },

            /* Go To The Page That Represent Button */
            onClickPage(page){
                this.$emit("adminPageChanged", page);
            },

            /* Is Page Active Or Not */
            isPageActive(page){
                if(this.currentPage===page){ return true }
                return false;
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
