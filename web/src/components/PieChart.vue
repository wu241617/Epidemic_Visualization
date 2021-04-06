<template>
  <div>
    <div :style="{height:'331px',width:'100%'}" ref="myEchart"></div>
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
        text: '世界国家确诊Top5',
        subtext: '',
        left: 'center',
        textStyle: {
			fontSize: 13,
            color:'white'
		},
    },
    tooltip: {
        trigger: 'item'
    },
    //工具框，可以选择
      	toolbox: {
      		feature: {
      			saveAsImage: {} //下载工具
      		}
      	},
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

        $.ajax({
          url:"http://127.0.0.1:3000/api/countries",
          success:function(data){
             let newData = []
             let data1 = []
             for(let i=0; i<data.length; i++){
                 newData.push({
                     countryName:data[i].countryName,
                     confirmedCount:Number(data[i].confirmedCount)
                 })
                 data1.push(Number(data[i].confirmedCount))
             }
             data1.sort(function(a,b){
                 return b-a
             })
             let confirmedCount = []
             let countryName = []
             confirmedCount[0] = data1[0]
             confirmedCount[1] = data1[1]
             confirmedCount[2] = data1[2]
             confirmedCount[3] = data1[3]
             confirmedCount[4] = data1[4]
             for(let j=0; j<confirmedCount.length; j++){
                for(let i=0; i<newData.length; i++){
                 if(confirmedCount[j] == newData[i].confirmedCount){
                     countryName.push(newData[i].countryName)
                 }
             }
             }
             let objArr = []
             for(let i=0; i<5; i++){
                 let obj = {
                     name: countryName[i],
                     value: confirmedCount[i]
                 }
               objArr.push(obj)
             }
             console.log('objArr',objArr)
             option.series[0].data = objArr
             myChart.setOption(option)
          }
        })
         myChart.setOption(option)
      }
    }
  }
</script>