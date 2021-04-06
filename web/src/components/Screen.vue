<template>
    <!-- 数据大屏展示 -->
    <div>
        <div class="l1">
            <Line-Chart></Line-Chart>
        </div>
        <div class="l2">
           <Line-Chart1></Line-Chart1>
        </div>
        <div class="c1">
           <el-row>
           <el-button type="success" @click="getGuoNei">国内</el-button>
           <el-button type="danger" @click="getGuoJi">国际</el-button>
           <el-button type="primary" @click="getQuanQiu">全球</el-button>
          </el-row>
            <div class="num">
                <h1>{{numArr[0].num}}</h1>
            </div>
            <div class="num">
                <h1>{{numArr[1].num}}</h1>
            </div>
            <div class="num">
                <h1>{{numArr[2].num}}</h1>
            </div>
            <div class="num">
                <h1>{{numArr[3].num}}</h1>
            </div>
            <div class="txt">
                <h2>{{numArr[0].title}}</h2>
            </div>
             <div class="txt">
                <h2>{{numArr[1].title}}</h2>
            </div>
             <div class="txt">
                <h2>{{numArr[2].title}}</h2>
            </div>
             <div class="txt">
                <h2>{{numArr[3].title}}</h2>
            </div>
        </div>
        <div class="c2">
            <Bar-Chart1></Bar-Chart1>
        </div>
        <div class="r1">
            <Bar-Chart></Bar-Chart>
        </div>
        <div class="r2">
            <Pie-Chart></Pie-Chart>
        </div>
    </div>
</template>

<script>
import BarChart1 from '@/components/BarChart1'
import LineChart from '@/components/LineChart.vue'
import LineChart1 from '@/components/LineChart1.vue'
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'

export default {
    data(){
        return {
            numArr:[{title:'累计确诊',num:0},{title:'当前确诊',num:0},{title:'累计治愈',num:0},{title:'累计死亡',num:0}],
            numData:[],
            time: 0,
            isExist: true
        }
    },
    created(){
        // 得到最新统计数据
        this.axios.get('http://127.0.0.1:3000/api/statistics').then((res)=>{
             this.numData = res.data
             this.numArr[0].num = res.data[1].confirmedCount
             this.numArr[1].num = res.data[1].currentConfirmedCount
             this.numArr[2].num = res.data[1].curedCount
             this.numArr[3].num = res.data[1].deadCount
        })
        // 得到服务器端时间
        this.axios.get('http://127.0.0.1:3000/api/getTime').then((res) => {
            this.time = res.data
        })
    },
    components:{
        // ChinaMap,
        // WorldMap,
        LineChart,
        LineChart1,
        BarChart,
        BarChart1,
        PieChart
    },
    methods:{
        getGuoNei(){
             this.numArr[0].num = this.numData[1].confirmedCount
             this.numArr[1].num = this.numData[1].currentConfirmedCount
             this.numArr[2].num = this.numData[1].curedCount
             this.numArr[3].num = this.numData[1].deadCount
        },
        getGuoJi(){
             this.numArr[0].num = this.numData[2].confirmedCount
             this.numArr[1].num = this.numData[2].currentConfirmedCount
             this.numArr[2].num = this.numData[2].curedCount
             this.numArr[3].num = this.numData[2].deadCount
        },
        getQuanQiu(){
             this.numArr[0].num = this.numData[0].confirmedCount
             this.numArr[1].num = this.numData[0].currentConfirmedCount
             this.numArr[2].num = this.numData[0].curedCount
             this.numArr[3].num = this.numData[0].deadCount
        },
        getChinaMap(){
           this.isExist = true
        },
        getWorldMap(){
            this.isExist = false
        }
    }
}
</script>

<style scoped>
.c1{
    position:absolute;
    width:40%;
    height:100%;
    top:0;
    left:30%;
    color:white;
    border-left:1px solid white;
}
.c1 .el-button,.c2 .el-button{
    width:40px;
    height:20px;
    text-align: center;
    line-height:20px;
    padding:0;
    margin-left:20px;
    opacity: 0.8;
    margin-top:10px;
}
.c2{
    position:absolute;
    width:40%;
    height:75%;
    top:25%;
    left:30%;
    border:1px solid white;
}
.l1{
    position:absolute;
    width:30%;
    height:50%;
    top:0;
    left:0%;
    }
.l2{
    position:absolute;
    width:30%;
    height:50%;
    top:50%;
    left:0%;
    border-top:1px solid white;
}
.r1{
    position:absolute;
    width:30%;
    height:50%;
    top:0;
    left:70%;
    border:1px solid white;
    border-top:0;
}
.r2{
    position:absolute;
    width:30%;
    height:50%;
    top:50%;
    left:70%;
    border:1px solid white;
}
.num{
    width:25%;
    float:left;
    display:flex;
    align-items:center;
    justify-content: center;
    color:gold;
    font-size:14px;
    margin:3% 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.txt{
    width:25%;
    float:left;
    font-family: "幼圆";
    display:flex;
    align-items: center;
    justify-content: center;
    font-size:14px;
}
.txt h2{
    margin-top:0;
}
</style>