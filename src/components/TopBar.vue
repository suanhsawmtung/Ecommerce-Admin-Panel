<template>
    <transition name="top" appear>
      <div class="topBar" >
          <div class="toggle"  @click="toggle(getToggleStatus)" >
              <i class="fa-solid fa-bars"></i>
          </div>
          <div class="searchBox">
            <input type="text" class="search" placeholder="Search here">
          </div>
          <div class="imgBox">
            <img src="../assets/logo.png" alt="" class="img">
          </div>
      </div>
    </transition>
   </template>
   
   <script>
      import { mapGetters } from "vuex";
      import { mapActions } from "vuex";
      export default {
          name : 'TopBar',
          methods: {
             ...mapActions(["toggle"]),
          },
          computed: {
            ...mapGetters(["getToggleStatus"]),
          },
      }
   </script>
   
   <style scoped>
    .topBar{
      width: 100%;
      position: relative;
      top: 0;
      left:0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition:0.5s;
    }
    .topBar .toggle{
      width: 60px;
      height:60px;
      line-height: 60px;
      text-align: center;
      font-size: 25px;
      cursor: pointer;
    }
    .topBar .searchBox{
      position:relative;
      width: 500px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .search {
      outline: none;
      border: 2px solid #000;
      border-radius : 30px;
      width:80%;
      height:70%;
      padding-left:30px;
    }
    .searchBox::before{
      content:"\f002";
      font-family: fontAwesome;
      position:absolute;
      top:1px;
      left:60px;
      color:#5a5456;
    }
    .imgBox{
      width:80px;
      height:60px;
      object-fit: cover;
    }
    .imgBox .img{
      width: 80%;
      height: 100%;
    }
  
    /* top animation */
    .top-enter-from{
      opacity: 0;
      transform: translateY(-60px);
    }
    .top-enter-active{
      transition: all 0.4s ease 0.3s;
    }
  
    /* now, make it responsive */
    @media (max-width: 991px) {
      .topBar .toggle{
        position: absolute;
        top : -60px;
      }
    }
    @media (max-width: 768px) {
      .imgBox{
        width:60px;
        height:40px;
      }
    }
    @media (max-width: 660px) {
      .search{
        padding-left: 40px;
      }
      .topBar .searchBox{
        width: 300px;
        height: 60px;
        line-height: 60px;
      }
      .searchBox::before{
        left:44px;
      }
    }
    @media (max-width : 390px) {
      .topBar .toggle{
        position: relative;
        top : 0;
      }
    }
   </style>
   