 <template>
    <div class="dashboard">
        <div class="main" :class="{'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <transition-group tag="ul" name="cards" appear class="card-container" @before-enter="beforeEnter" @enter="enter">
                <li class="card">
                    <div class="number">
                        <h2>50</h2>
                        <p>Customer Counts</p>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-users"></i>
                    </div>
                </li>
                <li class="card">
                    <div class="number">
                        <h2>25,000 Ks</h2>
                        <p>Today's Income</p>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-dollar-sign"></i>
                    </div>
                </li>
                <li class="card">
                    <div class="number">
                        <h2>2,423,000 Ks</h2>
                        <p>Total Revenue</p>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-sack-dollar"></i>
                    </div>
                </li>
                <li class="card">
                    <div class="number">
                        <h2>204</h2>
                        <p>Pending Orders</p>
                    </div>
                    <div class="icon">
                        <i class="fa-solid fa-cart-arrow-down"></i>
                    </div>
                </li>
            </transition-group>
            <div class="chart-container">
                <SaleChart></SaleChart>
                <ProductChart></ProductChart>
            </div>
        </div>
    </div>
 </template>
 
 <script>
    import { mapGetters } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import SaleChart from "../components/overview-branches/SaleChart.vue";
    import ProductChart from "../components/overview-branches/TopSaleProduct.vue";
    export default {
        name : 'OverviewPage',
        components: {TopBar, SaleChart, ProductChart},
        computed: {
            ...mapGetters(["getToggleStatus"]),
        },
        // setup(){
        //     const beforeEnter = (el) => {
        //         el.style.opacity = 0;
        //         el.style.transform = "scale(0)"
        //     }

        //     const enter = (el) => {
        //         el.style.opacity = 1;
        //         el.style.transform = "scale(1)";
        //         transition-duration : 0.5;
        //         transition-delay : 0.4;
        //     }

        //     return { beforeEnter,enter }
        // }
    }
 </script>
 
 <style scoped >
    .dashboard{
        position:relative;
        top: 0;
        left:0;
        width:100vw;
        height: 100vh;
    }
    .main {
        position:absolute;
        top:0;
        left:250px;
        width: calc(100% - 250px);
        height: 100%;
        transition:0.5s;
    } 
    .toggleWidth{
        width:calc(100% - 70px);
        left: 70px;
    }
    .card-container{
        width:100%;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-gap: 20px;
        margin: 30px 0;
        padding: 0px 15px;
    }
    .card-container .card{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width:1fr;
        height: 100px;
        padding: 5px 15px;
        border-radius: 20px;
        box-shadow: 1px 1px 5px 0.2px #000;
    }
    .card-container .card:hover{
        color:#fff;
        background-color: teal;
    }
    .card-container .card .number h2{
        margin-bottom: 15px;
    }
    .card-container .card .icon{
        font-size:2.5rem
    }
    .chart-container{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        padding: 0 15px;
    }

    /* overView transition */
    /* .cards-enter-from{
        opacity:0;
        transform: scale(0.6);
    }
    .cards-enter-active{
        transition: all 1s ease 1s;
    } */


    /* now, make it responsive */
    @media (max-width : 1330px) {
        .chart-container{
            grid-template-columns: 1fr;
            gap: 30px;
        }
    }
    @media (max-width : 1280px) {
        .card-container .card .icon{
            font-size:1.8rem
        }
        .card-container .card{
            padding: 5px 10px;
        }
        .card-container .card .number h2{
            font-size: 1.2rem
        }
    }
    @media (max-width : 810px) {
        .card-container{
            grid-template-columns: repeat(2,1fr);
            padding: 0px 20px;
        }
        .card-container .card .icon{
            font-size:2rem
        }
        .card-container .card{
            padding: 5px 15px;
        }
        .card-container .card .number h2{
            font-size: 1.8rem
        }
    }
    @media (max-width : 560px) {
        .card-container .card .icon{
            font-size:1.5rem
        }
        .card-container .card{
            padding: 5px 10px;
        }
        .card-container .card .number h2{
            font-size: 1.2rem
        }
    }
    @media (max-width : 515px) {
        .chart-container{
            margin: 0 auto;
            padding: 0 8px;
        }
    }
    @media (max-width : 470px) {
        .card-container{
            grid-template-columns: repeat(1,1fr);
            padding: 0px 25px;
        }
        .main {
            position:fixed;
            top:0;
            left:70px;
            width: calc(100% - 70px);
        } 
        .card-container .card .icon{
            font-size:2rem
        }
        .card-container .card{
            padding: 5px 15px;
        }
        .card-container .card .number h2{
            font-size: 1.8rem
        }
    }
    @media (max-width : 400px) {
        .main {
            position:fixed;
            top:0;
            left:0;
            width: 100%;
        } 
    }


 </style>
 