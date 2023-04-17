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
      const statement = `SELECT m.id momentId,m.content momentCount,m.createAt createTime,m.updateAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt)user,
      (SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id )commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id )labelCount
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
  async listDetails(momentId) {
    try {
      const statement = `SELECT m.id momentId, m.content momentCount, m.createAt createTime, m.updateAt updateTime,
                          JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
                          (SELECT 
                          JSON_ARRAYAGG(
                            JSON_OBJECT('id',c.id,'content',c.content,'contentId',c.comment_id,
                            'user', JSON_OBJECT('id',cu.id,'name',cu.name)
                            )
                          )
                          FROM COMMENT c LEFT JOIN user cu ON c.user_id = cu.id  ) comments,
                          JSON_ARRAYAGG(
                              JSON_OBJECT('id', l.id, 'label', l.name)
                          ) labels
                      FROM moment m
                      LEFT JOIN user u ON m.user_id = u.id
                      LEFT JOIN moment_label ml ON ml.moment_id = m.id
                      LEFT JOIN label l ON ml.label_id = l.id
                      WHERE m.id = ?
                      GROUP BY m.id;`
      const [result] = await connection.execute(statement, [momentId])
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

  // 验证标签是否已经添加
  async findLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? and label_id=?`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }

  // 添加标签
  async addLabel(momentId, labelId) {
    console.log(momentId, labelId)
    const statement = `INSERT INTO moment_label(moment_id, label_id) VALUES(?, ?)`
    const [result] = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

module.exports = new momentService()
