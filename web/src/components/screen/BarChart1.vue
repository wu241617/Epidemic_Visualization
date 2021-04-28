<template>
  <div>
    <div :style="{height:'480px',width:'97%',marginTop:'30px',marginLeft:'10px'}" ref="myEchart"></div>
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
        text:'国内外数据对比',
        legendData:['国内', '国外'],
        yAxisData:['累计确诊', '当前确诊', '累计治愈', '累计死亡']
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
                text: this.text,
                subtext: '',
                textStyle: {
              fontSize: 13,
                    color:'white'
            },
            left: 'left'
            },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: this.legendData
          },
          toolbox: {
              show: true,
              feature: {
                  magicType: {show: true, type: ['line']},restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          calculable: true,
          xAxis: [
              {
                  type: 'value',
                  data: this.yAxisData,
                   axisLabel: {  
                    interval:0,  
                    //rotate:30,
                    formatter: function(value) {
                      if (value >= 1000) {
                        value = value / 1000 + 'k';
                      }
                      return value;
                    }
                  }  
              }
          ],
          yAxis: [
              {
                  type: 'category',
                  data: this.yAxisData,
              }
          ],
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
         // url:"http://127.0.0.1:3000/api/statistics",
          url:"http://123.57.46.110:8900/api/statistics",
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