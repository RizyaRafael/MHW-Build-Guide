const request = require('supertest');
const app = require(`../app`);
const { sequelize, User, Monster, Build } = require('../models/index');
const { hashPass } = require('../helper/bcrypt');

beforeAll(async () => {
    let monster = [{
        "name": "Great Jagras",
        "monsterId": 17,
        "imageUrl": "https://i.pinimg.com/originals/72/51/b6/7251b65f3934e3cae0348eadc302fb65.png",
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "name": "Kulu-Ya-Ku",
        "monsterId": 18,
        "imageUrl": "https://i.pinimg.com/originals/6b/17/8e/6b178ed93f7e2131b756374ebac7f7d3.png",
        "createdAt": new Date(),
        "updatedAt": new Date()
    }]


    await sequelize.queryInterface.bulkInsert("Monsters", monster)
})

afterAll(async () => {
    await sequelize.queryInterface.bulkDelete("Monsters", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})
describe("get /allMonster", () => {
    test("test succses get all build", async () => {
        const response = await request(app).get('/allBuild')
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBe(2)
        expect(response.body[0]).toHaveProperty("id", 1)
        expect(response.body[0]).toHaveProperty("name", "Great Jagras")
        expect(response.body[0]).toHaveProperty("monsterId", 17)
        expect(response.body[0]).toHaveProperty("imageUrl", expect.any(String))

    })})
    

