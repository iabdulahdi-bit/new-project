// const express = require('express');
// const router = express.Router();
const { Customer, Sale, User, Order, Product } = require("./models");
// // Get all customers
// router.post("/addCustomer", async (req, res) => {
//     const customer = new Customer(req.body);
//     await customer.save();
//     res.json("customer added");
// });
// router.get("/customers", async (req, res) => {
//     const customers = await Customer.find();
//     res.json(customers);
// });
// // Get all users
// router.post("/addUser", async (req, res) => {
//     const user = new User(req.body);
//     await user.save();
//     res.json("user added");
// });
// router.get("/users", async (req, res) => {
//     const users = await User.find();
//     res.json(users);
// });
// // Get all orders
// router.post("/addOrder", async (req, res) => {
//     const order = new Order(req.body);
//     await order.save();
//     res.json("order added");
// }
// );
// router.get("/orders", async (req, res) => {
//     const orders = await Order.find().populate('customer').populate('products.product');
//     res.json(orders);
// });
// // Get all products
// router.post("/addProduct", async (req, res) => {
//     const product = new Product(req.body);
//     await product.save();
//     res.json("product added");
// }
// );
// router.get("/products", async (req, res) => {
//     const products = await Product.find();
//     res.json(products);
// });
// module.exports = router;
