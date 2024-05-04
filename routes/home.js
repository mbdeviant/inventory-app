const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");

router.get("/", product_controller.index);

router.get("/products", product_controller.product_list);

router.get("/brands", brand_controller.brand_list);

router.get("/categories", category_controller.category_list);

module.exports = router;
