const KoaRouter = require('@koa/router')
const userRouter = new KoaRouter({ prefix: '/users' })
const UserController = require('../controller/user.controller')
const {
  verifyUser,
  handlePassword,
  setVerifyUser,
} = require('../middleware/user.middeware')

const koaSession = require('koa-session')

const { verifyPermission } = require('../middleware/permission_moddeware')
const { verifyToken } = require('../middleware/login_middeware')

// 用户注册接口
// verifyUser为验证信息中间件，UserController为新增中间件
userRouter.post('/create', verifyUser, handlePassword, UserController.create)
userRouter.post(
  '/delete',
  verifyToken,
  setVerifyUser,
  verifyPermission,
  UserController.delete
)
// 获取用户信息
userRouter.get('/', verifyToken, UserController.info)

userRouter.post('/update', verifyToken, handlePassword, UserController.update)
userRouter.post(
  '/login',
  setVerifyUser,
  handlePassword,
  UserController.verifyInformation
)

// 获取用户头像信息
userRouter.get('/avatar/:userId', UserController.avatarImg)

module.exports = userRouter
