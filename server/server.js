//  let { reqcityCHNNew } = require('./data/cityCHNNew')
//  let { reqdailyAll } = require('./data/dailyAll')
//  let { reqdailyCHNAll } = require('./data/dailyCHNAll')
//  let { reqdailyCHNNew } = require('./data/dailyCHNNew')
//  let { reqdailyNew } = require('./data/dailyNew')
//      //let { reqdailyUSAAll } = require('./data/dailyUSAAll')
//      //let { reqdailyUSANEW } = require('./data/dailyUSANEW')
//  let { reqlatest } = require('./data/latest')
//  let { reqstatistics } = require('./data/statistics')

let schedule = require('node-schedule');

// 引入包文件
let express = require('express')

let cors = require('cors')
    // 实例化一个 express 对象
let app = express()
app.use(cors())

app.use(express.urlencoded())

// 设置端口，开启服务
app.listen(3000, () => {
    console.log('设置端口，开启服务', 'http://127.0.0.1:3000')
        // 定义规则
    let rule = new schedule.RecurrenceRule();
    // 每周一到周五的 0 点执行
    rule.dayOfWeek = [1, 2, 3, 4, 5];
    rule.hour = 0;
    rule.minute = 0;
    rule.second = 0;
    // 启动任务
    let job = schedule.scheduleJob(rule, () => {
            //  reqcityCHNNew()
            //  reqdailyAll()
            //  reqdailyCHNAll()
            //  reqdailyCHNNew()
            //  reqdailyNew()
            //      //reqdailyUSAAll()
            //      //reqdailyUSANEW()
            //  reqlatest()
            //  reqstatistics()
            console.log('数据更新于:--->', new Date());
        })
        // job.cancel() 终止任务
})

module.exports = {
    app
}