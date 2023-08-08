<template>
    <div class="branch-parent">

        <!-- Toast Alert -->
        <transition name="toast">
            <div class="toast" v-if="toastStatus">
                <h3 >{{ toastMessage }}</h3>
            </div>
        </transition>
        <!-- Toast Alert End -->

        <!-- Delete Product Modal -->
        <div v-if="deleteProductStatus" class="modal-box-one">
             <Modal @close="closeModal()">
               <h4>Do you really want to delete {{ product.title }} permanantly?</h4>
               <button  @click="productDeleting(product.id)">Delete</button>
               <button @click="closeModal()">Cancel</button>
             </Modal>
        </div>
        <!-- Delete Product Modal End -->

        <!-- Filter Modal -->
        <FilterModal 
            v-if="filterProductStatus" 
            :categories="categories" 
            @close="closeModal()" 
        >
        </FilterModal>
        <!-- Filter Modal End -->

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
                        <button 
                            @click="showProductBranches('productTable')" 
                            v-if="!tableStatus"
                        >
                            <i class="fa-solid fa-arrow-left"></i>
                        </button>
                        <button 
                            @click="showProductBranches('createProduct')" 
                            v-if="tableStatus"
                        >
                            + Create New Product
                        </button>
                        <button 
                            @click="filterModalToggle()" 
                            v-if="tableStatus"
                        >
                            <i class="fa-solid fa-filter"></i> 
                        </button>
                    </div>
                    <!-- Button Box End -->

                </header>

                <!-- Product Table Component -->
                <ProductTable 
                    @deleteProduct="showDeleteProductModal" 
                    @productUpdate="productUpdate" 
                    @productDetail="productDetail"
                    v-if="tableStatus"
                >
                </ProductTable>
                
                <!-- Create Product Form Component -->
                <CreateProduct 
                    v-if="createStatus" 
                    @previousPage="showPreviousPage" 
                    @toastAlert="toastAlert"
                    :categories="getSimpleCategories"
                >
                </CreateProduct>
                
                <!-- Product Detail Component -->
                <ProductDetail 
                    v-if="detailStatus" 
                    :product= "productForDetail" 
                >
                </ProductDetail>
                
                <!-- Update Product Component -->
                <UpdateProduct 
                    v-if="updateStatus" 
                    @toastAlert="toastAlert" 
                    @previousPage="showPreviousPage" 
                    :product= productForUpdate 
                    :categories="getSimpleCategories"
                >
                </UpdateProduct>
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
import FilterModal from "../components/product-branches/FilterModal.vue";
import axios from "axios";

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
            productForDetail: null,
        
        /* Product To Make Update */ 
            productForUpdate: null,

        /* Select Product To Delete */ 
            product: {},
            categories: null,
            deleteProductStatus: false,
            filterProductStatus: false
        }
    },
    components : { TopBar, Modal, ProductTable, CreateProduct, ProductDetail, UpdateProduct, FilterModal },
    computed: {
        ...mapGetters( ["getToggleStatus"]),
        ...mapGetters("Products", ["getProducts"]),
        ...mapGetters("Categories", ["getCategories", "getSimpleCategories"]),
    },
    methods: {
        ...mapActions("Products", ["deleteProduct"]),
        ...mapActions("Categories", ["takeCategories"]),

        /* Control Status Which Component Show */ 
        showProductBranches (status) {
            this.tableStatus = false;
            this.createStatus = false;
            this.detailStatus = false;
            this.updateStatus = false;

            switch (status) {
                case "productTable":
                    this.tableStatus = true;
                    break;
                case "createProduct":
                    this.createStatus = true;
                    break;
                case "productDetail":
                    this.detailStatus = true;
                    break;
                case "productUpdate":
                    this.updateStatus = true; 
                    break;
            }
        },

        /* Go Back To The Previous Page */ 
        showPreviousPage(status){
            if(status=== "productTable"){
                this.showProductBranches("productTable");
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

        /* Show Product Filter Modal */
        async filterModalToggle(){
            const { data } = await axios.get("https://nooneuse.shop/api/admin/category/getAllCategories");
            this.categories = data;
            this.filterProductStatus = !this.filterProductStatus;
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
        productUpdate(data){
            this.productForUpdate = data;
            this.showProductBranches("productUpdate");
        },

        /* Show Product Detail Component */
        productDetail(id){
            let productData = this.getProducts.filter(product=>{
                return product.id === id;
            });
            this.productForDetail = productData[0];
            this.showProductBranches("productDetail");
        },

        /* Show Or Hide Modal */ 
        closeModal(){
            this.deleteProductStatus = false;
            this.filterProductStatus = false;
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
    mounted(){
        this.takeCategories();
    }
}
</script>

<style src="../assets/css/product.css" scoped></style>
