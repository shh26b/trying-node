const { Router } = require("express");
const admin = require("../middlewares/admin");
const asyncWrapper = require("../middlewares/asyncWrapper");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { Customer, customerCreateSchema, customerUpdateSchema } = require("./../models/customerModel");

const createCustomer = asyncWrapper(async (req, res, next) => {
    const customer = new Customer(req.body);
    await customer.save();
    return res.status(201).json(customer);
});

const getCustomers = asyncWrapper(async (req, res, next) => {
    const customers = await Customer.find({});
    // throw new Error("This is error ");
    return res.status(200).json(customers);
});

const getCustomer = asyncWrapper(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    return res.status(200).json(customer);
});

const updateCustomer = asyncWrapper(async (req, res, next) => {
    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedCustomer);
});

const deleteCustomer = asyncWrapper(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });

    await Customer.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Customer deleted" });
});

const customerRouter = Router();

customerRouter
    .route("/")
    .post(auth, validate(customerCreateSchema), createCustomer)
    .get(getCustomers);

customerRouter
    .route("/:id")
    .get(getCustomer)
    .put(auth, validate(customerUpdateSchema), updateCustomer)
    .delete(auth, admin, deleteCustomer);

module.exports = customerRouter;
