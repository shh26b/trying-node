const abs = num => num < 0 ? -num : num;
const greet = name => "Welcome " + name;
const getCurrencies = () => ["USD", "AUD", "EUR"];
const getProduct = productId => ({ id: productId, price: 10, category: "a" });
const registerUser = username => {
    if (!username) throw new Error("Username is required!");
    return { id: new Date().getTime(), username: username };
}

module.exports = { abs, greet, getCurrencies, getProduct, registerUser };