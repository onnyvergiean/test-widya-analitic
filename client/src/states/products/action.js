import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ActionTypes from '../ActionType';
import api from '../../utils/api';

const receiveProductsActionCreator = (products) => ({
  type: ActionTypes.RECEIVE_PRODUCTS,
  payload: {
    products,
  },
});

const receiveMyProductsActionCreator = (myProducts) => ({
  type: ActionTypes.RECEIVE_MY_PRODUCTS,
  payload: {
    myProducts,
  },
});

const receiveDetailProductActionCreator = (product) => ({
  type: ActionTypes.RECEIVE_DETAIL_PRODUCT,
  payload: {
    product,
  },
});

const createProductActionCreator = (product) => ({
  type: ActionTypes.CREATE_PRODUCT,
  payload: {
    product,
  },
});

const updateProductActionCreator = (product) => ({
  type: ActionTypes.UPDATE_PRODUCT,
  payload: {
    product,
  },
});

const deleteProductActionCreator = (productId) => ({
  type: ActionTypes.DELETE_PRODUCT,
  payload: {
    productId,
  },
});

const asyncGetAllProducts = ({ searchTerm = '', page = 1, limit = 10 }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const products = await api.getAllProducts({ searchTerm, page, limit });
      dispatch(receiveProductsActionCreator(products));
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncGetMyProducts = ({ searchTerm = '' }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const myProducts = await api.getMyProducts({ searchTerm });
      dispatch(receiveMyProductsActionCreator(myProducts));
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncGetDetailProduct = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const product = await api.getDetailProduct(id);
      dispatch(receiveDetailProductActionCreator(product));
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncCreateProduct = ({ name, description, price }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const product = await api.createProduct({
        name,
        description,
        price,
      });
      dispatch(createProductActionCreator(product));
    } catch (error) {
      console.error('Error during product creation:', error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncUpdateProduct = ({ id, name, description, price }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updateProduct = await api.updateProduct({
        id,
        name,
        description,
        price,
      });
      dispatch(updateProductActionCreator(updateProduct));
    } catch (error) {
      console.error('Error during update:', error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncDeleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteProduct(id);
      dispatch(deleteProductActionCreator(id));
    } catch (error) {
      console.error('Error during delete product:', error.message);
    }
    dispatch(hideLoading());
  };
};

export {
  receiveProductsActionCreator,
  receiveMyProductsActionCreator,
  receiveDetailProductActionCreator,
  createProductActionCreator,
  deleteProductActionCreator,
  asyncGetAllProducts,
  asyncGetDetailProduct,
  asyncGetMyProducts,
  asyncUpdateProduct,
  asyncCreateProduct,
  asyncDeleteProduct,
};
