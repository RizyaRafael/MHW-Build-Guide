const request = require('supertest');
const app = require(`../app`);
const { sequelize , User, Monster, Build} = require('../models/index');
const { hashPass } = require('../helper/bcrypt');

beforeAll(async () => {
    let build = [
        {
            UserId: 1,
            MonsterId: 1,
            head: {},
            chest: {},
            legs: {},
            waist: {},
            gloves: {},
            weapon: {},
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
        
    let monster = [{
        "name": "Great Jagras",
        "monsterId": 17,
        "imageUrl": "https://i.pinimg.com/originals/72/51/b6/7251b65f3934e3cae0348eadc302fb65.png",
        createdAt: new Date(),
        updatedAt: new Date()
    }]
    let user = [{
        "username": "user1",
        "email": "user1@mail.com",
        "password": hashPass("12345"),
        "imageUrl": "",
        createdAt: new Date(),
        updatedAt: new Date(),
    }]
    
    await sequelize.queryInterface.bulkInsert("Users", user)
    await sequelize.queryInterface.bulkInsert("Monsters", monster)
    await sequelize.queryInterface.bulkInsert("Builds", build)
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Builds", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await sequelize.queryInterface.bulkDelete("Monsters", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})
describe("get /allBuild", () => {
    test("test succses get all build", async () => {
        const response = await request(app).get('/allBuild')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        // expect(response.body.length).toBe(expect.any(Number))
        expect(response.body[0]).toHaveProperty("UserId", expect.any(Number))
        expect(response.body[0]).toHaveProperty("MonsterId", expect.any(Number))
        expect(response.body[0]).toHaveProperty("head", expect.any(Object))
        expect(response.body[0]).toHaveProperty("chest", expect.any(Object))
        expect(response.body[0]).toHaveProperty("legs", expect.any(Object))
        expect(response.body[0]).toHaveProperty("waist", expect.any(Object))
        expect(response.body[0]).toHaveProperty("gloves", expect.any(Object))
        expect(response.body[0]).toHaveProperty("weapon", expect.any(Object))
    })
}
)
