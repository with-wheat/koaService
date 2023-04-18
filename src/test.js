const Koa = require('koa')
const http = require('http')
const socketIO = require('socket.io')
const mysql = require('mysql2')
// const cors = require('@koa/cors')

// 创建Koa应用实例
const app = new Koa()

// 创建HTTP服务器，并将Koa应用绑定到HTTP服务器上
const server = http.createServer(app.callback())

// 将HTTP服务器绑定到Socket.IO上
const io = socketIO(server, {
  cors: {
    origin: '*', // 允许所有的跨域请求
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// 创建MySQL连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'chat',
})

// Socket.IO连接事件
io.on('connection', (socket) => {
  console.log(`Socket.IO连接已建立，ID为${socket.id}`)

  // 查询所有消息
  // pool.query('SELECT * FROM messages', (err, results) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     // 将查询结果发送给客户端

  //   }
  // })

  socket.emit('messages', 1111)

  // Socket.IO事件监听
  socket.on('chat message', (msg) => {
    console.log(`接收到消息：${msg}`)

    // 将消息插入到数据库中
    const message = { text: msg }
    pool.query('INSERT INTO messages SET ?', message, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`消息已插入，ID为${result.insertId}`)

        // 将消息发送给所有客户端
        io.emit('chat message', { id: result.insertId, text: msg })
      }
    })
  })

  // Socket.IO连接断开事件
  socket.on('disconnect', () => {
    console.log(`Socket.IO连接已断开，ID为${socket.id}`)
  })
})

// 添加跨域中间件
// app.use(cors())

// 添加路由中间件
app.use(async (ctx) => {
  // 返回空响应，避免客户端发生错误
  ctx.body = ''
})

// 启动HTTP服务器
server.listen(3000, () => {
  console.log('服务器已启动')
})
