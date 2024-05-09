const { body, validationResult } = require("express-validator");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}, "name description")
    .sort({
      name: 1,
    })
    .exec();

  res.render("category_list", {
    title: "Categories",
    category_list: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  try {
    const [category, productsInCategory] = await Promise.all([
      Category.findById(req.params.id).exec(),
      Product.find({ category: req.params.id }, "name description").exec(),
    ]);

    if (!category) {
      const err = new Error("brand not found");
      err.status = 404;
      throw err;
    }

    res.render("category_detail", {
      title: category.name,
      category: category,
      category_products: productsInCategory,
    });
  } catch (err) {
    console.error("category not found", err);
    next(err);
  }
});
