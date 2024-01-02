const { encryptPassword, checkPassword } = require('../../utils/encryptPass');
const db = require('../../config/db');

const registerUser = async (name, email, password, gender) => {
  try {
    const newUser = await db.one(
      'INSERT INTO users (name, email, password, gender) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, gender]
    );

    return newUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user) {
      return user;
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
