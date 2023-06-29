<template>
  <div>
    
    <!-- Side Bar Component -->
    <SideBar v-if="this.$route.path !== '/' && this.$route.name !== '404'"></SideBar>

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
  import { mapActions, mapGetters } from "vuex";
import SideBar from "./components/SideNavBar.vue";
  export default {
    components: {SideBar},
    computed: {
      ...mapGetters(["getMyData"]),
    },
    methods: {
      ...mapActions(["myProfile"]),
    },
    mounted () {
      if(localStorage.getItem("TOKEN") && !this.getMyData){
        this.myProfile();
      }
    },
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
