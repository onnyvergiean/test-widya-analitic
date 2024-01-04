import axios from 'axios';

const api = (() => {
  const BASE_URL = 'http://localhost:3000/v1';

  const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
  };

  const putAccessToken = (token) => {
    sessionStorage.setItem('accessToken', token);
  };

  const handleResponse = (response) => {
    const { status, message, data } = response.data;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data;
  };

  const fetchWithAuth = async (url, options = {}) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        throw new Error('Access token is missing.');
      }
      const headers = accessToken
        ? {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          }
        : options.headers;

      const response = await axios({
        url,
        ...options,
        headers,
      });

      return response;
    } catch (error) {
      console.error('Error during fetching:', error.message);
      throw new Error(error.message);
    }
  };
  const getOwnProfile = async () => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/me`);
      const user = handleResponse(response);

      return user;
    } catch (error) {
      console.error('Error during fetching:', error.message);
      throw new Error(error.message);
    }
  };

  const register = async ({ name, email, password, gender }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        password,
        gender,
      });
      console.log(response);
      const user = handleResponse(response);
      return user;
    } catch (error) {
      console.error('Error during registration:', error.message);
      throw new Error('Registration failed');
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      const token = handleResponse(response);

      return token;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  };

  const createProduct = async ({ name, description, price }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name,
          description,
          price,
        },
      });
      const product = handleResponse(response);

      return product;
    } catch (error) {
      console.error('Error during product creation:', error.message);
    }
  };

  const getAllProducts = async ({ searchTerm = '', page = 1, limit = 10 }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`, {
        params: {
          searchTerm,
          page,
          limit,
        },
      });
      const products = handleResponse(response);

      return products;
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      const product = handleResponse(response);

      return product;
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
  };

  const getMyProducts = async ({ searchTerm = '' }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/me`, {
        params: {
          searchTerm,
        },
      });
      const products = handleResponse(response);

      return products;
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
  };

  const getDetailProduct = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      const product = handleResponse(response);

      return product;
    } catch (error) {
      console.error('Error during product fetching:', error.message);
    }
  };

  const updateProduct = async ({ id, name, description, price }) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name,
          description,
          price,
        },
      });
      const product = handleResponse(response);

      return product;
    } catch (error) {
      console.error('Error during product updating:', error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      const product = handleResponse(response);

      return product;
    } catch (error) {
      console.error('Error during product deleting:', error.message);
    }
  };

  return {
    login,
    register,
    getAccessToken,
    putAccessToken,
    getOwnProfile,
    createProduct,
    getAllProducts,
    getMyProducts,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
})();

export default api;
