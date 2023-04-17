const file_service = require('../service/file_service')

class fileController {
  async add(ctx, next) {
    const { mimetype, filename, size } = ctx.request.file
    const { id } = ctx.user

    const result = await file_service.avatarInsert(mimetype, filename, size, id)
    ctx.body = {
      code: 200,
      message: '上传成功！',
      data: result,
    }
  }
}

module.exports = new fileController()
