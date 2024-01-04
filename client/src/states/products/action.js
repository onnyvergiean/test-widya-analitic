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
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncGetMyProducts = (searchTerm = '') => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const myProducts = await api.getMyProducts(searchTerm);
      dispatch(receiveMyProductsActionCreator(myProducts));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncCreateProduct = ({ name, description, price, imgUrl }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const product = await api.createProduct({
        name,
        description,
        price,
        imgUrl,
      });
      dispatch(createProductActionCreator(product));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

const asyncUpdateProduct = ({ id, name, description, price, imgUrl }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updateProduct = await api.updateProduct({
        id,
        name,
        description,
        price,
        imgUrl,
      });
      dispatch(updateProductActionCreator(updateProduct));
    } catch (error) {
      alert(error.message);
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
      alert(error.message);
    }
    dispatch(hideLoading());
  };
};

export {
  receiveProductsActionCreator,
  receiveMyProductsActionCreator,
  createProductActionCreator,
  deleteProductActionCreator,
  asyncGetAllProducts,
  asyncGetMyProducts,
  asyncUpdateProduct,
  asyncCreateProduct,
  asyncDeleteProduct,
};
