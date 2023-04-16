const { THE_PARAMETER_IS_WRONG } = require('../config/error')
const moment_service = require('../service/moment_service')

class moment {
  async create(ctx, next) {
    // 获取参数
    const { id } = ctx.user
    const { content } = ctx.request.body
    if (!content) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    }
    const result = await moment_service.create(id, content)
    if (result.affectedRows > 0) {
      ctx.body = {
        code: 200,
        message: '新增成功',
      }
    }
  }
  // 获取发帖列表信息只查看评论个数
  async list(ctx, next) {
    const { page, limit } = ctx.request.body
    if (!page || !limit) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    }
    const result = await moment_service.list(ctx.request.body)
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: result,
    }
  }
  // 获取发帖列表信息和评论详情信息
  async listDetails(ctx, next) {
    const { page, limit } = ctx.request.body
    if (!page || !limit) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    }
    const result = await moment_service.listDetails(ctx.request.body)
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: result,
    }
  }
  // 删除
  async deletePost(ctx, next) {
    const { momentId } = ctx.params
    const result = await moment_service.delete(momentId)
    if (result.affectedRows > 0) {
      ctx.body = {
        code: 200,
        message: '删除成功',
      }
    }
  }
  // 获取详情
  async details(ctx, next) {
    const { momentId } = ctx.params
    const result = await moment_service.detailsPost(momentId)
    ctx.body = {
      code: 200,
      message: '查询成功',
      data: result[0],
    }
  }
  // 修改
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    if (!content) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    }
    const result = await moment_service.update(momentId, content)
    if (result.affectedRows > 0) {
      ctx.body = {
        code: 200,
        message: '修改成功',
      }
    } else {
      ctx.body = {
        code: 204,
        message: '修改失败',
      }
    }
  }
}

module.exports = new moment()
