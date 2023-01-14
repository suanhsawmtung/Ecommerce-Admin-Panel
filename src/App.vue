<template>
  <div>
    <SideBar v-show="this.$route.path !== '/' "></SideBar>
    <router-view v-slot = "{ Component }">
      <transition name="route" mode="out-in" >
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import SideBar from "./components/SideNavBar.vue";
  // import setAuthHeader from  "./utils/setAuthHeader";
  import { mapActions } from "vuex";

  export default {
    components: {SideBar},
    methods: {
      ...mapActions("Products", ["allProducts"]),
      ...mapActions("Categories", ["allCategories"]),
      getAllDatas(){
          this.allProducts();
          this.allCategories();
          this.$store.dispatch("allCustomers");
      },
      checkingLogIn(){
          // setAuthHeader(localStorage.getItem("TOKEN"));
          // this.getAllDatas();
          this.$router.push({ path: '/' }); 
          // setTimeout(() => this.$router.push({ path: '/overview' }), 5000);
      }
    },
    mounted () {
      this.checkingLogIn();
    }
  }

</script>

<style >
  *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    overflow : hidden;
  }

  /* route-transition */
  .route-enter-from{
    opacity: 0;
    /* transform: translateX(100px); */
  }
  .route-enter-to{
    opacity: 1;
    /* transform: translateX(0); */
  }
  .route-enter-active{
    transition: all 0.3s ease-out;
  }
  .route-leave-from{
    opacity: 1;
    /* transform: translateX(0); */
  }
  .route-leave-to{
    opacity: 0;
    /* transform: translateX(-100px); */
  }
  .route-leave-active{
    transition: all 0.3s ease-in;
  }
</style>
