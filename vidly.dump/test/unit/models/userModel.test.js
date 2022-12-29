const { User } = require("../../../src/models/userModel");
const { compareToken } = require("./../../../src/utils/jwt");

describe("generateToken2()", () => {
    it("Should return valid jwt token", async () => {
        const user = new User({
            name: "Shihab",
        });
        const token = await user.generateToken2();
        const decoded = await compareToken(token);
        expect(decoded).toMatchObject({ name: "Shihab", isAdmin: false });
    });
});