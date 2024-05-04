const { body, validationResult } = require("express-validator");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().exec();

  res.render("brand_list", {
    title: "Brands",
    brand_list: allBrands,
  });
});
