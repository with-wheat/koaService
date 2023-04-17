const app = require('../app')
const {
  NAME_IS_NOT_EXISTS,
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_OR_IS_REQUIRED,
  NAME_IS_EXISTS,
  WRONG_PASSWORD,
  INVALID_TOKEN,
  TOKEN_EXPIRED,
  THE_PARAMETER_IS_WRONG,
  OPERATION_IS_NOT_ALLOWED,
} = require('../config/error')
// 全局错误处理
app.on('error', (error, ctx) => {
  let code = 0
  let message = ''
  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名和密码不能为空~'
      break
    case NAME_OR_IS_REQUIRED:
      code = -1002
      message = '用户名不能为空~'
      break
    case NAME_IS_EXISTS:
      code = -1003
      message = '该用户名已存在~'
      break

    case NAME_IS_NOT_EXISTS:
      code = -1004
      message = '该用户名不存在'
      break

    case WRONG_PASSWORD:
      code = -1005
      message = '密码错误'
      break
    case TOKEN_EXPIRED:
      code = -1006
      message = 'token已过期'
      break

    case INVALID_TOKEN:
      code = -1007
      message = 'token验证失败'
      break

    case THE_PARAMETER_IS_WRONG:
      code = -1008
      message = '参数有误！'
      break

    case OPERATION_IS_NOT_ALLOWED:
      code = -1009
      message = '操作失败,暂无权限'
      break

    default:
      code = 500
      message = '服务器错误'
  }
  ctx.body = {
    code,
    message,
  }
})
