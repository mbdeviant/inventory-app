const { body, validationResult } = require("express-validator");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "hellomoafakis" });
});
