const connection = require('../app/database')

class labelService {
  async add(name) {
    const statement = 'INSERT INTO label(`name`) VALUES(?)'
    const [result] = await connection.execute(statement, [name])
    return result
  }
  // 查找是否已经存在
  async findName(name) {
    const statement = 'SELECT * FROM label WHERE name = ?'
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }
}

module.exports = new labelService()
