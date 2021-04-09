<template>
    <div>
        <el-card>
            <div slot="header">
                <el-tag type="success">{{title}}</el-tag>
                <el-tag type="danger">{{title1}}</el-tag>
                <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left-start">
                        <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn" ></el-button>
                </el-tooltip>
            </div>
            <div>
                <div :style="{height:'450px',width:'100%'}" ref="myEchart"></div>
            </div>
        </el-card>
    </div>
</template>
<script>
import echarts from "echarts";
import $ from "jquery"

export default {
    props:{
        tableData:Array,
        title:String,
        chart: null,
        type:String
    },
    data(){
        return {
            closeTitle:'关闭浮层',
            title1:'最新疫情数据统计'
        }
    },
    methods: {
        closeBtn(){
            this.$emit('event',false)
        },
        chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let option_right1 = {
          title: {
            text: `${this.title}（最新确诊）`,
            textStyle: {
              fontSize: 13,
              color:'white'
            },
            left: 'center'
          },
          // grid: {
          // 	left: 50,
          // 	top: 50,
          // 	right: 0,
          // 	width: '87%',
          // 	height: 320,
          // },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          //工具框，可以选择
          toolbox: {
            feature: {
              saveAsImage: {} //下载工具
            }
          },
          //全局字体样式
          // textStyle: {
          // 	fontFamily: 'PingFangSC-Medium',
          // 	fontSize: 12,
          // 	color: '#858E96',
          // 	lineHeight: 12
          // },
          xAxis: {
            type: 'category',
            // scale:true,
            data: []
          },
          yAxis: {
            type: 'value',
            //坐标轴刻度设置
            },
          series: [{
            type: 'bar',
            data: [],
            barMaxWidth: "50%"
          }]
        };
        let cityNameArr = []
        let countyNameArr = []
        let provinceNameArr = []
        let confirmedCountArr = []
        switch(this.type){
          case 'city':
            for(let i=0; i<this.tableData.length; i++){
            cityNameArr.push(this.tableData[i].cityName)
            confirmedCountArr.push(this.tableData[i].confirmedCount)
           }
            option_right1.xAxis.data = cityNameArr
            option_right1.series[0].data = confirmedCountArr
            myChart.setOption(option_right1)
            break;
           case 'province':
             for(let i=0; i<this.tableData.length; i++){
            provinceNameArr.push(this.tableData[i].provinceName)
            confirmedCountArr.push(this.tableData[i].confirmedCount)
          }
            option_right1.xAxis.data = provinceNameArr
            option_right1.series[0].data = confirmedCountArr
            myChart.setOption(option_right1)
            break;
          case 'county':
            for(let i=0; i<this.tableData.length; i++){
            countyNameArr.push(this.tableData[i].countryName)
            confirmedCountArr.push(this.tableData[i].confirmedCount)
            }
            option_right1.xAxis.data = countyNameArr
            option_right1.series[0].data = confirmedCountArr
            myChart.setOption(option_right1)
            break;
        }
      }
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
    }
}
</script>
<style lang="css" scoped>
    .close{
      position:absolute;
      right:10px;
      top:10px;
      background:white;
      color:blue;
      border:none;
      font-size:20px;
      width:30px;
      height:30px;
      display:flex;
      justify-content: center;
      align-items: center;
  }
  .close:hover{
      background:white;
      color:red;
  }
</style>