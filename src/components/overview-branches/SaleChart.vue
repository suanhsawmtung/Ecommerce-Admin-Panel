<template>
    <div class="chart" v-show="saleHistory">
        <h3>Last 6 months sales </h3>
        <canvas id="myChart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js/auto';
    import { mapGetters } from "vuex";
    export default {
        name: "SaleChart",
        data () {
            return {
                months: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                monthsForChartLabel: []
            }
        },
        computed: {
            ...mapGetters(["saleHistory"]),
        },
        methods: {
           setLabelsForChart (){
                let todayDate = new Date();
                let loopingStart = todayDate.getMonth()-1;
                let loopingStartPoint;
                if(loopingStart < 0){
                    loopingStartPoint = 12+loopingStart;
                }else{
                    loopingStartPoint = loopingStart;
                }
                for(let i=loopingStartPoint; i > loopingStartPoint-6; i--){
                    this.monthsForChartLabel.unshift(this.months[i]);
                }
           }
        },
        mounted () {

            this.setLabelsForChart();
            const ctx = document.getElementById('myChart');

            const labels = this.monthsForChartLabel;
            const data = {
              labels: labels,
              datasets: [{
                label: '(Kyats)',
                data: [500000, 920000, 432600, 500000, 685070, 1040000],
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(201, 203, 207, 1)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
              }]
            };

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                    y: {
                        beginAtZero: true
                    }
                    }
                }
            });
            
            myChart;
        }
    }
</script>

<style scoped>
    .chart{
        width: 99%;
        box-shadow:  1px 1px 5px 0.2px #000;
        border-radius: 10px;
        padding: 10px;
    }
    .chart h3{
        margin-bottom: 10px;
    }

    /* now, make it responsive */
    @media (max-width: 1330px) {
        .chart{
            width: 80%;
            margin: 0 auto;
        }
    } 
    @media (max-width: 820px) {
        .chart{
            margin: 30px 0;
        }
    } 
    @media (max-width: 800px) {
        .chart{
            width: 100%;
            overflow-x: scroll;
        }
    } 
    @media (max-width: 515px) {
        .chart{
            width: 90%;
            margin: 0 auto;
        }
    } 
</style>
