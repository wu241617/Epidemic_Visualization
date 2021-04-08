<template>
    <div>
        <el-row>
             <div v-for="item in guidesArr" :key="item.id">
            <el-col :span="8">
                <el-card  class="rec" shadow>
                    <div slot="header" class="clearfix">
                        <el-tag type="success">{{type}}</el-tag>
                        <el-tag type="danger">{{item.title}}</el-tag>
                    </div>
                     <div>
                         <img :src="item.contentImgUrls" alt="图片加载失败！">
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
            guidesArr:[],
            type:'类型'
        }
    },
     created(){
         // 获得指南
        this.axios.get('/statistics/goodsGuides').then((res) => {
          if(res){
               res.data.shift()
               this.guidesArr = res.data
          } 
        })
    },
}
</script>
<style lang="css" scoped>
.rec{
    height:800px;
    margin:0 5%;
    margin-bottom:30px;
}
.rec img{
    width:100%;
    height:700px;
    margin-bottom:3px;
}
.el-button{
    width:50px;
    height:25px;
    padding:0;
    margin-left:20px;
    margin-bottom:20px;
  }
</style>