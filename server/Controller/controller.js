const { comparePass } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const { Build, User, Monster } = require('../models/index')
const { OAuth2Client } = require('google-auth-library');
// const { Configuration, OpenAiApi } = require("openai")
const { OpenAI} = require('openai')

class Controller {
    static async getBuildUser(req, res, next) {
        try {
            const { id } = req.user
            const data = await Build.findAll({
                where: {
                    UserId: id
                },
                include: [{
                    model: User,
                    attributes: [`username`]
                },
                {
                    model: Monster
                }]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getBuild(req, res, next) {
        try {
            const data = await Build.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                throw { name: "EMAIL_PASSWORD_REQUIRED" }
            }

            const findUser = await User.findOne({
                where: { email }
            })
            if (!findUser) {
                throw { name: "UNAUTHORIZED" }
            }
            let compare = comparePass(password, findUser.password)
            if (!compare) {
                throw { name: "UNAUTHORIZED" }
            }
            const access_token = signToken({ id: findUser.id })
            res.status(200).json({
                access_token: access_token
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const { google_token } = req.headers
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload();
            const { email, name } = payload
            const [user, create] = await User.findOrCreate({
                where: {
                    email: email,
                    username: name
                },
                defaults: {
                    username: name,
                    email: email,
                    password: "ini_akun_google"
                },
                hooks: false
            })
            const access_token = signToken({ id: user.id })
            const status = create ? 201 : 200
            res.status(status).json({
                access_token: access_token
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            if (!email || !password) {
                throw { name: "EMAIL_PASSWORD_REQUIRED" }
            }
            if (!username) {
                throw { name: "USERNAME_REQUIRED" }
            }
            await User.create({ username, email, password })
            const newUser = await User.findOne({
                where: { email: email }
            })
            res.status(201).json({
                email: newUser.email,
                username: newUser.username
            })
        } catch (error) {
            next(error)
        }
    }

    static async getMonster(req, res, next) {
        try {
            const data = await Monster.findAll()
            res.status(200).json(data) 
        } catch (error) {
            next(error)
        }
    }

    static async monsterName(req, res, next) {
        try {
            let { monsterName } = req.params
            const data = await Monster.findOne({ where: { name: monsterName } })
            if (!data) {
                throw {name: "ID_NOT_FOUND"}
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async monsterBuild(req, res, next) {
        try {
            let { monsterName } = req.params
            const data = await Build.findAll({
                include: [{
                    model: User,
                    attributes: [`username`]
                },
                {
                    model: Monster,
                    where: {
                        name: monsterName
                    }
                }]
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createBuild(req, res, next) {
        try {
            let { monsterName } = req.params
            const { id } = req.user
            const { head, chest, legs, waist, gloves, weapon } = req.body
            const monster = await Monster.findOne({
                where: { name: monsterName }
            })
            const MonsterId = monster.id
            const data = await Build.create({
                UserId: id, MonsterId, head, chest, legs, waist, gloves, weapon
            })
            const openai = new OpenAI({
                apiKey: process.env.API_KEY
            })

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user", 
                    content:
                        `Scenario: an average player of Monster Hunter World fighting a ${monsterName} using this armor: ${head.name}, ${chest.name}, ${legs.name}, ${waist.name}, ${gloves.name} and using a ${weapon.name} weapon. Answear me in number only, whats the percentage change of the player to win`
                }]
            })
            console.log(completion.choices[0].message.content, "ini kemungkinan menang");
            res.status(201).json({"result" : completion.choices[0].message.content})
        } catch (error) {
            console.log(error, `ini error`);
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            let { buildId } = req.params
            const data = await Build.findByPk(buildId)
            if (!data) {
                throw { name: 'ID_NOT_FOUND' }
            }
            await Build.destroy({
                where: {
                    id: buildId
                }
            })
            res.status(200).json({ "message": `${data.id} success to delete` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller