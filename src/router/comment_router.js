const CokRouter = require('@koa/router')
const commentController = require('../controller/comment.controller')
const { verifyToken } = require('../middleware/login_middeware')

const commentRouter = new CokRouter({ prefix: '/comment' })

commentRouter.post('/', verifyToken, commentController.insert)
commentRouter.post('/reply', verifyToken, commentController.reply)

module.exports = commentRouter
