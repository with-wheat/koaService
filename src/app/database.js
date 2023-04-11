const mysql = require('mysql2')

const connectionPool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  database: 'koadb',
  user: 'root',
  password: '123456',
  connectionLimit: 5,
})

// 获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('数据库连接失败！')
    return
  }
  // 尝试连接数据库
  connection.connect((err) => {
    if (err) {
      console.log('和数据库交互失败' + err)
    } else {
      console.log('连接数据库成功~')
    }
  })
})

const connection = connectionPool.promise()

module.exports = connection
