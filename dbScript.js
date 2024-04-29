console.log("this script generates initial products to database");

const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Category = require("./models/category");
const Product = require("./models/product");
require("dotenv").config();

const brands = [];
const categories = [];
const products = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// const database = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("connection established");
  // await createCategories();
  // await createBrands();
  await createProducts();
  console.log("database generated, connection shutdown");
  mongoose.connection.close();
}

// async function createCategoryModel(name, description) {
//   const category = new Category({ name: name, description: description });
//   await category.save();
//   categories.push(category);
//   console.log(`created the ${name} category`);
// }

// async function createBrandModel(name) {
//   const brand = new Brand({ name: name });
//   await brand.save();
//   brands.push(brand);
//   console.log(`created the ${name} brand`);
// }

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
    price: price,
    quantity: quantity,
  };

  const product = new Product(productDetails);
  await product.save();
  products.push(product);
  console.log(`created the  ${product} product`);
}

// async function createCategories() {
//   console.log("categories being generated..");
//   await Promise.all([
//     createCategoryModel(
//       "Helmets",
//       "SHARP approved carbon-fiber maximum safety helmets"
//     ),
//     createCategoryModel(
//       "Jackets",
//       "With damage absorbing and durable chest, shoulder, elbow and back spine protectors."
//     ),
//     createCategoryModel(
//       "Gloves",
//       "Extended wrist protection for hardcore riding or comfortable standart hand protection for daily use."
//     ),
//     createCategoryModel("Pants", "For reinforced hip and kneecap protection."),
//     createCategoryModel(
//       "Boots",
//       "Protect your feet from unexpected situations."
//     ),
//   ]);
// }

// async function createBrands() {
//   console.log("brands being generated..");
//   await Promise.all([
//     createBrandModel("AGV"),
//     createBrandModel("Knox"),
//     createBrandModel("Arai"),
//     createBrandModel("Nolan"),
//     createBrandModel("Schubert"),
//     createBrandModel("Alpinestars"),
//   ]);
// }

async function createProducts() {
  console.log("generating products..");

  await Promise.all([
    createProductModel(
      "Protective Helmet",
      "Premium quality head safety gear",
      "Helmets",
      120,
      7,
      "Arai"
    ),
    createProductModel(
      "Protective Helmet",
      "Head safety gear with decent protection",
      "Helmets",
      90,
      23,
      "AGV"
    ),
    createProductModel(
      "Protective Helmet",
      "Suitable for beginners",
      "Helmets",
      50,
      54,
      "Nolan"
    ),
    createProductModel(
      "Protective Jacket",
      "Suitable for winter season. Heavy and warm.",
      "Jackets",
      110,
      32,
      "Alpinstars"
    ),
    createProductModel(
      "Protective Jacket",
      "Summer friendly light jacket",
      "Jackets",
      110,
      37,
      "Alpinestars"
    ),
    createProductModel(
      "Protective Jacket",
      "Four season jackets. Ready for everything.",
      "Jackets",
      120,
      24,
      "Schubert"
    ),
    createProductModel(
      "Protective Glove",
      "Light and high-protection glove",
      "Gloves",
      60,
      43,
      "Knox"
    ),
    createProductModel(
      "Protective Glove",
      "Full-size wrist protection glove",
      "Gloves",
      90,
      52,
      "Knox"
    ),
    createProductModel(
      "Protective Pants",
      "Lightweight daily use pants",
      "Pants",
      90,
      17,
      "Alpinestars"
    ),
    createProductModel(
      "Protective Pants",
      "Suitable for long and harsh roads. Heavy work pants.",
      "Pants",
      120,
      58,
      "Schubert"
    ),
    createProductModel(
      "Protective Boots",
      "Light, sport but with protection",
      "Boots",
      40,
      38,
      "Knox"
    ),
    createProductModel(
      "Protective Boots",
      "Heavier but stronger boots",
      "Boots",
      50,
      27,
      "Knox"
    ),
    createProductModel(
      "Protective Boots",
      "Built for offroad cross adventures",
      "Boots",
      80,
      77,
      "Alpinestars"
    ),
  ]);
}
