const { beforeEach, afterAll } = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const  mongoose  = require("mongoose");

const username = "hendra"
const password = "123123"

beforeAll(done => {
    done()
  })

describe("Testing auth api, for register and login purposes", () => {
    test("Successfully sign up new user", async () => {
        const response = await request(app).post("/api/register").send({
            "username": username,
            "password": password,
            "email": `${username}@mitrais.com`,
            "name": `muhammad ${username}`,
            "jobFamily": "SE",
            "grade": "JP",
            "dateOfBirth": "2021-07-01",
            "roleId": 2,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User added successfully');
    });

    test("Failed to sign up new user, no username ", async () => {
        const response = await request(app).post("/api/register").send({
            "username": "",
            "password": password,
            "email": `${username}@mitrais.com`,
            "name": `muhammad ${username}`,
            "jobFamily": "SE",
            "grade": "JP",
            "dateOfBirth": "2021-07-01",
            "roleId": 2,
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("username can't be empty");
    });

    test("Successfully sign in as new user", async () => {
        const response = await request(app).post("/api/login").send({
            "username": username,
            "password": password
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('login success');
    });

    test("Failed to sign in, found no user", async () => {
        const response = await request(app).post("/api/login").send({
            "username": `luhud pandjaid`,
            "password": password
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('no user found');
    });
});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
  })