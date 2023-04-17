const CokRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { handelAvatar } = require('../middleware/file_middeware')
const { verifyToken } = require('../middleware/login_middeware')

// 上传文件
const filetRouter = new CokRouter({ prefix: '/file' })

filetRouter.post('/avatar', verifyToken, handelAvatar, fileController.add)

module.exports = filetRouter
