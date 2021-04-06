<template>
    <!-- 最新整体统计 -->
    <div>
        <el-card>
             <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="相关文章" name="first" >
        <el-card class="box-card" v-if="isExit">
  <div slot="header" class="clearfix">
    <span>{{title}}</span>
    <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn"></el-button>
  </div>
  <div>{{mainBody}}</div>
</el-card>
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
      width="60">
      <template slot-scope="scope">
        <el-button @click="handleClick1(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="推荐信息" name="third" class="third">
        <div v-for="item in recArr" :key="item.id" class="rec">
            <img :src="item.imgUrl" alt="图片加载失败！">
            <a :href="item.linkUrl">{{item.title}}</a>
        </div>
    </el-tab-pane>
  </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
      return {
        activeName: 'first',
        recArr:[],
        rumorsArr:[],
        isExit:false,
        title:'文章标题',
        mainBody:'文章内容'
      };
    },
    created(){
        // 获得推荐数据
        this.axios.get('http://127.0.0.1:3000/api/statistics/recommends').then((res) => {
            this.recArr = res.data
        })
        // rumors 数据
        this.axios.get('http://127.0.0.1:3000/api/statistics/rumors').then((res) => {
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

<style  scoped>
.el-card{
    max-height:620px;
}
.third{
    display:flex;
    flex-wrap: wrap;
    min-height:500px;
    overflow: scroll !important;
}
.rec{
    width:30%;
    height:250px;
    margin-right:3%;
    margin-bottom:30px;
}
.rec img{
    width:100%;
    height:200px;
    margin-bottom:3px;
}
.rec a{
    width:30%;
    height:50px;
    /* overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap; */
    text-decoration: none;
    color:rosybrown;
    padding:3px;
}
.rec a:hover{
    color:rgba(255,0,0,.5);
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
</style>