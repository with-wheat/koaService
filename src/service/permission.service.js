const connection = require('../app/database')
class PermissionService {
  /**
   * 验证用户权限
   * @param {帖子id} momentId
   * @param {用户id} userID
   * @returns
   */
  async checkMoment(resourceName, resourceId, id) {
    const stateMoment = `SELECT * FROM ${resourceName} WHERE id=? AND user_id=?`
    const [result] = await connection.execute(stateMoment, [resourceId, id])
    return !!result.length
  }
}
module.exports = new PermissionService()
