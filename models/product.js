const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLenght: 100 },
  description: { type: String, maxLenght: 250 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  price: Number,
  number_of_items: Number,
  brand: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
});

// Virtual for product`s URL
ProductSchema.virtual("url").get(function () {
  return `/catalog/product/${this._id}`;
});

module.exports = mongoose.model("Product", ProductSchema);
