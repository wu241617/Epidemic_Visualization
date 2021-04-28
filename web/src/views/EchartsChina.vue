<template>
  <div class="echarts">
    <el-row style="margin-bottom:20px;">
      <el-button-group>
        <el-button type="primary" @click="viewMap" size="small" icon="el-icon-location" :disabled="disabled3">{{title[1]}}</el-button>
        <!-- <el-button type="success" @click="viewBar" size="small" icon="el-icon-s-data" :disabled="disabled1">{{title[0]}}</el-button> -->
        <el-button type="warning" @click="viewPie" size="small" icon="el-icon-s-help" :disabled="disabled2">{{title[3]}}</el-button>
        <el-button type="danger" @click="viewTable" size="small" icon="el-icon-s-marketing">{{title[2]}}</el-button>
      </el-button-group>
    </el-row>
    <Bar-All v-if="isExit" :tableData="tableData" @event="cls1($event)" :title="title2" :type="'province'"></Bar-All>
    <Pie-All v-if="isExit2" :tableData="tableData" @event="cls2($event)" :title="title2" :type="'province'"></Pie-All>
    <div :style="{height:'550px',width:'100%'}" ref="myEchart"  v-show="isExit1"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import "../../node_modules/echarts/map/js/china.js"
  import BarAll from '@/components/BarAll.vue'
  import PieAll from '@/components/PieAll.vue'
  import $ from "jquery"
  
  export default {
    name: "echarts",
    props: ["userJson"],
    data() {
      return {
        title:['数据柱状图查看','全国各省地图模式','全国各省数据表格模式','全国各省图形模式'],
        chart: null,
        isExit:false,
        isExit1:true,
        isExit2:false,
        title2:'国内省份柱状图',
        tableData:[],
        disabled1:false,
        disabled2:false,
        disabled3:true,
        successMessage:'数据获取成功！',
        falieMessage:'数据获取失败！'
      };
    },
    created(){
          this.axios.get('/countries/CHN').then((res)=>{
            if(res){
              if(res.data && res.data.length !== 0){
                    this.open2()
                }else{
                    this.open4()
                }
                this.tableData = res.data
            }
        })
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
    components:{
      BarAll,
      PieAll
    },
    methods: {
       open2() {
        this.$message({
          showClose: true,
          message: this.successMessage,
          type: 'success',
          offset:130,
           duration:1500
        });
      },
      open4() {
        this.$message({
          showClose: true,
          message: this.falieMessage,
          type: 'error',
          offset:130,
           duration:1500
        });
      },
      viewBar(){
        this.isExit = true
        this.isExit1 = false
        this.disabled1 = true
        this.disabled2 = false
        this.disabled3 = false
        this.isExit2 = false
      },
      viewPie(){
        this.isExit = false
        this.isExit1 = false
        this.disabled1 = false
        this.disabled2 = true
        this.disabled3 = false
        this.isExit2 = true
      },
      viewMap(){
        this.isExit = false
        this.isExit1 = true
        this.disabled = false
        this.isExit2 = false
        this.disabled1 = false
        this.disabled2 = false
        this.disabled3 = true
      },
      viewTable(){
        this.$router.push('/CHN/provinceAll/dailyNew')
      },
       cls1($event){
         this.isExit = $event
         this.isExit1 = true
         this.disabled1 = false
        this.disabled2 = false
        this.disabled3 = true
          this.isExit2 = false
       },
       cls2($event){
         this.isExit = $event
         this.isExit1 = true
         this.disabled1 = false
        this.disabled2 = false
        this.disabled3 = true
        this.isExit2 = false
       },
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
          //url:"http://127.0.0.1:3000/api/countries/CHN",
          url:"http://123.57.46.110:8900/api/countries/CHN",
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
<style lang="css" scoped>
  
</style>