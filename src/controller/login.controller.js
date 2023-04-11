const jwt = require('jsonwebtoken')

const { PRIVATEKEY } = require('../config/screct')
class loginController {
  sign(ctx, next) {
    // 获取用户信息'
    const { id, name } = ctx.user
    try {
      // 颁发令牌
      const token = jwt.sign({ id, name }, PRIVATEKEY, {
        expiresIn: 24 * 60 * 60, // 过期时间
        algorithm: 'RS256', // 加密类型
      })
      // 返回用户信息
      ctx.body = {
        code: 200,
        data: ctx.user,
        token: token,
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', '', ctx)
    }
  }
  // 测试登录
  test(ctx, next) {
    ctx.body = {
      message: '登陆成功',
    }
  }
}

module.exports = new loginController()
