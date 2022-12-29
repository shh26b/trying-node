const { default: mongoose } = require("mongoose");
const app = require("../../../src/app");
const { Genre } = require("../../../src/models/genresModel");
const { User } = require("../../../src/models/userModel");
const request = require("supertest")(app);

describe("auth middleware", () => {
    /**
     * Define the happy path, and then in each test, we
     * change one parameter that clearly aligns with the
     * test. 
     */
    let token;
    const data = { name: "genre1" };
    const exec = () => request
        .post("/api/genres")
        .set("x-auth-token", token)
        .send(data);

    it("Should return 401 if no jwt token provide", async () => {
        token = "";
        const res = await exec();
        expect(res.statusCode).toEqual(401);
    });

    it("Should return 400 if jwt token is invalid", async () => {
        token = "invalid jwt";
        const res = await exec();
        expect(res.statusCode).toEqual(400);
    });

    it("Should return 201 if jwt token is valid", async () => {
        token = await new User().generateToken2();
        const res = await exec();
        expect(res.statusCode).toEqual(201);

        await Genre.deleteMany();
    });
});

afterAll(async () => {
    await mongoose.connection.close();
})
