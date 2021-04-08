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
                :data="rumorsArr"
                border
                style="width: 100%" max-height="550">
                <el-table-column
                  fixed
                  prop="title"
                  label="标题"
                >
                </el-table-column>
                <el-table-column
                  prop="mainSummary"
                  label="主要总结"
                  >
                </el-table-column>
                <el-table-column
                  prop="body"
                  label="主体内容"
                  width="500">
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="文章编号"
                  width="80"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="90">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="view" placement="top-start">
                    <el-button @click="handleClick1(scope.row)" type="text" size="small" icon="el-icon-view" class="view">{{view}}</el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
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
        title1:'文章标题'
      };
    },
    created(){
         // rumors 数据
        this.axios.get('/statistics/rumors').then((res) => {
            this.rumorsArr = res.data
        })
    },
    methods: {
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
      }
    }
}
</script>
<style lang="css" scoped>
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
   background-color:rgba(0,0,0,.1);
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
</style>