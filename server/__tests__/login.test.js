const request = require('supertest');
const app = require(`../app`)
const {sequelize} = require('../models/index');
const {User} = require('../models/index');


beforeAll( async () => {
    let user = {
        email: 'user@mail.com',
        username: 'user',
        password: '12345'
    }
        await User.create(user)
})

afterAll( async () => {
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

describe("POST /login", () => {
    test("test succses add-user", async () => {
        let body = {
            email: 'user@mail.com',
            password: '12345',
        }
        const response = await request(app).post('/login').send(body)
        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    }),
    test("test fail wrong email", async () => {
        let body = {
            email: 'test@mail.com',
            password: '12345',
        }
        const response = await request(app).post('/login').send(body)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid email or password")
        }),
    test("test fail wrong password", async () => {
        let body = {
            email: 'user@mail.com',
            password: 'wrong password',
        }
        const response = await request(app).post('/login').send(body)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid email or password")
        }),
    test("test fail no not registered", async () => {
        let body = {
            email: 'notRegistered@mail.com',
            password: '12345',

        }
        const response = await request(app).post('/login').send(body)
        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Invalid email or password")
        })
    }
)
