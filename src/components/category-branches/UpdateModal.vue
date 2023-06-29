<template>
    <!-- Category Update Modal -->
    <div class="update-modal">
        <Modal @close="$emit('close')">
            <label for="categoryName">Update Category</label>
            <input type="text" id="categoryName" v-model="categoryToEdit.title" placeholder="Enter a category" >
            <small style="color: red" v-show="updateError">New category name is required.</small>
            <div class="btn-box">
                <button @click="updateChosenCategory(category.id, category.title)" >Update</button>
                <button @click="$emit('close')">Cancel</button>
            </div>
        </Modal>
    </div>
    <!-- Category Update Modal End -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from "../AllModals.vue";

export default {
data: () => {
    return {
        updateError: false,
    }
},
props: {
    category: {
        type: Object,
        required: true
    },
},
components: { Modal },
computed: {
    ...mapGetters("Products", ["getProducts"]),
    ...mapGetters("Categories", ["getCategories"]),
    categoryToEdit(){
        return this.category;
    }
},
methods: {
    ...mapActions("Categories", ["updateCategory"]),

        /* Update Category */
        async updateChosenCategory(categoryId, categoryTitle){
            if(this.category.title===""){
                this.updateError = true;
                return;
            }

            let newCategory = {
                "id": categoryId,
                "title": categoryTitle
            }

            await this.updateCategory(newCategory);
            this.$emit("done", "Updated-category.");
    },
}
}
</script>

<style src="../../assets/css/category.css" scoped></style>