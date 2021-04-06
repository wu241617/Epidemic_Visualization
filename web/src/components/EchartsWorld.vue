<template>
  <div class="echarts">
    <div :class="className" :id="id" :style="{height:'550px',width:'100%'}" ref="myEchart1"></div>
    <!-- <Title :title="title"></Title>
    <Search :placeholder="placeholder" :find="find" @listenSearch="searchItem" @listenAdd="addNew" @listenLeadIng="leadingItem"></Search> -->
    <!-- <div id="provinceChart" class="charts" ref="myEchart1" style="height:400px;"></div> -->
  </div>
</template>
<script>
  import echarts from "echarts";
  import '../../node_modules/echarts/map/js/world.js'
  import $ from "jquery"

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
        title: "图表",
        placeholder: "用户名/电话",
        find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
        chart: null
      };
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
      //搜索回调
      searchItem(val) {
        console.log(val)
      },
      //新增回调
      addNew(val) {
        console.log(val)
      },
      //导入
      leadingItem(val) {
        console.log(val)
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
                show: false, //省份名称
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
          url:"http://127.0.0.1:3000/api/countries",
          success:function(data){
            let mydata =  [
              {
                name:'Afghanistan',
                value: 28397
              },
              {
                name: 'Angola',
                value: 19549
              },
              {
                name: 'Albania',
                value: 3150
              },
              {
                name: 'United Arab Emirates',
                value: 8441
              },
              {
                name: 'Argentina',
                value: 40374
              },
              {
                name: 'Armenia',
                value: 2963
              },
              {
                name: 'French Southern and Antarctic Lands',
                value: 268
              },
              {
                name: 'Australia',
                value: 22404
              },
              {
                name: 'Austria',
                value: 8401
              },
              {
                name: 'Azerbaijan',
                value: 9094
              },
              {
                name: 'Burundi',
                value: 9232
              },
              {
                name: 'Belgium',
                value: 10941
              },
              {
                name: 'Benin',
                value: 9509
              },
              {
                name: 'Burkina Faso',
                value: 15540
              },
              {
                name: 'Bangladesh',
                value: 151125
              },
              {
                name: 'Bulgaria',
                value: 7389
              },
              {
                name: 'The Bahamas',
                value: 66402
              },
              {
                name: 'Bosnia and Herzegovina',
                value: 3845
              },
              {
                name: 'Belarus',
                value: 9491
              },
              {
                name: 'Belize',
                value: 308
              },
              {
                name: 'Bermuda',
                value: 64
              },
              {
                name: 'Bolivia',
                value: 716
              },
              {
                name: 'Brazil',
                value: 195210
              },
              {
                name: 'Brunei',
                value: 27
              },
              {
                name: 'Bhutan',
                value: 716
              },
              {
                name: 'Botswana',
                value: 1969
              },
              {
                name: 'Central African Republic',
                value: 4349
              },
              {
                name: 'Canada',
                value: 34126
              },
              {
                name: 'Switzerland',
                value: 7830
              },
              {
                name: 'Chile',
                value: 17150
              },
              {
                name: 'China',
                value: 1359821
              },
              {
                name: 'Ivory Coast',
                value: 60508
              },
              {
                name: 'Cameroon',
                value: 20624
              },
              {
                name: 'Democratic Republic of the Congo',
                value: 62191
              },
              {
                name: 'Republic of the Congo',
                value: 3573
              },
              {
                name: 'Colombia',
                value: 46444
              },
              {
                name: 'Costa Rica',
                value: 4669
              },
              {
                name: 'Cuba',
                value: 11281
              },
              {
                name: 'Northern Cyprus',
                value: 1468
              },
              {
                name: 'Cyprus',
                value: 1103
              },
              {
                name: 'Czech Republic',
                value: 10553
              },
              {
                name: 'Germany',
                value: 83017
              },
              {
                name: 'Djibouti',
                value: 834036
              },
              {
                name: 'Denmark',
                value: 5550
              },
              {
                name: 'Dominican Republic',
                value: 10016
              },
              {
                name: 'Algeria',
                value: 37062
              },
              {
                name: 'Ecuador',
                value: 15001
              },
              {
                name: 'Egypt',
                value: 78075
              },
              {
                name: 'Eritrea',
                value: 5741
              },
              {
                name: 'Spain',
                value: 46182
              },
              {
                name: 'Estonia',
                value: 1298
              },
              {
                name: 'Ethiopia',
                value: 87095
              },
              {
                name: 'Finland',
                value: 5367
              },
              {
                name: 'Fiji',
                value: 86055
              },
              {
                name: 'Falkland Islands',
                value: 49581
              },
              {
                name: 'France',
                value: 63230
              },
              {
                name: 'Gabon',
                value: 1556
              },
              {
                name: 'United Kingdom',
                value: 62066
              },
              {
                name: 'Georgia',
                value: 4388
              },
              {
                name: 'Ghana',
                value: 24262
              },
              {
                name: 'Guinea',
                value: 10876
              },
              {
                name: 'Gambia',
                value: 1680
              },
              {
                name: 'Guinea Bissau',
                value: 10876
              },
              {
                name: 'Equatorial Guinea',
                value: 696167
              },
              {
                name: 'Greece',
                value: 11109
              },
              {
                name: 'Greenland',
                value: 56546
              },
              {
                name: 'Guatemala',
                value: 14341
              },
              {
                name: 'French Guiana',
                value: 23116
              },
              {
                name: 'Guyana',
                value: 786126
              },
              {
                name: 'Honduras',
                value: 7621
              },
              {
                name: 'Croatia',
                value: 4338
              },
              {
                name: 'Haiti',
                value: 9896
              },
              {
                name: 'Hungary',
                value: 10014
              },
              {
                name: 'Indonesia',
                value: 240676
              },
              {
                name: 'India',
                value: 12054
              },
              {
                name: 'Ireland',
                value: 4467
              },
              {
                name: 'Iran',
                value: 240676
              },
              {
                name: 'Iraq',
                value: 30962
              },
              {
                name: 'Iceland',
                value: 318042
              },
              {
                name: 'Israel',
                value: 7420368
              },
              {
                name: 'Italy',
                value: 60508
              },
              {
                name: 'Jamaica',
                value: 2741
              },
              {
                name: 'Jordan',
                value: 6454
              },
              {
                name: 'Japan',
                value: 127352
              },
              {
                name: 'Kazakhstan',
                value: 15921
              },
              {
                name: 'Kenya',
                value: 40909
              },
              {
                name: 'Kyrgyzstan',
                value: 5334
              },
              {
                name: 'Cambodia',
                value: 14364
              },
              {
                name: 'South Korea',
                value: 51452
              },
              {
                name: 'Kosovo',
                value: 97743
              },
              {
                name: 'Kuwait',
                value: 299158
              },
              {
                name: 'Laos',
                value: 6395
              },
              {
                name: 'Lebanon',
                value: 4341
              },
              {
                name: 'Liberia',
                value: 3957
              },
              {
                name: 'Libya',
                value: 6040
              },
              {
                name: 'Sri Lanka',
                value: 20758
              },
              {
                name: 'Lesotho',
                value: 2008
              },
              {
                name: 'Lithuania',
                value: 3068
              },
              {
                name: 'Luxembourg',
                value: 507885
              },
              {
                name: 'Latvia',
                value: 2090
              },
              {
                name: 'Morocco',
                value: 316423
              },
              {
                name: 'Moldova',
                value: 103619
              },
              {
                name: 'Madagascar',
                value: 21079
              },
              {
                name: 'Mexico',
                value: 117886
              },
              {
                name: 'Macedonia',
                value: 507885
              },
              {
                name: 'Mali',
                value: 13985
              },
              {
                name: 'Myanmar',
                value: 51931
              },
              {
                name: 'Montenegro',
                value: 620078
              },
              {
                name: 'Mongolia',
                value: 271273
              },
              {
                name: 'Mozambique',
                value: 2396726
              },
              {
                name: 'Mauritania',
                value: 360942
              },
              {
                name: 'Malawi',
                value: 1501369
              },
              {
                name: 'Malaysia',
                value: 28275
              },
              {
                name: 'Namibia',
                value: 21789
              },
              {
                name: 'New Caledonia',
                value: 246379
              },
              {
                name: 'Niger',
                value: 15893
              },
              {
                name: 'Nigeria',
                value: 159707
              },
              {
                name: 'Nicaragua',
                value: 5822
              },
              {
                name: 'Netherlands',
                value: 16615
              },
              {
                name: 'Norway',
                value: 489125
              },
              {
                name: 'Nepal',
                value: 26846
              },
              {
                name: 'New Zealand',
                value: 4368
              },
              {
                name: 'Oman',
                value: 2802768
              },
              {
                name: 'Pakistan',
                value: 173149
              },
              {
                name: 'Panama',
                value: 367812
              },
              {
                name: 'Peru',
                value: 2926283
              },
              {
                name: 'Philippines',
                value: 934443
              },
              {
                name: 'Papua New Guinea',
                value: 685845
              },
              {
                name: 'Poland',
                value: 38198.754
              },
              {
                name: 'Puerto Rico',
                value: 370671
              },
              {
                name: 'North Korea',
                value: 1468
              },
              {
                name: 'Portugal',
                value: 10589
              },
              {
                name: 'Paraguay',
                value: 64597
              },
              {
                name: 'Qatar',
                value: 17497
              },
              {
                name: 'Romania',
                value: 218614
              },
              {
                name: 'Russia',
                value: 218476
              },
              {
                name: 'Rwanda',
                value: 108732
              },
              {
                name: 'Western Sahara',
                value: 514648
              },
              {
                name: 'Saudi Arabia',
                value: 27258
              },
              {
                name: 'Sudan',
                value: 35652
              },
              {
                name: 'South Sudan',
                value: 994929
              },
              {
                name: 'Senegal',
                value: 12950
              },
              {
                name: 'Solomon Islands',
                value: 526447
              },
              {
                name: 'Sierra Leone',
                value: 575976
              },
              {
                name: 'El Salvador',
                value: 621195
              },
              {
                name: 'Somaliland',
                value: 963173
              },
              {
                name: 'Somalia',
                value: 963673
              },
              {
                name: 'Republic of Serbia',
                value: 357324
              },
              {
                name: 'Suriname',
                value: 52496
              },
              {
                name: 'Slovakia',
                value: 5433437
              },
              {
                name: 'Slovenia',
                value: 205232
              },
              {
                name: 'Sweden',
                value: 9382.297
              },
              {
                name: 'Swaziland',
                value: 119148
              },
              {
                name: 'Syria',
                value: 783534
              },
              {
                name: 'Chad',
                value: 11720.781
              },
              {
                name: 'Togo',
                value: 630014
              },
              {
                name: 'Thailand',
                value: 664316
              },
              {
                name: 'Tajikistan',
                value: 76326
              },
              {
                name: 'Turkmenistan',
                value: 504995
              },
              {
                name: 'East Timor',
                value: 1001797
              },
              {
                name: 'Trinidad and Tobago',
                value: 132095
              },
              {
                name: 'Tunisia',
                value: 106383
              },
              {
                name: 'Turkey',
                value: 7213546
              },
              {
                name: 'United Republic of Tanzania',
                value: 449733
              },
              {
                name: 'Uganda',
                value: 3398213
              },
              {
                name: 'Ukraine',
                value: 460522
              },
              {
                name: 'Uruguay',
                value: 337982
              },
              {
                name: 'United States of America',
                value: 31224116
              },
              {
                name: 'Uzbekistan',
                value: 277627
              },
              {
                name: 'Venezuela',
                value: 23699
              },
              {
                name: 'Vietnam',
                value: 890397
              },
              {
                name: 'Vanuatu',
                value: 23699
              },
              {
                name: 'West Bank',
                value: 1565
              },
              {
                name: 'Yemen',
                value: 227008
              },
              {
                name: 'South Africa',
                value: 514352
              },
              {
                name: 'Zambia',
                value: 1321985
              },
              {
                name: 'Zimbabwe',
                value: 1307978
              }
            ]
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