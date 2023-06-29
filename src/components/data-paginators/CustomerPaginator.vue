<template>
    <div v-if="getTotalCustomer > getCustomerPerPage">

        <!-- Pagination -->
        <div class="pagination">

            <!-- Go To The First Page -->
            <button type="button" title="First Page" @click="onClickFirstPage(getCustomerFirstPageUrl)" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Go To The Previous Page -->
            <button type="button" title="Previous" @click="onClickPreviousPage(getCustomerPreviousPageUrl)" :disabled="isInFirstPage">
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Click Buttons To Direct Page -->
            <div class="page-btn" v-for="(btn, index) in btns" :key="index">
                <button @click="onClickPage(btn.url)" :disabled="btn.isDisable" :class="{ 'active' : btn.active }" >{{btn.label}}</button>
            </div>

            <!-- Go To The Next Page -->
            <button type="button" title="Next" @click="onClickNextPage(getCustomerNextPageUrl)" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i>
            </button>

            <!-- Go To The Last Page -->
            <button type="button" title="Last Page" @click="onClickLastPage(getCustomerLastPageUrl)" :disabled="isInLastPage">
                <i class="fa-solid fa-chevron-right"></i><i class="fa-solid fa-chevron-right"></i>
            </button>
            
        </div>
        <!-- Pagination End -->

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "CustomerPaginator",
    props: {
        maxVisibleButton: {     /* Number Of Buttons That Show In Paginator */
            type: Number,
            required: true,
        },

    },
    computed: {
        ...mapGetters([
            "getTotalCustomer", 
            "getCustomerPerPage", 
            "getCustomerLinks", 
            "getCustomerCurrentPage", 
            "getCustomerLastPage", 
            "getCustomerFirstPageUrl", 
            "getCustomerLastPageUrl",
            "getCustomerPreviousPageUrl",
            "getCustomerNextPageUrl"
        ]),

        /* To Check Current Page Is In First Page */
        isInFirstPage () {return this.getCustomerCurrentPage===1;},

        /* To Check Current Page Is In Last Page */
        isInLastPage () {return this.getCustomerCurrentPage === this.getCustomerLastPage},

        /* Number Of Start Button That Show In Group Of Paginator Buttons */
        startBtn () {
            if(this.getCustomerCurrentPage === 1) return 1
            if(this.getCustomerCurrentPage === this.getCustomerLastPage && this.getCustomerLastPage < this.maxVisibleButton) return this.getCustomerLastPage-1
            if(this.getCustomerCurrentPage === this.getCustomerLastPage && this.getCustomerLastPage >= this.maxVisibleButton) return this.getCustomerLastPage-(this.maxVisibleButton-1)
            return this.getCustomerCurrentPage-1
        },

        /* Number Of End Button That Show In Group Of Paginator Buttons */
        endBtn(){
            return Math.min(this.startBtn + this.maxVisibleButton - 1, this.getCustomerLastPage);
        },

        /* Represented Numbers Of Each Buttons That Show In Paginator */
        btns() {
            let btns = [];
            for(let i = this.startBtn; i <= this.endBtn; i++){
                btns.push(this.getCustomerLinks[i]);
            }
            return btns;
        }
    },
    methods: {

        ...mapActions(["allCustomers"]),

        /* Go To The First Page */
        onClickFirstPage (url) {
            this.allCustomers(url);
        },

        /* Go To The Last Page */
        onClickLastPage (url) {
            this.allCustomers(url);
        },

        /* Go To The Previous Page */
        onClickPreviousPage(url){
            this.allCustomers(url);
        },

        /* Go To The Next Page */
        onClickNextPage(url){
            this.allCustomers(url);
        },

        /* Go To The Page That Represent Button */
        onClickPage(url){
            this.allCustomers(url);
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
