const { THE_PARAMETER_IS_WRONG } = require('../config/error')
const comment_service = require('../service/comment_service')

class commentController {
  // 发表评论
  async insert(ctx, next) {
    const { id } = ctx.user
    const { momentId, content } = ctx.request.body
    if (!momentId || !content) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    } else {
      const result = await comment_service.inset(momentId, content, id)
      ctx.body = {
        code: 200,
        message: '新增成功',
        data: result,
      }
    }
  }
  // 回复评论
  async reply(ctx, next) {
    const { id } = ctx.user
    const { momentId, commentId, content } = ctx.request.body
    if (!momentId || !commentId || !content) {
      return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
    } else {
      const result = await comment_service.reply(
        momentId,
        content,
        id,
        commentId
      )
      ctx.body = {
        code: 200,
        message: '新增成功',
        data: result,
      }
    }
  }
}

module.exports = new commentController()
