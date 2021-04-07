<template>
     <el-container>
    <el-header>
       <img :src="imgUrl" :alt="imgFailure" class="logo">
      <div class="title">{{title}}</div>
      <div class="timeBox">{{time}}
        <span class='time'></span>
      </div>
    </el-header>
    <el-container>
  <el-aside width="150px">
    <el-row class="tac">
  <el-col>
    <el-menu
      :default-active="this.currentKey"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-menu-item index="/Screen">
        <i class="el-icon-video-camera"></i>
        <span slot="title" >{{itemArr[0]}}</span>
      </el-menu-item>
      <el-menu-item index="/ChinaMap">
        <i class="el-icon-location"></i>
        <span slot="title">{{itemArr[1]}}</span>
      </el-menu-item>
       <el-menu-item index="/WorldMap">
        <i class="el-icon-location"></i>
        <span slot="title" >{{itemArr[2]}}</span>
      </el-menu-item>
      <el-menu-item index="/Statistics/globalStatistics">
        <i class="el-icon-menu"></i>
        <span slot="title" >{{itemArr[3]}}</span>
      </el-menu-item>
      <el-menu-item index="/CHN/provinceAll/dailyNew">
        <i class="el-icon-document"></i>
        <span slot="title" >{{itemArr[4]}}</span>
      </el-menu-item>
      <el-menu-item index="/CHN/cityAll/dailyNew">
        <i class="el-icon-setting"></i>
        <span slot="title" >{{itemArr[5]}}</span>
      </el-menu-item>
       <el-menu-item index="/Rumors">
        <i class="el-icon-s-marketing"></i>
        <span slot="title">{{itemArr[6]}}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
  </el-container>
</el-container>
</template>
<script>
import logo from '@/assets/img/logo.png'
import $ from 'jquery'

// 动态获取系统当前时间
$(function(){
  function current(){
  let d = new Date()
  let str=''
  str +=d.getFullYear()+'年' //获取当前年份
  str +=d.getMonth()+1+'月' //获取当前月份（0——11）
  str +=d.getDate()+'日'
  str +=(d.getHours()<=9 ? '0'+d.getHours() : d.getHours())+'时'
  str +=(d.getMinutes()<=9 ? '0'+d.getMinutes() : d.getMinutes())+'分'
  str +=(d.getSeconds()<=9 ? '0'+d.getSeconds() : d.getSeconds())+'秒'
  return str; 
}
setInterval(function(){$(".time").html(current)},1000); 
})

export default {
    data(){
        return {
            activeIndex: '1',
            imgUrl:logo,
            title: this.$store.state.projectTitle,
            time: this.$store.state.projectTime,
            itemArr:this.$store.state.itemArr,
            imgFailure: this.$store.state.imgFailure,
            currentKey: ''
        }
    },
    mounted(){
      if(window.name == ""){
          this.currentKey = '/Screen'
       // 在首次进入页面时我们给window.name设置一个固定值(isRefresh) 
           window.name = "isRefresh"; 
       }else if(window.name == "isRefresh"){
           this.currentKey = this.formatting(window.location.hash)
       }
    },
    destroyed() {
      window.name = "";
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
      },
      formatting(str){
        let arr = str.split('')
        let newStr = ''
        arr.forEach((item,index) => {
          if(index !== 0){
            newStr += item
          }
        })
        return newStr
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
    background-color: rgb(84, 92, 100);
  }
  .el-header>.logo{
      width:40px;
      height:65%;
      border-radius: 50%;
      margin-left:500px;
  }

  .el-header ul{
      width:80%;
  }
  
  .el-aside {
    background-color: rgb(84, 92, 100);;
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
  .title{
    width:30%;
    height:10%;
    font-size:22px;
    display:flex;
    justify-content: center;
    align-items: center;
    color: white; 
    text-shadow: black 0.1em 0.1em 0.2em
}
.timeBox{
  font-size:14px;
  margin-left:100px;
  color: white; 
  text-shadow: black 0.1em 0.1em 0.2em
}
</style>