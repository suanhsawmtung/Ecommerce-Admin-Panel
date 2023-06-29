<template>
    <div class="category-box">
        <header v-if="getCategories">
            <h1>Category</h1>
            <button @click="$emit('showModal', 'create', null)">Create Category</button>
        </header>
        <div v-if="getCategories">
            <ul v-if="getCategories.length !== 0">
                <li v-for="(category, index) in paginatedCategories" :key="index">
                    <h3>{{ category.title }}</h3>
                    <div class="btn-box">
                        <button @click="$emit('showModal', 'update', category.id)">Edit Category</button>
                        <button @click="$emit('showModal', 'delete', category.id)">Delete Category</button>
                    </div>
                </li>
            </ul>
            <div class="noData" v-else>
                <h1>There is no category here.</h1>
            </div>
        </div>
        <div class="noData" v-else>
            <h1>Loading</h1>
        </div>
        <Paginator v-if="getCategories && getCategories.length > perPage" @categoryPageChanged="onCategorytPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getCategories.length/perPage) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Paginator from "../data-paginators/CategoryPaginator.vue";

export default {
    name: "CategoryList",
    data () {
        return {
            currentPage: 1,
            perPage: 3,
            maxVisibleButton: 3,
        }
        },
    components: { Paginator },
    computed: {
        ...mapGetters("Categories", ["getCategories", "paginatedCategories", "getCategoryCurrentPage"]),
    },
    methods: {
        ...mapActions("Categories", ["categoryPaginator"]),
        onCategorytPageChange(currentPage){
            this.currentPage = currentPage;
            let page = {
                currentPage: this.currentPage,
                perPage: this.perPage
            }
            this.categoryPaginator(page);
        },
    },
    mounted () {
        this.currentPage=this.getCategoryCurrentPage;
    }
    
}
</script>

<style scoped>
    .category-box{
        height: 100%;
    }
    ul, header{
        margin: 30px auto;
        padding: 0;
        max-width: 600px;
    }
    ul{
        height: 50%;
    }
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ul li{
        list-style-type: none;
        background: #b3e0dc;
        padding: 16px;
        margin: 16px 0;
        border-radius: 4px;
    }
    ul li h3{
        margin: 0 0 10px; 
        text-transform: capitalize;
    }
    header h1{
        text-transform : uppercase;
        color: teal;
    }
    ul li .btn-box button,
    header button{
        margin: 0 10px 0 0;
        padding: 8px;
        border: none;
        border-radius: 2px;
        background: #4fb9af;
        transition: 0.2s;
    }
    ul li .btn-box button:active,
    header button:active{
        transform: scale(0.9);
    }
    .noData{
        width: 100%;
        /* height: 80%; */
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    }
    .noData h1{
        color: teal;
    }

     /* make it response */
     @media (max-width: 750px) {
        ul, header{
            max-width: 450px;
        }
    }

    @media (max-width: 600px) {
        ul, header{
            max-width: 400px;
        }
        header h1{
            font-size: 1.5rem;
        }
    }
    @media (max-width: 510px) {
        ul, header{
            max-width: 300px;
        }
    }
    @media (max-width: 485px) {
        .noData h1{
            font-size: 1.5rem;
        }
    }
</style>
