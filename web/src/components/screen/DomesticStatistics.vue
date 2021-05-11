<template>
    <!-- 最新整体统计 -->
    <div class="body">
        <el-row>
            <span class="titleStyle">{{title}}</span>
             <el-button-group>
                <el-button type="primary" @click="getGuoNei" size="small" :disabled="isDisabled0">{{GlobalType[0]}}</el-button>
                <el-button type="warning" @click="getGuoJi" size="small" :disabled="isDisabled1">{{GlobalType[1]}}</el-button>
                <el-button type="danger" @click="getQuanQiu" size="small" :disabled="isDisabled2">{{GlobalType[2]}}</el-button>
             </el-button-group>
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
</template>
<script>
export default {
    data(){
        return {
            title:'国内最新统计数据',
            numArr: this.$store.state.ShowTitle,
            numData:[],
            GlobalType: this.$store.state.GlobalType,
            isDisabled0:true,
            isDisabled1:false,
            isDisabled2:false
        }
    },
     created(){
        // 得到最新统计数据
        this.axios.get('/statistics').then((res)=>{
             this.numData = res.data
             this.numArr[0].num = res.data[1].confirmedCount
             this.numArr[1].num = res.data[1].currentConfirmedCount
             this.numArr[2].num = res.data[1].curedCount
             this.numArr[3].num = res.data[1].deadCount
        })
    },
    methods:{
        getGuoNei(){
             this.title = '国内最新统计数据'
             this.isDisabled0 = true
             this.isDisabled1 = false
             this.isDisabled2 = false
             this.numArr[0].num = this.numData[1].confirmedCount
             this.numArr[1].num = this.numData[1].currentConfirmedCount
             this.numArr[2].num = this.numData[1].curedCount
             this.numArr[3].num = this.numData[1].deadCount
        },
        getGuoJi(){
             this.title = '国际最新统计数据'
             this.isDisabled0 = false
             this.isDisabled1 = true
             this.isDisabled2 = false
             this.numArr[0].num = this.numData[2].confirmedCount
             this.numArr[1].num = this.numData[2].currentConfirmedCount
             this.numArr[2].num = this.numData[2].curedCount
             this.numArr[3].num = this.numData[2].deadCount
        },
        getQuanQiu(){
             this.title = '全球最新统计数据'
             this.isDisabled0 = false
             this.isDisabled1 = false
             this.isDisabled2 = true
             this.numArr[0].num = this.numData[0].confirmedCount
             this.numArr[1].num = this.numData[0].currentConfirmedCount
             this.numArr[2].num = this.numData[0].curedCount
             this.numArr[3].num = this.numData[0].deadCount
        }
    }
}
</script>
<style scoped>
.body{
    width:100%;
    height:100%;
}
.el-row{
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items: center;
}
.titleStyle{
    font-size:13.5px;
    color:white;
    margin:5px 240px 0px 15px;
}
 .el-button{
    width:50px;
    height:25px;
    text-align: center;
    line-height:25px;
    padding:0;
    opacity: 0.8;
    margin-top:10px;
    margin-left:20px;
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