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
            guidesArr:[{contentImgUrls:'https://img1.dxycdn.com/2020/0225/169/3398653034208226202-135.png',title:'口罩指南'},{contentImgUrls:'https://img1.dxycdn.com/2020/0215/703/3396784974690083861-135.png',title:'洗手液指南'},{contentImgUrls:'https://img1.dxycdn.com/2020/0215/743/3396785021934726693-135.png',title:'温度计指南'}],
            type:'类型',
            successMessage:'数据获取成功！',
            falieMessage:'数据获取失败！'
        }
    },
     created(){
         // 获得指南
        // this.axios.get('/statistics/goodsGuides').then((res) => {
        //   if(res){
        //        this.open2()
        //        res.data.shift()
        //        this.guidesArr = res.data
        //   }else{
        //        this.open4()
        //   } 
        // })
    },
    methods: {
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