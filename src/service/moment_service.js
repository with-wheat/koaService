const connection = require('../app/database')
class momentService {
  async create(user_id, content) {
    const statement = 'INSERT INTO moment(user_id,content) VALUES (?,?);'
    const [result] = await connection.execute(statement, [user_id, content])
    return result
  }
  /**
   * 查询帖子信息列表显示评论条数
   * @param {请求参数} data
   * @returns
   */
  async list(data) {
    try {
      const { page, limit } = data
      // 计算查询的起始索引
      const startIndex = (page - 1) * limit
      const statement = `SELECT m.id momentIF,m.content momentCount,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt)user,
      (SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id )commentCount
      FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`
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
   * 查询帖子信息列表显示评论具体信息
   * @param {请求参数} data
   * @returns
   */
  async listDetails(data) {
    try {
      const { page, limit } = data
      // 计算查询的起始索引
      const startIndex = (page - 1) * limit
      const statement = `SELECT m.id momentId,m.content momentCount,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt)user,
      JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createdAt,'updateTime',c.updatedAt,'contentId',c.comment_id,
        'user', JSON_OBJECT('id',cu.id,'name',cu.name)
        )
      )comments
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN COMMENT c ON c.moment_id = m.id
      LEFT JOIN user cu ON cu.id = c.user_id
      WHERE m.id= 1 GROUP BY m.id LIMIT ? OFFSET ?;`
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
