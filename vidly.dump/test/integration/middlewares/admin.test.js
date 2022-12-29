const mongoose = require("mongoose");
const app = require("../../../src/app");
const { Genre } = require("../../../src/models/genresModel");
const { User } = require("../../../src/models/userModel");
const request = require("supertest")(app);

describe("admin middleware", () => {
    it("Should return 403 if user not admin", async () => {
        const token = await new User({ isAdmin: false }).generateToken2();

        const genreId = mongoose.Types.ObjectId();
        const res = await request
            .delete("/api/genres/" + genreId)
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("Access denied.")
    });
    it("Should return 404 if genre not found", async () => {
        const token = await new User({ isAdmin: true }).generateToken2();

        const genreId = mongoose.Types.ObjectId();
        const res = await request
            .delete("/api/genres/" + genreId)
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual("Genre not found in delete")
    });
});

afterAll(async () => { await mongoose.connection.close(); });
