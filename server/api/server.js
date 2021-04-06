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
  })

  module.exports = {
      app
  }