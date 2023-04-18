const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')

// 上传头像中间件 数据文件存储地址UPLOAD_PATH
const upLoadAvatar = multer({
  dest: `${UPLOAD_PATH}`,
})
/**
 * 处理头像上传
 */
const handelAvatar = upLoadAvatar.single('avatar')

module.exports = { handelAvatar }
