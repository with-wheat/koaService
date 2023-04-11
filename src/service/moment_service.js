const connection = require('../app/database')
class momentService {
  async create(user_id, content) {
    const statement = 'INSERT INTO moment(user_id,content) VALUES (?,?);'
    const [result] = await connection.execute(statement, [user_id, content])
    return result
  }
  /**
   * 查询帖子信息列表
   * @param {请求参数} data
   * @returns
   */
  async list(data) {
    try {
      const { page, limit } = data
      // 计算查询的起始索引
      const startIndex = (page - 1) * limit
      const statement = `SELECT m.id momentID,m.content,m.createAt createTime,m.updateAt updateTime
        ,JSON_OBJECT('userId',u.id,'userName',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
         FROM moment m INNER JOIN user u  LIMIT ? OFFSET ?;`
      const [result] = await connection.execute(statement, [
        String(limit),
        String(startIndex),
      ])
      return result
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 编辑
   * @param {*} momentId
   * @param {*} content
   */
  async update(momentId, content) {
    const statement = 'UPDATE moment SET content =? WHERE id =?;'
    const [result] = await connection.execute(statement, [
      String(content),
      momentId,
    ])
    return result
  }
  /**
   * 删除
   */
  async delete(momentID) {
    const statement = 'DELETE FROM moment WHERE id=?'
    try {
      const [result] = await connection.execute(statement, [momentID])
      return result
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 查看是否存在某条数据
   * @param {*} momentID
   * @returns
   */
  async findMonet(momentID) {
    const statement = 'SELECT * FROM moment WHERE id=?'
    const [result] = await connection.execute(statement, [momentID])
    return result
  }
  // 获取详情
  async detailsPost(momentID) {
    const statement = `SELECT m.id momentID,m.content,m.createAt createTime,m.updateAt updateTime
    ,JSON_OBJECT('userId',u.id,'userName',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
     FROM moment m LEFT JOIN user u ON m.user_id = u.id WHERE m.id = ?;`
    const [result] = await connection.execute(statement, [momentID])
    return result
  }
}

module.exports = new momentService()
