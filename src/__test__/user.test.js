const {
    beforeEach,
    afterAll
} = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const mongoose = require("mongoose");

const date = '2021-07-08'
const _id = '60dc15c8ba0be2207c10bfb5'

beforeAll(done => {
    done()
})

describe("Testing user api, for getting user data and activate birthday reward scheduler", () => {
    test("Successfully get all user data", async () => {
        const response = await request(app).get("/api/users/getAll").send({
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('list all user');
    });

    test("Successfully get all user data except himself", async () => {
        const response = await request(app).get("/api/users/getAllWithCondition").send({
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('list all user');
    });

    test("Successfully get user by id", async () => {
        const response = await request(app).get(`/api/users/getById/${_id}`).send({});
        expect(response.statusCode).toBe(200);
    });

    test("Successfully get all user who is birthday from today until two days ago", async () => {
        const response = await request(app).get("/api/users/birthday").send({});
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Birthday user');
    });

    test("Successfully get all user who is birthday at selected date", async () => {
        const response = await request(app).get(`/api/users/birthday?date=${date}`).send({});
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Birthday user');
    });

    test("Successfully activate birthday reward scheduler", async () => {
        const response = await request(app).post("/api/users/activateBirthdayScheduler").send({});
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Birthday scheduler is active');
    });

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})