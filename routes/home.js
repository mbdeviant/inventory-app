const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");

router.get("/", product_controller.index);

module.exports = router;
