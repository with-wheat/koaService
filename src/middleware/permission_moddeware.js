const { OPERATION_IS_NOT_ALLOWED } = require('../config/error')
const PermissionService = require('../service/permission.service')

/**
 * 验证权限，没有权限不予许操作
 */
const verifyPermission = async (ctx, next) => {
  const { id } = ctx.user
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', '')
  const result = await PermissionService.checkMoment(
    resourceName,
    resourceId,
    id
  )
  if (!result) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  return next()
}

module.exports = { verifyPermission }
