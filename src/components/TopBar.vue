<template>
    <transition name="top" appear>
      <div class="topBar" >
          <div class="toggle" @click="toggle(getToggleStatus)" >
              <i class="fa-solid fa-bars"></i>
          </div>
          <div class="searchBox">
            <input type="text" class="search" placeholder="Search here">
            <!-- <table class="searchDataBox" v-show="searchKey.length!== 0">
              <tbody class="searchData">
                <tr v-for="(product, index) in setSearchData" :key="index">
                  <td class="title"><small>{{ product.title }}</small></td>
                  <td class="imgBox">
                    <img :src="product.image" alt="">
                  </td>
                </tr>
              </tbody>
            </table> -->
          </div>
          <div class="iconBox">
              <div class="user-icon">
                <i class="fa-regular fa-user"></i>
              </div>
              <div class="user-name">
                {{ $store.getters.getMyData.name }}
              </div>
          </div>
      </div>
    </transition>
   </template>
   
   <script>
      import { mapGetters, mapActions } from "vuex";
      export default {
          name : 'TopBar',
          data () {
            return {
              // searchKey: "",
              // searchData: [],
            }
          },
          methods: {
             ...mapActions(["toggle"]),
          },
          computed: {
            ...mapGetters(["getToggleStatus"]),
            ...mapGetters('Products', ["getProducts"]),
            // setSearchData(){
            //     return this.searchData.filter(product => product.title.toLowerCase().includes(this.searchKey.toLowerCase()));
            // }
          },
          // mounted () {
          //   this.searchData = this.getProducts;
          // }
  
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
      border: 2px solid #555555;
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
    .search .searchDataBox{
      position: fixed;
      top: 80px;
      left: 0px;
      background: red;
      box-shadow:  1px 1px 5px 0.2px #000;
      border-radius: 10px;
      margin: 0 0 0 15px;
      padding: 10px;
      z-index: 99;
    }
    .searchData tr{
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    .searchData tr .title{
      width: 60%;
      text-align: start;
      overflow: hidden;
      padding: 5px;
      color: #777777;
    }
    .searchData .imgBox{
      object-fit: cover;
      width: 10%;
      overflow: hidden;
      padding: 5px;
      color: #777777;
    }
    .imgBox img{
      width: 50%;
    }
    .iconBox{
      width:220px;
      height:60px;
      display:flex;
      justify-content:flex-end;
      padding: 0 15px;
    }
    .iconBox .user-icon,
    .iconBox .user-name{
      height: 100%;
      margin-right: 15px;
      padding: 10px 0;
      position: relative;
      display:flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .iconBox .user-icon i,
    .iconBox .user-name i{
     font-size: 1.5rem;
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
        display: none;
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
        display: block;
      }
    }
   </style>
   