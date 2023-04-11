const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/users' })
const UserController = require('../controller/user.controller')
const {
  verifyUser,
  handlePassword,
  setVerifyUser,
} = require('../middleware/user.middeware')

const koaSession = require('koa-session')
const app = require('../app')

// 用户注册接口
// verifyUser为验证信息中间件，UserController为新增中间件
userRouter.post('/create', verifyUser, handlePassword, UserController.create)
userRouter.post('/delete', setVerifyUser, UserController.delete)
userRouter.post('/update', setVerifyUser, handlePassword, UserController.update)
userRouter.post(
  '/login',
  setVerifyUser,
  handlePassword,
  UserController.verifyInformation
)

module.exports = userRouter
