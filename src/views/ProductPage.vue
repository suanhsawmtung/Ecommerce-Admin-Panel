<template>
    <div class="branch-parent">
        <div v-show="deleteProductStatus" class="modal-box-one">
             <Modal @close="modalToggle()">
               <h4>Do you really want to delete {{ product.title }} permanantly?</h4>
               <button  @click="productDeleting(product.id)">Delete</button>
               <button @click="modalToggle()">Cancel</button>
             </Modal>
        </div>
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <div class="table-box">
                <div class="btn-box">
                    <button @click="showProductBranches('productTable', null)" v-show="!tableStatus"><i class="fa-solid fa-arrow-left"></i></button>
                    <button @click="showProductBranches('createProduct', null)" v-show="tableStatus">Create New Product</button>
                </div>
                <ProductTable @showProductBranch="showProductBranches" @deleteProduct="showDeleteProductModal" v-show="tableStatus"></ProductTable>
                <CreateProduct v-show="createStatus" @previousPage="showPreviousPage"></CreateProduct>
                <ProductDetail v-show="detailStatus" :id= idForPage></ProductDetail>
                <UpdateProduct v-show="updateStatus" :id= idForPage></UpdateProduct>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import Modal from ".././components/AllModals.vue";
    import ProductTable from "../components/product-branches/ProductTable.vue";
    // import CategoryTable from "../components/product-branches/CategoryTable.vue";
    import CreateProduct from "../components/product-branches/CreateProduct.vue";
    import ProductDetail from "../components/product-branches/ProductDetail.vue";
    import UpdateProduct from "../components/product-branches/UpdateProduct.vue";
    // import ProductModal from "../components/product-branches/ProductModals.vue";
    // import ProductsOfEachCategory from "../components/product-branches/ProductsOfEachCategory.vue";

    export default {
        name : 'ProductPage',
        data () {
            return {
                tableStatus: true,
                createStatus: false,
                detailStatus: false,
                updateStatus: false,

                modalStatus: false,
                chosenModal: null,
                idForModal: null,
                idForPage: null,
                product: {},
                deleteProductStatus: false,
            }
        },
        components : { TopBar, ProductTable, CreateProduct, ProductDetail, UpdateProduct, Modal },
        computed: {
            ...mapGetters( ["getToggleStatus"]),
            ...mapGetters("Products", ["getCategories", "getProducts"])
        },
        methods: {
            ...mapActions("Products", ["deleteProduct"]),
            showProductBranches (status, id) {
                this.tableStatus = false;
                this.createStatus = false;
                this.detailStatus = false;
                this.updateStatus = false;

                switch (status) {
                  case "productTable":
                    this.tableStatus = true;
                    this.idForPage = id;
                    break;
                  case "createProduct":
                    this.createStatus = true;
                    this.idForPage = id;
                    break;
                  case "productDetail":
                    this.detailStatus = true;
                    this.idForPage = id;
                    break;
                  case "productUpdate":
                    this.updateStatus = true; 
                    this.idForPage = id;
                    break;
                }
            },
            // showCategoryBranches (status, category) {
            //     this.categoryProductStatus = false;
            //     this.categoryTableStatus = false;

            //     switch (status) {
            //       case "categoryTable":
            //         this.categoryTableStatus = true;
            //         break;
            //       case "categoryProduct":
            //         this.categoryProductStatus = true;
            //         this.categoryName = category;
            //         break;
            //     }
            // },
            showDeleteProductModal(id){
                let product = this.getProducts.filter(product=>{
                    return product.id === id;
                });
                this.product = product[0];
                this.deleteProductStatus= true;
            },
            productDeleting(id){
                this.deleteProduct(id);
                this.modalToggle();
            },
            modalToggle(){
                this.deleteProductStatus = ! this.deleteProductStatus;
            },
            showChosenProductBranch(status, id){
                this.selectItem("product");
                this.showProductBranches (status, id);
            },
            showPreviousPage(status){
                // if(status === "categoryTable"){
                //     this.showCategoryBranches("categoryTable", null);
                // }
                if(status=== "productTable"){
                    this.showProductBranches("productTable", null);
                }
                this.modalToggle(null, null);
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
    padding: 20px 15px;
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

.modal-box-one{
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
}


/* make it responsive */
@media (max-width: 991px) {

}
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
    .btn-box button{
        padding: 5px 8px;
        font-size: 0.6rem;
    }
    .modal-box-one h4{
        font-size: 0.8rem;
    }
    .modal-box-one button{
        width: 80px;
        padding: 8px ;
    }
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
