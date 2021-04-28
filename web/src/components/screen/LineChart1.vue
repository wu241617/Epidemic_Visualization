<template>
    <div>
        <div :style="{height:'321px',width:'96%',marginTop:'10px',padding:'0px 2%'}" ref="myEchart"></div>
    </div>
</template>
<script>
  import echarts from "echarts";
  import $ from "jquery"
  
  export default {
    name: "LineChart1",
    props: ["userJson"],
    data() {
      return {
        chart: null,
		text:'全国新增趋势',
		legendData:['新增确诊', '新增疑似'],
		seriesData:[{
					name: '新增确诊',
					data: [],
					type: 'line',
					// 设置小圆点消失
					// 注意：设置symbol: 'none'以后，拐点不存在了，设置拐点上显示数值无效
					// symbol: 'none',
					// 设置折线弧度，取值：0-1之间
					smooth: true
				},
				{
					name: '新增疑似',
					data: [],
					type: 'line',
					// 设置折线上圆点大小
					smooth: true
				}
			]
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
     	let option_left2 = {
      		// backgroundColor: '#FFF0F5',
			title: {
				text: this.text,
				// subtext: '模拟数据',
				// x: 'center',
				textStyle: {
					fontSize: 13,
					color:'white'
				},
				left: 'left'
			},
			legend: {
				// orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
				// orient: 'horizontal',
				// x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
				// x: 'left',
				// y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
				// y: 'top',
				data: this.legendData,
				left: 'center'
			},
			//  图表距边框的距离,可选值：'百分比'¦ {number}（单位px）
			grid: {
				top: 50, // 等价于 y: '16%'
				left: '4%',
				right: '6%',
				bottom: '4%',
				containLabel: true
			},
			// 提示框
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line',
					lineStyle: {
						color: '#7171C6'
					}
				}
			},
			//工具框，可以选择
			toolbox: {
				 show: true,
              feature: {
                  magicType: {show: true, type: ['bar']},
                  restore: {show: true}, 
				  saveAsImage: {show: true}
              }
			},
			xAxis: {
				// name: '周几',
				type: 'category',
				// axisLine: {
				// 	lineStyle: {
				// 		// 设置x轴颜色
				// 		color: '#912CEE'
				// 	}
				// },
				// // 设置X轴数据旋转倾斜
				axisLabel: {
					//rotate: 30, // 旋转角度
					interval: 1 //设置X轴数据间隔几个显示一个，为0表示都显示
				},
				// // boundaryGap值为false的时候，折线第一个点在y轴上
				// boundaryGap: false,
				data: []
			},
			yAxis: {
				// name: '数值',
				type: 'value',
				// min: 0, // 设置y轴刻度的最小值
				// max: 1800, // 设置y轴刻度的最大值
				// splitNumber: 9, // 设置y轴刻度间隔个数
				axisLine: {
					show: true
					// lineStyle: {
					// 	// 设置y轴颜色
					// 	color: '#87CEFA'
					// }
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
			series: this.seriesData
      		// color: ['#00EE00', '#FF9F7F', '#FFD700']
      	};

        $.ajax({
         // url:"http://127.0.0.1:3000/api/countries/daily/country/CHN",
		   url:"http://123.57.46.110:8900/api/countries/daily/country/CHN",
          success:function(data){
			  let newData = []
			  for(let i=0; i<data.length; i++){
				  if(data[i].dateId == 20200201 || data[i].dateId == 20200301 || data[i].dateId == 20200401 || data[i].dateId == 20200501 || data[i].dateId == 20200601 || data[i].dateId == 20200701 || data[i].dateId == 20200801 || data[i].dateId == 20200901 || data[i].dateId == 20201001 || data[i].dateId == 20201101 || data[i].dateId == 20201201 || data[i].dateId == 20210101){
					  newData.push(data[i])
				  }
			  }
			let xData = []
			let series1 = []
			let series2 = []
			for(let i=0; i<newData.length; i++){
				xData.push(newData[i].dateId)
				series1.push(newData[i].currentConfirmedCount)
				series2.push(newData[i].suspectedCount)
			}
			// option_left2.xAxis.data = xData
             option_left2.xAxis.data = ['20-02','20-03','20-04','20-05','20-06','20-07','20-08','20-09','20-10','20-11','20-12','21-01']
             option_left2.series[0].data = series1
			 option_left2.series[1].data = series2
             myChart.setOption(option_left2)
          }
        })
         myChart.setOption(option_left2)
      }
    }
  }
</script>