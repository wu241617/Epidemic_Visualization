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
            <div :style="{height:'450px',width:'100%'}" ref="myEchart"></div>
        </el-card>
    </div>
</template>
<script>
import echarts from "echarts";

export default {
    props:{
        tableData:Array,
        title:String,
        chart: null,
        type:String,
        provinceName:String,
        area:String
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
       let option = {
            title: {
                text: '',
                subtext: '',
                left: 'left',
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
                type: 'scroll',
                right: 80,
                top: 20,
                bottom: 20
            },
            series: [
                {
                    name: '确诊人数',
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
        let objArr = []
        switch(this.type){
          case 'city':
            for(let i=0; i<this.tableData.length; i++){
                if(this.tableData[i].provinceName == this.provinceName){
                    let obj = {
                     name: this.tableData[i].cityName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
                }
           }
            option.title.text = `${this.provinceName} 各城市饼状图`
            option.series[0].data = objArr
            myChart.setOption(option)
            break;
           case 'province':
               option.title.text = `国内各省份饼状图`
             for(let i=0; i<this.tableData.length; i++){
                 let obj = {
                     name: this.tableData[i].provinceName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
            }
            option.series[0].data = objArr
            myChart.setOption(option)
            break;
          case 'county':
            for(let i=0; i<this.tableData.length; i++){
                if(this.tableData[i].continents == this.area){
                    let obj = {
                     name: this.tableData[i].countryName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
                }
            }
            option.title.text = `${this.area} 区域各国饼状图`
            option.series[0].data = objArr
            myChart.setOption(option)
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