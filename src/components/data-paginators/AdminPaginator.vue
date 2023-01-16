<template>
    <div>
        <div class="pagination">
            
            <button type="button" title="First Page" @click="onClickFirstPage()" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i>
            </button>

            <button type="button" title="Previous" @click="onClickPreviousPage()" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <div class="page-btn" v-for="(page, index) in pages" :key="index">
                <button @click="onClickPage(page.number)" :disabled="page.isDisable" :class="{ 'active' : isPageActive(page.number) }" >{{page.number}}</button>
            </div>

            <button type="button" title="Next" @click="onClickNextPage()" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

            <button type="button" title="Last Page" @click="onClickLastPage()" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i>
            </button>
            
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomerPaginator",
        props: {
            currentPage: {
                type: Number,
                required: true
            },
            totalPages: {
                type: Number,
                required: true,
            },
            perPage: {
                type: Number,
                required: true,
            },
            maxVisibleButton: {
                type: Number,
                required: true,
            },
        },
        computed: {
            isInFirstPage () {return this.currentPage===1;},
            isInLastPage () {return this.currentPage === this.totalPages},

            startPage () {
                if(this.currentPage === 1) return 1
                if(this.currentPage === this.totalPages) return this.totalPages-1
                return this.currentPage-1
            },
            endPage(){
                return Math.min(this.startPage + this.maxVisibleButton - 1, this.totalPages);
            },
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
            onClickFirstPage () {
                this.$emit("adminPageChanged", 1);
            },
            onClickLastPage () {
                this.$emit("adminPageChanged", this.totalPages);
            },
            onClickPreviousPage(){
                this.$emit("adminPageChanged", this.currentPage-1);
            },
            onClickNextPage(){
                this.$emit("adminPageChanged", this.currentPage+1);
            },
            onClickPage(page){
                this.$emit("adminPageChanged", page);
            },
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
