const connection = require('../app/database')
class UserService {
  /**
   * 创建用户
   * @param {创建用户信息} user
   * @returns
   */
  async create(user) {
    const { name, password } = user
    const statement = 'INSERT INTO `user`(name,password) Values(?,?)'
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  /**
   * 删除用户信息
   * @param {用户id} userId
   */
  async delete(userId) {
    const statement = 'DELETE FROM `user` WHERE `user`.id = ?'
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  /**
   * 查询是否存在该用户
   * @param {用户名} name
   * @returns
   */
  async findUserByName(name) {
    const statement = 'SELECT * FROM user WHERE user.`name` = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
  /**
   * 修改用户信息
   * @param {用户信息} user
   * @returns
   */
  async updateInfo(name, password, id) {
    const statement =
      'UPDATE `user` SET `user`.`name`=?,`user`.`password`=? WHERE `user`.id=?'
    const [result] = await connection.execute(statement, [name, password, id])
    return result
  }

  /**
   * 查询密码是否正确
   * @param {用户信息} user
   * @returns
   */
  async verifyInformationCorrect(user) {
    const { name, password } = user
    const userInfo = await this.findUserByName(name)
    if (userInfo[0].password === password) {
      return true
    }
    return false
  }

  // 保存用户头像地址
  async saveAvatarImg(userId, avatarImg) {
    try {
      const statement = 'UPDATE user SET avatarUrl = ?  WHERE id = ?'
      const [result] = await connection.execute(statement, [avatarImg, userId])
      return result
    } catch (error) {
      return console.log(error)
    }
  }
}

module.exports = new UserService()
