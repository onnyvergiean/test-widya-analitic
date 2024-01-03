const { authModel, usersModel } = require('../../../models');
const {
  encryptPassword,
  checkPassword,
} = require('../../../../utils/encryptPass');
const { generateAccessToken } = require('../../../../utils/jwt');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!name || !gender || !email || !password) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message:
          'Missing required parameters. Please provide name, gender, email, and password.',
      });
    }

    const user = await usersModel.getUserByEmail(email);

    if (user !== null) {
      return res.status(400).json({
        status: 'error',
        code: 409,
        message: 'Email address already exists. Please use a different email.',
      });
    }

    const encryptedPassword = await encryptPassword(password);
    const newUser = await authModel.registerUser(
      name,
      email,
      encryptedPassword,
      gender
    );
    delete newUser.password;
    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.loginUser(email, password);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Incorrect password',
      });
    }
    delete user.password;

    const token = await generateAccessToken(user);

    return res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User logged in successfully',
      data: token,
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
  registerUser,
  loginUser,
};
