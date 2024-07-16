const jwt = require('jsonwebtoken')
const secret = process.env.SECRET
const { User } = require('../models/index.js')


async function authentication(req, res, next) {
    try {
        const bearerToken = req.headers.authorization
        if (!bearerToken) {
            throw { name: "INVALID_TOKEN" }
        }
        const token = bearerToken.split(' ')[1]

        const decodedToken = jwt.verify(token, secret)
        const user = await User.findByPk(decodedToken.id)
        if (!user) {
            throw { name: "INVALID_TOKEN" }
        }
        req.user = {
            id: user.id,

        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = authentication