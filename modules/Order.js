const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: String,
  product: String,
  price: Number,
  date: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model("Order", OrderSchema);
