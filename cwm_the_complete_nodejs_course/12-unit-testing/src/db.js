const getCustomerSync = (customerId) => {
    console.log("Reading a customer for Database...");
    return { id: customerId, points: 11 };
}

const getCustomer = (customerId) => {
    console.log("Reading a customer for Database...");
    return { id: customerId, id: customerId, points: 11 };
}

module.exports = { getCustomer, getCustomerSync };