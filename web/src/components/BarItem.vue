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
import qs from 'qs'

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
            countyType:false,
            data:[],
            legendData:['累计确诊', '当前确诊', '累计治愈','累计死亡'],
            seriesData:[{
                name: '累计确诊',
                data: [],
                type: 'line',
                smooth: true
              },
              {
                name: '当前确诊',
                data: [],
                type: 'line',
                smooth: true
              },
              {
                name: '累计治愈',
                data: [],
                type: 'line',
                smooth: true
              },	
              {
                name: '累计死亡',
                data: [],
                type: 'line',
                smooth: true
              }
            ]
        }
    },
    methods: {
        closeBtn(){
            this.$emit('event1',false)
        },
        chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let charTitle = `${this.title1}柱状图（最新统计）`
        let option_right1 = {
          title: {
            text: charTitle,
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
          //工具框，可以选择
          toolbox: {
            show: true,
              feature: {
                  magicType: {show: true, type: ['line']},restore: {show: true},
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
        let dataArr = []
        dataArr.push(this.rowData.confirmedCount)
        dataArr.push(this.rowData.suspectedCount)
        dataArr.push(this.rowData.curedCount)
        dataArr.push(this.rowData.deadCount)
        dataArr.push(this.rowData.currentConfirmedCount)
        option_right1.xAxis.data = ['确诊','疑似','治愈','死亡','新增']
        option_right1.series[0].data = dataArr
        myChart.setOption(option_right1)
      },
       chinaConfigure1() {
        let myChart = echarts.init(this.$refs.myEchart,"dark"); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        let charTitle = ''
        switch(this.type){
          case 'province':
            charTitle = `${this.title3}折线图`
            break;
          case 'county':
            charTitle = `${this.title10}折线图`
            break;
        } 
        let option_left2 = {
          title: {
				text: charTitle,
				textStyle: {
					fontSize: 13,
					color:'white'
				},
				left: 'left'
			},
			legend: {
        orient: 'horizontal', 
				data: this.legendData,
        x: 'center'
				//left: '100'
			},
			grid: {
				top: 50, 
				left: '4%',
				right: '6%',
				bottom: '4%',
				containLabel: true
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					lineStyle: {
						color: '#7171C6'
					}
				}
			},
			toolbox: {
				show: true,
          feature: {
              magicType: {show: true, type: ['bar']},
              restore: {show: true},
              saveAsImage: {show: true}
        }
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					interval: 1
				},
				data: []
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: true
				},
				axisLabel: {
					show: true,
					color: 'white',
					fontSize: 12,
					formatter: function(value) {
						if (value >= 1000) {
							value = value / 1000 + 'k';
						}
						return value;
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#172738',
						width: 1,
						type: 'solid'
					}
				}
			},
			series:this.seriesData
      };
        let newData = []
        switch(this.type){
        case 'city':
          this.cityType = true
          this.chinaConfigure();
          break;
        case 'county':
            for(let i=0; i<this.data.length; i++){
				  if(this.data[i].dateId == 20200201 || this.data[i].dateId == 20200301 || this.data[i].dateId == 20200401 || this.data[i].dateId == 20200501 || this.data[i].dateId == 20200601 || this.data[i].dateId == 20200701 || this.data[i].dateId == 20200801 || this.data[i].dateId == 20200901 || this.data[i].dateId == 20201001 || this.data[i].dateId == 20201101 || this.data[i].dateId == 20201201 || this.data[i].dateId == 20210101){
					  newData.push(this.data[i])
				  }
			  }
        	option_left2.xAxis.data = ['20-02','20-03','20-04','20-05','20-06','20-07','20-08','20-09','20-10','20-11','20-12','21-01']
          break;
        case 'province':
           for(let i=0; i<this.data.length; i++){
				  if(this.data[i].dateId == 20200201 || this.data[i].dateId == 20200301 || this.data[i].dateId == 20200401 || this.data[i].dateId == 20200501 || this.data[i].dateId == 20200601 || this.data[i].dateId == 20200701 || this.data[i].dateId == 20200801 || this.data[i].dateId == 20200901 || this.data[i].dateId == 20201001 || this.data[i].dateId == 20201101 || this.data[i].dateId == 20201201 || this.data[i].dateId == 20210101 || this.data[i].dateId == 20210201 || this.data[i].dateId == 20210301 || this.data[i].dateId == 20210401 || this.data[i].dateId == 20210501){
					  newData.push(this.data[i])
				  }
			  }
        	option_left2.xAxis.data = ['20-02','20-03','20-04','20-05','20-06','20-07','20-08','20-09','20-10','20-11','20-12','21-01','21-02','21-03','21-04','21-05']
          break;
      }
			let xData = []
			let series1 = []
			let series2 = []
			let series3 = []
			let series4 = []
			for(let i=0; i<newData.length; i++){
				xData.push(newData[i].dateId)
				series1.push(newData[i].confirmedCount)
				series2.push(newData[i].currentConfirmedCount)
				series3.push(newData[i].curedCount)
				series4.push(newData[i].deadCount)
			}
       option_left2.series[0].data = series1
			 option_left2.series[1].data = series2
			 option_left2.series[2].data = series3
			 option_left2.series[3].data = series4
       myChart.setOption(option_left2)
      },
       request(url,obj){
            this.axios.post(url,qs.stringify(obj),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.data = res.data
            this.chinaConfigure1();
        })
        }
    },
    mounted() {
      switch(this.type){
        case 'city':
          this.cityType = true
          this.chinaConfigure();
          break;
        case 'county':
           this.request('/countries/daily/country',{'countryName':this.rowData.countryName})
          this.countyType = true
          break;
        case 'province':
          console.log('this.rowData.provinceName',this.rowData.provinceName)
           this.request('/provinces/CHN/daily/province',{'provinceName':this.rowData.provinceName})
          this.provinceType = true
          break;
      }
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