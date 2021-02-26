import { response } from 'express'
import request from 'supertest'
import app from '../app'

import createConnection from '../database/index'

describe("Answer", () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    }) 

    it(" Should be able to create a new Answer with exits survey", async () => {
        const response = await request(app).get("/answers/9?u=6a9c1080-7858-11eb-9a9d-cb2b7a")
        expect(response.status).toBe(400)
    })
})