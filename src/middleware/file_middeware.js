const multer = require('@koa/multer')
const { UPLOAD_PATH, UPLOAD_FILE_PATH } = require('../config/path')

// 上传头像中间件 数据文件存储地址UPLOAD_PATH
const upLoadAvatar = multer({
  dest: `${UPLOAD_PATH}`,
})

const upLoadFile = multer({
  dest: `${UPLOAD_FILE_PATH}`,
})
/**
 * 处理头像上传
 */
const handelAvatar = upLoadAvatar.single('avatar')

/**
 * 文件地址
 */
const handFile = upLoadFile.single('file')

module.exports = { handelAvatar, handFile }
