<template>
        <!-- Category Create Modal -->
        <div class="create-modal">
            <Modal @close="$emit('close')">
                <label for="categoryName">Create New Category</label>
                <input type="text" id="categoryName" placeholder="Enter category name..." v-model="categoryName">
                <small style="color: red" v-show="createError">Category name is required.</small>
                <div class="btn-box">
                    <button @click="createNewCategory(categoryName)" >Create</button>
                    <button @click="$emit('close')">Cancel</button>
                </div>
            </Modal>
        </div>
        <!-- Category Create Modal End -->
 </template>

<script>
import { mapActions } from 'vuex';
import Modal from "../AllModals.vue";

export default {
    data: () => {
        return {
            categoryName: "",
            createError: false,
        }
    },
    components: { Modal },
    methods: {
        ...mapActions("Categories", ["createCategory"]),
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
            this.$emit("done", "Created-new-category.");
        },
    }
}
</script>

<style src="../../assets/css/category.css" scoped></style>