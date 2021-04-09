<template>
    <!-- 最新整体统计 -->
    <div>
        <el-card>
          <el-tag type="danger">{{title}}</el-tag>
          <el-row>
             <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input"
              clearable
              @keydown.enter.native="serach">
            </el-input>
            <el-button type="primary" @click="serach" icon="el-icon-search">{{btnText}}</el-button>
            <el-tag type="warning" style="float:right;">{{title1}}<el-button type="text" style="float:right;margin:0;" size="small" icon="el-icon-view" class="window" @click="exitView">{{title2}}</el-button></el-tag>
          </el-row>
          <el-table
            :data="tableData"
            border
            stripe
            max-height="475"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <!-- <el-table-column
              prop="id"
              label="#"
              width="80">
            </el-table-column> -->
            <el-table-column
              prop="cityName"
              label="城市">
            </el-table-column>
            <el-table-column
              prop="confirmedCount"
              label="确诊"
              >
            </el-table-column>
            <el-table-column
              prop="currentConfirmedCount"
              label="新增"
              >
            </el-table-column>
            <el-table-column
              prop="deadCount"
              label="死亡">
            </el-table-column>
            <el-table-column
              prop="curedCount"
              label="治愈">
            </el-table-column>
            <el-table-column
              prop="suspectedCount"
              label="疑似">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份">
            </el-table-column>
          </el-table>
        </el-card>
        <div class="container" v-if="isExit">
          <City-Bar :tableData="tableData" @event="cls($event)" :title="title1"></City-Bar>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import CityBar from '@/components/CityBar.vue'

export default {
     data(){
       return {
         successMessage:'条件查询数据成功！',
         falieMessage:'条件查询数据失败！',
         tableData: [],
         input:'',
         title:'根 据 城 市 名 称 筛 选',
         btnText:'查询',
         isExit:false,
         title1:'国内城市柱状图',
         title2:'查看'
       }
     },
     components:{
       CityBar
     },
     methods: {
       cls($event){
         this.isExit = $event
       },
       exitView(){
         this.isExit = true
       },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
       serach(){
        if(this.input && this.input !== ''){
           this.axios.post('/cities/CHN/city',qs.stringify({'cityName':this.input}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res) => {
          this.tableData = res.data
           if(res.data && res.data.length !== 0){
             this.open2()
          }else{
             this.open4()
          }
        })
        }else{
           this.axios.get('/cities/CHN').then((res)=>{
              this.tableData = res.data
               if(res.data && res.data.length !== 0){
             this.open2()
          }else{
             this.open4()
          }
        })
        }
      },
      open2() {
        this.$message({
          showClose: true,
          message: this.successMessage,
          type: 'success',
          offset:130
        });
      },
      open4() {
        this.$message({
          showClose: true,
          message: this.falieMessage,
          type: 'error',
          offset:130
        });
      }
    },
    created(){
          this.axios.get('/cities/CHN').then((res)=>{
            if(res){
                this.tableData = res.data
            }    
        })
    }
  }
</script>

<style scoped>
.el-table{
    background-color:rgba(0,0,0,.4);
}
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
   .el-input{
    width:200px;
    height:30px;
    margin-bottom:20px;
  }
  .el-button{
    width:65px;
    height:30px;
    padding:0;
    margin-left:20px;
    margin-bottom:20px;
  }
  /deep/ .el-input--prefix .el-input__inner {
    height: 30px;
    line-height:30px;
  }
  /deep/ .el-input__prefix{
    top:-10%;
  }
  .el-tag{
    margin-bottom:20px;
    font-size:12px;
  }
  .window:hover{
    color:red;
  }
  .el-card{
    position:relative;
    z-index:999;
  }
  .container{
    width:80%;
    height:60%;
    position:absolute;
    top:8%;
    left:10%;
    z-index:1000;
  }
</style>>
