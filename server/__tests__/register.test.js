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

describe("POST /register", () => {
    test("test succses add-user", async () => {
        let body = {
            email: 'user212@mail.com',
            password: '12345',
            username: 'user212'
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("username", body.username)
        expect(response.body).toHaveProperty("email", body.email)
    }),
    test("test fail no email", async () => {
        let body = {
            email: 'test@mail.com',
            password: '12345',
            username: ''
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Username needed")
        }),
    test("test fail no password", async () => {
        let body = {
            email: 'user212@mail.com',
            password: '',
            username: 'user212'
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email and password needed")
        }),
    test("test fail no password", async () => {
        let body = {
            email: 'user212@mail.com',
            password: '',
            username: 'user212'
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email and password needed")
        }),
    test("test fail same email", async () => {
        let body = {
            email: 'user@mail.com',
            password: '12345',
            username: 'test1'
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Email already registered")
        }),
    test("test fail no password", async () => {
        let body = {
            email: 'user212@mail.com',
            password: '12345',
            username: 'user'
        }
        const response = await request(app).post('/register').send(body)
        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty("message", "Username already registered")
        })
    
}

)