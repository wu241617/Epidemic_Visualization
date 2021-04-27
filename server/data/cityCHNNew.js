// 获取全球所有国家的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列
// 获取项目从启动到当前获取到的全部疫情统计数据，分为全球、国内、国际三部分
const axios = require('axios')
const cheerio = require('cheerio')
let httpUrl = 'http://111.231.75.86:8000/api/cities/CHN/'
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

function reqcityCHNNew() {
    axios.get(httpUrl).then((res) => {
        if (res.data.length !== 0) {
            queryHandle1('TRUNCATE TABLE cityCHNNew')
            for (let i = 0; i < res.data.length; i++) {
                let options = {
                    provinceName: res.data[i].provinceName,
                    cityName: res.data[i].cityName,
                    currentConfirmedCount: res.data[i].currentConfirmedCount,
                    confirmedCount: res.data[i].confirmedCount,
                    suspectedCount: res.data[i].suspectedCount,
                    curedCount: res.data[i].curedCount,
                    deadCount: res.data[i].deadCount
                }
                let strSql = 'insert into cityCHNNew (provinceName,cityName,currentConfirmedCount,confirmedCount,suspectedCount,curedCount,deadCount) value (?,?,?,?,?,?,?)'
                queryHandle(strSql, [options.provinceName, options.cityName, options.currentConfirmedCount, options.confirmedCount, options.suspectedCount, options.curedCount, options.deadCount])
            }
        }
    })
}


module.exports = {
    reqcityCHNNew
}