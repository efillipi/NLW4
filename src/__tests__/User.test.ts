import request from 'supertest'
import app from '../app'

import createConnection from '../database/index'

describe("User", () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    })

    it(" Should be able to create a new user ", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "User Example"
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("created_at")
    })

    it(" Should be able to create a user with exits email ", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@example.com",
                name: "User Example"
            })
        expect(response.status).toBe(409);
    })

    it(" Should be able to get all users ", async () => {
        await request(app).post("/users")
            .send({
                email: "user2@example.com",
                name: "User2 Example"
            })
        const response = await request(app).get("/users");

        expect(response.body.length).toBe(2)
    })
})