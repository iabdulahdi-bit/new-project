const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { Customer, Sale, User, Order, Product } = require("./models");

// const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
const MONGO_URI = "mongodb://localhost:27017/project";
// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("from backend server");
});
// Add Sales Router
app.post("/addSales", async (req, res) => {
  try {
    const { product, quantity, price } = req.body;
    const sale = new Sale(req.body);
    await sale.save();
    res.json({ message: "Sale added successfully", sale });
  } catch (error) {
    console.log("Error adding sale:", error);
  }
});

app.get("/getSales", async (req, res) => {
  try {
    const sales = await Sale.find();

    res.status(200).json({ message: "Sales fetched successfully", sales });
  } catch (error) {
    console.log("Error fetching sales:", error);
  }
});

// const routes = require("./express");
// app.use("/", routes);

// add customers router
app.post("/addCustomer", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json({ message: "Customer added successfully", customer });
  } catch (error) {
    console.log("Error adding customer:", error);
  }
});
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json({ message: "Customers fetched successfully", customers });
  } catch (error) {
    console.log("Error fetching customers:", error);
  }
});
// add user router
app.post("/addUser", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User added successfully", user });
  } catch (error) {
    console.log("Error adding user:", error);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.log("Error fetching users:", error);
  }
});
// add orders router
app.post("/addOrder", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Order added successfully", order });
  } catch (error) {
    console.log("Error adding order:", error);
  }
});
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    console.log("Error fetching orders:", error);
  }
});
// add products router
app.post("/addProduct", async (req, res) => {
  try {
    const oeder = new Product(req.body);
    await oeder.save();
    res.json({ message: "Product added successfully", oeder });
  } catch {
    console.log("Error adding product:", error);
  }
});
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "Products fetched successfully", products });
  } catch (error) {
    console.log("Error fetching products:", error);
  }
});
