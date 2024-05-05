const { body, validationResult } = require("express-validator");
const Brand = require("../models/brand");
const Category = require("../models/category");
const Product = require("../models/product");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numProducts, numBrands, numCategories] = await Promise.all([
    Product.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    product_count: numProducts,
    brand_count: numBrands,
    category_count: numCategories,
  });
});

exports.product_list = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find({}, "name description")
    .sort({
      name: 1,
    })
    .exec();

  res.render("product_list", {
    title: "All Products",
    product_list: allProducts,
  });
});

exports.product_detail = asyncHandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("brand")
      .populate("category")
      .exec();

    if (!product) {
      const err = new Error("product not found");
      err.status = 404;
      throw err;
    }

    console.log(
      `product.brand: ${product.brand ? product.brand.name : "Brand not found"}`
    );

    res.render("product_detail", {
      title: product.name,
      product: product,
    });
  } catch (err) {
    console.error("product not found", err);
    next(err);
  }
});
