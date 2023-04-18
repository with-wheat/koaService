const file_service = require('../service/file_service')
const user_service = require('../service/user_service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
class fileController {
  // 上传用户头像
  async add(ctx, next) {
    const { mimetype, filename, size } = ctx.request.file
    const { id } = ctx.user
    // 存储用户头像信息
    const result = await file_service.avatarInsert(mimetype, filename, size, id)

    // 存储用户头像地址url
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    const result2 = await user_service.saveAvatarImg(id, avatarUrl)

    ctx.body = {
      code: 200,
      message: '上传成功！',
      data: result2,
    }
  }
}

module.exports = new fileController()
