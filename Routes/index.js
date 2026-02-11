const { Router } = require("express");
const productController = require("../controllers/productController");
const router = Router();

router.get("/", productController.getProducts);
router.get("/products/new", productController.showProductForm);
router.post("/products", productController.createProduct);
router.get("/products/:id/edit", productController.showEditForm);
router.post("/products/:id/edit", productController.updateProduct);
router.post("/products/:id/delete", productController.deleteProduct);

module.exports = { router };
