 <template>
    <div class="dashboard">
        <div class="main" :class="{'toggleWidth':getToggleStatus}">
            <TopBar></TopBar>
            <transition-group tag="ul" name="cards" appear class="card-container" @before-enter="beforeEnter" @enter="enter">
                <li class="card" v-for="(info, index) in overviewInfo" :key="index" data-index="index" v-show="boxStatus">
                    <div class="number">
                        <h2>{{ info.value }}</h2>
                        <p>{{ info.title }}</p>
                    </div>
                    <div class="icon">
                        <i :class="info.icon"></i>
                    </div>
                </li>
            </transition-group>
            <div class="chart-container">
                <SaleChart></SaleChart>
                <ProductChart></ProductChart>
            </div>
        </div>
        <div class="paginator">
            <Paginator :currentPage="currentPage" v-show="paginatorStatus"></Paginator>
        </div>
    </div>
 </template>
 
 <script>
    import { mapGetters, mapActions } from "vuex";
    import gsap from "gsap";
    import { ref } from "vue";
    import TopBar from "../components/TopBar.vue";
    import SaleChart from "../components/overview-branches/SaleChart.vue";
    import ProductChart from "../components/overview-branches/TopSaleProduct.vue";
    import Paginator from "../components/data-paginators/OverviewPaginator.vue";
    export default {
        name : 'OverviewPage',
        data () {
            return {
                currentPage: 1,
            }
        },
        components: {TopBar, SaleChart, ProductChart, Paginator},
        computed: {
            ...mapGetters(["getToggleStatus", "paginatorStatus", "overviewCurrentPage", "boxStatus"]),
        },
        methods: {
            ...mapActions(["showPaginator", "resetBoxes"]),
        },
        setup(){
            const overviewInfo = ref([
                {value: "50", title: "Customer Counts", icon: "fa-solid fa-users"},
                {value: "25,000 Ks", title: "Today's Income", icon: "fa-solid fa-dollar-sign"},
                {value: "2,423,000 Ks", title: "Total Revenue", icon: "fa-solid fa-sack-dollar"},
                {value: "204", title: "Pending Orders", icon: "fa-solid fa-cart-arrow-down"},
            ]) 

            const beforeEnter = (el) => {
                el.style.opacity = 0;
                el.style.transform = "scale(0)"
            }

            const enter = (el, done) => {
                gsap.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    onComplete: done,
                    delay: el.dataset.index * 0.2,

                })  
            }

            return { beforeEnter, enter, overviewInfo }
        },
        mounted () {
            this.currentPage=this.overviewCurrentPage;
            this.showPaginator();
            window.addEventListener("resize", this.showPaginator);
            this.resetBoxes();
            window.addEventListener("resize", this.resetBoxes);
        }
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
    .paginator {
        position: absolute;
        bottom: 20px;
        right: 40px;
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
 