const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new Koa()
// 解析参数
app.use(bodyParser())

// 注册路由
registerRouters(app)

// 导出app
module.exports = app
