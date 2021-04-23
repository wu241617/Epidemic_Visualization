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
          <div class="float" v-if="isFloat"></div>
          <el-table  
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            stripe
            max-height="430"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <!-- <el-table-column
              prop="id"
              label="#"
              width="80">
            </el-table-column> -->
            <el-table-column
              prop="countryName"
              label="国家"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="countryCode"
              label="编码"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="confirmedCount"
              label="确诊"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="confirmedIncr"
              label="新增"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="deadCount"
              label="死亡"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="curedCount"
              label="治愈"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="continents"
              label="地区"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
                  fixed="right"
                  label="操作"
                  width="200"
                  align="center">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-tooltip class="item" effect="dark" :content="title1" placement="top-start" >
                    <el-button @click="handleClick1(scope.row)" type="text" size="small" icon="el-icon-date" class="window">{{title1}}</el-button>
                    </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="title4" placement="top" style="margin-left:10px;">
                    <el-button @click="handleClick2(scope.row)" type="text" size="small" icon="el-icon-s-data" class="window">{{title4}}</el-button>
                    </el-tooltip>
                   </el-button-group>
                  </template>
            </el-table-column>
          </el-table>

          <el-pagination
          small
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        
        </el-card>
         <div class="container" v-if="isExit1">
         <City-Bar :tableData="tableData" @event="cls1($event)" :title="title2" :type="'county'"></City-Bar>
        </div>
         <div class="container1" v-if="isExit2">
          <City-Bar1 :rowData="rowData1" @event1="cls2($event)" :type="'county'"></City-Bar1>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import DateQuery from '@/components/DateQuery.vue'
import CityBar from '@/components/CityBar.vue'
import CityBar1 from '@/components/CityBar1.vue'

export default {
   data() {
      return {
        tableData: [],
        input:'',
        title:'根 据 国 家 名 称 筛 选',
        successMessage:'条件查询数据成功！',
        falieMessage:'条件查询数据失败！',
        successMessage1:'数据获取成功！',
        falieMessage1:'数据获取失败！',
        btnText:'查询',
        isExit:false,
        isExit1:false,
        isExit2:false,
        isFloat:false,
        rowData:{},
        rowData1:{},
        title1:'日期查询',
        title2:'全球各国柱状图',
        title3:'查看',
        title4:'柱状图',
        type:'Global',
        total:0,
        pageSize:10,
        currentPage:1
      }
    },
    components:{
      DateQuery,
      CityBar,
      CityBar1
    },
     methods: {
       handleSizeChange(val) {
         this.pageSize = val
      },
      handleCurrentChange(val) {
         this.currentPage = val
      },
      cls($event){
         this.isExit = $event
         this.isFloat = false
       },
       cls1($event){
         this.isExit1 = $event
         this.isFloat = false
       },
       cls2($event){
         this.isExit2 = $event
         this.isFloat = false
       },
        exitView(){
         this.isExit1 = true
         this.isFloat = true
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
       this.isFloat = true
      },
      handleClick2(row) {
       this.isExit2 = true
       this.rowData1 = row
       this.isFloat = true
      },
      serach(){
        if(this.input && this.input !== ''){
           this.axios.post('/countries/country',qs.stringify({'countryName':this.input}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res) => {
          this.tableData = res.data
          this.total = res.data.length
          this.pageSize = 5,
          this.currentPage = 1
          if(res.data && res.data.length !== 0){
             this.open2(this.successMessage)
          }else{
             this.open4(this.falieMessage)
          }
        })
        }else{
           this.axios.get('/countries').then((res)=>{
              this.tableData = res.data
               if(res.data && res.data.length !== 0){
             this.open2(this.successMessage)
          }else{
             this.open4(this.falieMessage)
          }
           })
        }
      },
      open2(str) {
        this.$message({
          showClose: true,
          message: str,
          type: 'success',
          offset:130,
           duration:1500
        });
      },
      open4(str) {
        this.$message({
          showClose: true,
          message: str,
          type: 'error',
          offset:130,
           duration:1500
        });
      }
    },
    created(){
          this.axios.get('/countries').then((res)=>{
            if(res.data && res.data.length !== 0){
                    this.open2(this.successMessage1)
                }else{
                    this.open4(this.falieMessage1)
                }
              this.tableData = res.data
              this.total =  res.data.length
              
        })
    }
  }
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
</style>

<style scoped>
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
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
    font-size:13px;
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
  .container1{
    width:60%;
    height:50%;
    position:absolute;
    top:25%;
    left:25%;
    z-index:1000;
  }
  .el-pagination{
    margin-top:20px;
    display: flex;
    justify-content: center;
  }
</style>>
