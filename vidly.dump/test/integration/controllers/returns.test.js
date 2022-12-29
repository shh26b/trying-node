const mongoose = require("mongoose");
const app = require("../../../src/app");
const { Rental } = require("../../../src/models/rentalModel");
const { User } = require("../../../src/models/userModel");
const request = require("supertest")(app);
const { Genre } = require("../../../src/models/genresModel");

// POST /api/returns {customerId, movieId}

describe("POST /api/returns", () => {
    let customerId, movieId, rental, token;
    beforeEach(async () => {
        token = await new User({ name: "Shihab" }).generateToken2();
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        rental = new Rental({
            customer: { _id: customerId, name: "12345", phone: "12345678" },
            movie: {
                _id: movieId, title: "1", dailyRentalRate: 5, numberInStock: 1,
                genre: new Genre({ name: "genre1" })
            },
        });
        await rental.save();
    });

    const exec = () => request
        .post("/api/returns")
        .set("x-auth-token", token)
        .send({ customerId, movieId });

    it("Return 401 if client is not logged in", async () => {
        token = "";
        const res = await exec();
        expect(res.statusCode).toEqual(401);
    });

    it("Return 400 if customerId is not provided", async () => {
        customerId = null;
        const res = await exec();
        expect(res.statusCode).toEqual(400);
    });

    it("Return 400 if movieId is not provided", async () => {
        movieId = null;
        const res = await exec();
        expect(res.statusCode).toEqual(400);
    });

    it("Return 404 if no rental found for this customer/movie", async () => {
        await Rental.deleteMany();
        const res = await exec();
        expect(res.statusCode).toEqual(404);
    });

    it("Return 400 if rental already processed", async () => {
        rental.dateReturned = Date.now();
        await rental.save();

        const res = await exec();
        expect(res.statusCode).toEqual(400);
    });

    // Return the rental
    it("Should set the dateReturned if valid request", async () => {
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);

        expect(res.statusCode).toEqual(200);
        expect(Date(res.body.dateReturned.toString()))
            .toEqual(rentalInDB.dateReturned.toString());
    });

    it("Should set the rentalFee if valid request", async () => {
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);

        expect(res.statusCode).toEqual(200);
        expect(res.body.rentalFee).toEqual(rentalInDB.rentalFee);
    });

    it("Should Increase the stock if valid request", async () => {
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);

        const previousStock = rental.movie.numberInStock + 1;
        const currentStock = rentalInDB.movie.numberInStock;
        const resStock = res.body.movie.numberInStock;

        expect(res.statusCode).toEqual(200);
        expect(previousStock).toEqual(currentStock);
        expect(currentStock).toEqual(resStock);
    });

    it("Should Increase rental if valid request", async () => {
        const res = await exec();
        rental = await Rental.findById(rental._id);

        expect(res.statusCode).toEqual(200);
        // expect(res.body).toMatchObject(rental);
        // expect(res.body).toHaveProperty("dateOut")
        // expect(res.body).toHaveProperty("dateReturned")
        // expect(res.body).toHaveProperty("rentalFee")
        // expect(res.body).toHaveProperty("customer")
        // expect(res.body).toHaveProperty("movie")

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["dateOut", "dateReturned",
                "rentalFee", "customer", "movie"]))
    });

    afterEach(async () => { await Rental.deleteMany(); });
});

afterAll(async () => { await mongoose.connection.close(); });
