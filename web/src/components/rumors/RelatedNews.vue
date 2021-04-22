<template>
    <div class="container">
        <el-table
      :data="newsArr.slice((currentPage-1)*pageSize,currentPage*pageSize)"
       border
       stripe
       height="450"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="pubDateStr"
        label="时间"
        sortable
        width="250"
        align="center">
      </el-table-column>
      <el-table-column
        prop="infoSource"
        label="数据源"
        sortable
        width="250"
       align="center" >
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="title" placement="top-start">
                    <el-button @click="handleClick1(scope.row.sourceUrl)" type="text" size="small" icon="el-icon-s-promotion" class="window">{{title}}</el-button>
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
        :page-sizes="[2, 4, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    </div>
</template>
<script>
export default {
    data(){
        return {
            newsArr:[],
            title:'查看详情',
             total:0,
            pageSize:4,
            currentPage:1
        }
    },
     created(){
       // 获得推荐数据
        this.axios.get('/statistics/timelines').then((res) => {
          if(res){
               this.newsArr = res.data.reverse()
               this.total =  res.data.length
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
        view(url){
            window.open(url)
        }
    },  
}
</script>
<style lang="css" scoped>
.el-button{
    width:50px;
    height:25px;
    padding:0;
    margin-left:20px;
    margin-bottom:20px;
  }
  .container{
    width:100%;
    height:520px;
  }
  .window:hover{
  color:red;
}
.el-pagination{
    margin-top:20px;
    margin-bottom:10px;
    display: flex;
    justify-content: center;
  }
</style>