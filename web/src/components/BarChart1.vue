<template>
  <div>
    <div :style="{height:'450px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import $ from "jquery"
  export default {
    name: "LineChart",
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
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
let option = {
    title: {
        text: '国内外数据对比',
        subtext: '',
        textStyle: {
			fontSize: 13,
            color:'white'
		},
		left: 'left'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['国内', '国外']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['累计确诊', '当前确诊', '累计治愈', '累计死亡']
    },
    series: [
        {
            name: '国内',
            type: 'bar',
            data: []
        },
        {
            name: '国外',
            type: 'bar',
            data: []
        }
    ]
};

        $.ajax({
          url:"http://127.0.0.1:3000/api/statistics",
          success:function(data){
            console.log('data',data)
            let domArr = []
            let intArr = []
            domArr.push(data[1].confirmedCount)
            domArr.push(data[1].currentConfirmedCount)
            domArr.push(data[1].curedCount)
            domArr.push(data[1].deadCount)
            intArr.push(data[2].confirmedCount)
            intArr.push(data[2].currentConfirmedCount)
            intArr.push(data[2].curedCount)
            intArr.push(data[2].deadCount)
            option.series[0].data = domArr
            option.series[1].data = intArr
             myChart.setOption(option)
          }
        })
         myChart.setOption(option)
      }
    }
  }
</script>