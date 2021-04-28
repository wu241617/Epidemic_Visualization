<template>
    <div>
        <el-card>
            <!-- <div slot="header">
                <el-tag type="success">{{title}}</el-tag>
                <el-tag type="danger">{{title1}}</el-tag>
                <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left-start">
                        <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn" ></el-button>
                </el-tooltip>
            </div> -->
            <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left-start">
                        <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn" ></el-button>
                </el-tooltip>
            <el-tabs v-model="activeName" @tab-click="handleClick" style="width:100%;" id="container">
                <el-tab-pane label="饼状图" name="first" >
                    <div :style="{height:'450px'}" ref="myEchart" ></div>
                </el-tab-pane>
                <el-tab-pane label="柱状图" name="second" >
                    <div :style="{height:'450px'}" ref="myEchart1" ></div>
                </el-tab-pane>
                <el-tab-pane label="折线图" name="third" >
                    <div :style="{height:'450px'}" ref="myEchart2" ></div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
import echarts from "echarts";
import $ from 'jquery'

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
            title1:'最新疫情数据统计',
            activeName: 'first',
            width:''
        }
    },
    methods: {
        handleClick(tab, event) {
        //console.log(tab, event);
      },
        closeBtn(){
            this.$emit('event',false)
        },
        chinaConfigure() {
        $(this.$refs.myEchart).css('width',this.width)
        $(this.$refs.myEchart1).css('width',this.width)
        $(this.$refs.myEchart2).css('width',this.width)
        let myChart = echarts.init(this.$refs.myEchart,"dark");   
        let myChart1 = echarts.init(this.$refs.myEchart1,"dark");
        let myChart2 = echarts.init(this.$refs.myEchart2,"dark"); 

        window.onresize = myChart.resize;
       let option = {
            title: {
                text: '',
                padding: [20,0,100,50],
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
                    name: '累计确诊人数',
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
        let option1 = {
          title: {
            text: '',
            padding: [20,0,100,50],
            textStyle: {
              fontSize: 13,
              color:'white'
            },
            left: 'left'
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
                  //magicType: {show: true, type: ['line']},
                  //restore: {show: true},
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
            name: '累计确诊人数',
            type: 'bar',
            data: [],
            barMaxWidth: "50%"
          }]
        };
        let option2 = {
			title: {
				text: '',
        padding: [20,0,100,50],
				textStyle: {
					fontSize: 13,
					color:'white'
				},
				left: 'left'
			},
			legend: {
				data: ['累计确诊', '当前新增', '累计治愈','累计死亡'],
				left: 'center'
			},
			// grid: {
			// 	top: 50, 
			// 	left: '4%',
			// 	right: '6%',
			// 	bottom: '4%',
			// 	containLabel: true
			// },
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
                 // magicType: {show: true, type: ['bar']},
                  //restore: {show: true}, 
				  saveAsImage: {show: true}
              }
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					//interval: 1 
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
			series:[{
                name: '累计确诊',
                data: [],
                type: 'line',
                smooth: true
              },
              {
                name: '当前新增',
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
      	};

        let objArr = []
        switch(this.type){
          case 'city':
            // 渲染饼状图
            for(let i=0; i<this.tableData.length; i++){
                if(this.tableData[i].provinceName == this.provinceName){
                    let obj = {
                     name: this.tableData[i].cityName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
                }
           }
            option.title.text = `${this.provinceName} 各城市饼状图（累计确诊）`
            option.series[0].data = objArr
            myChart.setOption(option)
            // 渲染柱状图
            let xData1 = []
            let myChart1SData1 = []
            for(let i=0; i<objArr.length; i++){
                xData1.push(objArr[i].name)
                myChart1SData1.push(objArr[i].value)
            }
             option1.title.text = `${this.provinceName} 各城市柱状图（累计确诊）`
             option1.xAxis.data = xData1
             option1.series[0].data = myChart1SData1
             myChart1.setOption(option1)
            // 渲染折线图
            let xLineData = []
            let Lines1 = []
            let Lines2 = []
            let Lines3 = []
            let Lines4 = []
            for(let i=0; i<this.tableData.length; i++){
              if(this.tableData[i].provinceName == this.provinceName){
                xLineData.push(this.tableData[i].cityName)
                Lines1.push(this.tableData[i].confirmedCount)
                Lines2.push(this.tableData[i].currentConfirmedCount)
                Lines3.push(this.tableData[i].curedCount)
                Lines4.push(this.tableData[i].deadCount)
              }
            }
            option2.title.text = `${this.provinceName} 各城市折线图`
            option2.xAxis.data = xLineData
            option2.series[0].data = Lines1
            option2.series[1].data = Lines2
            option2.series[2].data = Lines3
            option2.series[3].data = Lines4
             myChart2.setOption(option2)
            break;
           case 'province':
             // 渲染饼状图
             for(let i=0; i<this.tableData.length; i++){
                 let obj = {
                     name: this.tableData[i].provinceName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
            }
            option.title.text = `国内各省份饼状图（累计确诊）`
            option.series[0].data = objArr
            myChart.setOption(option)
            // 渲染柱状图
            let xData = []
            let myChart1SData = []
            for(let i=0; i<objArr.length; i++){
                xData.push(objArr[i].name)
                myChart1SData.push(objArr[i].value)
            }
             option1.title.text = `国内各省份柱状图（累计确诊）`
             option1.xAxis.data = xData
             option1.series[0].data = myChart1SData
             myChart1.setOption(option1)
            // 渲染折线图
            let xLineData1 = []
            let ser1 = []
            let ser2 = []
            let ser3 = []
            let ser4 = []
            for(let i=0; i<this.tableData.length; i++){
                xLineData1.push(this.tableData[i].provinceName)
                ser1.push(this.tableData[i].confirmedCount)
                ser2.push(this.tableData[i].currentConfirmedCount)
                ser3.push(this.tableData[i].curedCount)
                ser4.push(this.tableData[i].deadCount)
            }
             option2.title.text = `国内各省份折线图`
             option2.xAxis.data = xLineData1
             option2.series[0].data = ser1
             option2.series[1].data = ser2
             option2.series[2].data = ser3
             option2.series[3].data = ser4
             myChart2.setOption(option2)
            break;
          case 'county':
            // 渲染饼状图
            for(let i=0; i<this.tableData.length; i++){
                if(this.tableData[i].continents == this.area){
                    let obj = {
                     name: this.tableData[i].countryName,
                     value: this.tableData[i].confirmedCount
                 }
                objArr.push(obj)
                }
            }
            option.title.text = `${this.area} 区域各国饼状图（累计确诊）`
            option.series[0].data = objArr
            myChart.setOption(option)
             // 渲染柱状图
            let xData2 = []
            let myChart1SData2 = []
            for(let i=0; i<objArr.length; i++){
                xData2.push(objArr[i].name)
                myChart1SData2.push(objArr[i].value)
            }
             option1.title.text = `${this.area} 区域各国柱状图（累计确诊）`
             option1.xAxis.data = xData2
             option1.series[0].data = myChart1SData2
             myChart1.setOption(option1)
            // 渲染折线图
            let xLineData2 = []
            let series1 = []
            let series2 = []
            let series3 = []
            let series4 = []
           for(let i=0; i<this.tableData.length; i++){
              if(this.tableData[i].continents == this.area){
                xLineData2.push(this.tableData[i].countryName)
                series1.push(this.tableData[i].confirmedCount)
                series2.push(this.tableData[i].currentConfirmedCount)
                series3.push(this.tableData[i].curedCount)
                series4.push(this.tableData[i].deadCount)
              }
            }
            option2.title.text = `${this.area} 区域各国折线图`
            option2.xAxis.data = xLineData2
            option2.series[0].data = series1
            option2.series[1].data = series2
            option2.series[2].data = series3
            option2.series[3].data = series4
            myChart2.setOption(option2)
            break;
              }
      }
    },
    mounted() {
      this.width = $('#container').css('width')
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
      z-index:1999;
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