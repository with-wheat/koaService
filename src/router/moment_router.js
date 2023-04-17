const koaRouter = require('@koa/router')
const momentController = require('../controller/moment.controller')
const { verifyLabelExists } = require('../middleware/label_middeware')
const { verifyToken } = require('../middleware/login_middeware')
const { verifyPermission } = require('../middleware/permission_moddeware')

const momentRouter = new koaRouter({ prefix: '/moment' })
// 新增
momentRouter.post('/create', verifyToken, momentController.create)
// 编辑
momentRouter.post(
  '/update/:momentId',
  verifyToken,
  verifyPermission,
  momentController.update
)
// 查看详情列表
momentRouter.post('/list', verifyToken, momentController.list)
// 查看详情列表既评论详情
momentRouter.get(
  '/listDetails/:momentId',
  verifyToken,
  momentController.listDetails
)
// 删除
momentRouter.get(
  '/deletePost/:momentId',
  verifyToken,
  verifyPermission,
  momentController.deletePost
)
// 获取详情
momentRouter.get('/:momentId', verifyToken, momentController.details)

// 添加标签
momentRouter.post(
  '/:momentId/labels',
  verifyToken,
  verifyPermission,
  verifyLabelExists,
  momentController.addLabel
)

module.exports = momentRouter
