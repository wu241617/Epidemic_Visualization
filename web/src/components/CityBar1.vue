<template>
    <el-card>
        <div slot="header">
          <template v-if="cityType">
            <div>
                <el-tag type="danger" >{{title2}}</el-tag>
                <el-tag type="success">{{title3}}</el-tag>
                <el-tag type="danger" style="margin-left:20px;">{{title}}</el-tag>
                <el-tag type="success">{{title1}}</el-tag>
            </div>
          </template>
          <template v-if="provinceType">
            <div>
                <el-tag type="danger" >{{title4}}</el-tag>
                <el-tag type="success">{{title3}}</el-tag>
                <el-tag type="danger" style="margin-left:20px;">{{title5}}</el-tag>
                <el-tag type="success">{{title6}}</el-tag>
            </div>
          </template>
          <template v-if="countyType">
            <div>
                <el-tag type="danger" >{{title7}}</el-tag>
                <el-tag type="success">{{title8}}</el-tag>
                <el-tag type="danger" style="margin-left:20px;">{{title9}}</el-tag>
                <el-tag type="success">{{title10}}</el-tag>
            </div>
          </template>
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

export default {
    props:{
        rowData:Object,
        chart: null,
        type:String
    },
    data(){
        return {
            title:'城市名称',
            title1: this.rowData.cityName,
            title2:'所属省份',
            title3: this.rowData.provinceName,
            title4:'省份名称',
            title5:'省份编码',
            title6:this.rowData.provinceCode,
            title7:'所属地区',
            title8:this.rowData.continents,
            title9:'国家名称',
            title10:this.rowData.countryName,
            closeTitle:'关闭浮层',
            cityType:false,
            provinceType:false,
            countyType:false
        }
    },
    methods: {
        closeBtn(){
            this.$emit('event1',false)
        },
        chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let charTitle = ''
        switch(this.type){
          case 'city':
            charTitle = `${this.title1}柱状图（最新统计）`
            break;
          case 'province':
            charTitle = `${this.title3}柱状图（最新统计）`
            break;
          case 'county':
            charTitle = `${this.title10}柱状图（最新统计）`
            break;
        } 
        let option_right1 = {
          title: {
            text: charTitle,
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
            show: true,
              feature: {
                  magicType: {show: true, type: ['line']},restore: {show: true},
                  saveAsImage: {show: true}
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
      switch(this.type){
        case 'city':
          this.cityType = true
          break;
        case 'county':
          this.countyType = true
          break;
        case 'province':
          this.provinceType = true
          break;
      }
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