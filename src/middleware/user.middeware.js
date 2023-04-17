const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_EXISTS,
  NAME_IS_NOT_EXISTS,
  NAME_OR_IS_REQUIRED,
} = require('../config/error')
const userService = require('../service/user_service')
const md5Password = require('../utils/md5-password')

/**
 * 验证用户是否存在
 * @returns
 */
const verifyUser = async (ctx, next) => {
  // 获取信息是否齐全参数
  const user = ctx.request.body
  const { name, password } = user

  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 判断用户是否存在
  const values = await userService.findUserByName(name)
  if (values.length > 0) {
    return ctx.app.emit('error', NAME_IS_EXISTS, ctx)
  }
  await next()
}

/**
 * 验证修改用户是否存在
 * @returns
 */
const setVerifyUser = async (ctx, next) => {
  // 获取信息是否齐全参数
  const user = ctx.request.body
  const { name } = user

  if (!name) {
    return ctx.app.emit('error', NAME_OR_IS_REQUIRED, ctx)
  }
  // 判断用户是否存在
  const values = await userService.findUserByName(name)

  if (values.length == 0) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }
  await next()
}

/**
 * 对密码进行加密的中间件
 */
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  // 加密密码
  ctx.request.body.password = md5Password(password)

  await next()
}

module.exports = { verifyUser, handlePassword, setVerifyUser }
