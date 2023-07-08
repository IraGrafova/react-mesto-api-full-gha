const jwt = require('jsonwebtoken');
const { LoginError } = require('./errors');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' }); // добавить ошибку сюда
  }

  // извлечём токен
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw (new LoginError('Отсутствуют права для данного действия'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
