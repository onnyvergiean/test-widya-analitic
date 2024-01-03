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
      const response = await axios({
        url,
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const getOwnProfile = async () => {
    try {
      const response = await fetchWithAuth(`${BASE_URL}/users/me`);
      const user = handleResponse(response);

      return user;
    } catch (error) {
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

  return {
    login,
    register,
    getAccessToken,
    putAccessToken,
    getOwnProfile,
  };
})();

export default api;
