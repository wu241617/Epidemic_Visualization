// 获取全球所有国家的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列
// 获取项目从启动到当前获取到的全部疫情统计数据，分为全球、国内、国际三部分
const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql')
let httpUrl = 'http://111.231.75.86:8000/api/countries/daily/'
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
    if(res.data.length !== 0){
        for(let i=0; i<res.data.length; i++){
            let options = {
                confirmedCount: res.data[i].confirmedCount,
                confirmedIncr: res.data[i].confirmedIncr,
                curedCount: res.data[i].curedCount,
                curedIncr: res.data[i].curedIncr,
                currentConfirmedCount: res.data[i].currentConfirmedCount,
                currentConfirmedIncr: res.data[i].currentConfirmedIncr,
                dateId: res.data[i].dateId,
                deadCount: res.data[i].deadCount,
                deadIncr: res.data[i].deadIncr,
                suspectedCount: res.data[i].suspectedCount,
                suspectedCountIncr: res.data[i].suspectedCountIncr,
                countryCode: res.data[i].countryCode,
                countryName: res.data[i].countryName,
            }
            let strSql = 'insert into daily (confirmedCount,confirmedIncr,curedCount,curedIncr,currentConfirmedCount,currentConfirmedIncr,dateId,deadCount,deadIncr,suspectedCount,suspectedCountIncr,countryCode,countryName) value (?,?,?,?,?,?,?,?,?,?,?,?,?)'
            queryHandle(strSql,[options.confirmedCount,options.confirmedIncr,options.curedCount,options.curedIncr,options.currentConfirmedCount,options.currentConfirmedIncr,options.dateId,options.deadCount,options.deadIncr,options.suspectedCount,options.suspectedCountIncr,options.countryCode,options.countryName])
        }
    }
})