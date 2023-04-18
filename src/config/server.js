// 解析所有环境变量
require('dotenv').config()

module.exports = { SERVER_PORT, SERVER_HOST } = process.env
