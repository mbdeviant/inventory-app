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

exports.brand_detail = asyncHandler(async (req, res, next) => {
  try {
    const [brand, productsInBrand] = await Promise.all([
      Brand.findById(req.params.id).exec(),
      Product.find({ brand: req.params.id }, "name description").exec(),
    ]);

    if (!brand) {
      const err = new Error("brand not found");
      err.status = 404;
      throw err;
    }

    res.render("brand_detail", {
      title: brand.name,
      brand: brand,
      brand_products: productsInBrand,
    });
  } catch (err) {
    console.error("product not found", err);
    next(err);
  }
});
