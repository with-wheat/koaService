const KoaRouter = require('@koa/router')
const loginController = require('../controller/login.controller')
const { verifyLogin, verifyToken } = require('../middleware/login_middeware')

loginRouter = new KoaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginController.sign)
loginRouter.post('/test', verifyToken, loginController.test)
loginRouter.post('/a', () => {
  console.log(11)
})
module.exports = loginRouter
