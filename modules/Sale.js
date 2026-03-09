const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  total: Number,
  date: String,
});

module.exports = mongoose.model("Sale", SaleSchema);
