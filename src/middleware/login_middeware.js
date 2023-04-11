const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  WRONG_PASSWORD,
  TOKEN_EXPIRED,
  INVALID_TOKEN,
} = require('../config/error')
const user_service = require('../service/user_service')
const md5Password = require('../utils/md5-password')
const jwt = require('jsonwebtoken')
const { PUBLICKEY } = require('../config/screct')
/**
 * 登录中间件
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLogin = async (ctx, next) => {
  // 验证用户名和密码是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  // 查询用户是否在数据库中
  const userInfo = await user_service.findUserByName(name)
  if (userInfo.length == 0) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }
  // 查询用户密码是否正确
  if (userInfo[0].password === md5Password(password)) {
    ctx.user = userInfo[0]
    await next()
  } else {
    return ctx.app.emit('error', WRONG_PASSWORD, ctx)
  }
}
/**
 * 验证token中间件
 * @param {*} ctx
 * @param {*} next
 */
const verifyToken = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', INVALID_TOKEN, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    // result包含了登录用户的信息{id,name}
    const result = jwt.verify(token, PUBLICKEY, {
      algorithms: ['RS256'],
    })
    // 将登录用户信息存在user里
    ctx.user = result
    await next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.app.emit('error', TOKEN_EXPIRED, ctx)
    } else {
      ctx.app.emit('error', INVALID_TOKEN, ctx)
    }
  }
}

module.exports = { verifyLogin, verifyToken }
