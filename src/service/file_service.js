const connection = require('../app/database')

class fileService {
  // 上传用户头像
  async avatarInsert(mimetype, filename, size, id) {
    const statement =
      'INSERT INTO avatar(mimetype,filename,size,user_id) VALUES(?, ?, ?, ?)'
    const [result] = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      id,
    ])
    return result
  }
  /**
   * 查询用户头像
   */
  async avatarUserImg(userId) {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?'
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }

  /**
   * 上传文件
   */
  async files(mimetype, filename, size, id) {
    const statement =
      'INSERT INTO files(mimetype,filename,size,user_id) VALUES(?, ?, ?, ?)'
    try {
      const [result] = await connection.execute(statement, [
        mimetype,
        filename,
        size,
        id,
      ])

      return result
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 获取上传的文件信息
   * @param {*} filename
   * @returns
   */
  async findFiles(filename) {
    const statement = 'SELECT * FROM files WHERE filename = ?'
    const [result] = await connection.execute(statement, [filename])
    return result.pop()
  }
}

module.exports = new fileService()
