const fs = require('fs')
const path = require('path')
const PRIVATEKEY = fs.readFileSync(
  path.resolve(__dirname, './keys/private_key.pem')
)
const PUBLICKEY = fs.readFileSync(
  path.resolve(__dirname, './keys/public_key.pem')
)

module.exports = { PRIVATEKEY, PUBLICKEY }
