const express = require('express')
const Controller = require('../Controller/controller')
const errorHandler = require('../middleware/errorHandler')
const authentication = require('../middleware/authentication')
const router = express.Router()
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/login-google', Controller.loginGoogle)

router.get('/allBuild', Controller.getBuild)
router.get('/monster', Controller.getMonster)
router.get('/monster/:monsterName', Controller.monsterName)


router.get('/build/:monsterName', Controller.monsterBuild)

router.use(authentication)
router.get('/buildUser', Controller.getBuildUser)
router.post(`/build/:monsterName`, Controller.createBuild)
router.delete(`/delete/:buildId`, Controller.delete)

router.use(errorHandler)
module.exports = router