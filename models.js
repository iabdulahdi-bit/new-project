const mongoose = require("mongoose");
// Define Sale schema
const saleSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
});
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  sky: String,
});
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});
const ordersSchema = new mongoose.Schema({
  customerName: String,
  Products: String,
  price: Number,
  address: String,
  time: { type: Date, default: Date.now },
});

// Create Customer model
const Customer = mongoose.model("Customer", customerSchema);
// Create Sale model
// Create Product model
const Product = mongoose.model("Product", productSchema);
const Sale = mongoose.model("Sale", saleSchema);
// Create User model
const User = mongoose.model("User", userSchema);
// Create Order model
const Order = mongoose.model("Order", ordersSchema);
module.exports = {
  Customer,
  Sale,
  User,
  Order,
  Product,
};

module.exports = { Customer, Sale, User, Order, Product };
