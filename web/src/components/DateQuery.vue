<template>
    <div>
        <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <el-tag type="success">{{titleText}}</el-tag>
                    <el-tag type="danger">{{title2}}</el-tag>
                    <el-tooltip class="item" effect="dark" :content="closeTitle" placement="left-start">
                        <el-button type="danger" icon="el-icon-close" class="close" circle @click="closeBtn" ></el-button>
                    </el-tooltip>
                </div>
                <div>
                     <div class="block">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        unlink-panels
                        :clearable="false"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                        <el-button type="primary" @click="search">{{title1}}</el-button>
                    </div>
                     <el-table
                    :data="tableData"
                    border
                    stripe
                    max-height="250"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                    prop="dateId"
                    label="日期"
                   align="center">
                   <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 3px">{{ scope.row.dateId }}</span>
                   </template>
                    </el-table-column>
                    <template v-if="GlobalExit">
                         <el-table-column
                    prop="countryName"
                    label="国家"
                    align="center">
                     <!-- <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.countryName }}</el-tag>
                   </template> -->
                    </el-table-column>
                    <el-table-column
                    prop="countryCode"
                    label="编码"
                    align="center">
                    </el-table-column>
                    </template>
                    <template v-if="CHNPrivinceExit">
                         <el-table-column
                    prop="provinceName"
                    label="省份"
                    align="center">
                    <!-- <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.provinceName }}</el-tag>
                   </template> -->
                    </el-table-column>
                    <el-table-column
                    prop="provinceCode"
                    label="编码"
                    align="center">
                    </el-table-column>
                    </template>
                    <el-table-column
                    prop="confirmedCount"
                    label="累计确诊"
                    align="center">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.confirmedCount }}</el-tag>
                   </template>
                    </el-table-column>
                    <el-table-column
                    prop="confirmedIncr"
                    label="当前新增"
                    align="center">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="warning">{{ scope.row.confirmedIncr }}</el-tag>
                   </template>
                    </el-table-column>
                    <el-table-column
                    prop="deadCount"
                    label="累计死亡"
                    align="center">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="danger">{{ scope.row.deadCount }}</el-tag>
                   </template>
                    </el-table-column>
                    <el-table-column
                    prop="curedCount"
                    label="累计治愈" 
                    align="center">
                    <template slot-scope="scope">
                        <el-tag size="medium" type="success">{{ scope.row.curedCount }}</el-tag>
                   </template>
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
            successMessage1:'数据获取成功！',
            falieMessage1:'数据获取失败！',
            titleText: '',
            date:[],
            data:[],
            dateObj:this.$store.state.dateObj,
            tableData:[],
            title1:'查询',
            title2:'数据支持查询范围：（2020-02 至 2021-02）',
            GlobalExit:false,
            CHNPrivinceExit:false,
            closeTitle:'关闭浮层',
            pickerOptions: {}
        }
    },
    mounted(){
        switch(this.type){
            case 'Global':
                this.title2 = '数据支持查询范围：（2020-02 至 2021-02）'
                this.pickerOptions = {
                    disabledDate: time => {
                        return this.dealDisabledDate(time);
                    }
                }
                this.request('/countries/daily/country',{'countryName':this.rowData.countryName})
                this.titleText = this.rowData.countryName,
                this.GlobalExit = true
                break;
            case 'CHNPrivince':
                this.title2 = '数据支持查询范围：（2020-02起）'
                this.pickerOptions = {
                    disabledDate: time => {
                        return this.dealDisabledDate1(time);
                    }
                }
                this.request('/provinces/CHN/daily/province',{'provinceName':this.rowData.provinceName})
                this.titleText = this.rowData.provinceName
                this.CHNPrivinceExit = true
                break;
        }
    },
    methods:{
        dealDisabledDate(time) {
            let selectStartDate = 'Sat Feb 01 2020 00:00:00 GMT+0800 (中国标准时间)'
            let selectEndDate = 'Mon Feb 22 2021 00:00:00 GMT+0800 (中国标准时间)'
            return (
                time.getTime() < new Date(selectStartDate).getTime() ||
                time.getTime() > new Date(selectEndDate).getTime()
            );
        },
         dealDisabledDate1(time) {
            let selectStartDate = 'Sat Feb 01 2020 00:00:00 GMT+0800 (中国标准时间)'
            //let selectEndDate = 'Mon Feb 22 2021 00:00:00 GMT+0800 (中国标准时间)' 
            return (
                time.getTime() < new Date(selectStartDate).getTime() ||
                time.getTime() > new Date().getTime()
            );
        },
        request(url,obj){
            this.axios.post(url,qs.stringify(obj),{headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then((res)=>{
            this.data = res.data
        })
        },
      closeBtn(){
          this.$emit('event',false)
      },
       open2(str) {
        this.$message({
          showClose: true,
          message: str,
          type: 'success',
          offset:130
        });
      },
      open4(str) {
        this.$message({
          showClose: true,
          message: str,
          type: 'error',
          offset:130
        });
      },
       open1() {
        this.$message({
          showClose: true,
          message: '数据查询不在日期范围内，请重新选择日期！',
          type: 'error',
          offset:130
        });
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
        if(this.date.length == 0){
            this.tableData = []
             this.open4(this.falieMessage1)
            return
        }else{
            let arr = []
            this.data.forEach((item,index) => {
                if(item.dateId == this.format(this.date[0])){
                    arr.push(index)
                }
                if(item.dateId == this.format(this.date[1])){
                    arr.push(index)
                }
            })
            if(arr.length != 2){
                this.open1()
            }else{
                this.open2(this.successMessage1)
            }
            this.tableData = []
            switch(this.type){
                case 'Global':
                    for(let i = arr[0]; i<=arr[1]; i++){
                        let obj = {
                            countryName: this.data[i].countryName,
                            dateId: this.data[i].dateId,
                            countryCode: this.data[i].countryCode,
                            confirmedCount: this.data[i].confirmedCount,
                            confirmedIncr: this.data[i].currentConfirmedCount,
                            deadCount: this.data[i].deadCount,
                            curedCount: this.data[i].curedCount
                        }
                        this.tableData.push(obj)
                    }
                    break;
                case 'CHNPrivince':
                    for(let i = arr[0]; i<=arr[1]; i++){
                        let obj1 = {
                            provinceName: this.data[i].provinceName,
                            dateId:this.data[i].dateId,
                            provinceCode:this.data[i].provinceCode,
                            confirmedCount:this.data[i].confirmedCount,
                            confirmedIncr:this.data[i].currentConfirmedCount,
                            deadCount:this.data[i].deadCount,
                            curedCount:this.data[i].curedCount
                        }
                        this.tableData.push(obj1)
                    }
                    break;
            }
        }
      }
    }
}
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #a1a3a9;
  border-radius: 3px;
}
</style>

<style scoped>
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 6px; 
    height: 6px;
  }
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 3px;
  }
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