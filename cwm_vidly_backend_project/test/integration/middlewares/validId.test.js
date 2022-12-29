const mongoose = require("mongoose");
const app = require("../../../src/app");
const request = require("supertest")(app);

describe("validId middleware", () => {
    it("Should return 404 if invalid id is passed", async () => {
        const genreId = "1";
        const res = await request.get("/api/genres/" + genreId);

        expect(res.statusCode).toEqual(404);
    });
    it("Should return 404 if passed id is valid but genres not found", async () => {
        const genreId = mongoose.Types.ObjectId();
        const res = await request.get("/api/genres/" + genreId);

        expect(res.statusCode).toEqual(404);
    });
});

afterAll(async () => { await mongoose.connection.close(); });