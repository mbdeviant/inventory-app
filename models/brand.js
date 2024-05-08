const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLenght: 40 },
});

BrandSchema.virtual("url").get(function () {
  return `/home/brand/${this.id}`;
});

module.exports = mongoose.model("Brand", BrandSchema);
