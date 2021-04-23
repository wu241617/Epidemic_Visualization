<template>
    <div>
            <el-row>
            <div v-for="item in data" :key="item.id">
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
            //recArr:[],
           // wikisArr:[],
            data:[],
            title:'查看详情',
            successMessage:'数据获取成功！',
            falieMessage:'数据获取失败！'
        }
    },
     created(){
       // 获得推荐数据
         this.axios.get('/statistics/wikis').then((res) => {
          if(res){
               res.data.shift()
               this.data =  this.formatData(res.data)
               if(res.data && res.data.length !== 0){
                    this.open2()
                }else{
                    this.open4()
                } 
          } 
        })
        this.axios.get('/statistics/recommends').then((res) => {
          if(res){
               this.data = this.data.concat(this.formatData(res.data))
          }
        })
    },
    methods: {
        formatData(arr){
            let newArr = []
            arr.forEach((item,index) => {
                let obj = {
                    title:item.title,
                    imgUrl:item.imgUrl,
                    linkUrl:item.linkUrl
                }
                newArr.push(obj)
            })
            return newArr
        },
        view(url){
            window.open(url)
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