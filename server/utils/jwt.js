const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'failed',
      code: 401,
      message:
        'Not authorized to access this resource. Please include a Bearer token.',
    });
  }

  let token = authorization;

  if (authorization.startsWith('Bearer ')) {
    token = authorization.split(' ')[1];
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'failed',
          code: 401,
          message: 'Token has expired. Please obtain a new token.',
        });
      }
      return res.status(401).json({
        status: 'failed',
        code: 401,
        message: 'Token verification failed',
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken,
};
