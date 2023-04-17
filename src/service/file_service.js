const connection = require('../app/database')

class fileService {
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
}

module.exports = new fileService()
