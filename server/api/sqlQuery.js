// ========================封装数据库操作===============================
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

module.exports = {
    sqlQuery
}