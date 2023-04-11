const fs = require('fs')
/**
 * 批量注册路由
 * @param {*} app
 */
function registerRouters(app) {
  const files = fs.readdirSync(__dirname)
  for (const file of files) {
    if (!file.endsWith('_router.js')) continue
    const route = require(`./${file}`)
    app.use(route.routes())
    app.use(route.allowedMethods())
  }
}

module.exports = registerRouters
