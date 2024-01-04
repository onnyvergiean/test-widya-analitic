const db = require('../../config/db');

const getAllProducts = async (limit = 10, page = 1, searchTerm = null) => {
  try {
    const offset = (page - 1) * limit;
    const search = searchTerm ? `%${searchTerm}%` : null;

    const products = await db.any(
      'SELECT * FROM products WHERE (name ILIKE $3 OR $3 IS NULL) LIMIT $1 OFFSET $2',
      [limit, offset, search]
    );

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await db.oneOrNone('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

const getMyProducts = async (id, searchTerm = null) => {
  try {
    const search = searchTerm ? `%${searchTerm}%` : null;
    const products = await db.any(
      'SELECT * FROM products WHERE user_id = $1 AND (name ILIKE $2 OR $2 IS NULL)',
      [id, search]
    );

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const createProduct = async (name, description, price, user_id) => {
  try {
    const newProduct = await db.one(
      'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, user_id]
    );

    return newProduct;
  } catch (error) {
    console.error('Error registering product:', error);
    throw error;
  }
};

const updateProduct = async (id, name, description, price) => {
  try {
    const updatedProduct = await db.one(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );

    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await db.one(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
