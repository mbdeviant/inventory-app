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

    res.render("product_detail", {
      title: product.name,
      product: product,
    });
  } catch (err) {
    console.error("product not found", err);
    next(err);
  }
});

exports.product_create_get = asyncHandler(async (req, res, next) => {
  const [allbrands, allCategories] = await Promise.all([
    Brand.find().sort({ name: 1 }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("product_form", {
    title: "Add new product",
    brands: allbrands,
    categories: allCategories,
  });
});

exports.product_create_post = [
  body("name", "Name cannot be empty.").trim().isLength({ min: 1 }).escape(),
  body("description", "Description cannot be empty.")
    .trim()
    .isLength({ max: 250 })
    .notEmpty()
    .escape(),
  body("category", "Category must be selected")
    .not()
    .isEmpty()
    .withMessage("Please select a category"),
  body("price", "Price cannot be empty")
    .trim()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),
  body("quantity", "Quantity cannot be empty")
    .trim()
    .isInt({ min: 0 })
    .withMessage("Quantity must be a valid number"),
  body("brand", "Brand must be selected")
    .not()
    .isEmpty()
    .withMessage("Please select a brand"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      brand: req.body.brand,
    });

    if (!errors.isEmpty()) {
      console.log(errors.array());

      const [allBrands, allCategories] = await Promise.all([
        Brand.find().sort({ name: 1 }).exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);

      console.log(product);
      res.render("product_form", {
        title: "Add new product",
        brands: allBrands,
        categories: allCategories,
        product: product,
        errors: errors.array(),
      });
      return;
    } else {
      await product.save();
      res.redirect(product.url);
    }
  }),
];

// const ProductSchema = new Schema({
//   name: { type: String, required: true, maxLenght: 100 },
//   description: { type: String, maxLenght: 250 },
//   category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
//   price: Number,
//   quantity: Number,
//   brand: { type: Schema.Types.ObjectId, ref: "Brand" },
// });
