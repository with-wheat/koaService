const label_service = require('../service/label_service')

class labelController {
  async add(ctx, next) {
    const { name } = ctx.request.body
    const result = await label_service.add(name)
    ctx.body = {
      code: 200,
      message: '新增成功',
      data: result,
    }
  }
}

module.exports = new labelController()
