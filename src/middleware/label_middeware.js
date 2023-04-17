const { THE_PARAMETER_IS_WRONG } = require('../config/error')
const label_service = require('../service/label_service')

/**
 * 验证标签是否存在，不存在先新增
 */
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  if (!labels) {
    return ctx.app.emit('error', THE_PARAMETER_IS_WRONG, ctx)
  }
  const newLabels = []
  for (const name of labels) {
    const result = await label_service.findName(name)
    const labelObj = { name }
    if (result) {
      labelObj.id = result.id
    } else {
      // 新增没有的标签名
      const insertResult = await label_service.add(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }
  ctx.labels = newLabels
  await next()
}

module.exports = { verifyLabelExists }
