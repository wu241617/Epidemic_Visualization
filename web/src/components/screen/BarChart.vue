<template>
  <div>
    <div :style="{height:'321px',width:'96%',marginTop:'10px',padding:'0px 2%'}" ref="myEchart"></div>
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
        chart: null,
        text:'非湖北地区省确诊TOP5'
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
        let option_right1 = {
          title: {
            text: this.text,
            textStyle: {
              fontSize: 13,
              color:'white'
            },
            left: 'center'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          toolbox: {
           show: true,
              feature: {
                  magicType: {show: true, type: ['line']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value',
            },
          series: [{
            type: 'bar',
            data: [],
            barMaxWidth: "50%"
          }]
        };
        $.ajax({
         // url:"http://127.0.0.1:3000/api/countries/CHN",
           url:"http://123.57.46.110:8900/api/countries/CHN",
          success:function(data){
             let newData = []
             let data1 = []
             for(let i=0; i<data.length; i++){
                 newData.push({
                     provinceName:data[i].provinceName,
                     confirmedCount:Number(data[i].confirmedCount)
                 })
                 data1.push(Number(data[i].confirmedCount))
             }
             data1.sort(function(a,b){
                 return b-a
             })
             let confirmedCount = []
             let provinceName = []
             confirmedCount[0] = data1[1]
             confirmedCount[1] = data1[2]
             confirmedCount[2] = data1[3]
             confirmedCount[3] = data1[4]
             confirmedCount[4] = data1[5]
             for(let j=0; j<confirmedCount.length; j++){
                for(let i=0; i<newData.length; i++){
                 if(confirmedCount[j] == newData[i].confirmedCount){
                     provinceName.push(newData[i].provinceName)
                 }
             }
             }
             option_right1.xAxis.data = provinceName
             option_right1.series[0].data = confirmedCount
             myChart.setOption(option_right1)
          }
        })
         myChart.setOption(option_right1)
      }
    }
  }
</script>