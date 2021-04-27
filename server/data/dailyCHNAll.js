// 获取全球所有国家的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列
// 获取项目从启动到当前获取到的全部疫情统计数据，分为全球、国内、国际三部分
const axios = require('axios')
const cheerio = require('cheerio')
let httpUrl = 'http://111.231.75.86:8000/api/provinces/CHN/daily/'
let { con } = require('../sqlQuery')

function queryHandle(strSql, arr) {
    con.query(strSql, arr, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('插入数据操作成功')
        }
    })
}

function queryHandle1(strSql) {
    con.query(strSql, (err, results) => {
        if (err) {
            console.log(err)
        } else {
            console.log('清空表格数据操作成功')
        }
    })
}

function reqdailyCHNAll() {
    axios.get(httpUrl).then((res) => {
        if (res.data.length !== 0) {
            queryHandle1('TRUNCATE TABLE dailyCHN')
            for (let i = 0; i < res.data.length; i++) {
                let options = {
                    dateId: res.data[i].dateId,
                    provinceCode: res.data[i].provinceCode,
                    provinceName: res.data[i].provinceName,
                    countryCode: res.data[i].countryCode,
                    confirmedCount: res.data[i].confirmedCount,
                    currentConfirmedCount: res.data[i].currentConfirmedCount,
                    suspectedCount: res.data[i].suspectedCount,
                    curedCount: res.data[i].curedCount,
                    deadCount: res.data[i].deadCount,
                    currentConfirmedIncr: res.data[i].currentConfirmedIncr,
                    confirmedIncr: res.data[i].confirmedIncr,
                    suspectedIncr: res.data[i].suspectedIncr,
                    curedIncr: res.data[i].curedIncr,
                    deadIncr: res.data[i].deadIncr
                }
                let strSql = 'insert into dailyCHN (dateId,provinceCode,provinceName,countryCode,confirmedCount,currentConfirmedCount,suspectedCount,curedCount,deadCount,currentConfirmedIncr,confirmedIncr,suspectedIncr,curedIncr,deadIncr) value (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                queryHandle(strSql, [options.dateId, options.provinceCode, options.provinceName, options.countryCode, options.confirmedCount, options.currentConfirmedCount, options.suspectedCount, options.curedCount, options.deadCount, options.currentConfirmedIncr, options.confirmedIncr, options.suspectedIncr, options.curedIncr, options.deadIncr])
            }
        }
    })
}


module.exports = {
    reqdailyCHNAll
}