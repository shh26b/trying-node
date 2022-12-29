const { abs, getCurrencies, getProduct, greet, registerUser } = require("./../src/lib");

// Testing Numbers
describe("abs():", () => {
    it("Should return positive number if input is positive", () => {
        expect(abs(1)).toEqual(1);
    });

    it("Should return positive number if input is negative", () => {
        expect(abs(-1)).toEqual(1);
    });

    it("Should return 0 number if input is 0", () => {
        expect(abs(0)).toEqual(0);
    });
});

// Testing Strings
describe("greet():", () => {
    it("Should return greeting message", () => {
        // expect(greet("Shihab")).toBe("Welcome Shihab");
        expect(greet("Shihab")).toMatch(/Shihab/);
        expect(greet("Shihab")).toContain("Shihab");
    });
});

// Testing Arrays
describe("getCurrencies():", () => {
    it("Should return supported currencies", () => {
        const result = getCurrencies();


        // Too general - bad
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();

        // Too specific - bad
        // expect(result[0]).toBe("USD");
        // expect(result[1]).toBe("AUD");
        // expect(result[2]).toBe("EUR");
        // expect(result.length).toBe(3);

        // Proper way
        // expect(result).toContain("USD");
        // expect(result).toContain("AUD");
        // expect(result).toContain("EUR");

        // Ideal way
        expect(result).toEqual(expect.arrayContaining(["AUD", "USD", "EUR"]));
    });
});

// Testing Objects
describe("getProduct():", () => {
    it("Should return product with given id", () => {
        const result = getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty("id", 1);
    });
});

// Testing Exceptions
describe("registerUser():", () => {
    it("Should throw Error if username is Falsy", () => {
        // Falsy: null, undefined, NaN, "", 0, false

        // expect(() => { registerUser(null) }).toThrow();
        // expect(() => { registerUser(undefined) }).toThrow();
        // expect(() => { registerUser(NaN) }).toThrow();
        // expect(() => { registerUser("") }).toThrow();
        // expect(() => { registerUser(0) }).toThrow();
        // expect(() => { registerUser(false) }).toThrow();

        const args = [null, undefined, NaN, "", 0, false];
        args.forEach(a => { expect(() => { registerUser(a) }).toThrow(); });
    });

    it("Should return user object if valid username is passed", () => {
        const result = registerUser("shihab");
        expect(result).toMatchObject({ username: "shihab" });
        expect(result.id).toBeGreaterThan(0);
    });
});