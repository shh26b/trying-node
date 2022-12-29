const mongoose = require("mongoose");
const app = require("../../../src/app");
const { Genre } = require("../../../src/models/genresModel");
const { User } = require("../../../src/models/userModel");
const request = require("supertest")(app);

describe("GET /api/genres/", () => {
    afterEach(async () => { await Genre.deleteMany(); });
    it("Should return all genres", async () => {
        const data = [{ name: "genre1" }, { name: "genre2" }];
        await Genre.collection.insertMany(data);

        const res = await request.get("/api/genres/");

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        expect(res.body).toMatchObject(data);
    });
});

describe("GET /api/genres/:id", () => {
    it("Should return a genre if valid id is passed", async () => {
        const data = { name: "genre1" };

        const genre = new Genre(data);
        await genre.save();

        const genreId = String(genre._id);
        const res = await request.get("/api/genres/" + genreId);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject(data);

        await Genre.deleteMany();
    });
});

describe("POST /api/genres/", () => {
    /**
     * Define the happy path, and then in each test, we
     * change one parameter that clearly aligns with the
     * test. 
     */
    let token, data;
    const exec = () => request
        .post("/api/genres")
        .set("x-auth-token", token)
        .send(data);

    beforeEach(async () => { token = await new User().generateToken2() });
    afterEach(async () => { await Genre.deleteMany(); });

    it("Should return 400 if genre name length less then 3 character", async () => {
        data = { name: "g" };
        const res = await exec();

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(`"name" should have a minimum length of 3`)
    });
    it("Should return 400 if genre name length grater then 50 character", async () => {
        data = { name: new Array(52).join("g") };
        const res = await exec();

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual(`"name" should have maximum length of 50`)
    });
    it("Should save and return if given valid genre", async () => {
        data = { name: "genre1" };

        const res = await exec();
        const genre = await Genre.findOne({ name: "genre1" });

        expect(res.statusCode).toEqual(201);
        expect(genre).not.toBeFalsy();
        expect(res.body.name).toEqual(genre.name);
        expect(res.body._id).toEqual(genre.id);
    });
});

describe("PUT /api/genres/", () => {
    it("Should 404 return if genre not found", async () => {
        const token = await new User().generateToken2();

        const genreId = mongoose.Types.ObjectId();
        const res = await request
            .put("/api/genres/" + genreId)
            .set("x-auth-token", token)
            .send({ name: "Genre100" });

        expect(res.statusCode).toEqual(404);
    });
    it("Should update return if given id is valid", async () => {
        const token = await new User().generateToken2();
        const data = { name: "genre1" };

        const genre = new Genre(data);
        await genre.save();

        const genreId = genre.id;
        const res = await request
            .put("/api/genres/" + genreId)
            .set("x-auth-token", token)
            .send({ name: "Genre100" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual("Genre100");
    });
});

describe("DELETE /api/genres/", () => {
    it("Should 404 return if genre not found", async () => {
        const token = await new User({ isAdmin: true }).generateToken2();

        const genreId = mongoose.Types.ObjectId();
        const res = await request
            .delete("/api/genres/" + genreId)
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(404);
    });
    it("Should update return if given id is valid", async () => {
        const token = await new User({ isAdmin: true }).generateToken2();

        const genre = new Genre({ name: "genre1" });
        await genre.save();

        const res = await request
            .delete("/api/genres/" + genre.id)
            .set("x-auth-token", token);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("deleted successfully")
    });
});

afterAll(async () => { await mongoose.connection.close(); });
