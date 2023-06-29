<template>
    <transition name="top" appear>
      <div class="topBar" >
          <div class="toggle" @click="toggle(getToggleStatus)" >
              <i class="fa-solid fa-bars"></i>
          </div>
          <div class="searchBox" v-if="this.$route.path !== '/overview' && this.$route.path !== '/setting'">
            <input type="text" class="search" placeholder="Search here" @input="getSearchResult(this.$route.name)" v-model="searchKey">
          </div>
          <div class="iconBox">
              <div class="user-icon">
                <i class="fa-regular fa-user"></i>
              </div>
              <div class="user-name" v-if="getMyData">
                {{ getMyData.name }}
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
            searchKey: '',
            queryTimeout: null,
          }
        },
        methods: {
            ...mapActions(["toggle", "myProfile", "searchUser"]),
            ...mapActions("Categories", ["searchCategory"]),
            ...mapActions("Products", ["searchProduct"]),
            getSearchResult(routeName){
              clearTimeout(this.queryTimeout);
              this.queryTimeout = setTimeout(async() => {
                switch(routeName){
                  case "category":
                    await this.searchCategory(this.searchKey);
                    break;
                  case "product":
                    await this.searchProduct(this.searchKey);
                    break;
                  case "user":
                    await this.searchUser(this.searchKey);
                    break;
                }
              }, 500);
            }
        },
        computed: {
          ...mapGetters(["getToggleStatus", "getMyData"]),
        },
    }
   </script>
   
   <style scoped>
   .search-item{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
   }
   .search-item span{
    width: 75%;
    color: teal;
   }
   .search-item img{
    width: 20%;
   }
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
    .iconBox .user-name{
      text-transform: uppercase;
    }
    .iconBox .user-icon i{
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
      .user-name{
        font-size: 0.8rem;
      }
    }
   </style>
   