const file_service = require('../service/file_service')
const user_service = require('../service/user_service')
const fs = require('fs')
const { UPLOAD_PATH } = require('../config/path')
const { THE_PARAMETER_IS_WRONG } = require('../config/error')
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
  /**
   * 获取用户信息
   */
  async info(ctx, next) {
    const { id } = ctx.user
    const result = await user_service.info(id)
    ctx.body = {
      code: 200,
      data: result,
    }
  }

  /**
   *删除用户信息
   */
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
    const { name, password } = ctx.request.body
    if (!name || !password) {
      ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    }
    const { id } = ctx.user
    // 信息存储
    const result = await user_service.updateInfo(name, password, id)
    ctx.body = {
      message: '用户信息修改成功',
      data: result,
    }
  }

  async verifyInformation(ctx, next) {
    const user = ctx.request.body
    console.log(11)
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
  // 获取头像
  async avatarImg(ctx, next) {
    const { userId } = ctx.params
    const result = await file_service.avatarUserImg(userId)
    const { filename, mimetype } = result
    ctx.type = mimetype
    // 获取图片信息，创建可读流返回
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new UserController()
