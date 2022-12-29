const getUser = (id) => {
    setTimeout(() => {
        console.log("Reading a user from database ...");
        return { id, gh: "shihab4t" };
    }, 2000);
    return 1;
}

console.log("Before");
const user = getUser();
console.log(user);
console.log("After");