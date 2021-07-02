const {
    beforeEach,
    afterAll
} = require('@jest/globals');
const request = require('supertest')
const app = require('../../index')
const mongoose = require("mongoose");

const carrotAmount = '30'
const carrotAmount2 = '30000'
const transactionNote = 'bayar hutang mas, lunas ya'
const user2 = '60dc15f1ba0be2207c10bfbb'
const _id = '60dc15c8ba0be2207c10bfb5'

beforeAll(done => {
    done()
})

describe("Testing transaction api, for transaction process between user and getting his transaction history", () => {
    test("Successfully transafer carrot to another user", async () => {
        const response = await request(app).post("/api/transaction").send({
            carrotAmount: carrotAmount,
            transactionNote: transactionNote,
            user2: user2,
            _id: _id,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Transaction success');
    });

    test("Failed to transafer carrot to another user, insufficient balance", async () => {
        const response = await request(app).post("/api/transaction").send({
            carrotAmount: carrotAmount2,
            transactionNote: transactionNote,
            user2: user2,
            _id: _id,
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Transfer failed, insufficient balance');
    });

    test("Successfully get all user transaction history data", async () => {
        const response = await request(app).get("/api/transaction").send({
            _id: _id,
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User transaction history');
    });

});

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})