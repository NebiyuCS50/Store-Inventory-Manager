async function getAllCategories() {
  const res = await pool.query("SELECT * FROM categories ORDER BY name ASC");
  return res.rows;
}
async function getAllCategoriesId(id) {
  const res = await pool.query(
    "SELECT * FROM categories WHERE id = $1 ORDER BY name ASC",
    [id],
  );
  return res.rows;
}
const pool = require("./pool");

async function getAllProduct() {
  const res = await pool.query("SELECT * FROM products");
  return res.rows;
}
async function getProductById(id) {
  const res = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return res.rows[0];
}
async function createProduct(name, price, quantity, category_id) {
  const res = await pool.query(
    "INSERT INTO products (name, price, quantity, category_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, price, quantity, category_id],
  );
  return res.rows[0];
}
async function updateProduct(id, name, price, quantity, category_id) {
  const res = await pool.query(
    "UPDATE products SET name = $1, price = $2, quantity = $3, category_id = $4 WHERE id = $5 RETURNING *",
    [name, price, quantity, category_id, id],
  );
  return res.rows[0];
}
async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  getAllCategoriesId,
};
