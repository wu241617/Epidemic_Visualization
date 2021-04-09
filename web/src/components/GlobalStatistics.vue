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
             <el-tag type="warning" style="float:right;">{{title2}}<el-button type="text" style="float:right;margin:0;" size="small" icon="el-icon-view" class="window" @click="exitView">{{title3}}</el-button></el-tag>
          </el-row>
          <Date-Query v-if="isExit" :isExit="isExit" @event="cls($event)" :rowData="rowData" :type="type"></Date-Query>
          <div class="float" v-if="isExit"></div>
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
              prop="countryName"
              label="国家">
            </el-table-column>
            <el-table-column
              prop="countryCode"
              label="编码">
            </el-table-column>
            <el-table-column
              prop="confirmedCount"
              label="确诊"
              >
            </el-table-column>
            <el-table-column
              prop="confirmedIncr"
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
              prop="continents"
              label="地区"
              >
            </el-table-column>
            <el-table-column
                  fixed="right"
                  label="操作"
                  >
                  <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" :content="title1" placement="top-start">
                        <el-button @click="handleClick1(scope.row)" type="text" size="small" icon="el-icon-view"  class="window">{{title1}}</el-button>
                    </el-tooltip>
                  </template>
            </el-table-column>
          </el-table>
        </el-card>
         <div class="container" v-if="isExit1">
         <City-Bar :tableData="tableData" @event="cls1($event)" :title="title2" :type="'county'"></City-Bar>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import DateQuery from '@/components/DateQuery.vue'
import CityBar from '@/components/CityBar.vue'

export default {
   data() {
      return {
        tableData: [],
        input:'',
        title:'根 据 国 家 名 称 筛 选',
        successMessage:'条件查询数据成功！',
        falieMessage:'条件查询数据失败！',
        btnText:'查询',
        isExit:false,
        isExit1:false,
        rowData:{},
        title1:'日期查询',
        title2:'全球各国柱状图',
        title3:'查看',
        type:'Global'
      }
    },
    components:{
      DateQuery,
      CityBar
    },
     methods: {
      cls($event){
         this.isExit = $event
       },
       cls1($event){
         this.isExit1 = $event
       },
        exitView(){
         this.isExit1 = true
       },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleClick1(row) {
       this.isExit = true
       this.rowData = row
      },
      serach(){
        if(this.input && this.input !== ''){
           this.axios.post('/countries/country',qs.stringify({'countryName':this.input}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res) => {
          this.tableData = res.data
          if(res.data && res.data.length !== 0){
             this.open2()
          }else{
             this.open4()
          }
        })
        }else{
           this.axios.get('/countries').then((res)=>{
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
          this.axios.get('/countries').then((res)=>{
            if(res){
               this.tableData = res.data
            }
              
        })
    }
  }
</script>

<style scoped>
.el-table{
    position:relative;
    z-index:1;
}
.window:hover{
  color:red;
}
.float{
   width:100%;
   height:100%;
   background-color:rgba(0,0,0,.3);
   position:absolute;
   top:0;
   left:0;
   z-index:2;
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
  .container{
    width:80%;
    height:60%;
    position:absolute;
    top:8%;
    left:10%;
    z-index:1000;
  }
</style>>
