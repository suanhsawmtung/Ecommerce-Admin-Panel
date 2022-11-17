<template>
      <div class="product">
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <div class="table-box">
                <div class="product-nav">
                    <div class="nav-item" :class="{ 'active' : listStatus }"  @click="selectItem('list')">
                        <h4>Product Lists</h4>
                    </div>
                    <!-- <div class="nav-item" :class="{ 'active' : createStatus }"  >
                       <h4>Create New Product</h4>
                    </div> -->
                    <div class="nav-item" :class="{ 'active' : categoryStatus }" @click="selectItem('category')" >
                       <h4>Category</h4>
                    </div>
                </div>
                <ProductTable  v-show="listStatus"></ProductTable>
                <CategoryTable v-show="categoryStatus"></CategoryTable>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import ProductTable from "../components/branches/ProductTable.vue";
    import CategoryTable from "../components/branches/CategoryTable.vue";
    export default {
        name : 'ProductPage',
        data () {
            return {
                listStatus : true,
                categoryStatus : false
            }
        },
        components : { TopBar, ProductTable, CategoryTable },
        computed: {
            ...mapGetters(["getToggleStatus"])
        },
        methods: {
            selectItem (item){
                this.listStatus = false;
                this.categoryStatus = false;

                if(item == 'list'){
                    this.listStatus = true;
                    return;
                }

                if(item == 'category'){
                    this.categoryStatus = true;
                    return;
                }
            }
        }
    }
</script>

<style scoped>
.product{
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
    margin: 30px auto 0 auto;
    box-shadow: 1px 1px 4px 2px #000;
    padding: 20px 15px;
}
.product-nav{
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0 0 0;
    border-bottom: 2px solid #4fb9af;
}
.product-nav .nav-item{
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
.product-nav .nav-item h4{
    padding: 5px 20px;
}

/* make it responsive */
@media (max-width: 991px) {

}
@media (max-width : 768px) {

}
@media (max-width : 650px) {
    .product-nav .nav-item h4{
        font-size: 0.8rem;
        padding: 5px 6px;
    }
}
@media (max-width : 400px) {
    .main {
        position:fixed;
        top:0;
        left:0;
        width: 100%;
    } 
    .product-nav .nav-item{
        margin: 0 5px;
    }
}

</style>
