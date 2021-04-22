<template>
     <el-container>
    <el-header :style="note">
      <Header></Header>
    </el-header>
    <el-container>
  <el-aside width="150px" id="aside">
    <Aside @event1="handle($event)"></Aside>
  </el-aside>
  <el-main id="main">
    <router-view></router-view>
  </el-main>
  </el-container>
</el-container>
</template>
<script>
import Header from '@/components/common/Header.vue'
import Aside from '@/components/common/Aside.vue'
import $ from 'jquery'

export default {
    data(){
      return {
        note: {
          backgroundImage: "url(" + require("@/assets/img/bage.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
         }
      }
    },
    components:{
      Header,
      Aside
    },
    methods:{
      handle($event){
        if($event == 'open'){
          $('#aside').css('width','150px')
          $('#main').css('width','calc(100vw - 150px)')
        }else{
          $('#aside').css('width','75px')
          $('#main').css('width','calc(100vw - 75px)')
        }
      }
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
    border-bottom:1px solid white;
  }

  .el-header ul{
      width:80%;
  }
  
  .el-aside {
    color: white; 
    text-shadow: black 0.1em 0.1em 0.2em;
    text-align: center;
    height: 100%;
    /* width:cacl(100vw-200px); */
    background-color: rgb(84, 92, 100);
    border-right:0.5px solid white;
    overflow-x:hidden;
  }
  .el-aside ul{
    border:none;
  }
  
  .el-main {
    color: white;
    height: 100%;
    position: relative;
    background-color:#333;
    overflow: hidden;
    width:cacl(100vw - 150px);
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