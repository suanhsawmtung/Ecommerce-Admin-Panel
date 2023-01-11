<template>
    <div class="branch-parent">
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <header>
                <h1>Category</h1>
                <button>Create Category</button>
            </header>
            <ul>
                <li v-for="(category, index) in paginatedCategories" :key="index">
                    <h3>{{ category.title }}</h3>
                    <div class="btn-box">
                        <button>Edit Category</button>
                        <button>Delete Category</button>
                    </div>
                </li>
            </ul>
            <Paginator v-show="getCategories.length > perPage" @categoryPageChanged="onCategorytPageChange" :currentPage="currentPage" :totalPages=Math.ceil(getCategories.length/perPage) :perPage="perPage" :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TopBar from "../components/TopBar.vue";
import Paginator from "../components/data-paginators/CategoryPaginator.vue";
    export default {
       name : 'CategoryPage', 
       data () {
        return {
            currentPage: 1,
            perPage: 3,
            maxVisibleButton: 3,
        }
       },
       components: { TopBar, Paginator },
       computed: {
            ...mapGetters(["getToggleStatus"]),
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
    ul, header{
        margin: 30px auto;
        padding: 0;
        max-width: 600px;
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

    /* make it response */
    @media (max-width: 768px) {
        .modal-inner{
            width: 300px;
            padding: 8px;
            border-radius: 8px;
        }
        .btn-box{
            padding: 7px 4px;
        }
        .btn-box button{
            padding: 6px 10px;
            font-size: 0.7rem;
        }
        table tr td {
            font-size: 0.9rem;
            padding: 8px 5px;
        }
    }
    @media (max-width: 650px) {
        .modal-inner{
            width: 200px;
            padding: 8px;
            border-radius: 6px;
        }
        .btn-box button{
            padding: 5px 8px;
            font-size: 0.6rem;
        }
        .table-box{
            columns: 1;
        }
    }
</style>

