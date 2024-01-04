const { productsModel } = require('../../../models');

const getAllProducts = async (req, res) => {
  try {
    const { limit, page, searchTerm } = req.query;

    const products = await productsModel.getAllProducts(
      limit,
      page,
      searchTerm
    );

    if (!products || !products.length) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Products Not Found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Data Found',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const id = req.user.id;
    const { searchTerm } = req.query;

    const products = await productsModel.getMyProducts(id, searchTerm);

    if (!products || !products.length) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Products Not Found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Data Found',
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productsModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Product found',
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const user_id = req.user.id;

    if (!name || !description || !price) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'All fields are required',
      });
    }

    const newProduct = await productsModel.createProduct(
      name,
      description,
      price,
      user_id
    );

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Product created',
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;
    const { name, description, price } = req.body;

    const product = await productsModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Product not found',
      });
    }

    if (product.user_id !== user_id) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Forbidden your not authorized to update this product',
      });
    }

    const updatedProduct = await productsModel.updateProduct(
      id,
      name,
      description,
      price
    );

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Product updated',
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const user_id = req.user.id;

    const product = await productsModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Product not found',
      });
    }

    if (product.user_id !== user_id) {
      return res.status(403).json({
        status: 'error',
        code: 403,
        message: 'Forbidden your not authorized to delete this product',
      });
    }
    const deletedProduct = await productsModel.deleteProduct(id);

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Product deleted',
      data: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
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
