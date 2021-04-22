<template>
    <div class="body1">
      <el-button-group class="menu">
        <el-button type="primary"  size="small" icon="el-icon-s-unfold" @click="open" :disabled="isClose">展开</el-button>
        <el-button type="primary"  size="small" icon="el-icon-s-fold" @click="close" v-if="isClose">收起</el-button>
      </el-button-group>
        <el-row class="tac">
  <el-col>
    <el-menu
      :collapse="isCollapse"
      :default-active="this.$route.path"
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
            currentKey: '',
            isCollapse:false,
            isClose:true
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
      open(){
        this.isCollapse = false
        this.isClose = true
        this.$emit('event1','open')
      },
      close(){
        this.isCollapse = true
        this.isClose = false
        this.$emit('event1','close')
      },
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
        position: relative;
    }
    .body1 ul{
        border:none;
    }
    .menu{
      background:#409EFF;
      display: flex !important;
    }
    .menu /deep/ .el-button{
      width:75px;
      height:30px;
      border-radius: 0;
      border:0;
      margin:0;
      padding:0;
    }
    /deep/ .el-tooltip{
      background:red;
    }
</style>