<template>
    <div class="body">
        <img :src="imgUrl" :alt="imgFailure" class="logo">
      <div class="title">{{title}}</div>
      <div class="timeBox">{{time}}
        <span class='time'></span>
      </div>
    </div>
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
            imgUrl:logo,
            title: this.$store.state.projectTitle,
            time: this.$store.state.projectTime,
            imgFailure: this.$store.state.imgFailure
        }
    }
}
</script>
<style lang="css" scoped>
.body{
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-left:120px;
}
.logo{
      width:40px;
      height:65%;
      border-radius: 50%;
      animation:move 3s infinite linear;
  }
.title{
    width:30%;
    height:10%;
    font-size:22px;
    display:flex;
    justify-content: center;
    align-items: center;
    color: white; 
    text-shadow: black 0.1em 0.1em 0.2em;
    margin-right:300px;
}
.timeBox{
  font-size:14px;
  margin-left:100px;
  color: white; 
  text-shadow: black 0.1em 0.1em 0.2em;
}
@keyframes move{
  0%{transform: rotate(0deg);}
  100%{transform: rotate(360deg);}
}
</style>

