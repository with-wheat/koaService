const verifyUser = require('../middleware/user.middeware')
const user_service = require('../service/user_service')

class UserController {
  async create(ctx, next) {
    // 获取信息是否齐全参数
    const user = ctx.request.body
    // 信息存储执行create函数
    const result = await user_service.create(user)

    // 判断是否存储成功
    ctx.body = {
      message: '用户创建成功',
      data: result,
    }
  }
  async delete(ctx, next) {
    const { userId } = ctx.request.body
    const result = await user_service.delete(userId)
    ctx.body = {
      message: '删除成功',
      code: 200,
      data: result,
    }
  }
  /**
   * 用户信息修改
   * @param {*} ctx
   * @param {*} next
   */
  async update(ctx, next) {
    // 获取编辑信息
    const user = ctx.request.body

    // 信息存储
    const result = await user_service.updateInfo(user)
    ctx.body = {
      message: '用户信息修改成功',
      data: result,
    }
  }

  async verifyInformation(ctx, next) {
    const user = ctx.request.body
    const isOk = await user_service.verifyInformationCorrect(user)
    if (isOk) {
      ctx.body = {
        message: '密码正确',
      }
    } else {
      ctx.body = {
        message: '密码错误',
      }
    }
  }
}

module.exports = new UserController()
