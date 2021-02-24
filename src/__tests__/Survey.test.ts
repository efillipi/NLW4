import { response } from 'express'
import request from 'supertest'
import app from '../app'

import createConnection from '../database/index'

describe("Survey", () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    })

    it(" Should be able to create a new survey ", async () => {
        const response = await request(app).post("/surveys")
            .send({
                "title": "Title example",
                "description": "Description example"
            })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("created_at")
    })

    it(" Should be able to get all surveys ", async () => {
        await request(app).post("/surveys")
            .send({
                "title": "Title example",
                "description": "Description example2"
            })
        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2)
    })
})