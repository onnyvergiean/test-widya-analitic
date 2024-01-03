const { usersModel } = require('../../../models');

const getUsers = async (req, res) => {
  try {
    const { limit, page } = req.query;

    const users = await usersModel.getUsers(limit, page);

    if (!users || !users.length) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        message: 'Data Empty',
      });
    }
    const filteredUsers = users.map((user) => {
      const { password, ...filteredUsers } = user;
      return filteredUsers;
    });

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Data Found',
      data: filteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }
    delete user.password;
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User found',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await usersModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }
    delete user.password;
    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User found',
      data: user,
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
  getUsers,
  getUserById,
  getUserProfile,
};
