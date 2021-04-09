<template>
    <el-card>
        <div slot="header">
                <el-tag type="danger" >{{title2}}</el-tag>
                <el-tag type="success">{{title3}}</el-tag>
                <el-tag type="danger" style="margin-left:20px;">{{title}}</el-tag>
                <el-tag type="success">{{title1}}</el-tag>
                <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left-start">
                        <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn" ></el-button>
                </el-tooltip>
        </div>
        <div>
            <div :style="{height:'250px',width:'100%'}" ref="myEchart"></div>
        </div>
    </el-card>
</template>
<script>
import echarts from "echarts";
import $ from "jquery"

export default {
    props:{
        rowData:Object,
        chart: null
    },
    data(){
        return {
            title:'城市名称',
            title1: this.rowData.cityName,
            title2:'所属省份',
            title3: this.rowData.provinceName,
            closeTitle:'关闭浮层'
        }
    },
    methods: {
        closeBtn(){
            this.$emit('event1',false)
        },
        chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let option_right1 = {
          title: {
            text: `${this.title1}柱状图`,
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
        let dataArr = []
        dataArr.push(this.rowData.confirmedCount)
        dataArr.push(this.rowData.suspectedCount)
        dataArr.push(this.rowData.curedCount)
        dataArr.push(this.rowData.deadCount)
        dataArr.push(this.rowData.currentConfirmedCount)
         option_right1.xAxis.data = ['确诊','疑似','治愈','死亡','新增']
         option_right1.series[0].data = dataArr
         myChart.setOption(option_right1)
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
<style scoped>
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