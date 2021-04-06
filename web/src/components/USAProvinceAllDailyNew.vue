<template>
    <!-- 最新整体统计 -->
    <div>
        <el-card>
             <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="id"
      label="#"
      width="80">
    </el-table-column>
    <el-table-column
      prop="cityName"
      label="城市">
    </el-table-column>
    <el-table-column
      prop="confirmedCount"
      label="确诊"
      >
    </el-table-column>
    <el-table-column
      prop="currentConfirmedCount"
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
    <el-table-column
      prop="suspectedCount"
      label="疑似">
    </el-table-column>
    <el-table-column
      prop="provinceName"
      label="省份">
    </el-table-column>
  </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
     methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    },
    created(){
          this.axios.get('http://127.0.0.1:3000/api/countries/USA').then((res)=>{
              this.tableData = res.data
        })
    },
    data() {
      return {
        tableData: []
      }
    }
  }
</script>

<style scoped>
.el-table{
    background-color:rgba(0,0,0,.4);
}
    .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>>
