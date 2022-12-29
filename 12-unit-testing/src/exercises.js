const fizzBuzz = num => {
    if (typeof num != "number")
        throw new Error("Input should be a number");

    return num % 3 === 0 && num % 5 === 0
        ? "FizzBuzz" : num % 3 === 0
            ? "Fizz" : num % 5 === 0
                ? "Buzz" : num;

    // if (num % 3 === 0 && num % 5 === 0)
    //     return "FizzBuzz";

    // if (num % 3 === 0)
    //     return "Fizz";

    // if (num % 5 === 0)
    //     return "Buzz";

    // return num;
}

module.exports = { fizzBuzz }