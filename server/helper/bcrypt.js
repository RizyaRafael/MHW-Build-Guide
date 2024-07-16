const bcrypt = require('bcryptjs')

function hashPass(value) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(value, salt)
    return hash
}

function comparePass(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPass,
    comparePass
}