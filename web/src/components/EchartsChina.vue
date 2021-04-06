<template>
  <div class="echarts">
    <div :style="{height:'550px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import "../../node_modules/echarts/map/js/china.js"
  import $ from "jquery"
  export default {
    name: "echarts",
    props: ["userJson"],
    data() {
      return {
        chart: null
      };
    },
    mounted() {
      this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let optionMap = {
        title: {
          text: '',
          subtext: '',
          x: 'left'
        },
        tooltip: {
          trigger: 'item'
        },
        //左侧小导航图标
        visualMap: {
          show: true,
          x: '200px',
          y: '450px',
          textStyle: {
            fontSize: 8,
            color:'white'
          },
          splitList: [{
              start: 1,
              end: 9
            },
            {
              start: 10,
              end: 99
            },
            {
              start: 100,
              end: 999
            },
            {
              start: 1000,
              end: 9999
            },
            {
              start: 10000
            }
          ],
          color: ['#8A3310','#C64918', '#E55B25','#F2AD92', '#F9DCD1']
        },

          //配置属性
          series: [{
            name: '累积确诊人数',
            type: 'map',
            mapType: 'china',
            roam: true,
            itemStyle: {
              normal: {
                borderWidth: .5,
                borderColor: '#009fe8',
                areaColor: '#ffefd5'
              },
              emphasis: {
                borderWidth: .5,
                borderColor: '#4b0082',
                areaColor: '#fff'
              }
            },
            label: {
              normal: {
                show: true, //省份名称
                fontSize: 12
              },
              emphasis: {
                show: true,
                fontSize: 12
              }
            },
            data: [] //数据
          }]
        };
        $.ajax({
          url:"http://127.0.0.1:3000/api/countries/CHN",
          success:function(data){
             let mydata = []
             for(let i=0; i<data.length; i++){
               let obj = {
                 "name":data[i].provinceName,
                 "value":Number(data[i].confirmedCount)
               }
               mydata.push(obj)
             }
             data = JSON.stringify(mydata)
             optionMap.series[0].data = mydata
             myChart.setOption(optionMap)
          }
        })
      }
    }
  }
</script>