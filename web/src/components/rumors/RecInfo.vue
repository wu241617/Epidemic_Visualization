<template>
    <div>
        <el-row>
            <div v-for="item in recArr" :key="item.id">
            <el-col :span="6">
                <el-card  class="rec" shadow>
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top-start">
                            <el-tag class="text main" type="info">{{item.title}}</el-tag>
                        </el-tooltip>
                    </div>
                     <div>
                         <img :src="item.imgUrl" alt="图片加载失败！">
                         <el-button @click="view(item.linkUrl)" type="text" style="float: right; margin: 3px 10px" class="window" size="small" icon="el-icon-s-promotion" >{{title}}</el-button>
                    </div>
                </el-card>
            </el-col>
        </div>

        <div v-for="item in wikisArr" :key="item.id">
            <el-col :span="6">
                <el-card  class="rec" shadow>
                    <div slot="header" class="clearfix">
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="top-start">
                            <el-tag class="text main" type="info">{{item.title}}</el-tag>
                        </el-tooltip>
                    </div>
                     <div>
                         <img :src="item.imgUrl" alt="图片加载失败！">
                         <el-button @click="view(item.linkUrl)" type="text" style="float: right; margin: 3px 10px" class="window" size="small" icon="el-icon-s-promotion" >{{title}}</el-button>
                    </div>
                </el-card>
            </el-col>
        </div>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            recArr:[],
            wikisArr:[],
            title:'查看详情'
        }
    },
     created(){
       // 获得推荐数据
        this.axios.get('/statistics/recommends').then((res) => {
          if(res){
               this.recArr = res.data
          } 
        })
         this.axios.get('/statistics/wikis').then((res) => {
          if(res){
               res.data.shift()
               this.wikisArr = res.data
          } 
        })
    },
    methods: {
        view(url){
            window.open(url)
        }
    },  
}
</script>
<style scoped>
.rec{
    height:330px;
    margin:0 5%;
    margin-bottom:30px;
}
.rec img{
    width:100%;
    height:200px;
    margin-bottom:3px;
}
.el-button{
    width:50px;
    height:25px;
    padding:0;
    margin-left:20px;
    margin-bottom:20px;
  }
  .main{
    display: block;
    width: 100%;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.window:hover{
  color:red;
}
</style>