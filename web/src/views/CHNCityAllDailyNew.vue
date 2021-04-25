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
            <div style="float:right;display:flex;margin-right:50px;">
              <el-select v-model="value" filterable placeholder="请选择省份" size="small" style="width:100px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <el-tag type="success">{{title5}}<el-button type="text" style="float:right;" size="small" icon="el-icon-view" class="window" @click="exitView1">{{title2}}</el-button></el-tag>
            </div>
          </el-row>

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
              prop="cityName"
              label="城市"
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
              prop="currentConfirmedCount"
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
              prop="suspectedCount"
              label="疑似"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
                  fixed="right"
                  label="操作"
                  align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="title3" placement="top">
                    <el-button @click="handleClick1(scope.row)" type="text" size="small" icon="el-icon-s-data" class="window">{{title3}}</el-button>
                    </el-tooltip>
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
        <div class="container" v-if="isExit">
          <Bar-All :tableData="tableData" @event="cls($event)" :title="title1" :type="'city'" ></Bar-All>
        </div>
        <div class="container" v-if="isExit2">
         <Pie-All :tableData="tableData" @event="cls2($event)" :title="title5" :type="'city'" :provinceName="value"></Pie-All>
        </div>
        <div class="container1" v-if="isExit1">
          <Bar-Item :rowData="rowData" @event1="cls1($event)" :type="'city'"></Bar-Item>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import BarAll from '@/components/BarAll.vue'
import PieAll from '@/components/PieAll.vue'
import BarItem from '@/components/BarItem.vue'

export default {
     data(){
       return {
         successMessage:'条件查询数据成功！',
         falieMessage:'条件查询数据失败！',
         successMessage1:'数据获取成功！',
         falieMessage1:'数据获取失败！',
         tableData: [],
         input:'',
         title:'根 据 城 市 名 称 筛 选',
         btnText:'查询',
         isExit:false,
         isExit1:false,
         isExit2:false,
         title1:'国内城市柱状图',
         title5:'国内城市饼状图',
         title2:'查看',
         title3:'柱状图',
         rowData:{},
         total:0,
         pageSize:10,
         currentPage:1,
         isFloat:false,
         options: [{
          value: '安徽',
          label: '安徽'
        }, {
          value: '澳门',
          label: '澳门'
        }, {
          value: '北京',
          label: '北京'
        }, {
          value: '重庆',
          label: '重庆'
        }, {
          value: '福建',
          label: '福建'
        },{
          value: '广东',
          label: '广东'
        }, {
          value: '甘肃',
          label: '甘肃'
        }, {
          value: '广西',
          label: '广西'
        }, {
          value: '贵州',
          label: '贵州'
        }, {
          value: '湖北',
          label: '湖北'
        },{
          value: '河北',
          label: '河北'
        }, {
          value: '黑龙江',
          label: '黑龙江'
        }, {
          value: '湖南',
          label: '湖南'
        }, {
          value: '河南',
          label: '河南'
        }, {
          value: '海南',
          label: '海南'
        },{
          value: '吉林',
          label: '吉林'
        }, {
          value: '江苏',
          label: '江苏'
        }, {
          value: '江西',
          label: '江西'
        }, {
          value: '辽宁',
          label: '辽宁'
        }, {
          value: '内蒙古',
          label: '内蒙古'
        },{
          value: '宁夏',
          label: '宁夏'
        }, {
          value: '青海',
          label: '青海'
        }, {
          value: '四川',
          label: '四川'
        }, {
          value: '山东',
          label: '山东'
        }, {
          value: '上海',
          label: '上海'
        },{
          value: '陕西',
          label: '陕西'
        }, {
          value: '山西',
          label: '山西'
        }, {
          value: '天津',
          label: '天津'
        }, {
          value: '台湾',
          label: '台湾'
        }, {
          value: '香港',
          label: '香港'
        },{
          value: '新疆',
          label: '新疆'
        }, {
          value: '西藏',
          label: '西藏'
        }, {
          value: '云南',
          label: '云南'
        }, {
          value: '浙江',
          label: '浙江'
        }],
        value: '湖北'
       }
     },
     components:{
       BarAll,
       BarItem,
       PieAll
     },
     methods: {
      handleSizeChange(val) {
         this.pageSize = val
      },
      handleCurrentChange(val) {
         this.currentPage = val
      },
      handleClick1(row) {
       this.isExit1 = true
       this.rowData = row
       this.isFloat = true
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
         this.isExit = true
         this.isExit2 = false
         this.isFloat = true
       },
        exitView1(){
         this.isExit2 = true
         this.isExit = false
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
       serach(){
        if(this.input && this.input !== ''){
           this.axios.post('/cities/CHN/city',qs.stringify({'cityName':this.input}),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res) => {
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
           this.axios.get('/cities/CHN').then((res)=>{
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
          this.axios.get('/cities/CHN').then((res)=>{
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
    background-color:white;
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
  .float{
   width:100%;
   height:100%;
   background-color:rgba(0,0,0,.3);
   position:absolute;
   top:0;
   left:0;
   z-index:99;
 }
</style>>
