<template>
    <div class="branch-parent">

        <!-- Toast Alert -->
        <transition name="toast">
            <div class="toast" v-show="toastStatus">
                <h3 >{{ toastMessage }}</h3>
            </div>
        </transition>
        <!-- Toast Alert End -->

        <!-- Category Create Modal -->
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
        <!-- Category Create Modal End -->

        <!-- Category Update Modal -->
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
        <!-- Category Update Modal End -->

        <!-- Category Delete Modal -->
        <div v-show="deleteCategoryStatus" class="delete-modal">
             <Modal @close="modalToggle('delete')">
               <h4>Do you really want to delete {{ category.title }} permanantly?</h4>
               <div class="btn-box">
                    <button  @click="deleteChosenCategory(category.id)">Delete</button>
                    <button @click="modalToggle('delete')">Cancel</button>
                </div>
             </Modal>
        </div>
        <!-- Category Delete Modal End -->

        <!-- Main -->
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">

            <!-- Top Bar -->
            <TopBar></TopBar>

            <!-- Category List -->
            <CategoryList @showModal="showModal" />

        </div>
        <!-- Main End -->
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
            
        /* Status For Show Associated Modal Or Not */
            createCategoryStatus: false,
            updateCategoryStatus: false,
            deleteCategoryStatus: false,

        /* Validation Message Status For Input Of Modal */
            createError: false,
            updateError: false,

        /* Status For Show Toast And Toast Message */
            toastStatus: false,
            toastMessage: "",

        /* Use For Cateory CRUD And Modal */
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

              /* Show Modal */
            showModal(status, id){
                this.category = {};
                this.categoryName = "";
                this.categoryTitle = "";

                  /* Choose Category To Show On Modal */
                if(id !== null){
                    let category = this.getCategories.filter(category=>{
                        return category.id === id;
                    });
                    this.category = category[0];
                }

                this.modalToggle(status);
            },

              /* Create New Category */
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

                this.toastMessage = "New category created. ";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
            },

              /* Delete Category */
            deleteChosenCategory(id){
                if(!this.getProducts.some(product => product.category_id === id)){
                   this.deleteCategory(id);
                   this.modalToggle("delete");
                   
                   this.toastMessage = "Delete category success. ";
                   setTimeout(() => this.toastStatus = true, 1000);
                   setTimeout(() => this.toastStatus = false, 3000);
                   return;
                }
                
                this.modalToggle("delete");
            },

              /* Update Category */
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
                
                this.toastMessage = "Update category success. ";
                setTimeout(() => this.toastStatus = true, 1000);
                setTimeout(() => this.toastStatus = false, 3000);
            },

              /* To Open and Close Modal */
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

              /* Clear Validation Message */
            clearValidationMessage(){
                this.createError = false;
                this.updateError = false;
            },
       },
    }
</script>

<style src="../assets/css/category.css" scoped></style>

