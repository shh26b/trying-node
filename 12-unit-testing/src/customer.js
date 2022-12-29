const db = require("./db");
const mail = require("./mail");

const applyDiscount = order => {
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10)
        order.totalPrice *= 0.9;
}

const notifyCustomer = order => {
    const customer = db.getCustomerSync(order.customerId);

    mail.send(customer.email, "Your order was placed successfully");
}

module.exports = { applyDiscount, notifyCustomer }