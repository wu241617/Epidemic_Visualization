// 获取项目从启动到当前获取到的全部疫情统计数据，分为全球、国内、国际三部分
const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql')
let httpUrl = 'http://111.231.75.86:8000/api/statistics/'
let options = {
    host:'localhost',
    port:'3306', // 可选,默认3306
    user:'root',
    password:'wu05241617',
    database:'webDB'
}
 
let con = mysql.createConnection(options)
 
con.connect((err) => {
    if(err){
        console.log(err)
    }else{
        console.log('数据库连接成功')
    }
})

function queryHandle(strSql,arr){
    con.query(strSql,arr,(err,results) =>{
        if(err){
            console.log(err)
        }else{
            console.log('插入数据操作成功')
        }
   })
}

axios.get(httpUrl).then((res) => {
    let strSql = 'insert into statistics (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("globalStatistics",'+res.data[0].globalStatistics.confirmedCount+','+res.data[0].globalStatistics.curedCount+','+res.data[0].globalStatistics.deadCount+','+res.data[0].globalStatistics.seriousCount+','+res.data[0].globalStatistics.currentConfirmedCount+','+res.data[0].globalStatistics.suspectedCount+')'
    queryHandle(strSql)
    let strSql2 = 'insert into statistics (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("domesticStatistics",'+res.data[0].domesticStatistics.confirmedCount+','+res.data[0].domesticStatistics.curedCount+','+res.data[0].domesticStatistics.deadCount+','+res.data[0].domesticStatistics.seriousCount+','+res.data[0].domesticStatistics.currentConfirmedCount+','+res.data[0].domesticStatistics.suspectedCount+')'
    queryHandle(strSql2)
    let strSql3 = 'insert into statistics (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("internationalStatistics",'+res.data[0].internationalStatistics.confirmedCount+','+res.data[0].internationalStatistics.curedCount+','+res.data[0].internationalStatistics.deadCount+','+res.data[0].internationalStatistics.seriousCount+','+res.data[0].internationalStatistics.currentConfirmedCount+','+res.data[0].internationalStatistics.suspectedCount+')'
    queryHandle(strSql3) 
})