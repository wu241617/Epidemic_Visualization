<template>
  <div class="echarts">
    <div :class="className" :id="id" :style="{height:'550px',width:'100%'}" ref="myEchart1"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import '../../node_modules/echarts/map/js/world.js'
  import $ from "jquery"
  import data  from '@/assets/js/world'
  let mydata = data.mydata

  export default {
    name: "echarts",
    props: {
      className: {
        type: String,
        default: "yourClassName"
      },
      id: {
        type: String,
        default: "yourID"
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "400px"
      }
    },
    data() {
      return {
        title: "图表",
        placeholder: "用户名/电话",
        find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
        chart: null
      };
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      //搜索回调
      searchItem(val) {
        //console.log(val)
      },
      //新增回调
      addNew(val) {
        //console.log(val)
      },
      //导入
      leadingItem(val) {
        //console.log(val)
      },
      initChart() {
        let myChart = echarts.init(this.$refs.myEchart1);
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
            mapType: 'world',
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
                show: false, //国家名称
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
          url:"http://127.0.0.1:3000/api/countries",
          success:function(data){
             for(let i=0; i<mydata.length; i++){
               mydata[i].value = Number(data[i].confirmedCount)
             }
             optionMap.series[0].data = mydata
             myChart.setOption(optionMap)
          }
        })
      }
    }
  }
</script>