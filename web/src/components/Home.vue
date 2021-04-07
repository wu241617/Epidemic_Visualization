<template>
     <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
  <el-aside width="150px">
    <Aside></Aside>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
  </el-container>
</el-container>
</template>
<script>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'

export default {
    components:{
      Header,
      Aside
    }
}
</script>

<style scoped>
.el-container{
    width:100%;
    height:100%;
    font-size:0.75rem;
    font-family: 微软雅黑;
}
.el-header{
    color: white;
    display:flex;
    justify-content: center;
    align-items: center;
    height: 12%;
    width:100%;
    background-color: rgb(84, 92, 100);
  }

  .el-header ul{
      width:80%;
  }
  
  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    text-align: center;
    height: 100%;
    width:cacl(100vw-200px);
  }
  .el-aside ul{
    border:none;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: white;
    height: 100%;
    position: relative;
    background-color:#333;
    overflow: hidden;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>