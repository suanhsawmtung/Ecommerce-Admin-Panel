 <template>
    <div class="dashboard">

        <!-- Main -->
        <div class="main" :class="{'toggleWidth':getToggleStatus}">
            
            <!-- Top Bar -->
            <TopBar></TopBar>
            
            <!-- Top Four Boxes -->
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
            <!-- Top Four Boxes End -->

            <!-- Three Sale Charts -->
            <div class="chart-container">
                
                <!-- Last 6 Months Sale Chart -->
                <SaleChart></SaleChart>
                
                <!-- Top Sale Categories & Top Sale Items Charts -->
                <ProductChart></ProductChart>

            </div>
            <!-- Three Sale Charts End -->
        </div>
        <!-- Main End -->

        <!-- Paginator Box -->
        <div class="paginator">
            
            <!-- Paginator -->
            <Paginator  v-show="paginatorStatus"></Paginator>

        </div>
        <!-- Paginator Box End -->
    </div>
 </template>
 
 <script>
    import { mapGetters, mapActions } from "vuex";
    import gsap from "gsap";
    import { ref, computed } from "vue";
    import { useStore } from "vuex";
    import TopBar from "../components/TopBar.vue";
    import SaleChart from "../components/overview-branches/SaleChart.vue";
    import ProductChart from "../components/overview-branches/TopSaleProduct.vue";
    import Paginator from "../components/data-paginators/OverviewPaginator.vue";
    export default {
        name : 'OverviewPage',
        components: {TopBar, SaleChart, ProductChart, Paginator},
        computed: {
            ...mapGetters(["getToggleStatus", "paginatorStatus", "overviewCurrentPage", "boxStatus"]),
        },
        methods: {
            ...mapActions(["showPaginator", "resetBoxes"]),
        },
        setup(){
            const store = useStore();
            /* Get All Orders From Vuex */
            const getOrders = computed(()=>store.getters.getOrders);
            /* Get All Customers From Vuex */
            const getCustomers = computed(()=>store.getters.getCustomers);

            /* Total Customers Count */
            const totalCustomers = computed(()=>getCustomers.value.length);

            /* Computing And Get Total Revenue */
            const totalRevenue = computed(()=>{
                let revenue = 0;
                getOrders.value.forEach(order=>{
                    revenue += order.total;
                });
                return revenue.toString() + ' Ks';
            });

            /* Get All Pending Orders */
            const pendingOrders = computed(()=>{
                let pending = getOrders.value.filter(order => order.status === "pending");
                return pending.length;
            })

            /* Data To Display Overviews Boxes */
            const overviewInfo = ref([
                {value: totalCustomers, title: "Customer Counts", icon: "fa-solid fa-users"},
                {value: "25,000 Ks", title: "Today's Income", icon: "fa-solid fa-dollar-sign"},
                {value: totalRevenue , title: "Total Revenue", icon: "fa-solid fa-sack-dollar"},
                {value: pendingOrders, title: "Pending Orders", icon: "fa-solid fa-cart-arrow-down"},
            ]) 

            /* Animation For Top Four Boxes, Before Enter */
            const beforeEnter = (el) => {
                el.style.opacity = 0;
                el.style.transform = "scale(0)"
            }

            /* GAnimation For Top Four Boxes By Using Gsap, Enter */
            const enter = (el, done) => {
                gsap.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    onComplete: done,
                    delay: el.dataset.index * 0.2,

                })  
            }

            return { beforeEnter, enter, overviewInfo, getOrders, getCustomers, totalCustomers, totalRevenue, pendingOrders }
        },
        mounted () {
            /* Checking To Show Or Hide Paginator When Screen Size Change Or When Enter With Every Screen Size */
            this.showPaginator();
            window.addEventListener("resize", this.showPaginator);
            
            /* Checking To Show Or Hide Boxes And Charts When Screen Size Change Or When Enter With Every Screen Size */
            this.resetBoxes();
            window.addEventListener("resize", this.resetBoxes);
        }
    }
 </script>
 
 <style src="../assets/css/overview.css" scoped ></style>
 