// 爬取获取最新获取到的全球整体疫情统计数据、相关文章、日常建议、推荐信息等
const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql')
let httpUrl = 'http://111.231.75.86:8000/api/statistics/latest'
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
    // 全球最新统计
    let strSql = 'insert into latest (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("globalStatistics",'+res.data.globalStatistics.confirmedCount+','+res.data.globalStatistics.curedCount+','+res.data.globalStatistics.deadCount+','+res.data.globalStatistics.seriousCount+','+res.data.globalStatistics.currentConfirmedCount+','+res.data.globalStatistics.suspectedCount+')'
    queryHandle(strSql)
    let strSql2 = 'insert into latest (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("domesticStatistics",'+res.data.domesticStatistics.confirmedCount+','+res.data.domesticStatistics.curedCount+','+res.data.domesticStatistics.deadCount+','+res.data.domesticStatistics.seriousCount+','+res.data.domesticStatistics.currentConfirmedCount+','+res.data.domesticStatistics.suspectedCount+')'
    queryHandle(strSql2)
    let strSql3 = 'insert into latest (type,confirmedCount,curedCount,deadCount,seriousCount,currentConfirmedCount,suspectedCount) value ("internationalStatistics",'+res.data.internationalStatistics.confirmedCount+','+res.data.internationalStatistics.curedCount+','+res.data.internationalStatistics.deadCount+','+res.data.internationalStatistics.seriousCount+','+res.data.internationalStatistics.currentConfirmedCount+','+res.data.internationalStatistics.suspectedCount+')'
    queryHandle(strSql3) 
})

axios.get(httpUrl).then((res) =>{
     // recommends（推荐）
     if(res.data.recommends.length !== 0){
         for(let i=0; i<res.data.recommends.length; i++){
             let options = {
                contentType: res.data.recommends[i].contentType,
                countryType: res.data.recommends[i].countryType,
                title: res.data.recommends[i].title,
                recordStatus: res.data.recommends[i].recordStatus,
                linkUrl: res.data.recommends[i].linkUrl,
                imgUrl: res.data.recommends[i].imgUrl
             }
             let strSql4 = 'insert into recommends (contentType,countryType,title,recordStatus,linkUrl,imgUrl) value (?,?,?,?,?,?)'
             queryHandle(strSql4,[options.contentType,options.countryType,options.title,options.recordStatus,options.linkUrl,options.imgUrl])
        }
     } 
})

axios.get(httpUrl).then((res) =>{
     // remarks（评论，备注）
     if(res.data.remarks.length !== 0){
        let strSql5 = 'insert into info1 (remarks,createTime,generalRemark,modifyTime) value (?,?,?,?)'
        queryHandle(strSql5,[res.data.remarks.join('--'),res.data.createTime,res.data.generalRemark,res.data.modifyTime])
    } 
})

axios.get(httpUrl).then((res) => {
    // rumors（谣传）
    if(res.data.rumors.length !== 0){
        for(let i=0; i<res.data.rumors.length; i++){
            let options = {
                body: res.data.rumors[i].body,
                mainSummary: res.data.rumors[i].mainSummary,
                sourceUrl: res.data.rumors[i].sourceUrl,
                title: res.data.rumors[i].title,
                summary: res.data.rumors[i].summary,
                score: res.data.rumors[i].score,
                rumorType: res.data.rumors[i].rumorType
             }
            let strSql6 = 'insert into rumors (body,mainSummary,sourceUrl,title,summary,score,rumorType) value (?,?,?,?,?,?,?)'
            queryHandle(strSql6,[options.body,options.mainSummary,options.sourceUrl,options.title,options.summary,options.score,options.rumorType])
        }
    } 
})

axios.get(httpUrl).then((res) => {
    // goodsGuides(产品指南)
    if(res.data.goodsGuides.length !== 0){
        for(let i=0; i<res.data.goodsGuides.length; i++){
            let options = {
                contentImgUrls: res.data.goodsGuides[i].contentImgUrls.join('--'),
                recordStatus: res.data.goodsGuides[i].recordStatus,
                categoryName: res.data.goodsGuides[i].categoryName,
                title: res.data.goodsGuides[i].title
             }
            let strSql6 = 'insert into goodsGuides (contentImgUrls,recordStatus,categoryName,title) value (?,?,?,?)'
            queryHandle(strSql6,[options.contentImgUrls,options.recordStatus,options.categoryName,options.title])
        }
    } 
})


axios.get(httpUrl).then((res) =>{
    // timelines (时间线)
    if(res.data.timelines.length !== 0){
        for(let i=0; i<res.data.timelines.length; i++){
            let options = {
                sourceUrl: res.data.timelines[i].sourceUrl,
                pubDate: res.data.timelines[i].pubDate,
                title: res.data.timelines[i].title,
                summary: res.data.timelines[i].summary,
                pubDateStr: res.data.timelines[i].pubDateStr,
                infoSource: res.data.timelines[i].infoSource
             }
            let strSql6 = 'insert into timelines (sourceUrl,pubDate,title,summary,pubDateStr,infoSource) value (?,?,?,?,?,?)'
            queryHandle(strSql6,[options.sourceUrl,options.pubDate,options.title,options.summary,options.pubDateStr,options.infoSource])
        }
    } 
})

axios.get(httpUrl).then((res) => {
    // wikis（维基百科）
    for(let i=0; i<res.data.wikis.length; i++){
        let options = {
            linkUrl: res.data.wikis[i].linkUrl,
            description: res.data.wikis[i].description,
            imgUrl: res.data.wikis[i].imgUrl,
            title: res.data.wikis[i].title
         }
        let strSql6 = 'insert into wikis (linkUrl,description,imgUrl,title) value (?,?,?,?)'
        queryHandle(strSql6,[options.linkUrl,options.description,options.imgUrl,options.title])
    }
})

axios.get(httpUrl).then((res) => {
    // notes（注释）
    for(let i=0; i<res.data.notes.length; i++){
        let options = {
            body: res.data.notes.join('--')
         }
        let strSql6 = 'insert into notes (body) value (?)'
        queryHandle(strSql6,[options.body])
    }
})
