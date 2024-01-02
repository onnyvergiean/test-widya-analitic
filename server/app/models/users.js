const db = require('../../config/db');

const getUsers = async (limit = 10, page = 1) => {
  const offset = (page - 1) * limit;
  try {
    const users = await db.any('SELECT * FROM users LIMIT $1 OFFSET $2', [
      limit,
      offset,
    ]);

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

module.exports = { getUsers, getUserById, getUserByEmail };
