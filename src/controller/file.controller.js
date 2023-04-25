const file_service = require('../service/file_service')
const user_service = require('../service/user_service')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')
const fs = require('fs')
const { UPLOAD_FILE_PATH } = require('../config/path')
class fileController {
  /**
   * 上传用户头像
   */
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
  /**
   * 上传文件
   */
  async uploadFile(ctx, next) {
    const { mimetype, filename, size } = ctx.request.file // 获取上传的文件对象
    const { id } = ctx.user

    // 保存上传信息
    const result = await file_service.files(mimetype, filename, size, id)
    // 获取文件地址
    const fileUrl = await `${SERVER_HOST}:${SERVER_PORT}/file/${filename}`
    ctx.body = {
      code: 200,
      message: '上传成功！',
      fileUrl,
    }
  }

  // 获取上传的文件信息
  async getLoadFile(ctx, next) {
    const { fileName } = ctx.params
    // 查询上传信息
    const result = await file_service.findFiles(fileName)
    const { mimetype, filename } = result
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_FILE_PATH}/${filename}`)
  }
}

module.exports = new fileController()
