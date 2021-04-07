<template>
    <div>
        <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <el-tag type="success">{{titleText}}</el-tag>
                    <el-tag type="danger">{{title2}}</el-tag>
                  <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn"></el-button>
                </div>
                <div>
                     <div class="block">
                        <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期"
                        >
                        </el-date-picker>
                        <el-button type="primary" @click="search">{{title1}}</el-button>
                    </div>
                     <el-table
                    :data="tableData"
                    border
                    stripe
                    max-height="475"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    prop="dateId"
                    label="日期"
                   >
                    </el-table-column>
                    <template v-if="GlobalExit">
                         <el-table-column
                    prop="countryName"
                    label="国家">
                    </el-table-column>
                    <el-table-column
                    prop="countryCode"
                    label="编码">
                    </el-table-column>
                    </template>
                    <template v-if="CHNPrivinceExit">
                         <el-table-column
                    prop="provinceName"
                    label="省份">
                    </el-table-column>
                    <el-table-column
                    prop="provinceCode"
                    label="编码">
                    </el-table-column>
                    </template>
                    <el-table-column
                    prop="confirmedCount"
                    label="确诊"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="confirmedIncr"
                    label="新增"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="deadCount"
                    label="死亡">
                    </el-table-column>
                    <el-table-column
                    prop="curedCount"
                    label="治愈">
                    </el-table-column>
                </el-table>
                </div>
        </el-card>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    props:{
        isExit:Boolean,
        rowData:Object,
        type:String
    },
    data(){
        return {
            titleText: '',
            date:'',
            data:[],
            dateObj:this.$store.state.dateObj,
            tableData:[],
            title1:'查询',
            title2:'数据支持查询范围：（2020-02 至 2021-01）',
            GlobalExit:false,
            CHNPrivinceExit:false
        }
    },
    mounted(){
        switch(this.type){
            case 'Global':
                this.request('/countries/daily/country',{'countryName':this.rowData.countryName})
                this.titleText = this.rowData.countryName,
                this.GlobalExit = true
                break;
            case 'CHNPrivince':
                this.request('/provinces/CHN/daily/province',{'provinceName':this.rowData.provinceName})
                this.titleText = this.rowData.provinceName
                this.CHNPrivinceExit = true
                break;
        }
    },
    methods:{
        request(url,obj){
            this.axios.post(url,qs.stringify(obj),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.data = res.data
        })
        },
      closeBtn(){
          this.$emit('event',false)
      },
      format(str){
          let arr = String(str).split(' ')
          let  M = ''
          for(let i=0; i<this.dateObj.length; i++){
              if(this.dateObj[i].name  == arr[1]){
                  M = this.dateObj[i].value
              } 
          }
          let newStr = ''+arr[3]+M+arr[2]
          return newStr
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      search(){
        if(this.date == ''){
            return
        }else{
            this.data.forEach((item,index) => {
                if(item.dateId == this.format(this.date)){
                    switch(this.type){
                        case 'Global':
                            let obj = {
                                countryName: item.countryName,
                                dateId:item.dateId,
                                countryCode:item.countryCode,
                                confirmedCount:item.confirmedCount,
                                confirmedIncr:item.confirmedIncr,
                                deadCount:item.deadCount,
                                curedCount:item.curedCount
                            }
                            this.tableData.push(obj)
                            break;
                        case 'CHNPrivince':
                            let obj1 = {
                                provinceName: item.provinceName,
                                dateId:item.dateId,
                                provinceCode:item.provinceCode,
                                confirmedCount:item.confirmedCount,
                                confirmedIncr:item.confirmedIncr,
                                deadCount:item.deadCount,
                                curedCount:item.curedCount
                            }
                            this.tableData.push(obj1)
                            break;
                    }
                }
            })
        }
      }
    }
}
</script>
<style scoped>
.el-table{
    margin-top:20px;
}
.el-button{
    width:55px;
    height:28px;
    text-align: center;
    line-height:28px;
    padding:0;
    margin-left:10px;
    opacity: 0.8;
    margin-top:10px;
  }
 .box-card {
    width: 750px;
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
</style>