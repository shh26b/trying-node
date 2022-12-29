const { applyDiscount, notifyCustomer } = require("../src/customer");
const db = require("./../src/db");
const mail = require("./../src/mail");

// Mocking Function
describe("applyDiscount():", () => {
    it("Should apply 10% discount if customer has more then 10 points", () => {
        // Mocking the getCustomerSync function
        db.getCustomerSync = customerId => {
            return { id: customerId, points: 20 };
        };
        const order = { customerId: 1, totalPrice: 10 };
        applyDiscount(order);
        expect(order.totalPrice).toEqual(9);
    });
});

// Interaction Testing
describe("notifyCustomer():", () => {
    it("Should send a email to the customer", () => {
        // Mocking the getCustomerSync function
        db.getCustomerSync = () => ({ email: "a" });

        let isSent = false;
        mail.send = () => { isSent = true; };

        notifyCustomer({ customerId: 1 })

        expect(isSent).toEqual(true);
    });
});

// Jest Mocking
describe("Rewriting with jest mock notifyCustomer():", () => {
    it("Should send a email to the customer", () => {
        const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolvedValue(1);
        // mockFunction.mockRejectedValue(new Error("..."));

        db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
        mail.send = jest.fn();

        notifyCustomer({ customerId: 1 })

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toEqual('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});