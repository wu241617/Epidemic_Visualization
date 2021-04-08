<template>
    <!-- 最新整体统计 -->
  <div>
    <el-card ref="dom">
        <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="相关文章" name="first" >
              <Related-Articles></Related-Articles>
            </el-tab-pane>
            <el-tab-pane label="防疫指南" name="second">
              <Guides></Guides>
            </el-tab-pane>
            <el-tab-pane label="推荐信息" name="third" class="third">
              <Rec-Info></Rec-Info>
            </el-tab-pane>
            <el-tab-pane label="相关新闻" name="fourth" class="third">
              <Related-News></Related-News>
            </el-tab-pane>
      </el-tabs>
   </el-card>
  </div>
</template>
<script>
import RelatedArticles from '@/components/RelatedArticles.vue'
import RecInfo from '@/components/RecInfo.vue'
import Guides from '@/components/Guides.vue'
import RelatedNews from '@/components/RelatedNews.vue'

export default {
    data() {
      return {
         activeName: 'first'
      };
    },
    components:{
      RelatedArticles,
      RecInfo,
      Guides,
      RelatedNews
    },
    methods:{
      handleClick(tab, event) {
        switch(tab.label){
          case '相关文章':
            this.$refs.dom.$el.style.overflow = 'hidden'
            break;
           case '防疫指南':
            this.$refs.dom.$el.style.overflow = 'scroll'
            break;
          case '推荐信息':
            this.$refs.dom.$el.style.overflow = 'scroll'
            break;
          case '相关新闻':
            this.$refs.dom.$el.style.overflow = 'hidden'
            break;
        }
      }
    }
}
</script>

<style  scoped>
.el-card{
    max-height:620px;
    overflow-x:hidden !important;
}
.third{
    display:flex;
    flex-wrap: wrap;
    min-height:500px;
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