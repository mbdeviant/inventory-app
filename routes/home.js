const express = require("express");
const router = express.Router();

const brand_controller = require("../controllers/brandController");
const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");

router.get("/", product_controller.index);

// Product controllers
router.get("/products", product_controller.product_list);
router.get("/product/:id", product_controller.product_detail);

// Brand controllers
router.get("/brands", brand_controller.brand_list);
router.get("/brand/create", brand_controller.brand_create_get);
router.get("/brand/:id", brand_controller.brand_detail);

router.get("/categories", category_controller.category_list);
router.get("/category/:id", category_controller.category_detail);

module.exports = router;
