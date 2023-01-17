<template>
    <div class="branch-parent">
        <div v-show="createCategoryStatus" class="create-modal">
             <Modal @close="modalToggle('create')">
                <label for="categoryName">Create New Category</label>
                <input type="text" id="categoryName" placeholder="Enter category name..." v-model="categoryName">
                <small style="color: red" v-show="createError">Category name is required.</small>
                <div class="btn-box">
                    <button @click="createNewCategory(categoryName)" >Create</button>
                    <button @click="modalToggle('create')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div v-show="updateCategoryStatus" class="update-modal">
             <Modal @close="modalToggle('update')">
                <label for="categoryName">Update Category</label>
                <input type="text" id="categoryName" :placeholder="category.title" v-model="categoryTitle">
                <small style="color: red" v-show="updateError">New category name is required.</small>
                <div class="btn-box">
                    <button @click="updateChosenCategory(category.id, categoryTitle)" >Update</button>
                    <button @click="modalToggle('update')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div v-show="deleteCategoryStatus" class="delete-modal">
             <Modal @close="modalToggle('delete')">
               <h4>Do you really want to delete {{ category.title }} permanantly?</h4>
               <div class="btn-box">
                    <button  @click="deleteChosenCategory(category.id)">Delete</button>
                    <button @click="modalToggle('delete')">Cancel</button>
                </div>
             </Modal>
        </div>
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <CategoryList @showModal="showModal" />
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import TopBar from "../components/TopBar.vue";
    import Modal from "../components/AllModals.vue";
    import CategoryList from "../components/category-branches/CategoryList.vue";

    export default {
       name : 'CategoryPage', 
       data () {
        return {
            createCategoryStatus: false,
            updateCategoryStatus: false,
            deleteCategoryStatus: false,

            createError: false,
            updateError: false,

            category: {},
            categoryName: "",
            categoryTitle: "",
        }
       },
       components: { TopBar, CategoryList, Modal },
       computed: {
            ...mapGetters(["getToggleStatus"]),
            ...mapGetters("Products", ["getProducts"]),
            ...mapGetters("Categories", ["getCategories"]),
       },
       methods: {
            ...mapActions("Products", ["changeCategoryTitleOfProduct"]),
            ...mapActions("Categories", ["createCategory", "deleteCategory", "updateCategory"]),
            showModal(status, id){
                this.category = {};
                this.categoryName = "";
                this.categoryTitle = "";

                if(id !== null){
                    let category = this.getCategories.filter(category=>{
                        return category.id === id;
                    });
                    this.category = category[0];
                }
                this.modalToggle(status);
            },
            createNewCategory(categoryTitle){
                if(this.categoryName===""){
                    this.createError = true;
                    return;
                }

                let newCategory = {
                    "title": categoryTitle
                }
                
                this.createCategory(newCategory);
                this.modalToggle("create");
            },
            deleteChosenCategory(id){
                if(!this.getProducts.some(product => product.category_id === id)){
                   this.deleteCategory(id);
                   this.modalToggle("delete");
                   return;
                }
                this.modalToggle("delete");
            },
            async updateChosenCategory(categoryId, categoryTitle){
                if(this.categoryTitle===""){
                    this.updateError = true;
                    return;
                }

                let newCategory = {
                   "id": categoryId,
                   "title": categoryTitle
                }
                await this.updateCategory(newCategory);
                this.getProducts.forEach(product => {
                    this.getCategories.forEach(category=>{
                        if(product.category_id === category.id && product.category_title !== category.title){
                            product.category_title = category.title;
                        }
                    })
                });
                this.changeCategoryTitleOfProduct(this.getProducts);
                this.modalToggle("update");
            },
            modalToggle(status){
                if(status === "create"){
                    this.createCategoryStatus = ! this.createCategoryStatus;
                    this.clearValidationMessage();
                    return;
                }
                if(status === "update"){
                    this.updateCategoryStatus = ! this.updateCategoryStatus;
                    this.clearValidationMessage();
                    return;
                }
                if(status === "delete"){
                    this.deleteCategoryStatus = ! this.deleteCategoryStatus;
                    return;
                }
            },
            clearValidationMessage(){
                this.createError = false;
                this.updateError = false;
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

    /* modals */
    .delete-modal{
       width: 100vw;
       height: 100vh;
    }
    .delete-modal h4{
        margin-bottom: 10px;
        font-size: 1rem;
     }
   .btn-box button{
        width: 100px;
        padding: 10px ;
        border-radius: 5px;
        margin-right: 10px;
        background: #4fb9af;
        color: #fff;
        border: none
    }
    .btn-box button:active{
        transform : scale(0.9);
        background: #b3e0dc;
    }
    .create-modal label,
    .update-modal label{
        display: block;
        text-align: start;
        margin-bottom: 10px;
        font-size : 1rem;
        color : teal;
        font-weight: 800;
        align-self: flex-start;
    }
    .create-modal input,
    .update-modal input{
        display: inline-block;
        width: 100%;
        padding : 10px 8px;
        border-radius: 6px;
        border : 1px solid #b3e0dc;
    }
    .btn-box{
        margin-top: 15px;
    }

    /* make it response */
    @media (max-width: 650px) {
        .delete-modal h4{
            font-size: 0.8rem;
        }
        .btn-box button{
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

