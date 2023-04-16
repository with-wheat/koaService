const connection = require('../app/database')

class commentService {
  // 新增评论
  async inset(momentId, content, id) {
    const statement =
      'INSERT INTO `comment` (`content`, `moment_id`, `user_id`) VALUES (?, ?, ?);'
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
    ])
    return result
  }
  // 回复评论
  async reply(momentId, content, id, commentId) {
    const statement =
      'INSERT INTO `comment` (`content`, `moment_id`, `user_id`,`comment_id`) VALUES (?, ?, ?, ?);'
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      id,
      commentId,
    ])
    return result
  }
}

module.exports = new commentService()
