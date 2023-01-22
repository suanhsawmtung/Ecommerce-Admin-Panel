<template>
  <div>
    
    <!-- Side Bar Component -->
    <SideBar v-show="this.$route.path !== '/' "></SideBar>

    <!-- All Route View -->
    <router-view v-slot = "{ Component }">

      <!-- Router Animation -->
      <transition name="route" mode="out-in" >

        <component :is="Component"></component>
        
      </transition>
      <!-- Router Animation End -->
    
    </router-view>
    <!-- All Route View End -->

  </div>
</template>

<script>
  import SideBar from "./components/SideNavBar.vue";
  export default {
    components: {SideBar},
    methods: {

      /* Check Log In Or Not */
      checkingLogIn(){
          this.$router.push({ path: '/' }); 
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
  }
  .route-enter-to{
    opacity: 1;
  }
  .route-enter-active{
    transition: all 0.3s ease-out;
  }
  .route-leave-from{
    opacity: 1;
  }
  .route-leave-to{
    opacity: 0;
  }
  .route-leave-active{
    transition: all 0.3s ease-in;
  }
</style>
