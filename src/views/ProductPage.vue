<template>
      <div class="product">
        <div class="main" :class="{ 'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <div class="table-box">
                <div class="product-nav">
                    <router-link to="/productTable" class="nav-link" active-class="active">
                        <h4>Product Lists</h4>
                    </router-link>
                    <router-link to="{ name: 'createProduct' }" class="nav-link" active-class="active">
                        <h4>Create New Product</h4>
                    </router-link>
                    <!-- <router-link to="" class="nav-link" active-class="active">
                        <h4>Product's Detail</h4>
                    </router-link>
                    <router-link to="" class="nav-link" active-class="active">
                        <h4>Update Product</h4>
                    </router-link> -->
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import TopBar from "../components/TopBar.vue";
    export default {
        name : 'ProductPage',
        components : { TopBar },
        computed: {
            ...mapGetters(["getToggleStatus"])
        },
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
    border-bottom: 2px solid #000;
}
.product-nav .nav-link{
    margin: 0 10px;
    text-decoration: none;
    color: #000;
}
.product-nav .nav-link.active{
    border-width: 2px;
    border-color: #000;
    border-style: solid solid none solid;
}
.product-nav .nav-link h4{
    position: relative;
    padding: 5px 20px;
}
.product-nav .nav-link h4::before{
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 6px;
    background: transparent;
}
.product-nav .nav-link.active h4::before{
    bottom: -3px;
    background: #fff;
}

</style>
