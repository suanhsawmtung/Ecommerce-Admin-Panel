<template>
    <div class="parent-container">
        <div class="chart-box" >
            <h3>Best Selling Category</h3>
            <div class="chart">
                <canvas id="categoryChart"></canvas>
            </div>
        </div>
        <div class="table-box" >
            <h3 >Best Selling Items</h3>
            <div class="table">
                <table>
                    <tbody>
                        <tr v-for="(product, index) in topSellerItems" :key="index">
                            <td class="title"><small>{{ product.title }}</small></td>
                            <td class="image">
                                <img :src="product.image" alt="">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto';
    import { mapGetters } from "vuex";

    export default {
        name: "TopSaleProduct",
        data () {
            return {
                topSellerItems: [],
                topSaleCategories: []
            }
        },
        computed: {
            ...mapGetters("Products", ["getProducts"]),   
            ...mapGetters("Categories", ["getCategories"]), 
            // ...mapGetters(["getDataForTopSaleItem"])  
        },
        methods: {
            setTopSellerItems(){
                let productsSortedByCount = this.getDataForTopSaleItem.sort(function(a, b){
                    return a.rating.count - b.rating.count;
                });

                for (let i = 0; i < 4; i++) {
                    this.topSellerItems.push(productsSortedByCount[i])
                }
            }
            // setTopSellerItems() {
            //     let productsSortedByCount = this.getProducts.sort(function(a, b){
            //         return a.count - b.count;
            //     });

            //     for (let i = 0; i < 6; i++) {
            //         this.topSellerItems.push(productsSortedByCount[i])
            //     }
            // },
            // setTopSaleCategories ()  {
            //     this.getCategories.forEach(category => {
            //         this.topSaleCategories.push(category.title);
            //     });
            // },
        },
        created () {
            // this.setTopSellerItems();
            // this.setTopSaleCategories();
        },
        mounted () {
            const ctx = document.getElementById('categoryChart');

            const data = {
            //   labels: this.topSaleCategories,
              labels: ["electronics", "women's clothing", "men's clothing", "jewelery"],
              datasets: [{
                label: 'Total Count',
                data: [173, 58, 37, 109],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                hoverOffset: 4
              }]
            };

            const categoryChart = new Chart(ctx, {
                type: 'pie',
                data: data,
            });
            

            categoryChart;
        }
    }
</script>

<style scoped>
    .parent-container{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        width: auto;
        /* height: 80% !important; */
        /* grid-template-columns: 1fr 1fr; */
        /* background: red; */
    }
    .parent-container .chart-box{
        box-shadow:  1px 1px 5px 0.2px #000;
        border-radius: 10px;
        margin-left: 8px;
        padding: 10px;
    }
    .parent-container .chart-box h3{
        margin-bottom: 20px;
    }
    .parent-container .chart-box .chart{
        margin: 0 auto;
        /* width: 250px; */
        /* height: 80%; */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .parent-container .chart-box .chart .categoryChart{
        text-align: center;
    }
    .parent-container .table-box{
        box-shadow:  1px 1px 5px 0.2px #000;
        border-radius: 10px;
        /* margin: 0 0 0 15px; */
        margin-left: 14px;
        padding: 10px;
        width: 320px;
        /* background-color: red; */
    }
    .parent-container .table-box h3{
        margin-bottom: 20px;
    }
    tbody tr{
        height: 20px;
    }
    tbody tr .image{
        object-fit: cover;
        width: 10%;
        overflow: hidden;
        padding: 5px;
        color: #777777;
        /* background-color: blue; */
        text-align: end;
    }
    tbody tr .image img{
        width: 100%;
        height: auto;
    }
    .title{
        width: 50%;
        text-align: start;
        overflow: hidden;
        padding: 5px;
        color: #777777;
        /* background-color: red; */
    }
    /* .count{
        width: 20%;
        text-align: center;
        overflow: hidden;
        padding: 5px;
        color: #777777;
    } */


    /* now, make it responsive */
    @media (max-width : 1330px) {
        /* .parent-container .chart-box{
            width: 1fr;
            height: 400px;
        } */
        /* .parent-container .chart-box .chart{
            margin: 0 auto;
            width: 100%;
            height: 340px;
            text-align: center;
        }
        .parent-container .table-box{
            width: 1fr;
            height: 400px;
        }
        tbody tr .image{
            width: 15%;
        }
        tbody tr .image img{
            width: 70%;
        } */
    }
    @media (max-width: 860px) {
        tbody tr .image img{
            width: 50%;
        }
    } 
    @media (max-width: 800px) {
        .parent-container{
            grid-template-columns: 1fr;
            gap: 30px;
        }
    } 
    @media (max-width: 515px) {
        .parent-container .chart-box {
            width: 90%;
            margin: 0 auto;
        }
        tbody tr .image img{
            width: 80%;
        }
    } 
</style>
