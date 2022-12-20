<template>
    <div class="parent-container">
        <div class="chart-box">
            <h3>Best Selling Category</h3>
            <div class="chart">
                <canvas id="categoryChart"></canvas>
            </div>
        </div>
        <div class="table-box">
            <h3 >Best Selling Items</h3>
            <div class="table">
                <table>
                    <tbody>
                        <tr v-for="(product, index) in getTopSellerItems" :key="index">
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
    import {mapGetters} from "vuex";

    export default {
        name: "TopSaleProduct",
        computed: {
            ...mapGetters(["getProducts", "getCategories", "getTopSellerItems"]),
        },
        mounted () {
            const ctx = document.getElementById('categoryChart');

            const data = {
              labels: this.getCategories,
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
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .parent-container .chart-box{
        box-shadow:  1px 1px 5px 0.2px #000;
        border-radius: 10px;
        margin: 0 6px 0 8px;
        padding: 10px;
    }
    .parent-container .chart-box h3{
        margin-bottom: 20px;
    }
    .parent-container .chart-box .chart{
        margin: 0 auto;
        width: 250px;
        height: 300px;
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
        margin: 0 0 0 15px;
        padding: 10px;
    }
    .parent-container .table-box h3{
        margin-bottom: 10px;
    }
    tbody tr .image{
        object-fit: cover;
        width: 20%;
        overflow: hidden;
        padding: 5px;
        color: #777777;
    }
    tbody tr .image img{
        width: 98%;
    }
    .title{
        width: 60%;
        text-align: start;
        overflow: hidden;
        padding: 5px;
        color: #777777;
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
        .parent-container .chart-box{
            width: 1fr;
            height: 400px;
        }
        .parent-container .chart-box .chart{
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
        tbody tr .image{
            width: 10%;
        }
    } 
</style>
