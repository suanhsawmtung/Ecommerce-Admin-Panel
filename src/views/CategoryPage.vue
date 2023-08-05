<template>
    <div class="branch-parent">

        <!-- Toast Alert -->
        <transition name="toast">
            <div class="toast" v-if="toastStatus">
                <h3 >{{ toastMessage }}</h3>
            </div>
        </transition>
        <!-- Toast Alert End -->

        <!-- Create Modal-->
        <CreateModal v-if="createCategoryStatus" @done="modalToggle" @close="closeModals"></CreateModal>

        <!-- Delete Modal-->
        <DeleteModal v-if="deleteCategoryStatus" :category="category" @done="modalToggle" @close="closeModals"></DeleteModal>

        <!-- Update Modal-->
        <UpdateModal v-if="updateCategoryStatus" :category="category" @done="modalToggle" @close="closeModals"></UpdateModal>

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
import CategoryList from "../components/category-branches/CategoryList.vue";
import CreateModal from "../components/category-branches/CreateModal.vue";
import DeleteModal from "../components/category-branches/DeleteModal.vue";
import UpdateModal from "../components/category-branches/UpdateModal.vue";
import axios from "axios";

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

            category: null,

        }
    },
    components: { TopBar, CategoryList, CreateModal, DeleteModal, UpdateModal },
    computed: {
        ...mapGetters(["getToggleStatus"]),
    },
    methods: {
        ...mapActions("Categories", ["allCategories"]),

        /* Show Modal */
        async showModal(status, id){

            /* Choose Category To Show On Modal */
            if(id !== null){
                await this.takeACategory(id);
            }

            this.modalToggle(status);
        },

            /* Delete Category */
        deleteChosenCategory(id){
            this.deleteCategory(id);
            this.modalToggle("delete");
            
            this.toastMessage = "Delete category success. ";
            setTimeout(() => this.toastStatus = true, 1000);
            setTimeout(() => this.toastStatus = false, 3000);
            return;
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
            }else if(status === "update"){
                this.updateCategoryStatus = ! this.updateCategoryStatus;
                this.clearValidationMessage();
                return;
            }else if(status === "delete"){
                this.deleteCategoryStatus = ! this.deleteCategoryStatus;
                return;
            }else {
                let statusArr = status.split("-");
                this.toastMessage = statusArr.join(" ");
                this.closeModals();
                this.toastStatus = true;
                setTimeout(() => this.toastStatus = false, 3000);
            }
        },

        /* Clear Validation Message */
        clearValidationMessage(){
            this.createError = false;
            this.updateError = false;
        },

        /* Close all Categoy Modal */
        closeModals(){
            this.createCategoryStatus = false;
            this.updateCategoryStatus = false;
            this.deleteCategoryStatus = false;
        },

        /* Take a category */
        async takeACategory(id){
            let { data } = await axios.get(`http://165.22.48.33/api/admin/category/takeDataToEdit/${id}`);
            this.category = data;
        }
    },
    mounted(){
        this.allCategories();
    }
}
</script>

<style src="../assets/css/category.css" scoped></style>

