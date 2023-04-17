const multer = require('@koa/multer')

// 上传头像中间件
const upLoadAvatar = multer({
  dest: './uploads',
})
/**
 * 处理头像上传
 */
const handelAvatar = upLoadAvatar.single('avatar')

module.exports = { handelAvatar }
