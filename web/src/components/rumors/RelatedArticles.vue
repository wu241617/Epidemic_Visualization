<template>
    <div>
          <el-card class="box-card" v-if="isExit">
                <div slot="header" class="clearfix">
                  <el-row>
                    <el-tag>{{title1}}</el-tag>
                    <el-tag type="success">{{title}}</el-tag>
                  </el-row>
                  <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left">
                  <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn"></el-button>
                  </el-tooltip>
                </div>
                <div class="mainBody">{{mainBody}}</div>
              </el-card>
              <div class="float" v-if="isExit"></div>

              <el-table
                :data="rumorsArr.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                style="width: 100%" height="480">
                <el-table-column
                  fixed
                  prop="title"
                  label="标题"
                  sortable
                 >
                </el-table-column>
                <el-table-column
                  prop="mainSummary"
                  label="主要总结"
                  sortable
                  >
                   <template slot-scope="scope">
                    <span :title="scope.row.mainSummary">{{scope.row.mainSummary}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="body"
                  label="主体内容"
                  sortable
                  width="500"
                  >
                </el-table-column>
                <!-- <el-table-column
                  prop="score"
                  label="文章编号"
                  width="80"
                >
                </el-table-column> -->
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="90"
                  align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="view" placement="top-start">
                    <el-button @click="handleClick1(scope.row)" type="text" size="small" icon="el-icon-view" class="view">{{view}}</el-button>
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
                  :page-sizes="[2, 4, 6, 8]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
      return {
        rumorsArr:[],
        isExit:false,
        title:'文章标题',
        mainBody:'文章内容',
        view:'内容查看',
        closeTitle:'关闭浮层',
        title1:'文章标题',
        total:0,
        pageSize:6,
        currentPage:1,
        successMessage:'数据获取成功！',
        falieMessage:'数据获取失败！'
      };
    },
    created(){
         // rumors 数据
        this.axios.get('/statistics/rumors').then((res) => {
            this.rumorsArr = res.data
            this.total =  res.data.length
            if(res.data && res.data.length !== 0){
                    this.open2()
                }else{
                    this.open4()
                }
        })
    },
    methods: {
       handleSizeChange(val) {
         this.pageSize = val
      },
      handleCurrentChange(val) {
         this.currentPage = val
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleClick1(row) {
        this.isExit = true
        this.title = row.title
        this.mainBody = row.body
      },
      closeBtn(){
          this.isExit = false
      },
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

<style lang="css" scoped>
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
    .el-table{
    /* background-color:rgba(0,0,0,.4); */
    position:relative;
    z-index:1;
}
.view:hover{
color:red;
}
.float{
   width:100%;
   height:100%;
   background-color:rgba(196, 193, 193, 0.3) !important;
   position:absolute;
   top:0;
   left:0;
   z-index:2;
 }
.main{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    z-index:999;
  }
  .close{
      position:absolute;
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
  .mainBody{
    letter-spacing:2px;
    line-height:25px;
    text-indent:2em;
  }
   .el-pagination{
    margin-top:20px;
    margin-bottom:10px;
    display: flex;
    justify-content: center;
  }
  /deep/ .el-table .cell{
     white-space: nowrap;
 } 
</style>