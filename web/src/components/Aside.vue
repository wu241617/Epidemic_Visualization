<template>
    <div class="body1">
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
    </div>
</template>
<script>

export default {
    data(){
        return {
            itemArr:this.$store.state.itemArr,
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
<style lang="css" scope>
    .body1{
        width:100%;
        height:100%;
        color: #333;
        text-align: center;
    }
    .body1 ul{
        border:none;
    }
</style>