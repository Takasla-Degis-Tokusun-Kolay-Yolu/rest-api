import httpStatus from 'http-status';
import JWT from 'jsonwebtoken';
import { jwtConfig } from '../config/index.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error: '\n' + 'You must be logged in to do this.' });
  }
  JWT.verify(token, jwtConfig.jwtAccessSecret, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({ error: err });
    req.user = user?._doc;
    next();
  });
};

export default authenticateToken;
