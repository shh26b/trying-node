const { fizzBuzz } = require("../src/exercises");

describe("fizzBuzz():", () => {
    it("Should throw Error if input is not number", () => {
        const args = ["hello", {}, "", false, true];
        args.forEach(a => { expect(() => (fizzBuzz(a))).toThrow(); });
    });

    it("Should return FizzBuzz if input is divisible by 3 and 5", () => {
        expect(fizzBuzz(15)).toEqual("FizzBuzz");
    });

    it("Should return Fizz if input is only divisible by 3", () => {
        expect(fizzBuzz(9)).toEqual("Fizz");
    });

    it("Should return Buzz if input is only divisible by 5", () => {
        expect(fizzBuzz(25)).toEqual("Buzz");
    });

    it("Should return the same number if input is not divisible by 3 or 5", () => {
        expect(fizzBuzz(1)).toEqual(1);
    });
});