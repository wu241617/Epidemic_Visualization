<template>
  <div class="echarts">
    <el-row style="margin-bottom:20px;">
      <el-button-group style="float:left;">
        <el-button type="primary" @click="viewMap" size="small" icon="el-icon-location" :disabled="disabled1">{{title1[1]}}</el-button>
        <el-button type="success" @click="viewBar" size="small" icon="el-icon-s-data" :disabled="disabled2">{{title1[0]}}</el-button>
        <el-button type="danger" @click="viewTable" size="small" icon="el-icon-s-marketing">{{title1[2]}}</el-button>
      </el-button-group>
      <el-col :span="5">
        <div style="display:flex;">
              <el-select v-model="value" filterable placeholder="请选择区域" size="small" style="width:100px;margin:0 5px 0 20px;background:#E6A23C;" :disabled="disabled3">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="warning" size="small" icon="el-icon-s-help" style="float:right;margin:0;border-radius:0;" @click="exitView1" :disabled="disabled3">{{title5}}</el-button>
             <!-- <el-tag type="success" style="display:flex;align-items:center;">{{title5}} <el-button type="text" style="float:right;margin:0;" size="small" icon="el-icon-view" class="window" @click="exitView1" :disabled="disabled3">{{title3}}</el-button></el-tag> -->
            </div>
      </el-col>
    </el-row>
    <Bar-All v-if="isExit" :tableData="tableData" @event="cls1($event)" :title="title2" :type="'county'"></Bar-All>
     <Pie-All  v-if="isExit2" :tableData="tableData" @event="cls2($event)" :title="title5" :type="'county'" :area="value"></Pie-All>
    <div :class="className" :id="id" :style="{height:'550px',width:'100%'}" ref="myEchart1" v-show="isExit1"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import '../../node_modules/echarts/map/js/world.js'
  import BarAll from '@/components/BarAll.vue'
  import PieAll from '@/components/PieAll.vue'
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
        title1:['全球各国图形模式','全球各国地图模式','全球各国表格模式'],
        title: "图表",
        isExit:false,
        isExit1:true,
        isExit2:false,
        tableData:[],
        title2:'全球各国柱状图 ',
        placeholder: "用户名/电话",
        find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
        chart: null,
        disabled1:true,
        disabled2:false,
        disabled3:false,
        successMessage:'数据获取成功！',
        falieMessage:'数据获取失败！',
        title5:'区域各国图形模式',
        title3:'查看',
        options:[{
           value: '亚洲',
           label: '亚洲'
        },{
           value: '欧洲',
           label: '欧洲'
        },{
           value: '大洋洲',
           label: '大洋洲'
        },{
           value: '南美洲',
           label: '南美洲'
        },{
           value: '北美洲',
           label: '北美洲'
        },{
           value: '非洲',
           label: '非洲'
        },{
           value: '南极洲',
           label: '南极洲'
        }],
        value:'亚洲'
      };
    },
    components:{
      BarAll,
      PieAll
    },
    created(){
          this.axios.get('/countries').then((res)=>{
             if(res.data && res.data.length !== 0){
                    this.open2()
                }else{
                    this.open4()
                }
            this.tableData = res.data     
        })
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
       open1() {
        this.$message({
          showClose: true,
          message: '暂不支持南极洲区域国家饼状图数据展示！',
          type: 'error',
          offset:130,
           duration:1500
        });
      },
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
        this.isExit2 = false
        this.disabled1 = false
        this.disabled2 = true
        this.disabled3 = false
      },
      viewMap(){
        this.isExit = false
        this.isExit1 = true
        this.isExit2 = false
        this.disabled1 = true
        this.disabled2 = false
        this.disabled3 = false
      },
      viewTable(){
        this.$router.push('/Statistics/globalStatistics')
      },
      exitView1(){
        if(this.value != '南极洲'){
          this.isExit = false
          this.isExit1 = false
          this.isExit2 = true
          this.disabled1 = false
          this.disabled2 = false
          this.disabled3 = true
        }else{
          this.open1()
        }
      },
       cls1($event){
         this.isExit = $event
         this.isExit1 = true
         this.isExit2 = false
         this.disabled1 = true
        this.disabled2 = false
        this.disabled3 = false
       },
         cls2($event){
         this.isExit2 = $event
         this.isExit = false
         this.isExit1 = true
        this.disabled1 = true
        this.disabled2 = false
        this.disabled3 = false
       },
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
          //url:"http://127.0.0.1:3000/api/countries",
           url:"http://123.57.46.110:8900/api/countries",
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
<style lang="css" scoped>
  .window:hover{
  color:red;
}
</style>