const KoaRouter = require('@koa/router')
const labelController = require('../controller/label.controller')
const { verifyToken } = require('../middleware/login_middeware')

const labelRouter = new KoaRouter({ prefix: '/label' })

labelRouter.post('/', verifyToken, labelController.add)

module.exports = labelRouter
