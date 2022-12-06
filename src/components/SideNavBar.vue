 <template>
    <transition name="side" appear>
        <div class="sideBar" :class="{'toggleWidth':getToggleStatus}">
            <div class="title">
                <div class="icon"><i class="fa-brands fa-vuejs"></i></div>
                <div class="text-title">Brand Name</div>
                <div class="toggle"  @click="toggle(getToggleStatus)">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            <ul>
                <li>
                    <router-link to="/" active-class="active" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-house-chimney"></i></div>
                            <div class="text-title">Overview</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/product" active-class="active" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-list-ul"></i></div>
                            <div class="text-title">Products</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/customer" active-class="active" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-user"></i></div>
                            <div class="text-title">Customers</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/message" active-class="active" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-message"></i></div>
                            <div class="text-title">Message</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/setting" active-class="active" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-gear"></i></div>
                            <div class="text-title">Settings</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="#" class="side-btn">
                        <div class="link-container">
                            <div class="icon"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                            <div class="text-title">Sign Out</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </transition>
 </template>
 
 <script>
    import { mapGetters } from "vuex";
    import { mapActions } from "vuex";
    export default {
        name : 'SideNavBar',
        computed: {
            ...mapGetters(["getToggleStatus", "getProducts"]),
        },
        methods: {
            ...mapActions(["toggle", "allProducts"]),
        },
        mounted () {
            this.toggle(true);
            window.addEventListener("resize",this.toggle);
        }
    }
 </script>
 
 <style scoped>
   .sideBar{
        position: fixed;
        width:250px;
        height:100vh;
        top : 0;
        left : 0;
        background-color: teal;
        overflow: hidden;
        z-index: 1000;
        transition: 0.5s;
   }
   .toggleWidth{
        width:70px;
   }
   .sideBar .title {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
   }
   .sideBar .title .icon{
        position:relative;
        left: 10px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 40px;
        font-weight:400;
        text-align: center;   
   }
   .sideBar .title .text-title{
        position: absolute;
        left:70px;
        height:60px;
        line-height:60px;
        font-size: 25px;
        font-weight: 800;
        white-space: nowrap;
   }
   .sideBar .toggle{
        position: absolute;
        top: -60px;
        right: 0px;
        width: 60px;
        height:60px;
        line-height: 60px;
        text-align: center;
        font-size: 25px;
        cursor: pointer;
        z-index: 500;
  }
   .siderBar ul li{
        cursor:pointer;
        margin-top: 20px;
   }
   .side-btn {
        outline: none;
        text-decoration:none;
   }
   .sideBar ul li .side-btn .link-container {
        position: relative;
        display: flex;
        align-items: center;    
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
   }
    .side-btn .link-container .icon{
        position:relative;
        left:10px;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        font-weight:400;
        color: #fff;
        text-align:center;
    }
    .side-btn .link-container .text-title{
        position: absolute;
        left:70px;
        height:50px;
        line-height:50px;
        font-size: 16px;
        font-weight: 400;
        color:#fff;
        white-space: nowrap;
    }
    .side-btn.active .link-container{
        background-color: #fff;
    }
    .side-btn.active .link-container::before{
        content: " ";
        width: 40px;
        height: 40px;
        position: absolute;
        top : -40px;
        right: 0;
        z-index: -5;
        border-radius:50%;
        background-color: transparent;
        box-shadow: 20px 20px 0 0 #fff;
    }
    .side-btn.active .link-container::after{
        content: " ";
        width: 40px;
        height: 40px;
        position: absolute;
        bottom : -40px;
        right: 0;
        border-radius:50%;
        background-color: transparent;
        box-shadow: 20px -20px 0 0 #fff;
    }

    .side-btn.active .link-container .icon,
    .side-btn.active .link-container .text-title{
        color:teal;
    }

    /* side animation */
    .side-enter-from{
        transform: translateX(-250px);
    }
    .side-enter-active{
        transition: transform 0.2s ease-in;
    }

    /* now, make it responsive */
    @media (max-width : 400px) {
        .sideBar{
            position: absolute;
            width:0px;
        }
        .toggleWidth{
            width:100%;
        }
        .sideBar .toggle{
            top: 0px;
            right: 10px;
          }

    }
  


 </style>
 