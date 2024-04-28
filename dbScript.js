console.log("this script generates initial products to database");

const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Category = require("./models/category");
const Product = require("./models/product");

const brands = [];
const categories = [];
const products = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;
