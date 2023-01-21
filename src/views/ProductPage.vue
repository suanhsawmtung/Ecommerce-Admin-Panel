<template>
    <div class="branch-parent">

        <!-- Toast Alert -->
        <transition name="toast">
            <div class="toast" v-show="toastStatus">
                <h3 >{{ toastMessage }}</h3>
            </div>
        </transition>
        <!-- Toast Alert End -->

        <!-- Delete Product Modal -->
        <div v-show="deleteProductStatus" class="modal-box-one">
             <Modal @close="modalToggle()">
               <h4>Do you really want to delete {{ product.title }} permanantly?</h4>
               <button  @click="productDeleting(product.id)">Delete</button>
               <button @click="modalToggle()">Cancel</button>
             </Modal>
        </div>
        <!-- Delete Product Modal End -->

        <!-- Main -->
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">

            <!-- Top Bar -->
            <TopBar></TopBar>

            <!-- Table Box -->
            <div class="table-box">
                
                <header>

                    <!-- Table Title -->
                    <h1>Products</h1>

                    <!-- Button Box -->
                    <div class="btn-box">
                        <button @click="showProductBranches('productTable', null)" v-show="!tableStatus"><i class="fa-solid fa-arrow-left"></i></button>
                        <button @click="showProductBranches('createProduct', null)" v-show="tableStatus">Create New Product</button>
                    </div>
                    <!-- Button Box End -->

                </header>

                <!-- Product Table Component -->
                <ProductTable @showProductBranch="showProductBranches" @deleteProduct="showDeleteProductModal" @productUpdate="productUpdate" v-show="tableStatus"></ProductTable>
                
                <!-- Create Product Form Component -->
                <CreateProduct v-show="createStatus" @previousPage="showPreviousPage" @toastAlert="toastAlert"></CreateProduct>
                
                <!-- Product Detail Component -->
                <ProductDetail v-show="detailStatus" :id= idForDetail ></ProductDetail>
                
                <!-- Update Product Component -->
                <UpdateProduct v-show="updateStatus" @toastAlert="toastAlert" @previousPage="showPreviousPage" :product= dataForUpdate></UpdateProduct>
            </div>
            <!-- Table Box End -->

        </div>
        <!-- Main End -->

    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import Modal from ".././components/AllModals.vue";
    import ProductTable from "../components/product-branches/ProductTable.vue";
    import CreateProduct from "../components/product-branches/CreateProduct.vue";
    import ProductDetail from "../components/product-branches/ProductDetail.vue";
    import UpdateProduct from "../components/product-branches/UpdateProduct.vue";

    export default {
        name : 'ProductPage',
        data () {
            return {

            /* Use To Choose Which Section Show, Table Or Create Form Or Update Form Or Detail */
                tableStatus: true,
                createStatus: false,
                detailStatus: false,
                updateStatus: false,

            /* Status For Show Toast And Toast Message */ 
                toastStatus: false,
                toastMessage: "",
            
            /* Unique Id To Show Product Detail */ 
                idForDetail: null,
            
            /* Product To Make Update */ 
                dataForUpdate: {
                    id: "",
                    title: "",
                    category: "",
                    price: "",
                    description: ""
                },
            /* Select Product To Delete */ 
                product: {},
                deleteProductStatus: false,
            }
        },
        components : { TopBar, Modal, ProductTable, CreateProduct, ProductDetail, UpdateProduct },
        computed: {
            ...mapGetters( ["getToggleStatus"]),
            ...mapGetters("Products", ["getProducts"]),
            ...mapGetters("Categories", ["getCategories"]),
        },
        methods: {
            ...mapActions("Products", ["deleteProduct"]),

            /* Control Status Which Component Show */ 
            showProductBranches (status, id) {
                this.tableStatus = false;
                this.createStatus = false;
                this.detailStatus = false;
                this.updateStatus = false;

                switch (status) {
                  case "productTable":
                    this.tableStatus = true;
                    this.idForDetail = id;
                    this.idForUpdate = id;
                    break;
                  case "createProduct":
                    this.createStatus = true;
                    this.idForDetail = id;
                    this.idForUpdate = id;
                    break;
                  case "productDetail":
                    this.detailStatus = true;
                    this.idForDetail = id;
                    break;
                  case "productUpdate":
                    this.updateStatus = true; 
                    this.idForUpdate = id;
                    break;
                }
            },

            /* Go Back To The Previous Page */ 
            showPreviousPage(status){
                if(status=== "productTable"){
                    this.showProductBranches("productTable", null);
                }
            },

            /* Show Delete Product Modal */ 
            showDeleteProductModal(id){
                let product = this.getProducts.filter(product=>{
                    return product.id === id;
                });
                this.product = product[0];
                this.deleteProductStatus= true;
            },

            /* Delete Product Function */ 
            productDeleting(id){
                this.deleteProduct(id);
                this.modalToggle();
                
                this.toastMessage = "Deleted product successfully.";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
            },

            /* Show Update Product Component */ 
            productUpdate(product){
                this.dataForUpdate = product;
                this.showProductBranches("productUpdate", null);
            },

            /* Show Or Hide Modal */ 
            modalToggle(){
                this.deleteProductStatus = ! this.deleteProductStatus;
            },

            /* Toast Alert Function */ 
            toastAlert(status){
                if(status==="create"){
                    this.toastMessage = "Created new product successfully. ";
                    setTimeout(() => this.toastStatus = true, 1000);
                    setTimeout(() => this.toastStatus = false, 3000);
                    return;
                }
                if(status==="update"){
                    this.toastMessage = "Updated product successfully. ";
                    setTimeout(() => this.toastStatus = true, 1000);
                    setTimeout(() => this.toastStatus = false, 3000);
                    return;
                }
            }
        },
    }
</script>

<style src="../assets/css/product.css" scoped></style>
