<template>
    <div class="modal-box-one">
        <Modal @close="$emit('close')">
            <h2>Filter By</h2>
            <div class="btn-box">
                <button @click="filterAllProducts()">All</button>
                <button v-for="(category, index) in categories" :key="index" @click="filterProducts(category.id)">
                    {{ category.title }}
                </button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Modal from '../AllModals.vue';
export default {
    props: {
        categories: {
            required: true,
            type: Array
        }
    },
    components: { Modal },
    methods: {
        ...mapActions("Products", ["allProducts", "filterProductsByCategory"]),
        async filterProducts(id) {
            await this.filterProductsByCategory(id);
            this.$emit("close");
        },
        async filterAllProducts() {
            await this.allProducts('http://localhost:8000/api/product/getAllProducts');
            this.$emit("close");
        },
    },
}
</script>

<style coped>
 h2{
    color: teal;
    border-bottom: 1px solid teal;
    padding-bottom: 10px;
    margin-bottom: 10px;
 }

 .btn-box{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
 }

.modal-box-one h4 {
    margin-bottom: 10px;
    font-size: 1rem;
}

.modal-box-one button {
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    background: #4fb9af;
    color: #fff;
    border: none
}

.modal-box-one button:active {
    transform: scale(0.9);
    background: #b3e0dc;
}

@media (max-width: 650px) {
    .btn-box button {
        padding: 5px 8px;
        font-size: 0.6rem;
    }
    .modal-box-one h4 {
        font-size: 0.8rem;
    }
    .modal-box-one button {
        width: 80px;
        padding: 8px;
    }
}

</style>