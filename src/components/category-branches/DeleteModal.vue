<template>
    <!-- Category Create Modal -->
    <div class="delete-modal">
        <Modal @close="$emit('close')">
            <h4 >Do you really want to delete  permanantly?</h4>
            <div class="btn-box">
                <button  @click="deleteChosenCategory(category.id)" >Delete</button>
                <button @click="$emit('close')" >Cancel</button>
            </div>
        </Modal>
    </div>
    <!-- Category Create Modal End -->
</template>

<script>
import { mapActions } from 'vuex';
import Modal from "../AllModals.vue";

export default {
    props: {
        category: {
            type: Object,
            required: true
        },
    },
    components: { Modal },
    methods: {
        ...mapActions("Categories", ["deleteCategory",]),
        /* Delete Category */
        deleteChosenCategory(id){
            this.deleteCategory(id);
            this.$emit("done", "Deleted-category.");
        },
    }
}
</script>

<style src="../../assets/css/category.css" scoped></style>