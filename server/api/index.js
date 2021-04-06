// ========================数据库操作===============================
// mysql 封装
// 【1】,引入库============================================
let mysql = require('mysql')
 
// 【2】,连接数据库========================================
// 2.1,创建配置对象
let options = {
        host: 'localhost',
        port: '3306', // 可选,默认3306
        user: 'root',
        password: 'root',
        database: 'webDB'
    }
    // 2.2,创建连接对象 (返回连接对象)
let con = mysql.createConnection(options)
    // 2.3建立连接
con.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('数据库连接成功')
        }
    })
    // 【3】,执行数据库语句========================================
    // sql语句执行封装
function sqlQuery(strSql, arr) {
    return new Promise(function(resolve, reject) {
        con.query(strSql, arr, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}
// ===========================================================
 
 
// 引入包文件
let express = require('express')
let cors = require('cors')
    // 实例化一个 express 对象
let app = express()
app.use(cors())

app.use(express.urlencoded())

    // 获取最新获取到的全球整体疫情统计数据 latest
app.get('/api/statistics/latest', async(req, res) => {
    let strSql = 'select * from latest'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

   // 获取最新获取到的全球整体疫情 recommends
app.get('/api/statistics/recommends', async(req, res) => {
    let strSql = 'select * from recommends'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

 // 获取最新获取到的全球整体疫情 remarks
 app.get('/api/statistics/remarks', async(req, res) => {
    let strSql = 'select * from info1'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取最新获取到的全球整体疫情 rumors
app.get('/api/statistics/rumors', async(req, res) => {
    let strSql = 'select * from rumors'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取最新获取到的全球整体疫情 goodsGuides timelines
app.get('/api/statistics/goodsGuides', async(req, res) => {
    let strSql = 'select * from goodsGuides'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})
 
// 获取最新获取到的全球整体疫情 timelines
app.get('/api/statistics/timelines', async(req, res) => {
    let strSql = 'select * from timelines'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取最新获取到的全球整体疫情 wikis
app.get('/api/statistics/wikis', async(req, res) => {
    let strSql = 'select * from wikis'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取最新获取到的全球整体疫情 notes
app.get('/api/statistics/notes', async(req, res) => {
    let strSql = 'select * from notes'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取项目从启动到当前获取到的全部疫情统计数据，分为全球、国内、国际三部分；
app.get('/api/statistics', async(req, res) => {
    let strSql = 'select * from statistics'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取服务器时间
app.get('/api/getTime', async(req, res) => {
	 /**
     *获取当前时间
     *format=1精确到天
     *format=2精确到分
    */
	 function getCurrentDate(format) {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth();//得到月份
      var date = now.getDate();//得到日期
      var day = now.getDay();//得到周几
      var hour = now.getHours();//得到小时
      var minu = now.getMinutes();//得到分钟
      var sec = now.getSeconds();//得到秒
      month = month + 1;
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      if (hour < 10) hour = "0" + hour;
      if (minu < 10) minu = "0" + minu;
      if (sec < 10) sec = "0" + sec;
      var time = "";
      //精确到天
      if(format==1){
        time = year + "-" + month + "-" + date;
      }
      //精确到分
      else if(format==2){
        time = year + "-" + month + "-" + date+ " " + hour + ":" + minu + ":" + sec;
      }
      return time;
    }
    let result = getCurrentDate(2)
    res.json(result)
})

//====================================================================================================

// 获取全球所有国家的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列。
app.get('/api/countries/daily', async(req, res) => {
    let strSql = 'select * from daily'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})


// 获取某个国家的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列。
// post 请求,前端需要传参 countryName
app.post('/api/countries/daily/country', async(req, res) => {
    let strSql = 'select * from daily where countryName='+req.body.countryName
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})
// 获取中国的每日统计数据，返回结果会根据国家编码（从小到大）、日期（从小到大）排列。
app.get('/api/countries/daily/country/CHN', async(req, res) => {
    let strSql = 'select * from daily where countryName="中国"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取各个国家的疫情最新统计数据
app.get('/api/countries', async(req, res) => {
    let strSql = 'select * from dailynew'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 获取某个国家的疫情最新统计数据
// post 请求,前端需要传参 countryName
app.post('/api/countries/country', async(req, res) => {
	let strSql = 'select * from dailynew where countryName="'+req.body.countryName+'"'
	let result = await sqlQuery(strSql)
	res.json(Array.from(result))
})

// 中国所有省份日统计
app.get('/api/provinces/CHN/daily', async(req, res) => {
    let strSql = 'select * from dailychn'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 中国某个省份日统计
// post 请求,前端需要传参 provinceName
app.post('/api/provinces/CHN/daily/province', async(req, res) => {
    let strSql = 'select * from dailychn where provinceName="'+req.body.provinceName+'"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 美国所有州日统计
app.get('/api/provinces/USA/daily', async(req, res) => {
    let strSql = 'select * from dailyusa'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 美国某个州日统计
// post 请求,前端需要传参 provinceName
app.post('/api/provinces/USA/daily/province', async(req, res) => {
    let strSql = 'select * from dailyusa where provinceName="'+req.body.provinceName+'"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 中国所有省份最新疫情统计
app.get('/api/countries/CHN', async(req, res) => {
    let strSql = 'select * from dailychnnew'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 美国所有州最新疫情统计
app.get('/api/countries/USA', async(req, res) => {
    let strSql = 'select * from dailyusa'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 中国某个省份最新疫情统计
// post 请求,前端需要传参 provinceName
app.post('/api/countries/CHN/province', async(req, res) => {
    let strSql = 'select * from dailychnnew where provinceName="'+req.body.provinceName+'"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 美国某个州最新疫情统计
// post 请求,前端需要传参 provinceName
app.post('/api/countries/USA/province', async(req, res) => {
    let strSql = 'select * from dailyusanew where provinceName="'+req.body.provinceName+'"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 中国所有城市最新疫情数据
app.get('/api/cities/CHN', async(req, res) => {
    let strSql = 'select * from citychnnew'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 中国某个城市最新疫情数据
// post 请求,前端需要传参 cityName
app.post('/api/cities/CHN/city', async(req, res) => {
    let strSql = 'select * from citychnnew where cityName="'+req.body.cityName+'"'
    let result = await sqlQuery(strSql)
    res.json(Array.from(result))
})

// 设置端口，开启服务
app.listen(3000, () => {
    console.log('设置端口，开启服务', 'http://127.0.0.1:3000')
})