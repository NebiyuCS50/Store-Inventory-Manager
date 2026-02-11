const db = require("../db/query");
const { body, validationResult, matchedData } = require("express-validator");

async function getProducts(req, res) {
  try {
    const products = await db.getAllProduct();
    res.render("index", { products });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

async function showProductForm(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("newProduct", { categories });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

async function createProduct(req, res) {
  await body("name").notEmpty().withMessage("Name is required").run(req);
  await body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0")
    .run(req);
  await body("quantity")
    .isInt({ gt: -1 })
    .withMessage("Quantity must be a non-negative integer")
    .run(req);
  await body("category_id")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("newProduct", { errors: errors.array() });
  }

  const { name, price, quantity, category_id } = matchedData(req);
  try {
    await db.createProduct(name, price, quantity, category_id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

async function showEditForm(req, res) {
  try {
    const product = await db.getProductById(req.params.id);
    const categoriesId = await db.getAllCategoriesId(req.params.id);
    const categories = await db.getAllCategories();
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("editProduct", { product, categoriesId, categories });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

async function updateProduct(req, res) {
  await body("name").notEmpty().withMessage("Name is required").run(req);
  await body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0")
    .run(req);
  await body("quantity")
    .isInt({ gt: -1 })
    .withMessage("Quantity must be a non-negative integer")
    .run(req);
  await body("category_id")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("editProduct", {
      errors: errors.array(),
      product: { id: req.params.id, ...matchedData(req) },
    });
  }

  const { name, price, quantity, category_id } = matchedData(req);
  try {
    await db.updateProduct(req.params.id, name, price, quantity, category_id);
    res.redirect(`/`);
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

async function deleteProduct(req, res) {
  try {
    await db.deleteProduct(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getProducts,
  showProductForm,
  createProduct,
  showEditForm,
  updateProduct,
  deleteProduct,
};
