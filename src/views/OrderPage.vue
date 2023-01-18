<template>
    <div class="branch-parent">
        <!-- <div v-show="deleteProductStatus" class="modal-box-one">
             <Modal @close="modalToggle()">
               <h4>Do you really want to delete {{ product.title }} permanantly?</h4>
               <button  @click="productDeleting(product.id)">Delete</button>
               <button @click="modalToggle()">Cancel</button>
             </Modal>
        </div> -->
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <div class="table-box">
                <header>
                    <h1 v-show="tableStatus">Products</h1>
                    <h1 v-show="listStatus">...</h1>
                    <div class="btn-box">
                        <select class="inputField" v-model="orderStatus" @change="filterOrder()">
                            <option class="opt" value="" selected>All</option>
                            <option class="opt" value="pending" style="{color: #ff9966}">Pending</option>
                            <option class="opt" value="invoiced" style="{color: #044cd0}">Invoiced</option>
                            <option class="opt" value="paid" style="{color: #09aeae}">Paid</option>
                            <option class="opt" value="delivered" style="{color: #1fae51}">Delivered</option>
                            <option class="opt" value="rejected" style="{color: #d72503}">Rejected</option>
                        </select>
                    </div>
                </header>
                <OrderTable @detail="showDetailPage" v-show="tableStatus"></OrderTable>
                <OrderList v-show="listStatus" @previousPage="showPreviousPage" :orders="orders"></OrderList>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import TopBar from "../components/TopBar.vue";
    // import Modal from ".././components/AllModals.vue";
    import OrderTable from "../components/order-branches/OrderTable.vue";
    import OrderList from "../components/order-branches/OrderList.vue";

    export default {
        name : 'ProductPage',
        data () {
            return {
                tableStatus: true,
                listStatus: false,

                idForList: null,
                orderStatus: "",

                orders: null

            }
        },
        components: { TopBar, OrderTable, OrderList },
        computed: {
            ...mapGetters( ["getToggleStatus", "getOrders"]),
        },
        methods: {
            ...mapActions("Products", ["deleteProduct"]),
            showProductBranches (status) {
                this.tableStatus = false;
                this.listStatus = false;

                switch (status) {
                  case "table":
                    this.tableStatus = true;
                    break;
                  case "list":
                    this.listStatus = true;
                    break;
                }
            },
            showPreviousPage(status){
                if(status=== "table"){
                    this.showProductBranches("table", null);
                }
            },
            showDetailPage(code){
                this.orders = this.getOrders.filter(order => order.orderCode === code);
                this.showProductBranches("list");
            },
            // showDeleteProductModal(id){
            //     let product = this.getProducts.filter(product=>{
            //         return product.id === id;
            //     });
            //     this.product = product[0];
            //     this.deleteProductStatus= true;
            // },
            // productDeleting(id){
            //     this.deleteProduct(id);
            //     this.modalToggle();
            // },
            // productUpdate(product){
            //     this.dataForUpdate = product;
            //     this.showProductBranches("productUpdate", null);
            // },
            // modalToggle(){
            //     this.deleteProductStatus = ! this.deleteProductStatus;
            // },
            filterOrder(){
                this.$store.dispatch("filterOrder", this.orderStatus);
            }
        },
    }
</script>

<style scoped>
.branch-parent{
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.main {
    position: absolute;
    top: 0;
    left: 250px;
    width: calc(100% - 250px);
    height: 100%;
    transition: 0.5s;
}
.toggleWidth{
    left: 70px;
    width: calc(100% - 70px);
}
.table-box{
    width: 95%;
    height: 80%;
    margin: 30px auto 0 auto;
    box-shadow: 1px 1px 4px 2px #000;
    padding: 15px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header h1{
    text-transform : uppercase;
    color: teal;
}
.btn-box{
    width: 100%;
    padding: 10px 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.btn-box .inputField{
    padding: 5px 8px;
    color: teal;
    font-size: 0.8rem;
    border-radius: 5px;
    border: 2px solid teal;
}
.btn-box .inputField .opt{
    color: teal;
    font-size: 0.8rem;
}

/* .modal-box-one{
   width: 100vw;
   height: 100vh;
}
.modal-box-one h4{
    margin-bottom: 10px;
    font-size: 1rem;
 }
 .modal-box-one button{
    width: 100px;
    padding: 10px ;
    border-radius: 5px;
    margin-right: 10px;
    background: #4fb9af;
    color: #fff;
    border: none
}
.modal-box-one button:active{
    transform : scale(0.9);
    background: #b3e0dc;
} */


/* make it responsive */
@media (max-width : 768px) {
    .btn-box{
        padding: 7px 4px;
    }
    .btn-box button{
        padding: 6px 10px;
        font-size: 0.7rem;
    }
}
@media (max-width : 650px) {
    header h1{
        font-size: 1.5rem;
    }
    .btn-box button{
        padding: 5px 8px;
        font-size: 0.6rem;
    }
    /* .modal-box-one h4{
        font-size: 0.8rem;
    }
    .modal-box-one button{
        width: 80px;
        padding: 8px ;
    } */
}
@media (max-width : 400px) {
    .main {
        position:fixed;
        top:0;
        left:0;
        width: 100%;
    } 
}

</style>
