const jwt = require('jsonwebtoken')

const secret = process.env.SECRET

function signToken (payload) {
    return jwt.sign(payload, secret)
}

function verivyToken (payload) {
    return jwt.verify(payload, secret)
}

module.exports = {
    signToken,
    verivyToken
}