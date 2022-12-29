const auth = require("../../../src/middlewares/auth");
const { User } = require("../../../src/models/userModel");

describe("auth middleware unit test", () => {
    it("Should populate req.user with the payload of a valid JWT", async () => {
        const user = new User({
            name: "Shihab",
            email: "shihab4t",
            password: "pass123"
        });
        const token = await user.generateToken2();

        const req = { headers: { "x-auth-token": token } };
        const res = {};
        const next = jest.fn();

        await auth(req, res, next);

        expect(req.user.name).toEqual(user.name);
        expect(req.user.email).toEqual(user.email);
        expect(req.user.isAdmin).toEqual(false);
    });
    
});
