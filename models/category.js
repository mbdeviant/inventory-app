const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLenght: 250 },
});

CategorySchema.virtual("url").get(function () {
  return `/home/category/${this._id}`;
});

module.exports = mongoose.model("Category", CategorySchema);
