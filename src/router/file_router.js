const CokRouter = require('@koa/router')
const fileController = require('../controller/file.controller')
const { handelAvatar, handFile } = require('../middleware/file_middeware')
const { verifyToken } = require('../middleware/login_middeware')

// 上传文件
const filetRouter = new CokRouter({ prefix: '/file' })

filetRouter.post('/avatar', verifyToken, handelAvatar, fileController.add)

filetRouter.post('/', verifyToken, handFile, fileController.uploadFile)

// 获取上传的文件信息
filetRouter.get('/:fileName', fileController.getLoadFile)

module.exports = filetRouter
