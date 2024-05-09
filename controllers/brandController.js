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

exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Add new brand" });
};

exports.brand_create_post = [
  body("name", "Brand must contain at least 2 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const brand = new Brand({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Add new Brand",
        brand: brand,
        errors: errors.array(),
      });

      return;
    } else {
      const brandExists = await Brand.findOne({ name: req.body.name }).exec();

      if (brandExists) res.redirect(brandExists.id);
      else {
        await brand.save();
        res.redirect(brand.id);
      }
    }
  }),
];
