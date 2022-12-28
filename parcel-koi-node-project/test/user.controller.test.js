const app = require("./../src/app");
const request = require("supertest");

jest.mock("./../src/services/user.service");

describe("user.controller Test Suite", () => {
    test("get should return an array of users", async () => {
        const res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0].id).toBe("1");
    });

    test("post should return saved id", async () => {
        const user = { username: "test002" };
        const res = await request(app).post("/api/users").send(user);
        expect(res.statusCode).toBe(201);
        expect(res.body.length).toBe(24);

        const savedUser = await request(app).get(`/api/users/${res.body}`);
        expect(savedUser.body.createAt).not.toBeNull();
        expect(savedUser.body.username).toBe(user.username);
    });

    test("get by id should return an user", async () => {
        const response = await request(app).get("/api/users/1");
        const user = response.body;
        expect(user.id).toBe("1");
    });

    test("put should update existing user", async () => {
        const user = { id: "1", username: "test003" };
        const response = await request(app).put("/api/users").send(user);
        expect(response.statusCode).toBe(200);

        const updatedUserResponse = await request(app).get("/api/users/1");
        expect(updatedUserResponse.body.username).toBe(user.username);
    });

    test("delete should return success message", async () => {
        const response = await request(app).delete("/api/users/1");
        expect(response.statusCode).toBe(200);
        const deletedUserResponse = await request(app).get("/api/users/1");
        expect(deletedUserResponse.statusCode).toBe(404);
    });
});
