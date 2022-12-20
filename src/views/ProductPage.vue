<template>
      <div class="branch-parent">
        <div v-show="modalStatus" class="modal-parent-box">
            <ProductModal :chosenModal='chosenModal' :id=idForModal @close="modalToggle(null)"></ProductModal>
        </div>
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <div class="table-box">
                <div class="branch-nav">
                    <div class="nav-item" :class="{ 'active' : productStatus }"  @click="selectItem('product')">
                        <h4>Product Lists</h4>
                    </div>
                    <div class="nav-item" :class="{ 'active' : categoryStatus }" @click="selectItem('category')" >
                       <h4>Category</h4>
                    </div>
                </div>
                <div v-show="productStatus">
                    <div class="btn-box">
                        <button @click="showProductBranches('productTable', null)" v-show="!tableStatus"><i class="fa-solid fa-arrow-left"></i></button>
                        <button @click="showProductBranches('createProduct', null)" v-show="tableStatus">Create New Product</button>
                    </div>
                    <ProductTable @showProductBranch="showProductBranches" @toggle="modalToggle" v-show="tableStatus"></ProductTable>
                    <CreateProduct v-show="createStatus"></CreateProduct>
                    <ProductDetail v-show="detailStatus" :id= idForPage></ProductDetail>
                    <UpdateProduct v-show="updateStatus" :id= idForPage></UpdateProduct>
                </div>
                <div v-show="categoryStatus">
                    <div class="btn-box">
                        <button @click="showCategoryBranches('categoryTable', null)" v-show="!categoryTableStatus"><i class="fa-solid fa-arrow-left"></i></button>
                        <button @click="modalToggle('createCategory', null)" v-show="categoryTableStatus">Create New Category</button>
                    </div>
                    <CategoryTable v-show="categoryTableStatus" @modal="modalToggle" @showCategoryBranches="showCategoryBranches"></CategoryTable>
                    <ProductsOfEachCategory :category="categoryName" @showChosenProductBranch="showChosenProductBranch" @toggle="modalToggle" v-show="categoryProductStatus"></ProductsOfEachCategory>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import ProductTable from "../components/product-branches/ProductTable.vue";
    import CategoryTable from "../components/product-branches/CategoryTable.vue";
    import CreateProduct from "../components/product-branches/CreateProduct.vue";
    import ProductDetail from "../components/product-branches/ProductDetail.vue";
    import UpdateProduct from "../components/product-branches/UpdateProduct.vue";
    import ProductModal from "../components/product-branches/ProductModals.vue";
    import ProductsOfEachCategory from "../components/product-branches/ProductsOfEachCategory.vue";

    export default {
        name : 'ProductPage',
        data () {
            return {
                productStatus : true,
                categoryStatus : false,
                
                tableStatus: true,
                createStatus: false,
                detailStatus: false,
                updateStatus: false,

                categoryTableStatus: true,
                categoryProductStatus: false,

                modalStatus: false,
                chosenModal: null,
                idForModal: null,
                idForPage: null,
                categoryName: "",
            }
        },
        components : { TopBar, ProductTable, CategoryTable, CreateProduct, ProductDetail, UpdateProduct, ProductModal, ProductsOfEachCategory },
        computed: {
            ...mapGetters(["getToggleStatus"])
        },
        methods: {
            selectItem (item){
                this.productStatus = false;
                this.categoryStatus = false;

                if(item == 'product'){
                    this.productStatus = true;
                    return;
                }

                if(item == 'category'){
                    this.categoryStatus = true;
                    return;
                }
            },
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
            showCategoryBranches (status, category) {
                this.categoryProductStatus = false;
                this.categoryTableStatus = false;

                switch (status) {
                  case "categoryTable":
                    this.categoryTableStatus = true;
                    break;
                  case "categoryProduct":
                    this.categoryProductStatus = true;
                    this.categoryName = category;
                    break;
                }
            },
            modalToggle(m, id){
              this.chosenModal = null;
              this.popoverStatus = false;

              if(m=="createCategory"){
                this.chosenModal= "createCategory";
                this.idForModal= id;
              }

              if(m=="deleteProduct"){
                this.chosenModal= "deleteProduct";
                this.idForModal= id;
              }

              if(m=="editCategory"){
                this.chosenModal= "editCategory";
                this.idForModal= id;
              }

              if(m=="deleteCategory"){
                this.chosenModal= "deleteCategory";
                this.idForModal= id;
              }

              this.modalStatus = !this.modalStatus;
            },
            showChosenProductBranch(status, id){
                this.selectItem("product");
                this.showProductBranches (status, id);
            },
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
    height: 85%;
    margin: 30px auto 0 auto;
    box-shadow: 1px 1px 4px 2px #000;
    padding: 20px 15px;
}
.branch-nav{
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0 0 0;
    border-bottom: 2px solid #4fb9af;
}
.branch-nav .nav-item{
    margin: 0 10px;
    text-decoration: none;
    cursor: pointer;
    color: #000;
}
.active{
    position: relative;
    border: 2px solid #4fb9af;
    border-style: solid solid none solid;
}
.active::before{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 6px;
    background: #fff;
}
.branch-nav .nav-item h4{
    padding: 5px 20px;
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
    .branch-nav .nav-item h4{
        font-size: 0.8rem;
        padding: 5px 6px;
    }
    .btn-box button{
        padding: 5px 8px;
        font-size: 0.6rem;
    }
}
@media (max-width : 400px) {
    .main {
        position:fixed;
        top:0;
        left:0;
        width: 100%;
    } 
    .branch-nav .nav-item{
        margin: 0 5px;
    }
}

</style>
