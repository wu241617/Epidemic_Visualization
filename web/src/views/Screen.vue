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
           <Domestic-Statistics></Domestic-Statistics>
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
import BarChart1 from '@/components/screen/BarChart1'
import LineChart from '@/components/screen/LineChart.vue'
import LineChart1 from '@/components/screen/LineChart1.vue'
import BarChart from '@/components/screen/BarChart'
import PieChart from '@/components/screen/PieChart'
import DomesticStatistics from '@/components/screen/DomesticStatistics'

export default {
    data(){
        return {
            time: 0,
            successMessage:'数据获取成功！',
            falieMessage:'数据获取失败！'
        }
    },
    created(){
        // 得到服务器端时间
        this.axios.get('/getTime').then((res) => {
            this.time = res.data
            if(res.data && res.data.length !== 0){
                this.open2()
            }else{
                this.open4()
            }
        })
    },
    components:{
        LineChart,
        LineChart1,
        BarChart,
        BarChart1,
        PieChart,
        DomesticStatistics
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
    border-right:0;
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
</style>