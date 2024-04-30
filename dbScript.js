console.log("this script generates initial products to database");

const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Category = require("./models/category");
const Product = require("./models/product");
require("dotenv").config();

const brands = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connection established");
  await createCategories();
  await createBrands();
  await createProducts();

  // await createCategory();
  // await createBrand();
  // await createProduct();

  console.log("database generated, connection shutdown");
  mongoose.connection.close();
}

async function createCategoryModel(name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories.push(category);
}

async function createBrandModel(name) {
  const brand = new Brand({ name: name });
  await brand.save();
  brands.push(brand);
}

async function createProductModel(
  name,
  description,
  category,
  price,
  quantity,
  brand
) {
  productDetails = {
    name: name,
    description: description,
    category: [category],
    price: price,
    quantity: quantity,
    brand: [brand],
  };

  const product = new Product(productDetails);
  await product.save();
  console.log(`created the  ${product} product`);
}

async function createCategories() {
  console.log("categories being generated..");
  await Promise.all([
    createCategoryModel(
      "Helmets",
      "SHARP approved carbon-fiber maximum safety helmets"
    ),
    createCategoryModel(
      "Jackets",
      "With damage absorbing and durable chest, shoulder, elbow and back spine protectors."
    ),
    createCategoryModel(
      "Gloves",
      "Extended wrist protection for hardcore riding or comfortable standart hand protection for daily use."
    ),
    createCategoryModel("Pants", "For reinforced hip and kneecap protection."),
    createCategoryModel(
      "Boots",
      "Protect your feet from unexpected situations."
    ),
  ]);
}

async function createBrands() {
  console.log("brands being generated..");
  await Promise.all([
    createBrandModel("AGV"),
    createBrandModel("Knox"),
    createBrandModel("Arai"),
    createBrandModel("Nolan"),
    createBrandModel("Schubert"),
    createBrandModel("Alpinestars"),
  ]);
}

async function createProducts() {
  console.log("generating products..");

  await Promise.all([
    createProductModel(
      "Protective Helmet",
      "Premium quality head safety gear",
      categories[0],
      120,
      7,
      brands[0]
    ),
    createProductModel(
      "Protective Helmet",
      "Head safety gear with decent protection",
      categories[0],
      90,
      23,
      brands[1]
    ),
    createProductModel(
      "Protective Helmet",
      "Suitable for beginners",
      categories[0],
      50,
      54,
      brands[2]
    ),
    createProductModel(
      "Protective Jacket",
      "Suitable for winter season. Heavy and warm.",
      categories[1],
      110,
      32,
      brands[3]
    ),
    createProductModel(
      "Protective Jacket",
      "Summer friendly light jacket",
      categories[1],
      110,
      37,
      brands[4]
    ),
    createProductModel(
      "Protective Jacket",
      "Four season jackets. Ready for everything.",
      categories[1],
      120,
      24,
      brands[1]
    ),
    createProductModel(
      "Protective Glove",
      "Light and high-protection glove",
      categories[2],
      60,
      43,
      brands[2]
    ),
    createProductModel(
      "Protective Glove",
      "Full-size wrist protection glove",
      categories[2],
      90,
      52,
      brands[0]
    ),
    createProductModel(
      "Protective Pants",
      "Lightweight daily use pants",
      categories[3],
      90,
      17,
      brands[4]
    ),
    createProductModel(
      "Protective Pants",
      "Suitable for long and harsh roads. Heavy work pants.",
      categories[3],
      120,
      58,
      brands[0]
    ),
    createProductModel(
      "Protective Boots",
      "Light, sport but with protection",
      categories[4],
      40,
      38,
      brands[1]
    ),
    createProductModel(
      "Protective Boots",
      "Heavier but stronger boots",
      categories[4],
      50,
      27,
      brands[2]
    ),
    createProductModel(
      "Protective Boots",
      "Built for offroad cross adventures",
      categories[4],
      80,
      77,
      brands[3]
    ),
  ]);
}
